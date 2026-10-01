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


// Regras revisadas para corresponder à gameplay.
for(const [id,regras] of Object.entries({"quem_e_mais_provavel": ["O leitor compra a carta e lê a pergunta em voz alta.", "O leitor toca em Revelar. A pergunta aparece para todos antes dos votos.", "O resultado aparece após todos os participantes conectados votarem."], "o_termometro": ["O leitor recebe um número secreto de 1 a 10.", "Ele dá um exemplo que combine com essa intensidade, sem dizer o número, e revela a rodada.", "Os outros escolhem um número. Ao concluir a rodada, todos veem o número secreto."], "apenas_uma_dica": ["O leitor tenta adivinhar uma palavra que só os outros recebem.", "Após a revelação da rodada, cada pessoa envia uma dica de uma palavra.", "O leitor ou anfitrião encerra as dicas. As repetidas são removidas, e o leitor envia seu palpite."], "batalha_de_argumentos": ["O leitor defende a frase; a outra pessoa indicada discorda.", "Cada um apresenta seu argumento em voz alta.", "Depois, os participantes votam no argumento preferido e o leitor ou anfitrião conclui a rodada."]})) window.MQ_CATALOGO.modos[id].regras=regras;

// Mesa Viva: current server-enforced flows.
for(const [id,regras] of Object.entries({"quem_e_mais_provavel": ["O leitor compra e lê a pergunta em voz alta.", "O leitor toca em Revelar. Todos veem a pergunta e podem votar.", "Os votos são revelados quando todos os participantes conectados responderem."], "eu_nunca": ["O leitor compra, lê a frase e abre as respostas.", "Cada pessoa marca Já fiz ou Nunca fiz.", "O resultado aparece quando todos responderem. Contar a história é opcional."], "o_que_voce_prefere": ["O leitor lê as duas alternativas e abre as escolhas.", "Todos escolhem uma alternativa.", "O resultado aparece após todas as respostas. Comparem os motivos."], "preencha_a_lacuna": ["O leitor lê a frase e entrega as opções à mesa.", "Os outros escolhem uma resposta.", "Depois de todos responderem, o leitor escolhe sua preferida."], "niveis_intimidade": ["O leitor compra e compartilha a pergunta.", "Respondam em voz alta, sem obrigação de participar.", "O leitor ou anfitrião encerra a conversa quando a mesa estiver pronta."], "verdade_ou_desafio_hot": ["O leitor escolhe Verdade ou Desafio e compartilha a escolha.", "A participação é em voz alta ou presencial. É permitido pular.", "O leitor ou anfitrião encerra quando terminarem."], "duas_verdades_uma_mentira": ["O leitor escreve três fatos, marca qual é mentira e salva.", "Depois de apresentar os fatos, os outros votam no que acham falso.", "A mentira é revelada quando todos os palpites chegarem."], "o_espiao": ["São necessárias pelo menos três pessoas. O leitor distribui os papéis.", "Todos recebem uma palavra, exceto o espião. Façam perguntas sem dizer a palavra.", "O leitor ou anfitrião abre as acusações. Todos votam; então o espião e a palavra são revelados."], "bandeiras_vermelhas": ["O leitor lê a situação completa e abre as escolhas.", "Cada pessoa decide se daria uma chance.", "O resultado aparece após todas as respostas. Conversem sobre os limites de cada um."], "batalha_de_argumentos": ["O leitor defende a afirmação; a outra pessoa indicada argumenta contra.", "Depois de os dois falarem, o leitor ou anfitrião abre a votação.", "Todos podem votar no argumento preferido. O resultado aparece após todos votarem."], "o_termometro": ["O leitor recebe um número secreto de 1 a 10 e dá um exemplo da intensidade.", "Ele abre os palpites sem dizer o número. Os outros escolhem uma intensidade.", "Após todos responderem, o número e os palpites são revelados."], "apenas_uma_dica": ["O leitor será quem adivinha e distribui a palavra aos outros.", "Cada pessoa envia uma dica de uma palavra. A palavra secreta não vale como dica.", "Depois de todas as dicas, as repetidas são removidas. O leitor envia um palpite e vê a resposta."], "palavra_proibida": ["O leitor recebe uma palavra e três termos proibidos.", "Ele começa a explicação em voz alta. Os outros enviam palpites e podem tentar de novo.", "Um acerto encerra automaticamente. O leitor ou anfitrião também pode encerrar sem acerto."]})) window.MQ_CATALOGO.modos[id].regras=regras;
window.MQ_CATALOGO.modos.verdade_ou_desafio_hot.nome='Verdade ou Desafio';
window.MQ_CATALOGO.modos.niveis_intimidade.descricao='Perguntas para conversar no tom escolhido pela mesa.';
window.MQ_CATALOGO.modos.verdade_ou_desafio_hot.descricao='Escolha uma pergunta ou um desafio no tom da mesa.';

