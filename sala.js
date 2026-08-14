// ============================================================
// SALA.JS — Lógica Compartilhada, Firebase & Motor de Gameplay (Etapa 1 & 3)
// ============================================================

// Catálogo de Avatares Pré-definidos (Cores Vibrantes de Alto Contraste)
const AVATARES_PREDEFINIDOS = [
  { id: "fox", emoji: "🦊", nome: "Raposa", cor: "#ff5400", corBorda: "#ff9e00" },
  { id: "cat", emoji: "😼", nome: "Gato", cor: "#7209b7", corBorda: "#b5179e" },
  { id: "tiger", emoji: "🐯", nome: "Tigre", cor: "#ffb703", corBorda: "#ffd166" },
  { id: "wolf", emoji: "🐺", nome: "Lobo", cor: "#3a86ff", corBorda: "#60a5fa" },
  { id: "alien", emoji: "👽", nome: "Alien", cor: "#06d6a0", corBorda: "#70e000" },
  { id: "demon", emoji: "😈", nome: "Diabinho", cor: "#e63946", corBorda: "#ff4d6d" },
  { id: "unicorn", emoji: "🦄", nome: "Unicórnio", cor: "#f72585", corBorda: "#ff70a6" },
  { id: "bear", emoji: "🐻", nome: "Urso", cor: "#b07d62", corBorda: "#d4a373" },
  { id: "skull", emoji: "💀", nome: "Caveira", cor: "#4361ee", corBorda: "#4cc9f0" },
  { id: "robot", emoji: "🤖", nome: "Robô", cor: "#00b4d8", corBorda: "#90e0ef" }
];

// Catálogo de Modos de Jogo
const MODOS_DE_JOGO = {
  quebra_gelo: {
    id: "quebra_gelo",
    nome: "Quebra-Gelo",
    icone: "🧊",
    descricao: "Perguntas leves e curiosas para esquentar a conversa e soltar a galera.",
    baralhos: ["quebra_gelo"],
    cor: "#00b4d8",
    corGlow: "rgba(0, 180, 216, 0.45)"
  },
  fogo_no_parquinho: {
    id: "fogo_no_parquinho",
    nome: "Fogo no Parquinho",
    icone: "🔥",
    descricao: "Desafios, intrigas, votos polêmicos e verdades sem filtro.",
    baralhos: ["fogo_no_parquinho", "confissoes_segredos"],
    cor: "#ff4d2e",
    corGlow: "rgba(255, 77, 46, 0.45)"
  },
  caos_total: {
    id: "caos_total",
    nome: "Caos Total",
    icone: "⚡",
    descricao: "Todas as cartas e baralhos misturados na mesa sem limites!",
    baralhos: ["quebra_gelo", "confissoes_segredos", "fogo_no_parquinho", "desafio_na_mesa", "dilemas_impossiveis"],
    cor: "#9d4edd",
    corGlow: "rgba(157, 78, 221, 0.45)"
  },
  personalizado: {
    id: "personalizado",
    nome: "Personalizado",
    icone: "🛠️",
    descricao: "Escolha e combine os baralhos que você quiser para a mesa.",
    baralhos: ["quebra_gelo", "fogo_no_parquinho"],
    cor: "#ffb703",
    corGlow: "rgba(255, 183, 3, 0.45)"
  }
};

/**
 * Obtém os dados de estilo e emoji do avatar do jogador de forma segura.
 */
function obterAvatarJogador(jogador) {
  if (!jogador) {
    return { id: "default", emoji: "👤", cor: "#4a4e69", corBorda: "#9a8c98" };
  }
  if (jogador.avatar && typeof jogador.avatar === "object") {
    return {
      id: jogador.avatar.id || "custom",
      emoji: jogador.avatar.emoji || "👤",
      cor: jogador.avatar.cor || "#ff5400",
      corBorda: jogador.avatar.corBorda || "#ff9e00"
    };
  }
  if (typeof jogador.avatar === "string") {
    const achado = AVATARES_PREDEFINIDOS.find((a) => a.id === jogador.avatar);
    if (achado) return achado;
    return { id: "custom", emoji: jogador.avatar, cor: "#ff5400", corBorda: "#ff9e00" };
  }
  return {
    id: "fallback",
    emoji: jogador.nome ? jogador.nome.charAt(0).toUpperCase() : "👤",
    cor: "#ff5400",
    corBorda: "#ff9e00"
  };
}

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
 * Cria uma sala nova no banco com suporte a modo de jogo, baralhos customizados e avatar.
 */
