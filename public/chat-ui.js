export function mountChat({send,getIdentity}){
 const dialog=document.createElement('dialog');dialog.id='chat-panel';dialog.setAttribute('aria-labelledby','chat-title');
 dialog.innerHTML='<header><div><span class="eyebrow">CONVERSA DA SALA</span><h2 id="chat-title">Bate-papo</h2></div><button type="button" id="chat-close" aria-label="Fechar bate-papo">×</button></header><p class="chat-note">As últimas 60 mensagens ficam nesta sala.</p><ol id="chat-messages" aria-label="Mensagens" aria-live="polite" aria-relevant="additions"></ol><p id="chat-empty">Puxe uma conversa com a mesa.</p><form id="chat-form"><label class="sr-only" for="chat-input">Sua mensagem</label><textarea id="chat-input" rows="2" maxlength="300" placeholder="Digite uma mensagem…" required></textarea><div class="chat-compose"><small id="chat-counter">0 / 300</small><button type="submit" class="primary">Enviar →</button></div><p id="chat-error" role="alert"></p></form>';
 document.body.append(dialog);const list=dialog.querySelector('ol'),input=dialog.querySelector('textarea'),form=dialog.querySelector('form'),error=dialog.querySelector('#chat-error');
 let roomKey='',seen=new Set(),unread=0,ready=false,busy=false,pending=null,lastKey='',initialized=false;
 const buttons=[...document.querySelectorAll('[data-chat]')];
 function badge(){buttons.forEach(b=>{b.setAttribute('aria-expanded',String(dialog.open));b.querySelector('.chat-count').textContent=unread?String(unread):'';});}
 function open(){if(!ready)return;unread=0;badge();if(!dialog.open){if(matchMedia('(max-width: 800px)').matches)dialog.showModal();else dialog.show();}badge();list.scrollTop=list.scrollHeight;input.focus();}
 buttons.forEach(b=>b.onclick=()=>dialog.open?dialog.close():open());dialog.querySelector('#chat-close').onclick=()=>dialog.close();dialog.addEventListener('close',badge);
 input.oninput=()=>{dialog.querySelector('#chat-counter').textContent=input.value.length+' / 300';};
 form.onsubmit=async e=>{e.preventDefault();const text=input.value.trim();if(!ready||busy||!text)return;busy=true;error.textContent='';const key=roomKey;
  if(!pending||pending.text!==text)pending={text,id:crypto.randomUUID()};form.querySelector('button').disabled=true;
  try{await send(text,pending.id);if(key===roomKey){input.value='';input.oninput();pending=null;}}
  catch(e){if(key===roomKey)error.textContent=e.message||'Não foi possível enviar. Tente novamente.';}
  finally{busy=false;form.querySelector('button').disabled=!ready;}
 };
 return {update(room,code){
  ready=!!room&&!room.local;
  buttons.forEach(b=>b.hidden=!ready);
  if(!ready){dialog.close();roomKey='';seen.clear();lastKey='';return;}
  // A host change doesn't clear the conversation; the room code identifies this session.
  const session=code;
  if(roomKey!==session){roomKey=session;seen.clear();unread=0;pending=null;input.value='';input.oninput();list.replaceChildren();lastKey='';initialized=false;error.textContent='';}
  const messages=room.chat||[],snapshot=JSON.stringify(messages),initial=!initialized;
  if(snapshot!==lastKey){const atBottom=list.scrollHeight-list.scrollTop-list.clientHeight<70;const fresh=messages.filter(m=>!seen.has(m.id));
   for(const m of fresh){seen.add(m.id);const li=document.createElement('li');li.dataset.id=m.id;li.className=m.uid===getIdentity()?'mine':'';const author=document.createElement('strong'),body=document.createElement('p'),time=document.createElement('time');author.textContent=(m.emoji||'🙂')+' '+m.name;body.textContent=m.text;time.textContent=new Date(m.at).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});li.append(author,body,time);list.append(li);if(!dialog.open&&!initial&&m.uid!==getIdentity())unread++;}
   const current=new Set(messages.map(m=>m.id));for(const li of [...list.children])if(!current.has(li.dataset.id))li.remove();seen=new Set(messages.map(m=>m.id));if(atBottom)list.scrollTop=list.scrollHeight;lastKey=snapshot;
  }
  initialized=true;dialog.querySelector('#chat-empty').hidden=messages.length>0;form.querySelector('button').disabled=busy;badge();
 }};
}