for(const [id,regras] of Object.entries({"preencha_a_lacuna": ["O leitor revela uma situação com um espaço em branco.", "Cada outro participante escolhe uma das opções para completar a frase. Não precisa inventar uma resposta.", "Quando todas as respostas chegarem, o leitor escolhe a favorita. Não existe resposta obrigatoriamente correta."], "o_termometro": ["O leitor vê o tema, a escala e um número secreto de 1 a 10.", "Ele inventa uma pista que combine com esse número. Exemplo: em uma escala de bagunça, 2 pode ser uma camisa fora do armário.", "O leitor revela a rodada sem dizer o número. Os demais tentam adivinhar seu número pela pista, em vez de dar uma nota pessoal.", "Quando todos responderem, o jogo revela o número e os palpites."]})) window.MQ_CATALOGO.modos[id].regras=regras;

// Mesa Quente 09: nomes de jogo, objetivo em uma frase, regras curtas e como pontuar.
for(const [id,info] of Object.entries({
 quem_e_mais_provavel:{nome:'Quem é Mais Provável?',descricao:'Todo mundo aponta quem combina com a carta.',objetivo:'Vote em quem da mesa mais combina com a frase.',pontos:'+1 se você votou em quem a mesa mais escolheu.',regras:['O leitor puxa a carta e revela a frase.','Cada pessoa vota em alguém da mesa (pode votar em si mesmo).','Quem recebe mais votos vai para o holofote e se explica.']},
 eu_nunca:{nome:'Eu Nunca',descricao:'Confesse o que você já fez.',objetivo:'Responda com sinceridade: já fez ou nunca fez?',pontos:'+1 ponto de ousadia para quem já fez.',regras:['O leitor revela a frase "Eu nunca…".','Cada pessoa marca Já fiz ou Nunca fiz.','Quem já fez ganha 1 ponto e a mesa pode pedir a história.']},
 o_que_voce_prefere:{nome:'Prefere Isso ou Aquilo?',descricao:'Duas opções, só uma escolha.',objetivo:'Escolha uma das duas opções e tente pensar como a maioria.',pontos:'+1 se você ficou do lado da maioria.',regras:['O leitor revela as duas opções.','Todo mundo escolhe uma.','Quem ficou com a maioria pontua. Defendam suas escolhas!']},
 preencha_a_lacuna:{nome:'Complete a Frase',descricao:'Escolha o final mais safado ou engraçado.',objetivo:'Complete a frase com a opção que vai fazer o leitor rir.',pontos:'+2 para a resposta escolhida pelo leitor.',regras:['O leitor revela uma frase com um espaço vazio.','Os outros escolhem uma das opções para completar.','O leitor escolhe a favorita. Quem mandou ganha 2 pontos.']},
 duas_verdades_uma_mentira:{nome:'Duas Verdades e Uma Mentira',descricao:'Blefe e descubra o blefe.',objetivo:'Leitor: engane a mesa. Mesa: descubra a mentira.',pontos:'+1 para quem acerta a mentira; o leitor ganha +1 por pessoa enganada.',regras:['O leitor escreve 3 fatos sobre si, um deles inventado.','A mesa vota em qual é a mentira.','A mentira é revelada e os pontos são somados.']},
 o_espiao:{nome:'O Espião',descricao:'Um infiltrado não sabe a palavra secreta.',objetivo:'Descubra quem é o espião. Se você for o espião, disfarce!',pontos:'+1 para quem acusa o espião certo. Se o espião escapar, ganha +3.',regras:['Todos recebem a mesma palavra, menos o espião.','Cada um fala uma dica sobre a palavra, sem dizê-la.','Abram as acusações e votem em quem parece perdido.']},
 bandeiras_vermelhas:{nome:'Bandeira Vermelha',descricao:'Um partido perfeito… com um defeito.',objetivo:'Decida se dá uma chance para a pessoa perfeita com um defeito absurdo.',pontos:'+1 se você ficou do lado da maioria.',regras:['O leitor revela a qualidade e o defeito.','Cada pessoa decide: daria uma chance ou não?','Quem ficou com a maioria pontua. Discutam!']},
 batalha_de_argumentos:{nome:'Batalha de Argumentos',descricao:'Dois jogadores, uma polêmica.',objetivo:'Convença a mesa! O leitor defende e o próximo jogador ataca.',pontos:'+2 para quem vencer o debate.',regras:['O leitor defende a frase; o próximo jogador é contra.','Cada um tem cerca de 30 segundos para argumentar.','A mesa vota no melhor argumento.']},
 o_termometro:{nome:'O Termômetro',descricao:'Adivinhe o número secreto pela pista.',objetivo:'O leitor dá uma pista; a mesa adivinha o número de 1 a 10.',pontos:'Acertou: +2. Errou por 1: +1. O leitor ganha +1 se alguém chegar perto.',regras:['O leitor vê um tema e um número secreto de 1 a 10.','Ele fala uma pista que combine com esse número. Ex.: escala de ousadia, número 9 = "no elevador".','A mesa chuta o número. Quanto mais perto, mais pontos.']},
 apenas_uma_dica:{nome:'Uma Palavra Só',descricao:'Dicas de uma palavra para o leitor adivinhar.',objetivo:'Ajude o leitor a adivinhar a palavra com dicas de uma palavra.',pontos:'Se o leitor acertar: ele ganha +2 e cada dica única ganha +1.',regras:['Todos veem a palavra secreta, menos o leitor.','Cada um manda UMA palavra de dica. Dicas repetidas são apagadas.','O leitor lê as dicas que sobraram e tenta adivinhar.']},
 palavra_proibida:{nome:'Palavra Proibida',descricao:'Explique sem dizer as palavras proibidas.',objetivo:'O leitor explica a palavra; quem acertar primeiro pontua.',pontos:'Quem acertar ganha +2 e o leitor também ganha +2.',regras:['O leitor vê a palavra e três termos proibidos.','Ele explica em voz alta sem usar esses termos.','A mesa digita palpites. O primeiro acerto encerra a rodada.']},
 niveis_intimidade:{nome:'Papo Sem Filtro',descricao:'Uma pergunta, resposta em voz alta.',objetivo:'Responda a pergunta da carta em voz alta. A mesa pode cutucar!',pontos:'+1 para o leitor por responder.',regras:['O leitor revela a pergunta e responde primeiro.','Quem quiser responde também.','O leitor encerra quando a conversa acabar e ganha 1 ponto.']},
 verdade_ou_desafio_hot:{nome:'Verdade ou Desafio',descricao:'Conte tudo ou cumpra o desafio.',objetivo:'Escolha: confessar uma verdade ou cumprir um desafio.',pontos:'Verdade: +1. Desafio cumprido: +2.',regras:['O leitor escolhe Verdade ou Desafio antes de ver a carta.','Revela para a mesa e cumpre na hora.','Encerre a rodada para receber os pontos. Pular não dá ponto.']}
}))Object.assign(window.MQ_CATALOGO.modos[id],info);

