// ============================================================
// LOBBY.JS — Mesa Quente (2.5D Physical Card Table & Multiplayer)
// ============================================================

// Pega o código da sala pela URL (?sala=ABCD)
const parametros = new URLSearchParams(window.location.search);
const codigoSala = (parametros.get("sala") || "").toUpperCase();

if (!codigoSala) {
  window.location.href = "index.html";
}

// Elementos da UI — Painéis
const painelLobby = document.getElementById("painel-lobby");
const painelConfiguracao = document.getElementById("painel-configuracao");
const painelMesaJogo = document.getElementById("painel-mesa-jogo");
const painelFimPartida = document.getElementById("painel-fim-partida");

// Elementos — Topo & Navegação
const btnSairSala = document.getElementById("btn-sair-sala");
const btnAudio = document.getElementById("btn-audio");

// Elementos — Lobby 2.5D
const textoCodigoSala = document.getElementById("texto-codigo-sala");
const btnCopiarCodigo = document.getElementById("btn-copiar-codigo");
const gradeAssentosMesa = document.getElementById("grade-assentos-mesa");
const deckCentroLobby = document.getElementById("deck-centro-lobby");
const contadorJogadores = document.getElementById("contador-jogadores");
const avisoSozinhoSala = document.getElementById("aviso-sozinho-sala");
const btnVoltarInicioSozinho = document.getElementById("btn-voltar-inicio-sozinho");
const controlesHostLobby = document.getElementById("controles-host-lobby");
const visaoJogadorEspera = document.getElementById("visao-jogador-espera");
const btnAbrirConfig = document.getElementById("btn-abrir-config");
const btnIniciarPartida = document.getElementById("btn-iniciar-partida");
const mensagemErroLobby = document.getElementById("mensagem-erro-lobby");

// Elementos — Configuração de Baralhos
const listaBaralhosConfig = document.getElementById("lista-baralhos-config");
const gradeQtdCartas = document.getElementById("grade-qtd-cartas");
const resumoBaralhos = document.getElementById("resumo-baralhos-selecionados");
const resumoTotalCartas = document.getElementById("resumo-total-cartas");
const btnSalvarIniciarConfig = document.getElementById("btn-salvar-iniciar-config");
const btnVoltarConfig = document.getElementById("btn-voltar-config");

// Elementos — Zona Superior (Os Outros)
const rodaAmigosTopo = document.getElementById("roda-amigos-topo");

// Elementos — Zona Central (A Mesa e o Baralho 2.5D)
const tagDeckNome = document.getElementById("tag-deck-nome");
const badgeTimerJogo = document.getElementById("badge-timer-jogo");
const barraTimerPreenchimento = document.getElementById("barra-timer-preenchimento");
const contadorCartasRodada = document.getElementById("contador-cartas-rodada");
const deckPilhaJogo = document.getElementById("deck-pilha-jogo");
const cartaFlipWrapper = document.getElementById("carta-flip-wrapper");
const cartaJogoElemento = document.getElementById("carta-jogo-elemento");
const cartaDeckIcone = document.getElementById("carta-deck-icone");
const cartaDeckNome = document.getElementById("carta-deck-nome");
const cartaMechanicTag = document.getElementById("carta-mechanic-tag");
const cartaTexto = document.getElementById("carta-texto");
const blocoAlvoSorteado = document.getElementById("bloco-alvo-sorteado");
const nomeAlvoDestaque = document.getElementById("nome-alvo-destaque");

// Elementos — Zona Inferior (HUD & Mecânicas)
const boxLeitorRodada = document.getElementById("box-leitor-rodada");
const leitorTitulo = document.getElementById("leitor-titulo");
const leitorInstrucao = document.getElementById("leitor-instrucao");

const mecanicaAlvo = document.getElementById("mecanica-alvo");
const gradeVotoAlvo = document.getElementById("grade-voto-alvo");
const statusVotoAlvo = document.getElementById("status-voto-alvo");
const resultadoVotoAlvo = document.getElementById("resultado-voto-alvo");
const nomeVencedorAlvo = document.getElementById("nome-vencedor-alvo");
const listaContagemAlvo = document.getElementById("lista-contagem-alvo");

const mecanicaReacoes = document.getElementById("mecanica-reacoes");
const barraReacoes = document.getElementById("barra-reacoes");
const containerEmojisFlutuantes = document.getElementById("container-emojis-flutuantes");

const mecanicaEscolha = document.getElementById("mecanica-escolha");
const statusEscolha = document.getElementById("status-escolha");
const gradeEscolhaJogador = document.getElementById("grade-escolha-jogador");
const resultadoEscolhaBox = document.getElementById("resultado-escolha-box");
const textoEscolhaFeita = document.getElementById("texto-escolha-feita");

const mecanicaDilema = document.getElementById("mecanica-dilema");
const statusDilemaVotos = document.getElementById("status-dilema-votos");
const btnDilemaA = document.getElementById("btn-dilema-a");
const btnDilemaB = document.getElementById("btn-dilema-b");
const textoDilemaA = document.getElementById("texto-dilema-a");
const textoDilemaB = document.getElementById("texto-dilema-b");
const resultadoDilema = document.getElementById("resultado-dilema");
const barraDilemaA = document.getElementById("barra-dilema-a");
const barraDilemaB = document.getElementById("barra-dilema-b");
const percDilemaA = document.getElementById("perc-dilema-a");
const percDilemaB = document.getElementById("perc-dilema-b");
const detalhesVotosDilema = document.getElementById("detalhes-votos-dilema");

