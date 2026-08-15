// ============================================================
// LOBBY.JS — Mesa Quente (Minigames, Tutorial de Regras & Gameplay)
// ============================================================

// Pega o código da sala pela URL (?sala=ABCD)
const parametros = new URLSearchParams(window.location.search);
const codigoSala = (parametros.get("sala") || "").toUpperCase();

if (!codigoSala) {
  window.location.href = "index.html";
}

// Inicialização e remoção imediata da classe bloco-oculto do Lobby
function inicializarVisualLobby() {
  const elLobby = document.getElementById("painel-lobby") || document.getElementById("sala-de-espera");
  const elMesa = document.getElementById("painel-mesa-jogo") || document.getElementById("tela-gameplay");
  const elConfig = document.getElementById("painel-configuracao");
  const elFim = document.getElementById("painel-fim-partida");

  if (elLobby) {
    elLobby.classList.remove("bloco-oculto");
    elLobby.style.display = "flex";
  }

  if (elMesa) {
    elMesa.classList.add("bloco-oculto");
    elMesa.style.display = "none";
  }

  if (elConfig) {
    elConfig.classList.add("bloco-oculto");
    elConfig.style.display = "none";
  }

  if (elFim) {
    elFim.classList.add("bloco-oculto");
    elFim.style.display = "none";
  }

  const elAppLayout = document.querySelector(".app-layout") || document.querySelector(".gameplay-viewport-container");
  if (elAppLayout) {
    elAppLayout.classList.remove("bloco-oculto");
  }
}

// Execução imediata e no carregamento completo do DOM
inicializarVisualLobby();
document.addEventListener("DOMContentLoaded", inicializarVisualLobby);
window.addEventListener("load", inicializarVisualLobby);

// Elementos da UI — Painéis
const painelLobby = document.getElementById("painel-lobby") || document.getElementById("sala-de-espera");
const painelConfiguracao = document.getElementById("painel-configuracao");
const painelMesaJogo = document.getElementById("painel-mesa-jogo") || document.getElementById("tela-gameplay");
const painelFimPartida = document.getElementById("painel-fim-partida");
const corpoPaginaSala = document.getElementById("corpo-pagina-sala") || document.body;

// Elementos — Topo & Navegação
const btnSairSala = document.getElementById("btn-sair-sala");
const btnAudio = document.getElementById("btn-audio");
const btnFullscreen = document.getElementById("btn-fullscreen");
const iconeFullscreen = document.getElementById("icone-fullscreen");
const textoFullscreen = document.getElementById("texto-fullscreen");
const hudCodigoSalaTopo = document.getElementById("hud-codigo-sala-topo");
const btnAbrirConfigHud = document.getElementById("btn-abrir-config-hud");

// Elementos — Sala de Espera (Lobby Real Clássico)
const textoCodigoSala = document.getElementById("texto-codigo-sala");
const btnCopiarCodigo = document.getElementById("btn-copiar-codigo");
const bannerModoJogo = document.getElementById("banner-modo-jogo");
const modoJogoIcone = document.getElementById("modo-jogo-icone");
const modoJogoNome = document.getElementById("modo-jogo-nome");
const modoJogoDesc = document.getElementById("modo-jogo-desc");
const listaJogadoresLobby = document.getElementById("lista-jogadores-lobby");
const contadorJogadores = document.getElementById("contador-jogadores");
const avisoSozinhoSala = document.getElementById("aviso-sozinho-sala");
const btnVoltarInicioSozinho = document.getElementById("btn-voltar-inicio-sozinho");
const controlesHostLobby = document.getElementById("controles-host-lobby");
const visaoJogadorEspera = document.getElementById("visao-jogador-espera");
const btnAbrirConfig = document.getElementById("btn-abrir-config");
const btnIniciarPartida = document.getElementById("btn-iniciar-partida");
const mensagemErroLobby = document.getElementById("mensagem-erro-lobby");
const btnAbrirTrocarAvatar = document.getElementById("btn-abrir-trocar-avatar");

// Elementos — Configuração da Mesa
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

// Elementos — Modal de Troca de Avatar (26 opções)
const modalTrocarAvatar = document.getElementById("modal-trocar-avatar");
const gradeAvatares26Opcoes = document.getElementById("grade-avatares-26-opcoes");
const btnFecharModalAvatar = document.getElementById("btn-fechar-modal-avatar");
const btnConfirmarNovoAvatar = document.getElementById("btn-confirmar-novo-avatar");
let avatarModalTemp = null;

// Elementos — ETAPA 3: Transição Cartoon (Iris Wipe)
const transicaoIrisOverlay = document.getElementById("transicao-iris-overlay");
const irisCurtain = document.getElementById("iris-curtain");

