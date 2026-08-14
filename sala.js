// ============================================================
// SALA.JS — Lógica Compartilhada, Firebase & Motor de Gameplay (Etapa 3)
// ============================================================

// Inicializa o Firebase (config vem de firebase-config.js)
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Offset do relógio central do servidor Firebase
let serverTimeOffset = 0;
const offsetRef = db.ref(".info/serverTimeOffset");
offsetRef.on("value", (snap) => {
  serverTimeOffset = snap.val() || 0;
});

/**
 * Retorna o timestamp estimado do servidor sincronizado.
 */
function obterTimestampServidor() {
  return Date.now() + serverTimeOffset;
}

/**
 * Gera um código de sala curto (4 caracteres), sem caracteres ambíguos.
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
 * Gera ou recupera o ID único de jogador para este navegador.
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
 * Cria uma sala nova no banco.
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
    configLobby: {
      baralhosAtivos: ["quebra_gelo", "confissoes_segredos"],
      totalCartas: 20
    },
    jogadores: {
      [idJogador]: {
        nome: nomeHost,
        entrouEm: firebase.database.ServerValue.TIMESTAMP,
        conectado: true
      }
    },
    partida: {
      status: "aguardando",
      rodadaAtual: 0,
      totalRodadas: 20,
      cartaAtual: null,
      interacoes: {}
    }
  });

  configurarDesconexao(codigo, idJogador);
  return codigo;
}

/**
 * Entra numa sala existente.
 */
