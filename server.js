import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  bgSvg,
  logoSvg,
  btnCriarSvg,
  btnEntrarSvg,
  paredeSvg,
  mesaSvg,
  redemoinhoSvg,
  baralhoSvg,
  molduraPlayerSvg,
  engrenagemSvg,
  reacoesSvg,
  sairSalaSvg,
  cardVotacaoSvg,
  cardDilemasSvg,
  cardBlefeSvg,
  cardDebateSvg,
  cardSintoniaSvg,
  cardDesafiosSvg,
  cardCasaisSvg,
  cardSaficoSvg,
  cardPicanteSvg,
  cardEspecialSvg,
  criarCardCategoriaSvg,
} from "./assets-data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Save vector asset files to root
try {
  fs.writeFileSync(path.join(__dirname, "background-lobby.svg"), bgSvg);
  fs.writeFileSync(path.join(__dirname, "background-lobby.png"), bgSvg);
  fs.writeFileSync(path.join(__dirname, "bg.jpg"), bgSvg);
  fs.writeFileSync(path.join(__dirname, "bg.png"), bgSvg);
  fs.writeFileSync(path.join(__dirname, "bg.svg"), bgSvg);

  fs.writeFileSync(path.join(__dirname, "logo-mesa-quente.svg"), logoSvg);
  fs.writeFileSync(path.join(__dirname, "logo-mesa-quente.png"), logoSvg);

  fs.writeFileSync(path.join(__dirname, "criar-partida.svg"), btnCriarSvg);
  fs.writeFileSync(path.join(__dirname, "criar-partida.png"), btnCriarSvg);

  fs.writeFileSync(path.join(__dirname, "entrar-na-partida.svg"), btnEntrarSvg);
  fs.writeFileSync(path.join(__dirname, "entrar-na-partida.png"), btnEntrarSvg);
  fs.writeFileSync(path.join(__dirname, "entrar-partida.svg"), btnEntrarSvg);
  fs.writeFileSync(path.join(__dirname, "entrar-partida.png"), btnEntrarSvg);

  fs.writeFileSync(path.join(__dirname, "parede.svg"), paredeSvg);
  fs.writeFileSync(path.join(__dirname, "parede.png"), paredeSvg);

  fs.writeFileSync(path.join(__dirname, "mesa.svg"), mesaSvg);
  fs.writeFileSync(path.join(__dirname, "mesa.png"), mesaSvg);

  fs.writeFileSync(path.join(__dirname, "redemoinho.svg"), redemoinhoSvg);
  fs.writeFileSync(path.join(__dirname, "redemoinho.png"), redemoinhoSvg);

  fs.writeFileSync(path.join(__dirname, "baralho.svg"), baralhoSvg);
  fs.writeFileSync(path.join(__dirname, "baralho.png"), baralhoSvg);

  fs.writeFileSync(path.join(__dirname, "moldura-playeres.svg"), molduraPlayerSvg);
  fs.writeFileSync(path.join(__dirname, "moldura-playeres.png"), molduraPlayerSvg);

  fs.writeFileSync(path.join(__dirname, "engrenagem.svg"), engrenagemSvg);
  fs.writeFileSync(path.join(__dirname, "engrenagem.png"), engrenagemSvg);

  fs.writeFileSync(path.join(__dirname, "reacoes.svg"), reacoesSvg);
  fs.writeFileSync(path.join(__dirname, "reacoes.png"), reacoesSvg);

  fs.writeFileSync(path.join(__dirname, "sair-da-sala.svg"), sairSalaSvg);
  fs.writeFileSync(path.join(__dirname, "sair-da-sala.png"), sairSalaSvg);
} catch (e) {
  console.error("Error writing svg files:", e);
}

// Route handlers with image/svg+xml headers supporting .png and .jpg extensions
app.get(["/background-lobby.png", "/background-lobby.jpg", "/background-lobby.svg", "/bg.jpg", "/bg.png", "/bg.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(bgSvg);
});

app.get(["/logo%20mesa%20quente.jpg", "/logo%20mesa%20quente.png", "/logo mesa quente.png", "/logo mesa quente.jpg", "/logo-mesa-quente.png", "/logo-mesa-quente.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(logoSvg);
});

app.get(["/CRIAR%20PARTIDA.png", "/CRIAR PARTIDA.png", "/criar-partida.png", "/criar-partida.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(btnCriarSvg);
});

app.get(["/ENTRAR%20EM%20PARTIDA.png", "/ENTRAR EM PARTIDA.png", "/entrar-na-partida.png", "/entrar-na-partida.svg", "/entrar-partida.png", "/entrar-partida.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(btnEntrarSvg);
});

app.get(["/parede.png", "/parede.svg", "/parede.jpg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(paredeSvg);
});

app.get(["/mesa.png", "/mesa.svg", "/mesa.jpg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(mesaSvg);
});

app.get(["/redemoinho.png", "/redemoinho.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(redemoinhoSvg);
});

app.get(["/baralho.png", "/baralho.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(baralhoSvg);
});

app.get(["/moldura-playeres.png", "/moldura-playeres.svg", "/moldura-jogadores.png"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(molduraPlayerSvg);
});

app.get(["/engrenagem.png", "/engrenagem.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(engrenagemSvg);
});

app.get(["/reacoes.png", "/reacoes.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(reacoesSvg);
});

app.get(["/sair-da-sala.png", "/sair-da-sala.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(sairSalaSvg);
});

app.get(["/cartas-votação.png", "/cartas-vota%C3%A7%C3%A3o.png", "/cartas-votacao.png", "/cartas-votacao.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(cardVotacaoSvg);
});

app.get(["/cartas-confissões.png", "/cartas-confiss%C3%B5es.png", "/cartas-confissoes.png", "/cartas-confissoes.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(cardDilemasSvg);
});

app.get(["/cartas-surpresa.png", "/cartas-surpresa.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(cardBlefeSvg);
});

app.get(["/cartas-contra-o-tempo.png", "/cartas-contra-o-tempo.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(cardDebateSvg);
});

app.get(["/cartas-picantes.png", "/cartas-picantes.svg", "/cartas-picante.png", "/cartas-picante.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(cardSintoniaSvg);
});

app.get(["/cartas-desafios.png", "/cartas-desafios.svg", "/cartas-desafio.png", "/cartas-desafio.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(cardDesafiosSvg);
});

app.get(["/cartas-casais.png", "/cartas-casais.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(cardCasaisSvg);
});

app.get(["/cartas-safico.png", "/cartas-safico.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(cardSaficoSvg);
});

app.get(["/cartas-especial.png", "/cartas-especial.svg"], (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(cardEspecialSvg);
});

// Generic card pattern fallback
app.get(/cartas-.*\.png/, (req, res) => {
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(cardVotacaoSvg);
});

app.use(express.static(__dirname));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
