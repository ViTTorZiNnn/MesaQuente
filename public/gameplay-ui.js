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
 o_termometro:{steps:['Puxar','Dar a pista','Chutar','Revelar'],read:'Veja seu número secreto na carta. Depois, fale UMA pista que combine com ele. Não diga o número!',play:'Ouça a pista e toque no número de 1 a 10 que você acha que é.',reader:'Fale sua pista e espere os chutes. Não diga o número!',reveal:'Pista dada, receber chutes'},
 apenas_uma_dica:{steps:['Puxar','Distribuir','Dar dicas','Chutar','Revelar'],read:'Você é uma pessoa famosa! Só a mesa sabe quem. Entregue a carta para eles darem as dicas.',play:'Mande UMA palavra que ajude o leitor a descobrir quem ele é. Sem dizer o nome!',reader:'Espere as dicas. As repetidas são canceladas automaticamente.',reveal:'Entregar carta à mesa'},
 palavra_proibida:{steps:['Comprar','Preparar','Adivinhar','Revelar'],read:'Veja a palavra e os termos proibidos. Prepare sua explicação.',play:'Ouça a explicação e envie um palpite. Você pode tentar novamente.',reader:'Explique em voz alta sem usar os termos proibidos.',reveal:'Começar explicação'}
};
Object.assign(FLOWS,{
 amigo_da_onca:{steps:['Puxar','Revelar','Votar','3, 2, 1!'],read:'Leia a pergunta e revele. Todo mundo vota em segredo.',play:'Vote em quem da mesa merece essa carta.',reveal:'Revelar e abrir votação'},
 vira_vira:{steps:['Puxar','Revelar','Marcar','Brindar'],read:'Leia a carta em voz alta e abra as respostas.',play:'A carta é sobre você? Marque "Bebo" ou "Tô fora".',reveal:'Abrir respostas'},
 decisao_dificil:{steps:['Puxar','Revelar','Decidir','Comparar'],read:'Leia a situação e as duas saídas.',play:'Escolha o que você faria.',reveal:'Abrir escolhas'},
 fato_ou_fake:{steps:['Puxar','Revelar','Votar','Resposta'],read:'Leia a curiosidade e abra a votação.',play:'Isso é verdade ou mito? Vote em Fato ou Fake.',reveal:'Abrir votação'},
 caos_na_mesa:{steps:['Puxar','Revelar','Fazer','Pontuar'],read:'Leia a regra em voz alta. Ela vale na hora!',play:'Cumpra a regra! O leitor marca quem ganhou ou perdeu.',reader:'Faça todos cumprirem a regra e marque quem ganhou ou perdeu.',reveal:'Valendo!'},
 mimica:{steps:['Puxar','Preparar','Adivinhar','Revelar'],read:'Veja o que imitar. Sem falar!',play:'Assista à mímica e digite seu palpite.',reader:'Faça a mímica sem falar nada.',reveal:'Começar mímica'}
});
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
 const label=v=>['quem_e_mais_provavel','o_espiao','batalha_de_argumentos','amigo_da_onca'].includes(c.modeId)?name(v):c.modeId==='eu_nunca'?(v==='JA_FIZ'?'Já fiz':'Nunca fiz'):c.modeId==='vira_vira'?(v==='JA_FIZ'?'Bebeu':'Tô fora'):c.modeId==='fato_ou_fake'?(v==='FATO'?'Fato':'Fake'):['o_que_voce_prefere','bandeiras_vermelhas','decisao_dificil'].includes(c.modeId)?c.options[Number(v)]:c.modeId==='duas_verdades_uma_mentira'?`Fato ${Number(v)+1}: ${c.statements?.[Number(v)]||''}`:v;
 const rows=Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([value,count])=>({label:label(value),count,total:values.length}));
 let title='Olha o que a mesa escolheu',detail='O que fez vocês escolherem assim?';
 if(rows.length){const max=rows[0].count,leaders=rows.filter(x=>x.count===max);title=leaders.length>1?'A mesa ficou dividida':max===values.length?'Todo mundo concordou':'A escolha da maioria';}
 if(c.modeId==='o_espiao'){title='O espião era '+name(c.spyId);detail='Palavra secreta: '+c.secret;}
 if(c.modeId==='duas_verdades_uma_mentira'){title='A mentira era o fato '+(c.lie+1);detail=c.statements?.[c.lie]||'';}
 if(c.modeId==='o_termometro'){title='A intensidade era '+c.secretNumber+' de 10';detail=Object.entries(answers).filter(([,v])=>Number(v)===c.secretNumber).map(([id])=>name(id)).join(', ')||'Ninguém acertou exatamente. Comparem as interpretações.';}
 if(c.modeId==='apenas_uma_dica'){title=c.correct?'Acertou! Você é '+c.secret+'!':'Errou! Você era '+c.secret+'.';detail=`Palpite: ${c.guess||'nenhum'}.`;}
 if(c.modeId==='preencha_a_lacuna'){title='A resposta escolhida';detail=(answers[c.winner]||'')+' — '+name(c.winner);}
 if(c.modeId==='amigo_da_onca'&&rows.length){const max=Math.max(...Object.values(counts)),lead=Object.keys(counts).filter(k=>counts[k]===max);title=lead.map(name).join(' e ')+(lead.length>1?' levaram':' levou')+' a carta!';detail='Defenda-se ou aceite o título.';}
 if(c.modeId==='vira_vira'){const who=Object.keys(answers).filter(id=>answers[id]==='JA_FIZ');title=who.length?who.map(name).join(', ')+(who.length>1?' bebem ':' bebe ')+(c.goles||1)+(c.goles>1?' goles!':' gole!'):'Ninguém bebe essa!';detail='Sem álcool? Paguem uma prenda no lugar.';}
 if(c.modeId==='fato_ou_fake'&&c.answerKey){title='É '+(c.answerKey==='FATO'?'FATO!':'FAKE!');detail=c.explain||'';}
 if(c.modeId==='caos_na_mesa'){title=(c.winners||[]).length?(c.winners||[]).map(name).join(', ')+((c.delta||1)>0?' ganhou '+c.delta:' perdeu '+Math.abs(c.delta))+(Math.abs(c.delta||1)>1?' pontos':' ponto'):'Ninguém pontuou dessa vez.';detail='Caos resolvido. Próxima!';}
 if(c.modeId==='mimica'){title=c.winner?name(c.winner)+' acertou!':'Ninguém acertou';detail='Era: '+(c.secret||'');}
 if(c.modeId==='palavra_proibida'){title=c.winner?name(c.winner)+' acertou!':'A palavra era '+c.secret;detail='Resposta: '+c.secret;}
 if(c.modeId==='niveis_intimidade'){title='Respondeu sem filtro!';detail=name(c.readerId)+' encarou a pergunta. Próxima vítima?';}
 if(c.modeId==='verdade_ou_desafio_hot'){title=c.choice==='dare'?'Desafio cumprido!':'Verdade revelada!';detail=name(c.readerId)+(c.choice==='dare'?' encarou o desafio.':' abriu o jogo.');}
 return {title,detail,rows:['apenas_uma_dica','preencha_a_lacuna','palavra_proibida','mimica','caos_na_mesa'].includes(c.modeId)?[]:rows};
}

