// ============================================================
// SALA.JS — Lógica Compartilhada, Firebase & Motor de Gameplay
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

// Catálogo Completo de Modos de Jogo / Minigames (6 Categorias & 18 Minigames)
const MODOS_DE_JOGO = {
  // --- CATEGORIA 1: VOTAÇÃO ---
  quem_e_mais_provavel: {
    id: "quem_e_mais_provavel",
    nome: "Quem é Mais Provável?",
    icone: "🎯",
    categoria: "votacao",
    categoriaNome: "VOTAÇÃO",
    descricao: "Julgamento em grupo apontando as amigas na roda.",
    baralhos: ["quem_e_mais_provavel"],
    cor: "#ff5400",
    corGlow: "rgba(255, 84, 0, 0.45)",
    regras: [
      "A carta lança uma situação extrema, hilária ou picante.",
      "Todas as jogadoras votam no avatar de quem mais se encaixa na situação.",
      "O sistema acende o holofote na pessoa mais votada para ela se explicar!"
    ]
  },
  eu_nunca: {
    id: "eu_nunca",
    nome: "Eu Nunca",
    icone: "🍷",
    categoria: "votacao",
    categoriaNome: "VOTAÇÃO",
    descricao: "Confissões na roda: quem já fez toma um gole.",
    baralhos: ["eu_nunca_safico"],
    cor: "#e63946",
    corGlow: "rgba(230, 57, 70, 0.45)",
    regras: [
      "A afirmação aparece na tela para todas as jogadoras da sala.",
      "Cada participante clica em 'Já Fiz 🍷' ou 'Sou Inocente 😇'.",
      "Quem já fez toma um gole ou conta o babado!"
    ]
  },
  eu_nunca_safico: {
    id: "eu_nunca_safico",
    nome: "Eu Nunca",
    icone: "🍷",
    categoria: "votacao",
    categoriaNome: "VOTAÇÃO",
    descricao: "Confissões na roda: quem já fez toma um gole.",
    baralhos: ["eu_nunca_safico"],
    cor: "#e63946",
    corGlow: "rgba(230, 57, 70, 0.45)",
    regras: [
      "A afirmação aparece na tela para todas as jogadoras da sala.",
      "Cada participante clica em 'Já Fiz 🍷' ou 'Sou Inocente 😇'."
    ]
  },

  // --- CATEGORIA 2: DILEMAS ---
  o_que_voce_prefere: {
    id: "o_que_voce_prefere",
    nome: "O Que Você Prefere?",
    icone: "🤔",
    categoria: "dilemas",
    categoriaNome: "DILEMAS",
    descricao: "Escolhas difíceis e situações sem saída.",
    baralhos: ["fogo_no_parquinho", "quebra_gelo"],
    cor: "#9d4edd",
    corGlow: "rgba(157, 78, 221, 0.45)",
    regras: [
      "Um dilema com duas opções cruéis é apresentado.",
      "Vote na sua escolha e veja quem concorda com você!"
    ]
  },
  preencha_a_lacuna: {
    id: "preencha_a_lacuna",
    nome: "Preencha a Lacuna",
    icone: "🃏",
    categoria: "dilemas",
    categoriaNome: "DILEMAS",
    descricao: "Cards Against Humanity com cartas ácidas e +18.",
    baralhos: ["preencha_a_lacuna"],
    cor: "#4361ee",
    corGlow: "rgba(67, 97, 238, 0.45)",
    regras: [
      "Uma Carta Preta traz uma lacuna para completar (________).",
      "Cada jogadora escolhe a resposta mais ácida ou engraçada.",
      "A juíza da rodada elege a melhor combinação!"
    ]
  },

  // --- CATEGORIA 3: BLEFE ---
  duas_verdades_uma_mentira: {
    id: "duas_verdades_uma_mentira",
    nome: "Duas Verdades e Uma Mentira",
    icone: "🎭",
    categoria: "blefe",
    categoriaNome: "BLEFE",
    descricao: "Conte 3 fatos e a mesa tenta adivinhar o blefe.",
    baralhos: ["quebra_gelo", "niveis_intimidade"],
    cor: "#3a0ca3",
    corGlow: "rgba(58, 12, 163, 0.45)",
    regras: [
      "A jogadora da vez conta 2 verdades e 1 mentira sobre si.",
      "A mesa vota em qual é a mentira inventada!"
    ]
  },
  o_espiao: {
    id: "o_espiao",
    nome: "O Espião",
    icone: "🕵️",
    categoria: "blefe",
    categoriaNome: "BLEFE",
    descricao: "Descubra quem não sabe a palavra secreta da mesa.",
    baralhos: ["quebra_gelo"],
    cor: "#4cc9f0",
    corGlow: "rgba(76, 201, 240, 0.45)",
    regras: [
      "Todos recebem a mesma palavra secreta, exceto o espião!",
      "Façam perguntas sutis para desmascarar o infiltrado."
    ]
  },

  // --- CATEGORIA 4: DEBATE ---
  bandeiras_vermelhas: {
    id: "bandeiras_vermelhas",
    nome: "Bandeiras Vermelhas",
    icone: "🚩",
    categoria: "debate",
    categoriaNome: "DEBATE",
    descricao: "Defenda o pretendente perfeito com um defeito bizarro.",
    baralhos: ["fogo_no_parquinho", "niveis_intimidade"],
    cor: "#d90429",
    corGlow: "rgba(217, 4, 41, 0.45)",
    regras: [
      "Apresente um perfil quase perfeito e adicione uma Red Flag surreal.",
      "A mesa debate: dá para passar pano ou é tchau e bênção?"
    ]
  },
  batalha_de_argumentos: {
    id: "batalha_de_argumentos",
    nome: "Batalha de Argumentos",
    icone: "⚔️",
    categoria: "debate",
    categoriaNome: "DEBATE",
    descricao: "Defenda opiniões absurdas com unhas e dentes.",
    baralhos: ["fogo_no_parquinho"],
    cor: "#ff0054",
    corGlow: "rgba(255, 0, 84, 0.45)",
    regras: [
      "Duas jogadoras são sorteadas para defender lados opostos de uma tese absurda.",
      "A mesa vota no melhor argumento!"
    ]
  },

  // --- CATEGORIA 5: SINTONIA ---
  o_termometro: {
    id: "o_termometro",
    nome: "O Termômetro",
    icone: "🌡️",
    categoria: "sintonia",
    categoriaNome: "SINTONIA",
    descricao: "Adivinhe a intensidade da resposta de 1 a 10.",
    baralhos: ["niveis_intimidade", "quebra_gelo"],
    cor: "#ff007f",
    corGlow: "rgba(255, 0, 127, 0.45)",
    regras: [
      "Uma jogadora recebe um número secreto de 1 a 10 de intensidade.",
      "Ela dá um exemplo e a roda tenta adivinhar o grau exato no termômetro!"
    ]
  },
  apenas_uma_dica: {
    id: "apenas_uma_dica",
    nome: "Apenas Uma Dica",
    icone: "💡",
    categoria: "sintonia",
    categoriaNome: "SINTONIA",
    descricao: "Dicas de uma palavra para adivinhar o segredo.",
    baralhos: ["quebra_gelo"],
    cor: "#7928ca",
    corGlow: "rgba(121, 40, 202, 0.45)",
    regras: [
      "Cada participante escreve apenas uma palavra de pista.",
      "Pistas repetidas são canceladas antes de serem mostradas à adivinhadora!"
    ]
  },

  // --- CATEGORIA 6: DESAFIO ---
  palavra_proibida: {
    id: "palavra_proibida",
    nome: "Palavra Proibida",
    icone: "🚫",
    categoria: "desafio",
    categoriaNome: "DESAFIO",
    descricao: "Faça a mesa falar a palavra sem dizer as proibidas.",
    baralhos: ["quebra_gelo", "roleta_consequencias"],
    cor: "#ff5400",
    corGlow: "rgba(255, 84, 0, 0.45)",
    regras: [
      "Explique a palavra secreta para a roda sem usar os termos proibidos listados na carta!"
    ]
  },
  niveis_intimidade: {
    id: "niveis_intimidade",
    nome: "Níveis de Intimidade",
    icone: "💜",
    categoria: "desafio",
    categoriaNome: "DESAFIO",
    descricao: "3 níveis (Percepção, Conexão e +18 Íntimo).",
    baralhos: ["niveis_intimidade"],
    cor: "#b5179e",
    corGlow: "rgba(181, 23, 158, 0.45)",
    regras: [
      "Uma troca profunda de perguntas focada em vulnerabilidade, conexão e flerte.",
      "Dividido em 3 níveis: Nível 1 (Percepção), Nível 2 (Conexão) e Nível 3 (+18 Íntimo).",
      "Puxem a carta na mesa e respondam com total sinceridade!"
    ]
  },
  verdade_ou_desafio_hot: {
    id: "verdade_ou_desafio_hot",
    nome: "Verdade ou Desafio Hot",
    icone: "🔥",
    categoria: "desafio",
    categoriaNome: "DESAFIO",
    descricao: "Provas audaciosas e confissões sem filtro.",
    baralhos: ["roleta_consequencias", "fogo_no_parquinho"],
    cor: "#ff0054",
    corGlow: "rgba(255, 0, 84, 0.45)",
    regras: [
      "Escolha entre 'Verdade 🗣️' ou 'Desafio ⚡'.",
      "Cumpra a prova diante da roda ou sofra o castigo decretado pela mesa!"
    ]
  },
  roleta_consequencias: {
    id: "roleta_consequencias",
    nome: "Verdade ou Desafio Hot",
    icone: "🔥",
    categoria: "desafio",
    categoriaNome: "DESAFIO",
    descricao: "Provas audaciosas e confissões sem filtro.",
    baralhos: ["roleta_consequencias"],
    cor: "#ff5400",
    corGlow: "rgba(255, 84, 0, 0.45)",
    regras: [
      "Escolha entre 'Verdade 🗣️' ou 'Desafio ⚡'.",
      "Cumpra a prova diante da roda ou sofra o castigo decretado pela mesa!"
    ]
  },

  // Fallbacks & Modos Especiais
  tribunal_da_mesa: {
    id: "tribunal_da_mesa",
    nome: "Tribunal da Mesa",
    icone: "⚖️",
    categoria: "votacao",
    categoriaNome: "VOTAÇÃO",
    descricao: "Defenda seus pontos e sofra o veredito da roda.",
    baralhos: ["quem_e_mais_provavel", "fogo_no_parquinho"],
    cor: "#e63946",
    corGlow: "rgba(230, 57, 70, 0.45)",
    regras: [
      "Um dilema moral ou acusação polêmica é colocada em julgamento.",
      "A mesa vota entre Culpada ou Inocente."
    ]
  },
  personalizado: {
    id: "personalizado",
    nome: "Personalizado (Mix Geral)",
    icone: "🃏",
    categoria: "especial",
    categoriaNome: "Mix Geral",
    descricao: "Cada rodada é um minigame diferente sorteado!",
    baralhos: ["niveis_intimidade", "roleta_consequencias", "eu_nunca_safico", "quem_e_mais_provavel", "preencha_a_lacuna"],
    cor: "#ffb703",
    corGlow: "rgba(255, 183, 3, 0.45)",
    regras: [
      "Cada rodada da partida sorteia um minigame específico entre os baralhos ativos."
    ]
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

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Offset do relógio central do servidor Firebase
let serverTimeOffset = 0;
const offsetRef = db.ref(".info/serverTimeOffset");
offsetRef.on("value", (snap) => {
  serverTimeOffset = snap.val() || 0;
});

function obterTimestampServidor() {
  return Date.now() + serverTimeOffset;
}

function gerarCodigoSala() {
  const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let codigo = "";
  for (let i = 0; i < 4; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
}

function obterIdJogador() {
  let id = localStorage.getItem("mesaQuente_idJogador");
  if (!id) {
    id = "j_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
    localStorage.setItem("mesaQuente_idJogador", id);
  }
  return id;
}

/**
 * Cria uma sala nova no banco com suporte a minigames, regras e avatares.
 */
async function criarSala(nomeHost, avatarHost, modoJogoKey = "niveis_intimidade", configExtra = {}) {
  let codigo;
  let tentativas = 0;

  do {
    codigo = gerarCodigoSala();
    const snapshot = await db.ref("salas/" + codigo).get();
    if (!snapshot.exists()) break;
    tentativas++;
  } while (tentativas < 10);

  const idJogador = obterIdJogador();
  const modoInfo = MODOS_DE_JOGO[modoJogoKey] || MODOS_DE_JOGO.niveis_intimidade;
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
      categoria: modoInfo.categoria || "casal",
      categoriaNome: modoInfo.categoriaNome || "Modo de Jogo",
      descricao: modoInfo.descricao,
      regras: modoInfo.regras || []
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

function configurarDesconexao(codigo, idJogador) {
  const refConectado = db.ref("salas/" + codigo + "/jogadores/" + idJogador + "/conectado");
  refConectado.onDisconnect().set(false);
}

async function sairDaSala(codigo) {
  const idJogador = obterIdJogador();
  try {
    await db.ref("salas/" + codigo + "/jogadores/" + idJogador + "/conectado").set(false);
  } catch (e) {
    console.warn("Erro ao sair da sala:", e);
  }
}

async function migrarHostSeNecessario(codigo, jogadores, hostIdAtual) {
  if (!jogadores || typeof jogadores !== "object") return;
  const hostExisteEConectado = jogadores[hostIdAtual] && jogadores[hostIdAtual].conectado !== false;
  if (hostExisteEConectado) return;

  const conectados = Object.keys(jogadores)
    .filter((id) => jogadores[id] && jogadores[id].conectado !== false && jogadores[id].nome)
    .sort((a, b) => (jogadores[a].entrouEm || 0) - (jogadores[b].entrouEm || 0));

  if (conectados.length === 0) return;

  const novoHostId = conectados[0];
  const meuId = obterIdJogador();

  if (novoHostId === meuId && novoHostId !== hostIdAtual) {
    try {
      await db.ref("salas/" + codigo + "/hostId").set(novoHostId);
    } catch (e) {
      console.warn("Erro na migração de host:", e);
    }
  }
}

// Escutas em Tempo Real
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
    callback(snapshot.val() || "niveis_intimidade");
  });
}

function escutarModoInfo(codigo, callback) {
  db.ref("salas/" + codigo + "/modoInfo").on("value", (snapshot) => {
    callback(snapshot.val() || null);
  });
}

function escutarTutorialRegras(codigo, callback) {
  db.ref("salas/" + codigo + "/tutorial").on("value", (snapshot) => {
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
      baralhosAtivos: config.baralhosAtivos || ["niveis_intimidade"],
      totalCartas: Number(config.totalCartas) || 20
    }
  };

  if (config.modoJogo) {
    const modoInfo = MODOS_DE_JOGO[config.modoJogo] || MODOS_DE_JOGO.niveis_intimidade;
    updates["salas/" + codigo + "/modoJogo"] = modoInfo.id;
    updates["salas/" + codigo + "/modoInfo"] = {
      id: modoInfo.id,
      nome: modoInfo.nome,
      icone: modoInfo.icone,
      categoria: modoInfo.categoria || "casal",
      categoriaNome: modoInfo.categoriaNome || "Modo de Jogo",
      descricao: modoInfo.descricao,
      regras: modoInfo.regras || []
    };
  }

  await db.ref().update(updates);
}

/**
 * Sorteia uma nova carta do pool ativo com mecânicas específicas
 */
function sortearProximaCartaDoPool(baralhosAtivosIds, ultimoBaralhoId, jogadoresConectados, sacolaLeitoresAtual, sacolaAlvosAtual, rodadaAtual = 1) {
  const idsValidos = (baralhosAtivosIds && baralhosAtivosIds.length > 0)
    ? baralhosAtivosIds
    : ["niveis_intimidade"];

  let baralhosCandidatos = idsValidos;
  if (idsValidos.length > 1 && ultimoBaralhoId) {
    const filtrados = idsValidos.filter((id) => id !== ultimoBaralhoId);
    if (filtrados.length > 0) {
      baralhosCandidatos = filtrados;
    }
  }

  const deckIdSorteado = baralhosCandidatos[Math.floor(Math.random() * baralhosCandidatos.length)];
  const baralhoObj = obterBaralhoPorId(deckIdSorteado) || BARALHOS_DISPONIVEIS[0];
  
  let poolCartas = baralhoObj.cartas || [];

  // Se for Níveis de Intimidade, ajusta a progressão conforme a rodada
  if (deckIdSorteado === "niveis_intimidade") {
    if (rodadaAtual <= 3) {
      // Rodadas iniciais: Nível 1 Percepção
      const n1 = poolCartas.filter((c) => c.nivel === 1);
      if (n1.length > 0) poolCartas = n1;
    } else if (rodadaAtual <= 8) {
      // Rodadas médias: Nível 2 Conexão
      const n2 = poolCartas.filter((c) => c.nivel === 2);
      if (n2.length > 0) poolCartas = n2;
    } else {
      // Rodadas avançadas: Nível 3 +18 Íntimo
      const n3 = poolCartas.filter((c) => c.nivel === 3);
      if (n3.length > 0) poolCartas = n3;
    }
  }

  const cartaSorteada = poolCartas[Math.floor(Math.random() * poolCartas.length)];

  // Lista de jogadores conectados
  const idsJogadores = Object.keys(jogadoresConectados).filter(
    (id) => jogadoresConectados[id] && jogadoresConectados[id].conectado !== false
  );
  const listaBaseJogadores = idsJogadores.length > 0 ? idsJogadores : Object.keys(jogadoresConectados);

  // Sorteio do Leitor da Rodada via Sacola
  const { itemPuxado: leitorId, novaSacola: novaSacolaLeitores } = puxarDaSacola(sacolaLeitoresAtual, listaBaseJogadores);
  const leitorNome = (jogadoresConectados[leitorId] && jogadoresConectados[leitorId].nome) || "Jogador";

  // Sorteio de Alvo
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
      nivel: cartaSorteada.nivel || null,
      verdadeTexto: cartaSorteada.verdadeTexto || null,
      desafioTexto: cartaSorteada.desafioTexto || null,
      opcoes: cartaSorteada.opcoes || null,
      respostasBrancas: cartaSorteada.respostasBrancas || null,
      duracao: cartaSorteada.duration || 35,
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
 * Inicia a Tela de Introdução & Tutorial de Regras Claras
 */
async function iniciarTutorialRegras(codigo, configPersonalizada = null) {
  const refSala = db.ref("salas/" + codigo);
  const snapshot = await refSala.get();

  if (!snapshot.exists()) {
    throw new Error("Sala não encontrada.");
  }

  const dadosSala = snapshot.val();
  const modoKey = (configPersonalizada && configPersonalizada.modoJogo) || dadosSala.modoJogo || "niveis_intimidade";
  const modoInfo = MODOS_DE_JOGO[modoKey] || MODOS_DE_JOGO.niveis_intimidade;
  const config = configPersonalizada || dadosSala.configLobby || {
    baralhosAtivos: modoInfo.baralhos,
    totalCartas: 20
  };

  const tutorialData = {
    iniciadoEm: firebase.database.ServerValue.TIMESTAMP,
    modoId: modoInfo.id,
    modoNome: modoInfo.nome,
    modoIcone: modoInfo.icone,
    categoriaNome: modoInfo.categoriaNome || "Minigame",
    descricao: modoInfo.descricao,
    regras: modoInfo.regras || [
      "Leiam as instruções da carta na mesa.",
      "Participem das votações ou desafios ao vivo.",
      "Divirtam-se com honestidade e respeito na roda!"
    ],
    duracaoSegundos: 35,
    prontos: {},
    configTemp: config
  };

  await refSala.update({
    status: "tutorial_regras",
    tutorial: tutorialData
  });
}

/**
 * Marca que o jogador atual leu as regras e clicou em "Entendi / Estou Pronto"
 */
async function marcarProntoTutorial(codigo) {
  const idJogador = obterIdJogador();
  await db.ref("salas/" + codigo + "/tutorial/prontos/" + idJogador).set(true);
}

/**
 * Inicia a Transição do Dado Sincronizado (TOTALMENTE JUSTO E ALEATÓRIO 1 A 9)
 * Sorteio com probabilidade uniforme para qualquer pessoa conectada (host não tem privilégio).
 */
async function iniciarTransicaoPartida(codigo, configPersonalizada = null) {
  const refSala = db.ref("salas/" + codigo);
  const snapshot = await refSala.get();

  if (!snapshot.exists()) {
    throw new Error("Sala não encontrada.");
  }

  const dadosSala = snapshot.val();
  const jogadores = dadosSala.jogadores || {};
  const config = configPersonalizada || (dadosSala.tutorial && dadosSala.tutorial.configTemp) || dadosSala.configLobby || {
    baralhosAtivos: ["niveis_intimidade"],
    totalCartas: 20
  };

  const baralhosAtivos = (config.baralhosAtivos && config.baralhosAtivos.length > 0)
    ? config.baralhosAtivos
    : ["niveis_intimidade"];

  const totalRodadas = Number(config.totalCartas) || 20;

  // Jogadores conectados na mesa
  const idsConectados = Object.keys(jogadores).filter(
    (id) => jogadores[id] && jogadores[id].conectado !== false
  );
  const idsParaSorteio = idsConectados.length > 0 ? idsConectados : Object.keys(jogadores);

  // Sorteio verdadeiramente aleatório e imparcial (igual probabilidade para todos)
  const vencedorId = idsParaSorteio[Math.floor(Math.random() * idsParaSorteio.length)];
  const vencedorObj = jogadores[vencedorId] || { nome: "Jogador" };
  const vencedorNome = vencedorObj.nome || "Jogador";
  const vencedorAvatar = obterAvatarJogador(vencedorObj);

  // Número do dado entre 1 e 9 com distribuição uniforme
  const numeroDado = Math.floor(Math.random() * 9) + 1;

  // Prepara a 1ª carta onde o leitor inicial é o vencedor do sorteio do dado
  const { cartaAtual, ultimoBaralhoId, novaSacolaLeitores, novaSacolaAlvos } = sortearProximaCartaDoPool(
    baralhosAtivos,
    null,
    jogadores,
    [vencedorId],
    [],
    1
  );

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
      euNunca: {},
      verdadeDesafio: null,
      lacuna: {},
      reacoes: {}
    },
    iniciadaEm: firebase.database.ServerValue.TIMESTAMP
  };

  const transicaoData = {
    iniciadaEm: firebase.database.ServerValue.TIMESTAMP,
    duracaoContagemMs: 4000,
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

async function concluirTransicaoParaPartida(codigo) {
  const refSala = db.ref("salas/" + codigo);
  await refSala.update({
    status: "em_partida"
  });
}

async function iniciarPartida(codigo, configPersonalizada = null) {
  return iniciarTutorialRegras(codigo, configPersonalizada);
}

async function puxarCartaDaMesa(codigo) {
  const refPartida = db.ref("salas/" + codigo + "/partida/cartaAtual");
  await refPartida.update({
    revelada: true,
    iniciadaEm: firebase.database.ServerValue.TIMESTAMP
  });
}

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

  const baralhosAtivos = partida.baralhosAtivos || ["niveis_intimidade"];
  const ultimoBaralhoId = partida.ultimoBaralhoId || null;
  const sacolaAlvosAtual = partida.sacolaAlvos || [];

  const idsConectados = Object.keys(jogadores).filter(
    (id) => jogadores[id] && jogadores[id].conectado !== false
  );
  const listaOrdem = idsConectados.length > 0 ? idsConectados : Object.keys(jogadores);

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
    sacolaAlvosAtual,
    rodadaAtual
  );

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
      euNunca: {},
      verdadeDesafio: null,
      lacuna: {},
      reacoes: {}
    }
  });
}