const avisoTempoEsgotado = document.getElementById("aviso-tempo-esgotado");
const controlesHostJogo = document.getElementById("controles-host-jogo");
const avisoJogadorJogo = document.getElementById("aviso-jogador-jogo");
const btnRevelarResultado = document.getElementById("btn-revelar-resultado");
const btnProximaCarta = document.getElementById("btn-proxima-carta");
const mensagemErroJogo = document.getElementById("mensagem-erro-jogo");

// Elementos — Fim de Partida
const textoResumoFim = document.getElementById("texto-resumo-fim");
const controlesHostFim = document.getElementById("controles-host-fim");
const avisoJogadorFim = document.getElementById("aviso-jogador-fim");
const btnJogarNovamente = document.getElementById("btn-jogar-novamente");
const btnSairPartidaFim = document.getElementById("btn-sair-partida-fim");

// Estado Local
textoCodigoSala.textContent = codigoSala;
const idJogadorAtual = obterIdJogador();
let souHost = false;
let idHostSala = null;
let ultimaCartaExibidaId = null;
let dadosJogadoresCache = {};
let cartaAtualCache = null;
let interacoesCache = {};
let timerInterval = null;
let reacoesAnimadasSet = new Set();

// Configuração padrão da partida
let configLocal = {
  baralhosAtivos: ["quebra_gelo", "confissoes_segredos"],
  totalCartas: 20
};

// Gerador de cor estável para avatar baseado no ID/Nome
function gerarCorAvatar(texto) {
  let hash = 0;
  for (let i = 0; i < texto.length; i++) {
    hash = texto.charCodeAt(i) + ((hash << 5) - hash);
  }
  const matiz = Math.abs(hash % 360);
  return `hsl(${matiz}, 75%, 45%)`;
}

// Alternância de Telas
function mostrarApenasPainel(painelAtivo) {
  [painelLobby, painelConfiguracao, painelMesaJogo, painelFimPartida].forEach((p) => {
    if (p) p.classList.add("bloco-oculto");
  });
  if (painelAtivo) {
    painelAtivo.classList.remove("bloco-oculto");
  }
}

// Botão de Áudio
if (btnAudio) {
  btnAudio.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") {
      audioApp.alternarMudo();
    }
  });
}

// Sair da Sala
async function executarSaidaSala() {
  if (confirm("Tem certeza que deseja sair desta mesa?")) {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    await sairDaSala(codigoSala);
    window.location.href = "index.html";
  }
}

btnSairSala.addEventListener("click", executarSaidaSala);
btnVoltarInicioSozinho.addEventListener("click", executarSaidaSala);
btnSairPartidaFim.addEventListener("click", executarSaidaSala);

// Escuta e verificação contínua do Host (com suporte a Host Migration)
escutarHostId(codigoSala, (hostId) => {
  idHostSala = hostId;
  souHost = hostId === idJogadorAtual;
  atualizarVisualHost();
  if (dadosJogadoresCache) {
    renderizarLobbyMesa(dadosJogadoresCache);
    renderizarZonaSuperiorAmigos(dadosJogadoresCache, cartaAtualCache);
  }
});

function atualizarVisualHost() {
  if (souHost) {
    controlesHostLobby.classList.remove("bloco-oculto");
    visaoJogadorEspera.classList.add("bloco-oculto");

    controlesHostJogo.classList.remove("bloco-oculto");
    avisoJogadorJogo.classList.add("bloco-oculto");

    controlesHostFim.classList.remove("bloco-oculto");
    avisoJogadorFim.classList.add("bloco-oculto");
  } else {
    controlesHostLobby.classList.add("bloco-oculto");
    visaoJogadorEspera.classList.remove("bloco-oculto");

    controlesHostJogo.classList.add("bloco-oculto");
    avisoJogadorJogo.classList.remove("bloco-oculto");

    controlesHostFim.classList.add("bloco-oculto");
    avisoJogadorFim.classList.remove("bloco-oculto");
  }
}