// Elementos — ETAPA 4A: Overlay Tutorial Cartoon
const overlayTutorialMinigame = document.getElementById("overlay-tutorial-minigame");
const tutorialCartaImg = document.getElementById("tutorial-carta-img");
const tutorialCategoriaTag = document.getElementById("tutorial-categoria-tag");
const tutorialBoasVindas = document.getElementById("tutorial-boas-vindas");
const tutorialRegrasLista = document.getElementById("tutorial-regras-lista");
const btnOkEntendiTutorial = document.getElementById("btn-ok-entendi-tutorial");

// Elementos — ETAPA 4B: Overlay Sorteio Roleta
const overlaySorteioRoleta = document.getElementById("overlay-sorteio-roleta");
const sorteioFaseTag = document.getElementById("sorteio-fase-tag");
const sorteioTituloChamada = document.getElementById("sorteio-titulo-chamada");
const sorteioContadorArea = document.getElementById("sorteio-contador-area");
const sorteioNumeroDisplay = document.getElementById("sorteio-numero-display");
const sorteioRoletaArea = document.getElementById("sorteio-roleta-area");
const roletaAvatarDestaque = document.getElementById("roleta-avatar-destaque");
const roletaNomeDestaque = document.getElementById("roleta-nome-destaque");
const roletaStatusTexto = document.getElementById("roleta-status-texto");
const sorteioVencedorAnuncio = document.getElementById("sorteio-vencedor-anuncio");
const vencedorSorteadoEmoji = document.getElementById("vencedor-sorteado-emoji");
const vencedorSorteadoNome = document.getElementById("vencedor-sorteado-nome");

// Elementos — Overlays adicionais e Fallbacks
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

// Alternância de Telas integrada com Overlay sobre a Mesa
function mostrarApenasPainel(painelAtivo) {
  const elLobby = document.getElementById("painel-lobby") || painelLobby;
  const elConfig = document.getElementById("painel-configuracao") || painelConfiguracao;
  const elMesa = document.getElementById("painel-mesa-jogo") || painelMesaJogo;
  const elFim = document.getElementById("painel-fim-partida") || painelFimPartida;
  const boxLeitor = document.getElementById("box-leitor-rodada");

  if (painelAtivo === elConfig) {
    // Tela de Configurações do Host
    if (elLobby) { elLobby.classList.add("bloco-oculto"); elLobby.style.display = "none"; }
    if (elMesa) { elMesa.classList.add("bloco-oculto"); elMesa.style.display = "none"; }
    if (elFim) { elFim.classList.add("bloco-oculto"); elFim.style.display = "none"; }
    if (elConfig) { elConfig.classList.remove("bloco-oculto"); elConfig.style.display = "flex"; }
  } else if (painelAtivo === elFim) {
    // Fim de Partida
    if (elLobby) { elLobby.classList.add("bloco-oculto"); elLobby.style.display = "none"; }
    if (elConfig) { elConfig.classList.add("bloco-oculto"); elConfig.style.display = "none"; }
    if (elMesa) { elMesa.classList.add("bloco-oculto"); elMesa.style.display = "none"; }
    if (elFim) { elFim.classList.remove("bloco-oculto"); elFim.style.display = "flex"; }
  } else if (painelAtivo === elMesa) {
    // Gameplay Ativa (Mesa sem Overlay de Espera)
    if (elConfig) { elConfig.classList.add("bloco-oculto"); elConfig.style.display = "none"; }
    if (elFim) { elFim.classList.add("bloco-oculto"); elFim.style.display = "none"; }
    if (elLobby) { elLobby.classList.add("bloco-oculto"); elLobby.style.display = "none"; }
    if (elMesa) { elMesa.classList.remove("bloco-oculto"); elMesa.style.display = "block"; }
    if (boxLeitor) boxLeitor.classList.remove("bloco-oculto");
  } else {
    // Modo Padrão: Sala de Espera / Lobby (Overlay elegante sobre a Mesa 2.5D)
    if (elConfig) { elConfig.classList.add("bloco-oculto"); elConfig.style.display = "none"; }
    if (elFim) { elFim.classList.add("bloco-oculto"); elFim.style.display = "none"; }
    if (elMesa) { elMesa.classList.remove("bloco-oculto"); elMesa.style.display = "block"; }
    if (elLobby) { elLobby.classList.remove("bloco-oculto"); elLobby.style.display = "flex"; }
    if (boxLeitor) boxLeitor.classList.add("bloco-oculto");
  }
}

// Exibe a Sala de Espera / Lobby imediatamente ao carregar
mostrarApenasPainel(painelLobby);

// Sair da Sala / Retornar
async function executarSaidaSala() {
  if (typeof audioApp !== "undefined") audioApp.tocarClique();
  try {
    if (typeof sairDaSala === "function") {
      await sairDaSala(codigoSala);
    }
  } catch (err) {
    console.error("Erro ao sair da sala:", err);
  }
  window.location.href = "index.html";
}

