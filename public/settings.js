import {mountVisualControls,reducedMotion} from './visual.js?v=mesaviva06';
import {mountAudioControls} from './som.js?v=mesaviva06';
export function mountSettings(audio){
 const dialog=document.createElement('dialog');dialog.id='settings';
 dialog.innerHTML='<header><h2>Configurações</h2><button type="button" aria-label="Fechar configurações">×</button></header><div class="dialog-scroll settings-sections"><section id="settings-visual"></section><section id="settings-audio"></section></div>';
 document.body.append(dialog);
 mountVisualControls(dialog.querySelector('#settings-visual'));
 mountAudioControls(audio,dialog.querySelector('#settings-audio'));
 dialog.querySelector('header button').onclick=()=>dialog.close();
 const refresh=()=>{dialog.querySelector('#graphics-status').textContent=(document.querySelector('#stage')?.dataset.renderer||'Mesa 3D carregada ao iniciar a partida')+' · '+(reducedMotion()?'Movimento reduzido':'Animações ativadas');};
 window.addEventListener('mq-visual',refresh);
 document.querySelectorAll('[data-settings]').forEach(button=>button.onclick=()=>{refresh();dialog.showModal();
 });
}