// Pacotes prontos: um toque configura jogos, clima e rodadas.
window.MQ_CATALOGO.pacotes=[
 {id:'casal',icone:'💋',nome:'Noite a Dois',descricao:'Para casais. Perguntas e desafios sobre vocês dois.',tones:['casal'],minigames:['niveis_intimidade','verdade_ou_desafio_hot','eu_nunca','o_que_voce_prefere','quem_e_mais_provavel','o_termometro','preencha_a_lacuna'],rodadas:14},
 {id:'quente',icone:'🔥',nome:'Esquenta Sem Filtro',descricao:'Para a galera adulta. Confissões, votos e desafios picantes.',tones:['adulto'],minigames:['quem_e_mais_provavel','eu_nunca','verdade_ou_desafio_hot','preencha_a_lacuna','o_que_voce_prefere','bandeiras_vermelhas','niveis_intimidade'],rodadas:16},
 {id:'blefe',icone:'🕵️',nome:'Blefe Picante',descricao:'Mentiras, espiões e palavras proibidas no tom 18+.',tones:['adulto'],minigames:['duas_verdades_uma_mentira','o_espiao','palavra_proibida','apenas_uma_dica','o_termometro','batalha_de_argumentos'],rodadas:12},
 {id:'leve',icone:'🎉',nome:'Festa Leve',descricao:'Para qualquer turma. Risadas sem constrangimento.',tones:['leve'],minigames:['quem_e_mais_provavel','eu_nunca','o_que_voce_prefere','preencha_a_lacuna','palavra_proibida','o_termometro'],rodadas:12}
];

