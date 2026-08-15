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
let cadeadoDesbloqueado = false; // Modo Personalizado (Cadeado 🔒/🔓)
let minigamesSelecionados = ["quem_e_mais_provavel"];
let totalRodadasSelecionado = 20;

const painelBaralhosPersonalizados = document.getElementById("painel-baralhos-personalizados");
const listaCheckboxesBaralhosIndex = document.getElementById("lista-checkboxes-baralhos-index");
const seletorRodadasHost = document.getElementById("seletor-rodadas-host");
const campoRodadasCustom = document.getElementById("campo-rodadas-custom");
const inputRodadasCustom = document.getElementById("input-rodadas-custom");
const btnCadeadoPersonalizado = document.getElementById("btn-cadeado-modo-personalizado");
const iconeCadeado = document.getElementById("icone-cadeado");
const textoStatusCadeado = document.getElementById("texto-status-cadeado");
const badgeCadeadoDica = document.getElementById("badge-cadeado-dica");
const descCadeadoInfo = document.getElementById("desc-cadeado-info");
const subtextoInfoModo = document.getElementById("subtexto-info-modo");

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
 * Configura os cliques e seleção de Múltiplos Minigames e Modo Personalizado (Cadeado 🔒/🔓)
 */
function atualizarVisualMinigames() {
  const itens = document.querySelectorAll(".item-minigame-radio");
  const blocosCategorias = document.querySelectorAll(".categoria-bloco-jogos");

  // Identifica qual categoria tem minigame selecionado atualmente
  let categoriaAtiva = null;
  if (!cadeadoDesbloqueado && minigamesSelecionados.length > 0) {
    const primeiroModo = minigamesSelecionados[0];
    const itemPrimeiro = document.querySelector(`.item-minigame-radio[data-modo="${primeiroModo}"]`);
    if (itemPrimeiro) {
      categoriaAtiva = itemPrimeiro.getAttribute("data-cat");
    }
  }

  itens.forEach((item) => {
    const modoId = item.getAttribute("data-modo");
    const cat = item.getAttribute("data-cat");
    const input = item.querySelector(".minigame-checkbox-input");
    const isMarcado = minigamesSelecionados.includes(modoId);

    if (isMarcado) {
      item.classList.add("selecionado");
      if (input) input.checked = true;
    } else {
      item.classList.remove("selecionado");
      if (input) input.checked = false;
    }

    // Aplica bloqueio visual se o cadeado estiver trancado e pertencer a outra categoria
    if (!cadeadoDesbloqueado && categoriaAtiva && cat !== categoriaAtiva) {
      item.classList.add("item-categoria-bloqueada");
    } else {
      item.classList.remove("item-categoria-bloqueada");
    }
  });

  // Atualiza blocos de categoria
  blocosCategorias.forEach((bloco) => {
    const cat = bloco.getAttribute("data-cat");
    if (!cadeadoDesbloqueado && categoriaAtiva && cat !== categoriaAtiva) {
      bloco.classList.add("bloco-categoria-inativa");
    } else {
      bloco.classList.remove("bloco-categoria-inativa");
    }
  });

  // Atualiza o Botão do Cadeado
  if (btnCadeadoPersonalizado) {
    if (cadeadoDesbloqueado) {
      btnCadeadoPersonalizado.className = "btn-cadeado-personalizado desbloqueado";
      if (iconeCadeado) iconeCadeado.textContent = "🔓";
      if (textoStatusCadeado) {
        textoStatusCadeado.textContent = "DESBLOQUEADO";
        textoStatusCadeado.className = "cadeado-status-tag status-aberto";
      }
      if (badgeCadeadoDica) {
        badgeCadeadoDica.textContent = "Mix Livre Ativo";
        badgeCadeadoDica.className = "badge-cadeado-dica dica-aberta";
      }
      if (descCadeadoInfo) {
        descCadeadoInfo.innerHTML = "Liberdade total! Você pode marcar <strong>quantos minigames quiser</strong> de qualquer categoria.";
      }
    } else {
      btnCadeadoPersonalizado.className = "btn-cadeado-personalizado bloqueado";
      if (iconeCadeado) iconeCadeado.textContent = "🔒";
      if (textoStatusCadeado) {
        textoStatusCadeado.textContent = "BLOQUEADO";
        textoStatusCadeado.className = "cadeado-status-tag status-trancado";
      }
      if (badgeCadeadoDica) {
        badgeCadeadoDica.textContent = "Categoria Única";
        badgeCadeadoDica.className = "badge-cadeado-dica";
      }
      if (descCadeadoInfo) {
        descCadeadoInfo.innerHTML = "Clique para <strong>desbloquear</strong> e ter liberdade total para misturar minigames de qualquer categoria!";
      }
    }
  }

  if (subtextoInfoModo) {
    if (cadeadoDesbloqueado) {
      subtextoInfoModo.textContent = `🔓 Modo Personalizado: ${minigamesSelecionados.length} minigame(s) misturados livremente`;
    } else {
      subtextoInfoModo.textContent = `🔒 Categoria Fixa: ${minigamesSelecionados.length} minigame(s) da mesma categoria selecionado(s)`;
    }
  }
}

