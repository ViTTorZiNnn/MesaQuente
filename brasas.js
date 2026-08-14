// ============================================================
// BRASAS.JS — Fundo com Partículas de Brasa Animadas Sutis
// ============================================================
// Cria uma animação visual leve no canvas de brasas subindo,
// com baixo consumo de bateria e CPU no mobile.
// ============================================================

(function () {
  const canvas = document.getElementById("canvas-brasas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let largura, altura;
  const particulas = [];
  const TOTAL_PARTICULAS = 28;

  function redimensionar() {
    largura = canvas.width = window.innerWidth;
    altura = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", redimensionar);
  redimensionar();

  class Particula {
    constructor() {
      this.reset(true);
    }

    reset(primeiraVez = false) {
      this.x = Math.random() * largura;
      this.y = primeiraVez ? Math.random() * altura : altura + Math.random() * 20;
      this.raio = Math.random() * 2.2 + 0.8;
      this.velocidadeY = -(Math.random() * 0.7 + 0.3);
      this.velocidadeX = (Math.random() - 0.5) * 0.4;
      this.opacidade = Math.random() * 0.6 + 0.2;
      this.vida = 0;
      this.vidaMax = Math.random() * 200 + 150;
      
      // Cores de brasa (laranja, vermelho quente, dourado)
      const matizes = [15, 30, 45];
      this.matiz = matizes[Math.floor(Math.random() * matizes.length)];
    }

    atualizar() {
      this.x += this.velocidadeX + Math.sin(this.vida * 0.03) * 0.2;
      this.y += this.velocidadeY;
      this.vida++;

      if (this.y < -10 || this.vida > this.vidaMax || this.x < -10 || this.x > largura + 10) {
        this.reset();
      }
    }

    desenhar() {
      const progresso = this.vida / this.vidaMax;
      const alfa = this.opacidade * (1 - progresso);
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.matiz}, 100%, 65%, ${alfa})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `hsla(${this.matiz}, 100%, 50%, ${alfa * 0.8})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < TOTAL_PARTICULAS; i++) {
    particulas.push(new Particula());
  }

  function animar() {
    ctx.clearRect(0, 0, largura, altura);
    ctx.shadowBlur = 0;

    for (let i = 0; i < particulas.length; i++) {
      particulas[i].atualizar();
      particulas[i].desenhar();
    }

    requestAnimationFrame(animar);
  }

  animar();
})();