// Mesa Quente 12: Termômetro mais claro e "Quem Sou Eu?" com pessoas famosas.
Object.assign(window.MQ_CATALOGO.modos.o_termometro,{descricao:'Uma escala, um número secreto e uma pista.',objetivo:'Descubra o número secreto do leitor pela pista que ele der.',pontos:'Acertou em cheio: +2. Errou por 1: +1. O leitor ganha +1 se alguém chegar perto.',regras:['Em cima aparece o tema e a escala: de 1 (uma ponta) a 10 (a outra).','Só o leitor vê o número secreto na carta. Ele fala UMA pista que combine com esse número. Ex.: tema "Lugar para transar", número 9 → "no elevador".','Os outros tocam no número que acham certo. Quem chegar mais perto pontua.']});
Object.assign(window.MQ_CATALOGO.modos.apenas_uma_dica,{nome:'Quem Sou Eu?',icone:'🎭',descricao:'Você é um famoso e não sabe quem!',objetivo:'O leitor é uma pessoa famosa e precisa descobrir quem é pelas dicas da mesa.',pontos:'Se acertar: o leitor ganha +2 e cada dica única ganha +1.',regras:['Todo mundo vê o famoso da carta, menos o leitor. Ele só vê a categoria (ex.: 🎤 Cantora).','Cada um manda UMA palavra de dica, sem dizer o nome. Dicas repetidas são canceladas.','O leitor lê as dicas que sobraram e chuta quem é. Vale apelido e pequeno erro de digitação.']});

