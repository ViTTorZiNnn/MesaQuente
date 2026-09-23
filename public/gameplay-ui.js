export const FLOWS={
 quem_e_mais_provavel:{steps:['Puxar','Revelar','Votar','Resultado'],read:'Leia sua carta e toque em Revelar. A pergunta aparecerá para todos antes dos votos.',play:'Escolha a pessoa que mais combina com a pergunta.',reveal:'Revelar e abrir votação'},
 eu_nunca:{steps:['Comprar','Ler','Responder','Descobrir'],read:'Leia a frase para a mesa e abra as respostas.',play:'Marque Já fiz ou Nunca fiz. Conte a história se quiser.',reveal:'Abrir respostas'},
 o_que_voce_prefere:{steps:['Comprar','Ler','Escolher','Comparar'],read:'Leia as duas alternativas e abra as escolhas.',play:'Escolha uma alternativa. Depois, contem seus motivos.',reveal:'Abrir escolhas'},
 preencha_a_lacuna:{steps:['Comprar','Ler','Completar','Escolher'],read:'Leia a frase incompleta e entregue as opções à mesa.',play:'Complete a frase com a opção que você prefere.',reader:'Aguarde todas as respostas e escolha a que mais gostou.',reveal:'Entregar respostas'},
 niveis_intimidade:{steps:['Comprar','Ler','Conversar','Encerrar'],read:'Leia a pergunta. Você pode responder, convidar a mesa ou pular.',play:'Conversem sem pressa. Ninguém é obrigado a responder.',reveal:'Conversar com a mesa'},
 verdade_ou_desafio_hot:{steps:['Comprar','Escolher','Participar','Encerrar'],read:'Escolha Verdade ou Desafio. Depois compartilhe a carta.',play:'Respondam ou façam o desafio. É permitido pular.',reveal:'Compartilhar escolha'},
 duas_verdades_uma_mentira:{steps:['Comprar','Escrever','Adivinhar','Revelar'],read:'Escreva dois fatos verdadeiros e um falso. Marque a mentira e salve.',play:'Qual dos três fatos é mentira? Envie seu palpite.',reader:'Aguarde os palpites. A mentira será revelada no fim.',reveal:'Apresentar os três fatos'},
 o_espiao:{steps:['Comprar','Distribuir','Investigar','Acusar','Revelar'],read:'Distribua os papéis. Só o espião ficará sem a palavra.',play:'Vote em quem você acha que é o espião.',discussion:'Leiam seus papéis e façam perguntas uns aos outros sem dizer a palavra.',reveal:'Distribuir papéis'},
 bandeiras_vermelhas:{steps:['Comprar','Ler','Escolher','Comparar'],read:'Leia a situação completa e abra as escolhas.',play:'Você daria uma chance? Escolha e explique seu limite.',reveal:'Abrir escolhas'},
 batalha_de_argumentos:{steps:['Comprar','Ler','Debater','Votar','Resultado'],read:'Leia a afirmação e inicie o debate.',play:'Qual argumento convenceu mais? Escolha uma das duas pessoas.',discussion:'O leitor defende a frase. A outra pessoa indicada discorda. Deem espaço para os dois falarem.',reveal:'Começar debate'},
 o_termometro:{steps:['Comprar','Dar exemplo','Adivinhar','Revelar'],read:'Dê um exemplo da intensidade do seu número. Não diga o número.',play:'Ouça o exemplo e escolha uma intensidade de 1 a 10.',reader:'Aguarde os palpites sem revelar seu número.',reveal:'Receber palpites'},
 apenas_uma_dica:{steps:['Comprar','Distribuir','Dar dicas','Adivinhar','Revelar'],read:'Você será quem adivinha. Entregue a palavra secreta aos outros.',play:'Envie uma dica de uma palavra. Não escreva a própria palavra secreta.',reader:'Aguarde as dicas. As repetidas serão removidas automaticamente.',reveal:'Entregar palavra à mesa'},
 palavra_proibida:{steps:['Comprar','Preparar','Adivinhar','Revelar'],read:'Veja a palavra e os termos proibidos. Prepare sua explicação.',play:'Ouça a explicação e envie um palpite. Você pode tentar novamente.',reader:'Explique em voz alta sem usar os termos proibidos.',reveal:'Começar explicação'}
};
export function guidance(c,p,uid,now=Date.now()){
 const f=FLOWS[c.modeId],own=c.readerId===uid,participant=c.participants.includes(uid);let text,index;
 if(c.phase==='results'){text=c.skipped?'Carta pulada sem penalidade. Sigam quando quiserem.':'Resultado na mesa. Conversem antes de seguir.';index=f.steps.length-1;}
 else if(!participant){text='Você entrou durante a rodada. Participará da próxima.';index=0;}
 else if(c.phase==='deck'){text=own?'O baralho está com você. Puxe uma carta.':'Aguarde o leitor comprar a carta.';index=0;}
 else if(c.phase==='private'){text=own?f.read:'O leitor está preparando a rodada. Aguarde.';index=1;}
 else if(c.votingReady===false){text=f.discussion;index=2;}
 else if(c.modeId==='apenas_uma_dica'&&c.hintsRevealed){text=own?'Leia as dicas que sobraram e envie seu palpite.':'O leitor está tentando adivinhar. Não revele a palavra.';index=3;}
 else{text=own&&f.reader?f.reader:f.play;index=f.steps.length===5&&c.modeId!=='apenas_uma_dica'?3:2;}
 const count=p.expectedCount?`${p.answerCount||0} de ${p.expectedCount} participações recebidas`:'';
 return {text,index,steps:f.steps,count};
}
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
export function outcome(c,p,players){
 const name=id=>players[id]?.nome||'Jogador que saiu';if(c.skipped)return{title:'Tudo bem passar.',detail:'Carta descartada sem mostrar o conteúdo à mesa.',rows:[]};
 const answers=p.answers||{},values=Object.values(answers),counts={};values.forEach(v=>counts[v]=(counts[v]||0)+1);
 const label=v=>['quem_e_mais_provavel','o_espiao','batalha_de_argumentos'].includes(c.modeId)?name(v):c.modeId==='eu_nunca'?(v==='JA_FIZ'?'Já fiz':'Nunca fiz'):['o_que_voce_prefere','bandeiras_vermelhas'].includes(c.modeId)?c.options[Number(v)]:c.modeId==='duas_verdades_uma_mentira'?`Fato ${Number(v)+1}: ${c.statements?.[Number(v)]||''}`:v;
 const rows=Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([value,count])=>({label:label(value),count,total:values.length}));
 let title='Olha o que a mesa escolheu',detail='O que fez vocês escolherem assim?';
 if(rows.length){const max=rows[0].count,leaders=rows.filter(x=>x.count===max);title=leaders.length>1?'A mesa ficou dividida':max===values.length?'Todo mundo concordou':'A escolha da maioria';}
 if(c.modeId==='o_espiao'){title='O espião era '+name(c.spyId);detail='Palavra secreta: '+c.secret;}
 if(c.modeId==='duas_verdades_uma_mentira'){title='A mentira era o fato '+(c.lie+1);detail=c.statements?.[c.lie]||'';}
 if(c.modeId==='o_termometro'){title='A intensidade era '+c.secretNumber+' de 10';detail=Object.entries(answers).filter(([,v])=>Number(v)===c.secretNumber).map(([id])=>name(id)).join(', ')||'Ninguém acertou exatamente. Comparem as interpretações.';}
 if(c.modeId==='apenas_uma_dica'){title=normalize(c.guess)===normalize(c.secret)?'A mesa conseguiu!':'Quase! Vamos descobrir.';detail=`Palavra: ${c.secret}. Palpite: ${c.guess||'Nenhum'}.`;}
 if(c.modeId==='preencha_a_lacuna'){title='A resposta escolhida';detail=(answers[c.winner]||'')+' — '+name(c.winner);}
 if(c.modeId==='palavra_proibida'){title=c.winner?name(c.winner)+' acertou!':'A palavra era '+c.secret;detail='Resposta: '+c.secret;}
 if(['niveis_intimidade','verdade_ou_desafio_hot'].includes(c.modeId)){title='Essa rodada rendeu conversa.';detail='Sem pontos e sem resposta certa. Sigam quando estiverem prontos.';}
 return {title,detail,rows:['apenas_uma_dica','preencha_a_lacuna','palavra_proibida'].includes(c.modeId)?[]:rows};
}
