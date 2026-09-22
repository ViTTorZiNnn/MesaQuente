// ============================================================
// SALA.JS — Lógica Compartilhada, Firebase & Motor de Gameplay
// ============================================================

// Catálogo de Avatares Pré-definidos Expandido para 26 Opções
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
  { id: "robot", emoji: "🤖", nome: "Robô", cor: "#00b4d8", corBorda: "#90e0ef" },
  { id: "panda", emoji: "🐼", nome: "Panda", cor: "#2b2d42", corBorda: "#8d99ae" },
  { id: "bee", emoji: "🐝", nome: "Abelhinha", cor: "#ffb703", corBorda: "#fb8500" },
  { id: "dragon", emoji: "🐲", nome: "Dragão", cor: "#38b000", corBorda: "#70e000" },
  { id: "lion", emoji: "🦁", nome: "Leão", cor: "#f77f00", corBorda: "#fcbf49" },
  { id: "rabbit", emoji: "🐰", nome: "Coelho", cor: "#f4a261", corBorda: "#e76f51" },
  { id: "rocket", emoji: "🚀", nome: "Foguete", cor: "#0077b6", corBorda: "#00b4d8" },
  { id: "ghost", emoji: "👻", nome: "Fantasma", cor: "#5e503f", corBorda: "#a9927d" },
  { id: "owl", emoji: "🦉", nome: "Coruja", cor: "#6f4e37", corBorda: "#a0522d" },
  { id: "octopus", emoji: "🐙", nome: "Polvo", cor: "#d90429", corBorda: "#ef233c" },
  { id: "shark", emoji: "🦈", nome: "Tubarão", cor: "#1d3557", corBorda: "#457b9d" },
  { id: "dino", emoji: "🦖", nome: "Dino", cor: "#2d6a4f", corBorda: "#52b788" },
  { id: "monkey", emoji: "🐵", nome: "Macaco", cor: "#9c6644", corBorda: "#ddb892" },
  { id: "frog", emoji: "🐸", nome: "Sapo", cor: "#55a630", corBorda: "#80b918" },
  { id: "bat", emoji: "🦇", nome: "Morcego", cor: "#3c096c", corBorda: "#5a189a" },
  { id: "penguin", emoji: "🐧", nome: "Pinguim", cor: "#023e8a", corBorda: "#0096c7" },
  { id: "fire", emoji: "🔥", nome: "Fogo", cor: "#d00000", corBorda: "#ffba08" }
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
    baralhos: ["eu_nunca"],
    cor: "#e63946",
    corGlow: "rgba(230, 57, 70, 0.45)",
    regras: [
      "A afirmação aparece na tela para todas as jogadoras da sala.",
      "Cada participante clica em 'Já Fiz 🍷' ou 'Sou Inocente 😇'.",
      "Quem já fez toma um gole ou conta o babado!"
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


window.MQ_CATALOGO = { modos: MODOS_DE_JOGO, avatares: AVATARES_PREDEFINIDOS };
