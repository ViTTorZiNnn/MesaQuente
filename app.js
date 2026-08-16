// ============================================================
// APP.JS — Lógica da tela inicial (index.html)
// Refatoração Completa: Seleção de Minigames, Categoria 7 & Rodadas
// ============================================================

// Elementos Principais do DOM
const blocoAcoesIniciais = document.getElementById("bloco-acoes-iniciais");
const formCriarSala = document.getElementById("form-criar-sala");
const formEntrarSala = document.getElementById("form-entrar-sala");

const btnAbrirCriar = document.getElementById("btn-abrir-criar");
const btnAbrirEntrar = document.getElementById("btn-abrir-entrar");

const btnConfirmarCriar = document.getElementById("btn-confirmar-criar");
const btnCancelarCriar = document.getElementById("btn-cancelar-criar");
const inputNomeHost = document.getElementById("input-nome-host");
const galeriaAvataresHost = document.getElementById("galeria-avatares-host");

const btnConfirmarEntrar = document.getElementById("btn-confirmar-entrar");
const btnCancelarEntrar = document.getElementById("btn-cancelar-entrar");
const inputCodigoEntrar = document.getElementById("input-codigo-entrar");
const inputNomeEntrar = document.getElementById("input-nome-entrar");
const galeriaAvataresEntrar = document.getElementById("galeria-avatares-entrar");

const mensagemErro = document.getElementById("mensagem-erro");
const btnAudio = document.getElementById("btn-audio");
const btnFullscreen = document.getElementById("btn-fullscreen");
const iconeFullscreen = document.getElementById("icone-fullscreen");
const textoFullscreen = document.getElementById("texto-fullscreen");

// Seletores de Rodadas
const seletorRodadasHost = document.getElementById("seletor-rodadas-host");
const campoRodadasCustom = document.getElementById("campo-rodadas-custom");
const inputRodadasCustom = document.getElementById("input-rodadas-custom");

// Elementos da Categoria 7 e do Modal de Modo Livre
const catBloco7 = document.getElementById("cat-bloco-7");
const btnAbrirModoLivreCat7 = document.getElementById("btn-abrir-modo-livre-cat7");
const badgeCat7Status = document.getElementById("badge-cat7-status");
const modalModoLivreOverlay = document.getElementById("modal-modo-livre-overlay");
const modalLivreListaMinigames = document.getElementById("modal-livre-lista-minigames");
const btnFecharModalLivreX = document.getElementById("btn-fechar-modal-livre-x");
const btnModalConfirmarMistura = document.getElementById("btn-modal-confirmar-mistura");
const btnModalCancelarMistura = document.getElementById("btn-modal-cancelar-mistura");
const btnModalSelecionarTodos = document.getElementById("btn-modal-selecionar-todos");
const btnModalDesmarcarTodos = document.getElementById("btn-modal-desmarcar-todos");
const contadorModalLivre = document.getElementById("contador-modal-livre");

// Botão de Cadeado e Banner do Modo Livre (Compatibilidade Visual)
const btnCadeadoPersonalizado = document.getElementById("btn-cadeado-modo-personalizado");
const iconeCadeado = document.getElementById("icone-cadeado");
const textoStatusCadeado = document.getElementById("texto-status-cadeado");
const badgeCadeadoDica = document.getElementById("badge-cadeado-dica");
const descCadeadoInfo = document.getElementById("desc-cadeado-info");
const subtextoInfoModo = document.getElementById("subtexto-info-modo");
const btnAbrirModoLivreBanner = document.getElementById("btn-abrir-modo-livre");
const badgeModoLivreBanner = document.getElementById("badge-modo-livre-status") || document.getElementById("badge-status-banner-livre");
const descModoLivreBanner = document.getElementById("desc-modo-livre-banner") || document.getElementById("desc-banner-livre");

