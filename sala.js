// ============================================================
// SALA.JS
// ============================================================
// Funções compartilhadas para criar sala, entrar em sala,
// e ler/escrever dados no Firebase Realtime Database.
//
// A estrutura de dados já é pensada para crescer nas próximas
// etapas (baralhos, carta atual, líder de rodada, herança de
// host), mas nesta etapa só usamos os campos abaixo.
// ============================================================

// Inicializa o Firebase (config vem de firebase-config.js)
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ---------- Estrutura de dados da sala no Realtime Database ----------
//
// /salas/{codigoDaSala}/
//     criadaEm: timestamp
//     hostId: "<id do jogador host>"
//     status: "lobby" | "em_partida"   (nesta etapa só alternamos entre esses dois)
//     jogadores/
//         {idJogador}/
//             nome: string
//             entrouEm: timestamp
//             conectado: true/false   (controlado via onDisconnect)
//     partida/                         <- reservado para próximas etapas
//         baralhoAtivo: null
//         cartaAtual: null
//         liderDaRodada: null
//
// O campo "partida" já existe vazio para não precisarmos
// reestruturar o banco quando essas features forem implementadas.

/**
 * Gera um código de sala curto (4 caracteres), sem letras/números
 * ambíguos (evita 0/O, 1/I) para facilitar digitar no celular.
 */
function gerarCodigoSala() {
  const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let codigo = "";
  for (let i = 0; i < 4; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
}

/**
 * Gera (ou recupera) um ID único de jogador para este navegador,
 * salvo no localStorage. É isso que permite reentrar na sala sem
 * duplicar o nome na lista.
 */
function obterIdJogador() {
  let id = localStorage.getItem("mesaQuente_idJogador");
  if (!id) {
    id = "j_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
    localStorage.setItem("mesaQuente_idJogador", id);
  }
  return id;
}

/**
 * Cria uma sala nova no banco, tentando de novo se o código
 * gerado já existir (raro, mas possível).
 * Retorna o código da sala criada.
 */
async function criarSala(nomeHost) {
  let codigo;
  let tentativas = 0;

  do {
    codigo = gerarCodigoSala();
    const snapshot = await db.ref("salas/" + codigo).get();
    if (!snapshot.exists()) break;
    tentativas++;
  } while (tentativas < 10);

  const idJogador = obterIdJogador();

  await db.ref("salas/" + codigo).set({
    criadaEm: firebase.database.ServerValue.TIMESTAMP,
    hostId: idJogador,
    status: "lobby",
    jogadores: {
      [idJogador]: {
        nome: nomeHost,
        entrouEm: firebase.database.ServerValue.TIMESTAMP,
        conectado: true
      }
    },
    partida: {
      baralhoAtivo: null,
      cartaAtual: null,
      liderDaRodada: null
    }
  });

  configurarDesconexao(codigo, idJogador);

  return codigo;
}

/**
 * Entra numa sala existente. Lança erro se a sala não existir.
 * Se o jogador já estiver na sala (mesmo idJogador salvo no
 * localStorage), apenas atualiza o status de conexão em vez de
 * duplicar.
 */
async function entrarNaSala(codigo, nome) {
  codigo = codigo.trim().toUpperCase();
  const refSala = db.ref("salas/" + codigo);
  const snapshot = await refSala.get();

  if (!snapshot.exists()) {
    throw new Error("Sala não encontrada. Confira o código.");
  }

  const idJogador = obterIdJogador();

  await refSala.child("jogadores/" + idJogador).update({
    nome: nome,
    entrouEm: firebase.database.ServerValue.TIMESTAMP,
    conectado: true
  });

  configurarDesconexao(codigo, idJogador);

  return codigo;
}

/**
 * Marca o jogador como desconectado automaticamente se ele
 * fechar o navegador ou perder conexão (usando onDisconnect do
 * próprio Firebase — não depende de nenhum código nosso rodar
 * no momento da queda).
 */
function configurarDesconexao(codigo, idJogador) {
  const refConectado = db.ref("salas/" + codigo + "/jogadores/" + idJogador + "/conectado");
  refConectado.onDisconnect().set(false);
}

/**
 * Escuta mudanças na lista de jogadores de uma sala em tempo real.
 * callback recebe um objeto { idJogador: {nome, conectado, ...} }
 */
function escutarJogadores(codigo, callback) {
  db.ref("salas/" + codigo + "/jogadores").on("value", (snapshot) => {
    callback(snapshot.val() || {});
  });
}

/**
 * Escuta o status da sala ("lobby" / "em_partida") em tempo real.
 */
function escutarStatusSala(codigo, callback) {
  db.ref("salas/" + codigo + "/status").on("value", (snapshot) => {
    callback(snapshot.val());
  });
}

/**
 * Escuta o hostId da sala (usado para saber se o jogador atual é o host).
 */
async function obterHostId(codigo) {
  const snapshot = await db.ref("salas/" + codigo + "/hostId").get();
  return snapshot.val();
}

/**
 * Host clica em "Iniciar Partida" — muda o status da sala,
 * que propaga pra todo mundo que está escutando.
 */
async function iniciarPartida(codigo) {
  await db.ref("salas/" + codigo + "/status").set("em_partida");
}
