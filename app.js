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

const btnConfirmarEntrar = document.getElementById("btn-confirmar-entrar");
const btnCancelarEntrar = document.getElementById("btn-cancelar-entrar");
const inputCodigoEntrar = document.getElementById("input-codigo-entrar");
const inputNomeEntrar = document.getElementById("input-nome-entrar");

const mensagemErro = document.getElementById("mensagem-erro");
const btnAudio = document.getElementById("btn-audio");

function mostrarErro(texto) {
  mensagemErro.textContent = texto;
}

function limparErro() {
  mensagemErro.textContent = "";
}

function alternarModo(modo) {
  limparErro();
  blocoAcoesIniciais.classList.add("bloco-oculto");
  formCriarSala.classList.add("bloco-oculto");
  formEntrarSala.classList.add("bloco-oculto");

  if (modo === "criar") {
    formCriarSala.classList.remove("bloco-oculto");
    inputNomeHost.focus();
  } else if (modo === "entrar") {
    formEntrarSala.classList.remove("bloco-oculto");
    inputCodigoEntrar.focus();
  } else {
    blocoAcoesIniciais.classList.remove("bloco-oculto");
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

// Alternância entre telas do formulário
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

  btnConfirmarCriar.disabled = true;
  btnConfirmarCriar.textContent = "Criando sala...";
  if (typeof audioApp !== "undefined") audioApp.tocarClique();

  try {
    const codigo = await criarSala(nome);
    localStorage.setItem("mesaQuente_codigoSalaAtual", codigo);
    window.location.href = "lobby.html?sala=" + encodeURIComponent(codigo);
  } catch (erro) {
    console.error(erro);
    mostrarErro("Não foi possível criar a sala no momento. Tente novamente.");
    btnConfirmarCriar.disabled = false;
    btnConfirmarCriar.textContent = "Criar Sala Agora 🔥";
  }
});

// Ação de Entrar na Sala
btnConfirmarEntrar.addEventListener("click", async () => {
  limparErro();
  const codigo = inputCodigoEntrar.value.trim().toUpperCase();
  const nome = inputNomeEntrar.value.trim();

  if (!codigo) {
    mostrarErro("Digite o código da sala de 4 letras.");
    inputCodigoEntrar.focus();
    return;
  }
  if (!nome) {
    mostrarErro("Digite seu nome ou apelido.");
    inputNomeEntrar.focus();
    return;
  }

  btnConfirmarEntrar.disabled = true;
  btnConfirmarEntrar.textContent = "Entrando na sala...";
  if (typeof audioApp !== "undefined") audioApp.tocarClique();

  try {
    await entrarNaSala(codigo, nome);
    localStorage.setItem("mesaQuente_codigoSalaAtual", codigo);
    window.location.href = "lobby.html?sala=" + encodeURIComponent(codigo);
  } catch (erro) {
    console.error(erro);
    mostrarErro(erro.message || "Não foi possível entrar na sala.");
    btnConfirmarEntrar.disabled = false;
    btnConfirmarEntrar.textContent = "Entrar na Sala 🚪";
  }
});

// Força maiúsculas no input de código
inputCodigoEntrar.addEventListener("input", () => {
  inputCodigoEntrar.value = inputCodigoEntrar.value.toUpperCase();
});

// Suporte a pressionar Enter nos inputs
inputNomeHost.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btnConfirmarCriar.click();
});
inputNomeEntrar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btnConfirmarEntrar.click();
});
inputCodigoEntrar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") inputNomeEntrar.focus();
});