// ============================================================
// ESTRUTURA DE DADOS: CATÁLOGO DOS 13 MINIGAMES & 6 CATEGORIAS
// ============================================================
const MINIGAMES_CATALOGO = [
  // --- 01. VOTAÇÃO ---
  {
    id: "quem_e_mais_provavel",
    nome: "Quem é Mais Provável?",
    categoria: "1",
    categoriaNome: "Votação",
    categoriaEmoji: "🗳️",
    descricao: "Julgamento em grupo apontando as amigas na roda.",
    icone: "🎯"
  },
  {
    id: "eu_nunca",
    nome: "Eu Nunca",
    categoria: "1",
    categoriaNome: "Votação",
    categoriaEmoji: "🗳️",
    descricao: "Confissões na roda: quem já fez toma um gole.",
    icone: "🍷"
  },

  // --- 02. DILEMAS ---
  {
    id: "o_que_voce_prefere",
    nome: "O Que Você Prefere?",
    categoria: "2",
    categoriaNome: "Dilemas",
    categoriaEmoji: "🤔",
    descricao: "Escolhas difíceis e situações sem saída.",
    icone: "🤔"
  },
  {
    id: "preencha_a_lacuna",
    nome: "Preencha a Lacuna",
    categoria: "2",
    categoriaNome: "Dilemas",
    categoriaEmoji: "🤔",
    descricao: "Cards Against Humanity com cartas ácidas e +18.",
    icone: "🃏"
  },

  // --- 03. BLEFE ---
  {
    id: "duas_verdades_uma_mentira",
    nome: "Duas Verdades e Uma Mentira",
    categoria: "3",
    categoriaNome: "Blefe",
    categoriaEmoji: "🎭",
    descricao: "Conte 3 fatos e a mesa tenta adivinhar o blefe.",
    icone: "🎭"
  },
  {
    id: "o_espiao",
    nome: "O Espião",
    categoria: "3",
    categoriaNome: "Blefe",
    categoriaEmoji: "🎭",
    descricao: "Descubra quem não sabe a palavra secreta da mesa.",
    icone: "🕵️"
  },

  // --- 04. DEBATE ---
  {
    id: "bandeiras_vermelhas",
    nome: "Bandeiras Vermelhas",
    categoria: "4",
    categoriaNome: "Debate",
    categoriaEmoji: "🚩",
    descricao: "Defenda o pretendente perfeito com um defeito bizarro.",
    icone: "🚩"
  },
  {
    id: "batalha_de_argumentos",
    nome: "Batalha de Argumentos",
    categoria: "4",
    categoriaNome: "Debate",
    categoriaEmoji: "🚩",
    descricao: "Defenda opiniões absurdas com unhas e dentes.",
    icone: "⚔️"
  },

  // --- 05. SINTONIA ---
  {
    id: "o_termometro",
    nome: "O Termômetro",
    categoria: "5",
    categoriaNome: "Sintonia",
    categoriaEmoji: "🌡️",
    descricao: "Adivinhe a intensidade da resposta de 1 a 10.",
    icone: "🌡️"
  },
  {
    id: "apenas_uma_dica",
    nome: "Apenas Uma Dica",
    categoria: "5",
    categoriaNome: "Sintonia",
    categoriaEmoji: "🌡️",
    descricao: "Dicas de uma palavra para adivinhar o segredo.",
    icone: "💡"
  },

  // --- 06. DESAFIO ---
  {
    id: "palavra_proibida",
    nome: "Palavra Proibida",
    categoria: "6",
    categoriaNome: "Desafio",
    categoriaEmoji: "⚡",
    descricao: "Faça a mesa falar a palavra sem dizer as proibidas.",
    icone: "🚫"
  },
  {
    id: "niveis_intimidade",
    nome: "Níveis de Intimidade",
    categoria: "6",
    categoriaNome: "Desafio",
    categoriaEmoji: "⚡",
    descricao: "3 níveis (Percepção, Conexão e +18 Íntimo).",
    icone: "💜"
  },
  {
    id: "verdade_ou_desafio_hot",
    nome: "Verdade ou Desafio Hot",
    categoria: "6",
    categoriaNome: "Desafio",
    categoriaEmoji: "⚡",
    descricao: "Provas audaciosas e confissões sem filtro.",
    icone: "🔥"
  }
];

const TODOS_OS_13_MINIGAMES = MINIGAMES_CATALOGO.map((m) => m.id);

// ============================================================
// ESTADO CENTRAL DA TELA DE CRIAÇÃO
// ============================================================
let avatarHostSelecionado = (typeof AVATARES_PREDEFINIDOS !== "undefined" && AVATARES_PREDEFINIDOS[0]) || {
  id: "fox",
  emoji: "🦊",
  nome: "Raposa",
  cor: "#ff5400",
  corBorda: "#ff9e00"
};
let avatarEntrarSelecionado = avatarHostSelecionado;

// Estado de Minigames e Rodadas (Início Limpo: Nenhum minigame pré-selecionado)
let minigamesSelecionados = [];
let modoLivreAtivo = false;
let numeroRodadas = 10;

