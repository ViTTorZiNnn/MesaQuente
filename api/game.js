import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database';
import { randomInt, randomUUID } from 'node:crypto';

import {
  applyAction,
  connected,
  validateConfig
} from '../server/motor.js';

import { modes, decks } from '../server/content.js';
import { viewFor } from '../server/privacy.js';

function setupError(code) {
  const error = new Error('Configuração do servidor inválida.');
  error.code = code;
  return error;
}

function db() {
  if (!getApps().length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    const databaseURL = process.env.FIREBASE_DATABASE_URL?.trim();

    if (!raw || !databaseURL) {
      throw setupError('server/missing-env');
    }

    let account;

    try {
      account = JSON.parse(raw);
    } catch {
      throw setupError('server/invalid-service-account-json');
    }

    if (
      !account ||
      account.type !== 'service_account' ||
      typeof account.project_id !== 'string' ||
      typeof account.client_email !== 'string' ||
      typeof account.private_key !== 'string'
    ) {
      throw setupError('server/incomplete-service-account');
    }

    // Aceita quebras de linha que tenham sido coladas como "\n".
    account.private_key = account.private_key.replace(/\\n/g, '\n');

    initializeApp({
      credential: cert(account),
      databaseURL
    });
  }

  return getDatabase();
}

// Registra somente informações de diagnóstico.
// Nunca registra a chave privada, o token ou as variáveis de ambiente.
function logFailure(stage, error) {
  console.error(`[MesaQuente] ${stage}`, {
    code: typeof error?.code === 'string' ? error.code : 'sem-codigo',
    type: error?.name || 'Error'
  });
}

function configurationMessage(error) {
  switch (error?.code) {
    case 'server/missing-env':
      return 'Faltam FIREBASE_SERVICE_ACCOUNT_JSON ou FIREBASE_DATABASE_URL na Vercel.';

    case 'server/invalid-service-account-json':
      return 'FIREBASE_SERVICE_ACCOUNT_JSON não contém um JSON válido. Cole o conteúdo completo do arquivo da conta de serviço.';

    case 'server/incomplete-service-account':
      return 'A conta de serviço está incompleta. Use o JSON administrativo completo do Firebase.';

    default:
      return 'Não foi possível inicializar o Firebase no servidor. Confira as variáveis da Vercel e os logs.';
  }
}

const codeOK = code =>
  typeof code === 'string' && /^[A-Z]{4}$/.test(code);

function profile(payload) {
  if (
    typeof payload.name !== 'string' ||
    !payload.name.trim() ||
    payload.name.trim().length > 20
  ) {
    throw new Error('Digite um nome de até 20 caracteres.');
  }

  const avatar = payload.avatar;

  if (
    !avatar ||
    typeof avatar.emoji !== 'string' ||
    avatar.emoji.length > 12 ||
    typeof avatar.cor !== 'string' ||
    !/^#[0-9a-f]{3,8}$/i.test(avatar.cor)
  ) {
    throw new Error('Avatar inválido.');
  }

  const now = Date.now();

  return {
    nome: payload.name.trim(),
    avatar: {
      emoji: avatar.emoji,
      cor: avatar.cor
    },
    conectado: true,
    entrouEm: now,
    lastSeen: now
  };
}

