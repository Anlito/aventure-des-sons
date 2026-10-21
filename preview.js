let parentDemo=null,savedChildState=null;
const realSave=save,realTick=tick,realFeedback=feedback,realLeft=left,realExit=$('exit').onclick,realNext=$('next').onclick,realQAt=qAt,realParentCheck=$('parentCheck').onclick;
save=function(){if(!parentDemo)realSave()};
tick=function(){if(!parentDemo)realTick()};
left=function(){return parentDemo?999999:realLeft()};
qAt=function(){return parentDemo||realQAt()};
feedback=function(q,ok,oral=false){if(!parentDemo)return realFeedback(q,ok,oral);$('feedback').textContent=ok?'Bonne réponse !':'À retravailler. Tu peux recommencer.';$('next').textContent='Rejouer cet exemple ↻';$('next').classList.remove('hidden')};
function endDemo(){if(!parentDemo)return;parentDemo=null;if('speechSynthesis'in window)speechSynthesis.cancel();state=savedChildState;savedChildState=null;$('parentPage').classList.remove('hidden');document.querySelector('main').classList.add('hidden');$('play').classList.add('hidden');$('exit').textContent='← Accueil';showParentCatalog();sync();window.scrollTo(0,0)}
function beginDemo(q){if(!parentUnlocked)return;if(!savedChildState)savedChildState=state;state=Object.assign({},savedChildState,{index:0,seconds:0,completed:false,plan:[q],mastery:{},lastSeen:{},answers:[]});parentDemo=q;$('parentPage').classList.add('hidden');document.querySelector('main').classList.remove('hidden');$('exit').textContent='← Retour aux exemples';show('play');render();$('counter').textContent='DÉMONSTRATION';$('mode').textContent=names[q.mode];$('gameProgress').style.width='0%';if(q.mode==='oral'){$('adultButtons').classList.remove('hidden');$('parentCheck').classList.add('hidden')}}
$('exit').onclick=function(){if(parentDemo)endDemo();else realExit()};
$('next').onclick=function(){if(parentDemo){beginDemo(parentDemo);return}realNext()};
$('parentCheck').onclick=function(){if(parentDemo){$('adultButtons').classList.remove('hidden');return}realParentCheck()};
const realCatalog=showParentCatalog;
showParentCatalog=function(){realCatalog();if(!parentUnlocked)return;const cards=[...$('parentCatalog').querySelectorAll('.catalog-item')];Object.keys(names).forEach((mode,i)=>{const q=ALL.find(x=>x.mode===mode),card=cards[i];if(!q||!card)return;const b=document.createElement('button');b.className='primary';b.type='button';b.textContent='▶ Essayer comme l’enfant';b.style.width='100%';b.style.marginTop='8px';b.onclick=()=>beginDemo(q);card.append(b);if(mode==='cousinFill'){const complex=ALL.find(x=>x.mode==='cousinFill'&&x.w);if(complex){const c=document.createElement('button');c.className='secondary';c.type='button';c.textContent='▶ Essayer avec un son complexe';c.style.width='100%';c.style.marginTop='8px';c.onclick=()=>beginDemo(complex);card.append(c)}}})};