// Estado transitório do Modal
let minigamesTemporariosModal = [...minigamesSelecionados];

// Recupera dados salvos em sessões anteriores
const avatarSalvoId = localStorage.getItem("mesaQuente_avatarId");
if (avatarSalvoId && typeof AVATARES_PREDEFINIDOS !== "undefined") {
  const achado = AVATARES_PREDEFINIDOS.find((a) => a.id === avatarSalvoId);
  if (achado) {
    avatarHostSelecionado = achado;
    avatarEntrarSelecionado = achado;
  }
}

const nomeSalvo = localStorage.getItem("mesaQuente_nomeJogador");
if (nomeSalvo) {
  if (inputNomeHost) inputNomeHost.value = nomeSalvo;
  if (inputNomeEntrar) inputNomeEntrar.value = nomeSalvo;
}

// ============================================================
// FUNÇÕES AUXILIARES DE FEEDBACK
// ============================================================
function mostrarErro(texto) {
  if (mensagemErro) mensagemErro.textContent = texto;
}

function limparErro() {
  if (mensagemErro) mensagemErro.textContent = "";
}

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

// ============================================================
// GALERIA DE AVATARES
// ============================================================
function renderizarGaleriaAvatares(container, avatarAtivo, onSelect) {
  if (!container || typeof AVATARES_PREDEFINIDOS === "undefined") return;
  container.innerHTML = "";

  AVATARES_PREDEFINIDOS.forEach((avatar) => {
    const isSelected = avatar.id === avatarAtivo.id;
    const btnAvatar = document.createElement("button");
    btnAvatar.type = "button";
    btnAvatar.className = `btn-avatar-opcao ${isSelected ? "avatar-selecionado" : ""}`;
    btnAvatar.title = avatar.nome;
    btnAvatar.setAttribute("data-avatar-id", avatar.id);

    const circulo = document.createElement("div");
    circulo.className = "avatar-circulo-vibrante";
    circulo.style.backgroundColor = avatar.cor;
    circulo.style.borderColor = avatar.corBorda;
    circulo.style.boxShadow = isSelected
      ? `0 0 16px ${avatar.cor}, inset 0 2px 4px rgba(255,255,255,0.4)`
      : `0 4px 10px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.25)`;

    const emojiSpan = document.createElement("span");
    emojiSpan.className = "avatar-emoji-grande";
    emojiSpan.textContent = avatar.emoji;

    circulo.appendChild(emojiSpan);
    btnAvatar.appendChild(circulo);

    btnAvatar.addEventListener("click", () => {
      if (typeof audioApp !== "undefined") audioApp.tocarClique();
      onSelect(avatar);
      const todos = container.querySelectorAll(".btn-avatar-opcao");
      todos.forEach((el) => el.classList.remove("avatar-selecionado"));
      btnAvatar.classList.add("avatar-selecionado");
      localStorage.setItem("mesaQuente_avatarId", avatar.id);
    });

    container.appendChild(btnAvatar);
  });
}

let galeriasInicializadas = false;
function inicializarGalerias() {
  if (!galeriasInicializadas) {
    galeriasInicializadas = true;
    renderizarGaleriaAvatares(galeriaAvataresHost, avatarHostSelecionado, (avatar) => {
      avatarHostSelecionado = avatar;
    });

    renderizarGaleriaAvatares(galeriaAvataresEntrar, avatarEntrarSelecionado, (avatar) => {
      avatarEntrarSelecionado = avatar;
    });
  }
}

// ============================================================
// SELEÇÃO DE RODADAS (5, 10, 25 e Personalizado)
// ============================================================
let seletorRodadasInicializado = false;
function inicializarSeletorRodadas() {
  if (!seletorRodadasHost || seletorRodadasInicializado) return;
  seletorRodadasInicializado = true;
  const botoes = seletorRodadasHost.querySelectorAll(".btn-opcao-rodada");

  botoes.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (typeof audioApp !== "undefined") audioApp.tocarClique();
      botoes.forEach((b) => b.classList.remove("selecionado"));
      btn.classList.add("selecionado");

      const valor = btn.getAttribute("data-rodadas");
      if (valor === "custom") {
        if (campoRodadasCustom) campoRodadasCustom.classList.remove("bloco-oculto");
        let customVal = parseInt(inputRodadasCustom ? inputRodadasCustom.value : "15", 10);
        if (isNaN(customVal) || customVal < 1) customVal = 10;
        numeroRodadas = customVal;
        if (inputRodadasCustom) inputRodadasCustom.focus();
      } else {
        if (campoRodadasCustom) campoRodadasCustom.classList.add("bloco-oculto");
        numeroRodadas = parseInt(valor, 10) || 10;
      }
    });
  });

  if (inputRodadasCustom) {
    inputRodadasCustom.addEventListener("input", () => {
      let num = parseInt(inputRodadasCustom.value, 10);
      if (!isNaN(num) && num >= 1) {
        numeroRodadas = Math.min(num, 100);
      }
    });
  }
}

