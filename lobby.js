// ============================================================
// LOBBY.JS — Mesa Quente (Minigames, Tutorial de Regras & Gameplay)
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
const btnFullscreen = document.getElementById("btn-fullscreen");
const iconeFullscreen = document.getElementById("icone-fullscreen");
const textoFullscreen = document.getElementById("texto-fullscreen");
const hudCodigoSalaTopo = document.getElementById("hud-codigo-sala-topo");
const btnAbrirConfigHud = document.getElementById("btn-abrir-config-hud");

// Controle de Tela Cheia Opcional
function alternarTelaCheia() {
  if (typeof audioApp !== "undefined") audioApp.tocarClique();
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

function atualizarIconeFullscreen() {
  const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement);
  if (iconeFullscreen) iconeFullscreen.textContent = isFull ? "🗗" : "⛶";
  if (textoFullscreen) textoFullscreen.textContent = isFull ? "Sair" : "Tela Cheia";
}

if (btnFullscreen) {
  btnFullscreen.addEventListener("click", alternarTelaCheia);
}

document.addEventListener("fullscreenchange", atualizarIconeFullscreen);
document.addEventListener("webkitfullscreenchange", atualizarIconeFullscreen);

// Elementos — Lobby 2.5D
const textoCodigoSala = document.getElementById("texto-codigo-sala");
const btnCopiarCodigo = document.getElementById("btn-copiar-codigo");
const bannerModoJogo = document.getElementById("banner-modo-jogo");
const modoJogoIcone = document.getElementById("modo-jogo-icone");
const modoJogoNome = document.getElementById("modo-jogo-nome");
const modoJogoDesc = document.getElementById("modo-jogo-desc");
const deckCentroLobby = document.getElementById("deck-centro-lobby");
const deckCentroIcone = document.getElementById("deck-centro-icone");
const deckCentroTag = document.getElementById("deck-centro-tag");
const gradeAssentosMesa = document.getElementById("grade-assentos-mesa");
const contadorJogadores = document.getElementById("contador-jogadores");
const avisoSozinhoSala = document.getElementById("aviso-sozinho-sala");
const btnVoltarInicioSozinho = document.getElementById("btn-voltar-inicio-sozinho");
const controlesHostLobby = document.getElementById("controles-host-lobby");
const visaoJogadorEspera = document.getElementById("visao-jogador-espera");
const btnAbrirConfig = document.getElementById("btn-abrir-config");
const btnIniciarPartida = document.getElementById("btn-iniciar-partida");
const mensagemErroLobby = document.getElementById("mensagem-erro-lobby");

// Elementos — Configuração de Baralhos e Modos no Lobby
const seletorModosConfig = document.getElementById("seletor-modos-config");
const secaoBaralhosConfig = document.getElementById("secao-baralhos-config");
const listaBaralhosConfig = document.getElementById("lista-baralhos-config");
const gradeQtdCartas = document.getElementById("grade-qtd-cartas");
const campoRodadasCustomLobby = document.getElementById("campo-rodadas-custom-lobby");
const inputRodadasCustomLobby = document.getElementById("input-rodadas-custom-lobby");
const resumoBaralhos = document.getElementById("resumo-baralhos-selecionados");
const resumoTotalCartas = document.getElementById("resumo-total-cartas");
const btnSalvarIniciarConfig = document.getElementById("btn-salvar-iniciar-config");
const btnVoltarConfig = document.getElementById("btn-voltar-config");

// Elementos — OVERLAY 0: Tutorial de Regras & Introdução
const overlayTutorialRegras = document.getElementById("overlay-tutorial-regras");
const tutorialBadgeCategoria = document.getElementById("tutorial-badge-categoria");
const tutorialIconeCirculo = document.getElementById("tutorial-icone-circulo");
const tutorialTituloJogo = document.getElementById("tutorial-titulo-jogo");
const tutorialDescricaoJogo = document.getElementById("tutorial-descricao-jogo");
const tutorialPassosLista = document.getElementById("tutorial-passos-lista");
const tutorialProntosContador = document.getElementById("tutorial-prontos-contador");
const tutorialJogadoresChips = document.getElementById("tutorial-jogadores-chips");
const tutorialTimerBarra = document.getElementById("tutorial-timer-barra");
const tutorialTimerTexto = document.getElementById("tutorial-timer-texto");
const btnEntendiTutorial = document.getElementById("btn-entendi-tutorial");

// Elementos — Overlays de Transição (Contagem e Sorteio do Dado)
const overlayContagemRegressiva = document.getElementById("overlay-contagem-regressiva");
const contagemNumeroDisplay = document.getElementById("contagem-numero-display");
const contagemSubtexto = document.getElementById("contagem-subtexto");

const overlaySorteioDado = document.getElementById("overlay-sorteio-dado");
const rodaSorteioJogadores = document.getElementById("roda-sorteio-jogadores");
const dadoCuboAnimado = document.getElementById("dado-cubo-animado");
const dadoFaceDisplay = document.getElementById("dado-face-display");
const bannerVencedorDado = document.getElementById("banner-vencedor-dado");
const vencedorDadoAvatar = document.getElementById("vencedor-dado-avatar");
const vencedorDadoNome = document.getElementById("vencedor-dado-nome");
const vencedorDadoMensagem = document.getElementById("vencedor-dado-mensagem");

// Elementos — Zona Central (A Mesa e o Baralho 2.5D)
const camadaJogadoresRadial = document.getElementById("camada-jogadores-radial");
const tagDeckNome = document.getElementById("tag-deck-nome");
const contadorCartasRodada = document.getElementById("contador-cartas-rodada");
const deckCentralArea = document.getElementById("deck-central-area");
const deckPilhaJogo = document.getElementById("deck-pilha-jogo");
const baralhoAssetWrapper = document.getElementById("baralho-asset-wrapper");
const imgBaralhoMesa = document.getElementById("img-baralho-mesa");
const badgeSuaVez = document.getElementById("badge-sua-vez");
const btnPuxarCartaMesa = document.getElementById("btn-puxar-carta-mesa");
const boxEsperaPuxar = document.getElementById("box-espera-puxar");
const textoEsperaPuxar = document.getElementById("texto-espera-puxar");
const focoCartaBackdrop = document.getElementById("foco-carta-backdrop");
const cartaFlipWrapper = document.getElementById("carta-flip-wrapper");
const cartaJogoElemento = document.getElementById("carta-jogo-elemento");
const cartaFaceFrente = document.getElementById("carta-face-frente");
const cartaFaceVerso = document.getElementById("carta-face-verso");
const avisoSecretoMesa = document.getElementById("aviso-secreto-mesa");
const textoOucaLeitor = document.getElementById("texto-ouca-leitor");
const cartaDeckIcone = document.getElementById("carta-deck-icone");
const cartaDeckNome = document.getElementById("carta-deck-nome");
const cartaMechanicTag = document.getElementById("carta-mechanic-tag");
const cartaTexto = document.getElementById("carta-texto");
const blocoAlvoSorteado = document.getElementById("bloco-alvo-sorteado");
const nomeAlvoDestaque = document.getElementById("nome-alvo-destaque");

// Elementos — Zona Inferior (HUD & Mecânicas)
const boxLeitorRodada = document.getElementById("box-leitor-rodada");
const leitorHudIcone = document.getElementById("leitor-hud-icone");
const leitorTitulo = document.getElementById("leitor-titulo");
const leitorInstrucao = document.getElementById("leitor-instrucao");

// Mecânica 1: Alvo (target: VOTE / QUEM É MAIS PROVÁVEL)
const mecanicaAlvo = document.getElementById("mecanica-alvo");
const gradeVotoAlvo = document.getElementById("grade-voto-alvo");
const statusVotoAlvo = document.getElementById("status-voto-alvo");
const resultadoVotoAlvo = document.getElementById("resultado-voto-alvo");
const nomeVencedorAlvo = document.getElementById("nome-vencedor-alvo");
const listaContagemAlvo = document.getElementById("lista-contagem-alvo");

