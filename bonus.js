/* Question bonus isolée du parcours et des récompenses. */
const BONUS_KEY='sons_bonus_daily_v1';
let bonusActive=false,bonusQuestion=null,bonusSavedState=null,bonusLastId=null;
const bonusOriginal={save, tick, left, qAt, feedback, home, sync, exit:$('exit').onclick, next:$('next').onclick, skip:$('skipOral').onclick, check:$('parentCheck').onclick};
const bonusDate=()=>new Date().toLocaleDateString('en-CA');
function bonusPlayed(){return localStorage.getItem(BONUS_KEY)===bonusDate()}
function bonusButton(){
 const button=$('bonusStart'),status=$('bonusStatus');
 if(!button)return;
 const blocked=!testMode&&(bonusPlayed()||left()<=0);
 button.disabled=blocked;
 button.textContent=testMode?'🎲 Nouvelle question aléatoire':bonusPlayed()?'✓ Bonus du jour terminé':'🎲 Jouer la question bonus';
 status.textContent=testMode?'Mode test : questions bonus illimitées, sans effet sur les résultats.':bonusPlayed()?'Reviens demain pour une autre question surprise.':left()<=0?'Le temps de jeu du jour est écoulé.':'Une question bonus par jour, sans points ni étoiles.';
}
save=function(){if(!bonusActive)bonusOriginal.save()};
tick=function(){if(bonusActive)return;bonusOriginal.tick()};
left=function(){return bonusActive?999999:bonusOriginal.left()};
qAt=function(){return bonusActive?bonusQuestion:bonusOriginal.qAt()};
feedback=function(q,ok,oral=false){
 if(!bonusActive)return bonusOriginal.feedback(q,ok,oral);
 $('feedback').textContent=ok?'Bravo ! Question surprise réussie.':'Bien essayé ! Tu peux réessayer demain.';
 $('next').textContent=testMode?'🎲 Une autre question':'Retour à l’accueil';
 $('next').classList.remove('hidden');
};
function stopBonus(){
 if(!bonusActive)return;
 bonusActive=false;bonusQuestion=null;
 if('speechSynthesis'in window)speechSynthesis.cancel();
 state=bonusSavedState;bonusSavedState=null;
 $('exit').textContent='← Accueil';
 $('next').textContent='Question suivante →';
 $('play').classList.add('hidden');
 bonusOriginal.home();
 bonusButton();
}
function startBonus(){
 if(parentDemo||bonusActive)return;
 if(!testMode&&(bonusPlayed()||bonusOriginal.left()<=0)){bonusButton();return}
 const options=ALL.filter(q=>q.id!==bonusLastId);
 bonusQuestion=options[Math.floor(Math.random()*options.length)];
 bonusLastId=bonusQuestion.id;
 bonusSavedState=state;
 state=Object.assign({},bonusSavedState,{index:0,seconds:0,completed:false,plan:[bonusQuestion],points:0,answers:[],mastery:{...bonusSavedState.mastery},lastSeen:{...bonusSavedState.lastSeen}});
 bonusActive=true;
 if(!testMode)localStorage.setItem(BONUS_KEY,bonusDate());
 show('play');render();
 $('counter').textContent='BONUS';
 $('mode').textContent=names[bonusQuestion.mode];
 $('gameProgress').style.width='0%';
 $('exit').textContent='← Quitter le bonus';
 if(bonusQuestion.mode==='oral'&&testMode){$('adultButtons').classList.remove('hidden');$('parentCheck').classList.add('hidden')}
}
$('bonusStart').onclick=startBonus;
$('exit').onclick=function(){if(bonusActive)stopBonus();else bonusOriginal.exit()};
$('next').onclick=function(){if(bonusActive){if(testMode){stopBonus();startBonus()}else stopBonus();return}bonusOriginal.next()};
$('skipOral').onclick=function(){
 if(!bonusActive)return bonusOriginal.skip();
 if(answered)return;
 answered=true;
 $('feedback').textContent='Lecture passée, sans pénalité.';
 $('next').textContent=testMode?'🎲 Une autre question':'Retour à l’accueil';
 $('next').classList.remove('hidden');
};
$('parentCheck').onclick=function(){if(bonusActive&&testMode){$('adultButtons').classList.remove('hidden');return}bonusOriginal.check()};
home=function(){bonusOriginal.home();bonusButton()};
bonusButton();