// ============================================================
// LÓGICA DE MINIGAMES & SELEÇÃO FLUIDA (AUTO-LIMPEZA NA TROCA)
// ============================================================
function obterCategoriaDoMinigame(modoId) {
  const item = MINIGAMES_CATALOGO.find((m) => m.id === modoId);
  return item ? item.categoria : "1";
}

/**
 * Validação executada toda vez que um input das Categorias 1 a 6 sofre uma alteração (change / click).
 * 
 * - Passo A (Verificar Origem): Identifica de qual Categoria o minigame clicado é.
 * - Passo B (Regra do Reset Externo): Se houver QUALQUER outro minigame selecionado de uma categoria DIFERENTE,
 *   o script desmarca absolutamente todos os minigames do tabuleiro inteiro.
 * - Passo C (Gravar o Novo): Imediatamente após o reset, o input recém-clicado é marcado.
 * - Passo D (Regra de Múltipla Escolha Interna): Se o usuário clicar em um minigame da MESMA categoria ativa,
 *   não reseta nada; permite marcar ou desmarcar a caixinha normalmente, possibilitando 2 ou mais jogos.
 */
function processarSelecaoMinigame(modoId, catClicada, estaMarcado) {
  if (typeof audioApp !== "undefined") audioApp.tocarClique();

  // Se o Modo Livre estava ativo e o usuário clicou nas categorias convencionais,
  // desativa o Modo Livre e inicia seleção padrão nesta categoria.
  if (modoLivreAtivo) {
    modoLivreAtivo = false;
    minigamesSelecionados = estaMarcado ? [modoId] : [];
    atualizarVisualMinigames();
    return;
  }

  // Passo A: Identificar categoria do minigame e a categoria já ativa no tabuleiro
  const catAtual = minigamesSelecionados.length > 0 ? obterCategoriaDoMinigame(minigamesSelecionados[0]) : null;

  // Passo B: Se houver minigames de categoria DIFERENTE selecionados
  if (catAtual && catAtual !== catClicada) {
    // Reset Externo: limpa todo o tabuleiro
    minigamesSelecionados = [];
    // Passo C: Grava o novo minigame marcado
    if (estaMarcado) {
      minigamesSelecionados = [modoId];
    }
  } else {
    // Passo D: Mesma categoria ativa (ou tabuleiro limpo) -> Múltipla escolha interna
    if (estaMarcado) {
      if (!minigamesSelecionados.includes(modoId)) {
        minigamesSelecionados.push(modoId);
      }
    } else {
      minigamesSelecionados = minigamesSelecionados.filter((id) => id !== modoId);
    }
  }

  // Sincroniza visualmente o DOM
  atualizarVisualMinigames();
}

/**
 * Atualiza o DOM dos cards de minigames das categorias 1 a 6 e o card da Categoria 7.
 * Sem bloqueios visuais severos ou pointer-events travados nas outras categorias.
 */