// Mecânica 2: Verdade ou Desafio (Roleta de Consequências)
const mecanicaVerdadeDesafio = document.getElementById("mecanica-verdade-desafio");
const statusVerdadeDesafio = document.getElementById("status-verdade-desafio");
const btnEscolhaVerdade = document.getElementById("btn-escolha-verdade");
const btnEscolhaDesafio = document.getElementById("btn-escolha-desafio");
const revelacaoVdBox = document.getElementById("revelacao-vd-box");
const vdTipoTag = document.getElementById("vd-tipo-tag");
const vdTextoDesafio = document.getElementById("vd-texto-desafio");

// Mecânica 3: Eu Nunca
const mecanicaEuNunca = document.getElementById("mecanica-eu-nunca");
const statusEuNunca = document.getElementById("status-eu-nunca");
const btnEuNuncaFiz = document.getElementById("btn-eu-nunca-fiz");
const btnEuNuncaInocente = document.getElementById("btn-eu-nunca-inocente");
const resultadoEuNunca = document.getElementById("resultado-eu-nunca");
const barraEnFiz = document.getElementById("barra-en-fiz");
const barraEnInocente = document.getElementById("barra-en-inocente");
const percEnFiz = document.getElementById("perc-en-fiz");
const percEnInocente = document.getElementById("perc-en-inocente");
const detalhesVotosEuNunca = document.getElementById("detalhes-votos-eu-nunca");

// Mecânica 4: Preencha a Lacuna
const mecanicaLacuna = document.getElementById("mecanica-lacuna");
const statusLacuna = document.getElementById("status-lacuna");
const gradeCartasBrancas = document.getElementById("grade-cartas-brancas");
const resultadoLacunaBox = document.getElementById("resultado-lacuna-box");
const textoVencedoraLacuna = document.getElementById("texto-vencedora-lacuna");

// Mecânica 5: Escolha (target: CHOOSE)
const mecanicaEscolha = document.getElementById("mecanica-escolha");
const statusEscolha = document.getElementById("status-escolha");
const gradeEscolhaJogador = document.getElementById("grade-escolha-jogador");
const resultadoEscolhaBox = document.getElementById("resultado-escolha-box");
const textoEscolhaFeita = document.getElementById("texto-escolha-feita");

// Mecânica 6: Dilema (target: ALL)
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

// Reações
const mecanicaReacoes = document.getElementById("mecanica-reacoes");
const btnTriggerReacoes = document.getElementById("btn-trigger-reacoes");
const barraReacoes = document.getElementById("barra-reacoes");
const containerEmojisFlutuantes = document.getElementById("container-emojis-flutuantes");

// Controles de Avanço
const controlesAvancoJogo = document.getElementById("controles-avanco-jogo");
const controlesHostJogo = document.getElementById("controles-host-jogo") || controlesAvancoJogo;
const avisoJogadorJogo = document.getElementById("aviso-jogador-jogo");
const textoAvisoRodaEspera = document.getElementById("texto-aviso-roda-espera");
const btnRevelarResultado = document.getElementById("btn-revelar-resultado");
const btnProximaCarta = document.getElementById("btn-proxima-carta");
const mensagemErroJogo = document.getElementById("mensagem-erro-jogo");

// Elementos — Fim de Partida
const textoResumoFim = document.getElementById("texto-resumo-fim");
const gradeAvataresFim = document.getElementById("grade-avatares-fim");
const controlesHostFim = document.getElementById("controles-host-fim");
const avisoJogadorFim = document.getElementById("aviso-jogador-fim");
const btnJogarNovamente = document.getElementById("btn-jogar-novamente");
const btnSairPartidaFim = document.getElementById("btn-sair-partida-fim");

// Estado Local
if (textoCodigoSala) textoCodigoSala.textContent = codigoSala;
if (hudCodigoSalaTopo) hudCodigoSalaTopo.textContent = codigoSala;
const idJogadorAtual = obterIdJogador();
let souHost = false;
let idHostSala = null;
let ultimaCartaExibidaId = null;
let dadosJogadoresCache = {};
let cartaAtualCache = null;
let interacoesCache = {};
let reacoesAnimadasSet = new Set();
let timerTutorialInterval = null;
let tutorialDataCache = null;
let transicaoEmExecucao = false;

// Configuração padrão da partida
let configLocal = {
  modoJogo: "niveis_intimidade",
  baralhosAtivos: ["niveis_intimidade"],
  totalCartas: 20
};

