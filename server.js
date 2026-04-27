const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer({ limits: { fileSize: 20 * 1024 * 1024 } });
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Preflight Pro v4 activo" });
});

app.get("/widget", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Preflight Pro</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',sans-serif;background:#f5f3f0;padding:20px;color:#1a1a1a;}
.app{max-width:760px;margin:0 auto;}

/* Header */
.hdr{display:flex;align-items:center;gap:10px;margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px solid #e0ddd8;}
.hdr-ico{width:32px;height:32px;background:#534AB7;border-radius:7px;display:flex;align-items:center;justify-content:center;}
.hdr-t{font-size:16px;font-weight:600;color:#1a1a1a;}
.hdr-s{font-size:11px;color:#888;margin-left:auto;}

/* Drop zone */
.drop{border:2px dashed #c8c5c0;border-radius:12px;padding:3rem 2rem;text-align:center;cursor:pointer;background:#faf9f8;transition:all 0.15s;}
.drop:hover,.drop.over{border-color:#534AB7;background:#f0eefd;}
.drop-ico{width:56px;height:56px;background:#534AB7;border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px;}
.drop-t{font-size:16px;font-weight:600;color:#1a1a1a;margin-bottom:4px;}
.drop-h{font-size:13px;color:#777;}
.drop-f{font-size:11px;color:#bbb;margin-top:8px;text-transform:uppercase;letter-spacing:0.04em;}
#fi{display:none;}

/* Caja pregunta tamaño */
.szq{background:white;border:1px solid #e0ddd8;border-radius:12px;padding:1.5rem;margin-bottom:1rem;}
.sqh{display:flex;align-items:center;gap:12px;margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px solid #f0eee9;}
.sqt{width:52px;height:52px;border-radius:8px;background:#f5f3f0;border:1px solid #e0ddd8;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.sqt img{max-width:100%;max-height:100%;object-fit:contain;}
.sqt-ext{font-size:11px;font-weight:600;color:#534AB7;}
.sqfn{font-size:14px;font-weight:600;color:#1a1a1a;word-break:break-all;}
.sqm{font-size:12px;color:#777;margin-top:2px;}

.sqtitle{font-size:15px;font-weight:600;color:#1a1a1a;margin-bottom:6px;}
.sqsub{font-size:13px;color:#777;margin-bottom:16px;line-height:1.5;}

.presets{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-bottom:14px;}
.preset{padding:12px;border:1px solid #e0ddd8;border-radius:8px;background:white;cursor:pointer;text-align:left;font-family:inherit;transition:all 0.15s;}
.preset:hover{border-color:#534AB7;background:#f0eefd;}
.preset.active{border-color:#534AB7;background:#f0eefd;}
.pn{font-size:13px;font-weight:600;color:#1a1a1a;}
.ps{font-size:11px;color:#777;margin-top:2px;}

.cust{display:flex;gap:8px;align-items:center;padding:12px;background:#f5f3f0;border-radius:8px;margin-bottom:14px;flex-wrap:wrap;}
.cust-l{font-size:13px;color:#777;}
.cust-i{width:80px;padding:8px 10px;border:1px solid #c8c5c0;border-radius:6px;font-size:13px;font-family:inherit;background:white;}
.cust-i:focus{outline:none;border-color:#534AB7;}

.acts{display:flex;gap:8px;flex-wrap:wrap;}
.bt{padding:10px 18px;border-radius:6px;border:1px solid #c8c5c0;background:white;font-size:13px;font-weight:500;cursor:pointer;color:#1a1a1a;font-family:inherit;}
.bt:hover{background:#f5f3f0;}
.bt-pr{background:#534AB7;color:white;border-color:#534AB7;}
.bt-pr:hover{background:#3C3489;}
.bt-sk{color:#777;background:transparent;border:none;}
.bt-sk:hover{color:#1a1a1a;text-decoration:underline;}

/* Analizando */
.anz{background:white;border:1px solid #e0ddd8;border-radius:12px;padding:2.5rem 1rem;text-align:center;margin-bottom:1rem;}
.spin{width:32px;height:32px;border:3px solid #e0ddd8;border-top-color:#534AB7;border-radius:50%;animation:spin 0.7s linear infinite;margin:0 auto 12px;}
@keyframes spin{to{transform:rotate(360deg);}}
.anz-t{font-size:14px;font-weight:600;color:#1a1a1a;margin-bottom:4px;}
.anz-s{font-size:12px;color:#777;margin-bottom:10px;}
.prog{height:3px;background:#e0ddd8;border-radius:2px;overflow:hidden;width:240px;margin:0 auto;}
.pf{height:100%;background:#534AB7;transition:width 0.4s;}

/* Resultados */
.verdict{background:white;border:1px solid #e0ddd8;border-radius:12px;padding:1.25rem 1.5rem;margin-bottom:1rem;display:flex;align-items:center;gap:14px;}
.vi{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:600;flex-shrink:0;}
.vi-ok{background:#EAF3DE;color:#3B6D11;}
.vi-wn{background:#FAEEDA;color:#854F0B;}
.vi-er{background:#FCEBEB;color:#A32D2D;}
.vt{font-size:18px;font-weight:600;color:#1a1a1a;}
.vs{font-size:13px;color:#777;margin-top:3px;line-height:1.4;}

/* Vista del archivo */
.preview{background:white;border:1px solid #e0ddd8;border-radius:12px;padding:1rem;margin-bottom:1rem;text-align:center;}
.preview img,.preview canvas{max-width:100%;max-height:380px;display:inline-block;border:1px solid #e0ddd8;}
.preview-pdf{display:flex;flex-direction:column;gap:12px;align-items:center;max-height:480px;overflow-y:auto;}

/* Tarjetas */
.cards{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:1rem;}
.card{background:white;border:1px solid #e0ddd8;border-radius:12px;padding:1rem 1.25rem;}
.cr{display:flex;align-items:center;gap:12px;margin-bottom:8px;}
.ci{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.ci-bl{background:#E6F1FB;color:#185FA5;}
.ci-tl{background:#E1F5EE;color:#0F6E56;}
.ci-am{background:#FAEEDA;color:#854F0B;}
.ci-co{background:#FAECE7;color:#993C1D;}
.cl{font-size:12px;color:#777;}
.cv{font-size:17px;font-weight:600;color:#1a1a1a;line-height:1.2;}
.cd{font-size:12px;color:#777;margin-top:6px;line-height:1.4;}
.cstat{display:inline-block;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:500;margin-top:6px;}
.s-ok{background:#EAF3DE;color:#3B6D11;}
.s-wn{background:#FAEEDA;color:#854F0B;}
.s-er{background:#FCEBEB;color:#A32D2D;}

/* AI */
.ai{background:#f0eefd;border-left:3px solid #534AB7;border-radius:8px;padding:12px 14px;margin-bottom:1rem;}
.ai-l{font-size:11px;font-weight:600;color:#3C3489;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;}
.ai-t{font-size:13px;color:#1a1a1a;line-height:1.6;}

/* Avanzado */
.adv-tg{font-size:12px;color:#777;cursor:pointer;text-align:center;padding:8px;margin-top:6px;}
.adv-tg:hover{color:#1a1a1a;}
.adv-c{display:none;font-size:11px;color:#555;background:#f5f3f0;padding:12px 16px;border-radius:8px;margin-top:6px;font-family:'Courier New',monospace;line-height:1.7;}
.adv-c.open{display:block;}

/* Error */
.err{background:#FCEBEB;border:1px solid #f0a0a0;border-radius:12px;padding:1rem 1.25rem;margin-bottom:1rem;}
.err-t{font-size:14px;font-weight:600;color:#A32D2D;margin-bottom:4px;}
.err-d{font-size:12px;color:#A32D2D;line-height:1.5;}
</style>
</head>
<body>
<div class="app">
  <div class="hdr">
    <div class="hdr-ico"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 12L8 4l5 8H3z" fill="white"/></svg></div>
    <div class="hdr-t">Preflight Pro</div>
    <div class="hdr-s">Análisis para imprenta</div>
  </div>

  <div id="dropbox">
    <div class="drop" id="drop" onclick="document.getElementById('fi').click()">
      <div class="drop-ico"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3v13M8 9l4-6 4 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 18v2a2 2 0 002 2h14a2 2 0 002-2v-2" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></div>
      <div class="drop-t">Sube tu archivo de imprenta</div>
      <div class="drop-h">PDF, JPG, PNG, TIFF — arrastra o haz clic</div>
      <div class="drop-f">PDF · PNG · JPG · TIFF · GIF · BMP · WEBP</div>
    </div>
    <input type="file" id="fi" accept=".pdf,.png,.jpg,.jpeg,.tiff,.tif,.gif,.bmp,.webp">
  </div>

  <div class="szq" id="szq" style="display:none">
    <div class="sqh">
      <div class="sqt" id="szt"></div>
      <div style="flex:1;min-width:0">
        <div class="sqfn" id="szfn"></div>
        <div class="sqm" id="szm"></div>
      </div>
    </div>
    <div class="sqtitle">¿En qué tamaño lo vas a imprimir?</div>
    <div class="sqsub">Esto nos permite calcular si la calidad será suficiente. Puedes omitir si no estás seguro.</div>
    <div class="presets">
      <button class="preset" onclick="szPick(this,5.5,8.5)"><div class="pn">Tarjeta de visita</div><div class="ps">5.5 × 8.5 cm</div></button>
      <button class="preset" onclick="szPick(this,10,15)"><div class="pn">Postal / Volante</div><div class="ps">10 × 15 cm</div></button>
      <button class="preset" onclick="szPick(this,14.8,21)"><div class="pn">Flyer A5</div><div class="ps">14.8 × 21 cm</div></button>
      <button class="preset" onclick="szPick(this,21,29.7)"><div class="pn">Hoja A4</div><div class="ps">21 × 29.7 cm</div></button>
      <button class="preset" onclick="szPick(this,29.7,42)"><div class="pn">Afiche A3</div><div class="ps">29.7 × 42 cm</div></button>
      <button class="preset" onclick="szPick(this,42,59.4)"><div class="pn">Póster A2</div><div class="ps">42 × 59.4 cm</div></button>
    </div>
    <div class="cust">
      <span class="cust-l">O personalizado:</span>
      <input type="number" class="cust-i" id="cw" placeholder="ancho" step="0.1">
      <span style="color:#777">×</span>
      <input type="number" class="cust-i" id="ch" placeholder="alto" step="0.1">
      <span style="color:#777">cm</span>
    </div>
    <div class="acts">
      <button class="bt bt-pr" onclick="continueAn()">Analizar</button>
      <button class="bt bt-sk" onclick="skipSize()">Omitir</button>
    </div>
  </div>

  <div class="anz" id="anz" style="display:none">
    <div class="spin"></div>
    <div class="anz-t">Analizando archivo…</div>
    <div class="anz-s" id="anzs">Iniciando</div>
    <div class="prog"><div class="pf" id="prog" style="width:5%"></div></div>
  </div>

  <div id="results" style="display:none"></div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script>
pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
const BACKEND='https://preflight-backend-production-e718.up.railway.app';

let curFile=null,curURL=null,curPxW=null,curPxH=null,curDPI=null,curMmW=null,curMmH=null,curCmW=null,curCmH=null,curExt='';
let targetSize=null;

const drop=document.getElementById('drop');
const fi=document.getElementById('fi');
drop.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('over');});
drop.addEventListener('dragleave',()=>drop.classList.remove('over'));
drop.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('over');loadFile(e.dataTransfer.files[0]);});
fi.addEventListener('change',e=>{if(e.target.files[0])loadFile(e.target.files[0]);});

function fb(b){if(b<1024)return b+' B';if(b<1048576)return(b/1024).toFixed(1)+' KB';return(b/1048576).toFixed(2)+' MB';}
function step(p,m){document.getElementById('prog').style.width=p+'%';document.getElementById('anzs').textContent=m;}

async function loadFile(file){
  if(!file)return;
  curFile=file;
  curExt=file.name.split('.').pop().toLowerCase();
  if(curURL){URL.revokeObjectURL(curURL);curURL=null;}

  const thumbEl=document.getElementById('szt');
  if(['png','jpg','jpeg','gif','bmp','webp'].includes(curExt)){
    curURL=URL.createObjectURL(file);
    thumbEl.innerHTML='<img src="'+curURL+'" alt="">';
    try{
      const dims=await getDims(file);
      curPxW=dims.w;curPxH=dims.h;
    }catch(e){}
    try{curDPI=await getDPI(file);}catch(e){}
  } else {
    thumbEl.innerHTML='<div class="sqt-ext">'+curExt.toUpperCase()+'</div>';
    if(curExt==='pdf'){
      try{
        const pd=await getPDFDims(file);
        if(pd){curMmW=pd.mmW;curMmH=pd.mmH;curCmW=pd.cmW;curCmH=pd.cmH;}
      }catch(e){}
    }
  }

  // Si es imagen y no tiene DPI, asumir 72
  if(['png','jpg','jpeg','gif','bmp','webp'].includes(curExt)&&curPxW){
    const dpiUsado=curDPI||72;
    curMmW=Math.round((curPxW/dpiUsado)*25.4);
    curMmH=Math.round((curPxH/dpiUsado)*25.4);
    curCmW=parseFloat((curMmW/10).toFixed(1));
    curCmH=parseFloat((curMmH/10).toFixed(1));
  }

  document.getElementById('szfn').textContent=file.name;
  let metaTxt=fb(file.size)+' · '+curExt.toUpperCase();
  if(curPxW)metaTxt+=' · '+curPxW+'×'+curPxH+' px';
  if(curCmW)metaTxt+=' · '+curCmW+'×'+curCmH+' cm';
  document.getElementById('szm').textContent=metaTxt;

  document.getElementById('dropbox').style.display='none';
  document.getElementById('szq').style.display='block';
}

function szPick(btn,w,h){
  document.querySelectorAll('.preset').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  targetSize={w,h};
  document.getElementById('cw').value=w;
  document.getElementById('ch').value=h;
}

function continueAn(){
  const w=parseFloat(document.getElementById('cw').value);
  const h=parseFloat(document.getElementById('ch').value);
  if(w&&h)targetSize={w,h};
  startAnalysis();
}

function skipSize(){targetSize=null;startAnalysis();}

async function startAnalysis(){
  document.getElementById('szq').style.display='none';
  document.getElementById('anz').style.display='block';
  step(15,'Renderizando vista previa…');
  await renderPrev();
  step(50,'Enviando a IA para análisis preflight…');

  try{
    const fd=new FormData();
    fd.append('archivo',curFile,curFile.name);
    if(curPxW)fd.append('px_ancho',curPxW);
    if(curPxH)fd.append('px_alto',curPxH);
    if(curDPI)fd.append('dpi_meta',curDPI);
    if(curMmW)fd.append('mm_ancho',curMmW);
    if(curMmH)fd.append('mm_alto',curMmH);
    if(curCmW)fd.append('cm_ancho',curCmW);
    if(curCmH)fd.append('cm_alto',curCmH);

    const resp=await fetch(BACKEND+'/analizar',{method:'POST',body:fd});
    step(95,'Generando reporte…');
    if(!resp.ok)throw new Error('HTTP '+resp.status);
    const data=await resp.json();
    if(!data.ok)throw new Error(data.error||'Error');
    showResults(data.analisis);
  }catch(err){
    showError(err.message);
  }
}

async function renderPrev(){
  const html=document.getElementById('results');
  let prev='';
  if(curExt==='pdf'){
    try{
      const buf=await curFile.arrayBuffer();
      const pdf=await pdfjsLib.getDocument({data:buf}).promise;
      const total=Math.min(pdf.numPages,10);
      prev='<div class="preview"><div class="preview-pdf" id="pdf-prev"></div></div>';
      html.dataset.prev=prev;
      // se renderiza después en showResults
      window._pdfDoc=pdf;
      window._pdfPages=total;
    }catch(e){html.dataset.prev='<div class="preview"><div style="color:#aaa;padding:2rem">No se pudo renderizar el PDF</div></div>';}
  } else {
    if(!curURL)curURL=URL.createObjectURL(curFile);
    html.dataset.prev='<div class="preview"><img src="'+curURL+'" alt=""></div>';
  }
}

async function renderPDFPages(){
  if(!window._pdfDoc)return;
  const cont=document.getElementById('pdf-prev');
  if(!cont)return;
  for(let p=1;p<=window._pdfPages;p++){
    const page=await window._pdfDoc.getPage(p);
    const vp=page.getViewport({scale:1.2});
    const canvas=document.createElement('canvas');
    canvas.width=vp.width;canvas.height=vp.height;
    canvas.style.maxWidth='100%';
    await page.render({canvasContext:canvas.getContext('2d'),viewport:vp}).promise;
    cont.appendChild(canvas);
  }
}

function showResults(d){
  document.getElementById('anz').style.display='none';
  const r=document.getElementById('results');

  // Determinar veredictos
  const dpi=d.resolucion?.valor_dpi||curDPI;
  const cmW=d.tamanio?.cm_ancho||curCmW;
  const cmH=d.tamanio?.cm_alto||curCmH;
  const modoColor=d.modo_color?.valor||'Desconocido';
  const colorOK=modoColor==='CMYK';
  const sangria=d.sangria?.tiene||false;

  // Calidad considerando tamaño objetivo
  let calidadDPI=dpi,calidadDesc='',targetInfo='';
  if(targetSize&&curPxW&&curPxH){
    const dpiW=Math.round(curPxW/(targetSize.w/2.54));
    const dpiH=Math.round(curPxH/(targetSize.h/2.54));
    calidadDPI=Math.min(dpiW,dpiH);
    targetInfo=' al imprimir en '+targetSize.w+' × '+targetSize.h+' cm';
  }

  let calLabel,calStatus,calDetail;
  if(curExt==='pdf'&&!dpi){calLabel='Vectorial';calStatus='s-ok';calDetail='Calidad perfecta a cualquier tamaño';}
  else if(calidadDPI>=300){calLabel='Excelente';calStatus='s-ok';calDetail='Calidad profesional ('+calidadDPI+' DPI'+targetInfo+')';}
  else if(calidadDPI>=200){calLabel='Alta';calStatus='s-ok';calDetail='Perfecta para imprenta digital ('+calidadDPI+' DPI'+targetInfo+')';}
  else if(calidadDPI>=150){calLabel='Buena';calStatus='s-ok';calDetail='Apta para imprenta digital ('+calidadDPI+' DPI'+targetInfo+')';}
  else if(calidadDPI>=100){calLabel='Aceptable';calStatus='s-wn';calDetail='Funciona para flyers y volantes pequeños ('+calidadDPI+' DPI'+targetInfo+')';}
  else if(calidadDPI>=72){calLabel='Limitada';calStatus='s-wn';calDetail='Solo para uso pequeño o digital ('+calidadDPI+' DPI'+targetInfo+')';}
  else{calLabel='Muy baja';calStatus='s-er';calDetail='No recomendado para imprenta ('+calidadDPI+' DPI'+targetInfo+')';}

  // Tamaño máximo recomendado a 300 DPI
  let tamRecomendado='';
  if(curPxW&&curPxH){
    const maxW200=parseFloat(((curPxW/200)*2.54).toFixed(1));
    const maxH200=parseFloat(((curPxH/200)*2.54).toFixed(1));
    const maxW150=parseFloat(((curPxW/150)*2.54).toFixed(1));
    const maxH150=parseFloat(((curPxH/150)*2.54).toFixed(1));
    tamRecomendado='Imprenta digital con calidad alta hasta '+maxW200+' × '+maxH200+' cm. Aceptable hasta '+maxW150+' × '+maxH150+' cm.';
  }

  // Veredicto general
  const probs=[];
  if(calidadDPI&&calidadDPI<100)probs.push('calidad');
  if(!colorOK)probs.push('color');
  if(!sangria)probs.push('corte');

  let vClass,vIco,vTitle,vSub;
  if(probs.length===0){vClass='vi-ok';vIco='✓';vTitle='Listo para imprimir';vSub='Tu archivo no tiene problemas. Puedes enviarlo a imprenta.';}
  else if(probs.length<=2){vClass='vi-wn';vIco='!';vTitle='Necesita pequeños ajustes';vSub='Antes de imprimir hay que arreglar '+probs.length+(probs.length===1?' cosa':' cosas')+'.';}
  else{vClass='vi-er';vIco='×';vTitle='No se puede imprimir aún';vSub='Hay '+probs.length+' problemas que corregir.';}

  // Tamaño con referencia
  let tamLabel=cmW&&cmH?cmW+' × '+cmH+' cm':'—';
  let tamRef='';
  if(cmW&&cmH){
    if(Math.abs(cmW-21)<1&&Math.abs(cmH-29.7)<1)tamRef='Tamaño A4';
    else if(Math.abs(cmW-14.8)<1&&Math.abs(cmH-21)<1)tamRef='Tamaño A5';
    else if(cmW<10&&cmH<10)tamRef='Tarjeta de visita';
    else if(cmW>40||cmH>40)tamRef='Formato grande';
    else tamRef='Formato '+cmW+'×'+cmH;
  }

  let html='';

  // Veredicto
  html+='<div class="verdict"><div class="vi '+vClass+'">'+vIco+'</div><div><div class="vt">'+vTitle+'</div><div class="vs">'+vSub+'</div></div></div>';

  // Vista previa
  html+=r.dataset.prev||'';

  // 4 tarjetas
  html+='<div class="cards">';
  html+='<div class="card"><div class="cr"><div class="ci ci-bl"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2" width="12" height="14" rx="1" stroke="#185FA5" stroke-width="1.5"/></svg></div><div><div class="cl">Tamaño</div><div class="cv">'+tamLabel+'</div></div></div>'+(tamRef?'<div class="cd">'+tamRef+'</div>':'')+'</div>';
  html+='<div class="card"><div class="cr"><div class="ci ci-tl"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="6" stroke="#0F6E56" stroke-width="1.5"/></svg></div><div><div class="cl">Calidad</div><div class="cv">'+calLabel+'</div></div></div><span class="cstat '+calStatus+'">'+(calStatus==='s-ok'?'✓ Bien':calStatus==='s-wn'?'⚠ Revisar':'✕ Problema')+'</span><div class="cd">'+calDetail+'</div></div>';
  html+='<div class="card"><div class="cr"><div class="ci ci-am"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="6" cy="6" r="2" stroke="#854F0B" stroke-width="1.5"/><circle cx="6" cy="12" r="2" stroke="#854F0B" stroke-width="1.5"/></svg></div><div><div class="cl">Corte</div><div class="cv">'+(sangria?'Con margen seguro':'Sin margen')+'</div></div></div><span class="cstat '+(sangria?'s-ok':'s-er')+'">'+(sangria?'✓ Bien':'✕ Problema')+'</span><div class="cd">'+(sangria?'Tu diseño no se cortará en el borde':'Pueden quedar líneas blancas al cortar — agrega 3mm de fondo extra alrededor')+'</div></div>';
  html+='<div class="card"><div class="cr"><div class="ci ci-co"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="6" cy="6" r="3" fill="#993C1D" opacity="0.6"/><circle cx="12" cy="6" r="3" fill="#993C1D" opacity="0.4"/></svg></div><div><div class="cl">Color</div><div class="cv">'+(colorOK?'Listo':'Hay que convertir')+'</div></div></div><span class="cstat '+(colorOK?'s-ok':'s-wn')+'">'+(colorOK?'✓ Bien':'⚠ Revisar')+'</span><div class="cd">'+(colorOK?'Colores listos para imprenta':'Está en '+modoColor+' — los colores se verán diferentes al imprimir')+'</div></div>';
  html+='</div>';

  // Recomendación de tamaño máximo
  if(tamRecomendado&&!targetSize){
    html+='<div class="ai"><div class="ai-l">Recomendación</div><div class="ai-t">'+tamRecomendado+' (a 300 DPI). Si imprimes más grande la calidad bajará.</div></div>';
  }

  // Resumen IA
  if(d.resumen){html+='<div class="ai"><div class="ai-l">Análisis IA</div><div class="ai-t">'+d.resumen+'</div></div>';}

  // Acciones
  html+='<div class="acts"><button class="bt bt-pr" onclick="sendPrompt(\\'¿Cómo arreglo los problemas detectados en mi archivo de imprenta? Explícame paso a paso en lenguaje simple.\\')">Cómo arreglarlo ↗</button><button class="bt" onclick="resetAll()">Subir otro archivo</button></div>';

  // Avanzado
  html+='<div class="adv-tg" onclick="this.nextElementSibling.classList.toggle(\\'open\\')">▾ Detalles técnicos</div>';
  html+='<div class="adv-c">Archivo: '+curFile.name+'<br>Formato: '+curExt.toUpperCase()+'<br>'+(curPxW?'Píxeles: '+curPxW+' × '+curPxH+'<br>':'')+(dpi?'DPI: '+dpi+'<br>':'')+'Medidas: '+tamLabel+'<br>Modo color: '+modoColor+'<br>Sangría: '+(sangria?'Sí':'No')+'<br>Tiempo estimado: '+(d.tiempo_estimado?.total_minutos||'—')+' min</div>';

  r.innerHTML=html;
  r.style.display='block';

  if(curExt==='pdf')renderPDFPages();
}

function showError(msg){
  document.getElementById('anz').style.display='none';
  document.getElementById('results').innerHTML='<div class="err"><div class="err-t">No se pudo completar el análisis</div><div class="err-d">'+msg+'</div></div><div class="acts"><button class="bt bt-pr" onclick="resetAll()">Intentar de nuevo</button></div>';
  document.getElementById('results').style.display='block';
}

function resetAll(){
  document.getElementById('dropbox').style.display='block';
  document.getElementById('szq').style.display='none';
  document.getElementById('anz').style.display='none';
  document.getElementById('results').style.display='none';
  document.getElementById('results').innerHTML='';
  fi.value='';
  document.querySelectorAll('.preset').forEach(b=>b.classList.remove('active'));
  document.getElementById('cw').value='';
  document.getElementById('ch').value='';
  curFile=null;curPxW=null;curPxH=null;curDPI=null;curMmW=null;curMmH=null;curCmW=null;curCmH=null;targetSize=null;
  if(curURL){URL.revokeObjectURL(curURL);curURL=null;}
}

// Lectura de metadatos
function getDims(file){
  return new Promise((res,rej)=>{
    const url=URL.createObjectURL(file);
    const img=new Image();
    img.onload=()=>{res({w:img.naturalWidth,h:img.naturalHeight});URL.revokeObjectURL(url);};
    img.onerror=()=>{URL.revokeObjectURL(url);rej();};
    img.src=url;
  });
}

function getDPI(file){
  return new Promise(resolve=>{
    const reader=new FileReader();
    reader.onload=e=>{
      try{
        const b=new Uint8Array(e.target.result);
        if(b[0]===137&&b[1]===80&&b[2]===78){
          for(let i=0;i<b.length-13;i++){
            if(b[i]===112&&b[i+1]===72&&b[i+2]===89&&b[i+3]===115){
              const x=(b[i+4]<<24)|(b[i+5]<<16)|(b[i+6]<<8)|b[i+7];
              if(b[i+12]===1&&x>0){resolve(Math.round(x*0.0254));return;}
            }
          }
        }
        if(b[0]===0xFF&&b[1]===0xD8){
          let o=2;
          while(o<Math.min(b.length-4,65536)){
            if(b[o]!==0xFF)break;
            const mk=b[o+1],ln=(b[o+2]<<8)|b[o+3];
            if(mk===0xE0&&ln>=16){
              const du=b[o+11],xd=(b[o+12]<<8)|b[o+13];
              if(du===1&&xd>0){resolve(xd);return;}
              if(du===2&&xd>0){resolve(Math.round(xd*2.54));return;}
            }
            o+=2+ln;
          }
        }
        resolve(null);
      }catch(e){resolve(null);}
    };
    reader.readAsArrayBuffer(file.slice(0,131072));
  });
}

function getPDFDims(file){
  return new Promise(resolve=>{
    const reader=new FileReader();
    reader.onload=e=>{
      try{
        const txt=e.target.result;
        const idx=txt.indexOf('MediaBox');
        if(idx<0){resolve(null);return;}
        const chunk=txt.slice(idx,idx+80);
        const nums=chunk.match(/[-\\d.]+/g);
        if(nums&&nums.length>=4){
          const w=parseFloat(nums[2])-parseFloat(nums[0]);
          const h=parseFloat(nums[3])-parseFloat(nums[1]);
          const mmW=Math.round(w*(25.4/72));
          const mmH=Math.round(h*(25.4/72));
          resolve({mmW,mmH,cmW:parseFloat((mmW/10).toFixed(1)),cmH:parseFloat((mmH/10).toFixed(1))});
        }else resolve(null);
      }catch(e){resolve(null);}
    };
    reader.readAsText(file.slice(0,65536));
  });
}
</script>
</body>
</html>`);
});

app.post("/analizar", upload.single("archivo"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No se recibió archivo" });
    const { originalname, mimetype, buffer, size } = req.file;
    const ext = originalname.split(".").pop().toLowerCase();
    const sizeMB = (size / 1024 / 1024).toFixed(2);
    const base64 = buffer.toString("base64");

    const pxAncho = req.body.px_ancho ? parseInt(req.body.px_ancho) : null;
    const pxAlto = req.body.px_alto ? parseInt(req.body.px_alto) : null;
    const dpiMeta = req.body.dpi_meta ? parseInt(req.body.dpi_meta) : null;
    const mmAncho = req.body.mm_ancho ? parseInt(req.body.mm_ancho) : null;
    const mmAlto = req.body.mm_alto ? parseInt(req.body.mm_alto) : null;
    const cmAncho = req.body.cm_ancho ? parseFloat(req.body.cm_ancho) : null;
    const cmAlto = req.body.cm_alto ? parseFloat(req.body.cm_alto) : null;

    const visuales = ["png", "jpg", "jpeg", "gif", "bmp", "webp"];
    const esPDF = ext === "pdf";
    const esVisual = visuales.includes(ext);

    let ctx = "";
    if (cmAncho && cmAlto) ctx = "Medidas: " + cmAncho + "x" + cmAlto + " cm" + (dpiMeta ? ", DPI: " + dpiMeta : "") + ".";

    const sys = "Experto preflight imprenta. JSON sin backticks. " + ctx + " Analiza modo color, textos trazados, sangria, cruces de corte, transparencias, perfil ICC. JSON: {\"resolucion\":{\"valor_dpi\":" + (dpiMeta || "null") + ",\"estado\":\"ok|advertencia|error\",\"detalle\":\"\"},\"modo_color\":{\"valor\":\"CMYK|RGB|Escala de grises|Desconocido\",\"estado\":\"ok|advertencia|error\",\"detalle\":\"\"},\"textos_trazados\":{\"metodo\":\"\",\"estado\":\"ok|advertencia|error|no_determinable\",\"detalle\":\"\"},\"sangria\":{\"tiene\":false,\"valor_mm\":null,\"estado\":\"ok|advertencia|error\",\"detalle\":\"\"},\"cruces_de_corte\":{\"tiene\":false,\"estado\":\"ok|advertencia|error\",\"detalle\":\"\"},\"tamanio\":{\"px_ancho\":" + (pxAncho || "null") + ",\"px_alto\":" + (pxAlto || "null") + ",\"mm_ancho\":" + (mmAncho || "null") + ",\"mm_alto\":" + (mmAlto || "null") + ",\"cm_ancho\":" + (cmAncho || "null") + ",\"cm_alto\":" + (cmAlto || "null") + "},\"transparencias\":{\"tiene\":false,\"estado\":\"ok|advertencia|error\",\"detalle\":\"\"},\"perfil_color_icc\":{\"tiene\":false,\"perfil\":null,\"estado\":\"ok|advertencia|error\",\"detalle\":\"\"},\"calidad_general\":\"alta|media|baja\",\"problemas_criticos\":[],\"advertencias\":[],\"tiempo_estimado\":{\"total_minutos\":0,\"desglose\":{\"correccion_color_min\":0,\"textos_tipografia_min\":0,\"sangria_corte_min\":0,\"resolucion_min\":0,\"revision_final_min\":0},\"justificacion\":\"\"},\"resumen\":\"\"}";

    let userContent;
    if (esVisual || esPDF) {
      const mediaType = esPDF ? "application/pdf" : mimetype;
      const tipo = esPDF ? "document" : "image";
      userContent = [
        { type: tipo, source: { type: "base64", media_type: mediaType, data: base64 } },
        { type: "text", text: "Analiza preflight. " + originalname + ". " + ctx + " Solo JSON." }
      ];
    } else {
      userContent = "Analiza preflight. " + originalname + ". " + ctx + " Solo JSON.";
    }

    const callClaude = async (retries = 3, delay = 5000) => {
      for (let i = 0; i < retries; i++) {
        const r = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
          body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1200, system: sys, messages: [{ role: "user", content: userContent }] })
        });
        if (r.ok) return r;
        const err = await r.text();
        if ((r.status === 529 || r.status === 500 || r.status === 503) && i < retries - 1) {
          await new Promise(rr => setTimeout(rr, delay));
          delay = Math.round(delay * 1.5);
          continue;
        }
        throw new Error("Claude API " + r.status + ": " + err);
      }
    };

    const response = await callClaude();
    const data = await response.json();
    const raw = data.content.map(b => b.text || "").join("").trim();
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("JSON inválido");

    const analisis = JSON.parse(match[0]);

    const t = analisis.tamanio || {};
    if (cmAncho) t.cm_ancho = cmAncho;
    if (cmAlto) t.cm_alto = cmAlto;
    if (mmAncho) t.mm_ancho = mmAncho;
    if (mmAlto) t.mm_alto = mmAlto;
    if (pxAncho) t.px_ancho = pxAncho;
    if (pxAlto) t.px_alto = pxAlto;
    if (dpiMeta && !analisis.resolucion?.valor_dpi) {
      if (!analisis.resolucion) analisis.resolucion = {};
      analisis.resolucion.valor_dpi = dpiMeta;
    }
    analisis.tamanio = t;
    analisis.archivo = { nombre: originalname, formato: ext.toUpperCase(), tamano_mb: parseFloat(sizeMB) };

    res.json({ ok: true, analisis });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ ok: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Preflight Pro v4 puerto " + PORT));