function atualizarVisualMinigames() {
  const itens = document.querySelectorAll(".item-minigame-radio");
  const blocosCategorias = document.querySelectorAll(".categoria-bloco-jogos");

  // Atualiza cada minigame das categorias 1 a 6
  itens.forEach((item) => {
    const modoId = item.getAttribute("data-modo");
    if (!modoId) return;

    const input = item.querySelector(".minigame-checkbox-input");
    const isMarcado = minigamesSelecionados.includes(modoId);

    if (isMarcado) {
      item.classList.add("selecionado");
      if (input) input.checked = true;
    } else {
      item.classList.remove("selecionado");
      if (input) input.checked = false;
    }

    // Garante 100% de fluidez e reatividade sem classes de trava
    item.classList.remove("item-categoria-bloqueada", "inativo");
    item.removeAttribute("disabled");
  });

  // Remove travas severas dos blocos de categoria (sempre clicáveis)
  blocosCategorias.forEach((bloco) => {
    bloco.classList.remove("bloco-categoria-inativa");
  });

  // Atualiza Card da Categoria 7 (Modo Livre)
  if (catBloco7) {
    if (modoLivreAtivo) {
      catBloco7.classList.add("categoria-livre-ativa");
    } else {
      catBloco7.classList.remove("categoria-livre-ativa");
    }
  }

  if (badgeCat7Status) {
    if (modoLivreAtivo) {
      badgeCat7Status.textContent = `✓ Ativo (${minigamesSelecionados.length} jogos)`;
    } else {
      badgeCat7Status.textContent = "Configurar ➔";
    }
  }

  // Atualiza o Botão do Cadeado (se presente)
  if (btnCadeadoPersonalizado) {
    if (modoLivreAtivo) {
      btnCadeadoPersonalizado.className = "btn-cadeado-personalizado desbloqueado";
      if (iconeCadeado) iconeCadeado.textContent = "🔓";
      if (textoStatusCadeado) {
        textoStatusCadeado.textContent = "ATIVADO";
        textoStatusCadeado.className = "cadeado-status-tag status-aberto";
      }
      if (badgeCadeadoDica) {
        badgeCadeadoDica.textContent = "Modo Livre Ativo";
        badgeCadeadoDica.className = "badge-cadeado-dica dica-aberta";
      }
      if (descCadeadoInfo) {
        descCadeadoInfo.innerHTML = `✨ <strong>Modo Livre Ativo:</strong> ${minigamesSelecionados.length} minigames misturados sem trava de categoria!`;
      }
    } else {
      btnCadeadoPersonalizado.className = "btn-cadeado-personalizado bloqueado";
      if (iconeCadeado) iconeCadeado.textContent = "🔒";
      if (textoStatusCadeado) {
        textoStatusCadeado.textContent = "DESATIVADO";
        textoStatusCadeado.className = "cadeado-status-tag status-trancado";
      }
      if (badgeCadeadoDica) {
        badgeCadeadoDica.textContent = "Categoria Única";
        badgeCadeadoDica.className = "badge-cadeado-dica";
      }
      if (descCadeadoInfo) {
        descCadeadoInfo.innerHTML = "Clique na <strong>Categoria 7 (Modo Livre)</strong> para misturar minigames de categorias diferentes ao mesmo tempo!";
      }
    }
  }

  if (subtextoInfoModo) {
    if (modoLivreAtivo) {
      subtextoInfoModo.textContent = `✨ Modo Livre: ${minigamesSelecionados.length} minigame(s) misturado(s)`;
    } else if (minigamesSelecionados.length > 0) {
      const catNum = obterCategoriaDoMinigame(minigamesSelecionados[0]);
      subtextoInfoModo.textContent = `📁 Categoria ${catNum}: ${minigamesSelecionados.length} minigame(s) selecionado(s)`;
    } else {
      subtextoInfoModo.textContent = "Selecione minigames da mesma categoria ou ative o Modo Livre";
    }
  }
}

// ============================================================
// MODAL DA CATEGORIA 7 (MODO LIVRE - LIBERDADE TOTAL)
// ============================================================

/**
 * Renderiza dinamicamente a lista completa dos 13 minigames dentro do Modal.
 */
function renderizarMinigamesNoModal() {
  if (!modalLivreListaMinigames) return;
  modalLivreListaMinigames.innerHTML = "";

  MINIGAMES_CATALOGO.forEach((jogo) => {
    const isMarcado = minigamesTemporariosModal.includes(jogo.id);

    const card = document.createElement("label");
    card.className = `item-minigame-livre-card ${isMarcado ? "selecionado" : ""}`;
    card.setAttribute("data-modo", jogo.id);
    card.setAttribute("for", `modal-check-${jogo.id}`);

    card.innerHTML = `
      <input type="checkbox" id="modal-check-${jogo.id}" value="${jogo.id}" class="checkbox-livre-input" ${isMarcado ? "checked" : ""} />
      <span class="checkbox-livre-quadrado" aria-hidden="true">${isMarcado ? "✓" : ""}</span>
      <div class="info-minigame-livre">
        <div class="topo-minigame-livre">
          <strong class="titulo-minigame-livre">${jogo.nome}</strong>
          <span class="tag-cat-livre tag-cat-${jogo.categoriaNome.toLowerCase()}">${jogo.categoriaEmoji} Cat. ${jogo.categoria} • ${jogo.categoriaNome}</span>
        </div>
        <p class="desc-minigame-livre">${jogo.descricao}</p>
      </div>
    `;

    const input = card.querySelector(".checkbox-livre-input");
    const quadrado = card.querySelector(".checkbox-livre-quadrado");

    card.addEventListener("click", (e) => {
      if (e.target.tagName && e.target.tagName.toLowerCase() === "input") return;
      e.preventDefault();
      alternarMinigameNoModal(jogo.id);
    });

    if (input) {
      input.addEventListener("change", (e) => {
        e.stopPropagation();
        alternarMinigameNoModal(jogo.id);
      });
    }

    modalLivreListaMinigames.appendChild(card);
  });

  atualizarContadorModal();
}