// Alternância de Telas
function mostrarApenasPainel(painelAtivo) {
  [painelLobby, painelConfiguracao, painelMesaJogo, painelFimPartida].forEach((p) => {
    if (p) p.classList.add("bloco-oculto");
  });
  if (painelAtivo) {
    painelAtivo.classList.remove("bloco-oculto");
  }
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

// Escuta do Host
escutarHostId(codigoSala, (hostId) => {
  idHostSala = hostId;
  souHost = hostId === idJogadorAtual;
  atualizarVisualHost();
  if (dadosJogadoresCache) {
    renderizarLobbyMesa(dadosJogadoresCache);
    renderizarJogadoresRadial(dadosJogadoresCache, cartaAtualCache);
  }
});

// Escuta do ModoInfo
escutarModoInfo(codigoSala, (modoInfo) => {
  if (modoInfo && bannerModoJogo) {
    if (modoJogoIcone) modoJogoIcone.textContent = modoInfo.icone || "🔥";
    if (modoJogoNome) modoJogoNome.textContent = modoInfo.nome || "Modo Mesa Quente";
    if (modoJogoDesc) modoJogoDesc.textContent = modoInfo.descricao || "";
    if (deckCentroIcone) deckCentroIcone.textContent = modoInfo.icone || "🔥";
    if (deckCentroTag) deckCentroTag.textContent = (modoInfo.nome || "MESA").toUpperCase().slice(0, 10);
    configLocal.modoJogo = modoInfo.id;
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
    const avatarData = obterAvatarJogador(j);

    const assento = document.createElement("div");
    assento.className = `assento-jogador-3d ${isDesconectado ? "assento-desconectado" : ""} ${isMe ? "assento-meu" : ""}`;

    const avatar = document.createElement("div");
    avatar.className = "assento-avatar-3d";
    avatar.style.backgroundColor = avatarData.cor;
    avatar.style.borderColor = avatarData.corBorda;
    avatar.style.boxShadow = `0 4px 14px ${avatarData.cor}66, inset 0 2px 4px rgba(255,255,255,0.4)`;
    avatar.textContent = avatarData.emoji;

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
      tagH.textContent = "👑 HOST";
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
// MESA CIRCULAR RADIAL (JOGADORES AO REDOR COM MOLDURA CARTOON)
// ============================================================
function renderizarJogadoresRadial(jogadores, cartaAtual) {
  if (!camadaJogadoresRadial) return;
  camadaJogadoresRadial.innerHTML = "";

  const ids = Object.keys(jogadores || {}).filter(
    (id) => jogadores[id] && jogadores[id].conectado !== false
  );

  if (ids.length === 0) return;

  const leitorId = cartaAtual ? cartaAtual.leitorId : null;
  const alvoId = cartaAtual ? cartaAtual.alvoId : null;
  const total = ids.length;

  const raioX = 40;
  const raioY = 36;

  ids.forEach((id, index) => {
    const j = jogadores[id];
    const isLeitor = id === leitorId;
    const isAlvo = id === alvoId;
    const isMe = id === idJogadorAtual;
    const avatarData = obterAvatarJogador(j);

    let angulo;
    if (total === 2) {
      angulo = index === 0 ? -Math.PI / 2 : Math.PI / 2;
    } else if (total === 3) {
      angulo = -Math.PI / 2 + (index * 2 * Math.PI) / 3;
    } else if (total === 4) {
      angulo = -Math.PI / 2 + (index * 2 * Math.PI) / 4;
    } else {
      angulo = -Math.PI / 2 + (index * 2 * Math.PI) / total;
    }

    const posX = 50 + raioX * Math.cos(angulo);
    const posY = 50 + raioY * Math.sin(angulo);

    const seat = document.createElement("div");
    seat.className = `assento-radial-jogador ${isLeitor ? "is-leitor-ativo" : ""} ${isAlvo ? "is-alvo-ativo" : ""} ${isMe ? "is-local-player" : ""}`;
    seat.style.left = `${posX}%`;
    seat.style.top = `${posY}%`;
    seat.id = `seat-radial-${id}`;

    // Wrapper com avatar sob a moldura e a moldura PNG por cima
    const molduraWrapper = document.createElement("div");
    molduraWrapper.className = `avatar-radial-wrapper ${isLeitor ? "avatar-radial-glow-vez" : ""} ${isAlvo ? "avatar-radial-glow-alvo" : ""}`;

    const avatarFundo = document.createElement("div");
    avatarFundo.className = "avatar-radial-fundo";
    avatarFundo.style.backgroundColor = avatarData.cor;
    avatarFundo.textContent = avatarData.emoji;

    const molduraImg = document.createElement("img");
    molduraImg.src = "moldura-playeres.png";
    molduraImg.alt = "Moldura";
    molduraImg.className = "moldura-player-img";

    molduraWrapper.appendChild(avatarFundo);
    molduraWrapper.appendChild(molduraImg);

    if (isLeitor) {
      const badgeLeitor = document.createElement("span");
      badgeLeitor.className = "badge-radial-status badge-radial-leitor";
      badgeLeitor.innerHTML = `<span>🎙️</span> LENDO`;
      seat.appendChild(badgeLeitor);
    } else if (isAlvo) {
      const badgeAlvo = document.createElement("span");
      badgeAlvo.className = "badge-radial-status badge-radial-alvo";
      badgeAlvo.innerHTML = `<span>🎯</span> ALVO`;
      seat.appendChild(badgeAlvo);
    }

    // Nome posicionado na tag sobre a base da moldura
    const nome = document.createElement("div");
    nome.className = "nome-radial-jogador";
    nome.textContent = isMe ? `${j.nome} (Você)` : j.nome;

    seat.appendChild(molduraWrapper);
    seat.appendChild(nome);

    camadaJogadoresRadial.appendChild(seat);
  });
}

function renderizarAvataresFim(jogadores) {
  if (!gradeAvataresFim) return;
  gradeAvataresFim.innerHTML = "";

  const ids = Object.keys(jogadores || {}).filter(
    (id) => jogadores[id] && jogadores[id].conectado !== false
  );

  ids.forEach((id) => {
    const j = jogadores[id];
    const avatarData = obterAvatarJogador(j);
    const item = document.createElement("div");
    item.className = "item-avatar-fim";

    const av = document.createElement("div");
    av.className = "avatar-fim-3d";
    av.style.backgroundColor = avatarData.cor;
    av.style.borderColor = avatarData.corBorda;
    av.textContent = avatarData.emoji;

    const nome = document.createElement("span");
    nome.className = "nome-fim-jogador";
    nome.textContent = id === idJogadorAtual ? `${j.nome} (Você)` : j.nome;

    item.appendChild(av);
    item.appendChild(nome);
    gradeAvataresFim.appendChild(item);
  });
}

// ============================================================
// CONFIGURAÇÃO DE BARALHOS NO LOBBY
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

    const icone = document.createElement("span");
    icone.className = "baralho-icone-3d";
    icone.textContent = baralho.icone || "🃏";

    const info = document.createElement("div");
    info.className = "baralho-info-3d";

    const titulo = document.createElement("strong");
    titulo.className = "baralho-titulo-3d";
    titulo.textContent = baralho.nome;

    const desc = document.createElement("p");
    desc.className = "baralho-desc-3d";
    desc.textContent = baralho.descricao;

    info.appendChild(titulo);
    info.appendChild(desc);

    divOpcao.appendChild(checkbox);
    divOpcao.appendChild(icone);
    divOpcao.appendChild(info);

    divOpcao.addEventListener("click", (e) => {
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
      }
      alternarBaralhoConfig(baralho.id, checkbox.checked, divOpcao);
    });

    listaBaralhosConfig.appendChild(divOpcao);
  });
}

function alternarBaralhoConfig(baralhoId, ativo, elementoOpcao) {
  if (ativo) {
    if (!configLocal.baralhosAtivos.includes(baralhoId)) {
      configLocal.baralhosAtivos.push(baralhoId);
    }
    elementoOpcao.classList.add("selecionado");
  } else {
    if (configLocal.baralhosAtivos.length <= 1) {
      alert("A mesa precisa de pelo menos 1 minigame ativo!");
      const chk = elementoOpcao.querySelector(".baralho-checkbox-3d");
      if (chk) chk.checked = true;
      return;
    }
    configLocal.baralhosAtivos = configLocal.baralhosAtivos.filter((id) => id !== baralhoId);
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

function inicializarSeletorModosConfig() {
  if (!seletorModosConfig) return;
  const cards = seletorModosConfig.querySelectorAll(".card-modo-opcao");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (typeof audioApp !== "undefined") audioApp.tocarClique();
      cards.forEach((c) => c.classList.remove("selecionado"));
      card.classList.add("selecionado");

      const modoKey = card.getAttribute("data-modo") || "niveis_intimidade";
      configLocal.modoJogo = modoKey;

      if (modoKey !== "personalizado" && MODOS_DE_JOGO[modoKey]) {
        configLocal.baralhosAtivos = [...MODOS_DE_JOGO[modoKey].baralhos];
      }
      renderizarListaBaralhosConfig();
      atualizarResumosConfig();
    });
  });
}

if (gradeQtdCartas) {
  gradeQtdCartas.querySelectorAll(".btn-qtd-3d").forEach((btn) => {
    btn.addEventListener("click", () => {
      gradeQtdCartas.querySelectorAll(".btn-qtd-3d").forEach((b) => b.classList.remove("selecionado"));
      btn.classList.add("selecionado");

      const val = btn.getAttribute("data-qtd");
      if (val === "custom") {
        if (campoRodadasCustomLobby) campoRodadasCustomLobby.classList.remove("bloco-oculto");
        configLocal.totalCartas = parseInt(inputRodadasCustomLobby?.value, 10) || 25;
        if (inputRodadasCustomLobby) inputRodadasCustomLobby.focus();
      } else {
        if (campoRodadasCustomLobby) campoRodadasCustomLobby.classList.add("bloco-oculto");
        configLocal.totalCartas = parseInt(val, 10) || 20;
      }

      if (typeof audioApp !== "undefined") audioApp.tocarClique();
      atualizarResumosConfig();
    });
  });
}

if (inputRodadasCustomLobby) {
  inputRodadasCustomLobby.addEventListener("input", () => {
    let num = parseInt(inputRodadasCustomLobby.value, 10);
    if (isNaN(num) || num < 5) num = 5;
    if (num > 100) num = 100;
    configLocal.totalCartas = num;
    atualizarResumosConfig();
  });
}

inicializarSeletorModosConfig();
renderizarListaBaralhosConfig();

if (btnAbrirConfig) {
  btnAbrirConfig.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    mostrarApenasPainel(painelConfiguracao);
  });
}

if (btnAbrirConfigHud) {
  btnAbrirConfigHud.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    if (souHost) {
      mostrarApenasPainel(painelConfiguracao);
    } else {
      alert("Apenas o anfitrião (Host) pode alterar as configurações da mesa.");
    }
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
      await iniciarTutorialRegras(codigoSala, configLocal);
    } catch (erro) {
      console.error(erro);
      mensagemErroLobby.textContent = "Não foi possível iniciar a partida.";
      btnSalvarIniciarConfig.disabled = false;
      btnSalvarIniciarConfig.textContent = "🔥 Iniciar com essa Seleção";
    }
  });
}

// ============================================================
// OVERLAY 0: TUTORIAL DE REGRAS & BOAS-VINDAS (INTRODUÇÃO)
// ============================================================
let tutorialJaDisparadoSorteio = false;

