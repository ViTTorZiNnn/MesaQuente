// ============================================================
// BARALHOS.JS — Catálogo e Estrutura de Baralhos e Cartas
// ============================================================
// Estrutura de uma carta:
// {
//   id: string,
//   deck_id: string,
//   text: string,
//   mechanic: "ALVO" | "CONFISSAO" | "PROVA" | "ESCOLHA" | "DILEMA",
//   target: "SELF" | "RANDOM" | "VOTE" | "CHOOSE" | "ALL",
//   age_rating: "geral" | "18+",
//   subtype: string (opcional),
//   opcoes?: [string, string], // Para DILEMA (Opção A vs Opção B)
//   duration?: number // Duração em segundos (padrão: 30)
// }
// ============================================================

const BARALHOS_DISPONIVEIS = [
  {
    id: "quebra_gelo",
    nome: "Quebra-Gelo",
    descricao: "Perguntas leves e curiosas para esquentar a conversa e soltar a galera.",
    icone: "🧊",
    age_rating: "geral",
    cartas: [
      {
        id: "qg_01",
        deck_id: "quebra_gelo",
        text: "Qual foi a mentira mais idiota que você já contou só para não sair de casa?",
        mechanic: "CONFISSAO",
        target: "SELF",
        age_rating: "geral",
        subtype: "",
        duration: 30
      },
      {
        id: "qg_02",
        deck_id: "quebra_gelo",
        text: "Quem na roda teria mais chances de sobreviver a um apocalipse zumbi?",
        mechanic: "ALVO",
        target: "VOTE",
        age_rating: "geral",
        subtype: "",
        duration: 25
      },
      {
        id: "qg_03",
        deck_id: "quebra_gelo",
        text: "Imite um famoso ou alguém da roda por 20 segundos sem falar quem é. Os outros tentam adivinhar!",
        mechanic: "PROVA",
        target: "RANDOM",
        age_rating: "geral",
        subtype: "",
        duration: 35
      },
      {
        id: "qg_04",
        deck_id: "quebra_gelo",
        text: "O que você prefere para o resto da vida?",
        mechanic: "DILEMA",
        target: "ALL",
        age_rating: "geral",
        subtype: "",
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
        subtype: "",
        duration: 30
      },
      {
        id: "qg_06",
        deck_id: "quebra_gelo",
        text: "Conte a história do maior mico público que você já passou na frente de estranhos.",
        mechanic: "CONFISSAO",
        target: "RANDOM",
        age_rating: "geral",
        subtype: "",
        duration: 40
      },
      {
        id: "qg_07",
        deck_id: "quebra_gelo",
        text: "Quem da mesa gasta mais dinheiro com besteiras sem necessidade?",
        mechanic: "ALVO",
        target: "VOTE",
        age_rating: "geral",
        subtype: "",
        duration: 25
      }
    ]
  },
  {
    id: "confissoes_segredos",
    nome: "Confissões & Segredos",
    descricao: "Verdades picantes, segredos guardados a sete chaves e intimidades reveladas.",
    icone: "🤫",
    age_rating: "18+",
    cartas: [
      {
        id: "cs_01",
        deck_id: "confissoes_segredos",
        text: "Qual é o segredo sobre você que ninguém nesta mesa desconfia?",
        mechanic: "CONFISSAO",
        target: "SELF",
        age_rating: "18+",
        subtype: "",
        duration: 35
      },
      {
        id: "cs_02",
        deck_id: "confissoes_segredos",
        text: "Escolha quem da roda seria a pior pessoa para ser seu par romântico e explique o porquê!",
        mechanic: "ESCOLHA",
        target: "CHOOSE",
        age_rating: "18+",
        subtype: "",
        duration: 30
      },
      {
        id: "cs_03",
        deck_id: "confissoes_segredos",
        text: "Mostre a última foto salva na sua galeria do celular sem apagar nada.",
        mechanic: "PROVA",
        target: "RANDOM",
        age_rating: "18+",
        subtype: "",
        duration: 30
      },
      {
        id: "cs_04",
        deck_id: "confissoes_segredos",
        text: "Qual você preferiria que acontecesse agora?",
        mechanic: "DILEMA",
        target: "ALL",
        age_rating: "18+",
        subtype: "",
        opcoes: ["Histórico de buscas do navegador exposto", "Últimos 3 áudios de WhatsApp ouvidos na roda"],
        duration: 30
      },
      {
        id: "cs_05",
        deck_id: "confissoes_segredos",
        text: "Quem na mesa tem o histórico amoroso mais caótico e imprevisível?",
        mechanic: "ALVO",
        target: "VOTE",
        age_rating: "18+",
        subtype: "",
        duration: 25
      },
      {
        id: "cs_06",
        deck_id: "confissoes_segredos",
        text: "Conte um momento em que você fingiu gostar de algo ou de alguém só por conveniência social.",
        mechanic: "CONFISSAO",
        target: "RANDOM",
        age_rating: "18+",
        subtype: "",
        duration: 35
      },
      {
        id: "cs_07",
        deck_id: "confissoes_segredos",
        text: "Deixe a pessoa à sua esquerda ler a primeira mensagem não lida do seu WhatsApp/direct.",
        mechanic: "PROVA",
        target: "SELF",
        age_rating: "18+",
        subtype: "",
        duration: 30
      }
    ]
  },
  {
    id: "fogo_no_parquinho",
    nome: "Fogo no Parquinho",
    descricao: "Clima tenso, votos polêmicos e discussões que vão incendiar a mesa.",
    icone: "🔥",
    age_rating: "18+",
    cartas: [
      {
        id: "fp_01",
        deck_id: "fogo_no_parquinho",
        text: "Quem da mesa seria cancelado na internet mais rápido se falasse tudo o que pensa?",
        mechanic: "ALVO",
        target: "VOTE",
        age_rating: "18+",
        subtype: "",
        duration: 25
      },
      {
        id: "fp_02",
        deck_id: "fogo_no_parquinho",
        text: "Diga um defeito que você não suporta em alguém da mesa, sem citar o nome diretamente.",
        mechanic: "CONFISSAO",
        target: "RANDOM",
        age_rating: "18+",
        subtype: "",
        duration: 35
      },
      {
        id: "fp_03",
        deck_id: "fogo_no_parquinho",
        text: "Escolha uma pessoa da mesa para trocar de celular com você desbloqueado por 1 minuto.",
        mechanic: "ESCOLHA",
        target: "CHOOSE",
        age_rating: "18+",
        subtype: "",
        duration: 30
      },
      {
        id: "fp_04",
        deck_id: "fogo_no_parquinho",
        text: "Qual situação você aceitaria melhor?",
        mechanic: "DILEMA",
        target: "ALL",
        age_rating: "18+",
        subtype: "",
        opcoes: ["Ficar com o ex do seu melhor amigo", "Seu melhor amigo namorar o seu ex"],
        duration: 30
      },
      {
        id: "fp_05",
        deck_id: "fogo_no_parquinho",
        text: "Quem da mesa é mais dramático ou perde o controle com facilidade?",
        mechanic: "ALVO",
        target: "VOTE",
        age_rating: "18+",
        subtype: "",
        duration: 25
      }
    ]
  },
  {
    id: "desafio_na_mesa",
    nome: "Desafio na Mesa",
    descricao: "Ações na hora, micos instantâneos e provas de coragem na frente de todo mundo.",
    icone: "⚡",
    age_rating: "geral",
    cartas: [
      {
        id: "dm_01",
        deck_id: "desafio_na_mesa",
        text: "Ligue para um contato aleatório da sua agenda e cante 'Parabéns pra Você' com seriedade.",
        mechanic: "PROVA",
        target: "RANDOM",
        age_rating: "geral",
        subtype: "",
        duration: 35
      },
      {
        id: "dm_02",
        deck_id: "desafio_na_mesa",
        text: "Faça uma pose de estátua desconfortável e fique congelado até a próxima rodada!",
        mechanic: "PROVA",
        target: "SELF",
        age_rating: "geral",
        subtype: "",
        duration: 25
      },
      {
        id: "dm_03",
        deck_id: "desafio_na_mesa",
        text: "Escolha um jogador para inventar uma dancinha de 10 segundos que você deve repetir na hora!",
        mechanic: "ESCOLHA",
        target: "CHOOSE",
        age_rating: "geral",
        subtype: "",
        duration: 30
      },
      {
        id: "dm_04",
        deck_id: "desafio_na_mesa",
        text: "Fale as suas próximas falas com sotaque de narrador de rádio dos anos 80.",
        mechanic: "PROVA",
        target: "RANDOM",
        age_rating: "geral",
        subtype: "",
        duration: 30
      },
      {
        id: "dm_05",
        deck_id: "desafio_na_mesa",
        text: "Quem na mesa toparia os desafios mais loucos por R$ 50 no pix?",
        mechanic: "ALVO",
        target: "VOTE",
        age_rating: "geral",
        subtype: "",
        duration: 25
      }
    ]
  },
  {
    id: "dilemas_impossiveis",
    nome: "Dilemas Impossíveis",
    descricao: "Escolhas absurdas, sem saída fácil, onde todo mundo vai querer opinar.",
    icone: "⚖️",
    age_rating: "geral",
    cartas: [
      {
        id: "di_01",
        deck_id: "dilemas_impossiveis",
        text: "Qual é o menor dos males?",
        mechanic: "DILEMA",
        target: "ALL",
        age_rating: "geral",
        subtype: "",
        opcoes: ["Nunca mais poder usar tempero na comida", "Nunca mais poder tomar banho quente"],
        duration: 30
      },
      {
        id: "di_02",
        deck_id: "dilemas_impossiveis",
        text: "O que você preferiria encarar?",
        mechanic: "DILEMA",
        target: "ALL",
        age_rating: "geral",
        subtype: "",
        opcoes: ["Reviver seu dia de maior vergonha todo mês", "Viver com soluço constante"],
        duration: 30
      },
      {
        id: "di_03",
        deck_id: "dilemas_impossiveis",
        text: "Quem da mesa seria mais provável de topar morar numa ilha deserta sem internet por 1 ano por 1 milhão?",
        mechanic: "ALVO",
        target: "VOTE",
        age_rating: "geral",
        subtype: "",
        duration: 25
      },
      {
        id: "di_04",
        deck_id: "dilemas_impossiveis",
        text: "Escolha alguém da roda para defender uma opinião absurda (ex: 'a Terra é oca') com argumentos sérios por 1 minuto!",
        mechanic: "ESCOLHA",
        target: "CHOOSE",
        age_rating: "geral",
        subtype: "",
        duration: 40
      },
      {
        id: "di_05",
        deck_id: "dilemas_impossiveis",
        text: "Você prefere ter que cantar tudo o que quer pedir em restaurantes ou dar uma cambalhota ao cumprimentar conhecidos?",
        mechanic: "DILEMA",
        target: "ALL",
        age_rating: "geral",
        subtype: "",
        opcoes: ["Cantar pedidos em restaurantes", "Cambalhota ao cumprimentar conhecidos"],
        duration: 30
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
