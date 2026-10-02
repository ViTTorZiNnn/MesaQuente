// Avatar em qualquer lugar do jogo: emoji, ilustração do pacote ou imagem por URL (com posição e zoom).
// O efeito 3D (brilho, borda e sombra) vem do CSS da classe .av3d.
export function pintarAvatar(n,a){a=a||{};n.classList.add('av3d');n.style.backgroundColor=a.cor||'#e3101f';n.style.backgroundImage='';
 if(a.img){const im=document.createElement('img');im.className='av-img';im.alt='';im.draggable=false;im.referrerPolicy='no-referrer';im.src=a.img;
  im.style.objectPosition=(a.x??50)+'% '+(a.y??50)+'%';im.style.transform='scale('+(a.z||1)+')';im.style.transformOrigin=(a.x??50)+'% '+(a.y??50)+'%';
  im.onerror=()=>{n.replaceChildren();n.textContent=a.emoji||'🙂';};n.classList.add('com-img');n.replaceChildren(im);}
 else{n.classList.remove('com-img');n.replaceChildren();n.textContent=a.emoji||'🙂';}
 return n;}
export function avatarSpan(a,cls){const s=document.createElement('span');if(cls)s.className=cls;return pintarAvatar(s,a);}
// Texto curto para botões e listas: emoji ou nada (quando é imagem).
export const avatarTexto=a=>a?.img?'':(a?.emoji||'');