function renderizarTutorialRegras(tutorialData, jogadores) {
  if (!tutorialData) return;
  tutorialDataCache = tutorialData;

  if (overlayTutorialRegras) {
    overlayTutorialRegras.classList.remove("bloco-oculto");
  }

  // Preenche textos do Minigame
  if (tutorialBadgeCategoria) {
    tutorialBadgeCategoria.textContent = (tutorialData.categoriaNome || "MINIGAME").toUpperCase();
  }
  if (tutorialIconeCirculo) {
    tutorialIconeCirculo.textContent = tutorialData.modoIcone || "💜";
  }
  if (tutorialTituloJogo) {
    tutorialTituloJogo.textContent = `Bem-vindo(a) ao ${tutorialData.modoNome || "Minigame"}!`;
  }
  if (tutorialDescricaoJogo) {
    tutorialDescricaoJogo.textContent = tutorialData.descricao || "";
  }

  // Preenche os Passos das Regras
  if (tutorialPassosLista) {
    tutorialPassosLista.innerHTML = "";
    const regras = tutorialData.regras || [
      "Leiam as instruções da carta na mesa com atenção.",
      "Participem das escolhas e desafios em tempo real.",
      "Divirtam-se com honestidade e química!"
    ];

    regras.forEach((regra, index) => {
      const item = document.createElement("div");
      item.className = "tutorial-passo-item";
      item.innerHTML = `
        <span class="tutorial-passo-num">${index + 1}</span>
        <p class="tutorial-passo-texto">${regra}</p>
      `;
      tutorialPassosLista.appendChild(item);
    });
  }

  // Lista dos Jogadores e Estado de Prontos
  const idsConectados = Object.keys(jogadores || {}).filter(
    (id) => jogadores[id] && jogadores[id].conectado !== false
  );
  const totalConectados = idsConectados.length;
  const prontosObj = tutorialData.prontos || {};
  const totalProntos = idsConectados.filter((id) => prontosObj[id] === true).length;

  if (tutorialProntosContador) {
    tutorialProntosContador.textContent = `${totalProntos} / ${totalConectados}`;
  }

  if (tutorialJogadoresChips) {
    tutorialJogadoresChips.innerHTML = "";
    idsConectados.forEach((id) => {
      const jog = jogadores[id];
      const av = obterAvatarJogador(jog);
      const isPronto = prontosObj[id] === true;
      const isMe = id === idJogadorAtual;

      const chip = document.createElement("div");
      chip.className = `tutorial-jogador-chip ${isPronto ? "pronto" : ""}`;
      chip.innerHTML = `
        <div class="chip-avatar-mini" style="background-color: ${av.cor}; border-color: ${av.corBorda};">
          <span>${av.emoji}</span>
        </div>
        <span class="chip-nome-mini">${jog.nome || "Jogador"} ${isMe ? "(Você)" : ""}</span>
        <span class="chip-status-check">${isPronto ? "✅" : "⏳"}</span>
      `;
      tutorialJogadoresChips.appendChild(chip);
    });
  }

  // Atualiza botão "Entendi"
  const euJaPronto = prontosObj[idJogadorAtual] === true;
  if (btnEntendiTutorial) {
    if (euJaPronto) {
      btnEntendiTutorial.disabled = true;
      btnEntendiTutorial.classList.add("ja-confirmado");
      btnEntendiTutorial.innerHTML = "<span>✅ Você já confirmou! Aguardando os outros...</span>";
    } else {
      btnEntendiTutorial.disabled = false;
      btnEntendiTutorial.classList.remove("ja-confirmado");
      btnEntendiTutorial.innerHTML = "<span>✅ Entendi! Estou Pronto(a)</span>";
    }
  }

  // Se TODOS os jogadores conectados confirmaram (ou se estiver 1 sozinho e já confirmou)
  const todosProntos = totalConectados > 0 && totalProntos >= totalConectados;
  if (todosProntos && !tutorialJaDisparadoSorteio) {
    tutorialJaDisparadoSorteio = true;
    if (souHost) {
      setTimeout(async () => {
        try {
          await iniciarTransicaoPartida(codigoSala, tutorialData.configTemp || configLocal);
        } catch (e) {
          console.error(e);
        }
      }, 600);
    }
  }

  // Inicia contador de Fallback (35s)
  iniciarTimerTutorial(tutorialData.iniciadoEm, tutorialData.duracaoSegundos || 35);
}

function iniciarTimerTutorial(iniciadoEm, duracaoTotal = 35) {
  if (timerTutorialInterval) clearInterval(timerTutorialInterval);

  function atualizarTimer() {
    if (!iniciadoEm) return;
    const agora = obterTimestampServidor();
    const decorrido = Math.floor(Math.max(0, agora - iniciadoEm) / 1000);
    const restante = Math.max(0, duracaoTotal - decorrido);
    const perc = Math.max(0, Math.min(100, (restante / duracaoTotal) * 100));

    if (tutorialTimerBarra) tutorialTimerBarra.style.width = `${perc}%`;
    if (tutorialTimerTexto) tutorialTimerTexto.textContent = `Avançando em ${restante}s...`;

    if (restante <= 0) {
      clearInterval(timerTutorialInterval);
      if (souHost && !tutorialJaDisparadoSorteio) {
        tutorialJaDisparadoSorteio = true;
        iniciarTransicaoPartida(codigoSala, tutorialDataCache?.configTemp || configLocal);
      }
    }
  }

  atualizarTimer();
  timerTutorialInterval = setInterval(atualizarTimer, 500);
}

// Botão "Entendi! Estou Pronto(a)"
if (btnEntendiTutorial) {
  btnEntendiTutorial.addEventListener("click", async () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    btnEntendiTutorial.disabled = true;
    btnEntendiTutorial.textContent = "Confirmando...";
    try {
      await marcarProntoTutorial(codigoSala);
    } catch (e) {
      console.error(e);
      btnEntendiTutorial.disabled = false;
    }
  });
}

// ============================================================
// TRANSIÇÃO DE INÍCIO: CONTAGEM + SORTEIO DO DADO (1 A 9)
// ============================================================
function renderizarJogadoresDisputaDado(vencedorId) {
  if (!rodaSorteioJogadores) return;
  rodaSorteioJogadores.innerHTML = "";

  const listaJogadores = Object.entries(dadosJogadoresCache || {}).filter(
    ([, j]) => j && j.conectado !== false
  );

  listaJogadores.forEach(([id, jog]) => {
    const avatar = obterAvatarJogador(jog);
    const chip = document.createElement("div");
    chip.className = `chip-jogador-sorteio ${id === vencedorId ? "is-vencedor" : ""}`;
    chip.id = `chip-sorteio-${id}`;

    chip.innerHTML = `
      <div class="chip-avatar-circulo" style="background-color: ${avatar.cor}; border-color: ${avatar.corBorda};">
        <span>${avatar.emoji}</span>
      </div>
      <span class="chip-jogador-nome">${jog.nome || "Jogador"}</span>
    `;

    rodaSorteioJogadores.appendChild(chip);
  });
}

function executarAnimacaoTransicao(transicaoData) {
  if (transicaoEmExecucao) return;
  transicaoEmExecucao = true;

  if (overlayTutorialRegras) overlayTutorialRegras.classList.add("bloco-oculto");
  mostrarApenasPainel(null);

  // FASE 1: CONTAGEM REGRESSIVA (4 .. 1)
  if (overlayContagemRegressiva) {
    overlayContagemRegressiva.classList.remove("bloco-oculto");
  }

  let segundosRestantes = 4;

  function pulsarNumeroContagem(num) {
    if (!contagemNumeroDisplay) return;
    contagemNumeroDisplay.textContent = num;
    contagemNumeroDisplay.classList.remove("contagem-numero-zoom");
    void contagemNumeroDisplay.offsetWidth;
    contagemNumeroDisplay.classList.add("contagem-numero-zoom");

    if (typeof audioApp !== "undefined") {
      audioApp.tocarContagem(num);
    }
  }

  pulsarNumeroContagem(segundosRestantes);

  const intervaloContagem = setInterval(() => {
    segundosRestantes--;
    if (segundosRestantes > 0) {
      pulsarNumeroContagem(segundosRestantes);
    } else {
      clearInterval(intervaloContagem);
      iniciarFaseSorteioDado(transicaoData);
    }
  }, 1000);
}