if (btnSairSala) {
  btnSairSala.addEventListener("click", executarSaidaSala);
}
if (btnVoltarInicioSozinho) {
  btnVoltarInicioSozinho.addEventListener("click", executarSaidaSala);
}
if (btnSairPartidaFim) {
  btnSairPartidaFim.addEventListener("click", executarSaidaSala);
}

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

// Escuta das Informações da Sala e Minigames Selecionados (Suporte a múltiplos minigames / Mix)
if (typeof db !== "undefined" && codigoSala) {
  db.ref("salas/" + codigoSala).on("value", (snapshot) => {
    const dadosSala = snapshot.val();
    if (!dadosSala) return;

    const minigamesArray = dadosSala.minigames || (dadosSala.configLobby && dadosSala.configLobby.baralhosAtivos) || [];
    const modoMix = dadosSala.modoMix === true;
    const modoInfo = dadosSala.modoInfo || {};

    if (bannerModoJogo) {
      if (minigamesArray.length > 1) {
        const nomesFormatados = minigamesArray.map((mId) => {
          const mObj = MODOS_DE_JOGO[mId] || obterBaralhoPorId(mId);
          return mObj ? `${mObj.icone || "🎮"} ${mObj.nome}` : mId;
        });

        if (modoJogoIcone) modoJogoIcone.textContent = "🔀";
        if (modoJogoNome) modoJogoNome.textContent = modoMix ? `Mix Personalizado (${minigamesArray.length} Minigames)` : nomesFormatados.join(" • ");
        if (modoJogoDesc) modoJogoDesc.textContent = `Modos ativos: ${nomesFormatados.join(", ")}`;
      } else if (modoInfo && modoInfo.nome) {
        if (modoJogoIcone) modoJogoIcone.textContent = modoInfo.icone || "🔥";
        if (modoJogoNome) modoJogoNome.textContent = modoInfo.nome || "Modo Mesa Quente";
        if (modoJogoDesc) modoJogoDesc.textContent = modoInfo.descricao || "";
      }
    }
  });
}

// Escuta do ModoInfo específico
escutarModoInfo(codigoSala, (modoInfo) => {
  if (modoInfo && bannerModoJogo) {
    if (modoJogoIcone && !bannerModoJogo.dataset.custom) modoJogoIcone.textContent = modoInfo.icone || "🔥";
    if (modoJogoNome && !bannerModoJogo.dataset.custom) modoJogoNome.textContent = modoInfo.nome || "Modo Mesa Quente";
    if (modoJogoDesc && !bannerModoJogo.dataset.custom) modoJogoDesc.textContent = modoInfo.descricao || "";
    configLocal.modoJogo = modoInfo.id;
  }
});

function atualizarVisualHost() {
  if (souHost) {
    if (controlesHostLobby) {
      controlesHostLobby.classList.remove("bloco-oculto");
      controlesHostLobby.style.display = "flex";
    }
    if (visaoJogadorEspera) {
      visaoJogadorEspera.classList.add("bloco-oculto");
      visaoJogadorEspera.style.display = "none";
    }
    if (btnIniciarPartida) {
      btnIniciarPartida.style.display = "block";
    }
    if (btnAbrirConfig) {
      btnAbrirConfig.style.display = "block";
    }
    if (controlesHostJogo) {
      controlesHostJogo.classList.remove("bloco-oculto");
      controlesHostJogo.style.display = "flex";
    }
    if (avisoJogadorJogo) {
      avisoJogadorJogo.classList.add("bloco-oculto");
      avisoJogadorJogo.style.display = "none";
    }
    if (controlesHostFim) {
      controlesHostFim.classList.remove("bloco-oculto");
      controlesHostFim.style.display = "flex";
    }
    if (avisoJogadorFim) {
      avisoJogadorFim.classList.add("bloco-oculto");
      avisoJogadorFim.style.display = "none";
    }
  } else {
    if (controlesHostLobby) {
      controlesHostLobby.classList.add("bloco-oculto");
      controlesHostLobby.style.display = "none";
    }
    if (btnIniciarPartida) {
      btnIniciarPartida.style.display = "none";
    }
    if (btnAbrirConfig) {
      btnAbrirConfig.style.display = "none";
    }
    if (visaoJogadorEspera) {
      visaoJogadorEspera.classList.remove("bloco-oculto");
      visaoJogadorEspera.style.display = "flex";
      const textoEspera = document.getElementById("texto-aviso-espera");
      if (textoEspera) {
        textoEspera.textContent = "Aguardando o anfitrião...";
      }
    }
    if (controlesHostJogo) {
      controlesHostJogo.classList.add("bloco-oculto");
      controlesHostJogo.style.display = "none";
    }
    if (avisoJogadorJogo) {
      avisoJogadorJogo.classList.remove("bloco-oculto");
      avisoJogadorJogo.style.display = "block";
    }
    if (controlesHostFim) {
      controlesHostFim.classList.add("bloco-oculto");
      controlesHostFim.style.display = "none";
    }
    if (avisoJogadorFim) {
      avisoJogadorFim.classList.remove("bloco-oculto");
      avisoJogadorFim.style.display = "block";
    }
  }
}