// ============================================================
// LOBBY DINÂMICO 2.5D (ASSENTOS DA MESA REDONDA)
// ============================================================
function renderizarLobbyMesa(jogadores) {
  if (!gradeAssentosMesa) return;
  gradeAssentosMesa.innerHTML = "";

  const ids = Object.keys(jogadores).sort((a, b) => {
    return (jogadores[a].entrouEm || 0) - (jogadores[b].entrouEm || 0);
  });

  ids.forEach((id) => {
    const j = jogadores[id];
    if (!j.nome) return;

    const isDesconectado = j.conectado === false;
    const isMe = id === idJogadorAtual;
    const isHost = id === idHostSala;

    const assento = document.createElement("div");
    assento.className = `assento-jogador-3d ${isDesconectado ? "assento-desconectado" : ""} ${isMe ? "assento-meu" : ""}`;

    const avatar = document.createElement("div");
    avatar.className = "assento-avatar-3d";
    avatar.style.backgroundColor = gerarCorAvatar(id + j.nome);
    avatar.textContent = j.nome.charAt(0).toUpperCase();

    const info = document.createElement("div");
    info.className = "assento-info-3d";

    const nome = document.createElement("span");
    nome.className = "assento-nome-3d";
    nome.textContent = j.nome;

    const tags = document.createElement("div");
    tags.className = "assento-tags-3d";

    if (isHost) {
      const tagH = document.createElement("span");
      tagH.className = "tag-3d tag-host-3d";
      tagH.textContent = "HOST";
      tags.appendChild(tagH);
    }
    if (isMe) {
      const tagV = document.createElement("span");
      tagV.className = "tag-3d tag-voce-3d";
      tagV.textContent = "VOCÊ";
      tags.appendChild(tagV);
    }
    if (isDesconectado) {
      const tagS = document.createElement("span");
      tagS.className = "tag-3d tag-saiu-3d";
      tagS.textContent = "SAIU";
      tags.appendChild(tagS);
    }

    info.appendChild(nome);
    info.appendChild(tags);

    assento.appendChild(avatar);
    assento.appendChild(info);

    gradeAssentosMesa.appendChild(assento);
  });

  // Mostra assentos vazios amigáveis se houver poucos jogadores
  const totalConectados = ids.filter((id) => jogadores[id].conectado !== false).length;
  if (totalConectados < 4) {
    const faltam = 4 - totalConectados;
    for (let i = 0; i < faltam; i++) {
      const vaga = document.createElement("div");
      vaga.className = "assento-vazio-3d";
      vaga.innerHTML = `
        <span class="vaga-icone">🪑</span>
        <span class="vaga-texto">Cadeira vaga...</span>
      `;
      gradeAssentosMesa.appendChild(vaga);
    }
  }
}

// ============================================================
// ZONA SUPERIOR: OS OUTROS (RODA DE AMIGOS COM GLOW 2.5D)
// ============================================================
function renderizarZonaSuperiorAmigos(jogadores, cartaAtual) {
  if (!rodaAmigosTopo) return;
  rodaAmigosTopo.innerHTML = "";

  const ids = Object.keys(jogadores).sort((a, b) => {
    return (jogadores[a].entrouEm || 0) - (jogadores[b].entrouEm || 0);
  });

  const leitorId = cartaAtual ? cartaAtual.leitorId : null;
  const alvoId = cartaAtual ? cartaAtual.alvoId : null;

  ids.forEach((id) => {
    const j = jogadores[id];
    if (!j.nome || j.conectado === false) return;

    const isLeitor = id === leitorId;
    const isAlvo = id === alvoId;
    const isMe = id === idJogadorAtual;

    const item = document.createElement("div");
    item.className = `amigo-topo-card ${isLeitor ? "amigo-leitor-ativo" : ""} ${isAlvo ? "amigo-alvo-ativo" : ""}`;

    const avatarWrap = document.createElement("div");
    avatarWrap.className = "amigo-avatar-wrap";

    const avatar = document.createElement("div");
    avatar.className = "amigo-avatar-3d";
    avatar.style.backgroundColor = gerarCorAvatar(id + j.nome);
    avatar.textContent = j.nome.charAt(0).toUpperCase();

    avatarWrap.appendChild(avatar);

    if (isLeitor) {
      const badgeLeitor = document.createElement("span");
      badgeLeitor.className = "badge-flutuante-amigo badge-leitor";
      badgeLeitor.textContent = "🎙️";
      avatarWrap.appendChild(badgeLeitor);
    } else if (isAlvo) {
      const badgeAlvo = document.createElement("span");
      badgeAlvo.className = "badge-flutuante-amigo badge-alvo";
      badgeAlvo.textContent = "🎯";
      avatarWrap.appendChild(badgeAlvo);
    }

    const nome = document.createElement("span");
    nome.className = "amigo-nome-topo";
    nome.textContent = isMe ? `${j.nome} (Você)` : j.nome;

    item.appendChild(avatarWrap);
    item.appendChild(nome);

    rodaAmigosTopo.appendChild(item);
  });
}

// ============================================================
// CONFIGURAÇÃO DE BARALHOS
// ============================================================
function renderizarListaBaralhosConfig() {
  if (!listaBaralhosConfig) return;
  listaBaralhosConfig.innerHTML = "";

  BARALHOS_DISPONIVEIS.forEach((baralho) => {
    const isAtivo = configLocal.baralhosAtivos.includes(baralho.id);

    const divOpcao = document.createElement("div");
    divOpcao.className = `baralho-opcao-3d ${isAtivo ? "selecionado" : ""}`;
    divOpcao.setAttribute("data-deck-id", baralho.id);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "baralho-checkbox-3d";
    checkbox.checked = isAtivo;

    const corpo = document.createElement("div");
    corpo.className = "baralho-corpo-3d";

    const topo = document.createElement("div");
    topo.className = "baralho-topo-3d";

    const nome = document.createElement("span");
    nome.className = "baralho-nome-3d";
    nome.innerHTML = `<span>${baralho.icone || "🃏"}</span> ${baralho.nome}`;

    const rating = document.createElement("span");
    rating.className = `baralho-rating-3d ${baralho.age_rating === "18+" ? "rating-18-3d" : "rating-geral-3d"}`;
    rating.textContent = baralho.age_rating;

    topo.appendChild(nome);
    topo.appendChild(rating);

    const desc = document.createElement("p");
    desc.className = "baralho-desc-3d";
    desc.textContent = baralho.descricao;

    corpo.appendChild(topo);
    corpo.appendChild(desc);

    divOpcao.appendChild(checkbox);
    divOpcao.appendChild(corpo);

    divOpcao.addEventListener("click", (e) => {
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
      }
      alternarSelecaoBaralho(baralho.id, checkbox.checked, divOpcao);
    });

    checkbox.addEventListener("change", () => {
      alternarSelecaoBaralho(baralho.id, checkbox.checked, divOpcao);
    });

    listaBaralhosConfig.appendChild(divOpcao);
  });

  atualizarResumosConfig();
}

