/* Studio phonétique : enregistrement local, WAV PCM 16 bits, export ZIP sans dépendances. */
(()=>{
const sounds=[['ou','loup'],['on','pont'],['an','maman'],['en','vent'],['in','lapin'],['oi','poisson'],['oin','coin'],['ouin','pingouin'],['oui','Louis'],['ai','lait'],['ei','neige'],['eau','bateau'],['ch','chat'],['gn','montagne']];
const saved=new Map();let active=null;
const list=document.getElementById('soundRecorderList'),status=document.getElementById('soundRecorderStatus'),download=document.getElementById('soundDownloadAll');
if(!list)return;
function message(s){status.textContent=s}
function wav(audio){
 const count=audio.length,rate=audio.sampleRate,channels=audio.numberOfChannels;
 const out=new ArrayBuffer(44+count*2),v=new DataView(out);
 const str=(p,s)=>{for(let i=0;i<s.length;i++)v.setUint8(p+i,s.charCodeAt(i))};
 str(0,'RIFF');v.setUint32(4,36+count*2,true);str(8,'WAVE');str(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,rate,true);v.setUint32(28,rate*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);str(36,'data');v.setUint32(40,count*2,true);
 const data=Array.from({length:channels},(_,i)=>audio.getChannelData(i));
 for(let i=0;i<count;i++){let n=0;for(const ch of data)n+=ch[i]/channels;n=Math.max(-1,Math.min(1,n));v.setInt16(44+i*2,n<0?n*32768:n*32767,true)}
 return new Uint8Array(out);
}
async function convert(blob){
 const ctx=new (window.AudioContext||window.webkitAudioContext)();
 try{const decoded=await ctx.decodeAudioData(await blob.arrayBuffer());return wav(decoded)}
 finally{await ctx.close()}
}
function crc32(data){let c=-1;for(const b of data){c^=b;for(let i=0;i<8;i++)c=(c>>>1)^((c&1)?0xedb88320:0)}return(c^(-1))>>>0}
function zip(files){
 const enc=new TextEncoder(),chunks=[],central=[];let offset=0;
 const header=(size)=>new DataView(new ArrayBuffer(size));
 for(const [name,data] of files){
  const n=enc.encode(name),crc=crc32(data),h=header(30+n.length);
  h.setUint32(0,0x04034b50,true);h.setUint16(4,20,true);h.setUint16(8,0,true);h.setUint32(14,crc,true);h.setUint32(18,data.length,true);h.setUint32(22,data.length,true);h.setUint16(26,n.length,true);
  new Uint8Array(h.buffer).set(n,30);chunks.push(new Uint8Array(h.buffer),data);
  const c=header(46+n.length);c.setUint32(0,0x02014b50,true);c.setUint16(4,20,true);c.setUint16(6,20,true);c.setUint32(16,crc,true);c.setUint32(20,data.length,true);c.setUint32(24,data.length,true);c.setUint16(28,n.length,true);c.setUint32(42,offset,true);new Uint8Array(c.buffer).set(n,46);central.push(new Uint8Array(c.buffer));offset+=h.byteLength+data.length;
 }
 const size=central.reduce((n,x)=>n+x.length,0),end=header(22);end.setUint32(0,0x06054b50,true);end.setUint16(8,files.length,true);end.setUint16(10,files.length,true);end.setUint32(12,size,true);end.setUint32(16,offset,true);
 return new Blob([...chunks,...central,new Uint8Array(end.buffer)],{type:'application/zip'});
}
function saveFile(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),5000)}
function update(){for(const [id] of sounds){const el=document.getElementById('sound-state-'+id);el.textContent=saved.has(id)?'✓ Prêt':'À enregistrer';const play=document.getElementById('sound-play-'+id);play.disabled=!saved.has(id)}download.disabled=saved.size===0;download.textContent='⬇ Télécharger les sons ('+saved.size+'/14) — ZIP'}
async function record(id,button){
 if(active){if(active.id===id)active.recorder.stop();else message('Termine cet enregistrement avant de passer au suivant.');return}
 if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){message('Enregistrement non disponible dans ce navigateur. Utilise Chrome ou Firefox avec HTTPS.');return}
 try{
  const stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});
  const rec=new MediaRecorder(stream),parts=[];
  rec.ondataavailable=e=>{if(e.data.size)parts.push(e.data)};
  active={id,recorder:rec};button.textContent='■ Arrêter';message('Enregistrement du son « '+id+' »… Prononce seulement le son.');
  rec.onstop=async()=>{stream.getTracks().forEach(t=>t.stop());active=null;button.textContent='● Enregistrer';try{const bytes=await convert(new Blob(parts,{type:rec.mimeType}));saved.set(id,bytes);message('Son « '+id+' » enregistré. Tu peux l’écouter ou le refaire.');update()}catch(e){message('Impossible de convertir cet enregistrement : '+e.message)}};
  rec.start();
 }catch(e){message('Micro non accessible : '+e.message)}
}
for(const [id,example] of sounds){
 const row=document.createElement('div');row.className='sound-record-row';
 const name=document.createElement('strong');name.textContent=id.toUpperCase();
 const ex=document.createElement('span');ex.textContent='comme dans « '+example+' »';
 const state=document.createElement('span');state.id='sound-state-'+id;state.className='sound-record-state';
 const btn=document.createElement('button');btn.type='button';btn.className='secondary';btn.textContent='● Enregistrer';btn.onclick=()=>record(id,btn);
 const play=document.createElement('button');play.type='button';play.className='secondary';play.id='sound-play-'+id;play.textContent='▶ Écouter';play.onclick=()=>{const data=saved.get(id);if(!data)return;const url=URL.createObjectURL(new Blob([data],{type:'audio/wav'})),a=new Audio(url);a.onended=()=>URL.revokeObjectURL(url);a.play().catch(()=>message('Lecture impossible.'))};
 row.append(name,ex,state,btn,play);list.append(row);
}
download.onclick=()=>{if(active){message('Arrête d’abord l’enregistrement en cours.');return}if(!saved.size)return;const files=sounds.filter(([id])=>saved.has(id)).map(([id])=>[id+'.wav',saved.get(id)]);saveFile(zip(files),'sons-lucas.zip');message('Fichier ZIP téléchargé. Tu peux me l’envoyer dans cette conversation.')};
update();message('Autorise le micro à la première prise. Les enregistrements restent sur cet appareil jusqu’au téléchargement du ZIP.');
})();