// ============================================================
// MAPA DE CATEGORIAS E REGRAS PARA O TUTORIAL POP-UP
// ============================================================
const MAPA_CATEGORIAS_MINIGAMES = {
  // Categoria 1: Votação
  quem_e_mais_provavel: {
    cat: 1,
    nome: "Quem é Mais Provável?",
    categoriaNome: "CATEGORIA 1 • VOTAÇÃO",
    img: "cartas-votação.png",
    regras: [
      "Uma situação engraçada ou comprometedora será revelada na mesa.",
      "Todos na roda apontam secretamente para quem mais combina com a frase.",
      "O mais votado leva a zoeira e o título da rodada!"
    ]
  },
  eu_nunca_safico: {
    cat: 1,
    nome: "Eu Nunca: Vale Tudo",
    categoriaNome: "CATEGORIA 1 • VOTAÇÃO",
    img: "cartas-votação.png",
    regras: [
      "Uma confissão ou situação ousada é colocada na mesa.",
      "Quem 'Já Fez' clica em confessar (e toma um gole ou cumpre a prenda).",
      "Quem 'Nunca Fez' clica em Inocente para sair ileso!"
    ]
  },
  // Categoria 2: Confissões & Dilemas
  niveis_intimidade: {
    cat: 2,
    nome: "Níveis de Intimidade",
    categoriaNome: "CATEGORIA 2 • CONFISSÕES",
    img: "cartas-confissões.png",
    regras: [
      "Perguntas progressivas divididas em 3 níveis (Percepção, Conexão e +18).",
      "O jogador da vez lê a carta em voz alta para todos.",
      "Responda com sinceridade para esquentar o clima da roda!"
    ]
  },
  dilema_moral: {
    cat: 2,
    nome: "Dilemas & Situações Hipotéticas",
    categoriaNome: "CATEGORIA 2 • DILEMAS",
    img: "cartas-confissões.png",
    regras: [
      "Um dilema impossível com Opção A e Opção B é colocado na mesa.",
      "Cada participante vota no seu lado favorito.",
      "Ao revelar os votos, debatam as escolhas mais polêmicas!"
    ]
  },
  hora_da_fofoca: {
    cat: 2,
    nome: "Hora da Fofoca & Revelações",
    categoriaNome: "CATEGORIA 2 • CONFISSÕES",
    img: "cartas-confissões.png",
    regras: [
      "Perguntas provocativas para desenterrar segredos do passado.",
      "O jogador sorteado deve contar a história real sem enrolação!",
      "A mesa pode fazer perguntas adicionais para aprofundar a fofoca."
    ]
  },
  conflito_geracoes: {
    cat: 2,
    nome: "Conflito de Gerações",
    categoriaNome: "CATEGORIA 2 • CONFISSÕES",
    img: "cartas-confissões.png",
    regras: [
      "Debate bem-humorado entre costumes antigos vs cultura atual.",
      "Vote e exponha quem é o mais 'cringe' ou antiquado do grupo.",
      "Defenda seu ponto de vista com histórias reais!"
    ]
  },
  // Categoria 3: Surpresa & Blefe
  duas_verdades_uma_mentira: {
    cat: 3,
    nome: "Duas Verdades e Uma Mentira",
    categoriaNome: "CATEGORIA 3 • BLEFE & SURPRESA",
    img: "cartas-surpresa.png",
    regras: [
      "O leitor da vez conta 3 fatos sobre si (2 reais e 1 inventado).",
      "O resto da mesa vota em qual história é a mentira descarada.",
      "Se a maioria errar, o blefador vence a rodada!"
    ]
  },
  historia_coletiva: {
    cat: 3,
    nome: "História Coletiva Surreal",
    categoriaNome: "CATEGORIA 3 • SURPRESA & CRIATIVIDADE",
    img: "cartas-surpresa.png",
    regras: [
      "A carta dá a frase de abertura de uma história caótica.",
      "Cada jogador na roda adiciona uma frase para continuar o enredo.",
      "Quem travar ou perder o sentido paga uma consequência na mesa!"
    ]
  },
  // Categoria 4: Debate & Contra o Tempo
  polemicas_sem_fim: {
    cat: 4,
    nome: "Polêmicas Sem Fim",
    categoriaNome: "CATEGORIA 4 • CONTRA O TEMPO & DEBATE",
    img: "cartas-contra-o-tempo.png",
    regras: [
      "Um tema polêmico do cotidiano ou relacionamentos é lançado.",
      "Dois jogadores defendem lados opostos sob pressão de tempo.",
      "A mesa vota em quem teve a melhor oratória e argumento!"
    ]
  },
  batalha_de_argumentos: {
    cat: 4,
    nome: "Batalha de Argumentos",
    categoriaNome: "CATEGORIA 4 • DEBATE RELÂMPAGO",
    img: "cartas-contra-o-tempo.png",
    regras: [
      "Defenda uma tese absurda sob pressão de tempo.",
      "Convença a roda de que seu ponto de vista é o mais coerente.",
      "A mesa julga e consagra o melhor orador."
    ]
  },
  // Categoria 5: Sintonia & Picantes
  sintonia_de_casal: {
    cat: 5,
    nome: "Sintonia de Casal & Duplas",
    categoriaNome: "CATEGORIA 5 • SINTONIA & PICANTES",
    img: "cartas-picantes.png",
    regras: [
      "Uma pergunta de intimidade ou convivência é feita para a dupla.",
      "Os dois devem responder ao mesmo tempo no 3.. 2.. 1..",
      "Se as respostas baterem, a sintonia do casal é comprovada!"
    ]
  },
  red_flags: {
    cat: 5,
    nome: "Red Flags vs Green Flags",
    categoriaNome: "CATEGORIA 5 • PICANTES & JULGAMENTO",
    img: "cartas-picantes.png",
    regras: [
      "Um comportamento em relacionamentos é colocado em julgamento.",
      "A roda vota se considera isso um alerta vermelho ou super de boa.",
      "Debatam as experiências passadas que justificam seus votos!"
    ]
  },
  // Categoria 6: Desafio & Consequências
  roleta_consequencias: {
    cat: 6,
    nome: "Roleta de Consequências",
    categoriaNome: "CATEGORIA 6 • VERDADE OU DESAFIO",
    img: "cartas-desafios.png",
    regras: [
      "O jogador da vez escolhe entre responder uma 'Verdade' ou cumprir um 'Desafio'.",
      "Cumpra ao vivo com o grupo.",
      "Se arregar, a mesa escolhe um castigo coletivo!"
    ]
  },
  preencha_a_lacuna: {
    cat: 6,
    nome: "Preencha a Lacuna",
    categoriaNome: "CATEGORIA 6 • DESAFIOS",
    img: "cartas-desafios.png",
    regras: [
      "Uma carta preta com uma frase incompleta surge na mesa.",
      "Todos escolhem sua melhor carta de resposta para completar.",
      "O leitor escolhe a combinação mais engraçada ou absurda!"
    ]
  },
  tribunal_dos_amigos: {
    cat: 6,
    nome: "Tribunal dos Amigos",
    categoriaNome: "CATEGORIA 6 • JULGAMENTO & DESAFIOS",
    img: "cartas-desafios.png",
    regras: [
      "Um 'réu' é escolhido na roda por uma atitude questionável.",
      "O tribunal ouve a defesa e vota: 'Culpado' ou 'Inocente'.",
      "Se culpado, o réu cumpre a sentença decidida pelos amigos!"
    ]
  }
};