function alternarSelecaoBaralho(deckId, ativo, elementoOpcao) {
  if (ativo) {
    if (!configLocal.baralhosAtivos.includes(deckId)) {
      configLocal.baralhosAtivos.push(deckId);
    }
    elementoOpcao.classList.add("selecionado");
  } else {
    if (configLocal.baralhosAtivos.length === 1 && configLocal.baralhosAtivos.includes(deckId)) {
      alert("A partida precisa de pelo menos 1 baralho ativo!");
      const cb = elementoOpcao.querySelector(".baralho-checkbox-3d");
      if (cb) cb.checked = true;
      return;
    }
    configLocal.baralhosAtivos = configLocal.baralhosAtivos.filter((id) => id !== deckId);
    elementoOpcao.classList.remove("selecionado");
  }
  if (typeof audioApp !== "undefined") audioApp.tocarClique();
  atualizarResumosConfig();
}

function atualizarResumosConfig() {
  const qtd = configLocal.baralhosAtivos.length;
  if (resumoBaralhos) resumoBaralhos.textContent = `${qtd} ativo${qtd > 1 ? "s" : ""}`;
  if (resumoTotalCartas) resumoTotalCartas.textContent = `${configLocal.totalCartas} cartas`;
}

// Botoes de quantidade de cartas (10, 20, 30, 40)
if (gradeQtdCartas) {
  gradeQtdCartas.querySelectorAll(".btn-qtd-3d").forEach((btn) => {
    btn.addEventListener("click", () => {
      gradeQtdCartas.querySelectorAll(".btn-qtd-3d").forEach((b) => b.classList.remove("selecionado"));
      btn.classList.add("selecionado");
      configLocal.totalCartas = parseInt(btn.getAttribute("data-qtd"), 10) || 20;
      if (typeof audioApp !== "undefined") audioApp.tocarClique();
      atualizarResumosConfig();
    });
  });
}

renderizarListaBaralhosConfig();

if (btnAbrirConfig) {
  btnAbrirConfig.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    mostrarApenasPainel(painelConfiguracao);
  });
}

if (btnVoltarConfig) {
  btnVoltarConfig.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    mostrarApenasPainel(painelLobby);
  });
}

if (btnSalvarIniciarConfig) {
  btnSalvarIniciarConfig.addEventListener("click", async () => {
    if (!souHost) return;
    btnSalvarIniciarConfig.disabled = true;
    btnSalvarIniciarConfig.textContent = "Iniciando...";
    if (typeof audioApp !== "undefined") audioApp.tocarClique();

    try {
      await salvarConfigLobby(codigoSala, configLocal);
      await iniciarPartida(codigoSala, configLocal);
    } catch (erro) {
      console.error(erro);
      mensagemErroLobby.textContent = "Não foi possível iniciar a partida.";
      btnSalvarIniciarConfig.disabled = false;
      btnSalvarIniciarConfig.textContent = "Iniciar com essa Seleção 🔥";
    }
  });
}

// ============================================================
// TIMER CENTRALIZADO SINCRONIZADO
// ============================================================
function iniciarTimerCentral(iniciadaEm, duracaoTotal) {
  if (timerInterval) clearInterval(timerInterval);

  function atualizarTimer() {
    if (!iniciadaEm) return;

    const agora = obterTimestampServidor();
    const decorridoMs = Math.max(0, agora - iniciadaEm);
    const decorridoSeg = Math.floor(decorridoMs / 1000);
    const restante = Math.max(0, duracaoTotal - decorridoSeg);

    const perc = Math.max(0, Math.min(100, (restante / duracaoTotal) * 100));

    if (badgeTimerJogo) badgeTimerJogo.textContent = `⏱️ ${restante}s`;
    if (barraTimerPreenchimento) barraTimerPreenchimento.style.width = `${perc}%`;

    if (restante <= 5 && restante > 0) {
      if (badgeTimerJogo) badgeTimerJogo.classList.add("timer-urgente");
      if (barraTimerPreenchimento) barraTimerPreenchimento.style.backgroundColor = "var(--primary)";
    } else {
      if (badgeTimerJogo) badgeTimerJogo.classList.remove("timer-urgente");
      if (barraTimerPreenchimento) barraTimerPreenchimento.style.backgroundColor = "var(--accent-gold)";
    }

    if (restante === 0) {
      if (avisoTempoEsgotado) avisoTempoEsgotado.classList.remove("bloco-oculto");
      if (badgeTimerJogo) badgeTimerJogo.textContent = "⌛ FIM";
      
      // Revela resultados automaticamente na interface ao esgotar o tempo
      if (cartaAtualCache && !cartaAtualCache.revelada && souHost) {
        revelarResultadoCarta(codigoSala);
      }
    } else {
      if (avisoTempoEsgotado) avisoTempoEsgotado.classList.add("bloco-oculto");
    }
  }

  atualizarTimer();
  timerInterval = setInterval(atualizarTimer, 300);
}

