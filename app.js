// ============================================================
// APP.JS — Lógica da tela inicial (index.html)
// ============================================================

const blocoAcoesIniciais = document.getElementById("bloco-acoes-iniciais");
const formCriarSala = document.getElementById("form-criar-sala");
const formEntrarSala = document.getElementById("form-entrar-sala");

const btnAbrirCriar = document.getElementById("btn-abrir-criar");
const btnAbrirEntrar = document.getElementById("btn-abrir-entrar");

const btnConfirmarCriar = document.getElementById("btn-confirmar-criar");
const btnCancelarCriar = document.getElementById("btn-cancelar-criar");
const inputNomeHost = document.getElementById("input-nome-host");
const galeriaAvataresHost = document.getElementById("galeria-avatares-host");
const seletorModosJogo = document.getElementById("seletor-modos-jogo");

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

// Estado local de seleção
let avatarHostSelecionado = AVATARES_PREDEFINIDOS[0];
let avatarEntrarSelecionado = AVATARES_PREDEFINIDOS[0];
let modoJogoSelecionado = "niveis_intimidade";
let baralhosPersonalizadosAtivos = ["niveis_intimidade", "roleta_consequencias", "eu_nunca_safico", "quem_e_mais_provavel", "preencha_a_lacuna"];
let totalRodadasSelecionado = 20;

const painelBaralhosPersonalizados = document.getElementById("painel-baralhos-personalizados");
const listaCheckboxesBaralhosIndex = document.getElementById("lista-checkboxes-baralhos-index");
const seletorRodadasHost = document.getElementById("seletor-rodadas-host");
const campoRodadasCustom = document.getElementById("campo-rodadas-custom");
const inputRodadasCustom = document.getElementById("input-rodadas-custom");

// Recupera avatar salvo anteriormente se existir
const avatarSalvoId = localStorage.getItem("mesaQuente_avatarId");
if (avatarSalvoId) {
  const achado = AVATARES_PREDEFINIDOS.find((a) => a.id === avatarSalvoId);
  if (achado) {
    avatarHostSelecionado = achado;
    avatarEntrarSelecionado = achado;
  }
}

// Recupera nome salvo anteriormente se existir
const nomeSalvo = localStorage.getItem("mesaQuente_nomeJogador");
if (nomeSalvo) {
  if (inputNomeHost) inputNomeHost.value = nomeSalvo;
  if (inputNomeEntrar) inputNomeEntrar.value = nomeSalvo;
}

function mostrarErro(texto) {
  mensagemErro.textContent = texto;
}

function limparErro() {
  mensagemErro.textContent = "";
}

/**
 * Renderiza os checkboxes dos baralhos disponíveis para o modo personalizado
 */
function renderizarBaralhosPersonalizados() {
  if (!listaCheckboxesBaralhosIndex) return;
  listaCheckboxesBaralhosIndex.innerHTML = "";

  if (typeof BARALHOS_DISPONIVEIS === "undefined") return;

  BARALHOS_DISPONIVEIS.forEach((baralho) => {
    const isChecked = baralhosPersonalizadosAtivos.includes(baralho.id);
    const item = document.createElement("label");
    item.className = `item-checkbox-baralho ${isChecked ? "marcado" : ""}`;

    item.innerHTML = `
      <input type="checkbox" value="${baralho.id}" ${isChecked ? "checked" : ""} class="checkbox-baralho-input" />
      <span class="baralho-item-icone">${baralho.icone || "🃏"}</span>
      <div class="baralho-item-info">
        <strong class="baralho-item-nome">${baralho.nome}</strong>
        <span class="baralho-item-desc">${baralho.descricao}</span>
      </div>
      <span class="baralho-item-check-badge">✓</span>
    `;

    const input = item.querySelector("input");
    input.addEventListener("change", () => {
      if (typeof audioApp !== "undefined") audioApp.tocarClique();
      if (input.checked) {
        if (!baralhosPersonalizadosAtivos.includes(baralho.id)) {
          baralhosPersonalizadosAtivos.push(baralho.id);
        }
        item.classList.add("marcado");
      } else {
        baralhosPersonalizadosAtivos = baralhosPersonalizadosAtivos.filter((id) => id !== baralho.id);
        item.classList.remove("marcado");
      }
    });

    listaCheckboxesBaralhosIndex.appendChild(item);
  });
}