// ============================================================
// ETAPA 2: SALA DE ESPERA (LOBBY REAL CLÁSSICO)
// ============================================================
function renderizarLobbyReal(jogadores) {
  if (!listaJogadoresLobby) return;
  listaJogadoresLobby.innerHTML = "";

  const ids = Object.keys(jogadores || {}).sort((a, b) => {
    return (jogadores[a].entrouEm || 0) - (jogadores[b].entrouEm || 0);
  });

  const conectados = ids.filter((id) => jogadores[id] && jogadores[id].conectado !== false);

  if (contadorJogadores) {
    contadorJogadores.textContent = `${conectados.length} ${conectados.length === 1 ? "jogador" : "jogadores"}`;
  }

  if (avisoSozinhoSala) {
    if (conectados.length <= 1) {
      avisoSozinhoSala.classList.remove("bloco-oculto");
    } else {
      avisoSozinhoSala.classList.add("bloco-oculto");
    }
  }

  ids.forEach((id) => {
    const j = jogadores[id];
    if (!j || !j.nome) return;

    const isDesconectado = j.conectado === false;
    const isMe = id === idJogadorAtual;
    const isHost = id === idHostSala;
    const avatarData = obterAvatarJogador(j);

    const card = document.createElement("div");
    card.className = `card-jogador-espera ${isDesconectado ? "desconectado" : ""} ${isMe ? "is-me" : ""}`;

    const avatarBox = document.createElement("div");
    avatarBox.className = "avatar-espera-circulo";
    avatarBox.style.backgroundColor = avatarData.cor;
    avatarBox.style.borderColor = avatarData.corBorda;
    avatarBox.style.boxShadow = `0 4px 12px ${avatarData.cor}66`;
    avatarBox.textContent = avatarData.emoji;

    const infoBox = document.createElement("div");
    infoBox.className = "info-jogador-espera";

    const nome = document.createElement("span");
    nome.className = "nome-jogador-espera";
    nome.textContent = j.nome;

    const tagsBox = document.createElement("div");
    tagsBox.className = "tags-jogador-espera";

    if (isHost) {
      const tagH = document.createElement("span");
      tagH.className = "tag-espera-host";
      tagH.textContent = "👑 HOST";
      tagsBox.appendChild(tagH);
    }
    if (isMe) {
      const tagV = document.createElement("span");
      tagV.className = "tag-espera-voce";
      tagV.textContent = "VOCÊ";
      tagsBox.appendChild(tagV);
    }
    if (isDesconectado) {
      const tagS = document.createElement("span");
      tagS.className = "tag-espera-saiu";
      tagS.textContent = "SAIU";
      tagsBox.appendChild(tagS);
    }

    infoBox.appendChild(nome);
    infoBox.appendChild(tagsBox);

    card.appendChild(avatarBox);
    card.appendChild(infoBox);

    listaJogadoresLobby.appendChild(card);
  });
}