async function entrarNaSala(codigo, nome) {
  codigo = codigo.trim().toUpperCase();
  const refSala = db.ref("salas/" + codigo);
  const snapshot = await refSala.get();

  if (!snapshot.exists()) {
    throw new Error("Sala não encontrada. Confira o código digitado.");
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
 * Marca desconexão automática se fechar o navegador.
 */
function configurarDesconexao(codigo, idJogador) {
  const refConectado = db.ref("salas/" + codigo + "/jogadores/" + idJogador + "/conectado");
  refConectado.onDisconnect().set(false);
}

/**
 * Remove ou desativa o jogador ao clicar explicitamente em Sair.
 */
async function sairDaSala(codigo) {
  const idJogador = obterIdJogador();
  try {
    await db.ref("salas/" + codigo + "/jogadores/" + idJogador + "/conectado").set(false);
  } catch (e) {
    console.warn("Erro ao sair da sala:", e);
  }
}

/**
 * Escutas em Tempo Real
 */
function escutarJogadores(codigo, callback) {
  db.ref("salas/" + codigo + "/jogadores").on("value", (snapshot) => {
    callback(snapshot.val() || {});
  });
}

function escutarStatusSala(codigo, callback) {
  db.ref("salas/" + codigo + "/status").on("value", (snapshot) => {
    callback(snapshot.val());
  });
}

function escutarPartida(codigo, callback) {
  db.ref("salas/" + codigo + "/partida").on("value", (snapshot) => {
    callback(snapshot.val() || null);
  });
}

function escutarInteracoes(codigo, callback) {
  db.ref("salas/" + codigo + "/partida/interacoes").on("value", (snapshot) => {
    callback(snapshot.val() || {});
  });
}

function escutarConfigLobby(codigo, callback) {
  db.ref("salas/" + codigo + "/configLobby").on("value", (snapshot) => {
    callback(snapshot.val() || null);
  });
}

async function salvarConfigLobby(codigo, config) {
  await db.ref("salas/" + codigo + "/configLobby").set(config);
}

async function obterHostId(codigo) {
  const snapshot = await db.ref("salas/" + codigo + "/hostId").get();
  return snapshot.val();
}

/**
 * Sorteia uma nova carta do pool ativo com mecânicas, durações e opções
 */
function sortearProximaCartaDoPool(baralhosAtivosIds, ultimoBaralhoId, jogadoresConectados, sacolaLeitoresAtual, sacolaAlvosAtual) {
  const idsValidos = (baralhosAtivosIds && baralhosAtivosIds.length > 0)
    ? baralhosAtivosIds
    : ["quebra_gelo"];

  let baralhosCandidatos = idsValidos;
  if (idsValidos.length > 1 && ultimoBaralhoId) {
    const filtrados = idsValidos.filter((id) => id !== ultimoBaralhoId);
    if (filtrados.length > 0) {
      baralhosCandidatos = filtrados;
    }
  }

  const deckIdSorteado = baralhosCandidatos[Math.floor(Math.random() * baralhosCandidatos.length)];
  const baralhoObj = obterBaralhoPorId(deckIdSorteado) || BARALHOS_DISPONIVEIS[0];
  const cartaSorteada = baralhoObj.cartas[Math.floor(Math.random() * baralhoObj.cartas.length)];

  // Lista de jogadores conectados
  const idsJogadores = Object.keys(jogadoresConectados).filter(
    (id) => jogadoresConectados[id] && jogadoresConectados[id].conectado !== false
  );
  const listaBaseJogadores = idsJogadores.length > 0 ? idsJogadores : Object.keys(jogadoresConectados);

  // Sorteio do Leitor da Rodada via Sacola
  const { itemPuxado: leitorId, novaSacola: novaSacolaLeitores } = puxarDaSacola(sacolaLeitoresAtual, listaBaseJogadores);
  const leitorNome = (jogadoresConectados[leitorId] && jogadoresConectados[leitorId].nome) || "Jogador";

  // Sorteio do Alvo da Rodada (para cartas RANDOM de CONFISSÃO / PROVA)
  let alvoId = null;
  let alvoNome = null;
  let novaSacolaAlvos = sacolaAlvosAtual || [];

  if (cartaSorteada.target === "RANDOM") {
    const resAlvo = puxarDaSacola(sacolaAlvosAtual, listaBaseJogadores);
    alvoId = resAlvo.itemPuxado;
    novaSacolaAlvos = resAlvo.novaSacola;
    alvoNome = (jogadoresConectados[alvoId] && jogadoresConectados[alvoId].nome) || "Jogador";
  }

  return {
    cartaAtual: {
      id: cartaSorteada.id + "_" + Date.now().toString(36),
      template_id: cartaSorteada.id,
      deck_id: cartaSorteada.deck_id,
      deck_nome: baralhoObj.nome,
      deck_icone: baralhoObj.icone || "🔥",
      text: cartaSorteada.text,
      mechanic: cartaSorteada.mechanic,
      target: cartaSorteada.target,
      age_rating: cartaSorteada.age_rating,
      subtype: cartaSorteada.subtype || "",
      opcoes: cartaSorteada.opcoes || null,
      duracao: cartaSorteada.duration || 30,
      iniciadaEm: firebase.database.ServerValue.TIMESTAMP,
      revelada: false,
      leitorId: leitorId,
      leitorNome: leitorNome,
      alvoId: alvoId,
      alvoNome: alvoNome
    },
    ultimoBaralhoId: deckIdSorteado,
    novaSacolaLeitores,
    novaSacolaAlvos
  };
}

/**
 * Inicia a partida configurada pelo Host
 */
async function iniciarPartida(codigo, configPersonalizada = null) {
  const refSala = db.ref("salas/" + codigo);
  const snapshot = await refSala.get();

  if (!snapshot.exists()) {
    throw new Error("Sala não encontrada.");
  }

  const dadosSala = snapshot.val();
  const jogadores = dadosSala.jogadores || {};
  const config = configPersonalizada || dadosSala.configLobby || {
    baralhosAtivos: ["quebra_gelo", "confissoes_segredos"],
    totalCartas: 20
  };

  const baralhosAtivos = (config.baralhosAtivos && config.baralhosAtivos.length > 0)
    ? config.baralhosAtivos
    : ["quebra_gelo"];

  const totalRodadas = Number(config.totalCartas) || 20;

  const { cartaAtual, ultimoBaralhoId, novaSacolaLeitores, novaSacolaAlvos } = sortearProximaCartaDoPool(
    baralhosAtivos,
    null,
    jogadores,
    [],
    []
  );

  const dadosPartida = {
    status: "jogando",
    rodadaAtual: 1,
    totalRodadas: totalRodadas,
    baralhosAtivos: baralhosAtivos,
    ultimoBaralhoId: ultimoBaralhoId,
    sacolaLeitores: novaSacolaLeitores,
    sacolaAlvos: novaSacolaAlvos,
    cartaAtual: cartaAtual,
    interacoes: {
      votos: {},
      dilema: {},
      escolha: null,
      reacoes: {}
    },
    iniciadaEm: firebase.database.ServerValue.TIMESTAMP
  };

  await refSala.update({
    status: "em_partida",
    partida: dadosPartida
  });
}

/**
 * Avança para a próxima carta da partida (acionado exclusivamente pelo Host)
 */
async function avancarProximaCarta(codigo) {
  const refSala = db.ref("salas/" + codigo);
  const snapshot = await refSala.get();

  if (!snapshot.exists()) {
    throw new Error("Sala não encontrada.");
  }

  const dadosSala = snapshot.val();
  const partida = dadosSala.partida || {};
  const jogadores = dadosSala.jogadores || {};

  const rodadaAtual = (partida.rodadaAtual || 1) + 1;
  const totalRodadas = partida.totalRodadas || 20;

  if (rodadaAtual > totalRodadas) {
    await refSala.child("partida/status").set("finalizada");
    return;
  }

  const baralhosAtivos = partida.baralhosAtivos || ["quebra_gelo"];
  const ultimoBaralhoId = partida.ultimoBaralhoId || null;
  const sacolaLeitoresAtual = partida.sacolaLeitores || [];
  const sacolaAlvosAtual = partida.sacolaAlvos || [];

  const { cartaAtual, ultimoBaralhoId: novoUltimo, novaSacolaLeitores, novaSacolaAlvos } = sortearProximaCartaDoPool(
    baralhosAtivos,
    ultimoBaralhoId,
    jogadores,
    sacolaLeitoresAtual,
    sacolaAlvosAtual
  );

  await refSala.child("partida").update({
    rodadaAtual: rodadaAtual,
    ultimoBaralhoId: novoUltimo,
    sacolaLeitores: novaSacolaLeitores,
    sacolaAlvos: novaSacolaAlvos,
    cartaAtual: cartaAtual,
    interacoes: {
      votos: {},
      dilema: {},
      escolha: null,
      reacoes: {}
    }
  });
}

/**
 * Votar em Alvo (Mecânica ALVO - target: VOTE)
 */
async function votarEmAlvo(codigo, idAlvoEscolhido) {
  const idJogador = obterIdJogador();
  await db.ref("salas/" + codigo + "/partida/interacoes/votos/" + idJogador).set(idAlvoEscolhido);
}

/**
 * Votar em Opção de Dilema (Mecânica DILEMA - target: ALL)
 */
async function votarDilema(codigo, opcaoEscolhida) {
  const idJogador = obterIdJogador();
  await db.ref("salas/" + codigo + "/partida/interacoes/dilema/" + idJogador).set(opcaoEscolhida);
}

/**
 * Escolher Jogador (Mecânica ESCOLHA - target: CHOOSE)
 */
async function escolherJogador(codigo, idEscolhido, nomeEscolhido) {
  const idJogador = obterIdJogador();
  await db.ref("salas/" + codigo + "/partida/interacoes/escolha").set({
    autorId: idJogador,
    alvoId: idEscolhido,
    alvoNome: nomeEscolhido,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  });
}

/**
 * Enviar Reação Emoji em tempo real (Mecânica CONFISSAO / PROVA)
 */
async function enviarReacao(codigo, emoji, nomeJogador) {
  const idJogador = obterIdJogador();
  const reacaoRef = db.ref("salas/" + codigo + "/partida/interacoes/reacoes").push();
  await reacaoRef.set({
    emoji: emoji,
    autorId: idJogador,
    autorNome: nomeJogador || "Jogador",
    timestamp: firebase.database.ServerValue.TIMESTAMP
  });
}

/**
 * Revelar Resultados da Rodada
 */
async function revelarResultadoCarta(codigo) {
  await db.ref("salas/" + codigo + "/partida/cartaAtual/revelada").set(true);
}

/**
 * Reinicia a partida e traz todos os jogadores de volta ao Lobby.
 */
async function reiniciarPartida(codigo) {
  const refSala = db.ref("salas/" + codigo);
  await refSala.update({
    status: "lobby",
    partida: {
      status: "aguardando",
      rodadaAtual: 0,
      cartaAtual: null,
      interacoes: {}
    }
  });
}
