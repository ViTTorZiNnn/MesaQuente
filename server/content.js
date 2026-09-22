import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const ctx={window:{}};vm.createContext(ctx);
for(const name of ['catalogo.js','baralhos.js','conteudo-extra.js'])vm.runInContext(readFileSync(new URL(name,import.meta.url),'utf8'),ctx);
vm.runInContext('window.decks=BARALHOS_DISPONIVEIS;',ctx);
export const modes=ctx.window.MQ_CATALOGO.modos;
export const decks=ctx.window.decks;