// ============================================================
// MODAL DE TROCA DE AVATAR (26 OPÇÕES PRÉ-DEFINIDAS)
// ============================================================
function renderizarModalAvatares() {
  if (!gradeAvatares26Opcoes) return;
  gradeAvatares26Opcoes.innerHTML = "";

  const meuJogador = dadosJogadoresCache[idJogadorAtual] || {};
  const avatarAtual = obterAvatarJogador(meuJogador);

  if (!avatarModalTemp) {
    avatarModalTemp = avatarAtual;
  }

  AVATARES_PREDEFINIDOS.forEach((av) => {
    const isSelecionado = avatarModalTemp && avatarModalTemp.emoji === av.emoji && avatarModalTemp.cor === av.cor;

    const item = document.createElement("div");
    item.className = `item-avatar-opcao ${isSelecionado ? "selecionado" : ""}`;
    item.style.backgroundColor = av.cor;
    item.style.borderColor = av.corBorda;
    item.innerHTML = `<span class="emoji-avatar-grande">${av.emoji}</span>`;

    item.addEventListener("click", () => {
      if (typeof audioApp !== "undefined") audioApp.tocarClique();
      avatarModalTemp = av;
      renderizarModalAvatares();
    });

    gradeAvatares26Opcoes.appendChild(item);
  });
}

if (btnAbrirTrocarAvatar && modalTrocarAvatar) {
  btnAbrirTrocarAvatar.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    const meuJogador = dadosJogadoresCache[idJogadorAtual] || {};
    avatarModalTemp = obterAvatarJogador(meuJogador);
    renderizarModalAvatares();
    modalTrocarAvatar.classList.remove("bloco-oculto");
  });
}

if (btnFecharModalAvatar && modalTrocarAvatar) {
  btnFecharModalAvatar.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    modalTrocarAvatar.classList.add("bloco-oculto");
  });
}

if (btnConfirmarNovoAvatar && modalTrocarAvatar) {
  btnConfirmarNovoAvatar.addEventListener("click", async () => {
    if (avatarModalTemp && typeof atualizarAvatarJogador === "function") {
      if (typeof audioApp !== "undefined") audioApp.tocarClique();
      btnConfirmarNovoAvatar.disabled = true;
      btnConfirmarNovoAvatar.textContent = "Salvando...";
      try {
        await atualizarAvatarJogador(codigoSala, avatarModalTemp);
      } catch (err) {
        console.error("Erro ao trocar avatar:", err);
      }
      btnConfirmarNovoAvatar.disabled = false;
      btnConfirmarNovoAvatar.textContent = "Salvar Escolha";
    }
    modalTrocarAvatar.classList.add("bloco-oculto");
  });
}

// Copiar código da sala
if (btnCopiarCodigo) {
  btnCopiarCodigo.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    navigator.clipboard.writeText(codigoSala).then(() => {
      const textoOrig = btnCopiarCodigo.textContent;
      btnCopiarCodigo.textContent = "✓ Copiado!";
      setTimeout(() => {
        btnCopiarCodigo.textContent = textoOrig;
      }, 2000);
    });
  });
}

// ============================================================
// ETAPA 3: TRANSIÇÃO CARTOON (IRIS WIPE)
// ============================================================
function executarTransicaoCartoonIrisWipe(aoCompletarFechamento, aoFinalizarTudo) {
  if (transicaoEmExecucao) return;
  transicaoEmExecucao = true;

  if (transicaoIrisOverlay) {
    transicaoIrisOverlay.classList.remove("bloco-oculto");
    transicaoIrisOverlay.classList.remove("iris-wipe-abrir");
    transicaoIrisOverlay.classList.add("iris-wipe-fechar");
  }

  if (typeof audioApp !== "undefined") {
    if (typeof audioApp.tocarTransiçãoCartoon === "function") {
      audioApp.tocarTransiçãoCartoon();
    } else {
      audioApp.tocarClique();
    }
  }

  // 600ms: Círculo fecha totalmente
  setTimeout(() => {
    if (typeof aoCompletarFechamento === "function") {
      aoCompletarFechamento();
    }

    if (transicaoIrisOverlay) {
      transicaoIrisOverlay.classList.remove("iris-wipe-fechar");
      transicaoIrisOverlay.classList.add("iris-wipe-abrir");
    }

    // 600ms depois: Círculo abre revelando a mesa de gameplay
    setTimeout(() => {
      if (transicaoIrisOverlay) {
        transicaoIrisOverlay.classList.remove("iris-wipe-abrir");
        transicaoIrisOverlay.classList.add("bloco-oculto");
      }
      transicaoEmExecucao = false;
      if (typeof aoFinalizarTudo === "function") {
        aoFinalizarTudo();
      }
    }, 600);
  }, 600);
}