// Mecânicas de Voto e Interações
async function votarEmAlvo(codigo, idAlvoEscolhido) {
  const idJogador = obterIdJogador();
  await db.ref("salas/" + codigo + "/partida/interacoes/votos/" + idJogador).set(idAlvoEscolhido);
}

async function votarDilema(codigo, opcaoEscolhida) {
  const idJogador = obterIdJogador();
  await db.ref("salas/" + codigo + "/partida/interacoes/dilema/" + idJogador).set(opcaoEscolhida);
}

async function votarEuNunca(codigo, voto) {
  // voto: "JA_FIZ" | "INOCENTE"
  const idJogador = obterIdJogador();
  await db.ref("salas/" + codigo + "/partida/interacoes/euNunca/" + idJogador).set(voto);
}

async function escolherVerdadeDesafio(codigo, escolha) {
  // escolha: "VERDADE" | "DESAFIO"
  const idJogador = obterIdJogador();
  await db.ref("salas/" + codigo + "/partida/interacoes/verdadeDesafio").set({
    autorId: idJogador,
    escolha: escolha,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  });
}

async function submeterRespostaLacuna(codigo, textoResposta) {
  const idJogador = obterIdJogador();
  await db.ref("salas/" + codigo + "/partida/interacoes/lacuna/" + idJogador).set({
    texto: textoResposta,
    autorId: idJogador,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  });
}

async function escolherJogador(codigo, idEscolhido, nomeEscolhido) {
  const idJogador = obterIdJogador();
  await db.ref("salas/" + codigo + "/partida/interacoes/escolha").set({
    autorId: idJogador,
    alvoId: idEscolhido,
    alvoNome: nomeEscolhido,
    timestamp: firebase.database.ServerValue.TIMESTAMP
  });
}

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

async function revelarResultadoCarta(codigo) {
  await db.ref("salas/" + codigo + "/partida/cartaAtual/revelada").set(true);
}

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
