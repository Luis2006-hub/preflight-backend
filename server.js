const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer({ limits: { fileSize: 20 * 1024 * 1024 } });
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Preflight Pro backend activo v3" });
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
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Source Sans 3',sans-serif;background:#e8e6e3;display:flex;flex-direction:column;height:100vh;overflow:hidden;}
/* Titlebar */
.tb{background:#3d3d3d;padding:5px 14px;display:flex;align-items:center;gap:8px;flex-shrink:0;}
.tb-ico{width:16px;height:16px;background:#e8200c;border-radius:2px;display:flex;align-items:center;justify-content:center;}
.tb-name{font-size:12px;color:#d0d0d0;margin-left:6px;}
.tb-ver{font-size:10px;color:#666;margin-left:auto;}
/* Toolbar */
.bar{background:#f0eeeb;border-bottom:1px solid #c8c5c0;padding:5px 12px;display:flex;align-items:center;gap:6px;flex-shrink:0;}
.btn{display:flex;align-items:center;gap:4px;padding:4px 10px;border-radius:2px;border:1px solid transparent;background:transparent;cursor:pointer;font-size:11px;color:#3a3a3a;font-family:inherit;transition:all .12s;}
.btn:hover{background:#e0ddd8;border-color:#c0bdb8;}
.btn-r{background:#e8200c;color:#fff;border-color:#c41a09;}
.btn-r:hover{background:#c41a09;}
.sep{width:1px;height:18px;background:#c8c5c0;margin:0 3px;}
.bar-info{font-size:11px;color:#999;}
#fi{display:none;}
/* Layout */
.layout{display:flex;flex:1;overflow:hidden;}
/* Sidebar */
.side{width:220px;flex-shrink:0;background:#f5f3f0;border-right:1px solid #c8c5c0;overflow-y:auto;}
.pnl{border-bottom:1px solid #c8c5c0;}
.pnl-h{background:#e8e6e3;padding:6px 10px;display:flex;align-items:center;gap:5px;}
.pnl-t{font-size:10px;font-weight:600;color:#3a3a3a;text-transform:uppercase;letter-spacing:.05em;}
.pnl-b{padding:7px 10px;}
.row{display:flex;justify-content:space-between;align-items:baseline;padding:3px 0;border-bottom:1px solid #ede9e4;}
.row:last-child{border-bottom:none;}
.rl{font-size:11px;color:#666;}
.rv{font-size:11px;font-weight:600;color:#2a2a2a;text-align:right;max-width:130px;word-break:break-word;}
.rv.ok{color:#1a7a1a;} .rv.warn{color:#b85c00;} .rv.err{color:#c41a09;}
/* Viewer */
.vwrap{flex:1;display:flex;flex-direction:column;overflow:hidden;}
.drop{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;background:#e8e6e3;transition:background .15s;}
.drop:hover,.drop.over{background:#dedad6;}
.drop-ico{width:48px;height:48px;background:#e8200c;border-radius:3px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;}
.drop-t{font-size:14px;font-weight:600;color:#2a2a2a;margin-bottom:4px;}
.drop-h{font-size:12px;color:#888;}
.drop-f{font-size:10px;color:#bbb;margin-top:8px;text-transform:uppercase;letter-spacing:.04em;}
.anzone{display:none;flex:1;flex-direction:column;align-items:center;justify-content:center;background:#f5f3f0;}
.spin{width:28px;height:28px;border:3px solid #ddd;border-top-color:#e8200c;border-radius:50%;animation:sp .7s linear infinite;margin-bottom:12px;}
@keyframes sp{to{transform:rotate(360deg);}}
.an-t{font-size:13px;font-weight:600;color:#2a2a2a;margin-bottom:4px;}
.an-s{font-size:11px;color:#888;margin-bottom:10px;}
.prog{height:3px;background:#ddd;border-radius:2px;overflow:hidden;width:220px;}
.prog-f{height:100%;background:#e8200c;transition:width .4s;}
.viewer{flex:1;overflow-y:auto;background:#6a6a6a;display:none;flex-direction:column;align-items:center;padding:16px;gap:12px;}
.pgwrap{background:#fff;}
.pgwrap canvas,.pgwrap img{display:block;max-width:100%;}
.pglbl{font-size:10px;color:#ccc;text-align:center;margin-top:4px;}
.err-view{flex:1;display:none;flex-direction:column;align-items:center;justify-content:center;background:#f5f3f0;}
.err-t{font-size:13px;font-weight:600;color:#c41a09;margin-bottom:6px;}
.err-d{font-size:11px;color:#888;text-align:center;max-width:300px;line-height:1.5;}
/* Checks */
.chk{display:flex;align-items:flex-start;gap:6px;padding:5px 0;border-bottom:1px solid #ede9e4;}
.chk:last-child{border-bottom:none;}
.cdot{width:13px;height:13px;border-radius:50%;flex-shrink:0;margin-top:1px;display:flex;align-items:center;justify-content:center;}
.dok{background:#1a7a1a;} .dwn{background:#b85c00;} .derr{background:#c41a09;}
.cn{font-size:11px;font-weight:600;color:#2a2a2a;}
.cd{font-size:10px;color:#777;margin-top:1px;line-height:1.3;}
/* AI box */
.aibox{background:#fff8f7;border-top:2px solid #e8200c;padding:10px 12px;flex-shrink:0;display:none;}
.ai-l{font-size:10px;font-weight:600;color:#e8200c;text-transform:uppercase;margin-bottom:3px;}
.ai-t{font-size:11px;color:#3a3a3a;line-height:1.5;}
/* Statusbar */
.sbar{background:#dedad6;border-top:1px solid #c8c5c0;padding:3px 12px;display:flex;align-items:center;gap:12px;flex-shrink:0;}
.si{font-size:10px;color:#666;}
.si strong{color:#2a2a2a;}
.vdict{margin-left:auto;padding:2px 9px;border-radius:2px;font-size:10px;font-weight:600;display:none;}
.vok{background:#e8f5e8;color:#1a5c1a;border:1px solid #8fbc8f;}
.vwn{background:#fff3e0;color:#8a4500;border:1px solid #e6a030;}
.ver{background:#fde8e8;color:#8a1010;border:1px solid #e06060;}
</style>
</head>
<body>
<div class="tb">
  <div class="tb-ico"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 8L5 2l4 6H1z" fill="white"/></svg></div>
  <span class="tb-name">Preflight Pro</span>
  <span class="tb-ver">v3.0</span>
</div>
<div class="bar">
  <button class="btn btn-r" onclick="document.getElementById('fi').click()">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1.5v7M3.5 4.5l2.5-3 2.5 3" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.5 9.5h9" stroke="white" stroke-width="1.4" stroke-linecap="round"/></svg>
    Abrir archivo
  </button>
  <div class="sep"></div>
  <button class="btn" onclick="resetApp()">
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 6a4.5 4.5 0 1 0 1.3-3.1L1.5 1.5V4h2.5" stroke="#3a3a3a" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
    Nuevo análisis
  </button>
  <div class="sep"></div>
  <span class="bar-info" id="bar-info">PDF · PNG · JPG · TIFF · PSD</span>
  <input type="file" id="fi" accept=".pdf,.png,.jpg,.jpeg,.tiff,.tif,.gif,.bmp,.webp,.svg,.psd">
</div>
<div class="layout">
  <div class="side" id="side">
    <div class="pnl">
      <div class="pnl-h"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="1" y="1" width="9" height="9" rx="1" stroke="#555" stroke-width="1.1"/><path d="M3 5.5h5M3 3.5h5M3 7.5h3" stroke="#555" stroke-width="1" stroke-linecap="round"/></svg><span class="pnl-t">Propiedades</span></div>
      <div class="pnl-b">
        <div class="row"><span class="rl">Archivo</span><span class="rv" id="p-nom">—</span></div>
        <div class="row"><span class="rl">Formato</span><span class="rv" id="p-fmt">—</span></div>
        <div class="row"><span class="rl">Peso</span><span class="rv" id="p-peso">—</span></div>
        <div class="row"><span class="rl">Páginas</span><span class="rv" id="p-pag">—</span></div>
        <div class="row"><span class="rl">Medidas</span><span class="rv" id="p-med">—</span></div>
        <div class="row"><span class="rl">Resolución</span><span class="rv" id="p-dpi">—</span></div>
        <div class="row"><span class="rl">Modo color</span><span class="rv" id="p-col">—</span></div>
      </div>
    </div>
    <div class="pnl" id="pnl-chk" style="display:none">
      <div class="pnl-h"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 5.5l2.5 2.5 5.5-5.5" stroke="#555" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="pnl-t">Preflight</span></div>
      <div class="pnl-b" id="chk-body"></div>
    </div>
    <div class="pnl" id="pnl-time" style="display:none">
      <div class="pnl-h"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="#555" stroke-width="1.1"/><path d="M5.5 3v3l1.5 1" stroke="#555" stroke-width="1" stroke-linecap="round"/></svg><span class="pnl-t">Tiempo estimado</span></div>
      <div class="pnl-b">
        <div class="row"><span class="rl">Total</span><span class="rv" id="t-tot">—</span></div>
        <div class="row"><span class="rl">Color</span><span class="rv" id="t-col">—</span></div>
        <div class="row"><span class="rl">Textos</span><span class="rv" id="t-txt">—</span></div>
        <div class="row"><span class="rl">Sangría</span><span class="rv" id="t-san">—</span></div>
        <div class="row"><span class="rl">Resolución</span><span class="rv" id="t-res">—</span></div>
        <div class="row"><span class="rl">Revisión</span><span class="rv" id="t-rev">—</span></div>
      </div>
    </div>
  </div>
  <div class="vwrap">
    <div class="drop" id="drop" onclick="document.getElementById('fi').click()">
      <div class="drop-ico"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3v13M8 9l4-6 4 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 18v2a2 2 0 002 2h14a2 2 0 002-2v-2" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></div>
      <div class="drop-t">Arrastra tu archivo aquí</div>
      <div class="drop-h">o haz clic para seleccionar</div>
      <div class="drop-f">PDF · PNG · JPG · TIFF · PSD · GIF · BMP · WEBP · SVG</div>
    </div>
    <div class="anzone" id="anzone">
      <div class="spin"></div>
      <div class="an-t">Analizando archivo…</div>
      <div class="an-s" id="an-s">Leyendo metadatos</div>
      <div class="prog"><div class="prog-f" id="prog" style="width:5%"></div></div>
    </div>
    <div class="viewer" id="viewer"></div>
    <div class="err-view" id="errview">
      <div class="err-t" id="err-t">Error</div>
      <div class="err-d" id="err-d"></div>
    </div>
    <div class="aibox" id="aibox">
      <div class="ai-l">Análisis IA</div>
      <div class="ai-t" id="ai-t"></div>
    </div>
  </div>
</div>
<div class="sbar">
  <span class="si" id="sb-f">Sin archivo</span>
  <span class="si" id="sb-d"></span>
  <span class="si" id="sb-r"></span>
  <span class="vdict" id="sb-v"></span>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script>
pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
const BACKEND='https://preflight-backend-production-e718.up.railway.app';
let objURL=null;
const dropEl=document.getElementById('drop');
const fiEl=document.getElementById('fi');
dropEl.addEventListener('dragover',e=>{e.preventDefault();dropEl.classList.add('over');});
dropEl.addEventListener('dragleave',()=>dropEl.classList.remove('over'));
dropEl.addEventListener('drop',e=>{e.preventDefault();dropEl.classList.remove('over');go(e.dataTransfer.files[0]);});
fiEl.addEventListener('change',e=>{if(e.target.files[0])go(e.target.files[0]);});

function fb(b){if(b<1024)return b+' B';if(b<1048576)return(b/1024).toFixed(1)+' KB';return(b/1048576).toFixed(2)+' MB';}
function sp(p,m){document.getElementById('prog').style.width=p+'%';document.getElementById('an-s').textContent=m;}
function sv(id,v,c){const e=document.getElementById(id);if(!e)return;e.textContent=v;e.className='rv'+(c?' '+c:'');}

async function go(file){
  if(!file)return;
  const ext=file.name.split('.').pop().toLowerCase();
  if(objURL){URL.revokeObjectURL(objURL);objURL=null;}

  // UI: mostrar zona análisis
  dropEl.style.display='none';
  document.getElementById('anzone').style.display='flex';
  document.getElementById('viewer').style.display='none';
  document.getElementById('viewer').innerHTML='';
  document.getElementById('errview').style.display='none';
  document.getElementById('aibox').style.display='none';
  document.getElementById('pnl-chk').style.display='none';
  document.getElementById('pnl-time').style.display='none';
  document.getElementById('sb-v').style.display='none';

  // Info inmediata
  const nomCorto=file.name.length>22?file.name.slice(0,20)+'…':file.name;
  sv('p-nom',nomCorto); sv('p-fmt',ext.toUpperCase()); sv('p-peso',fb(file.size));
  document.getElementById('bar-info').textContent=file.name;
  document.getElementById('sb-f').textContent=file.name;

  sp(8,'Leyendo metadatos del archivo…');

  // ── Leer metadatos reales del archivo en el navegador ──
  const raster=['png','jpg','jpeg','gif','bmp','webp','tif','tiff'];
  let pxW=null,pxH=null,dpiReal=null,mmW=null,mmH=null,cmW=null,cmH=null,dpiEstimado=false;

  if(raster.includes(ext)){
    sp(15,'Extrayendo dimensiones en píxeles…');
    try{const d=await getDims(file);pxW=d.w;pxH=d.h;}catch(e){}
    sp(22,'Leyendo DPI de metadatos binarios…');
    try{dpiReal=await getDPI(file);}catch(e){}

    // Siempre calcular cm: usar DPI real o 72 como fallback (igual que Photoshop)
    const dpiUsado=dpiReal&&dpiReal>0?dpiReal:72;
    if(!dpiReal||dpiReal<=0)dpiEstimado=true;

    if(pxW&&pxH){
      mmW=Math.round((pxW/dpiUsado)*25.4);
      mmH=Math.round((pxH/dpiUsado)*25.4);
      cmW=parseFloat((mmW/10).toFixed(1));
      cmH=parseFloat((mmH/10).toFixed(1));
    }

    const medStr=cmW&&cmH?cmW+' x '+cmH+' cm'+(dpiEstimado?' *':''):pxW+'x'+pxH+' px';
    const dpiStr=dpiEstimado?'72 DPI (por defecto)':(dpiReal+' DPI');
    sv('p-med',medStr,dpiEstimado?'warn':'');
    sv('p-dpi',dpiStr,dpiEstimado?'warn':dpiReal>=300?'ok':dpiReal>=150?'warn':'err');
    document.getElementById('sb-d').textContent=medStr;
    document.getElementById('sb-r').textContent=dpiStr;

  } else if(ext==='pdf'){
    sp(15,'Leyendo MediaBox del PDF…');
    try{
      const pd=await getPDFDims(file);
      if(pd){
        mmW=pd.mmW;mmH=pd.mmH;cmW=pd.cmW;cmH=pd.cmH;
        sv('p-med',cmW+' x '+cmH+' cm');
        sv('p-dpi','Vectorial PDF');
        document.getElementById('sb-d').textContent=cmW+' x '+cmH+' cm ('+mmW+' x '+mmH+' mm)';
      }
    }catch(e){}
  } else if(ext==='psd'){
    sp(15,'Leyendo cabecera PSD…');
    try{
      const pd=await getPSDDims(file);
      if(pd){
        pxW=pd.w;pxH=pd.h;dpiReal=pd.dpi;
        mmW=Math.round((pxW/dpiReal)*25.4);mmH=Math.round((pxH/dpiReal)*25.4);
        cmW=parseFloat((mmW/10).toFixed(1));cmH=parseFloat((mmH/10).toFixed(1));
        sv('p-med',cmW+' x '+cmH+' cm');
        sv('p-dpi',dpiReal+' DPI',dpiReal>=300?'ok':dpiReal>=150?'warn':'err');
        document.getElementById('sb-d').textContent=cmW+' x '+cmH+' cm';
      }
    }catch(e){}
  }

  sv('p-pag','1');

  // ── Renderizar vista previa ──
  sp(35,'Renderizando vista previa…');
  await renderPreview(file,ext);

  // ── Enviar a IA ──
  sp(65,'IA analizando preflight…');
  try{
    const fd=new FormData();
    fd.append('archivo',file,file.name);
    if(pxW)fd.append('px_ancho',pxW);
    if(pxH)fd.append('px_alto',pxH);
    if(dpiReal)fd.append('dpi_meta',dpiReal);
    if(mmW)fd.append('mm_ancho',mmW);
    if(mmH)fd.append('mm_alto',mmH);
    if(cmW)fd.append('cm_ancho',cmW);
    if(cmH)fd.append('cm_alto',cmH);

    const resp=await fetch(BACKEND+'/analizar',{method:'POST',body:fd});
    sp(95,'Generando reporte…');
    if(!resp.ok)throw new Error('HTTP '+resp.status);
    const data=await resp.json();
    if(!data.ok)throw new Error(data.error||'Error del servidor');
    showResults(data.analisis,cmW,cmH,mmW,mmH,pxW,pxH,dpiReal,dpiEstimado);
  }catch(err){
    showError('Error de análisis: '+err.message+(dpiEstimado?'\\n* Medidas estimadas a 72 DPI':''));
  }
}

async function renderPreview(file,ext){
  const v=document.getElementById('viewer');
  v.innerHTML='';
  if(ext==='pdf'){
    try{
      const buf=await file.arrayBuffer();
      const pdf=await pdfjsLib.getDocument({data:buf}).promise;
      const total=Math.min(pdf.numPages,10);
      sv('p-pag',pdf.numPages>10?'10 / '+pdf.numPages:String(pdf.numPages));
      for(let p=1;p<=total;p++){
        sp(35+Math.round((p/total)*25),'Renderizando página '+p+'/'+total+'…');
        const page=await pdf.getPage(p);
        const vp=page.getViewport({scale:1.5});
        const canvas=document.createElement('canvas');
        canvas.width=vp.width;canvas.height=vp.height;
        canvas.style.maxWidth='100%';
        await page.render({canvasContext:canvas.getContext('2d'),viewport:vp}).promise;
        const wrap=document.createElement('div');
        wrap.className='pgwrap';
        wrap.appendChild(canvas);
        if(pdf.numPages>1){const l=document.createElement('div');l.className='pglbl';l.textContent='Página '+p+' de '+pdf.numPages;wrap.appendChild(l);}
        v.appendChild(wrap);
      }
    }catch(e){v.innerHTML='<p style="color:#ccc;padding:2rem;font-size:12px">No se pudo renderizar el PDF</p>';}
  } else {
    objURL=URL.createObjectURL(file);
    const img=new Image();
    img.onload=()=>{};
    img.src=objURL;
    img.style.maxWidth='100%';
    const wrap=document.createElement('div');
    wrap.className='pgwrap';
    wrap.appendChild(img);
    v.appendChild(wrap);
  }
  document.getElementById('anzone').style.display='none';
  v.style.display='flex';
}

function showResults(d,cmW,cmH,mmW,mmH,pxW,pxH,dpiReal,dpiEstimado){
  // Medidas: priorizar las leídas por el navegador
  const t=d.tamanio||{};
  if(cmW)t.cm_ancho=cmW;
  if(cmH)t.cm_alto=cmH;
  if(mmW)t.mm_ancho=mmW;
  if(mmH)t.mm_alto=mmH;

  const dpi=d.resolucion?.valor_dpi||dpiReal;
  const medStr=cmW&&cmH?cmW+' x '+cmH+' cm'+(dpiEstimado?' *':''):mmW&&mmH?mmW+' x '+mmH+' mm':'—';
  sv('p-med',medStr,dpiEstimado?'warn':'');
  sv('p-col',d.modo_color?.valor||'—',d.modo_color?.estado==='ok'?'ok':d.modo_color?.estado==='error'?'err':'warn');

  const allC=[d.resolucion,d.modo_color,d.textos_trazados,d.sangria,d.cruces_de_corte,d.transparencias,d.perfil_color_icc];
  const errN=allC.filter(x=>x&&x.estado==='error').length;
  const warnN=allC.filter(x=>x&&(x.estado==='advertencia'||x.estado==='no_determinable')).length;
  const verdict=errN>0?{c:'ver',l:'Requiere correcciones'}:warnN>0?{c:'vwn',l:'Advertencias'}:{c:'vok',l:'✓ Listo para imprimir'};
  const vEl=document.getElementById('sb-v');
  vEl.textContent=verdict.l;vEl.className='vdict '+verdict.c;vEl.style.display='block';

  function dot(e){
    const c=e==='ok'?'dok':e==='error'?'derr':'dwn';
    const ic=e==='ok'?'<path d="M2 6l2.5 2.5 5-5" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>':e==='error'?'<path d="M2.5 2.5l6 6M8.5 2.5l-6 6" stroke="white" stroke-width="1.3" stroke-linecap="round"/>':'<path d="M4.5 2v3M4.5 6v.5" stroke="white" stroke-width="1.3" stroke-linecap="round"/>';
    return '<div class="cdot '+c+'"><svg width="9" height="9" viewBox="0 0 9 9" fill="none">'+ic+'</svg></div>';
  }

  const checks=[
    {n:'Medidas',d:medStr+(dpiEstimado?' (est. 72 DPI)':''),e:d.tamanio?.estado||'advertencia'},
    {n:'Resolución',d:dpi?dpi+' DPI':'No determinada',e:d.resolucion?.estado||'advertencia'},
    {n:'Modo de color',d:d.modo_color?.valor||'—',e:d.modo_color?.estado||'advertencia'},
    {n:'Textos trazados',d:d.textos_trazados?.detalle||'—',e:d.textos_trazados?.estado||'advertencia'},
    {n:'Sangría',d:d.sangria?.tiene?(d.sangria.valor_mm!=null?d.sangria.valor_mm+' mm':'presente'):'Sin sangría',e:d.sangria?.estado||'error'},
    {n:'Cruces de corte',d:d.cruces_de_corte?.tiene?'Detectados':'No detectados',e:d.cruces_de_corte?.estado||'error'},
    {n:'Perfil ICC',d:d.perfil_color_icc?.perfil||d.perfil_color_icc?.detalle||'—',e:d.perfil_color_icc?.estado||'advertencia'},
  ];
  document.getElementById('chk-body').innerHTML=checks.map(c=>'<div class="chk">'+dot(c.e)+'<div><div class="cn">'+c.n+'</div><div class="cd">'+c.d+'</div></div></div>').join('');
  document.getElementById('pnl-chk').style.display='block';

  const tb=d.tiempo_estimado?.desglose||{};
  const tot=d.tiempo_estimado?.total_minutos||0;
  const totStr=tot>=60?Math.floor(tot/60)+'h '+(tot%60?tot%60+'m':''):tot+' min';
  sv('t-tot',totStr);sv('t-col',(tb.correccion_color_min||0)+' min');sv('t-txt',(tb.textos_tipografia_min||0)+' min');
  sv('t-san',(tb.sangria_corte_min||0)+' min');sv('t-res',(tb.resolucion_min||0)+' min');sv('t-rev',(tb.revision_final_min||0)+' min');
  document.getElementById('pnl-time').style.display='block';

  if(d.resumen){document.getElementById('ai-t').textContent=d.resumen;document.getElementById('aibox').style.display='block';}
}

function showError(msg){
  document.getElementById('anzone').style.display='none';
  document.getElementById('errview').style.display='flex';
  document.getElementById('err-t').textContent='Error en el análisis';
  document.getElementById('err-d').textContent=msg;
}

function resetApp(){
  dropEl.style.display='flex';
  ['anzone','errview','aibox'].forEach(id=>document.getElementById(id).style.display='none');
  const v=document.getElementById('viewer');v.style.display='none';v.innerHTML='';
  ['pnl-chk','pnl-time'].forEach(id=>document.getElementById(id).style.display='none');
  document.getElementById('sb-v').style.display='none';
  document.getElementById('bar-info').textContent='PDF · PNG · JPG · TIFF · PSD';
  document.getElementById('sb-f').textContent='Sin archivo';
  document.getElementById('sb-d').textContent='';
  document.getElementById('sb-r').textContent='';
  ['p-nom','p-fmt','p-peso','p-pag','p-med','p-dpi','p-col','t-tot','t-col','t-txt','t-san','t-res','t-rev'].forEach(id=>sv(id,'—'));
  fiEl.value='';
  if(objURL){URL.revokeObjectURL(objURL);objURL=null;}
}

// ── Lectura de metadatos desde el navegador ──────────────────────────────────
function getDims(file){
  return new Promise((res,rej)=>{
    const url=URL.createObjectURL(file);
    const img=new Image();
    img.onload=()=>{res({w:img.naturalWidth,h:img.naturalHeight});URL.revokeObjectURL(url);};
    img.onerror=()=>{URL.revokeObjectURL(url);rej(new Error('no img'));};
    img.src=url;
  });
}

function getDPI(file){
  return new Promise(resolve=>{
    const reader=new FileReader();
    reader.onload=e=>{
      try{
        const b=new Uint8Array(e.target.result);
        // PNG pHYs chunk
        if(b[0]===137&&b[1]===80&&b[2]===78){
          for(let i=0;i<b.length-13;i++){
            if(b[i]===112&&b[i+1]===72&&b[i+2]===89&&b[i+3]===115){
              const x=(b[i+4]<<24)|(b[i+5]<<16)|(b[i+6]<<8)|b[i+7];
              if(b[i+12]===1&&x>0){resolve(Math.round(x*0.0254));return;}
            }
          }
        }
        // JPEG JFIF
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
        // TIFF
        if((b[0]===0x49&&b[1]===0x49)||(b[0]===0x4D&&b[1]===0x4D)){
          const le=b[0]===0x49;
          const r16=o=>le?(b[o]|(b[o+1]<<8)):(b[o]<<8|b[o+1]);
          const r32=o=>le?(b[o]|(b[o+1]<<8)|(b[o+2]<<16)|(b[o+3]<<24)):((b[o]<<24)|(b[o+1]<<16)|(b[o+2]<<8)|b[o+3]);
          const ioff=r32(4);const nt=r16(ioff);
          let xr=null,ut=2;
          for(let i=0;i<nt;i++){
            const tag=r16(ioff+2+i*12);
            if(tag===0x011A){const vo=r32(ioff+2+i*12+8);const n=r32(vo),d=r32(vo+4);if(d>0)xr=n/d;}
            if(tag===0x0128){ut=r16(ioff+2+i*12+8);}
          }
          if(xr){resolve(ut===3?Math.round(xr*2.54):Math.round(xr));return;}
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
        // Buscar MediaBox con regex simple
        const idx=txt.indexOf('MediaBox');
        if(idx<0){resolve(null);return;}
        const chunk=txt.slice(idx,idx+80);
        const nums=chunk.match(/[-\d.]+/g);
        if(nums&&nums.length>=4){
          const x1=parseFloat(nums[0]),y1=parseFloat(nums[1]),x2=parseFloat(nums[2]),y2=parseFloat(nums[3]);
          const w=x2-x1,h=y2-y1;
          const mmW=Math.round(w*(25.4/72));
          const mmH=Math.round(h*(25.4/72));
          resolve({mmW,mmH,cmW:parseFloat((mmW/10).toFixed(1)),cmH:parseFloat((mmH/10).toFixed(1))});
        }else resolve(null);
      }catch(e){resolve(null);}
    };
    reader.readAsText(file.slice(0,65536));
  });
}

function getPSDDims(file){
  return new Promise(resolve=>{
    const reader=new FileReader();
    reader.onload=e=>{
      try{
        const b=new Uint8Array(e.target.result);
        if(b[0]===0x38&&b[1]===0x42&&b[2]===0x50&&b[3]===0x53){
          const h=(b[14]<<24)|(b[15]<<16)|(b[16]<<8)|b[17];
          const w=(b[18]<<24)|(b[19]<<16)|(b[20]<<8)|b[21];
          let dpi=72;
          let o=26;
          const cml=(b[o]<<24)|(b[o+1]<<16)|(b[o+2]<<8)|b[o+3];
          o+=4+cml;
          const irl=(b[o]<<24)|(b[o+1]<<16)|(b[o+2]<<8)|b[o+3];
          o+=4;const end=o+irl;
          while(o<end-8){
            if(b[o]===0x38&&b[o+1]===0x42&&b[o+2]===0x49&&b[o+3]===0x4D){
              const rid=(b[o+4]<<8)|b[o+5];
              const nl=b[o+6];const np=nl%2===0?nl+2:nl+1;
              const dof=o+6+np;
              const dl=(b[dof]<<24)|(b[dof+1]<<16)|(b[dof+2]<<8)|b[dof+3];
              if(rid===0x03ED&&dl>=4){const df=(b[dof+4]<<8)|b[dof+5];if(df>0)dpi=df;}
              o=dof+4+dl+(dl%2);
            }else break;
          }
          resolve({w,h,dpi});
        }else resolve(null);
      }catch(e){resolve(null);}
    };
    reader.readAsArrayBuffer(file.slice(0,262144));
  });
}
</script>
</body>
</html>`);
});

app.post("/analizar", upload.single("archivo"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No se recibió ningún archivo" });
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

    const tiposVisuales = ["png", "jpg", "jpeg", "gif", "bmp", "webp"];
    const esPDF = ext === "pdf";
    const esVisual = tiposVisuales.includes(ext);

    let ctx = "";
    if (cmAncho && cmAlto) ctx = "Medidas verificadas por navegador: " + cmAncho + " x " + cmAlto + " cm (" + mmAncho + " x " + mmAlto + " mm" + (pxAncho ? ", " + pxAncho + " x " + pxAlto + " px" : "") + ")" + (dpiMeta ? ", DPI: " + dpiMeta : "") + ".";
    else if (pxAncho && pxAlto) ctx = "Dimensiones: " + pxAncho + " x " + pxAlto + " px" + (dpiMeta ? ", DPI: " + dpiMeta : " sin DPI") + ".";

    const sys = "Experto preflight imprenta. JSON sin backticks. " + ctx + " Analiza modo color, textos trazados, sangria, cruces de corte, transparencias, perfil ICC. Responde solo con el JSON: {\"resolucion\":{\"valor_dpi\":" + (dpiMeta || "null") + ",\"estado\":\"ok|advertencia|error\",\"detalle\":\"\"},\"modo_color\":{\"valor\":\"CMYK|RGB|Escala de grises|Desconocido\",\"estado\":\"ok|advertencia|error\",\"detalle\":\"\"},\"textos_trazados\":{\"metodo\":\"\",\"estado\":\"ok|advertencia|error|no_determinable\",\"detalle\":\"\"},\"sangria\":{\"tiene\":false,\"valor_mm\":null,\"estado\":\"ok|advertencia|error\",\"detalle\":\"\"},\"cruces_de_corte\":{\"tiene\":false,\"estado\":\"ok|advertencia|error\",\"detalle\":\"\"},\"tamanio\":{\"px_ancho\":" + (pxAncho || "null") + ",\"px_alto\":" + (pxAlto || "null") + ",\"mm_ancho\":" + (mmAncho || "null") + ",\"mm_alto\":" + (mmAlto || "null") + ",\"cm_ancho\":" + (cmAncho || "null") + ",\"cm_alto\":" + (cmAlto || "null") + "},\"transparencias\":{\"tiene\":false,\"estado\":\"ok|advertencia|error\",\"detalle\":\"\"},\"perfil_color_icc\":{\"tiene\":false,\"perfil\":null,\"estado\":\"ok|advertencia|error\",\"detalle\":\"\"},\"calidad_general\":\"alta|media|baja\",\"problemas_criticos\":[],\"advertencias\":[],\"tiempo_estimado\":{\"total_minutos\":0,\"desglose\":{\"correccion_color_min\":0,\"textos_tipografia_min\":0,\"sangria_corte_min\":0,\"resolucion_min\":0,\"revision_final_min\":0},\"justificacion\":\"\"},\"resumen\":\"\"}";

    let userContent;
    if (esVisual || esPDF) {
      const mediaType = esPDF ? "application/pdf" : mimetype;
      const tipo = esPDF ? "document" : "image";
      userContent = [
        { type: tipo, source: { type: "base64", media_type: mediaType, data: base64 } },
        { type: "text", text: "Analiza preflight. Archivo: " + originalname + ". " + ctx + " Responde solo JSON." }
      ];
    } else {
      userContent = "Analiza preflight. Archivo: " + originalname + ". " + ctx + " Responde solo JSON.";
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
          await new Promise(r => setTimeout(r, delay)); delay = Math.round(delay * 1.5); continue;
        }
        throw new Error("Claude API error " + r.status + ": " + err);
      }
    };

    const response = await callClaude();
    const data = await response.json();
    const raw = data.content.map(b => b.text || "").join("").trim();
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("JSON inválido");

    const analisis = JSON.parse(match[0]);

    // Garantizar medidas del navegador
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
app.listen(PORT, () => console.log("Preflight Pro v3 corriendo en puerto " + PORT));