// ============================================================
// ETAPA 4A: OVERLAY TUTORIAL CARTOON
// ============================================================
function exibirTutorialMinigame(minigameId) {
  const dados = MAPA_CATEGORIAS_MINIGAMES[minigameId] || MAPA_CATEGORIAS_MINIGAMES.niveis_intimidade;
  if (!overlayTutorialMinigame) return;

  if (tutorialCartaImg) tutorialCartaImg.src = dados.img;
  if (tutorialCategoriaTag) tutorialCategoriaTag.textContent = dados.categoriaNome;
  if (tutorialBoasVindas) tutorialBoasVindas.textContent = `Bem-vindos ao ${dados.nome}!`;

  if (tutorialRegrasLista) {
    tutorialRegrasLista.innerHTML = "";
    dados.regras.forEach((r, idx) => {
      const item = document.createElement("div");
      item.className = "tutorial-regra-passo-item";
      item.innerHTML = `
        <span class="regra-passo-num">${idx + 1}</span>
        <p class="regra-passo-texto">${r}</p>
      `;
      tutorialRegrasLista.appendChild(item);
    });
  }

  overlayTutorialMinigame.classList.remove("bloco-oculto");
}

if (btnOkEntendiTutorial) {
  btnOkEntendiTutorial.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    if (overlayTutorialMinigame) overlayTutorialMinigame.classList.add("bloco-oculto");
    dispararSorteioRoletaInicial(dadosJogadoresCache);
  });
}

// ============================================================
// ETAPA 4B: SORTEIO DE QUEM COMEÇA COM ROLETA ANIMADA
// ============================================================
function dispararSorteioRoletaInicial(jogadores) {
  if (!overlaySorteioRoleta) return;
  overlaySorteioRoleta.classList.remove("bloco-oculto");

  if (sorteioContadorArea) sorteioContadorArea.classList.remove("bloco-oculto");
  if (sorteioRoletaArea) sorteioRoletaArea.classList.add("bloco-oculto");
  if (sorteioVencedorAnuncio) sorteioVencedorAnuncio.classList.add("bloco-oculto");

  const listaJogadores = Object.entries(jogadores || {}).filter(
    ([, j]) => j && j.conectado !== false
  );

  if (listaJogadores.length === 0) {
    overlaySorteioRoleta.classList.add("bloco-oculto");
    return;
  }

  // FASE 1: Contagem Regressiva (5.. 1)
  let count = 5;
  function atualizarNumeroContagem(n) {
    if (sorteioNumeroDisplay) {
      sorteioNumeroDisplay.textContent = n;
      sorteioNumeroDisplay.classList.remove("zoom-pulsante");
      void sorteioNumeroDisplay.offsetWidth;
      sorteioNumeroDisplay.classList.add("zoom-pulsante");
    }
    if (typeof audioApp !== "undefined") audioApp.tocarContagem(n);
  }

  atualizarNumeroContagem(count);

  const intervaloContagem = setInterval(() => {
    count--;
    if (count > 0) {
      atualizarNumeroContagem(count);
    } else {
      clearInterval(intervaloContagem);
      iniciarAnimacaoRoleta(listaJogadores);
    }
  }, 1000);
}