async function criarSala(nomeHost, avatarHost, modoJogoKey = "fogo_no_parquinho", configExtra = {}) {
  let codigo;
  let tentativas = 0;

  do {
    codigo = gerarCodigoSala();
    const snapshot = await db.ref("salas/" + codigo).get();
    if (!snapshot.exists()) break;
    tentativas++;
  } while (tentativas < 10);

  const idJogador = obterIdJogador();
  const modoInfo = MODOS_DE_JOGO[modoJogoKey] || MODOS_DE_JOGO.fogo_no_parquinho;
  const avatarValido = avatarHost || AVATARES_PREDEFINIDOS[0];

  const baralhosAtivos = (configExtra.baralhosAtivos && configExtra.baralhosAtivos.length > 0)
    ? configExtra.baralhosAtivos
    : modoInfo.baralhos;

  const totalCartas = Number(configExtra.totalCartas) || 20;

  await db.ref("salas/" + codigo).set({
    criadaEm: firebase.database.ServerValue.TIMESTAMP,
    hostId: idJogador,
    status: "lobby",
    modoJogo: modoInfo.id,
    modoInfo: {
      id: modoInfo.id,
      nome: modoInfo.nome,
      icone: modoInfo.icone,
      descricao: modoInfo.descricao
    },
    configLobby: {
      baralhosAtivos: baralhosAtivos,
      totalCartas: totalCartas
    },
    jogadores: {
      [idJogador]: {
        nome: nomeHost,
        avatar: {
          id: avatarValido.id,
          emoji: avatarValido.emoji,
          cor: avatarValido.cor,
          corBorda: avatarValido.corBorda
        },
        entrouEm: firebase.database.ServerValue.TIMESTAMP,
        conectado: true
      }
    },
    partida: {
      status: "aguardando",
      rodadaAtual: 0,
      totalRodadas: totalCartas,
      cartaAtual: null,
      interacoes: {}
    }
  });

  configurarDesconexao(codigo, idJogador);
  return codigo;
}

/**
 * Entra numa sala existente salvando nome e avatar selecionado.
 */