function alternarMinigameNoModal(modoId) {
  if (typeof audioApp !== "undefined") audioApp.tocarClique();

  if (minigamesTemporariosModal.includes(modoId)) {
    if (minigamesTemporariosModal.length > 1) {
      minigamesTemporariosModal = minigamesTemporariosModal.filter((id) => id !== modoId);
    }
  } else {
    minigamesTemporariosModal.push(modoId);
  }

  // Atualiza visual do item no modal
  const card = modalLivreListaMinigames.querySelector(`.item-minigame-livre-card[data-modo="${modoId}"]`);
  if (card) {
    const isMarcado = minigamesTemporariosModal.includes(modoId);
    const input = card.querySelector(".checkbox-livre-input");
    const quadrado = card.querySelector(".checkbox-livre-quadrado");

    if (isMarcado) {
      card.classList.add("selecionado");
      if (input) input.checked = true;
      if (quadrado) quadrado.textContent = "✓";
    } else {
      card.classList.remove("selecionado");
      if (input) input.checked = false;
      if (quadrado) quadrado.textContent = "";
    }
  }

  atualizarContadorModal();
}

function atualizarContadorModal() {
  if (contadorModalLivre) {
    contadorModalLivre.textContent = `${minigamesTemporariosModal.length} de 13 selecionados`;
  }
}

function abrirModalModoLivre() {
  if (typeof audioApp !== "undefined") audioApp.tocarClique();
  minigamesTemporariosModal = [...minigamesSelecionados];

  renderizarMinigamesNoModal();

  if (modalModoLivreOverlay) {
    modalModoLivreOverlay.style.display = "flex";
    modalModoLivreOverlay.classList.remove("bloco-oculto");
  }
}

function fecharModalModoLivre() {
  if (typeof audioApp !== "undefined") audioApp.tocarClique();
  if (modalModoLivreOverlay) {
    modalModoLivreOverlay.style.display = "none";
    modalModoLivreOverlay.classList.add("bloco-oculto");
  }
}

function confirmarMisturaModal() {
  if (typeof audioApp !== "undefined") audioApp.tocarClique();
  if (minigamesTemporariosModal.length === 0) {
    minigamesTemporariosModal = ["quem_e_mais_provavel"];
  }

  minigamesSelecionados = [...minigamesTemporariosModal];
  modoLivreAtivo = true;

  fecharModalModoLivre();
  atualizarVisualMinigames();
}

function selecionarTodosModal() {
  if (typeof audioApp !== "undefined") audioApp.tocarClique();
  minigamesTemporariosModal = [...TODOS_OS_13_MINIGAMES];
  renderizarMinigamesNoModal();
}

function limparModal() {
  if (typeof audioApp !== "undefined") audioApp.tocarClique();
  minigamesTemporariosModal = ["quem_e_mais_provavel"];
  renderizarMinigamesNoModal();
}

// ============================================================
// INICIALIZAÇÃO DE EVENTOS
// ============================================================
let eventosMinigamesInicializados = false;