function presence(room, uid, now) {
  for (const [id, player] of Object.entries(room.jogadores)) {
    player.conectado =
      id === uid || now - (player.lastSeen || 0) < 90000;
  }

  room.jogadores[uid].lastSeen = now;

  if (!room.jogadores[room.hostId]?.conectado) {
    room.hostId = connected(room)[0];
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      error: 'Use POST.'
    });
  }

  const body = req.body;

  if (
    !body ||
    typeof body !== 'object' ||
    Array.isArray(body) ||
    JSON.stringify(body).length > 6000
  ) {
    return res.status(400).json({
      error: 'Pedido inválido.'
    });
  }

  let database;

  // Etapa 1: configuração e inicialização do servidor.
  try {
    database = db();
  } catch (error) {
    logFailure('Inicialização do Firebase', error);

    return res.status(503).json({
      error: configurationMessage(error)
    });
  }

  const authorization = req.headers.authorization || '';
  const token = /^Bearer (.+)$/.exec(authorization)?.[1];

  if (!token) {
    return res.status(401).json({
      error: 'O pedido chegou sem identificação. Recarregue o jogo.'
    });
  }

  let uid;

  // Etapa 2: validação do jogador.
  // A verificação de revogação permanece ativada.
  try {
    const decoded = await getAuth().verifyIdToken(token, true);
    uid = decoded.uid;
  } catch (error) {
    logFailure('Verificação do login', error);

    const code =
      typeof error?.code === 'string'
        ? error.code
        : 'desconhecido';

    return res.status(401).json({
      error: `Não foi possível validar o login. Código: ${code}`
    });
  }

  try {
    const now = Date.now();
    const limitRef = database.ref(`mqSecureLimits/${uid}`);
    let limited = false;

    // Limite compartilhado entre instâncias do servidor.
    await limitRef.transaction(old => {
      limited = false;

      const limit =
        old && now - old.since < 60000
          ? old
          : {
              since: now,
              count: 0,
              joins: 0
            };

      const entering = ['create', 'join'].includes(body.op);

      if (
        limit.count >= 100 ||
        (entering && limit.joins >= 10)
      ) {
        limited = true;
        return;
      }

      limit.count++;

      if (entering) {
        limit.joins++;
      }

      return limit;
    });

    if (limited) {
      return res.status(429).json({
        error: 'Aguarde um minuto antes de tentar novamente.'
      });
    }

    // Criar sala.
    if (body.op === 'create') {
      const config = validateConfig(body.config || {}, modes);
      const player = profile(body);
      const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ';

      for (let attempt = 0; attempt < 12; attempt++) {
        const code = Array.from(
          { length: 4 },
          () => alphabet[randomInt(alphabet.length)]
        ).join('');

        const room = {
          schemaVersion: 3,
          criadaEm: now,
          expiresAt: now + 86400000,
          hostId: uid,
          status: 'lobby',
          ...config,
          jogadores: {
            [uid]: player
          }
        };

        const result = await database
          .ref(`mqSecureRooms/${code}`)
          .transaction(old => {
            if (!old || old.expiresAt < now) {
              return room;
            }

            return;
          });

        if (result.committed) {
          return res.json({
            uid,
            code,
            room: viewFor(result.snapshot.val(), uid)
          });
        }
      }

      throw new Error('Tente criar a sala novamente.');
    }

    if (!codeOK(body.code)) {
      throw new Error('Código inválido.');
    }

    const ref = database.ref(`mqSecureRooms/${body.code}`);
    let reason;

    const result = await ref.transaction(room => {
      reason = null;

      // O primeiro estado local de uma transação pode ser nulo.
      // Retornar null permite que o Firebase confira o servidor.
      if (!room) {
        reason = 'Sala não encontrada.';
        return null;
      }

      if (room.expiresAt < now) {
        reason = 'Sala expirada. Crie outra sala.';
        return;
      }

      try {
        if (body.op === 'join') {
          const player = profile(body);

          if (
            !room.jogadores[uid] &&
            Object.keys(room.jogadores).length >= 12
          ) {
            throw new Error('A mesa tem 12 participantes.');
          }

          player.entrouEm =
            room.jogadores[uid]?.entrouEm || now;

          room.jogadores[uid] = player;
        } else if (!room.jogadores[uid]) {
          throw new Error('Você não participa desta sala.');
        }

        presence(room, uid, now);

        if (body.op === 'leave') {
          delete room.jogadores[uid];

          if (!Object.keys(room.jogadores).length) {
            return null;
          }

          const ids = connected(room);

          if (room.hostId === uid) {
            room.hostId =
              ids[0] || Object.keys(room.jogadores)[0];
          }
        } else if (body.op === 'action') {
          room = applyAction(
            room,
            uid,
            body.type,
            body.payload || {},
            modes,
            decks,
            () => randomInt(0, 2 ** 30) / (2 ** 30),
            now
          );
        } else if (body.op === 'react') {
          if (!['🔥', '😂', '👏', '😳'].includes(body.emoji)) {
            throw new Error('Reação inválida.');
          }

          room.reactions = Object.fromEntries(
            Object.entries(room.reactions || {}).filter(
              ([, reaction]) => now - reaction.at < 5000
            )
          );

          room.reactions[randomUUID()] = {
            emoji: body.emoji,
            uid,
            at: now
          };
        } else if (
          !['join', 'state', 'leave'].includes(body.op)
        ) {
          throw new Error('Ação desconhecida.');
        }

        return room;
      } catch (error) {
        reason = error.message;
        return;
      }
    });

    if (
      !result.committed ||
      (body.op !== 'leave' && !result.snapshot.exists())
    ) {
      throw new Error(
        reason || 'A ação não foi concluída.'
      );
    }

    return res.json({
      uid,
      code: body.code,
      room:
        body.op === 'leave'
          ? null
          : viewFor(result.snapshot.val(), uid)
    });
  } catch (error) {
    logFailure('Operação da sala', error);

    // Erros do SDK não expõem detalhes internos ao navegador.
    if (error?.code) {
      return res.status(503).json({
        error:
          'Falha ao acessar o serviço da sala. Código: ' +
          String(error.code)
      });
    }

    return res.status(400).json({
      error: error.message || 'Não foi possível concluir a ação.'
    });
  }
}