function iniciarFaseSorteioDado(transicaoData) {
  if (overlayContagemRegressiva) {
    overlayContagemRegressiva.classList.add("bloco-oculto");
  }

  if (overlaySorteioDado) {
    overlaySorteioDado.classList.remove("bloco-oculto");
  }

  if (bannerVencedorDado) {
    bannerVencedorDado.classList.add("bloco-oculto");
  }

  renderizarJogadoresDisputaDado(transicaoData.vencedorId);

  // Inicia rotação do dado
  if (dadoCuboAnimado) {
    dadoCuboAnimado.classList.remove("revelado");
    dadoCuboAnimado.classList.add("rolando");
  }

  if (typeof audioApp !== "undefined") {
    audioApp.tocarDadoRolando();
  }

  // Flicker rápido de números 1 a 9
  let tick = 0;
  const intervaloFlicker = setInterval(() => {
    tick++;
    const randomFace = (tick % 9) + 1;
    if (dadoFaceDisplay) {
      dadoFaceDisplay.textContent = randomFace;
    }
  }, 80);

  // Para exatamente no número sorteado (1 a 9)
  setTimeout(() => {
    clearInterval(intervaloFlicker);

    if (dadoCuboAnimado) {
      dadoCuboAnimado.classList.remove("rolando");
      dadoCuboAnimado.classList.add("revelado");
    }

    const numeroFinal = transicaoData.numeroDado || Math.floor(Math.random() * 9) + 1;
    if (dadoFaceDisplay) {
      dadoFaceDisplay.textContent = numeroFinal;
    }

    if (typeof audioApp !== "undefined") {
      audioApp.tocarDadoVencedor();
    }

    const chipVencedor = document.getElementById(`chip-sorteio-${transicaoData.vencedorId}`);
    if (chipVencedor) {
      chipVencedor.classList.add("vencedor-destaque");
    }

    if (bannerVencedorDado) {
      if (vencedorDadoNome) vencedorDadoNome.textContent = transicaoData.vencedorNome || "Jogador";
      if (vencedorDadoAvatar) vencedorDadoAvatar.textContent = transicaoData.vencedorAvatar?.emoji || "👑";
      if (vencedorDadoMensagem) {
        vencedorDadoMensagem.textContent = `tirou ${numeroFinal} no dado e começa puxando a 1ª carta!`;
      }
      bannerVencedorDado.classList.remove("bloco-oculto");
    }

    // Entra na mesa de jogo após o anúncio do dado
    setTimeout(async () => {
      if (overlaySorteioDado) {
        overlaySorteioDado.classList.add("bloco-oculto");
      }

      if (souHost) {
        try {
          await concluirTransicaoParaPartida(codigoSala);
        } catch (e) {
          console.error(e);
        }
      }

      transicaoEmExecucao = false;
      tutorialJaDisparadoSorteio = false;
      mostrarApenasPainel(painelMesaJogo);
    }, 2800);

  }, 2600);
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

if (btnTriggerReacoes && barraReacoes) {
  btnTriggerReacoes.addEventListener("click", (e) => {
    e.stopPropagation();
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    barraReacoes.classList.toggle("bloco-oculto");
  });

  document.addEventListener("click", (e) => {
    if (barraReacoes && !barraReacoes.contains(e.target) && e.target !== btnTriggerReacoes && !btnTriggerReacoes.contains(e.target)) {
      barraReacoes.classList.add("bloco-oculto");
    }
  });
}

if (barraReacoes) {
  barraReacoes.querySelectorAll(".btn-reacao-hud").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const emoji = btn.getAttribute("data-emoji");
      const meuNome = (dadosJogadoresCache[idJogadorAtual] && dadosJogadoresCache[idJogadorAtual].nome) || "Jogador";
      
      if (typeof audioApp !== "undefined") audioApp.tocarClique();
      enviarReacao(codigoSala, emoji, meuNome);

      btn.classList.add("reacao-ativa");
      setTimeout(() => {
        btn.classList.remove("reacao-ativa");
        if (barraReacoes) barraReacoes.classList.add("bloco-oculto");
      }, 220);
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

  [mecanicaAlvo, mecanicaVerdadeDesafio, mecanicaEuNunca, mecanicaLacuna, mecanicaEscolha, mecanicaDilema].forEach((m) => {
    if (m) m.classList.add("bloco-oculto");
  });

  const idsJogadores = Object.keys(jogadores).filter((id) => jogadores[id] && jogadores[id].conectado !== false);
  const totalJogadores = idsJogadores.length;

  if (souHost && (mechanic === "ALVO" || mechanic === "DILEMA" || mechanic === "EU_NUNCA")) {
    btnRevelarResultado.classList.remove("bloco-oculto");
    btnRevelarResultado.textContent = isRevelada ? "✅ Resultados Revelados" : "🎯 Revelar Resultados da Roda";
    btnRevelarResultado.disabled = isRevelada;
  } else {
    btnRevelarResultado.classList.add("bloco-oculto");
  }

  // 1. MECÂNICA: ALVO (target: VOTE / QUEM É MAIS PROVÁVEL)
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
      const avatarData = obterAvatarJogador(j);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `btn-jogador-voto-hud ${meuVoto === id ? "votado-por-mim" : ""}`;
      btn.disabled = isRevelada;

      const avatar = document.createElement("span");
      avatar.className = "jogador-voto-avatar-hud";
      avatar.style.backgroundColor = avatarData.cor;
      avatar.style.borderColor = avatarData.corBorda;
      avatar.textContent = avatarData.emoji;

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

  // 2. MECÂNICA: ROLETA DE CONSEQUÊNCIAS (VERDADE OU DESAFIO)
  else if (mechanic === "VERDADE_DESAFIO") {
    mecanicaVerdadeDesafio.classList.remove("bloco-oculto");
    const souOLeitor = carta.leitorId === idJogadorAtual;
    const escolhaData = interacoes.verdadeDesafio;

    if (escolhaData) {
      revelacaoVdBox.classList.remove("bloco-oculto");
      if (escolhaData.escolha === "VERDADE") {
        vdTipoTag.textContent = "🗣️ VERDADE SELECIONADA:";
        vdTextoDesafio.textContent = carta.verdadeTexto || "Conte a história mais picante que já aconteceu com você!";
        btnEscolhaVerdade.classList.add("selecionado");
        btnEscolhaDesafio.classList.remove("selecionado");
      } else {
        vdTipoTag.textContent = "⚡ DESAFIO SELECIONADO:";
        vdTextoDesafio.textContent = carta.desafioTexto || "Cumpra a prova na câmera ou mostre no celular!";
        btnEscolhaDesafio.classList.add("selecionado");
        btnEscolhaVerdade.classList.remove("selecionado");
      }
      statusVerdadeDesafio.textContent = `${carta.leitorNome || "O jogador"} escolheu ${escolhaData.escolha}!`;
    } else {
      revelacaoVdBox.classList.add("bloco-oculto");
      btnEscolhaVerdade.classList.remove("selecionado");
      btnEscolhaDesafio.classList.remove("selecionado");
      statusVerdadeDesafio.textContent = souOLeitor
        ? "Escolha entre Verdade ou Desafio:"
        : `Aguardando ${carta.leitorNome || "o jogador"} escolher entre Verdade ou Desafio...`;
    }

    btnEscolhaVerdade.disabled = !souOLeitor || !!escolhaData;
    btnEscolhaDesafio.disabled = !souOLeitor || !!escolhaData;
  }

  // 3. MECÂNICA: EU NUNCA (JÁ FIZ vs SOU INOCENTE)
  else if (mechanic === "EU_NUNCA") {
    mecanicaEuNunca.classList.remove("bloco-oculto");
    const votosEuNunca = interacoes.euNunca || {};
    const meuVoto = votosEuNunca[idJogadorAtual];
    const totalVotos = Object.keys(votosEuNunca).length;

    btnEuNuncaFiz.className = `btn-eu-nunca-voto btn-en-fiz ${meuVoto === "JA_FIZ" ? "selecionado" : ""}`;
    btnEuNuncaInocente.className = `btn-eu-nunca-voto btn-en-inocente ${meuVoto === "INOCENTE" ? "selecionado" : ""}`;

    statusEuNunca.textContent = meuVoto
      ? `Seu voto: ${meuVoto === "JA_FIZ" ? "Já Fiz 🍷" : "Sou Inocente 😇"} • (${totalVotos}/${totalJogadores} votaram)`
      : `Você já fez isso? Vote com sinceridade: • (${totalVotos}/${totalJogadores} votaram)`;

    if (totalVotos > 0) {
      resultadoEuNunca.classList.remove("bloco-oculto");
      let qtdFiz = 0;
      let qtdInocente = 0;
      const votantesFiz = [];
      const votantesInocente = [];

      Object.entries(votosEuNunca).forEach(([id, v]) => {
        const jNome = (jogadores[id] && jogadores[id].nome) || "Jogador";
        if (v === "JA_FIZ") {
          qtdFiz++;
          votantesFiz.push(jNome);
        } else {
          qtdInocente++;
          votantesInocente.push(jNome);
        }
      });

      const percFiz = Math.round((qtdFiz / totalVotos) * 100);
      const percInocente = 100 - percFiz;

      barraEnFiz.style.width = `${percFiz}%`;
      barraEnInocente.style.width = `${percInocente}%`;
      percEnFiz.textContent = `🍷 ${percFiz}% Já Fez (${qtdFiz})`;
      percEnInocente.textContent = `😇 ${percInocente}% Inocente (${qtdInocente})`;

      detalhesVotosEuNunca.innerHTML = `
        <div class="coluna-votos-en">
          <strong class="label-col-fiz">🍷 Já Fizeram (Bebem ou contam!):</strong>
          <span>${votantesFiz.join(", ") || "Ninguém"}</span>
        </div>
        <div class="coluna-votos-en">
          <strong class="label-col-inocente">😇 Inocentes:</strong>
          <span>${votantesInocente.join(", ") || "Ninguém"}</span>
        </div>
      `;
    } else {
      resultadoEuNunca.classList.add("bloco-oculto");
    }
  }

  // 4. MECÂNICA: PREENCHA A LACUNA
  else if (mechanic === "LACUNA") {
    mecanicaLacuna.classList.remove("bloco-oculto");
    const respostasBrancas = carta.respostasBrancas || [
      "Uma pizza de madrugada",
      "Stalkear a ex no Instagram",
      "Fazer drama por 3 dias",
      "Um vinho e conversa fiada"
    ];

    const lacunasObj = interacoes.lacuna || {};
    const minhaResposta = lacunasObj[idJogadorAtual];

    gradeCartasBrancas.innerHTML = "";
    respostasBrancas.forEach((textoOpcao) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `btn-carta-branca-opcao ${minhaResposta && minhaResposta.texto === textoOpcao ? "selecionado" : ""}`;
      btn.innerHTML = `<span>${textoOpcao}</span>`;

      btn.addEventListener("click", () => {
        if (typeof audioApp !== "undefined") audioApp.tocarClique();
        submeterRespostaLacuna(codigoSala, textoOpcao);
      });

      gradeCartasBrancas.appendChild(btn);
    });

    const totalRespostas = Object.keys(lacunasObj).length;
    statusLacuna.textContent = minhaResposta
      ? `Sua resposta foi enviada! (${totalRespostas}/${totalJogadores} responderam)`
      : `Escolha a melhor carta branca para preencher a lacuna: (${totalRespostas}/${totalJogadores})`;
  }

  // 5. MECÂNICA: ESCOLHA (target: CHOOSE)
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
      const avatarData = obterAvatarJogador(j);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `btn-jogador-voto-hud ${escolhaFeita && escolhaFeita.alvoId === id ? "votado-por-mim" : ""}`;
      btn.disabled = !souOEscolhedor || !!escolhaFeita;

      const avatar = document.createElement("span");
      avatar.className = "jogador-voto-avatar-hud";
      avatar.style.backgroundColor = avatarData.cor;
      avatar.style.borderColor = avatarData.corBorda;
      avatar.textContent = avatarData.emoji;

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

  // 6. MECÂNICA: DILEMA (target: ALL)
  else if (mechanic === "DILEMA") {
    mecanicaDilema.classList.remove("bloco-oculto");

    const opcoes = carta.opcoes && carta.opcoes.length >= 2
      ? carta.opcoes
      : ["Primeira Opção", "Segunda Opção"];

    textoDilemaA.textContent = opcoes[0];
    textoDilemaB.textContent = opcoes[1];

    const votosDilema = interacoes.dilema || {};
    const meuVoto = votosDilema[idJogadorAtual];
    const totalVotos = Object.keys(votosDilema).length;

    btnDilemaA.className = `btn-dilema-hud ${meuVoto === "A" ? "selecionado" : ""}`;
    btnDilemaB.className = `btn-dilema-hud ${meuVoto === "B" ? "selecionado" : ""}`;

    statusDilemaVotos.textContent = meuVoto
      ? `Você votou na Opção ${meuVoto} • (${totalVotos}/${totalJogadores} votaram)`
      : `Voto Secreto — Escolha seu lado • (${totalVotos}/${totalJogadores} votaram)`;

    if (isRevelada || totalVotos >= totalJogadores) {
      resultadoDilema.classList.remove("bloco-oculto");

      let countA = 0;
      let countB = 0;
      const votantesA = [];
      const votantesB = [];

      Object.entries(votosDilema).forEach(([id, voto]) => {
        const jNome = (jogadores[id] && jogadores[id].nome) || "Jogador";
        if (voto === "A") {
          countA++;
          votantesA.push(jNome);
        } else if (voto === "B") {
          countB++;
          votantesB.push(jNome);
        }
      });

      const totalDilema = countA + countB;
      const percA = totalDilema > 0 ? Math.round((countA / totalDilema) * 100) : 50;
      const percB = totalDilema > 0 ? 100 - percA : 50;

      barraDilemaA.style.width = `${percA}%`;
      barraDilemaB.style.width = `${percB}%`;
      percDilemaA.textContent = `A: ${percA}% (${countA})`;
      percDilemaB.textContent = `B: ${percB}% (${countB})`;

      detalhesVotosDilema.innerHTML = `
        <div class="lado-dilema-detalhe">
          <strong>Lado A:</strong>
          <p class="nomes-lado-dilema">${votantesA.join(", ") || "Ninguém"}</p>
        </div>
        <div class="lado-dilema-detalhe">
          <strong>Lado B:</strong>
          <p class="nomes-lado-dilema">${votantesB.join(", ") || "Ninguém"}</p>
        </div>
      `;
    } else {
      resultadoDilema.classList.add("bloco-oculto");
    }
  }

  // Reações em Tempo Real
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

// Botões de Escolha Verdade ou Desafio
if (btnEscolhaVerdade) {
  btnEscolhaVerdade.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    escolherVerdadeDesafio(codigoSala, "VERDADE");
  });
}