// ============================================================
// GERENCIADOR DE EMOJIS FLUTUANTES (Reações)
// ============================================================
function criarEmojiFlutuante(emoji, autorNome) {
  const container = document.getElementById("container-emojis-flutuantes");
  if (!container) return;

  const item = document.createElement("div");
  item.className = "emoji-flutuante";
  
  const randomX = Math.floor(Math.random() * 60) + 20;
  item.style.left = `${randomX}%`;
  
  item.innerHTML = `<span class="emoji-simbolo">${emoji}</span><small class="emoji-autor">${autorNome || ""}</small>`;

  container.appendChild(item);

  setTimeout(() => {
    if (item.parentNode) {
      item.parentNode.removeChild(item);
    }
  }, 2200);
}

// Botões de Reação Rápida (Confissão / Prova)
if (barraReacoes) {
  barraReacoes.querySelectorAll(".btn-reacao-hud").forEach((btn) => {
    btn.addEventListener("click", () => {
      const emoji = btn.getAttribute("data-emoji");
      const meuNome = (dadosJogadoresCache[idJogadorAtual] && dadosJogadoresCache[idJogadorAtual].nome) || "Jogador";
      
      if (typeof audioApp !== "undefined") audioApp.tocarClique();
      enviarReacao(codigoSala, emoji, meuNome);

      btn.classList.add("reacao-ativa");
      setTimeout(() => btn.classList.remove("reacao-ativa"), 300);
    });
  });
}

