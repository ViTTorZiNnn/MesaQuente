// ============================================================
// LOBBY.JS — lógica da tela de lobby (lobby.html)
// ============================================================

const textoCodigoSala = document.getElementById("texto-codigo-sala");
const btnCopiarCodigo = document.getElementById("btn-copiar-codigo");
const listaJogadores = document.getElementById("lista-jogadores");
const btnIniciarPartida = document.getElementById("btn-iniciar-partida");
const textoAvisoEspera = document.getElementById("texto-aviso-espera");
const mensagemErroLobby = document.getElementById("mensagem-erro-lobby");

// Pega o código da sala pela URL (?sala=AB3X)
const parametros = new URLSearchParams(window.location.search);
const codigoSala = (parametros.get("sala") || "").toUpperCase();

if (!codigoSala) {
  window.location.href = "index.html";
}

textoCodigoSala.textContent = codigoSala;

const idJogadorAtual = obterIdJogador();
let souHost = false;

// Descobre se este jogador é o host da sala
obterHostId(codigoSala).then((hostId) => {
  souHost = hostId === idJogadorAtual;
  if (souHost) {
    btnIniciarPartida.style.display = "block";
    textoAvisoEspera.style.display = "none";
  }
}).catch((erro) => {
  console.error(erro);
  mensagemErroLobby.textContent = "Não foi possível carregar a sala.";
});

// Atualiza a lista de jogadores em tempo real
escutarJogadores(codigoSala, (jogadores) => {
  listaJogadores.innerHTML = "";

  const idsOrdenados = Object.keys(jogadores).sort((a, b) => {
    return (jogadores[a].entrouEm || 0) - (jogadores[b].entrouEm || 0);
  });

  idsOrdenados.forEach((id) => {
    const jogador = jogadores[id];
    if (!jogador.nome) return; // ignora entradas incompletas

    const item = document.createElement("li");

    const nomeSpan = document.createElement("span");
    nomeSpan.textContent = jogador.nome + (jogador.conectado === false ? " (saiu)" : "");

    item.appendChild(nomeSpan);

    if (id === idJogadorAtual) {
      const marcaVoce = document.createElement("span");
      marcaVoce.className = "marca-host";
      marcaVoce.style.background = "#16213e";
      marcaVoce.textContent = "VOCÊ";
      item.appendChild(marcaVoce);
    }

    listaJogadores.appendChild(item);
  });
});

// Escuta o status da sala — quando virar "em_partida", todo mundo é avisado
escutarStatusSala(codigoSala, (status) => {
  if (status === "em_partida") {
    btnIniciarPartida.disabled = true;
    btnIniciarPartida.textContent = "Partida iniciada!";
    textoAvisoEspera.style.display = "block";
    textoAvisoEspera.textContent = "Partida iniciada! (próxima etapa: o jogo em si)";
  }
});

btnCopiarCodigo.addEventListener("click", () => {
  navigator.clipboard.writeText(codigoSala).then(() => {
    btnCopiarCodigo.textContent = "Copiado!";
    setTimeout(() => {
      btnCopiarCodigo.textContent = "Copiar código";
    }, 1500);
  });
});

btnIniciarPartida.addEventListener("click", async () => {
  if (!souHost) return;
  btnIniciarPartida.disabled = true;
  btnIniciarPartida.textContent = "Iniciando...";

  try {
    await iniciarPartida(codigoSala);
  } catch (erro) {
    console.error(erro);
    mensagemErroLobby.textContent = "Não foi possível iniciar a partida.";
    btnIniciarPartida.disabled = false;
    btnIniciarPartida.textContent = "Iniciar Partida";
  }
});