if (btnEscolhaDesafio) {
  btnEscolhaDesafio.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    escolherVerdadeDesafio(codigoSala, "DESAFIO");
  });
}

// Botões de Eu Nunca
if (btnEuNuncaFiz) {
  btnEuNuncaFiz.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    votarEuNunca(codigoSala, "JA_FIZ");
  });
}

if (btnEuNuncaInocente) {
  btnEuNuncaInocente.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    votarEuNunca(codigoSala, "INOCENTE");
  });
}

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
  migrarHostSeNecessario(codigoSala, jogadores, idHostSala);
  renderizarLobbyMesa(dadosJogadoresCache);
  renderizarJogadoresRadial(dadosJogadoresCache, cartaAtualCache);

  const ids = Object.keys(dadosJogadoresCache);
  const totalConectados = ids.filter((id) => dadosJogadoresCache[id].conectado !== false).length;
  contadorJogadores.textContent = `${totalConectados} na mesa`;

  if (totalConectados <= 1 && ids.length > 1) {
    avisoSozinhoSala.classList.remove("bloco-oculto");
  } else {
    avisoSozinhoSala.classList.add("bloco-oculto");
  }

  if (tutorialDataCache) {
    renderizarTutorialRegras(tutorialDataCache, dadosJogadoresCache);
  }

  if (cartaAtualCache) {
    renderizarMecanicas(cartaAtualCache, interacoesCache, dadosJogadoresCache);
  }
});