// Papel de cada pessoa na rodada: deixa claro "o que EU faço agora".
export function roleFor(c,uid,viewerText=''){
 const own=c.readerId===uid,id=c.modeId;
 if(!c.participants.includes(uid))return{label:'Espectador',text:'Você entra na próxima rodada.'};
 if(c.phase==='deck'||c.phase==='private')return own?{label:'Leitor',text:'Você está com o baralho. Puxe e revele a carta.'}:{label:'Aguardando',text:'O leitor está preparando a carta.'};
 switch(id){
  case'o_espiao':return /ESPIÃO/.test(viewerText)?{label:'🕵️ Espião',text:'Você NÃO sabe a palavra. Finja que sabe e descubra qual é.'}:{label:'🔎 Detetive',text:'Dê dicas sutis da palavra e desmascare o espião.'};
  case'apenas_uma_dica':return own?{label:'🎭 Famoso misterioso',text:'Só você não sabe quem é. Leia as dicas e chute.'}:{label:'💡 Dica',text:'Mande UMA palavra que ajude o leitor a descobrir quem é.'};
  case'palavra_proibida':return own?{label:'🗣️ Explicador',text:'Explique a palavra em voz alta sem usar os termos proibidos.'}:{label:'🎯 Adivinho',text:'Ouça e digite seu palpite. O primeiro acerto vence.'};
  case'o_termometro':return own?{label:'🌡️ Dá a pista',text:'Fale uma pista que combine com o seu número secreto.'}:{label:'🎯 Adivinho',text:'Ouça a pista e chute o número de 1 a 10.'};
  case'duas_verdades_uma_mentira':return own?{label:'🎭 Mentiroso',text:'Apresente os três fatos com cara de paisagem.'}:{label:'🔎 Detetive',text:'Descubra qual dos três fatos é a mentira.'};
  case'preencha_a_lacuna':return own?{label:'⚖️ Juiz',text:'Espere as respostas e escolha a sua favorita.'}:{label:'🃏 Jogador',text:'Escolha o final que vai conquistar o juiz.'};
  case'batalha_de_argumentos':return c.debaters?.[0]===uid?{label:'🛡️ Defensor',text:'Defenda a frase da carta com unhas e dentes.'}:c.debaters?.[1]===uid?{label:'⚔️ Atacante',text:'Argumente CONTRA a frase da carta.'}:{label:'⚖️ Jurado',text:'Ouça os dois e vote no melhor argumento.'};
  case'caos_na_mesa':return own?{label:'🌪️ Juiz do caos',text:'Faça todos cumprirem a regra e marque quem ganhou ou perdeu.'}:{label:'🏃 Na disputa',text:'Cumpra a regra da carta agora!'};
  case'mimica':return own?{label:'🎬 Mímico',text:'Imite sem falar nada.'}:{label:'🎯 Adivinho',text:'Digite seu palpite. O primeiro acerto vence.'};
  case'vira_vira':return{label:'🍻 No brinde',text:'Se a carta é sobre você, você bebe (ou paga prenda).'};
  case'niveis_intimidade':case'verdade_ou_desafio_hot':return own?{label:'🔥 Na berlinda',text:'É com você: responda ou cumpra em voz alta.'}:{label:'👀 Plateia',text:'Cobre a resposta completa. Depois é a sua vez.'};
  default:return{label:own?'Leitor · vota também':'🗳️ Votante',text:'Escolha sua resposta antes de todo mundo.'};
 }
}
// Placar ordenado e títulos do fim da partida.
export const TITLES={onca:['🐆','Amigo da Onça','levou mais cartas maldosas'],goles:['🍻','Esponja da Noite','bebeu mais goles'],sabido:['🤓','Sabe-Tudo','acertou mais Fato ou Fake'],caos:['🌪️','Rei do Caos','venceu mais regras malucas'],holofote:['🔦','Holofote da Noite','mais votado nas cartas de votação'],ousadia:['😈','Sem Vergonha Oficial','mais "já fiz" e desafios cumpridos'],blefe:['🎭','Mestre do Blefe','enganou a mesa'],sintonia:['🧠','Leitor de Mentes','pensou igual à mesa'],sincero:['💬','Coração Aberto','respondeu sem fugir']};
export function ranking(room){return Object.keys(room.jogadores||{}).map(id=>({id,nome:room.jogadores[id].nome,avatar:room.jogadores[id].avatar,pontos:room.scores?.[id]||0})).sort((a,b)=>b.pontos-a.pontos||a.nome.localeCompare(b.nome));}
export function titles(room){const out=[];for(const [key,[icon,name,why]] of Object.entries(TITLES)){let best=null,max=0;for(const [id,s] of Object.entries(room.stats||{}))if(room.jogadores?.[id]&&(s[key]||0)>max){max=s[key];best=id;}if(best)out.push({icon,name,why,id:best,nome:room.jogadores[best].nome,count:max});}return out;}