function inicializarEventosMinigames() {
  if (eventosMinigamesInicializados) {
    atualizarVisualMinigames();
    return;
  }
  eventosMinigamesInicializados = true;

  // Escuta nativa e sem bloqueio nos checkboxes das categorias 1 a 6
  const inputs = document.querySelectorAll(".minigame-checkbox-input");
  inputs.forEach((input) => {
    input.removeAttribute("disabled");
    input.addEventListener("change", () => {
      const modoId = input.value;
      const cat = input.closest(".item-minigame-radio")?.getAttribute("data-cat") || obterCategoriaDoMinigame(modoId);
      processarSelecaoMinigame(modoId, cat, input.checked);
    });
  });

  // Gatilhos para abrir o Modal da Categoria 7 (Modo Livre)
  if (btnAbrirModoLivreCat7) {
    btnAbrirModoLivreCat7.addEventListener("click", abrirModalModoLivre);
  }
  if (catBloco7) {
    catBloco7.addEventListener("click", (e) => {
      if (e.target.closest("#btn-abrir-modo-livre-cat7")) return;
      abrirModalModoLivre();
    });
  }
  if (btnCadeadoPersonalizado) {
    btnCadeadoPersonalizado.addEventListener("click", abrirModalModoLivre);
  }
  if (btnAbrirModoLivreBanner) {
    btnAbrirModoLivreBanner.addEventListener("click", abrirModalModoLivre);
  }

  // Controles do Modal da Categoria 7
  if (btnFecharModalLivreX) {
    btnFecharModalLivreX.addEventListener("click", fecharModalModoLivre);
  }
  if (btnModalCancelarMistura) {
    btnModalCancelarMistura.addEventListener("click", fecharModalModoLivre);
  }
  if (btnModalConfirmarMistura) {
    btnModalConfirmarMistura.addEventListener("click", confirmarMisturaModal);
  }
  if (btnModalSelecionarTodos) {
    btnModalSelecionarTodos.addEventListener("click", selecionarTodosModal);
  }
  if (btnModalDesmarcarTodos) {
    btnModalDesmarcarTodos.addEventListener("click", limparModal);
  }

  // Fecha modal ao clicar fora do diálogo
  if (modalModoLivreOverlay) {
    modalModoLivreOverlay.addEventListener("click", (e) => {
      if (e.target === modalModoLivreOverlay) {
        fecharModalModoLivre();
      }
    });
  }

  atualizarVisualMinigames();
}

function alternarModo(modo) {
  limparErro();
  if (blocoAcoesIniciais) blocoAcoesIniciais.classList.add("bloco-oculto");
  if (formCriarSala) formCriarSala.classList.add("bloco-oculto");
  if (formEntrarSala) formEntrarSala.classList.add("bloco-oculto");

  if (modo === "criar") {
    if (formCriarSala) formCriarSala.classList.remove("bloco-oculto");
    inicializarGalerias();
    inicializarEventosMinigames();
    inicializarSeletorRodadas();
    if (inputNomeHost) inputNomeHost.focus();
  } else if (modo === "entrar") {
    if (formEntrarSala) formEntrarSala.classList.remove("bloco-oculto");
    inicializarGalerias();
    if (inputCodigoEntrar) inputCodigoEntrar.focus();
  } else {
    if (blocoAcoesIniciais) blocoAcoesIniciais.classList.remove("bloco-oculto");
  }
}

// Inicializações na Carga
inicializarGalerias();
inicializarEventosMinigames();
inicializarSeletorRodadas();

if (btnAudio) {
  btnAudio.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.alternarMudo();
  });
}

if (btnAbrirCriar) {
  btnAbrirCriar.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    alternarModo("criar");
  });
}

if (btnAbrirEntrar) {
  btnAbrirEntrar.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    alternarModo("entrar");
  });
}

if (btnCancelarCriar) {
  btnCancelarCriar.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    alternarModo("inicio");
  });
}

if (btnCancelarEntrar) {
  btnCancelarEntrar.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") audioApp.tocarClique();
    alternarModo("inicio");
  });
}