// 2. Status Geral da Sala
escutarStatusSala(codigoSala, (status) => {
  if (status === "lobby") {
    transicaoEmExecucao = false;
    tutorialJaDisparadoSorteio = false;
    if (overlayTutorialRegras) overlayTutorialRegras.classList.add("bloco-oculto");
    if (overlayContagemRegressiva) overlayContagemRegressiva.classList.add("bloco-oculto");
    if (overlaySorteioDado) overlaySorteioDado.classList.add("bloco-oculto");
    mostrarApenasPainel(painelLobby);
    btnIniciarPartida.disabled = false;
    btnIniciarPartida.textContent = "🔥 Iniciar Partida na Mesa";
    if (btnSalvarIniciarConfig) {
      btnSalvarIniciarConfig.disabled = false;
      btnSalvarIniciarConfig.textContent = "🔥 Iniciar com essa Seleção";
    }
  }
});

// Escuta o Tutorial de Regras
escutarTutorialRegras(codigoSala, (tutorialData) => {
  if (tutorialData) {
    renderizarTutorialRegras(tutorialData, dadosJogadoresCache);
  }
});

// Escuta a transição sincronizada de início (Contagem + Dado)
escutarTransicaoInicio(codigoSala, (transicao) => {
  if (transicao && !transicaoEmExecucao) {
    executarAnimacaoTransicao(transicao);
  }
});

// 3. Sincronização da Partida, Cartas Secretas e Fim de Jogo
escutarPartida(codigoSala, (partida) => {
  if (!partida || partida.status === "aguardando") return;

  interacoesCache = partida.interacoes || {};

  // FIM DE PARTIDA
  if (partida.status === "finalizada") {
    mostrarApenasPainel(painelFimPartida);
    if (textoResumoFim) {
      textoResumoFim.textContent = `A mesa completou com sucesso todas as ${partida.totalRodadas || 20} cartas sorteadas!`;
    }
    renderizarAvataresFim(dadosJogadoresCache);
    return;
  }

  // PARTIDA EM ANDAMENTO
  if (partida.status === "jogando" && partida.cartaAtual) {
    if (overlayTutorialRegras) overlayTutorialRegras.classList.add("bloco-oculto");
    if (overlayContagemRegressiva) overlayContagemRegressiva.classList.add("bloco-oculto");
    if (overlaySorteioDado) overlaySorteioDado.classList.add("bloco-oculto");

    mostrarApenasPainel(painelMesaJogo);
    const carta = partida.cartaAtual;
    cartaAtualCache = carta;

    if (tagDeckNome) tagDeckNome.textContent = `🔥 ${carta.deck_nome ? carta.deck_nome.toUpperCase() : "MESA QUENTE"}`;
    if (contadorCartasRodada) contadorCartasRodada.textContent = `Rodada ${partida.rodadaAtual || 1} / ${partida.totalRodadas || 20}`;

    const souOLeitor = carta.leitorId === idJogadorAtual;
    if (souOLeitor) {
      if (boxLeitorRodada) boxLeitorRodada.className = "tag-leitor-vez-discreta box-leitor-voce";
      if (leitorTitulo) leitorTitulo.textContent = "Sua vez de ler!";
      if (leitorHudIcone) leitorHudIcone.textContent = "🎙️";
      if (leitorInstrucao) leitorInstrucao.textContent = "Puxe a carta e leia em voz alta para todos os jogadores.";
    } else {
      const nomeLeitor = carta.leitorNome || "Jogador";
      if (boxLeitorRodada) boxLeitorRodada.className = "tag-leitor-vez-discreta box-leitor-outro";
      if (leitorTitulo) leitorTitulo.textContent = `Vez de ${nomeLeitor}`;
      if (leitorHudIcone) leitorHudIcone.textContent = "👀";
      if (leitorInstrucao) leitorInstrucao.textContent = `Aguarde ${nomeLeitor} ler o desafio em voz alta.`;
    }

    if (carta.target === "RANDOM" && carta.alvoNome) {
      if (blocoAlvoSorteado) blocoAlvoSorteado.classList.remove("bloco-oculto");
      if (nomeAlvoDestaque) nomeAlvoDestaque.textContent = carta.alvoNome;
    } else {
      if (blocoAlvoSorteado) blocoAlvoSorteado.classList.add("bloco-oculto");
    }

    renderizarJogadoresRadial(dadosJogadoresCache, carta);

    const isRevelada = carta.revelada === true;

    if (!isRevelada) {
      if (deckCentralArea) deckCentralArea.classList.remove("bloco-oculto");
      if (cartaFlipWrapper) cartaFlipWrapper.classList.add("bloco-oculto");
      if (focoCartaBackdrop) focoCartaBackdrop.classList.add("bloco-oculto");

      if (souOLeitor) {
        if (deckPilhaJogo) deckPilhaJogo.classList.add("deck-pulsando-suavez");
        if (baralhoAssetWrapper) baralhoAssetWrapper.classList.add("baralho-ativo-vez");
        if (badgeSuaVez) badgeSuaVez.classList.remove("bloco-oculto");
        if (btnPuxarCartaMesa) {
          btnPuxarCartaMesa.classList.remove("bloco-oculto");
          btnPuxarCartaMesa.disabled = false;
        }
        if (boxEsperaPuxar) boxEsperaPuxar.classList.add("bloco-oculto");
      } else {
        if (deckPilhaJogo) deckPilhaJogo.classList.remove("deck-pulsando-suavez");
        if (baralhoAssetWrapper) baralhoAssetWrapper.classList.remove("baralho-ativo-vez");
        if (badgeSuaVez) badgeSuaVez.classList.add("bloco-oculto");
        if (btnPuxarCartaMesa) btnPuxarCartaMesa.classList.add("bloco-oculto");
        if (boxEsperaPuxar) {
          boxEsperaPuxar.classList.remove("bloco-oculto");
          if (textoEsperaPuxar) {
            textoEsperaPuxar.textContent = `Aguardando ${carta.leitorNome || "o jogador da vez"} puxar a carta...`;
          }
        }
      }
    } else {
      if (deckCentralArea) deckCentralArea.classList.add("bloco-oculto");
      if (baralhoAssetWrapper) baralhoAssetWrapper.classList.remove("baralho-ativo-vez");
      if (badgeSuaVez) badgeSuaVez.classList.add("bloco-oculto");
      if (cartaFlipWrapper) cartaFlipWrapper.classList.remove("bloco-oculto");
      if (focoCartaBackdrop) focoCartaBackdrop.classList.remove("bloco-oculto");

      if (souOLeitor) {
        if (cartaJogoElemento) {
          cartaJogoElemento.classList.remove("carta-secreta-oculta");
          cartaJogoElemento.classList.add("carta-aberta-leitor");
        }
        if (cartaDeckIcone) cartaDeckIcone.textContent = carta.deck_icone || "🃏";
        if (cartaDeckNome) cartaDeckNome.textContent = carta.deck_nome || "Baralho";
        if (cartaMechanicTag) {
          cartaMechanicTag.textContent = carta.subtype || carta.mechanic || "DESAFIO";
          cartaMechanicTag.className = `badge-mecanica-carta tag-mechanic-${carta.mechanic || "CONFISSAO"}`;
        }
        if (cartaTexto) cartaTexto.textContent = carta.text || "";
      } else {
        if (cartaJogoElemento) {
          cartaJogoElemento.classList.remove("carta-aberta-leitor");
          cartaJogoElemento.classList.add("carta-secreta-oculta");
        }
        if (cartaTexto) cartaTexto.textContent = "";
        if (textoOucaLeitor) {
          textoOucaLeitor.textContent = `Escute o que ${carta.leitorNome || "o jogador da vez"} vai ler em voz alta!`;
        }
      }

      if (ultimaCartaExibidaId !== carta.id + "_rev") {
        reacoesAnimadasSet.clear();
        if (typeof audioApp !== "undefined") audioApp.tocarViradaCarta();

        if (cartaJogoElemento) {
          cartaJogoElemento.classList.remove("anim-descarte-esquerda");
          cartaJogoElemento.classList.remove("anim-puxar-flip");
          void cartaJogoElemento.offsetWidth;
          cartaJogoElemento.classList.add("anim-puxar-flip");
        }

        ultimaCartaExibidaId = carta.id + "_rev";
      }
    }

    renderizarMecanicas(carta, interacoesCache, dadosJogadoresCache);

    if (souHost || souOLeitor) {
      if (controlesAvancoJogo) controlesAvancoJogo.classList.remove("bloco-oculto");
      if (avisoJogadorJogo) avisoJogadorJogo.classList.add("bloco-oculto");
      if (btnProximaCarta) {
        btnProximaCarta.disabled = false;
        btnProximaCarta.innerHTML = "<span>⏭️ Próxima Rodada (Passar a Vez) 🔥</span>";
      }
    } else {
      if (controlesAvancoJogo) controlesAvancoJogo.classList.add("bloco-oculto");
      if (avisoJogadorJogo) avisoJogadorJogo.classList.remove("bloco-oculto");
      if (textoAvisoRodaEspera) {
        textoAvisoRodaEspera.textContent = `💬 Aguarde ${carta.leitorNome || "o jogador da vez"} concluir a rodada...`;
      }
    }
  }
});