// ============================================================
// GERENCIADOR DAS MECÂNICAS DE JOGO NO HUD
// ============================================================
function renderizarMecanicas(carta, interacoes, jogadores) {
  const mechanic = carta.mechanic || "CONFISSAO";
  const target = carta.target || "SELF";
  const isRevelada = carta.revelada === true;

  [mecanicaAlvo, mecanicaReacoes, mecanicaEscolha, mecanicaDilema].forEach((m) => {
    if (m) m.classList.add("bloco-oculto");
  });

  const idsJogadores = Object.keys(jogadores).filter((id) => jogadores[id] && jogadores[id].conectado !== false);
  const totalJogadores = idsJogadores.length;

  if (souHost && (mechanic === "ALVO" || mechanic === "DILEMA")) {
    btnRevelarResultado.classList.remove("bloco-oculto");
    btnRevelarResultado.textContent = isRevelada ? "✅ Resultados Revelados" : "🎯 Revelar Resultados da Roda";
    btnRevelarResultado.disabled = isRevelada;
  } else {
    btnRevelarResultado.classList.add("bloco-oculto");
  }

  // 1. MECÂNICA: ALVO (target: VOTE)
  if (mechanic === "ALVO" || target === "VOTE") {
    mecanicaAlvo.classList.remove("bloco-oculto");
    gradeVotoAlvo.innerHTML = "";

    const votos = interacoes.votos || {};
    const meuVoto = votos[idJogadorAtual];
    const totalVotos = Object.keys(votos).length;

    statusVotoAlvo.textContent = meuVoto
      ? `Você votou em ${(jogadores[meuVoto] && jogadores[meuVoto].nome) || "alguém"} • (${totalVotos}/${totalJogadores} votaram)`
      : `Clique no jogador que você escolhe • (${totalVotos}/${totalJogadores} já votaram)`;

    idsJogadores.forEach((id) => {
      const j = jogadores[id];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `btn-jogador-voto-hud ${meuVoto === id ? "votado-por-mim" : ""}`;
      btn.disabled = isRevelada;

      const avatar = document.createElement("span");
      avatar.className = "jogador-voto-avatar-hud";
      avatar.style.backgroundColor = gerarCorAvatar(id + j.nome);
      avatar.textContent = j.nome.charAt(0).toUpperCase();

      const nomeSpan = document.createElement("span");
      nomeSpan.className = "jogador-voto-nome-hud";
      nomeSpan.textContent = j.nome + (id === idJogadorAtual ? " (Você)" : "");

      btn.appendChild(avatar);
      btn.appendChild(nomeSpan);

      btn.addEventListener("click", () => {
        if (isRevelada) return;
        if (typeof audioApp !== "undefined") audioApp.tocarClique();
        votarEmAlvo(codigoSala, id);
      });

      gradeVotoAlvo.appendChild(btn);
    });

    if (isRevelada || totalVotos >= totalJogadores) {
      resultadoVotoAlvo.classList.remove("bloco-oculto");

      const contagem = {};
      Object.values(votos).forEach((alvoId) => {
        contagem[alvoId] = (contagem[alvoId] || 0) + 1;
      });

      let maisVotadoId = null;
      let maxVotos = -1;
      Object.keys(contagem).forEach((id) => {
        if (contagem[id] > maxVotos) {
          maxVotos = contagem[id];
          maisVotadoId = id;
        }
      });

      if (maisVotadoId && jogadores[maisVotadoId]) {
        nomeVencedorAlvo.textContent = `${jogadores[maisVotadoId].nome} (${maxVotos} voto${maxVotos > 1 ? "s" : ""})`;
      } else {
        nomeVencedorAlvo.textContent = "Nenhum voto registrado";
      }

      listaContagemAlvo.innerHTML = "";
      Object.keys(contagem)
        .sort((a, b) => contagem[b] - contagem[a])
        .forEach((id) => {
          const jNome = (jogadores[id] && jogadores[id].nome) || "Jogador";
          const qtd = contagem[id];
          const perc = Math.round((qtd / Math.max(1, totalVotos)) * 100);

          const item = document.createElement("div");
          item.className = "item-resultado-voto";
          item.innerHTML = `
            <div class="info-resultado-voto">
              <span>${jNome}</span>
              <strong>${qtd} voto${qtd > 1 ? "s" : ""} (${perc}%)</strong>
            </div>
            <div class="barra-resultado-voto">
              <div class="barra-resultado-preenchimento" style="width: ${perc}%;"></div>
            </div>
          `;
          listaContagemAlvo.appendChild(item);
        });
    } else {
      resultadoVotoAlvo.classList.add("bloco-oculto");
    }
  }

  // 2 & 3. MECÂNICA: CONFISSÃO & PROVA (Reações em Tempo Real)
  else if (mechanic === "CONFISSAO" || mechanic === "PROVA") {
    mecanicaReacoes.classList.remove("bloco-oculto");

    const reacoes = interacoes.reacoes || {};
    const contadores = { "👏": 0, "🔥": 0, "😳": 0, "😂": 0 };

    Object.keys(reacoes).forEach((rId) => {
      const r = reacoes[rId];
      if (r && contadores[r.emoji] !== undefined) {
        contadores[r.emoji]++;
      }

      if (!reacoesAnimadasSet.has(rId)) {
        reacoesAnimadasSet.add(rId);
        criarEmojiFlutuante(r.emoji, r.autorNome);
      }
    });

    Object.keys(contadores).forEach((emoji) => {
      const countEl = document.getElementById(`count-reacao-${emoji}`);
      if (countEl) countEl.textContent = contadores[emoji];
    });
  }

  // 4. MECÂNICA: ESCOLHA (target: CHOOSE)
  else if (mechanic === "ESCOLHA" || target === "CHOOSE") {
    mecanicaEscolha.classList.remove("bloco-oculto");
    gradeEscolhaJogador.innerHTML = "";

    const escolhedorId = carta.alvoId || carta.leitorId || idHostSala;
    const escolhedorNome = (jogadores[escolhedorId] && jogadores[escolhedorId].nome) || "Jogador";
    const souOEscolhedor = escolhedorId === idJogadorAtual;

    const escolhaFeita = interacoes.escolha;

    if (escolhaFeita) {
      resultadoEscolhaBox.classList.remove("bloco-oculto");
      textoEscolhaFeita.textContent = `${escolhedorNome} escolheu ${escolhaFeita.alvoNome || "alguém"}!`;
      statusEscolha.textContent = "Escolha concluída!";
    } else {
      resultadoEscolhaBox.classList.add("bloco-oculto");
      statusEscolha.textContent = souOEscolhedor
        ? "Você deve escolher alguém da mesa:"
        : `Aguardando ${escolhedorNome} escolher alguém da roda...`;
    }

    idsJogadores.forEach((id) => {
      const j = jogadores[id];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `btn-jogador-voto-hud ${escolhaFeita && escolhaFeita.alvoId === id ? "votado-por-mim" : ""}`;
      btn.disabled = !souOEscolhedor || !!escolhaFeita;

      const avatar = document.createElement("span");
      avatar.className = "jogador-voto-avatar-hud";
      avatar.style.backgroundColor = gerarCorAvatar(id + j.nome);
      avatar.textContent = j.nome.charAt(0).toUpperCase();

      const nomeSpan = document.createElement("span");
      nomeSpan.className = "jogador-voto-nome-hud";
      nomeSpan.textContent = j.nome + (id === idJogadorAtual ? " (Você)" : "");

      btn.appendChild(avatar);
      btn.appendChild(nomeSpan);

      btn.addEventListener("click", () => {
        if (!souOEscolhedor || escolhaFeita) return;
        if (typeof audioApp !== "undefined") audioApp.tocarClique();
        escolherJogador(codigoSala, id, j.nome);
      });

      gradeEscolhaJogador.appendChild(btn);
    });
  }

  // 5. MECÂNICA: DILEMA (target: ALL)
  else if (mechanic === "DILEMA") {
    mecanicaDilema.classList.remove("bloco-oculto");

    const opcoes = carta.opcoes && carta.opcoes.length >= 2
      ? carta.opcoes
      : ["Primeira Opção", "Segunda Opção"];

    textoDilemaA.textContent = opcoes[0];
    textoDilemaB.textContent = opcoes[1];

    const dilemas = interacoes.dilema || {};
    const meuVoto = dilemas[idJogadorAtual];
    const totalVotosDilema = Object.keys(dilemas).length;

    statusDilemaVotos.textContent = meuVoto
      ? `Você votou na Opção ${meuVoto} • (${totalVotosDilema}/${totalJogadores} votaram)`
      : `Escolha sua opção em segredo • (${totalVotosDilema}/${totalJogadores} já responderam)`;

    btnDilemaA.className = `btn-dilema-hud ${meuVoto === "A" ? "selecionado-dilema" : ""}`;
    btnDilemaB.className = `btn-dilema-hud ${meuVoto === "B" ? "selecionado-dilema" : ""}`;
    btnDilemaA.disabled = isRevelada;
    btnDilemaB.disabled = isRevelada;

    if (isRevelada || totalVotosDilema >= totalJogadores) {
      resultadoDilema.classList.remove("bloco-oculto");

      let countA = 0;
      let countB = 0;
      const votantesA = [];
      const votantesB = [];

      Object.keys(dilemas).forEach((id) => {
        const jNome = (jogadores[id] && jogadores[id].nome) || "Jogador";
        if (dilemas[id] === "A") {
          countA++;
          votantesA.push(jNome);
        } else if (dilemas[id] === "B") {
          countB++;
          votantesB.push(jNome);
        }
      });

      const total = Math.max(1, countA + countB);
      const percA = Math.round((countA / total) * 100);
      const percB = Math.round((countB / total) * 100);

      barraDilemaA.style.width = `${percA}%`;
      barraDilemaB.style.width = `${percB}%`;
      percDilemaA.textContent = `${percA}% (${countA})`;
      percDilemaB.textContent = `${percB}% (${countB})`;

      detalhesVotosDilema.innerHTML = `
        <div class="grupo-votantes-dilema">
          <span class="titulo-lado-dilema">Lado A (${countA}):</span>
          <p class="nomes-lado-dilema">${votantesA.join(", ") || "Ninguém"}</p>
        </div>
        <div class="grupo-votantes-dilema" style="margin-top: 8px;">
          <span class="titulo-lado-dilema">Lado B (${countB}):</span>
          <p class="nomes-lado-dilema">${votantesB.join(", ") || "Ninguém"}</p>
        </div>
      `;
    } else {
      resultadoDilema.classList.add("bloco-oculto");
    }
  }
}

