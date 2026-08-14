// ============================================================
// APP.JS — lógica da tela inicial (index.html)
// ============================================================

const btnCriarSala = document.getElementById("btn-criar-sala");
const btnEntrarSala = document.getElementById("btn-entrar-sala");
const inputCodigoEntrar = document.getElementById("input-codigo-entrar");
const inputNomeEntrar = document.getElementById("input-nome-entrar");
const mensagemErro = document.getElementById("mensagem-erro");

function mostrarErro(texto) {
  mensagemErro.textContent = texto;
}

function limparErro() {
  mensagemErro.textContent = "";
}

function pedirNome() {
  const nome = prompt("Como podemos te chamar?");
  if (!nome || !nome.trim()) return null;
  return nome.trim().slice(0, 20);
}

btnCriarSala.addEventListener("click", async () => {
  limparErro();

  const nome = pedirNome();
  if (!nome) return;

  btnCriarSala.disabled = true;
  btnCriarSala.textContent = "Criando sala...";

  try {
    const codigo = await criarSala(nome);
    localStorage.setItem("mesaQuente_codigoSalaAtual", codigo);
    window.location.href = "lobby.html?sala=" + codigo;
  } catch (erro) {
    console.error(erro);
    mostrarErro("Não foi possível criar a sala. Tente novamente.");
    btnCriarSala.disabled = false;
    btnCriarSala.textContent = "Criar Sala";
  }
});

btnEntrarSala.addEventListener("click", async () => {
  limparErro();

  const codigo = inputCodigoEntrar.value.trim().toUpperCase();
  const nome = inputNomeEntrar.value.trim();

  if (!codigo) {
    mostrarErro("Digite o código da sala.");
    return;
  }
  if (!nome) {
    mostrarErro("Digite seu nome.");
    return;
  }

  btnEntrarSala.disabled = true;
  btnEntrarSala.textContent = "Entrando...";

  try {
    await entrarNaSala(codigo, nome);
    localStorage.setItem("mesaQuente_codigoSalaAtual", codigo);
    window.location.href = "lobby.html?sala=" + codigo;
  } catch (erro) {
    console.error(erro);
    mostrarErro(erro.message || "Não foi possível entrar na sala.");
    btnEntrarSala.disabled = false;
    btnEntrarSala.textContent = "Entrar em Sala";
  }
});

// Deixa o código sempre em maiúsculas enquanto digita
inputCodigoEntrar.addEventListener("input", () => {
  inputCodigoEntrar.value = inputCodigoEntrar.value.toUpperCase();
});
