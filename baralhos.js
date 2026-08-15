// ============================================================
// BARALHOS.JS — Catálogo e Estrutura de Baralhos, Minigames e Cartas
// ============================================================
// Estrutura de uma carta:
// {
//   id: string,
//   deck_id: string,
//   text: string,
//   mechanic: "ALVO" | "CONFISSAO" | "PROVA" | "ESCOLHA" | "DILEMA" | "VERDADE_DESAFIO" | "EU_NUNCA" | "LACUNA",
//   target: "SELF" | "RANDOM" | "VOTE" | "CHOOSE" | "ALL",
//   age_rating: "geral" | "18+",
//   subtype?: string, // ex: "Nível 1 - Percepção", "Nível 2 - Conexão", "Nível 3 - +18 Íntimo"
//   nivel?: number, // 1, 2 ou 3 para Níveis de Intimidade
//   verdadeTexto?: string, // Para VERDADE_DESAFIO
//   desafioTexto?: string, // Para VERDADE_DESAFIO
//   opcoes?: [string, string], // Para DILEMA (Opção A vs Opção B)
//   respostasBrancas?: string[], // Para LACUNA (Cartas Brancas)
//   duration?: number // Duração em segundos
// }
// ============================================================

const BARALHOS_DISPONIVEIS = [
  // ------------------------------------------------------------
  // MINIGAME 1: NÍVEIS DE INTIMIDADE (Estilo "We're Not Really Strangers")
  // ------------------------------------------------------------
  {
    id: "niveis_intimidade",
    nome: "Níveis de Intimidade",
    categoria: "casal",
    descricao: "Perguntas de vulnerabilidade e flerte em 3 níveis (Percepção, Conexão e +18 Íntimo).",
    icone: "💜",
    age_rating: "18+",
    regras: [
      "Uma troca profunda de perguntas focada em vulnerabilidade, química e conexão.",
      "Dividido em 3 níveis: Nível 1 (Percepção), Nível 2 (Conexão) e Nível 3 (+18 Íntimo).",
      "Puxem a carta, leiam na tela e respondam olhando nos olhos ou no áudio com total sinceridade."
    ],
    cartas: [
      // Nível 1: Percepção
      {
        id: "ni_p01",
        deck_id: "niveis_intimidade",
        text: "Qual você acha que é o meu tipo de pessoa ideal para me relacionar?",
        mechanic: "CONFISSAO",
        target: "ALL",
        age_rating: "geral",
        subtype: "Nível 1 • Percepção",
        nivel: 1,
        duration: 40
      },
      {
        id: "ni_p02",
        deck_id: "niveis_intimidade",
        text: "Qual foi a sua primeira impressão sobre mim que hoje você descobriu que estava errada?",
        mechanic: "CONFISSAO",
        target: "ALL",
        age_rating: "geral",
        subtype: "Nível 1 • Percepção",
        nivel: 1,
        duration: 45
      },
      {
        id: "ni_p03",
        deck_id: "niveis_intimidade",
        text: "O que você acha que eu mais valorizo em uma parceira ou amiga próxima?",
        mechanic: "CONFISSAO",
        target: "ALL",
        age_rating: "geral",
        subtype: "Nível 1 • Percepção",
        nivel: 1,
        duration: 40
      },
      {
        id: "ni_p04",
        deck_id: "niveis_intimidade",
        text: "Pelo meu jeito de falar e agir, você acha que eu me apaixono rápido ou demoro para me apegar?",
        mechanic: "CONFISSAO",
        target: "ALL",
        age_rating: "geral",
        subtype: "Nível 1 • Percepção",
        nivel: 1,
        duration: 40
      },
      // Nível 2: Conexão
      {
        id: "ni_c01",
        deck_id: "niveis_intimidade",
        text: "Qual foi a melhor experiência ou detalhe mais marcante de um encontro romântico que você já teve?",
        mechanic: "CONFISSAO",
        target: "ALL",
        age_rating: "geral",
        subtype: "Nível 2 • Conexão",
        nivel: 2,
        duration: 50
      },
      {
        id: "ni_c02",
        deck_id: "niveis_intimidade",
        text: "O que alguém precisa fazer para você se sentir verdadeiramente segura(o) e compreendida(o)?",
        mechanic: "CONFISSAO",
        target: "ALL",
        age_rating: "geral",
        subtype: "Nível 2 • Conexão",
        nivel: 2,
        duration: 50
      },
      {
        id: "ni_c03",
        deck_id: "niveis_intimidade",
        text: "Qual é a sua memória afetiva mais doce ou um momento em que você sentiu seu coração bater mais forte?",
        mechanic: "CONFISSAO",
        target: "ALL",
        age_rating: "geral",
        subtype: "Nível 2 • Conexão",
        nivel: 2,
        duration: 50
      },
      {
        id: "ni_c04",
        deck_id: "niveis_intimidade",
        text: "Se você pudesse me fazer uma pergunta sem medo de julgamento, o que você me perguntaria agora?",
        mechanic: "CONFISSAO",
        target: "ALL",
        age_rating: "geral",
        subtype: "Nível 2 • Conexão",
        nivel: 2,
        duration: 45
      },
      // Nível 3: +18 Íntimo
      {
        id: "ni_i01",
        deck_id: "niveis_intimidade",
        text: "O que você tem muita vontade de fazer ou experimentar a dois, mas tem vergonha de pedir?",
        mechanic: "CONFISSAO",
        target: "ALL",
        age_rating: "18+",
        subtype: "Nível 3 • +18 Íntimo",
        nivel: 3,
        duration: 50
      },
      {
        id: "ni_i02",
        deck_id: "niveis_intimidade",
        text: "Qual é o detalhe físico, toque ou carícia que mais mexe com você e te faz perder o controle?",
        mechanic: "CONFISSAO",
        target: "ALL",
        age_rating: "18+",
        subtype: "Nível 3 • +18 Íntimo",
        nivel: 3,
        duration: 50
      },
      {
        id: "ni_i03",
        deck_id: "niveis_intimidade",
        text: "Qual foi o lugar mais inusitado ou proibido onde você já teve vontade de ficar com alguém?",
        mechanic: "CONFISSAO",
        target: "ALL",
        age_rating: "18+",
        subtype: "Nível 3 • +18 Íntimo",
        nivel: 3,
        duration: 45
      },
      {
        id: "ni_i04",
        deck_id: "niveis_intimidade",
        text: "Descreva sem censura uma fantasia ou cenário provocativo que você adoraria viver comigo ou com alguém.",
        mechanic: "CONFISSAO",
        target: "ALL",
        age_rating: "18+",
        subtype: "Nível 3 • +18 Íntimo",
        nivel: 3,
        duration: 55
      }
    ]
  },

  // ------------------------------------------------------------
  // MINIGAME 2: ROLETA DE CONSEQUÊNCIAS (Verdade ou Desafio Hot Online)
  // ------------------------------------------------------------
  {
    id: "roleta_consequencias",
    nome: "Roleta de Consequências",
    categoria: "casal",
    descricao: "Verdade ou Desafio adaptado para o ambiente online, fotos de galeria e revelações.",
    icone: "🎭",
    age_rating: "18+",
    regras: [
      "O jogador da vez escolhe entre 'Verdade 🗣️' ou 'Desafio ⚡'.",
      "Se escolher Verdade: Responda uma pergunta indiscreta e sem filtro sobre seu passado ou desejos.",
      "Se escolher Desafio: Cumpra a prova ao vivo adaptada para celular (foto de galeria, busca, áudio, câmera).",
      "Se recusar a cumprir, sofra o castigo decretado pela mesa!"
    ],
    cartas: [
      {
        id: "rc_01",
        deck_id: "roleta_consequencias",
        text: "Escolha entre responder uma Verdade sem filtro ou encarar um Desafio online na hora!",
        mechanic: "VERDADE_DESAFIO",
        target: "SELF",
        age_rating: "18+",
        subtype: "Verdade ou Desafio",
        verdadeTexto: "Qual é a história do encontro mais vergonhoso ou desastroso que você já teve?",
        desafioTexto: "Mande no chat ou mostre a última foto que você apagou da lixeira da sua galeria!",
        duration: 45
      },
      {
        id: "rc_02",
        deck_id: "roleta_consequencias",
        text: "Decida sua sorte na mesa: Verdade picante ou Desafio revelador?",
        mechanic: "VERDADE_DESAFIO",
        target: "SELF",
        age_rating: "18+",
        subtype: "Verdade ou Desafio",
        verdadeTexto: "Você já stalkeou alguém da mesa ou o perfil de alguém recente? Quem foi e o que procurava?",
        desafioTexto: "Mostre o seu histórico de pesquisa recente do Google / Safari na câmera por 5 segundos!",
        duration: 45
      },
      {
        id: "rc_03",
        deck_id: "roleta_consequencias",
        text: "Chegou a sua vez de enfrentar a mesa: Verdade ou Desafio?",
        mechanic: "VERDADE_DESAFIO",
        target: "SELF",
        age_rating: "18+",
        subtype: "Verdade ou Desafio",
        verdadeTexto: "Qual foi a mensagem de flerte mais ousada que você já mandou ou recebeu?",
        desafioTexto: "Grave e envie um áudio de 5 segundos no grupo de amigos sussurrando algo misterioso!",
        duration: 45
      },
      {
        id: "rc_04",
        deck_id: "roleta_consequencias",
        text: "Escolha seu caminho: A verdade nua e crua ou a consequência na frente de todos?",
        mechanic: "VERDADE_DESAFIO",
        target: "SELF",
        age_rating: "18+",
        subtype: "Verdade ou Desafio",
        verdadeTexto: "Já se apaixonou por alguém que não devia (ex-amiga, colega de trabalho, compromissada)?",
        desafioTexto: "Deixe a mesa escolher uma pessoa da sua lista de contatos para você mandar 'Achei você fofo(a)' agora!",
        duration: 50
      },
      {
        id: "rc_05",
        deck_id: "roleta_consequencias",
        text: "Momento decisivo: Verdade ou Desafio ao vivo?",
        mechanic: "VERDADE_DESAFIO",
        target: "SELF",
        age_rating: "18+",
        subtype: "Verdade ou Desafio",
        verdadeTexto: "O que você achou de mais atraente em mim no primeiro minuto em que nos vimos?",
        desafioTexto: "Ligue a câmera e faça um olhar sedutor de cinema por 15 segundos sem rir!",
        duration: 40
      }
    ]
  },

  // ------------------------------------------------------------
  // MINIGAME 3: EU NUNCA: EDIÇÃO VALE TUDO (Foco Sáfico & Amigas)
  // ------------------------------------------------------------
  {
    id: "eu_nunca_safico",
    nome: "Eu Nunca: Vale Tudo",
    categoria: "amigas",
    descricao: "O clássico Eu Nunca com esteriótipos divertidos da comunidade e confissões hilárias.",
    icone: "🍷",
    age_rating: "18+",
    regras: [
      "A afirmação aparece na tela para todas as jogadoras da sala.",
      "Cada participante clica em 'Já Fiz 🍷' ou 'Sou Inocente 😇'.",
      "O sistema revela as porcentagens e votos ao vivo.",
      "Quem clicou em 'Já Fiz' toma um gole de bebida ou conta a história no áudio!"
    ],
    cartas: [
      {
        id: "en_01",
        deck_id: "eu_nunca_safico",
        text: "Eu nunca aluguei um caminhão de mudança no segundo encontro (ou passei semanas na casa do date).",
        mechanic: "EU_NUNCA",
        target: "ALL",
        age_rating: "geral",
        subtype: "Eu Nunca",
        duration: 35
      },
      {
        id: "en_02",
        deck_id: "eu_nunca_safico",
        text: "Eu nunca me apaixonei perdidamente por uma amiga hétero.",
        mechanic: "EU_NUNCA",
        target: "ALL",
        age_rating: "geral",
        subtype: "Eu Nunca",
        duration: 35
      },
      {
        id: "en_03",
        deck_id: "eu_nunca_safico",
        text: "Eu nunca fiz o mapa astral e a sinastria completa de alguém antes mesmo do primeiro beijo.",
        mechanic: "EU_NUNCA",
        target: "ALL",
        age_rating: "geral",
        subtype: "Eu Nunca",
        duration: 35
      },
      {
        id: "en_04",
        deck_id: "eu_nunca_safico",
        text: "Eu nunca mandei indireta no Close Friends do Instagram ou TikTok esperando uma única pessoa visualizar.",
        mechanic: "EU_NUNCA",
        target: "ALL",
        age_rating: "geral",
        subtype: "Eu Nunca",
        duration: 35
      },
      {
        id: "en_05",
        deck_id: "eu_nunca_safico",
        text: "Eu nunca fiquei amiga da ex da minha ex (ou acabei no mesmo rolê com 3 ex-ficantes).",
        mechanic: "EU_NUNCA",
        target: "ALL",
        age_rating: "18+",
        subtype: "Eu Nunca",
        duration: 35
      },
      {
        id: "en_06",
        deck_id: "eu_nunca_safico",
        text: "Eu nunca chorei ouvindo música triste (Taylor Swift, Reneé Rapp, Phoebe Bridgers) lembrando de alguém que vi 2 vezes.",
        mechanic: "EU_NUNCA",
        target: "ALL",
        age_rating: "geral",
        subtype: "Eu Nunca",
        duration: 35
      },
      {
        id: "en_07",
        deck_id: "eu_nunca_safico",
        text: "Eu nunca beijei alguém e no dia seguinte já estava planejando adotar um gato juntas.",
        mechanic: "EU_NUNCA",
        target: "ALL",
        age_rating: "geral",
        subtype: "Eu Nunca",
        duration: 35
      }
    ]
  },

  // ------------------------------------------------------------
  // MINIGAME 4: QUEM É MAIS PROVÁVEL? (Julgamento em Grupo)
  // ------------------------------------------------------------
  {
    id: "quem_e_mais_provavel",
    nome: "Quem é Mais Provável?",
    categoria: "amigas",
    descricao: "Coloque as amigas na fogueira apontando o dedo para a pessoa mais provável da situação.",
    icone: "🎯",
    age_rating: "18+",
    regras: [
      "A carta lança uma situação extrema, hilária ou picante.",
      "Todas as jogadoras votam anonimamente no avatar de quem mais combina com a situação.",
      "O sistema acende o holofote na mais votada, que cumpre a penalidade ou explica a fama!"
    ],
    cartas: [
      {
        id: "qp_01",
        deck_id: "quem_e_mais_provavel",
        text: "Quem da mesa é mais provável de mandar mensagem para a ex às 3 horas da manhã em um sábado?",
        mechanic: "ALVO",
        target: "VOTE",
        age_rating: "geral",
        subtype: "Quem é Mais Provável?",
        duration: 30
      },
      {
        id: "qp_02",
        deck_id: "quem_e_mais_provavel",
        text: "Quem da mesa tem mais chance de transformar um 'date casual de sexta' em um noivado em 1 semana?",
        mechanic: "ALVO",
        target: "VOTE",
        age_rating: "geral",
        subtype: "Quem é Mais Provável?",
        duration: 30
      },
      {
        id: "qp_03",
        deck_id: "quem_e_mais_provavel",
        text: "Quem na roda seria cancelada na internet em 10 minutos se vazassem o grupo privado do WhatsApp?",
        mechanic: "ALVO",
        target: "VOTE",
        age_rating: "18+",
        subtype: "Quem é Mais Provável?",
        duration: 30
      },
      {
        id: "qp_04",
        deck_id: "quem_e_mais_provavel",
        text: "Quem da mesa se apaixona mais fácil e cria um fã-clube mental pela pessoa em 2 dias?",
        mechanic: "ALVO",
        target: "VOTE",
        age_rating: "geral",
        subtype: "Quem é Mais Provável?",
        duration: 30
      },
      {
        id: "qp_05",
        deck_id: "quem_e_mais_provavel",
        text: "Quem é mais provável de beijar alguém desconhecido no rolê e depois esquecer o nome da criatura?",
        mechanic: "ALVO",
        target: "VOTE",
        age_rating: "18+",
        subtype: "Quem é Mais Provável?",
        duration: 30
      },
      {
        id: "qp_06",
        deck_id: "quem_e_mais_provavel",
        text: "Quem da mesa gasta mais dinheiro no cartão de crédito em momentos de carência emocional?",
        mechanic: "ALVO",
        target: "VOTE",
        age_rating: "geral",
        subtype: "Quem é Mais Provável?",
        duration: 30
      }
    ]
  },

  // ------------------------------------------------------------
  // MINIGAME 5: PREENCHA A LACUNA (Cards Against Humanity Customizado)
  // ------------------------------------------------------------
  {
    id: "preencha_a_lacuna",
    nome: "Preencha a Lacuna",
    categoria: "amigas",
    descricao: "Humor ácido e +18 completando a frase preta com opções brancas bizarras e explícitas.",
    icone: "🃏",
    age_rating: "18+",
    regras: [
      "Uma Carta Preta no centro faz uma afirmação com um espaço em branco (________).",
      "Cada jogadora escolhe uma carta branca da sua mão com a melhor resposta cômica ou ácida.",
      "A Juíza da rodada lê as respostas anônimas e elege a resposta mais lendária!"
    ],
    cartas: [
      {
        id: "pl_01",
        deck_id: "preencha_a_lacuna",
        text: "O segredo para um relacionamento perfeito e duradouro é ________.",
        mechanic: "LACUNA",
        target: "ALL",
        age_rating: "18+",
        subtype: "Preencha a Lacuna",
        respostasBrancas: [
          "Terapia de casal no segundo dia de namoro",
          "Compartilhar a senha do cartão e o mapa astral",
          "Fingir demência quando a ex manda mensagem",
          "Fazer um mutirão de maratona de The L Word",
          "Um estoque infinito de vinho e fofoca"
        ],
        duration: 40
      },
      {
        id: "pl_02",
        deck_id: "preencha_a_lacuna",
        text: "No meu primeiro encontro, a maior 'red flag' instantânea é ________.",
        mechanic: "LACUNA",
        target: "ALL",
        age_rating: "18+",
        subtype: "Preencha a Lacuna",
        respostasBrancas: [
          "Falar da ex em 98% das frases",
          "Dizer que signo é bobagem e não ter senso de humor",
          "Pedir para dividir R$ 1,50 do estacionamento",
          "Não gostar de cachorros e gatos",
          "Ser fã de podcasts de coach motivacional"
        ],
        duration: 40
      },
      {
        id: "pl_03",
        deck_id: "preencha_a_lacuna",
        text: "O que não pode faltar em uma noite inesquecível entre quatro paredes é ________.",
        mechanic: "LACUNA",
        target: "ALL",
        age_rating: "18+",
        subtype: "Preencha a Lacuna",
        respostasBrancas: [
          "Uma playlist com Reneé Rapp e luz baixa",
          "Comunicação direta sem vergonha de pedir o que gosta",
          "Pizza de madrugada depois de cansar",
          "Massagem demorada nas costas com óleo perfumado",
          "Carinho no cabelo até o dia amanhecer"
        ],
        duration: 40
      },
      {
        id: "pl_04",
        deck_id: "preencha_a_lacuna",
        text: "O motivo real pelo qual me atrasei 40 minutos para o rolê hoje foi ________.",
        mechanic: "LACUNA",
        target: "ALL",
        age_rating: "geral",
        subtype: "Preencha a Lacuna",
        respostasBrancas: [
          "Troquei de roupa 7 vezes e fiquei deitada na cama olhando pro teto",
          "Fiquei presa numa thread de fofoca no Twitter",
          "Minha gata dormiu em cima das minhas pernas e não pude acordar ela",
          "Estava ensaiando poses no espelho",
          "Crise existencial antes de sair de casa"
        ],
        duration: 40
      }
    ]
  },

  // ------------------------------------------------------------
  // BARALHOS CLÁSSICOS (Compatibilidade & Modos Legados)
  // ------------------------------------------------------------
  {
    id: "quebra_gelo",
    nome: "Quebra-Gelo Clássico",
    categoria: "especial",
    descricao: "Perguntas leves e curiosas para esquentar a conversa e soltar a galera.",
    icone: "🧊",
    age_rating: "geral",
    regras: [
      "Perguntas casuais, leves e engraçadas para esquentar a mesa.",
      "Respondam sem pressão e descubram curiosidades uns sobre os outros."
    ],
    cartas: [
      {
        id: "qg_01",
        deck_id: "quebra_gelo",
        text: "Qual foi a mentira mais idiota que você já contou só para não sair de casa?",
        mechanic: "CONFISSAO",
        target: "SELF",
        age_rating: "geral",
        subtype: "Quebra-Gelo",
        duration: 30
      },
      {
        id: "qg_02",
        deck_id: "quebra_gelo",
        text: "Quem na roda teria mais chances de sobreviver a um apocalipse zumbi?",
        mechanic: "ALVO",
        target: "VOTE",
        age_rating: "geral",
        subtype: "Quebra-Gelo",
        duration: 25
      },
      {
        id: "qg_03",
        deck_id: "quebra_gelo",
        text: "Imite um famoso ou alguém da roda por 20 segundos sem falar quem é. Os outros tentam adivinhar!",
        mechanic: "PROVA",
        target: "RANDOM",
        age_rating: "geral",
        subtype: "Quebra-Gelo",
        duration: 35
      },
      {
        id: "qg_04",
        deck_id: "quebra_gelo",
        text: "O que você prefere para o resto da vida?",
        mechanic: "DILEMA",
        target: "ALL",
        age_rating: "geral",
        subtype: "Quebra-Gelo",
        opcoes: ["Falar sempre gritando", "Sussurrar tudo"],
        duration: 30
      },
      {
        id: "qg_05",
        deck_id: "quebra_gelo",
        text: "Escolha uma pessoa da mesa para te dar um apelido novo que você terá que aceitar até o fim do jogo!",
        mechanic: "ESCOLHA",
        target: "CHOOSE",
        age_rating: "geral",
        subtype: "Quebra-Gelo",
        duration: 30
      }
    ]
  },
  {
    id: "fogo_no_parquinho",
    nome: "Fogo no Parquinho",
    categoria: "especial",
    descricao: "Clima tenso, votos polêmicos e discussões que vão incendiar a mesa.",
    icone: "🔥",
    age_rating: "18+",
    regras: [
      "Votos diretos, dilemas impossíveis e verdades sem filtro.",
      "Estejam prontos para defender suas opiniões polêmicas na roda!"
    ],
    cartas: [
      {
        id: "fp_01",
        deck_id: "fogo_no_parquinho",
        text: "Quem da mesa seria cancelado na internet mais rápido se falasse tudo o que pensa?",
        mechanic: "ALVO",
        target: "VOTE",
        age_rating: "18+",
        subtype: "Fogo no Parquinho",
        duration: 25
      },
      {
        id: "fp_02",
        deck_id: "fogo_no_parquinho",
        text: "Diga um defeito que você não suporta em alguém da mesa, sem citar o nome diretamente.",
        mechanic: "CONFISSAO",
        target: "RANDOM",
        age_rating: "18+",
        subtype: "Fogo no Parquinho",
        duration: 35
      },
      {
        id: "fp_03",
        deck_id: "fogo_no_parquinho",
        text: "Qual situação você aceitaria melhor?",
        mechanic: "DILEMA",
        target: "ALL",
        age_rating: "18+",
        subtype: "Fogo no Parquinho",
        opcoes: ["Ficar com a ex do seu melhor amigo", "Seu melhor amigo namorar a sua ex"],
        duration: 30
      },
      {
        id: "fp_04",
        deck_id: "fogo_no_parquinho",
        text: "Quem da mesa é mais dramático(a) ou perde o controle com facilidade?",
        mechanic: "ALVO",
        target: "VOTE",
        age_rating: "18+",
        subtype: "Fogo no Parquinho",
        duration: 25
      }
    ]
  }
];

// Utilitários de manipulação e sorteio
function obterBaralhoPorId(deckId) {
  return BARALHOS_DISPONIVEIS.find((b) => b.id === deckId) || null;
}

/**
 * Embaralha um array usando algoritmo de Fisher-Yates
 */
function embaralharArray(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * Puxa um item da sacola. Se a sacola estiver vazia, recarrega com a lista original e embaralha.
 * Retorna { itemPuxado, novaSacola }
 */
function puxarDaSacola(sacolaAtual, listaBase) {
  let sacola = Array.isArray(sacolaAtual) ? [...sacolaAtual] : [];
  if (sacola.length === 0) {
    sacola = embaralharArray(listaBase);
  }
  const itemPuxado = sacola.pop();
  return { itemPuxado, novaSacola: sacola };
}