function iniciarAnimacaoRoleta(listaJogadores) {
  if (sorteioContadorArea) sorteioContadorArea.classList.add("bloco-oculto");
  if (sorteioRoletaArea) sorteioRoletaArea.classList.remove("bloco-oculto");

  // Sorteia quem vai ser o primeiro leitor da mesa
  const indiceSorteado = Math.floor(Math.random() * listaJogadores.length);
  const [vencedorId, vencedorObj] = listaJogadores[indiceSorteado];
  const avatarVencedor = obterAvatarJogador(vencedorObj);

  let currentIndex = 0;
  let delay = 60;
  let totalPassos = listaJogadores.length * 3 + indiceSorteado;
  let passosFeitos = 0;

  function girar() {
    const [, jog] = listaJogadores[currentIndex % listaJogadores.length];
    const av = obterAvatarJogador(jog);

    if (roletaAvatarDestaque) {
      roletaAvatarDestaque.textContent = av.emoji;
      roletaAvatarDestaque.style.backgroundColor = av.cor;
      roletaAvatarDestaque.style.borderColor = av.corBorda;
    }
    if (roletaNomeDestaque) {
      roletaNomeDestaque.textContent = jog.nome || "Jogador";
    }

    if (typeof audioApp !== "undefined") audioApp.tocarClique();

    passosFeitos++;
    currentIndex++;

    if (passosFeitos >= totalPassos) {
      // Roleta parou no vencedor!
      finalizarRoletaVencedor(vencedorId, vencedorObj, avatarVencedor);
    } else {
      if (passosFeitos > totalPassos - 8) {
        delay += 60; // Desacelera nas últimas rodadas para suspense cartoon
      }
      setTimeout(girar, delay);
    }
  }

  girar();
}

function finalizarRoletaVencedor(vencedorId, vencedorObj, avatarVencedor) {
  if (sorteioRoletaArea) sorteioRoletaArea.classList.add("bloco-oculto");
  if (sorteioVencedorAnuncio) {
    if (vencedorSorteadoEmoji) vencedorSorteadoEmoji.textContent = avatarVencedor.emoji;
    if (vencedorSorteadoNome) vencedorSorteadoNome.textContent = vencedorObj.nome || "Jogador";
    sorteioVencedorAnuncio.classList.remove("bloco-oculto");
  }

  if (typeof audioApp !== "undefined") audioApp.tocarVitoria();

  if (souHost && typeof db !== "undefined") {
    // Seta o primeiro leitor no Firebase
    db.ref("salas/" + codigoSala + "/leitorAtualId").set(vencedorId);
  }

  setTimeout(() => {
    if (overlaySorteioRoleta) overlaySorteioRoleta.classList.add("bloco-oculto");
  }, 2600);
}

// Botão Iniciar Partida (Host) com Transição Iris Wipe
if (btnIniciarPartida) {
  btnIniciarPartida.addEventListener("click", async () => {
    if (!souHost) return;
    btnIniciarPartida.disabled = true;
    btnIniciarPartida.textContent = "Preparando a Mesa...";
    if (typeof audioApp !== "undefined") audioApp.tocarClique();

    try {
      if (typeof db !== "undefined") {
        await db.ref("salas/" + codigoSala + "/status").set("jogando");
      }
    } catch (e) {
      console.error("Erro ao iniciar:", e);
      btnIniciarPartida.disabled = false;
      btnIniciarPartida.textContent = "🔥 Iniciar Partida";
    }
  });
}

// ============================================================
// LOBBY DINÂMICO 2.5D (ASSENTOS DA MESA REDONDA)
// ============================================================
function renderizarLobbyMesa(jogadores) {
  renderizarLobbyReal(jogadores);
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

let gameplayIniciadaTransicao = false;

// 2. Status Geral da Sala
escutarStatusSala(codigoSala, (status) => {
  if (status === "lobby") {
    transicaoEmExecucao = false;
    gameplayIniciadaTransicao = false;
    if (overlayTutorialMinigame) overlayTutorialMinigame.classList.add("bloco-oculto");
    if (overlaySorteioRoleta) overlaySorteioRoleta.classList.add("bloco-oculto");
    if (corpoPaginaSala) corpoPaginaSala.classList.remove("tela-gameplay-v3");
    mostrarApenasPainel(painelLobby);
    if (btnIniciarPartida) {
      btnIniciarPartida.disabled = false;
      btnIniciarPartida.textContent = "🔥 Iniciar Partida";
    }
  } else if ((status === "jogando" || status === "transicao") && !gameplayIniciadaTransicao) {
    gameplayIniciadaTransicao = true;
    
    // Executa Transição Cartoon (Iris Wipe)
    executarTransicaoCartoonIrisWipe(
      () => {
        // Ao fechar o círculo:
        mostrarApenasPainel(painelMesaJogo);
        if (corpoPaginaSala) corpoPaginaSala.classList.add("tela-gameplay-v3");
        renderizarJogadoresRadial(dadosJogadoresCache, cartaAtualCache);
      },
      () => {
        // Ao abrir o círculo:
        const modoAtivo = configLocal.modoJogo || "niveis_intimidade";
        exibirTutorialMinigame(modoAtivo);
      }
    );
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
    // Sincroniza início no Firebase (inicia partida e atualiza status para 'jogando')
    await iniciarPartida(codigoSala, configLocal);
  } catch (erro) {
    console.error("Erro ao iniciar gameplay:", erro);
    if (mensagemErroLobby) mensagemErroLobby.textContent = "Erro ao iniciar partida. Tente novamente.";
    if (btnIniciarPartida) {
      btnIniciarPartida.disabled = false;
      btnIniciarPartida.textContent = "🔥 Iniciar Partida";
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
