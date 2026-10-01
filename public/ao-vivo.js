// Modo "mesmo aparelho": um celular, todo mundo em volta. O aparelho só puxa e mostra as cartas;
// a galera responde em voz alta, aponta, mostra dedos e cumpre os desafios ao vivo.
export const DICAS_AO_VIVO={
 quem_e_mais_provavel:'Leia em voz alta. No "3, 2, 1", todo mundo aponta para alguém ao mesmo tempo. O mais apontado se explica.',
 eu_nunca:'Leia em voz alta. Quem já fez levanta a mão (ou bebe) e conta a história.',
 o_que_voce_prefere:'Leia as duas opções. No "3, 2, 1", cada um mostra 1 ou 2 dedos. Depois defendam as escolhas.',
 preencha_a_lacuna:'Leia a frase e as opções. Cada um fala a sua escolha e quem leu elege a melhor.',
 duas_verdades_uma_mentira:'Conte 3 fatos sobre você, um deles inventado. No "3, 2, 1", a galera mostra 1, 2 ou 3 dedos para a mentira.',
 o_espiao:'Este minijogo precisa de um aparelho por pessoa.',
 bandeiras_vermelhas:'Leia a situação. No "3, 2, 1": polegar para cima (daria uma chance) ou para baixo.',
 batalha_de_argumentos:'Quem leu defende a frase; a pessoa à esquerda ataca. A galera decide no grito quem ganhou.',
 o_termometro:'Leia a treta em voz alta. No "3, 2, 1", todo mundo mostra a nota nos dedos ao mesmo tempo (punho fechado = 0, duas mãos abertas = 10). Quem deu a menor e a maior nota tem 60 segundos pra se defender. A galera decide no grito quem convenceu.',
 apenas_uma_dica:'Toque em "Mostrar para a galera" e coloque o celular na testa, virado para eles. Cada um dá uma dica de uma palavra até você acertar.',
 palavra_proibida:'Segure o botão para ver a palavra. Explique para a galera sem dizer os termos proibidos!',
 niveis_intimidade:'Leia a pergunta, responda em voz alta e deixe a galera cutucar.',
 verdade_ou_desafio_hot:'Escolha Verdade ou Desafio e cumpra na frente da galera. Pular também vale.'
};
const full=c=>c.full||c;
// Texto da carta na mesa 3D: só o que todos podem ver.
export function textoAoVivo(c){const f=full(c);if(c.skipped)return'Carta pulada.';
 switch(c.modeId){
  case'o_termometro':return f.text;
  case'apenas_uma_dica':return'Quem sou eu?\n'+(f.cat||'')+'\n\nCelular na testa!';
  case'palavra_proibida':return'Palavra Proibida\n\nSegure o botão para ver a palavra.';
  case'verdade_ou_desafio_hot':return f.choice?f.text:'Verdade ou Desafio?';
  case'preencha_a_lacuna':return f.text+'\n\n'+(f.white||[]).map((w,i)=>(i+1)+') '+w).join('\n');
  default:return f.text||'';
 }}
// Tela cheia com o segredo (o leitor segura para ver; ou mostra para a galera).
const overlay=document.createElement('div');overlay.className='secret-view';overlay.hidden=true;document.body.append(overlay);
function show(text){overlay.textContent=text;overlay.hidden=false;}
function hide(){overlay.hidden=true;}
function holdButton(label,secret){const b=document.createElement('button');b.type='button';b.className='hold-secret';b.textContent=label;const on=e=>{e.preventDefault();show(secret);},off=()=>hide();b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointerleave',off);b.addEventListener('pointercancel',off);b.addEventListener('contextmenu',e=>e.preventDefault());return b;}
// Painel lateral no modo mesmo aparelho.
export function painelAoVivo(box,c,{el,act}){const f=full(c);
 box.append(el('p',DICAS_AO_VIVO[c.modeId]||'Leia em voz alta e joguem juntos.','live-tip'));
 if(c.phase==='private'&&c.modeId==='verdade_ou_desafio_hot'){for(const [label,choice] of [['Verdade','truth'],['Desafio','dare']]){const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=async()=>{await act('truth',{choice});await act('reveal');};box.append(b);}return;}
 if(c.phase!=='public')return;
 if(c.modeId==='o_termometro'){const b=document.createElement('button');b.type='button';b.className='primary';b.textContent='⏱️ Abrir o tribunal (60s)';b.onclick=()=>{let n=60;b.disabled=true;const tick=()=>{b.textContent=n>0?'⏱️ '+n+'s de defesa':'⚖️ Tempo! Quem convenceu?';if(n--<=0){clearInterval(t);b.disabled=false;}};tick();const t=setInterval(tick,1000);};box.append(b);}
 if(c.modeId==='palavra_proibida'&&f.secret)box.append(holdButton('Segure para ver a palavra',f.secret+'\n\nNão pode dizer:\n'+(f.forbidden||[]).join(', ')));
 if(c.modeId==='apenas_uma_dica'&&f.secret){const b=document.createElement('button');b.type='button';b.className='primary';b.textContent='Mostrar para a galera';b.onclick=()=>{show(f.secret+'\n'+(f.cat||'')+(f.dica?'\n\n'+f.dica:'')+'\n\n(toque para esconder)');};box.append(b);overlay.onclick=hide;}
}
export function esconderSegredo(){hide();}