/**
 * Configura o seletor visual de quantidade de rodadas/cartas
 */
function inicializarSeletorRodadas() {
  if (!seletorRodadasHost) return;
  const botoes = seletorRodadasHost.querySelectorAll(".btn-opcao-rodada");

  botoes.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (typeof audioApp !== "undefined") audioApp.tocarClique();
      botoes.forEach((b) => b.classList.remove("selecionado"));
      btn.classList.add("selecionado");

      const valor = btn.getAttribute("data-rodadas");
      if (valor === "custom") {
        if (campoRodadasCustom) campoRodadasCustom.classList.remove("bloco-oculto");
        totalRodadasSelecionado = Number(inputRodadasCustom.value) || 25;
        if (inputRodadasCustom) inputRodadasCustom.focus();
      } else {
        if (campoRodadasCustom) campoRodadasCustom.classList.add("bloco-oculto");
        totalRodadasSelecionado = Number(valor) || 20;
      }
    });
  });

  if (inputRodadasCustom) {
    inputRodadasCustom.addEventListener("input", () => {
      let num = parseInt(inputRodadasCustom.value, 10);
      if (isNaN(num) || num < 5) num = 5;
      if (num > 100) num = 100;
      totalRodadasSelecionado = num;
    });
  }
}

/**
 * Renderiza a Galeria de 10 Avatares com cores vibrantes e feedback de seleção.
 */
function renderizarGaleriaAvatares(container, avatarAtivo, onSelect) {
  if (!container) return;
  container.innerHTML = "";

  AVATARES_PREDEFINIDOS.forEach((avatar) => {
    const isSelected = avatar.id === avatarAtivo.id;
    const btnAvatar = document.createElement("button");
    btnAvatar.type = "button";
    btnAvatar.className = `btn-avatar-opcao ${isSelected ? "avatar-selecionado" : ""}`;
    btnAvatar.title = avatar.nome;
    btnAvatar.setAttribute("data-avatar-id", avatar.id);

    // Div circular com cor de fundo vibrante e emoji centralizado
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

function inicializarGalerias() {
  renderizarGaleriaAvatares(galeriaAvataresHost, avatarHostSelecionado, (avatar) => {
    avatarHostSelecionado = avatar;
  });

  renderizarGaleriaAvatares(galeriaAvataresEntrar, avatarEntrarSelecionado, (avatar) => {
    avatarEntrarSelecionado = avatar;
  });
}

/**
 * Configura os cliques de todos os cards de Minigames & Modos de Jogo
 */
function inicializarSeletorModos() {
  const cards = document.querySelectorAll(".card-modo-opcao");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (typeof audioApp !== "undefined") audioApp.tocarClique();
      cards.forEach((c) => c.classList.remove("selecionado"));
      card.classList.add("selecionado");
      modoJogoSelecionado = card.getAttribute("data-modo") || "niveis_intimidade";

      if (modoJogoSelecionado === "personalizado") {
        if (painelBaralhosPersonalizados) {
          painelBaralhosPersonalizados.classList.remove("bloco-oculto");
          renderizarBaralhosPersonalizados();
        }
      } else {
        if (painelBaralhosPersonalizados) {
          painelBaralhosPersonalizados.classList.add("bloco-oculto");
        }
      }
    });
  });
}

function alternarModo(modo) {
  limparErro();
  blocoAcoesIniciais.classList.add("bloco-oculto");
  formCriarSala.classList.add("bloco-oculto");
  formEntrarSala.classList.add("bloco-oculto");

  if (modo === "criar") {
    formCriarSala.classList.remove("bloco-oculto");
    inicializarGalerias();
    inicializarSeletorRodadas();
    renderizarBaralhosPersonalizados();
    inputNomeHost.focus();
  } else if (modo === "entrar") {
    formEntrarSala.classList.remove("bloco-oculto");
    inicializarGalerias();
    inputCodigoEntrar.focus();
  } else {
    blocoAcoesIniciais.classList.remove("bloco-oculto");
  }
}