// Mesa Quente 15: exemplos das regras no mesmo tom da partida.
const MQ_EXEMPLOS={
 quem_e_mais_provavel:{leve:'"Quem daria spoiler da série que você está vendo?" Todo mundo vota e a mais votada se explica.',profundo:'"Quem guarda mágoa por mais tempo?" Votem e conversem sobre o porquê.',adulto:'"Quem faz mais barulho na cama?" Todo mundo vota, e quem levar mais votos se defende.',casal:'"Quem de nós rouba o cobertor a noite toda?" Os dois votam ao mesmo tempo.'},
 eu_nunca:{leve:'"Eu nunca mandei mensagem para a pessoa errada." Quem já fez marca "Já fiz" e conta a história.',profundo:'"Eu nunca deixei de pedir ajuda por vergonha." Marque com sinceridade.',adulto:'"Eu nunca transei no primeiro encontro." Quem já fez marca e pontua.',casal:'"Eu nunca pensei em você no meio do trabalho e fiquei com vontade."'},
 o_que_voce_prefere:{leve:'"Seu chefe te adiciona no grupo dos amigos: saio na hora OU fico quieto e leio tudo?"',profundo:'"Recomeçar perto de quem você ama OU seguir um sonho longe dessas pessoas?"',adulto:'"No meio do sexo, sua mãe liga: atendo OU ignoro e perco o clima?"',casal:'"Uma noite surpresa num hotel OU um fim de semana sem sair do quarto?"'},
 preencha_a_lacuna:{leve:'"Num reality, eu seria eliminado por ____." Escolha "roncar alto demais" e veja se o leitor ri.',profundo:'"Hoje eu preciso de mais ____." Escolha a opção que mais combina com você.',adulto:'"A noite estava perfeita até a pessoa sussurrar ____." Escolha o final mais safado.',casal:'"A nossa próxima noite tem que ter ____." Escolha o que você mais quer.'},
 duas_verdades_uma_mentira:{leve:'"1. Já caí de bicicleta no meu aniversário. 2. Já cantei num karaokê sozinho. 3. Já conheci um famoso." Qual é a mentira?',profundo:'"1. Já morei sozinho. 2. Já mudei de curso. 3. Já fiquei um ano sem falar com um amigo." Qual é a mentira?',adulto:'"1. Já fiquei com alguém num show. 2. Já mandei nude para a pessoa errada. 3. Já transei num carro." Qual é a mentira?',casal:'"1. Pensei em você hoje de manhã. 2. Já quis te agarrar na casa dos seus pais. 3. Sonhei com você ontem." Qual é a mentira?'},
 o_espiao:{leve:'A palavra é "Praia". Dica: "precisa de protetor". O espião, sem saber, tenta disfarçar.',profundo:'A palavra é "Saudade". Dica: "dói quando alguém viaja".',adulto:'A palavra é "Motel". Dica: "tem espelho no teto". O espião tenta parecer que sabe.',casal:'A palavra é "Massagem". Dica: "começa nos ombros".'},
 bandeiras_vermelhas:{leve:'"A pessoa cozinha muito bem, mas deixa toda a louça para você." Daria uma chance?',profundo:'"A pessoa é leal, mas espera que você concorde com tudo." Daria uma chance?',adulto:'"Beija divinamente, mas narra tudo o que está fazendo." Daria uma chance?',casal:'"Seu amor faz a melhor massagem do mundo, mas dorme na metade." Perdoa?'},
 batalha_de_argumentos:{leve:'"Áudios deveriam durar no máximo um minuto." Um defende, o outro ataca, a mesa vota.',profundo:'"Mudar de opinião é sinal de força." Um defende, o outro ataca.',adulto:'"Rapidinha é melhor do que sexo demorado." Um defende, o outro ataca.',casal:'"Dormir sem roupa deveria ser regra de casal." Defendam seus lados.'},
 o_termometro:{leve:'Tema "Vergonha alheia" (1 = nem ligo, 10 = quero sumir). Seu número é 8, você diz: "cantar parabéns errado no microfone". A mesa chuta 7, 8 ou 9.',profundo:'Tema "Mágoa" (1 = esqueço no dia seguinte, 10 = nunca perdoaria). Número 9: "contar meu segredo para todo mundo".',adulto:'Tema "Lugar para transar" (1 = seguro, 10 = risco total). Número 9: "no elevador do trabalho".',casal:'Tema "Saudade de mim" (1 = nem senti, 10 = morri de saudade). Número 7: "um fim de semana sem me ver".'},
 apenas_uma_dica:{leve:'Você é Taylor Swift e só vê "Cantora pop". A mesa manda dicas: "loira", "ex-namorados"…',profundo:'Você é Einstein e só vê "Cientista". Dicas: "relatividade", "língua"…',adulto:'Você é Henry Cavill e só vê "Ator". Dicas: "Superman", "bigode"…',casal:'Vocês são Shrek e Fiona e só veem "Casal de animação". Dicas: "ogros", "pântano"…'},
 palavra_proibida:{leve:'Explique "Praia" sem dizer "mar", "areia" ou "sol".',profundo:'Explique "Saudade" sem dizer "falta", "lembrança" ou "distância".',adulto:'Explique "Motel" sem dizer "quarto", "cama" ou "hora".',casal:'Explique "Chupão" sem dizer "pescoço", "marca" ou "beijo".'},
 niveis_intimidade:{leve:'"Qual passeio você gostaria de repetir?" Responda e puxe a conversa.',profundo:'"Que conselho você daria para quem você era há cinco anos?"',adulto:'"Qual é a sua posição favorita? Explique por quê, sem vergonha."',casal:'"Qual foi a nossa melhor noite até hoje?"'},
 verdade_ou_desafio_hot:{leve:'Verdade: "Qual o seu medo mais bobo?" · Desafio: "Te desafio a seguir 5 pessoas aleatórias no Instagram."',profundo:'Verdade: "De qual amizade você sente falta?" · Desafio: "Te desafio a mandar mensagem para alguém da família dizendo que ama."',adulto:'Verdade: "Você já fingiu um orgasmo?" · Desafio: "Te desafio a imitar um cara gemendo por 5 segundos."',casal:'Verdade: "O que você pensou na primeira vez que me viu sem roupa?" · Desafio: "Te desafio a me dar um beijo de 10 segundos."'}
};
for(const [id,ex] of Object.entries(MQ_EXEMPLOS))if(window.MQ_CATALOGO.modos[id])window.MQ_CATALOGO.modos[id].exemplos=ex;
window.MQ_CATALOGO.modos.o_termometro.regras=['Em cima aparece o tema e a escala: de 1 (uma ponta) a 10 (a outra).','Só o leitor vê o número secreto na carta. Ele fala UMA pista que combine com esse número.','Os outros tocam no número que acham certo. Quem chegar mais perto pontua.'];
window.MQ_CATALOGO.modos.apenas_uma_dica.regras=['Todo mundo vê o famoso da carta, menos o leitor. Ele só vê a categoria.','Cada um manda UMA palavra de dica, sem dizer o nome. Dicas repetidas são canceladas.','O leitor lê as dicas que sobraram e chuta quem é. Vale apelido e pequeno erro de digitação.'];
window.MQ_CATALOGO.exemploPara=(id,tone)=>{const ex=window.MQ_CATALOGO.modos[id]?.exemplos;return ex?ex[tone]||ex.leve:'';};
