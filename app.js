
const chestSprites=['assets/illustration-01.webp', 'assets/illustration-02.webp', 'assets/illustration-03.webp', 'assets/illustration-04.webp', 'assets/illustration-05.webp', 'assets/illustration-06.webp', 'assets/illustration-07.webp', 'assets/illustration-08.webp'];
const dragonSprite='assets/illustration-09.webp';
const worldImages=['assets/illustration-10.jpg', 'assets/illustration-11.jpg', 'assets/illustration-12.jpg', 'assets/illustration-13.jpg', 'assets/illustration-14.jpg', 'assets/illustration-15.jpg'];

const $=id=>document.getElementById(id), TEST_FLAG='sons_parent_test_mode', testMode=localStorage.getItem(TEST_FLAG)==='1', KEY=testMode?'sons_parent_test_data':'sons_v8_20_daily', DAY=()=>new Date().toLocaleDateString('en-CA'), LIMIT=600;
const worlds=['La forêt des sons','La grotte des lettres','La rivière des syllabes','Le village des mots','Le château des phrases','Le royaume des histoires'];
const names={gap:'Mot à trous',grapheme:'Sons et lettres',hunt:'Chasse au son',oral:'Lecture à voix haute',syllable:'Syllabes',sentence:'Compréhension',mirror:'Lettres miroirs',listenWord:'J’écoute un mot',listenPart:'J’écoute un son',soundMatch:'Même son ?',blend:'J’assemble à l’oreille',match:'Je relie',order:'Je remets en ordre',type:'J’écris',cousinFill:'J’écoute et je complète'};
const vocab=`bateau|bat__|eau|⛵|ba · teau;chapeau|chap__|eau|🎩|cha · peau;cadeau|cad__|eau|🎁|ca · deau;oiseau|ois__|eau|🐦|oi · seau;gâteau|gât__|eau|🎂|gâ · teau;château|chât__|eau|🏰|châ · teau;manteau|mant__|eau|🧥|man · teau;tableau|tabl__|eau|🖼️|ta · bleau;marteau|mart__|eau|🔨|mar · teau;drapeau|drap__|eau|🚩|dra · peau;lapin|lap__|in|🐰|la · pin;jardin|jard__|in|🌷|jar · din;sapin|sap__|in|🌲|sa · pin;matin|mat__|in|🌅|ma · tin;chemin|chem__|in|🛤️|che · min;moulin|moul__|in|🌬️|mou · lin;raisin|rais__|in|🍇|rai · sin;requin|requ__|in|🦈|re · quin;poussin|pouss__|in|🐥|pous · sin;voisin|vois__|in|🏠|voi · sin;poisson|p__sson|oi|🐟|poi · sson;voiture|v__ture|oi|🚗|voi · ture;étoile|ét__le|oi|⭐|é · toile;poire|p__re|oi|🍐|poi · re;boîte|b__te|oi|📦|boî · te;roi|r__|oi|👑|roi;trois|tr__s|oi|3️⃣|trois;oiseau|__seau|oi|🐦|oi · seau;toit|t__t|oi|🏠|toit;noix|n__x|oi|🌰|noix;loup|l__p|ou|🐺|loup;poule|p__le|ou|🐔|pou · le;souris|s__ris|ou|🐭|sou · ris;route|r__te|ou|🛣️|rou · te;roue|r__e|ou|🛞|roue;mouton|m__ton|ou|🐑|mou · ton;bougie|b__gie|ou|🕯️|bou · gie;soupe|s__pe|ou|🥣|sou · pe;fourmi|f__rmi|ou|🐜|four · mi;couleur|c__leur|ou|🎨|cou · leur;pont|p__t|on|🌉|pont;ballon|ball__|on|🎈|ba · llon;bonbon|bonb__|on|🍬|bon · bon;citron|citr__|on|🍋|ci · tron;cochon|coch__|on|🐷|co · chon;maison|mais__|on|🏠|mai · son;avion|avi__|on|✈️|a · vion;lion|li__|on|🦁|lion;melon|mel__|on|🍈|me · lon;bouton|bout__|on|🔘|bou · ton;maman|mam__|an|👩|ma · man;panda|p__da|an|🐼|pan · da;chanson|ch__son|an|🎵|chan · son;orange|or__ge|an|🍊|o · range;gant|g__t|an|🧤|gant;dent|d__t|en|🦷|dent;vent|v__t|en|💨|vent;serpent|serp__t|en|🐍|ser · pent;enfant|__fant|en|🧒|en · fant;temps|t__ps|em|⏰|temps;lampe|l__pe|am|💡|lam · pe;maison|m__son|ai|🏠|mai · son;lait|l__t|ai|🥛|lait;balai|bal__|ai|🧹|ba · lai;chaise|ch__se|ai|🪑|chai · se;fraise|fr__se|ai|🍓|frai · se;neige|n__ge|ei|❄️|nei · ge;reine|r__ne|ei|👸|rei · ne;seize|s__ze|ei|1️⃣6️⃣|seize;peine|p__ne|ei|😟|pei · ne;chou|__ou|ch|🥬|chou;chat|__at|ch|🐈|chat;cheval|__eval|ch|🐎|che · val;chien|__ien|ch|🐕|chien;champignon|__ampignon|ch|🍄|cham · pi · gnon;montagne|monta__e|gn|⛰️|mon · ta · gne;ligne|li__e|gn|📏|li · gne;peigne|pei__e|gn|🪮|pei · gne;coin|c__|oin|📐|coin;loin|l__|oin|🏞️|loin;point|p__t|oin|📍|point;pingouin|ping__|ouin|🐧|pin · gouin;oui|__|oui|👍|oui;parfum|parf__|um|🌸|par · fum;un|__|un|1️⃣|un;clé|cl__|é|🔑|clé;bébé|b__b__|é|👶|bé · bé;été|__t__|é|☀️|é · té;père|p__re|è|👨|père;mère|m__re|è|👩|mère;chèvre|ch__vre|è|🐐|chè · vre`.split(';').map((line,i)=>{let [word,mask,part,emoji,split]=line.split('|');return{id:'w'+i,word,mask,part,emoji,split}});
const stories=[
['Le chat dort sur le coussin.','Où dort le chat ?','Sur le coussin','Dans le jardin','Sur le toit','Dans la voiture'],
['Le bateau jaune traverse la rivière.','De quelle couleur est le bateau ?','Jaune','Rouge','Vert','Bleu'],
['Le lapin mange une carotte.','Que mange le lapin ?','Une carotte','Une poire','Une pomme','Un gâteau'],
['Le dragon cache un livre dans le coffre.','Que cache le dragon ?','Un livre','Une clé','Un ballon','Un bonbon'],
['Le poisson nage sous le pont.','Où nage le poisson ?','Sous le pont','Dans un arbre','Sur le toit','Sur la route'],
['Léo met son manteau car il pleut.','Pourquoi met-il son manteau ?','Parce qu’il pleut','Parce qu’il a faim','Parce qu’il dort','Parce qu’il nage'],
['Mila a trois billes et en donne une à Tom.','Combien de billes Mila garde-t-elle ?','Deux','Une','Trois','Quatre'],
['Le chien noir court derrière le ballon.','Quel animal court ?','Le chien','Le chat','Le lapin','Le lion'],
['La reine porte une couronne dorée.','Que porte la reine ?','Une couronne','Un chapeau','Un manteau','Un sac'],
['Le vent fait tourner les ailes du moulin.','Qu’est-ce qui fait tourner les ailes ?','Le vent','La pluie','Le soleil','Le poisson'],
['Un oiseau chante sur une branche.','Où se trouve l’oiseau ?','Sur une branche','Sous la table','Dans une boîte','Dans l’eau'],
['Le matin, Hugo prend son petit déjeuner.','Quand Hugo mange-t-il ?','Le matin','Le soir','La nuit','À midi'],
['Le train arrive après le bus.','Quel véhicule arrive en dernier ?','Le train','Le bus','Le vélo','La voiture'],
['Nina range son livre dans son sac.','Que range Nina ?','Son livre','Son ballon','Sa chaussure','Sa tasse'],
['Le jardin a cinq fleurs rouges.','Combien de fleurs rouges y a-t-il ?','Cinq','Deux','Trois','Six'],
['La poule protège ses poussins.','Qui protège les poussins ?','La poule','Le loup','Le lapin','Le poisson'],
['Le gâteau est sur la table de la cuisine.','Où est le gâteau ?','Sur la table','Dans le jardin','Dans le sac','Sous le lit'],
['Le cheval blanc boit de l’eau.','De quelle couleur est le cheval ?','Blanc','Noir','Gris','Marron'],
['Le soleil brille et Zoé met ses lunettes.','Que met Zoé ?','Ses lunettes','Ses bottes','Son bonnet','Son manteau'],
['Paul a oublié son parapluie sous la pluie.','Qu’a oublié Paul ?','Son parapluie','Son livre','Son vélo','Son chapeau']
];
const soundFamilies=[
 ['ou','loup','poule','souris','route'],['on','pont','ballon','cochon','mouton'],
 ['an','maman','panda','chanson','orange'],['en','vent','dent','enfant','serpent'],
 ['in','lapin','sapin','jardin','matin'],['oi','poisson','voiture','étoile','poire'],
 ['oin','coin','point','loin','besoin'],['ouin','pingouin','babouin','marsouin','pingouin'],
 ['oui','oui','Louis','ouistiti','oui'],['ai','lait','maison','fraise','balai'],
 ['ei','neige','reine','peine','seize'],['eau','bateau','chapeau','cadeau','oiseau'],
 ['ch','chat','cheval','chien','chou'],['gn','montagne','ligne','peigne','champignon']
];
const cousinWords=[
 ['bateau','_ateau','b','🚤'],['ballon','_allon','b','🎈'],['banane','_anane','b','🍌'],['bouche','_ouche','b','👄'],['bébé','_ébé','b','👶'],['banc','_anc','b','🪑'],
 ['poule','_oule','p','🐔'],['poisson','_oisson','p','🐟'],['pomme','_omme','p','🍎'],['pain','_ain','p','🍞'],['panda','_anda','p','🐼'],['pont','_ont','p','🌉'],
 ['dinde','_inde','d','🦃'],['dent','_ent','d','🦷'],['douche','_ouche','d','🚿'],['domino','_omino','d','🎲'],['dauphin','_auphin','d','🐬'],['dé','_é','d','🎲'],
 ['quatre','_uatre','q','4️⃣'],['quille','_uille','q','🎳'],['question','_uestion','q','❓'],['quinze','_uinze','q','1️⃣5️⃣'],['queue','_ueue','q','🐈'],['quand','_uand','q','🕒'],
 ['robe','ro_e','b','👗'],['arbre','ar_re','b','🌳'],['table','ta_le','b','🪑'],['corde','cor_e','d','🪢'],['radis','ra_is','d','🥬'],['rapide','ra_ide','p','🏃']
];
const blendItems=[['cha','peau','chapeau'],['ba','teau','bateau'],['la','pin','lapin'],['mou','lin','moulin'],['poi','sson','poisson'],['mai','son','maison'],['jar','din','jardin'],['che','min','chemin'],['chan','son','chanson'],['bou','gie','bougie'],['co','chon','cochon'],['ma','man','maman']];
const choices=['ou','on','an','en','in','un','ai','ei','oi','oin','ouin','oui','eau','au','ch','gn','é','è','am','em','um'];
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function dayNumber(){return Math.floor(new Date().setHours(0,0,0,0)/86400000)}
function blank(){return{date:DAY(),seconds:0,points:0,index:0,plan:[],completed:false,stars:0,earned:0,spent:0,mastery:{},lastSeen:{},chests:[],rewards:['Choisir une friandise','15 min de jeu bonus hors de cette application','Choisir un livre','Une activité ou sortie en famille']}}
let state;try{state=Object.assign(blank(),JSON.parse(localStorage.getItem(KEY)||'{}'))}catch{state=blank()}
for(let k of ['mastery','lastSeen'])if(!state[k]||typeof state[k]!=='object')state[k]={};
if(!Array.isArray(state.chests))state.chests=[];
if(!Array.isArray(state.rewards))state.rewards=blank().rewards;
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}}
function balance(){return Math.max(0,(state.earned||0)-(state.spent||0))}
function left(){return testMode?999999:Math.max(0,LIMIT-state.seconds)}
function pool(){let all=[];
 for(let w of vocab){
 let others=shuffle(choices.filter(c=>c!==w.part && !(w.part==='an'&&c==='en')&&!(w.part==='en'&&c==='an'))).slice(0,3);
 all.push({id:'g'+w.id,mode:'gap',w:w.id,options:shuffle([w.part,...others])});
 all.push({id:'o'+w.id,mode:'oral',w:w.id});
 all.push({id:'h'+w.id,mode:'hunt',w:w.id});
 all.push({id:'s'+w.id,mode:'syllable',w:w.id});
 all.push({id:'ty'+w.id,mode:'type',w:w.id});
 }
 for(let i=0;i<cousinWords.length;i++)all.push({id:'cf'+i,mode:'cousinFill',cousin:i});
 for(let i=0;i<soundFamilies.length;i++){
 all.push({id:'lp'+i,mode:'listenPart',family:i});
 all.push({id:'sm'+i,mode:'soundMatch',family:i});
}
for(let i=0;i<vocab.length;i++)all.push({id:'lw'+i,mode:'listenWord',w:vocab[i].id});
for(let i=0;i<blendItems.length;i++){all.push({id:'bl'+i,mode:'blend',blend:i});all.push({id:'or'+i,mode:'order',blend:i})}
for(let i=0;i<soundFamilies.length;i++)all.push({id:'ma'+i,mode:'match',family:i});
 for(let i=0;i<stories.length;i++)all.push({id:'t'+i,mode:'sentence',story:i});
 for(let x of ['b','d','p','q'])all.push({id:'m'+x,mode:'mirror',letter:x});
 for(let x of ['ou','on','an','en','oi','oin','ouin','oui','ai','ei','in','un','eau','ch','gn','é','è'])all.push({id:'r'+x,mode:'grapheme',part:x});
 return all}
