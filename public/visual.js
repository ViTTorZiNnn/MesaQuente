export const BUILD='MESA QUENTE 12 · BOTECO';
const get=(key,fallback)=>{try{return localStorage.getItem(key)||fallback;}catch{return fallback;}};
// Um único cenário: o boteco. A escolha de cenários antigos foi removida.
export const visual={scene:'boteco',motion:get('mq_motion','auto')};
export function reducedMotion(){return visual.motion==='off'||visual.motion==='auto'&&matchMedia('(prefers-reduced-motion: reduce)').matches;}
export function setVisual(key,value){if(key==='scene')value='boteco';visual[key]=value;try{localStorage.setItem('mq_'+key,value);}catch{}document.documentElement.dataset.scene='boteco';document.documentElement.dataset.motion=reducedMotion()?'off':'on';window.dispatchEvent(new Event('mq-visual'));}
setVisual('motion',visual.motion);
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',()=>setVisual('motion',visual.motion));
export function mountVisualControls(container){
 const dialog=container||document.createElement('dialog');dialog.id='visual-settings';dialog.innerHTML='<header><h2>Movimento</h2><button type="button" aria-label="Fechar ajustes">×</button></header><div class="dialog-scroll"><label for="motion-choice">Animações</label><select id="motion-choice"><option value="auto">Seguir preferência do aparelho</option><option value="on">Ativadas</option><option value="off">Desativadas</option></select><p id="graphics-status" role="status"></p><small>Versão '+BUILD+'</small></div>';
 if(!container)document.body.append(dialog);dialog.querySelector('button').onclick=()=>dialog.closest('dialog')?.close();
 const s=dialog.querySelector('#motion-choice');s.value=visual.motion;s.onchange=()=>setVisual('motion',s.value);
 document.querySelectorAll('[data-visual-settings]').forEach(b=>b.onclick=()=>{dialog.querySelector('#graphics-status').textContent=(reducedMotion()?'Movimento reduzido':'Animações ativadas');dialog.showModal();});
}