async function entrarNaSala(codigo, nome, avatarEscolhido) {
  codigo = codigo.trim().toUpperCase();
  const refSala = db.ref("salas/" + codigo);
  const snapshot = await refSala.get();

  if (!snapshot.exists()) {
    throw new Error("Sala não encontrada. Confira o código digitado.");
  }

  const idJogador = obterIdJogador();
  const avatarValido = avatarEscolhido || AVATARES_PREDEFINIDOS[0];

  await refSala.child("jogadores/" + idJogador).update({
    nome: nome,
    avatar: {
      id: avatarValido.id,
      emoji: avatarValido.emoji,
      cor: avatarValido.cor,
      corBorda: avatarValido.corBorda
    },
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
 * Verifica se o host atual se desconectou e, caso sim, migra a liderança para o jogador conectado mais antigo.
 */
async function migrarHostSeNecessario(codigo, jogadores, hostIdAtual) {
  if (!jogadores || typeof jogadores !== "object") return;

  const hostExisteEConectado = jogadores[hostIdAtual] && jogadores[hostIdAtual].conectado !== false;

  // Se o host atual continua ativo, nada a fazer
  if (hostExisteEConectado) return;

  // Encontra os jogadores conectados e ordena pelo timestamp de entrada (mais antigo primeiro)
  const conectados = Object.keys(jogadores)
    .filter((id) => jogadores[id] && jogadores[id].conectado !== false && jogadores[id].nome)
    .sort((a, b) => (jogadores[a].entrouEm || 0) - (jogadores[b].entrouEm || 0));

  if (conectados.length === 0) return;

  const novoHostId = conectados[0];
  const meuId = obterIdJogador();

  // Apenas o novo host candidato dispara a escrita para evitar corrida no Firebase
  if (novoHostId === meuId && novoHostId !== hostIdAtual) {
    console.log(`[Host Migration] Promovendo ${meuId} a novo Host da sala ${codigo}`);
    try {
      await db.ref("salas/" + codigo + "/hostId").set(novoHostId);
    } catch (e) {
      console.warn("Erro na migração de host:", e);
    }
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

function escutarHostId(codigo, callback) {
  db.ref("salas/" + codigo + "/hostId").on("value", (snapshot) => {
    callback(snapshot.val() || null);
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

function escutarModoJogo(codigo, callback) {
  db.ref("salas/" + codigo + "/modoJogo").on("value", (snapshot) => {
    callback(snapshot.val() || "fogo_no_parquinho");
  });
}

function escutarModoInfo(codigo, callback) {
  db.ref("salas/" + codigo + "/modoInfo").on("value", (snapshot) => {
    callback(snapshot.val() || null);
  });
}

function escutarTransicaoInicio(codigo, callback) {
  db.ref("salas/" + codigo + "/transicaoInicio").on("value", (snapshot) => {
    callback(snapshot.val() || null);
  });
}

async function salvarConfigLobby(codigo, config) {
  const updates = {
    ["salas/" + codigo + "/configLobby"]: {
      baralhosAtivos: config.baralhosAtivos || ["quebra_gelo"],
      totalCartas: Number(config.totalCartas) || 20
    }
  };

  if (config.modoJogo) {
    const modoInfo = MODOS_DE_JOGO[config.modoJogo] || MODOS_DE_JOGO.fogo_no_parquinho;
    updates["salas/" + codigo + "/modoJogo"] = modoInfo.id;
    updates["salas/" + codigo + "/modoInfo"] = {
      id: modoInfo.id,
      nome: modoInfo.nome,
      icone: modoInfo.icone,
      descricao: modoInfo.descricao
    };
  }

  await db.ref().update(updates);
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
 * Inicia a Transição de Início da Partida (Contagem 5..1 + Sorteio do Dado Sincronizado)
 */
async function iniciarTransicaoPartida(codigo, configPersonalizada = null) {
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

  // Jogadores conectados na mesa
  const idsConectados = Object.keys(jogadores).filter(
    (id) => jogadores[id] && jogadores[id].conectado !== false
  );
  const idsParaSorteio = idsConectados.length > 0 ? idsConectados : Object.keys(jogadores);

  // Sorteia o jogador vencedor da disputa do dado para abrir a 1ª rodada
  const vencedorId = idsParaSorteio[Math.floor(Math.random() * idsParaSorteio.length)];
  const vencedorObj = jogadores[vencedorId] || { nome: "Jogador" };
  const vencedorNome = vencedorObj.nome || "Jogador";
  const vencedorAvatar = obterAvatarJogador(vencedorObj);

  // Número vencedor do dado sincronizado (número alto entre 6 e 9)
  const numeroDado = Math.floor(Math.random() * 4) + 6;

  // Prepara a 1ª carta onde o leitor inicial é o vencedor do sorteio do dado
  const { cartaAtual, ultimoBaralhoId, novaSacolaLeitores, novaSacolaAlvos } = sortearProximaCartaDoPool(
    baralhosAtivos,
    null,
    jogadores,
    [vencedorId], // Garante que o vencedor lê primeiro
    []
  );

  // Força o leitor da 1ª carta a ser o vencedor do dado
  cartaAtual.leitorId = vencedorId;
  cartaAtual.leitorNome = vencedorNome;

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

  const transicaoData = {
    iniciadaEm: firebase.database.ServerValue.TIMESTAMP,
    duracaoContagemMs: 5000,
    duracaoDadoMs: 2800,
    vencedorId: vencedorId,
    vencedorNome: vencedorNome,
    vencedorAvatar: {
      emoji: vencedorAvatar.emoji,
      cor: vencedorAvatar.cor,
      corBorda: vencedorAvatar.corBorda
    },
    numeroDado: numeroDado,
    dadosPartida: dadosPartida
  };

  await refSala.update({
    status: "iniciando_partida",
    transicaoInicio: transicaoData,
    partida: dadosPartida
  });
}

/**
 * Finaliza a transição do dado e coloca a sala oficialmente em jogo
 */
async function concluirTransicaoParaPartida(codigo) {
  const refSala = db.ref("salas/" + codigo);
  await refSala.update({
    status: "em_partida"
  });
}

/**
 * Inicia a partida diretamente (retrocompatibilidade)
 */
async function iniciarPartida(codigo, configPersonalizada = null) {
  return iniciarTransicaoPartida(codigo, configPersonalizada);
}

/**
 * Puxa a carta da mesa (acionado pelo jogador da vez ao tocar no maço central)
 */
async function puxarCartaDaMesa(codigo) {
  const refPartida = db.ref("salas/" + codigo + "/partida/cartaAtual");
  await refPartida.update({
    revelada: true,
    iniciadaEm: firebase.database.ServerValue.TIMESTAMP
  });
}

/**
 * Avança para a próxima carta da partida (passando a vez na roda)
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
  const sacolaAlvosAtual = partida.sacolaAlvos || [];

  // Lista ordenada de jogadores conectados na mesa para a roda de turnos
  const idsConectados = Object.keys(jogadores).filter(
    (id) => jogadores[id] && jogadores[id].conectado !== false
  );
  const listaOrdem = idsConectados.length > 0 ? idsConectados : Object.keys(jogadores);

  // Próximo leitor na roda de turnos
  const leitorAnteriorId = partida.cartaAtual ? partida.cartaAtual.leitorId : null;
  const idxAnterior = listaOrdem.indexOf(leitorAnteriorId);
  const proximoIdx = idxAnterior >= 0 ? (idxAnterior + 1) % listaOrdem.length : 0;
  const proximoLeitorId = listaOrdem[proximoIdx];
  const proximoLeitorNome = (jogadores[proximoLeitorId] && jogadores[proximoLeitorId].nome) || "Jogador";

  const { cartaAtual, ultimoBaralhoId: novoUltimo, novaSacolaAlvos } = sortearProximaCartaDoPool(
    baralhosAtivos,
    ultimoBaralhoId,
    jogadores,
    [],
    sacolaAlvosAtual
  );

  // Define o novo jogador da vez e inicia a rodada com a carta fechada na mesa
  cartaAtual.leitorId = proximoLeitorId;
  cartaAtual.leitorNome = proximoLeitorNome;
  cartaAtual.revelada = false;

  await refSala.child("partida").update({
    rodadaAtual: rodadaAtual,
    ultimoBaralhoId: novoUltimo,
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