const ALL=pool();
function makePlan(){let n=dayNumber();let randomSeed=n*127+391;function rng(){randomSeed=(Math.imul(randomSeed,1664525)+1013904223)>>>0;return randomSeed/4294967296}
 let target={gap:3,oral:2,hunt:1,syllable:1,sentence:1,mirror:1,grapheme:1,listenWord:2,listenPart:1,soundMatch:1,blend:1,match:1,order:1,type:1,cousinFill:2},plan=[];
 for(let mode of Object.keys(target)){
 let cand=ALL.filter(x=>x.mode===mode).map(x=>{let mastery=state.mastery[x.id]||0,last=state.lastSeen[x.id]||0;let due=n-last>=Math.max(1,Math.min(7,mastery+1));let weight=(mastery<0?5:mastery===0?2:1)+(due?3:0)+(n-last>2?2:0)+rng()*3;return{x,weight}}).sort((a,b)=>b.weight-a.weight);
 plan.push(...cand.slice(0,target[mode]).map(y=>y.x))}
 // Shuffle with stable daily seed; plan saved so refresh never changes it.
 for(let i=plan.length-1;i>0;i--){let j=Math.floor(rng()*(i+1));[plan[i],plan[j]]=[plan[j],plan[i]]}return plan}
function ensureDay(){if(state.date!==DAY()){state.date=DAY();state.seconds=0;state.points=0;state.index=0;state.completed=false;state.plan=[]}if(!state.plan||state.plan.length!==20)state.plan=makePlan();save()}
ensureDay();
function qAt(){return state.plan[state.index]}
function vWord(q){return vocab[Number(q.w.slice(1))]}
function sync(){let n=Math.ceil(left());$('clock').textContent=testMode?'∞ TEST':String(Math.floor(n/60)).padStart(2,'0')+':'+String(n%60).padStart(2,'0');$('dayLabel').textContent='Défi '+Math.min(20,state.index+1)+'/20';$('scoreLabel').textContent=state.points+' pts';$('starsLabel').textContent=testMode?'TEST · sans étoiles':balance()+' ⭐'}
function show(id){for(let p of ['home','play','end'])$(p).classList.toggle('hidden',p!==id);sync();window.scrollTo(0,0)}
function home(){show('home');$('intro').textContent=testMode?'Mode test parent : 20 questions par série, autant de séries que souhaité. Aucun impact sur les récompenses de l’enfant.':state.completed?'Parcours terminé ! Reviens demain pour 20 nouvelles questions adaptées.':'Aujourd’hui : 20 défis avec écoute, associations de sons, mots à trous, lecture orale et compréhension. Active le son de la tablette.';$('homeProgress').style.width=(state.index/20*100)+'%';$('homeCount').textContent=state.index+' questions sur 20 terminées';$('start').textContent=testMode&&state.completed?'Nouvelle série de 20 questions':state.completed?'Parcours terminé':state.index?'Reprendre mon parcours':'Commencer mes 20 questions';$('start').disabled=!testMode&&(state.completed||left()<=0);$('worlds').replaceChildren();worlds.forEach((x,i)=>{let d=document.createElement('div'),img=document.createElement('img');img.src=worldImages[i];img.alt='';let t=document.createElement('div');t.textContent=x;d.append(img,t);$('worlds').append(d)});renderChests();$('parentStats').textContent='Banque : '+balance()+' étoiles · '+Object.keys(state.mastery).length+' exercices suivis · '+ALL.length+' exercices dans la banque.'}
let startTime=0,answered=false,gateExpected=0,gateFails=0,hadHint=false;
function play(){if(testMode&&state.completed){state.completed=false;state.index=0;state.points=0;state.plan=makePlan();save()}if(state.completed||left()<=0){home();return}show('play');render()}
function render(){if(state.index>=20){finish();return}if(left()<=0){timeUp();return}let q=qAt(),w=q.w?vWord(q):null;answered=false;hadHint=false;startTime=performance.now();$('counter').textContent=(state.index+1)+'/20';$('mode').textContent=names[q.mode];$('scene').src=worldImages[(state.index+dayNumber())%6];$('gameProgress').style.width=(state.index/20*100)+'%';$('feedback').textContent='';$('next').classList.add('hidden');$('choices').replaceChildren();$('interactive').replaceChildren();$('interactive').classList.add('hidden');$('oral').classList.toggle('hidden',q.mode!=='oral');$('gate').classList.add('hidden');$('adultButtons').classList.toggle('hidden',!(testMode&&q.mode==='oral'));$('parentCheck').classList.toggle('hidden',testMode&&q.mode==='oral');$('audio').classList.add('hidden');$('hint').classList.add('hidden');$('picture').classList.add('hidden');$('question').textContent='';$('word').textContent='';$('instruction').textContent='';
 let options=[],correct='';
 if(q.mode==='gap'){
 let level=state.mastery[q.id]||0;let phase=level<=0?'image':level<2?'audio':'independent';$('instruction').textContent=phase==='image'?'Regarde l’image et complète le mot.':phase==='audio'?'Écoute le mot, puis complète-le.':'Complète le mot. Demande un indice si besoin.';$('word').textContent=w.mask;
 if(phase==='image'){$('picture').textContent=w.emoji;$('picture').classList.remove('hidden')}
 if(phase==='audio'){$('audio').classList.remove('hidden');$('question').textContent='Appuie sur Écouter pour entendre le mot.'}
 if(phase==='independent'){$('hint').classList.remove('hidden');$('question').textContent='Essaie sans aide.'}
 options=q.options;correct=w.part;
 }else if(q.mode==='oral'){$('instruction').textContent=testMode?'Mode test : lis le mot et valide directement.':'Lis ce mot à voix haute devant ton parent.';$('word').textContent=w.word;$('hint').classList.remove('hidden');$('question').textContent='Appuie sur « Voir un indice » pour le découpage.'}
 else if(q.mode==='hunt'){$('instruction').textContent='Retrouve le mot qui contient ces lettres.';$('word').textContent=w.part;$('question').textContent='Quel mot contient « '+w.part+' » ?';correct=w.word;let distract=shuffle(vocab.filter(x=>x.word!==w.word&&!x.word.includes(w.part)).map(x=>x.word));options=shuffle([correct,...new Set(distract)].slice(0,4));}
 else if(q.mode==='syllable'){$('instruction').textContent='Quel mot lis-tu ?';$('word').textContent=w.split;$('question').textContent='Assemble les syllabes.';correct=w.word;let distract=shuffle(vocab.filter(x=>x.word!==w.word).map(x=>x.word));options=shuffle([correct,...new Set(distract)].slice(0,4));}
 else if(q.mode==='sentence'){let t=stories[q.story];$('instruction').textContent='Lis la phrase puis réponds.';$('word').style.fontSize='clamp(1.5rem,5vw,2.4rem)';$('word').textContent=t[0];$('question').textContent=t[1];correct=t[2];options=shuffle(t.slice(2));}
 else if(q.mode==='listenWord'){
 $('instruction').textContent='Écoute le mot, puis retrouve son écriture. Ne te fie pas seulement à l’image.';
 $('word').textContent='🎧';$('audio').classList.remove('hidden');$('question').textContent='Appuie sur Écouter. Quel mot entends-tu ?';
 correct=w.word;let other=shuffle([...new Set(vocab.filter(x=>x.word!==correct).map(x=>x.word))]).slice(0,3);options=shuffle([correct,...other]);
 }
 else if(q.mode==='listenPart'){
 let f=soundFamilies[q.family];$('instruction').textContent='Écoute le mot-repère, puis retrouve les lettres du son à apprendre.';
 $('word').textContent='🎧';$('audio').classList.remove('hidden');$('question').textContent='Dans « '+f[1]+' », quelles lettres forment le son étudié ?';
 correct=f[0];options=shuffle([correct,...shuffle(choices.filter(x=>x!==correct)).slice(0,3)]);
 }
 else if(q.mode==='soundMatch'){
 let f=soundFamilies[q.family];$('instruction').textContent='Écoute le mot-repère. Quel autre mot contient les mêmes lettres ?';
 $('word').textContent='🎧';$('audio').classList.remove('hidden');$('question').textContent='Cherche les mêmes lettres que dans « '+f[1]+' ».';
 correct=f[2];let other=shuffle([...new Set(vocab.filter(x=>!x.word.includes(f[0])&&x.word!==correct).map(x=>x.word))]).slice(0,3);options=shuffle([correct,...other]);
 }
 else if(q.mode==='blend'){
 let f=blendItems[q.blend];$('instruction').textContent='Écoute le mot prononcé lentement, puis retrouve son écriture.';
 $('word').textContent='🎧';$('audio').classList.remove('hidden');$('question').textContent='Écoute le mot et choisis la bonne réponse.';
 correct=f[2];let other=shuffle([...new Set(vocab.filter(x=>x.word!==correct).map(x=>x.word))]).slice(0,3);options=shuffle([correct,...other]);
 }

 else if(q.mode==='type'){
 $('instruction').textContent='Écoute le mot et écris-le au clavier. Les accents comptent.';
 $('word').textContent='⌨️';$('audio').classList.remove('hidden');
 $('question').textContent='Quel mot entends-tu ?';
 $('interactive').classList.remove('hidden');
 const inp=document.createElement('input');inp.type='text';inp.autocomplete='off';inp.autocapitalize='none';inp.spellcheck=false;inp.placeholder='Écris le mot';inp.setAttribute('aria-label','Mot à écrire');inp.style.cssText='width:100%;padding:14px;border:2px solid #cbd7f4;border-radius:12px;font-size:1.4rem';
 const submit=document.createElement('button');submit.textContent='Valider mon mot';submit.className='primary';submit.style.marginTop='10px';
 submit.onclick=()=>{if(answered)return;let typed=inp.value.trim().toLocaleLowerCase('fr');if(!typed)return;inp.disabled=true;submit.disabled=true;answered=true;feedback(q,typed===w.word.toLocaleLowerCase('fr'));if(typed!==w.word.toLocaleLowerCase('fr'))$('feedback').textContent+=' Le mot était : '+w.word+'.'};
 inp.addEventListener('keydown',e=>{if(e.key==='Enter')submit.click()});
 $('interactive').append(inp,submit);
 }
 else if(q.mode==='order'){
 let f=blendItems[q.blend];$('instruction').textContent='Écoute le mot, puis touche les syllabes dans le bon ordre.';
 $('word').textContent='🧩';$('audio').classList.remove('hidden');
 $('question').textContent='Construis le mot avec les morceaux.';
 $('interactive').classList.remove('hidden');
 const picked=[],display=document.createElement('div');display.style.cssText='font-size:2rem;text-align:center;min-height:55px;margin:10px';
 const row=document.createElement('div');row.style.cssText='display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px';
 // Two correct syllables plus four believable distractors, with no duplicate labels.
 const syllableBank=[...new Set(blendItems.flatMap(item=>item.slice(0,2)).concat(['dou','cie','bou','gie','cou','cha','poi','chon','din','lin','teau','peau','son','pin','tin','pan','jou','ron','mie','gnon','che','se','de','pa','ba']))];
 const normalized=x=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const distractors=shuffle(syllableBank.filter(v=>!f.slice(0,2).includes(v))).sort((a,b)=>{
  const proximity=v=>Math.abs(v.length-f[0].length)*2+(normalized(v).slice(-1)===normalized(f[0]).slice(-1)?0:1);
  return proximity(a)-proximity(b);
 }).slice(0,4);
 const pieces=shuffle([...f.slice(0,2).map((v,i)=>({v,i})),...distractors.map((v,i)=>({v,i:i+2}))]);
 function redraw(){display.textContent=picked.map(x=>x.v).join(' · ')||'Choisis 2 syllabes'}
 pieces.forEach(part=>{let b=document.createElement('button');b.className='secondary';b.textContent=part.v;b.style.cssText='min-width:0;padding:14px 5px;font-size:1.25rem';b.onclick=()=>{if(answered||b.disabled)return;picked.push(part);b.disabled=true;redraw();if(picked.length===2){answered=true;const ok=picked.map(x=>x.i).join(',')==='0,1';feedback(q,ok);if(!ok)$('feedback').textContent+=' Ordre attendu : '+f[0]+' + '+f[1]}};row.append(b)});
 redraw();$('interactive').append(display,row);
 }
 else if(q.mode==='match'){
 let f=soundFamilies[q.family];$('instruction').textContent='Relie les lettres aux mots qui les contiennent : touche une étiquette à gauche puis un mot à droite.';
 $('word').textContent='🔗';$('question').textContent='Associe les graphies à leurs mots.';
 $('interactive').classList.remove('hidden');
 const families=shuffle([f,...shuffle(soundFamilies.filter(x=>x!==f&&x[0]!==f[0])).slice(0,2)]);
 const leftCol=document.createElement('div'),rightCol=document.createElement('div'),board=document.createElement('div');
 board.style.cssText='display:grid;grid-template-columns:1fr 1fr;gap:14px';
 let selected=null,done=0,mistakes=0;
 const wordOrder=shuffle(families);
 families.forEach(fam=>{let b=document.createElement('button');b.className='secondary';b.textContent=fam[0];b.dataset.key=fam[0];b.style.cssText='display:block;width:100%;margin:5px 0';b.onclick=()=>{if(answered||b.disabled)return;selected=b;[...leftCol.children].forEach(x=>x.style.outline='');b.style.outline='3px solid #f2bd40';speak(fam[1])};leftCol.append(b)});
 wordOrder.forEach(fam=>{let b=document.createElement('button');b.className='secondary';b.textContent=fam[1];b.dataset.key=fam[0];b.style.cssText='display:block;width:100%;margin:5px 0';b.onclick=()=>{if(answered||!selected||b.disabled)return;if(selected.dataset.key===b.dataset.key){selected.disabled=true;b.disabled=true;selected.style.background='#b7edcd';b.style.background='#b7edcd';done++;if(done===3){answered=true;feedback(q,mistakes===0)}}else{mistakes++;$('feedback').textContent='Ce n’est pas la bonne association. Essaie encore.'}selected.style.outline='';selected=null};rightCol.append(b)});
 board.append(leftCol,rightCol);$('interactive').append(board);
 }
 else if(q.mode==='cousinFill'){
 let cw=cousinWords[q.cousin];
 $('instruction').textContent='Écoute le mot, puis choisis la lettre manquante. Compare bien b, d, p et q.';
 $('word').textContent=cw[1];$('question').textContent='Quelle lettre manque dans le mot entendu ?';
 $('audio').classList.remove('hidden');$('hint').classList.remove('hidden');
 // No visible target word: listening is necessary. Replay is free; hint removes speed bonus.
 options=shuffle(['b','d','p','q']);correct=cw[2];
 }
 else if(q.mode==='mirror'){
 $('instruction').textContent='Écoute le nom de la lettre, puis retrouve la bonne lettre parmi les quatre propositions.';
 $('word').textContent='🔊';$('question').textContent='Quelle lettre entends-tu ?';
 $('audio').classList.remove('hidden');correct=q.letter;options=shuffle(['b','d','p','q']);
 }
 else if(q.mode==='grapheme'){$('instruction').textContent='Repère les lettres qui forment ce son.';$('word').textContent=q.part;correct=q.part;options=shuffle([q.part,...shuffle(choices.filter(x=>x!==q.part)).slice(0,3)])}
 if(q.mode==='cousinFill')setTimeout(()=>{if(qAt()===q && !answered)try{speak(cousinWords[q.cousin][0])}catch(e){}},250);
 if(q.mode==='mirror')setTimeout(()=>{if(qAt()===q && !answered)try{speak(({b:'bé',d:'dé',p:'pé',q:'ku'})[q.letter])}catch(e){}},350);
 if(q.mode!=='sentence')$('word').style.fontSize='';
 if(!['oral','type','order','match'].includes(q.mode))options.forEach(opt=>{let b=document.createElement('button');b.textContent=opt;b.onclick=()=>answer(opt,correct,b);$('choices').append(b)})
}
function feedback(q,ok,oral=false){let seconds=(performance.now()-startTime)/1000;let base=ok?10:0;let bonus=ok&&!oral&&!hadHint?Math.max(0,Math.min(5,Math.floor((16-seconds)/3))):0;let pts=base+bonus;state.points+=pts;let old=state.mastery[q.id]||0;state.mastery[q.id]=Math.max(-3,Math.min(5,old+(ok?1:-1)));state.lastSeen[q.id]=dayNumber();state.index++;save();$('feedback').textContent=ok?'Bonne réponse ! +'+pts+' points'+(bonus?' (dont '+bonus+' bonus de rapidité)':''):'La réponse attendue était : '+(q.mode==='listenWord'?vWord(q).word:q.mode==='listenPart'?soundFamilies[q.family][0]:q.mode==='soundMatch'?soundFamilies[q.family][2]:q.mode==='blend'||q.mode==='order'?blendItems[q.blend][2]:q.mode==='type'?vWord(q).word:q.mode==='match'?'les bonnes associations':q.mode==='cousinFill'?cousinWords[q.cousin][2]:q.mode==='gap'?vWord(q).part:'À revoir')+'. Nous la reverrons.';$('next').classList.remove('hidden');$('next').textContent=state.index===20?'Voir mes étoiles ⭐':'Question suivante →';sync()}
function answer(opt,correct,btn){if(answered||left()<=0)return;answered=true;let q=qAt(),ok=opt===correct;for(let b of $('choices').children){b.disabled=true;if(b.textContent===correct)b.classList.add('correct');else if(b===btn)b.classList.add('wrong')}feedback(q,ok)}
function speak(text,rate=.78){if(!('speechSynthesis'in window)){alert('La lecture audio n’est pas disponible sur cet appareil.');return}speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(text);u.lang='fr-FR';u.rate=rate;let v=speechSynthesis.getVoices().find(x=>x.lang?.toLowerCase().startsWith('fr'));if(v)u.voice=v;speechSynthesis.speak(u)}
$('readInstruction').onclick=()=>{const consigne=$('instruction').textContent.trim();if(consigne)speak(consigne)};
$('audio').onclick=()=>{let q=qAt();if(q.mode==='gap')hadHint=true;
 if(q.mode==='listenPart'||q.mode==='soundMatch')speak(soundFamilies[q.family][1]);
 else if(q.mode==='cousinFill')speak(cousinWords[q.cousin][0]);
 else if(q.mode==='mirror')speak(({b:'bé',d:'dé',p:'pé',q:'ku'})[q.letter]);
 else if(q.mode==='order'){let f=blendItems[q.blend];speak(f[2])}
 else if(q.mode==='match'){speak(soundFamilies[q.family][1])}
 else if(q.mode==='blend'){let f=blendItems[q.blend];speak(f[2],.62)}
 else speak(vWord(q).word);
};
$('hint').onclick=()=>{hadHint=true;let q=qAt();if(q.mode==='cousinFill'){$('picture').textContent=cousinWords[q.cousin][3];$('picture').classList.remove('hidden');return}let w=vWord(q);if(q.mode==='oral')$('question').textContent=w.split;else{$('picture').textContent=w.emoji;$('picture').classList.remove('hidden');$('audio').classList.remove('hidden')}};
$('parentCheck').onclick=()=>{if(testMode&&parentUnlocked){$('adultButtons').classList.remove('hidden');return}gateFails=0;newGate();$('gate').classList.remove('hidden')};
function newGate(){let a=6+Math.floor(Math.random()*7),b=6+Math.floor(Math.random()*7);gateExpected=a*b;$('mathQuestion').textContent='Pour le parent : combien font '+a+' × '+b+' ?';$('mathAnswer').value='';$('gateError').textContent=''}
$('unlock').onclick=()=>{if(Number($('mathAnswer').value)===gateExpected&&$('mathAnswer').value!==''){$('gate').classList.add('hidden');$('adultButtons').classList.remove('hidden')}else{gateFails++;$('gateError').textContent='Réponse incorrecte.';newGate();if(gateFails>=3){$('gate').classList.add('hidden');$('gateError').textContent='Demande à un parent.'}}};
function oralAnswer(ok){if(answered||left()<=0)return;answered=true;$('adultButtons').classList.add('hidden');feedback(qAt(),ok,true)}
$('oralYes').onclick=()=>oralAnswer(true);$('oralNo').onclick=()=>oralAnswer(false);
$('next').onclick=()=>{if(!answered)return;if(state.index>=20)finish();else render()};
function finish(){if(!state.completed){state.completed=true;if(!testMode){let earned=Math.floor(state.points/100);state.earned=(state.earned||0)+earned;state.stars=earned}save()}show('end');$('endTitle').textContent=testMode?'Série test terminée':'🎉 Parcours terminé !';$('endText').textContent=testMode?'20 questions testées · '+state.points+' points fictifs. Retourne à l’accueil pour lancer une nouvelle série, sans attendre demain.':'20 questions réussies ou essayées · '+state.points+' points · '+state.stars+' étoile(s) gagnée(s). Tu peux les dépenser dans un coffre ou économiser pour demain.';renderChests()}
function timeUp(){show('end');$('endTitle').textContent='🌙 À demain !';$('endText').textContent='Tes 10 minutes sont écoulées. Les questions et les points sont conservés, mais les étoiles sont distribuées à la fin des 20 questions. Le parcours reprend demain uniquement si tu n’as pas terminé celui d’aujourd’hui.'}
const costs=[2,5,9,15];function renderChests(){let root=$('chestList');root.replaceChildren();costs.forEach((cost,i)=>{let d=document.createElement('div');d.className='chest';let img=document.createElement('img');img.src=chestSprites[i];img.alt='Coffre';let content=document.createElement('div');let h=document.createElement('strong');h.textContent=['Petit coffre','Coffre d’argent','Grand coffre','Coffre légendaire'][i]+' · '+cost+' ⭐';let p=document.createElement('p');p.className='mini';p.textContent=state.rewards[i];let b=document.createElement('button');b.className='gold';b.textContent='Ouvrir (-'+cost+' ⭐)';b.disabled=testMode||balance()<cost;b.onclick=()=>{if(balance()<cost)return;if(!confirm('Dépenser '+cost+' étoiles pour ce cadeau ?'))return;state.spent=(state.spent||0)+cost;state.chests.push({date:DAY(),tier:i});save();alert('Coffre ouvert ! Récompense : '+state.rewards[i]+'. Montre-le à un parent.');renderChests();sync()};content.append(h,p,b);d.append(img,content);root.append(d)})}
let testExpected=0;function updateTestStatus(){$('testModeStatus').textContent=testMode?'Mode test ACTIVÉ':'Mode enfant normal';$('testModeToggle').textContent=testMode?'Désactiver le mode test':'Activer le mode test'}
$('testModeToggle').onclick=()=>{if(!parentUnlocked)return;localStorage.setItem(TEST_FLAG,testMode?'0':'1');location.reload()};
$('testConfirm').onclick=()=>{if(Number($('testMathAnswer').value)!==testExpected||!$('testMathAnswer').value){$('testError').textContent='Calcul incorrect. Réessaie.';return}localStorage.setItem(TEST_FLAG,testMode?'0':'1');location.reload()};
$('settings').onclick=()=>{if(!parentUnlocked)return;updateTestStatus();$('settingsPanel').classList.toggle('hidden');let root=$('rewardFields');root.replaceChildren();state.rewards.forEach((reward,i)=>{let label=document.createElement('label');label.textContent='Coffre '+(i+1);label.style.display='block';let input=document.createElement('input');input.id='reward'+i;input.style.width='100%';input.style.fontSize='1rem';input.value=reward;root.append(label,input)})};
$('saveRewards').onclick=()=>{if(!parentUnlocked)return;state.rewards=costs.map((_,i)=>$('reward'+i).value.trim()||blank().rewards[i]);save();renderChests();$('settingsPanel').classList.add('hidden')};
$('start').onclick=play;$('exit').onclick=home;$('backHome').onclick=home;$('dragon').src=dragonSprite;updateTestStatus();
let last=Date.now();function tick(){let now=Date.now(),dt=Math.min(3,Math.max(0,(now-last)/1000));last=now;if(!testMode&&document.visibilityState==='visible'&&!state.completed&&left()>0){state.seconds=Math.min(LIMIT,state.seconds+dt);save();if(left()<=0&&!$('play').classList.contains('hidden'))timeUp()}sync()}
setInterval(tick,1000);document.addEventListener('visibilitychange',()=>{tick();last=Date.now()});window.addEventListener('pagehide',()=>{tick();save()});home();

let parentUnlocked=false;
$('openParent').onclick=()=>{parentUnlocked=false;$('parentPin').value='';$('parentPinError').textContent='';$('parentLogin').classList.remove('hidden');$('parentDashboard').classList.add('hidden');$('parentPage').classList.remove('hidden');document.querySelector('main').classList.add('hidden');window.scrollTo(0,0)};
$('closeParent').onclick=()=>{$('parentPage').classList.add('hidden');document.querySelector('main').classList.remove('hidden');parentUnlocked=false;home()};
$('parentLoginForm').onsubmit=e=>{e.preventDefault();if($('parentPin').value==='2534'){parentUnlocked=true;$('parentLogin').classList.add('hidden');$('parentDashboard').classList.remove('hidden');updateTestStatus()}else{$('parentPinError').textContent='Code incorrect';$('parentPin').value=''}};
