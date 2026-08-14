// ============================================================
// BRASAS.JS — Fundo com Vórtice Espacial e Brasas Cósmicas Suaves
// ============================================================
// Simula um vórtice espacial suave com rotação orbital e partículas de brasa,
// mantendo paleta escura (sem ofuscar texto) e consumo levíssimo de CPU/GPU.
// ============================================================

(function () {
  const canvas = document.getElementById("canvas-brasas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let largura, altura, centroX, centroY;
  const particulas = [];
  const TOTAL_PARTICULAS = 42;
  let anguloVortice = 0;

  function redimensionar() {
    largura = canvas.width = window.innerWidth;
    altura = canvas.height = window.innerHeight;
    centroX = largura / 2;
    centroY = altura / 2;
  }

  window.addEventListener("resize", redimensionar);
  redimensionar();

  class ParticulaEspacial {
    constructor() {
      this.reset(true);
    }

    reset(primeiraVez = false) {
      // Distância radial do centro (órbita)
      const maxRaio = Math.sqrt(centroX * centroX + centroY * centroY) * 1.1;
      this.raioOrbita = primeiraVez ? Math.random() * maxRaio : maxRaio * (0.6 + Math.random() * 0.4);
      this.angulo = Math.random() * Math.PI * 2;
      this.velocidadeAngular = (Math.random() * 0.003 + 0.0015) * (Math.random() > 0.5 ? 1 : 1);
      this.velocidadeRadial = -(Math.random() * 0.4 + 0.15); // Espirala suavemente para dentro
      
      this.tamanho = Math.random() * 2.4 + 0.8;
      this.opacidadeBase = Math.random() * 0.55 + 0.2;
      this.vida = 0;
      this.vidaMax = Math.random() * 300 + 200;

      // Paleta cósmica escura: âmbar, fogo suave, violeta profundo, dourado
      const tipos = [
        { h: 25, s: 95, l: 60 },  // Âmbar / Fogo
        { h: 42, s: 100, l: 65 }, // Ouro
        { h: 270, s: 70, l: 65 }, // Violeta Estelar
        { h: 210, s: 80, l: 70 }  // Azul Cósmico
      ];
      this.cor = tipos[Math.floor(Math.random() * tipos.length)];
    }

    atualizar() {
      this.angulo += this.velocidadeAngular;
      this.raioOrbita += this.velocidadeRadial;
      this.vida++;

      this.x = centroX + Math.cos(this.angulo) * this.raioOrbita;
      this.y = centroY + Math.sin(this.angulo) * (this.raioOrbita * 0.75); // Perspectiva elíptica 2.5D

      if (this.raioOrbita < 25 || this.vida > this.vidaMax) {
        this.reset();
      }
    }

    desenhar() {
      const progresso = this.vida / this.vidaMax;
      const alfa = this.opacidadeBase * (1 - progresso) * Math.min(1, this.raioOrbita / 80);
      if (alfa <= 0.01) return;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.cor.h}, ${this.cor.s}%, ${this.cor.l}%, ${alfa})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = `hsla(${this.cor.h}, 100%, 50%, ${alfa * 0.6})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < TOTAL_PARTICULAS; i++) {
    particulas.push(new ParticulaEspacial());
  }

  function desenharVorticeDeFundo() {
    // Gradiente suave de nébula giratória no centro
    anguloVortice += 0.001;
    const grad = ctx.createRadialGradient(
      centroX, centroY, 10,
      centroX, centroY, Math.max(largura, altura) * 0.65
    );
    grad.addColorStop(0, "rgba(35, 20, 55, 0.25)");
    grad.addColorStop(0.35, "rgba(20, 15, 32, 0.18)");
    grad.addColorStop(0.7, "rgba(10, 8, 16, 0.08)");
    grad.addColorStop(1, "rgba(6, 5, 10, 0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, largura, altura);
  }

  function animar() {
    ctx.clearRect(0, 0, largura, altura);
    ctx.shadowBlur = 0;

    desenharVorticeDeFundo();

    for (let i = 0; i < particulas.length; i++) {
      particulas[i].atualizar();
      particulas[i].desenhar();
    }

    requestAnimationFrame(animar);
  }

  animar();
})();