// 4. Escuta de Interações
escutarInteracoes(codigoSala, (interacoes) => {
  interacoesCache = interacoes || {};
  if (cartaAtualCache) {
    renderizarMecanicas(cartaAtualCache, interacoesCache, dadosJogadoresCache);
  }
});

// ============================================================
// AÇÕES DO JOGADOR E DO HOST
// ============================================================

btnCopiarCodigo.addEventListener("click", () => {
  navigator.clipboard.writeText(codigoSala).then(() => {
    btnCopiarCodigo.innerHTML = "<span>✅</span> Copiado!";
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    setTimeout(() => {
      btnCopiarCodigo.innerHTML = "<span>📋</span> Copiar";
    }, 1800);
  });
});

// Iniciar Partida (Transição direta para Gameplay & Cenário 2.5D)
async function iniciarPartidaGameplay() {
  if (!souHost) return;
  if (btnIniciarPartida) {
    btnIniciarPartida.disabled = true;
    btnIniciarPartida.textContent = "Iniciando Mesa...";
  }
  if (typeof audioApp !== "undefined") audioApp.tocarClique();

  try {
    // 1. Transição de Telas (Oculta Sala de Espera / Lobby e Exibe a Tela Gameplay)
    const elSalaEspera = document.getElementById("sala-de-espera") || document.getElementById("painel-lobby");
    const elTelaGameplay = document.getElementById("tela-gameplay") || document.getElementById("painel-mesa-jogo");

    if (elSalaEspera) {
      elSalaEspera.style.display = "none";
      elSalaEspera.classList.add("bloco-oculto");
    }
    if (elTelaGameplay) {
      elTelaGameplay.style.display = "block";
      elTelaGameplay.classList.remove("bloco-oculto");
    }

    // 2. Inicialização do Cenário 2.5D (Parede, Mesa, Redemoinho, Baralho e Molduras)
    const deckCentral = document.getElementById("deck-central-area") || document.getElementById("baralho-asset-wrapper");
    if (deckCentral) {
      deckCentral.style.display = "flex";
      deckCentral.classList.remove("bloco-oculto");
    }

    // Renderiza molduras dos jogadores
    renderizarJogadoresRadial(dadosJogadoresCache, cartaAtualCache);

    // 3. Feedback do Turno Inicial (Identifica Jogador 1 / Host e ativa pulso/brilho no baralho)
    const baralhoEl = document.getElementById("baralho-asset-wrapper") || document.getElementById("img-baralho-mesa");
    const badgeVez = document.getElementById("badge-sua-vez");

    if (baralhoEl) {
      baralhoEl.classList.add("turno-ativo", "baralho-ativo-vez");
    }
    if (badgeVez) {
      badgeVez.style.display = "block";
      badgeVez.classList.remove("bloco-oculto");
    }

    // Dispara a sincronização no Firebase para todos os outros participantes da sala
    await iniciarTransicaoPartida(codigoSala, configLocal);
  } catch (erro) {
    console.error("Erro ao iniciar gameplay:", erro);
    if (mensagemErroLobby) mensagemErroLobby.textContent = "Erro ao iniciar partida. Tente novamente.";
    if (btnIniciarPartida) {
      btnIniciarPartida.disabled = false;
      btnIniciarPartida.textContent = "🔥 Iniciar Partida na Mesa";
    }
  }
}

if (btnIniciarPartida) {
  btnIniciarPartida.addEventListener("click", iniciarPartidaGameplay);
}

// Puxar Carta
async function executarAcaoPuxarCarta() {
  if (!cartaAtualCache || cartaAtualCache.revelada) return;
  if (cartaAtualCache.leitorId !== idJogadorAtual) return;

  if (btnPuxarCartaMesa) btnPuxarCartaMesa.disabled = true;
  if (typeof audioApp !== "undefined") audioApp.tocarViradaCarta();

  try {
    await puxarCartaDaMesa(codigoSala);
  } catch (err) {
    console.error(err);
    if (btnPuxarCartaMesa) btnPuxarCartaMesa.disabled = false;
  }
}

if (btnPuxarCartaMesa) {
  btnPuxarCartaMesa.addEventListener("click", executarAcaoPuxarCarta);
}

if (deckPilhaJogo) {
  deckPilhaJogo.addEventListener("click", () => {
    if (cartaAtualCache && !cartaAtualCache.revelada && cartaAtualCache.leitorId === idJogadorAtual) {
      executarAcaoPuxarCarta();
    }
  });
}

if (baralhoAssetWrapper) {
  baralhoAssetWrapper.addEventListener("click", () => {
    if (cartaAtualCache && !cartaAtualCache.revelada && cartaAtualCache.leitorId === idJogadorAtual) {
      executarAcaoPuxarCarta();
    }
  });
}

if (imgBaralhoMesa) {
  imgBaralhoMesa.addEventListener("click", () => {
    if (cartaAtualCache && !cartaAtualCache.revelada && cartaAtualCache.leitorId === idJogadorAtual) {
      executarAcaoPuxarCarta();
    }
  });
}

// Avançar Rodada
btnProximaCarta.addEventListener("click", async () => {
  const souOLeitor = cartaAtualCache && cartaAtualCache.leitorId === idJogadorAtual;
  if (!souHost && !souOLeitor) return;

  btnProximaCarta.disabled = true;
  btnProximaCarta.textContent = "Passando a vez...";
  if (typeof audioApp !== "undefined") audioApp.tocarDescarte();

  if (cartaJogoElemento) {
    cartaJogoElemento.classList.add("anim-descarte-esquerda");
  }

  try {
    await avancarProximaCarta(codigoSala);
  } catch (erro) {
    console.error(erro);
    mensagemErroJogo.textContent = "Erro ao passar a carta. Tente novamente.";
    btnProximaCarta.disabled = false;
    btnProximaCarta.textContent = "⏭️ Próxima Rodada 🔥";
    if (cartaJogoElemento) {
      cartaJogoElemento.classList.remove("anim-descarte-esquerda");
    }
  }
});

// Jogar Novamente
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
    btnJogarNovamente.textContent = "🔄 Voltar ao Lobby";
  }
});
