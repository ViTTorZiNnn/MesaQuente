// ============================================================
// AUDIO.JS — Sistema de Som Ambiente e Efeitos Sonoros Sutis
// ============================================================
// Utiliza a Web Audio API nativa para gerar ambiência quente e
// efeitos táteis (virada de carta, cliques) sem necessidade de
// arquivos pesados externos, respeitando políticas de autoplay
// de navegadores móveis com controle de mute/desmute.
// ============================================================

class GerenciadorDeAudio {
  constructor() {
    this.ctx = null;
    this.mutado = localStorage.getItem("mesaQuente_mutado") === "true";
    this.tocandoAmbiente = false;
    this.nosAmbiente = [];
  }

  iniciarContexto() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  alternarMudo() {
    this.mutado = !this.mutado;
    localStorage.setItem("mesaQuente_mutado", this.mutado ? "true" : "false");
    if (this.mutado) {
      this.pararAmbiente();
    } else {
      this.iniciarContexto();
      this.iniciarAmbiente();
      this.tocarClique();
    }
    this.atualizarBotoesMudo();
    return this.mutado;
  }

  atualizarBotoesMudo() {
    document.querySelectorAll(".btn-audio-toggle").forEach((btn) => {
      btn.innerHTML = this.mutado
        ? `<span>🔇</span><small>Mudo</small>`
        : `<span>🔊</span><small>Som</small>`;
      btn.setAttribute("title", this.mutado ? "Ativar som ambiente" : "Mutar som");
      btn.setAttribute("aria-label", this.mutado ? "Ativar som ambiente" : "Mutar som");
    });
  }

  iniciarAmbiente() {
    if (this.mutado || this.tocandoAmbiente) return;
    this.iniciarContexto();
    if (!this.ctx) return;

    try {
      // Acorde aconchegante/misterioso de pad harmônico suave (Fogo de lareira / lounge)
      const freqs = [110, 164.81, 220, 261.63]; // A2, E3, A3, C4
      const agora = this.ctx.currentTime;
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, agora);
      masterGain.gain.exponentialRampToValueAtTime(0.04, agora + 2);
      masterGain.connect(this.ctx.destination);

      const nos = [masterGain];

      freqs.forEach((f) => {
        const osc = this.ctx.createOscillator();
        const filtro = this.ctx.createBiquadFilter();
        filtro.type = "lowpass";
        filtro.frequency.setValueAtTime(450, agora);

        osc.type = "sine";
        osc.frequency.setValueAtTime(f, agora);
        osc.connect(filtro);
        filtro.connect(masterGain);
        osc.start();
        nos.push(osc);
      });

      this.nosAmbiente = nos;
      this.tocandoAmbiente = true;
    } catch (e) {
      console.warn("Áudio não pôde iniciar automaticamente:", e);
    }
  }

  pararAmbiente() {
    if (!this.tocandoAmbiente) return;
    this.nosAmbiente.forEach((no) => {
      try {
        if (no.stop) no.stop();
        if (no.disconnect) no.disconnect();
      } catch (err) {}
    });
    this.nosAmbiente = [];
    this.tocandoAmbiente = false;
  }

  tocarViradaCarta() {
    if (this.mutado) return;
    this.iniciarContexto();
    if (!this.ctx) return;

    try {
      const agora = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filtro = this.ctx.createBiquadFilter();

      filtro.type = "bandpass";
      filtro.frequency.setValueAtTime(600, agora);
      filtro.frequency.exponentialRampToValueAtTime(1200, agora + 0.15);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, agora);
      osc.frequency.exponentialRampToValueAtTime(520, agora + 0.12);

      gain.gain.setValueAtTime(0.08, agora);
      gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.18);

      osc.connect(filtro);
      filtro.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(agora);
      osc.stop(agora + 0.18);
    } catch (e) {}
  }

  tocarClique() {
    if (this.mutado) return;
    this.iniciarContexto();
    if (!this.ctx) return;

    try {
      const agora = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(440, agora);
      osc.frequency.exponentialRampToValueAtTime(880, agora + 0.05);

      gain.gain.setValueAtTime(0.06, agora);
      gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(agora);
      osc.stop(agora + 0.06);
    } catch (e) {}
  }

  tocarContagem(numero) {
    if (this.mutado) return;
    this.iniciarContexto();
    if (!this.ctx) return;

    try {
      const agora = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const baseFreq = numero === 1 ? 660 : 330 + (5 - numero) * 50;

      osc.type = numero === 1 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(baseFreq, agora);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, agora + 0.15);

      gain.gain.setValueAtTime(0.12, agora);
      gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(agora);
      osc.stop(agora + 0.35);
    } catch (e) {}
  }

  tocarDadoRolando() {
    if (this.mutado) return;
    this.iniciarContexto();
    if (!this.ctx) return;

    try {
      const agora = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(120 + Math.random() * 80, agora);
      osc.frequency.exponentialRampToValueAtTime(40, agora + 0.04);

      gain.gain.setValueAtTime(0.04, agora);
      gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(agora);
      osc.stop(agora + 0.04);
    } catch (e) {}
  }

  tocarDadoVencedor() {
    if (this.mutado) return;
    this.iniciarContexto();
    if (!this.ctx) return;

    try {
      const agora = this.ctx.currentTime;
      const notas = [392, 523.25, 659.25, 783.99]; // G4, C5, E5, G5
      notas.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, agora + i * 0.08);

        gain.gain.setValueAtTime(0.1, agora + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, agora + i * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(agora + i * 0.08);
        osc.stop(agora + i * 0.08 + 0.5);
      });
    } catch (e) {}
  }

  tocarDescarte() {
    if (this.mutado) return;
    this.iniciarContexto();
    if (!this.ctx) return;

    try {
      const agora = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filtro = this.ctx.createBiquadFilter();

      filtro.type = "lowpass";
      filtro.frequency.setValueAtTime(1200, agora);
      filtro.frequency.exponentialRampToValueAtTime(200, agora + 0.22);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, agora);
      osc.frequency.exponentialRampToValueAtTime(90, agora + 0.22);

      gain.gain.setValueAtTime(0.09, agora);
      gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.22);

      osc.connect(filtro);
      filtro.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(agora);
      osc.stop(agora + 0.22);
    } catch (e) {}
  }

  tocarReacao(emoji) {
    if (this.mutado) return;
    this.iniciarContexto();
    if (!this.ctx) return;

    try {
      const agora = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freqMap = {
        "👏": 587.33, // D5
        "🔥": 739.99, // F#5
        "😳": 440.00, // A4
        "😂": 659.25  // E5
      };

      const f = freqMap[emoji] || 523.25;

      osc.type = "sine";
      osc.frequency.setValueAtTime(f, agora);
      osc.frequency.exponentialRampToValueAtTime(f * 1.25, agora + 0.12);

      gain.gain.setValueAtTime(0.08, agora);
      gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(agora);
      osc.stop(agora + 0.14);
    } catch (e) {}
  }
}

const audioApp = new GerenciadorDeAudio();

// Ativa áudio na primeira interação do usuário caso não esteja mutado
window.addEventListener("DOMContentLoaded", () => {
  audioApp.atualizarBotoesMudo();

  const iniciarNoClique = () => {
    if (!audioApp.mutado && !audioApp.tocandoAmbiente) {
      audioApp.iniciarAmbiente();
    }
    window.removeEventListener("pointerdown", iniciarNoClique);
  };
  window.addEventListener("pointerdown", iniciarNoClique, { once: true });
});