// Inicializações imediatas
inicializarGalerias();
inicializarSeletorModos();
inicializarSeletorRodadas();

if (btnAudio) {
  btnAudio.addEventListener("click", () => {
    if (typeof audioApp !== "undefined") {
      audioApp.alternarMudo();
    }
  });
}

btnAbrirCriar.addEventListener("click", () => {
  if (typeof audioApp !== "undefined") audioApp.tocarClique();
  alternarModo("criar");
});

btnAbrirEntrar.addEventListener("click", () => {
  if (typeof audioApp !== "undefined") audioApp.tocarClique();
  alternarModo("entrar");
});

btnCancelarCriar.addEventListener("click", () => {
  if (typeof audioApp !== "undefined") audioApp.tocarClique();
  alternarModo("inicio");
});

btnCancelarEntrar.addEventListener("click", () => {
  if (typeof audioApp !== "undefined") audioApp.tocarClique();
  alternarModo("inicio");
});

// Ação de Criar Sala
btnConfirmarCriar.addEventListener("click", async () => {
  limparErro();
  const nome = inputNomeHost.value.trim();

  if (!nome) {
    mostrarErro("Digite seu nome ou apelido para criar a sala.");
    inputNomeHost.focus();
    return;
  }

  if (!avatarHostSelecionado) {
    mostrarErro("Por favor, selecione um avatar para sentar à mesa.");
    return;
  }

  if (modoJogoSelecionado === "personalizado" && baralhosPersonalizadosAtivos.length === 0) {
    mostrarErro("Selecione ao menos 1 minigame no modo Personalizado.");
    return;
  }

  localStorage.setItem("mesaQuente_nomeJogador", nome);
  localStorage.setItem("mesaQuente_avatarId", avatarHostSelecionado.id);

  btnConfirmarCriar.disabled = true;
  btnConfirmarCriar.textContent = "Criando sala...";
  if (typeof audioApp !== "undefined") audioApp.tocarClique();

  try {
    const configExtra = {
      baralhosAtivos: modoJogoSelecionado === "personalizado"
        ? baralhosPersonalizadosAtivos
        : (MODOS_DE_JOGO[modoJogoSelecionado]?.baralhos || ["niveis_intimidade"]),
      totalCartas: totalRodadasSelecionado || 20
    };

    const codigo = await criarSala(nome, avatarHostSelecionado, modoJogoSelecionado, configExtra);
    localStorage.setItem("mesaQuente_codigoSalaAtual", codigo);
    window.location.href = "lobby.html?sala=" + encodeURIComponent(codigo);
  } catch (erro) {
    console.error(erro);
    mostrarErro("Não foi possível criar a sala no momento. Tente novamente.");
    btnConfirmarCriar.disabled = false;
    btnConfirmarCriar.textContent = "🔥 Criar Sala e Sentar à Mesa";
  }
});

// Ação de Entrar na Sala
btnConfirmarEntrar.addEventListener("click", async () => {
  limparErro();
  const codigo = inputCodigoEntrar.value.trim().toUpperCase();
  const nome = inputNomeEntrar.value.trim();

  if (!codigo || codigo.length < 4) {
    mostrarErro("Digite o código correto da sala de 4 letras.");
    inputCodigoEntrar.focus();
    return;
  }
  if (!nome) {
    mostrarErro("Digite seu nome ou apelido.");
    inputNomeEntrar.focus();
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

inputCodigoEntrar.addEventListener("input", () => {
  inputCodigoEntrar.value = inputCodigoEntrar.value.toUpperCase();
});

inputNomeHost.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btnConfirmarCriar.click();
});
inputNomeEntrar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btnConfirmarEntrar.click();
});
inputCodigoEntrar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") inputNomeEntrar.focus();
});