// Botões de Voto do Dilema
btnDilemaA.addEventListener("click", () => {
  if (cartaAtualCache && cartaAtualCache.revelada) return;
  if (typeof audioApp !== "undefined") audioApp.tocarClique();
  votarDilema(codigoSala, "A");
});

btnDilemaB.addEventListener("click", () => {
  if (cartaAtualCache && cartaAtualCache.revelada) return;
  if (typeof audioApp !== "undefined") audioApp.tocarClique();
  votarDilema(codigoSala, "B");
});

// Botão do Host para Revelar Resultado
btnRevelarResultado.addEventListener("click", async () => {
  if (!souHost) return;
  if (typeof audioApp !== "undefined") audioApp.tocarClique();
  await revelarResultadoCarta(codigoSala);
});

// ============================================================
// ESCUTAS EM TEMPO REAL (FIREBASE)
// ============================================================

// 1. Jogadores Conectados & Host Migration
escutarJogadores(codigoSala, (jogadores) => {
  dadosJogadoresCache = jogadores || {};
  
  // Executa migração de host automática caso o host tenha saído
  migrarHostSeNecessario(codigoSala, jogadores, idHostSala);

  // Renderiza a mesa do lobby com assentos 2.5D
  renderizarLobbyMesa(dadosJogadoresCache);

  // Renderiza a zona superior dos amigos com glow
  renderizarZonaSuperiorAmigos(dadosJogadoresCache, cartaAtualCache);

  const ids = Object.keys(dadosJogadoresCache);
  const totalConectados = ids.filter((id) => dadosJogadoresCache[id].conectado !== false).length;

  contadorJogadores.textContent = `${totalConectados} na mesa`;

  // Alerta de jogador sozinho no lobby
  if (totalConectados <= 1 && ids.length > 1) {
    avisoSozinhoSala.classList.remove("bloco-oculto");
  } else {
    avisoSozinhoSala.classList.add("bloco-oculto");
  }

  // Re-renderiza mecânicas se a partida estiver ativa
  if (cartaAtualCache) {
    renderizarMecanicas(cartaAtualCache, interacoesCache, dadosJogadoresCache);
  }
});

// 2. Status Geral da Sala
escutarStatusSala(codigoSala, (status) => {
  if (status === "lobby") {
    mostrarApenasPainel(painelLobby);
    btnIniciarPartida.disabled = false;
    btnIniciarPartida.textContent = "🔥 Iniciar Partida na Mesa";
    if (btnSalvarIniciarConfig) {
      btnSalvarIniciarConfig.disabled = false;
      btnSalvarIniciarConfig.textContent = "🔥 Iniciar com essa Seleção";
    }
  }
});