function tratarCliqueMinigame(modoId, cat) {
  if (typeof audioApp !== "undefined") audioApp.tocarClique();

  if (!cadeadoDesbloqueado) {
    // Regra Padrão (Cadeado Bloqueado): Exclusividade de Categoria
    const primeiroModo = minigamesSelecionados[0];
    const itemPrimeiro = document.querySelector(`.item-minigame-radio[data-modo="${primeiroModo}"]`);
    const catAtual = itemPrimeiro ? itemPrimeiro.getAttribute("data-cat") : null;

    if (catAtual && catAtual !== cat) {
      // Clicou em outra categoria enquanto bloqueado: desmarca a anterior e seleciona o novo
      minigamesSelecionados = [modoId];
    } else {
      // Mesma categoria: permite marcar/desmarcar múltiplos
      if (minigamesSelecionados.includes(modoId)) {
        if (minigamesSelecionados.length > 1) {
          minigamesSelecionados = minigamesSelecionados.filter((id) => id !== modoId);
        }
      } else {
        minigamesSelecionados.push(modoId);
      }
    }
  } else {
    // Modo Personalizado (Cadeado Desbloqueado): Livre seleção entre quaisquer categorias
    if (minigamesSelecionados.includes(modoId)) {
      if (minigamesSelecionados.length > 1) {
        minigamesSelecionados = minigamesSelecionados.filter((id) => id !== modoId);
      }
    } else {
      minigamesSelecionados.push(modoId);
    }
  }

  atualizarVisualMinigames();
}

function alternarCadeadoPersonalizado() {
  if (typeof audioApp !== "undefined") audioApp.tocarClique();
  cadeadoDesbloqueado = !cadeadoDesbloqueado;

  // Se bloqueou o cadeado e havia minigames de categorias misturadas, mantém apenas os da 1ª categoria
  if (!cadeadoDesbloqueado && minigamesSelecionados.length > 0) {
    const primeiroModo = minigamesSelecionados[0];
    const itemPrimeiro = document.querySelector(`.item-minigame-radio[data-modo="${primeiroModo}"]`);
    const catPrimeiro = itemPrimeiro ? itemPrimeiro.getAttribute("data-cat") : null;

    if (catPrimeiro) {
      minigamesSelecionados = minigamesSelecionados.filter((id) => {
        const el = document.querySelector(`.item-minigame-radio[data-modo="${id}"]`);
        return el && el.getAttribute("data-cat") === catPrimeiro;
      });
    }
  }

  if (minigamesSelecionados.length === 0) {
    minigamesSelecionados = ["quem_e_mais_provavel"];
  }

  atualizarVisualMinigames();
}

function inicializarSeletorModos() {
  const itens = document.querySelectorAll(".item-minigame-radio");

  itens.forEach((item) => {
    const input = item.querySelector(".minigame-checkbox-input");
    const modoId = item.getAttribute("data-modo");
    const cat = item.getAttribute("data-cat");

    item.addEventListener("click", (e) => {
      if (e.target.tagName && e.target.tagName.toLowerCase() === "input") return;
      e.preventDefault();
      tratarCliqueMinigame(modoId, cat);
    });

    if (input) {
      input.addEventListener("change", (e) => {
        e.stopPropagation();
        tratarCliqueMinigame(modoId, cat);
      });
    }
  });

  if (btnCadeadoPersonalizado) {
    btnCadeadoPersonalizado.addEventListener("click", alternarCadeadoPersonalizado);
  }

  atualizarVisualMinigames();
}

function alternarModo(modo) {
  limparErro();
  blocoAcoesIniciais.classList.add("bloco-oculto");
  formCriarSala.classList.add("bloco-oculto");
  formEntrarSala.classList.add("bloco-oculto");

  if (modo === "criar") {
    formCriarSala.classList.remove("bloco-oculto");
    inicializarGalerias();
    inicializarSeletorModos();
    inicializarSeletorRodadas();
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

    const configExtra = {
      minigames: minigamesSelecionados,
      modoMix: cadeadoDesbloqueado,
      baralhosAtivos: baralhosConsolidados,
      totalCartas: totalRodadasSelecionado || 20
    };

    const codigo = await criarSala(nome, avatarHostSelecionado, minigamesSelecionados, configExtra);
    localStorage.setItem("mesaQuente_codigoSalaAtual", codigo);

    // 1. Esconde o modal de criação
    if (formCriarSala) {
      formCriarSala.style.display = "none";
      formCriarSala.classList.add("bloco-oculto");
    }

    // 2. Remove qualquer tela ou overlay de loading
    const loadings = document.querySelectorAll(".overlay-loading, .spinner-loading, #overlay-loading");
    loadings.forEach((el) => {
      el.style.display = "none";
      el.classList.add("bloco-oculto");
    });

    // 3. Mostra a Sala de Espera / Redireciona para o Lobby da Sala
    const elSalaEspera = document.getElementById("sala-de-espera") || document.getElementById("painel-lobby");
    if (elSalaEspera) {
      elSalaEspera.style.display = "flex";
      elSalaEspera.classList.remove("bloco-oculto");
      
      const elCodigo = document.getElementById("texto-codigo-sala") || document.getElementById("codigo-sala");
      if (elCodigo) elCodigo.textContent = codigo;
    }

    // Redireciona para a página do lobby caso não seja uma SPA de tela única
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