// ============================================================
// AÇÃO PRINCIPAL: CRIAR PARTIDA COM PAYLOAD COMPILADO
// ============================================================
if (btnConfirmarCriar) {
  btnConfirmarCriar.addEventListener("click", async () => {
    limparErro();
    const nome = inputNomeHost ? inputNomeHost.value.trim() : "";

    if (!nome) {
      mostrarErro("Digite seu nome ou apelido para criar a sala.");
      if (inputNomeHost) inputNomeHost.focus();
      return;
    }

    if (!avatarHostSelecionado) {
      mostrarErro("Por favor, selecione um avatar para sentar à mesa.");
      return;
    }

    if (!minigamesSelecionados || minigamesSelecionados.length === 0) {
      mostrarErro("Selecione ao menos 1 minigame para jogar.");
      return;
    }

    localStorage.setItem("mesaQuente_nomeJogador", nome);
    localStorage.setItem("mesaQuente_avatarId", avatarHostSelecionado.id);

    btnConfirmarCriar.disabled = true;
    btnConfirmarCriar.textContent = "Criando sala...";
    if (typeof audioApp !== "undefined") audioApp.tocarClique();

    try {
      // Consolida todos os baralhos necessários dos minigames selecionados
      let baralhosConsolidados = [];
      minigamesSelecionados.forEach((id) => {
        const modo = typeof MODOS_DE_JOGO !== "undefined" ? MODOS_DE_JOGO[id] : null;
        if (modo && Array.isArray(modo.baralhos)) {
          modo.baralhos.forEach((b) => {
            if (!baralhosConsolidados.includes(b)) baralhosConsolidados.push(b);
          });
        }
      });

      if (baralhosConsolidados.length === 0) {
        baralhosConsolidados = ["quebra_gelo", "niveis_intimidade"];
      }

      // Payload Final de Configuração
      const configExtra = {
        jogosSelecionados: [...minigamesSelecionados],
        minigames: [...minigamesSelecionados],
        numeroRodadas: numeroRodadas || 10,
        totalCartas: numeroRodadas || 10,
        modoLivre: modoLivreAtivo,
        modoMix: modoLivreAtivo,
        baralhosAtivos: baralhosConsolidados
      };

      const codigo = await criarSala(nome, avatarHostSelecionado, minigamesSelecionados, configExtra);
      localStorage.setItem("mesaQuente_codigoSalaAtual", codigo);

      // 1. Esconde o modal de criação
      if (formCriarSala) {
        formCriarSala.style.display = "none";
        formCriarSala.classList.add("bloco-oculto");
      }

      // 2. Remove qualquer overlay de loading
      const loadings = document.querySelectorAll(".overlay-loading, .spinner-loading, #overlay-loading");
      loadings.forEach((el) => {
        el.style.display = "none";
        el.classList.add("bloco-oculto");
      });

      // 3. Redireciona para o Lobby da Sala
      window.location.href = "lobby.html?sala=" + encodeURIComponent(codigo);
    } catch (erro) {
      console.error(erro);
      mostrarErro("Não foi possível criar a sala no momento. Tente novamente.");
      btnConfirmarCriar.disabled = false;
      btnConfirmarCriar.textContent = "🔥 Criar Sala e Sentar à Mesa";
    }
  });
}

// ============================================================
// AÇÃO: ENTRAR EM UMA SALA
// ============================================================
if (btnConfirmarEntrar) {
  btnConfirmarEntrar.addEventListener("click", async () => {
    limparErro();
    const codigo = inputCodigoEntrar ? inputCodigoEntrar.value.trim().toUpperCase() : "";
    const nome = inputNomeEntrar ? inputNomeEntrar.value.trim() : "";

    if (!codigo || codigo.length < 4) {
      mostrarErro("Digite o código correto da sala de 4 letras.");
      if (inputCodigoEntrar) inputCodigoEntrar.focus();
      return;
    }
    if (!nome) {
      mostrarErro("Digite seu nome ou apelido.");
      if (inputNomeEntrar) inputNomeEntrar.focus();
      return;
    }
    if (!avatarEntrarSelecionado) {
      mostrarErro("Por favor, selecione um avatar para sentar à mesa.");
      return;
    }

    localStorage.setItem("mesaQuente_nomeJogador", nome);
    localStorage.setItem("mesaQuente_avatarId", avatarEntrarSelecionado.id);

    btnConfirmarEntrar.disabled = true;
    btnConfirmarEntrar.textContent = "Entrando na sala...";
    if (typeof audioApp !== "undefined") audioApp.tocarClique();

    try {
      await entrarNaSala(codigo, nome, avatarEntrarSelecionado);
      localStorage.setItem("mesaQuente_codigoSalaAtual", codigo);
      window.location.href = "lobby.html?sala=" + encodeURIComponent(codigo);
    } catch (erro) {
      console.error(erro);
      mostrarErro(erro.message || "Não foi possível entrar na sala.");
      btnConfirmarEntrar.disabled = false;
      btnConfirmarEntrar.textContent = "🚪 Puxar Cadeira e Entrar";
    }
  });
}

if (inputCodigoEntrar) {
  inputCodigoEntrar.addEventListener("input", () => {
    inputCodigoEntrar.value = inputCodigoEntrar.value.toUpperCase();
  });
}

if (inputNomeHost) {
  inputNomeHost.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnConfirmarCriar.click();
  });
}

if (inputNomeEntrar) {
  inputNomeEntrar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnConfirmarEntrar.click();
  });
}

if (inputCodigoEntrar) {
  inputCodigoEntrar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") inputNomeEntrar.focus();
  });
}