// 3. Sincronização da Partida, Timer e Cartas
escutarPartida(codigoSala, (partida) => {
  if (!partida || partida.status === "aguardando") return;

  interacoesCache = partida.interacoes || {};

  if (partida.status === "finalizada") {
    if (timerInterval) clearInterval(timerInterval);
    mostrarApenasPainel(painelFimPartida);
    textoResumoFim.textContent = `A mesa completou com sucesso as ${partida.totalRodadas || 20} cartas sorteadas!`;
    return;
  }

  if (partida.status === "jogando" && partida.cartaAtual) {
    mostrarApenasPainel(painelMesaJogo);
    const carta = partida.cartaAtual;
    cartaAtualCache = carta;

    // Atualiza cabeçalho e contagem
    tagDeckNome.textContent = `🔥 ${carta.deck_nome ? carta.deck_nome.toUpperCase() : "MESA QUENTE"}`;
    contadorCartasRodada.textContent = `${partida.rodadaAtual || 1} / ${partida.totalRodadas || 20}`;

    // Atualiza informações da carta física
    cartaDeckIcone.textContent = carta.deck_icone || "🃏";
    cartaDeckNome.textContent = carta.deck_nome || "Baralho";
    cartaMechanicTag.textContent = carta.mechanic || "DESAFIO";
    cartaMechanicTag.className = `badge-mecanica-carta tag-mechanic-${carta.mechanic || "CONFISSAO"}`;
    cartaTexto.textContent = carta.text || "";

    // Leitor da Rodada (Mestre de Cerimônias)
    const souOLeitor = carta.leitorId === idJogadorAtual;
    if (souOLeitor) {
      boxLeitorRodada.className = "box-leitor-hud box-leitor-voce";
      leitorTitulo.innerHTML = "🎙️ VOCÊ É O LEITOR DA RODADA!";
      leitorInstrucao.textContent = "Leia a carta abaixo em voz alta para todos os jogadores.";
    } else {
      boxLeitorRodada.className = "box-leitor-hud box-leitor-outro";
      leitorTitulo.innerHTML = `🎙️ Leitor: ${carta.leitorNome || "Jogador"}`;
      leitorInstrucao.textContent = `Aguarde ${carta.leitorNome || "o jogador"} ler a carta em voz alta.`;
    }

    // Alvo da Rodada (se target === RANDOM)
    if (carta.target === "RANDOM" && carta.alvoNome) {
      blocoAlvoSorteado.classList.remove("bloco-oculto");
      nomeAlvoDestaque.textContent = carta.alvoNome;
    } else {
      blocoAlvoSorteado.classList.add("bloco-oculto");
    }

    // Atualiza zona superior dos amigos com o leitor/alvo destacados
    renderizarZonaSuperiorAmigos(dadosJogadoresCache, carta);

    // Animação 3D Flip ao puxar nova carta da mesa
    if (ultimaCartaExibidaId !== carta.id) {
      reacoesAnimadasSet.clear();
      if (typeof audioApp !== "undefined") audioApp.tocarViradaCarta();

      cartaJogoElemento.classList.remove("anim-puxar-flip");
      void cartaJogoElemento.offsetWidth; // Trigger reflow
      cartaJogoElemento.classList.add("anim-puxar-flip");

      ultimaCartaExibidaId = carta.id;
    }

    // Inicia/Sincroniza o Timer Central
    iniciarTimerCentral(carta.iniciadaEm, carta.duracao || 30);

    // Renderiza a Mecânica Interativa Específica
    renderizarMecanicas(carta, interacoesCache, dadosJogadoresCache);

    // Libera botão de próxima carta se for Host
    btnProximaCarta.disabled = false;
    btnProximaCarta.textContent = "🃏 Puxar Próxima Carta 🔥";
  }
});

// 4. Escuta Específica de Interações (para reatividade instantânea)
escutarInteracoes(codigoSala, (interacoes) => {
  interacoesCache = interacoes || {};
  if (cartaAtualCache) {
    renderizarMecanicas(cartaAtualCache, interacoesCache, dadosJogadoresCache);
  }
});

// ============================================================
// AÇÕES DO JOGADOR E DO HOST
// ============================================================

// Copiar código da sala
btnCopiarCodigo.addEventListener("click", () => {
  navigator.clipboard.writeText(codigoSala).then(() => {
    btnCopiarCodigo.innerHTML = "<span>✅</span> Copiado!";
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    setTimeout(() => {
      btnCopiarCodigo.innerHTML = "<span>📋</span> Copiar";
    }, 1800);
  });
});

// Iniciar Partida (do Lobby)
btnIniciarPartida.addEventListener("click", async () => {
  if (!souHost) return;
  btnIniciarPartida.disabled = true;
  btnIniciarPartida.textContent = "Iniciando partida...";
  if (typeof audioApp !== "undefined") audioApp.tocarClique();

  try {
    await iniciarPartida(codigoSala, configLocal);
  } catch (erro) {
    console.error(erro);
    mensagemErroLobby.textContent = "Não foi possível iniciar a partida.";
    btnIniciarPartida.disabled = false;
    btnIniciarPartida.textContent = "🔥 Iniciar Partida na Mesa";
  }
});

// Puxar carta clicando no Maço 3D
if (deckPilhaJogo) {
  deckPilhaJogo.addEventListener("click", () => {
    if (souHost && !btnProximaCarta.disabled) {
      btnProximaCarta.click();
    }
  });
}

// Avançar para Próxima Carta (Host)
btnProximaCarta.addEventListener("click", async () => {
  if (!souHost) return;
  btnProximaCarta.disabled = true;
  btnProximaCarta.textContent = "Puxando carta...";
  if (typeof audioApp !== "undefined") audioApp.tocarClique();

  // Animação de descarte deslizando para a esquerda
  cartaJogoElemento.classList.add("anim-descarte-esquerda");

  try {
    await avancarProximaCarta(codigoSala);
  } catch (erro) {
    console.error(erro);
    mensagemErroJogo.textContent = "Erro ao avançar carta. Tente novamente.";
    btnProximaCarta.disabled = false;
    btnProximaCarta.textContent = "🃏 Puxar Próxima Carta 🔥";
    cartaJogoElemento.classList.remove("anim-descarte-esquerda");
  }
});

// Jogar Novamente / Voltar ao Lobby (Host)
btnJogarNovamente.addEventListener("click", async () => {
  if (!souHost) return;
  btnJogarNovamente.disabled = true;
  btnJogarNovamente.textContent = "Reiniciando mesa...";
  if (typeof audioApp !== "undefined") audioApp.tocarClique();

  try {
    await reiniciarPartida(codigoSala);
  } catch (erro) {
    console.error(erro);
    btnJogarNovamente.disabled = false;
    btnJogarNovamente.textContent = "🔥 Jogar Novamente (Voltar à Mesa)";
  }
});
