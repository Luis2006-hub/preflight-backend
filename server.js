const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer({ limits: { fileSize: 20 * 1024 * 1024 } });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Preflight Pro backend activo ✓" });
});

app.get("/widget", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.send(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Preflight Pro</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Source Sans 3',sans-serif;background:#e8e6e3;padding:0;}
.app{display:flex;flex-direction:column;height:100vh;min-height:600px;}

/* Titlebar */
.titlebar{background:#3d3d3d;padding:6px 14px;display:flex;align-items:center;gap:8px;flex-shrink:0;}
.logo-ico{width:16px;height:16px;background:#e8200c;border-radius:2px;display:flex;align-items:center;justify-content:center;}
.app-title{font-size:12px;color:#d0d0d0;margin-left:6px;}
.app-ver{font-size:10px;color:#666;margin-left:auto;}

/* Toolbar */
.toolbar{background:#f0eeeb;border-bottom:1px solid #c8c5c0;padding:5px 12px;display:flex;align-items:center;gap:6px;flex-shrink:0;}
.tbtn{display:flex;align-items:center;gap:4px;padding:4px 10px;border-radius:2px;border:1px solid transparent;background:transparent;cursor:pointer;font-size:11px;color:#3a3a3a;font-family:'Source Sans 3',sans-serif;transition:all 0.12s;white-space:nowrap;}
.tbtn:hover{background:#e0ddd8;border-color:#c0bdb8;}
.tbtn-red{background:#e8200c;color:white;border-color:#c41a09;}
.tbtn-red:hover{background:#c41a09;}
.tdiv{width:1px;height:18px;background:#c8c5c0;margin:0 3px;}
.tinfo{font-size:11px;color:#888;}
#file-input{display:none;}

/* Main layout */
.main{display:flex;flex:1;overflow:hidden;}

/* Sidebar */
.sidebar{width:220px;flex-shrink:0;background:#f5f3f0;border-right:1px solid #c8c5c0;overflow-y:auto;}
.panel{border-bottom:1px solid #c8c5c0;}
.panel-hdr{background:#e8e6e3;padding:6px 10px;display:flex;align-items:center;gap:5px;cursor:pointer;user-select:none;}
.panel-title{font-size:10px;font-weight:600;color:#3a3a3a;text-transform:uppercase;letter-spacing:0.05em;}
.panel-body{padding:8px 10px;}
.stat{display:flex;justify-content:space-between;align-items:baseline;padding:3px 0;border-bottom:1px solid #ede9e4;}
.stat:last-child{border-bottom:none;}
.stat-lbl{font-size:11px;color:#666;}
.stat-val{font-size:11px;font-weight:600;color:#2a2a2a;text-align:right;max-width:120px;word-break:break-word;}
.stat-val.ok{color:#1a7a1a;} .stat-val.warn{color:#b85c00;} .stat-val.err{color:#c41a09;}

/* Viewer area */
.viewer-wrap{flex:1;display:flex;flex-direction:column;overflow:hidden;}

/* Drop zone */
.drop-zone{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;transition:all 0.15s;}
.drop-zone:hover,.drop-zone.over{background:#ebe8e4;}
.drop-ico{width:48px;height:48px;background:#e8200c;border-radius:2px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;}
.drop-title{font-size:14px;font-weight:600;color:#2a2a2a;margin-bottom:4px;}
.drop-hint{font-size:12px;color:#888;}
.drop-fmts{font-size:10px;color:#bbb;margin-top:8px;text-transform:uppercase;letter-spacing:0.04em;}

/* Viewer */
.viewer{flex:1;overflow-y:auto;background:#7a7a7a;display:none;flex-direction:column;align-items:center;padding:16px;gap:12px;}
.page-wrap{background:white;box-shadow:0 2px 6px rgba(0,0,0,0.3);}
.page-wrap canvas{display:block;}
.page-wrap img{display:block;max-width:100%;}
.page-label{font-size:10px;color:#ccc;text-align:center;margin-top:4px;}

/* Analyzing overlay */
.analyzing{display:none;flex:1;flex-direction:column;align-items:center;justify-content:center;background:#f5f3f0;}
.spinner{width:28px;height:28px;border:3px solid #ddd;border-top-color:#e8200c;border-radius:50%;animation:spin 0.7s linear infinite;margin-bottom:12px;}
@keyframes spin{to{transform:rotate(360deg);}}
.an-title{font-size:13px;font-weight:600;color:#2a2a2a;margin-bottom:4px;}
.an-step{font-size:11px;color:#888;margin-bottom:10px;}
.prog{height:3px;background:#ddd;border-radius:2px;overflow:hidden;width:220px;}
.prog-fill{height:100%;background:#e8200c;transition:width 0.4s;}

/* Check rows in sidebar */
.chk{display:flex;align-items:flex-start;gap:6px;padding:5px 0;border-bottom:1px solid #ede9e4;}
.chk:last-child{border-bottom:none;}
.chk-dot{width:13px;height:13px;border-radius:50%;flex-shrink:0;margin-top:1px;display:flex;align-items:center;justify-content:center;}
.dok{background:#1a7a1a;} .dwarn{background:#b85c00;} .derr{background:#c41a09;}
.chk-body{flex:1;}
.chk-name{font-size:11px;font-weight:600;color:#2a2a2a;}
.chk-detail{font-size:10px;color:#777;margin-top:1px;line-height:1.3;}

/* Status bar */
.statusbar{background:#e0ddd8;border-top:1px solid #c8c5c0;padding:3px 12px;display:flex;align-items:center;gap:16px;flex-shrink:0;}
.sb-item{font-size:10px;color:#666;}
.sb-item strong{color:#2a2a2a;}

.verdict{padding:3px 10px;border-radius:2px;font-size:10px;font-weight:600;margin-left:auto;}
.v-ok{background:#e8f5e8;color:#1a5c1a;border:1px solid #8fbc8f;}
.v-warn{background:#fff3e0;color:#8a4500;border:1px solid #e6a030;}
.v-err{background:#fde8e8;color:#8a1010;border:1px solid #e06060;}

.ai-box{background:#fff8f7;border-top:1px solid #f0d0cc;padding:10px 12px;}
.ai-lbl{font-size:10px;font-weight:600;color:#e8200c;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;}
.ai-txt{font-size:10px;color:#3a3a3a;line-height:1.5;}
</style>
</head>
<body>
<div class="app">
  <div class="titlebar">
    <div class="logo-ico"><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 8L5 2l4 6H1z" fill="white"/></svg></div>
    <span class="app-title">Preflight Pro</span>
    <span class="app-ver">v2.0</span>
  </div>

  <div class="toolbar">
    <button class="tbtn tbtn-red" onclick="document.getElementById('file-input').click()">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1.5v7M3.5 4.5l2.5-3 2.5 3" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.5 9.5h9" stroke="white" stroke-width="1.4" stroke-linecap="round"/></svg>
      Abrir archivo
    </button>
    <div class="tdiv"></div>
    <button class="tbtn" onclick="resetApp()">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1.5 6a4.5 4.5 0 1 0 1.3-3.1L1.5 1.5V4h2.5" stroke="#3a3a3a" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Nuevo análisis
    </button>
    <div class="tdiv"></div>
    <span class="tinfo" id="tb-info">PDF · PNG · JPG · TIFF · PSD · AI · EPS</span>
    <input type="file" id="file-input" accept=".pdf,.png,.jpg,.jpeg,.tiff,.tif,.gif,.bmp,.webp,.svg,.psd">
  </div>

  <div class="main">
    <div class="sidebar" id="sidebar">
      <div class="panel">
        <div class="panel-hdr"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="1" y="1" width="9" height="9" rx="1" stroke="#555" stroke-width="1.1"/><path d="M3 5.5h5M3 3.5h5M3 7.5h3" stroke="#555" stroke-width="1" stroke-linecap="round"/></svg><span class="panel-title">Propiedades</span></div>
        <div class="panel-body">
          <div class="stat"><span class="stat-lbl">Archivo</span><span class="stat-val" id="s-nombre">—</span></div>
          <div class="stat"><span class="stat-lbl">Formato</span><span class="stat-val" id="s-formato">—</span></div>
          <div class="stat"><span class="stat-lbl">Peso</span><span class="stat-val" id="s-peso">—</span></div>
          <div class="stat"><span class="stat-lbl">Páginas</span><span class="stat-val" id="s-pags">—</span></div>
          <div class="stat"><span class="stat-lbl">Medidas</span><span class="stat-val" id="s-medidas">—</span></div>
          <div class="stat"><span class="stat-lbl">Resolución</span><span class="stat-val" id="s-dpi">—</span></div>
          <div class="stat"><span class="stat-lbl">Modo color</span><span class="stat-val" id="s-color">—</span></div>
        </div>
      </div>
      <div class="panel" id="checks-panel" style="display:none">
        <div class="panel-hdr"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 5.5l2.5 2.5 5.5-5.5" stroke="#555" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="panel-title">Preflight</span></div>
        <div class="panel-body" id="checks-body"></div>
      </div>
      <div class="panel" id="time-panel" style="display:none">
        <div class="panel-hdr"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="#555" stroke-width="1.1"/><path d="M5.5 3v3l1.5 1" stroke="#555" stroke-width="1" stroke-linecap="round"/></svg><span class="panel-title">Tiempo estimado</span></div>
        <div class="panel-body">
          <div class="stat"><span class="stat-lbl">Total</span><span class="stat-val" id="t-total">—</span></div>
          <div class="stat"><span class="stat-lbl">Color</span><span class="stat-val" id="t-color">—</span></div>
          <div class="stat"><span class="stat-lbl">Textos</span><span class="stat-val" id="t-text">—</span></div>
          <div class="stat"><span class="stat-lbl">Sangría</span><span class="stat-val" id="t-sang">—</span></div>
          <div class="stat"><span class="stat-lbl">Resolución</span><span class="stat-val" id="t-res">—</span></div>
          <div class="stat"><span class="stat-lbl">Revisión</span><span class="stat-val" id="t-rev">—</span></div>
        </div>
      </div>
    </div>

    <div class="viewer-wrap">
      <div class="drop-zone" id="drop-zone" onclick="document.getElementById('file-input').click()">
        <div class="drop-ico"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 3v13M8 9l4-6 4 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 18v2a2 2 0 002 2h14a2 2 0 002-2v-2" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></div>
        <div class="drop-title">Arrastra tu archivo aquí</div>
        <div class="drop-hint">o haz clic para seleccionar</div>
        <div class="drop-fmts">PDF · PNG · JPG · TIFF · PSD · GIF · BMP · WEBP · SVG</div>
      </div>

      <div class="analyzing" id="analyzing">
        <div class="spinner"></div>
        <div class="an-title">Analizando archivo…</div>
        <div class="an-step" id="an-step">Leyendo metadatos</div>
        <div class="prog"><div class="prog-fill" id="prog" style="width:5%"></div></div>
      </div>

      <div class="viewer" id="viewer"></div>

      <div class="ai-box" id="ai-box" style="display:none">
        <div class="ai-lbl">Análisis IA</div>
        <div class="ai-txt" id="ai-txt"></div>
      </div>
    </div>
  </div>

  <div class="statusbar">
    <span class="sb-item" id="sb-file">Sin archivo</span>
    <span class="sb-item" id="sb-dim"></span>
    <span class="sb-item" id="sb-dpi"></span>
    <span class="verdict" id="sb-verdict" style="display:none"></span>
  </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script>
pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const BACKEND='https://preflight-backend-production-e718.up.railway.app';
let objURL=null;

const dropZone=document.getElementById('drop-zone');
const fileInput=document.getElementById('file-input');
dropZone.addEventListener('dragover',e=>{e.preventDefault();dropZone.classList.add('over');});
dropZone.addEventListener('dragleave',()=>dropZone.classList.remove('over'));
dropZone.addEventListener('drop',e=>{e.preventDefault();dropZone.classList.remove('over');handleFile(e.dataTransfer.files[0]);});
fileInput.addEventListener('change',e=>{if(e.target.files[0])handleFile(e.target.files[0]);});

function fmtBytes(b){if(b<1024)return b+' B';if(b<1048576)return(b/1024).toFixed(1)+' KB';return(b/1048576).toFixed(2)+' MB';}
function setStep(pct,msg){document.getElementById('prog').style.width=pct+'%';document.getElementById('an-step').textContent=msg;}
function setStat(id,val,cls){const el=document.getElementById(id);if(el){el.textContent=val;el.className='stat-val'+(cls?' '+cls:'');}}

async function handleFile(file){
  if(!file)return;
  if(objURL){URL.revokeObjectURL(objURL);objURL=null;}
  const ext=file.name.split('.').pop().toLowerCase();

  // Mostrar zona de análisis
  dropZone.style.display='none';
  document.getElementById('analyzing').style.display='flex';
  document.getElementById('viewer').style.display='none';
  document.getElementById('ai-box').style.display='none';
  document.getElementById('checks-panel').style.display='none';
  document.getElementById('time-panel').style.display='none';
  document.getElementById('sb-verdict').style.display='none';

  // Info básica inmediata
  setStat('s-nombre', file.name.length>20?file.name.slice(0,18)+'…':file.name);
  setStat('s-formato', ext.toUpperCase());
  setStat('s-peso', fmtBytes(file.size));
  document.getElementById('sb-file').textContent=file.name;
  document.getElementById('tb-info').textContent=file.name;

  setStep(8,'Leyendo metadatos del archivo…');

  // Leer metadatos según tipo
  let metaDPI=null, metaDims=null, pdfDims=null;
  const rasterTypes=['png','jpg','jpeg','gif','bmp','webp','tif','tiff'];

  if(rasterTypes.includes(ext)){
    setStep(15,'Extrayendo dimensiones en píxeles…');
    try{metaDims=await readImageDims(file);}catch(e){}
    setStep(22,'Leyendo DPI de metadatos binarios…');
    try{metaDPI=await readDPI(file);}catch(e){}
  } else if(ext==='pdf'){
    setStep(15,'Leyendo mediabox del PDF…');
    try{pdfDims=await readPDFDims(file);}catch(e){}
  } else if(ext==='psd'){
    setStep(15,'Leyendo cabecera PSD…');
    try{const r=await readPSDDims(file);if(r){metaDims={w:r.w,h:r.h};metaDPI=r.dpi;}}catch(e){}
  }

  // Calcular medidas físicas
  let mmW=null,mmH=null,cmW=null,cmH=null,pxW=null,pxH=null,dpi=metaDPI;

  if(pdfDims){
    mmW=pdfDims.mmW; mmH=pdfDims.mmH;
    cmW=pdfDims.cmW; cmH=pdfDims.cmH;
    setStat('s-medidas', cmW+' × '+cmH+' cm');
    setStat('s-dpi','Vectorial / PDF');
    document.getElementById('sb-dim').textContent=cmW+' × '+cmH+' cm ('+mmW+' × '+mmH+' mm)';
  } else if(metaDims){
    pxW=metaDims.w; pxH=metaDims.h;
    if(dpi&&dpi>0){
      mmW=Math.round((pxW/dpi)*25.4); mmH=Math.round((pxH/dpi)*25.4);
      cmW=parseFloat((mmW/10).toFixed(1)); cmH=parseFloat((mmH/10).toFixed(1));
      setStat('s-medidas', cmW+' × '+cmH+' cm');
      setStat('s-dpi', dpi+' DPI', dpi>=300?'ok':dpi>=150?'warn':'err');
      document.getElementById('sb-dim').textContent=cmW+' × '+cmH+' cm ('+mmW+' × '+mmH+' mm)';
      document.getElementById('sb-dpi').textContent=dpi+' DPI';
    } else {
      setStat('s-medidas', pxW+' × '+pxH+' px (sin DPI)');
      setStat('s-dpi','No en metadatos','warn');
      document.getElementById('sb-dim').textContent=pxW+' × '+pxH+' px';
    }
  }

  // Renderizar vista previa
  setStep(35,'Renderizando vista previa…');
  await renderPreview(file, ext);

  // Enviar a IA para análisis preflight
  setStep(60,'IA analizando el archivo…');
  try{
    const fd=new FormData();
    fd.append('archivo',file,file.name);
    // Pasar metadatos como campos extra
    if(pxW)fd.append('px_ancho',pxW);
    if(pxH)fd.append('px_alto',pxH);
    if(dpi)fd.append('dpi_meta',dpi);
    if(mmW)fd.append('mm_ancho',mmW);
    if(mmH)fd.append('mm_alto',mmH);
    if(cmW)fd.append('cm_ancho',cmW);
    if(cmH)fd.append('cm_alto',cmH);

    const resp=await fetch(BACKEND+'/analizar',{method:'POST',body:fd});
    setStep(90,'Generando reporte…');
    if(!resp.ok)throw new Error('HTTP '+resp.status);
    const data=await resp.json();
    if(!data.ok)throw new Error(data.error);
    showResults(data.analisis, file, ext, cmW, cmH, mmW, mmH, pxW, pxH, dpi);
  }catch(err){
    setStep(100,'Error');
    showError(err.message);
  }
}

async function renderPreview(file, ext){
  const viewer=document.getElementById('viewer');
  viewer.innerHTML='';

  if(ext==='pdf'){
    try{
      const arrayBuf=await file.arrayBuffer();
      const pdf=await pdfjsLib.getDocument({data:arrayBuf}).promise;
      const totalPages=Math.min(pdf.numPages,10);
      setStat('s-pags', totalPages+(pdf.numPages>10?' (mostrando 10 de '+pdf.numPages+')':''));
      for(let p=1;p<=totalPages;p++){
        setStep(35+Math.round((p/totalPages)*25),'Renderizando página '+p+' de '+totalPages+'…');
        const page=await pdf.getPage(p);
        const vp=page.getViewport({scale:1.2});
        const canvas=document.createElement('canvas');
        canvas.width=vp.width; canvas.height=vp.height;
        canvas.style.maxWidth='100%';
        await page.render({canvasContext:canvas.getContext('2d'),viewport:vp}).promise;
        const wrap=document.createElement('div');
        wrap.className='page-wrap';
        wrap.style.width=Math.min(vp.width,760)+'px';
        wrap.appendChild(canvas);
        if(pdf.numPages>1){
          const lbl=document.createElement('div');
          lbl.className='page-label';
          lbl.textContent='Página '+p+' de '+pdf.numPages;
          wrap.appendChild(lbl);
        }
        viewer.appendChild(wrap);
      }
    }catch(e){viewer.innerHTML='<p style="color:#ccc;padding:2rem">No se pudo renderizar el PDF</p>';}
  } else {
    // Imagen rasterizada
    setStat('s-pags','1');
    objURL=URL.createObjectURL(file);
    const img=document.createElement('img');
    img.src=objURL;
    img.style.maxWidth='760px';
    img.style.display='block';
    const wrap=document.createElement('div');
    wrap.className='page-wrap';
    wrap.appendChild(img);
    viewer.appendChild(wrap);
  }

  document.getElementById('analyzing').style.display='none';
  viewer.style.display='flex';
}

function showResults(d, file, ext, cmW, cmH, mmW, mmH, pxW, pxH, dpi){
  // Usar medidas calculadas por el navegador si las tenemos — más confiables
  const t=d.tamanio||{};
  if(cmW&&cmH){t.cm_ancho=cmW;t.cm_alto=cmH;}
  if(mmW&&mmH){t.mm_ancho=mmW;t.mm_alto=mmH;}
  if(pxW&&pxH){t.px_ancho=pxW;t.px_alto=pxH;}
  if(dpi&&!d.resolucion?.valor_dpi){if(!d.resolucion)d.resolucion={};d.resolucion.valor_dpi=dpi;}

  const finalDPI=d.resolucion?.valor_dpi||dpi;
  const tamStr=cmW&&cmH?cmW+' × '+cmH+' cm':(mmW&&mmH?mmW+' × '+mmH+' mm':(pxW&&pxH?pxW+' × '+pxH+' px':'—'));

  setStat('s-medidas', tamStr);
  setStat('s-dpi', finalDPI?finalDPI+' DPI':'Vectorial', finalDPI?(finalDPI>=300?'ok':finalDPI>=150?'warn':'err'):'');
  setStat('s-color', d.modo_color?.valor||'—', d.modo_color?.estado==='ok'?'ok':d.modo_color?.estado==='error'?'err':'warn');

  const allC=[d.resolucion,d.modo_color,d.textos_trazados,d.sangria,d.cruces_de_corte,d.transparencias,d.perfil_color_icc];
  const errN=allC.filter(x=>x&&x.estado==='error').length;
  const warnN=allC.filter(x=>x&&(x.estado==='advertencia'||x.estado==='no_determinable')).length;
  const verdict=errN>0?{cls:'v-err',lbl:'Requiere correcciones'}:warnN>0?{cls:'v-warn',lbl:'Advertencias'}:{cls:'v-ok',lbl:'✓ Listo para imprimir'};

  const vEl=document.getElementById('sb-verdict');
  vEl.textContent=verdict.lbl;
  vEl.className='verdict '+verdict.cls;
  vEl.style.display='block';
  document.getElementById('sb-dim').textContent=tamStr;
  if(finalDPI)document.getElementById('sb-dpi').textContent=finalDPI+' DPI';

  // Checks en sidebar
  const checks=[
    {n:'Medidas',d:tamStr,e:d.tamanio?.estado||'advertencia'},
    {n:'Resolución',d:finalDPI?finalDPI+' DPI':'No determinada',e:d.resolucion?.estado||'advertencia'},
    {n:'Modo color',d:d.modo_color?.valor||'—',e:d.modo_color?.estado||'advertencia'},
    {n:'Textos trazados',d:d.textos_trazados?.detalle||'—',e:d.textos_trazados?.estado||'advertencia'},
    {n:'Sangría',d:d.sangria?.tiene?(d.sangria.valor_mm+'mm'):'Sin sangría',e:d.sangria?.estado||'error'},
    {n:'Cruces de corte',d:d.cruces_de_corte?.tiene?'Detectados':'No detectados',e:d.cruces_de_corte?.estado||'error'},
    {n:'Perfil ICC',d:d.perfil_color_icc?.perfil||d.perfil_color_icc?.detalle||'—',e:d.perfil_color_icc?.estado||'advertencia'},
  ];

  function dot(e){
    const c=e==='ok'?'dok':e==='error'?'derr':'dwarn';
    return '<div class="chk-dot '+c+'"><svg width="7" height="7" viewBox="0 0 7 7" fill="none">'+(e==='ok'?'<path d="M1 3.5l1.5 1.5 3.5-3.5" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>':e==='error'?'<path d="M1.5 1.5l4 4M5.5 1.5l-4 4" stroke="white" stroke-width="1.2" stroke-linecap="round"/>':'<path d="M3.5 1.5v3M3.5 5.5v.5" stroke="white" stroke-width="1.2" stroke-linecap="round"/>')+'</svg></div>';
  }

  document.getElementById('checks-body').innerHTML=checks.map(c=>'<div class="chk">'+dot(c.e)+'<div class="chk-body"><div class="chk-name">'+c.n+'</div><div class="chk-detail">'+c.d+'</div></div></div>').join('');
  document.getElementById('checks-panel').style.display='block';

  const tb=d.tiempo_estimado?.desglose||{};
  const total=d.tiempo_estimado?.total_minutos||0;
  const totalStr=total>=60?Math.floor(total/60)+'h '+(total%60?total%60+'m':''):total+' min';
  setStat('t-total',totalStr);
  setStat('t-color',(tb.correccion_color_min||0)+' min');
  setStat('t-text',(tb.textos_tipografia_min||0)+' min');
  setStat('t-sang',(tb.sangria_corte_min||0)+' min');
  setStat('t-res',(tb.resolucion_min||0)+' min');
  setStat('t-rev',(tb.revision_final_min||0)+' min');
  document.getElementById('time-panel').style.display='block';

  if(d.resumen){
    document.getElementById('ai-txt').textContent=d.resumen;
    document.getElementById('ai-box').style.display='block';
  }
}

function showError(msg){
  document.getElementById('analyzing').style.display='none';
  document.getElementById('viewer').style.display='flex';
  document.getElementById('viewer').innerHTML='<div style="color:#fcc;padding:2rem;text-align:center;"><div style="font-size:13px;font-weight:600;margin-bottom:6px">Error en el análisis</div><div style="font-size:11px;opacity:0.8">'+msg+'</div></div>';
}

function resetApp(){
  dropZone.style.display='flex';
  document.getElementById('analyzing').style.display='none';
  document.getElementById('viewer').style.display='none';
  document.getElementById('viewer').innerHTML='';
  document.getElementById('ai-box').style.display='none';
  document.getElementById('checks-panel').style.display='none';
  document.getElementById('time-panel').style.display='none';
  document.getElementById('sb-verdict').style.display='none';
  document.getElementById('sb-file').textContent='Sin archivo';
  document.getElementById('sb-dim').textContent='';
  document.getElementById('sb-dpi').textContent='';
  document.getElementById('tb-info').textContent='PDF · PNG · JPG · TIFF · PSD · AI · EPS';
  ['s-nombre','s-formato','s-peso','s-pags','s-medidas','s-dpi','s-color','t-total','t-color','t-text','t-sang','t-res','t-rev'].forEach(id=>setStat(id,'—'));
  fileInput.value='';
  if(objURL){URL.revokeObjectURL(objURL);objURL=null;}
}

// ── Lectura de metadatos ─────────────────────────────────────────────────────

function readImageDims(file){
  return new Promise((res,rej)=>{
    const url=URL.createObjectURL(file);
    const img=new Image();
    img.onload=()=>{res({w:img.naturalWidth,h:img.naturalHeight});URL.revokeObjectURL(url);};
    img.onerror=()=>{URL.revokeObjectURL(url);rej();};
    img.src=url;
  });
}

function readDPI(file){
  return new Promise(resolve=>{
    const reader=new FileReader();
    reader.onload=e=>{
      try{
        const buf=new Uint8Array(e.target.result);
        // PNG pHYs
        if(buf[0]===137&&buf[1]===80&&buf[2]===78){
          for(let i=0;i<buf.length-13;i++){
            if(buf[i]===112&&buf[i+1]===72&&buf[i+2]===89&&buf[i+3]===115){
              const xRes=(buf[i+4]<<24)|(buf[i+5]<<16)|(buf[i+6]<<8)|buf[i+7];
              if(buf[i+12]===1&&xRes>0){resolve(Math.round(xRes*0.0254));return;}
            }
          }
        }
        // JPEG JFIF
        if(buf[0]===0xFF&&buf[1]===0xD8){
          let off=2;
          while(off<Math.min(buf.length-4,65536)){
            if(buf[off]!==0xFF)break;
            const mk=buf[off+1],ln=(buf[off+2]<<8)|buf[off+3];
            if(mk===0xE0&&ln>=16){
              const du=buf[off+11],xd=(buf[off+12]<<8)|buf[off+13];
              if(du===1&&xd>0){resolve(xd);return;}
              if(du===2&&xd>0){resolve(Math.round(xd*2.54));return;}
            }
            off+=2+ln;
          }
        }
        // TIFF
        if((buf[0]===0x49&&buf[1]===0x49)||(buf[0]===0x4D&&buf[1]===0x4D)){
          const le=buf[0]===0x49;
          const r16=o=>le?(buf[o]|(buf[o+1]<<8)):(buf[o]<<8|buf[o+1]);
          const r32=o=>le?(buf[o]|(buf[o+1]<<8)|(buf[o+2]<<16)|(buf[o+3]<<24)):((buf[o]<<24)|(buf[o+1]<<16)|(buf[o+2]<<8)|buf[o+3]);
          const ifdOff=r32(4);const numTags=r16(ifdOff);
          let xres=null,unit=2;
          for(let i=0;i<numTags;i++){
            const tag=r16(ifdOff+2+i*12);
            if(tag===0x011A){const vo=r32(ifdOff+2+i*12+8);const n=r32(vo),d=r32(vo+4);if(d>0)xres=n/d;}
            if(tag===0x0128){unit=r16(ifdOff+2+i*12+8);}
          }
          if(xres){resolve(unit===3?Math.round(xres*2.54):Math.round(xres));return;}
        }
        resolve(null);
      }catch(e){resolve(null);}
    };
    reader.readAsArrayBuffer(file.slice(0,131072));
  });
}

function readPDFDims(file){
  return new Promise(resolve=>{
    const reader=new FileReader();
    reader.onload=e=>{
      try{
        const text=e.target.result;
        const match=text.match(/MediaBox\s*\[\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\]/);
        if(match){
          const w=parseFloat(match[3])-parseFloat(match[1]);
          const h=parseFloat(match[4])-parseFloat(match[2]);
          const mmW=Math.round(w*(25.4/72));
          const mmH=Math.round(h*(25.4/72));
          resolve({mmW,mmH,cmW:parseFloat((mmW/10).toFixed(1)),cmH:parseFloat((mmH/10).toFixed(1))});
          return;
        }
        resolve(null);
      }catch(e){resolve(null);}
    };
    reader.readAsText(file.slice(0,65536));
  });
}

function readPSDDims(file){
  return new Promise(resolve=>{
    const reader=new FileReader();
    reader.onload=e=>{
      try{
        const buf=new Uint8Array(e.target.result);
        if(buf[0]===0x38&&buf[1]===0x42&&buf[2]===0x50&&buf[3]===0x53){
          const h=(buf[14]<<24)|(buf[15]<<16)|(buf[16]<<8)|buf[17];
          const w=(buf[18]<<24)|(buf[19]<<16)|(buf[20]<<8)|buf[21];
          let dpi=72;
          // Buscar recurso 0x03ED en Image Resources
          let off=26;
          const colorModeLen=(buf[off]<<24)|(buf[off+1]<<16)|(buf[off+2]<<8)|buf[off+3];
          off+=4+colorModeLen;
          const imgResLen=(buf[off]<<24)|(buf[off+1]<<16)|(buf[off+2]<<8)|buf[off+3];
          off+=4;const end=off+imgResLen;
          while(off<end-8){
            if(buf[off]===0x38&&buf[off+1]===0x42&&buf[off+2]===0x49&&buf[off+3]===0x4D){
              const rid=(buf[off+4]<<8)|buf[off+5];
              const nlen=buf[off+6];const npad=nlen%2===0?nlen+2:nlen+1;
              const doff=off+6+npad;
              const dlen=(buf[doff]<<24)|(buf[doff+1]<<16)|(buf[doff+2]<<8)|buf[doff+3];
              if(rid===0x03ED&&dlen>=4){const df=(buf[doff+4]<<8)|buf[doff+5];if(df>0)dpi=df;}
              off=doff+4+dlen+(dlen%2);
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

    // Metadatos enviados desde el navegador (más confiables que lo que puede inferir la IA)
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

    let contextoDimensiones = "";
    if (cmAncho && cmAlto) contextoDimensiones = `Dimensiones verificadas por el navegador: ${cmAncho} × ${cmAlto} cm (${mmAncho} × ${mmAlto} mm${pxAncho ? `, ${pxAncho} × ${pxAlto} px` : ""})${dpiMeta ? `, DPI real: ${dpiMeta}` : ""}.`;
    else if (pxAncho && pxAlto) contextoDimensiones = `Dimensiones en píxeles: ${pxAncho} × ${pxAlto} px${dpiMeta ? `, DPI: ${dpiMeta}` : " (sin DPI en metadatos)"}.`;

    const systemPrompt = `Experto preflight imprenta. Responde SOLO JSON sin texto extra.
Medidas del archivo (ya verificadas): ${contextoDimensiones||"no disponibles"}.
Analiza: modo color, textos trazados, sangría, cruces de corte, transparencias, perfil ICC, calidad.
Para textos: rasterizadas=bordes nítidos o pixelados; PDF=texto seleccionable vs paths; vector=texto sin trazar.
Devuelve exactamente:
{"resolucion":{"valor_dpi":${dpiMeta||"null"},"estado":"ok|advertencia|error","detalle":""},"modo_color":{"valor":"CMYK|RGB|Escala de grises|Desconocido","estado":"ok|advertencia|error","detalle":""},"textos_trazados":{"metodo":"","estado":"ok|advertencia|error|no_determinable","detalle":""},"sangria":{"tiene":false,"valor_mm":null,"estado":"ok|advertencia|error","detalle":""},"cruces_de_corte":{"tiene":false,"estado":"ok|advertencia|error","detalle":""},"tamanio":{"px_ancho":${pxAncho||"null"},"px_alto":${pxAlto||"null"},"mm_ancho":${mmAncho||"null"},"mm_alto":${mmAlto||"null"},"cm_ancho":${cmAncho||"null"},"cm_alto":${cmAlto||"null"}},"transparencias":{"tiene":false,"estado":"ok|advertencia|error","detalle":""},"perfil_color_icc":{"tiene":false,"perfil":null,"estado":"ok|advertencia|error","detalle":""},"calidad_general":"alta|media|baja","problemas_criticos":[],"advertencias":[],"tiempo_estimado":{"total_minutos":0,"desglose":{"correccion_color_min":0,"textos_tipografia_min":0,"sangria_corte_min":0,"resolucion_min":0,"revision_final_min":0},"justificacion":""},"resumen":""}`;

    let userContent;
    if (esVisual || esPDF) {
      const mediaType = esPDF ? "application/pdf" : mimetype;
      const tipo = esPDF ? "document" : "image";
      userContent = [
        { type: tipo, source: { type: "base64", media_type: mediaType, data: base64 } },
        { type: "text", text: `Analiza este archivo. Nombre: ${originalname}. Tamaño: ${sizeMB} MB. ${contextoDimensiones} Responde solo con el JSON.` }
      ];
    } else {
      userContent = `Analiza este archivo. Nombre: ${originalname}. Tamaño: ${sizeMB} MB. ${contextoDimensiones} Responde solo con el JSON.`;
    }

    const callClaude = async (retries = 3, delay = 5000) => {
      for (let i = 0; i < retries; i++) {
        const r = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
          body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, system: systemPrompt, messages: [{ role: "user", content: userContent }] })
        });
        if (r.ok) return r;
        const err = await r.text();
        if ((r.status === 529 || r.status === 500 || r.status === 503) && i < retries - 1) {
          await new Promise(r => setTimeout(r, delay)); delay = Math.round(delay * 1.5); continue;
        }
        throw new Error(`Claude API error ${r.status}: ${err}`);
      }
    };

    const response = await callClaude();
    const data = await response.json();
    const raw = data.content.map(b => b.text || "").join("").trim();
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("JSON inválido de la API");

    const analisis = JSON.parse(match[0]);

    // Garantizar que las medidas del navegador prevalezcan
    const t = analisis.tamanio || {};
    if (cmAncho && cmAlto) { t.cm_ancho = cmAncho; t.cm_alto = cmAlto; }
    if (mmAncho && mmAlto) { t.mm_ancho = mmAncho; t.mm_alto = mmAlto; }
    if (pxAncho && pxAlto) { t.px_ancho = pxAncho; t.px_alto = pxAlto; }
    if (dpiMeta && !analisis.resolucion?.valor_dpi) {
      if (!analisis.resolucion) analisis.resolucion = {};
      analisis.resolucion.valor_dpi = dpiMeta;
    }
    // Calcular lo que falte
    if (!t.mm_ancho && t.px_ancho && dpiMeta) { t.mm_ancho = Math.round((t.px_ancho / dpiMeta) * 25.4); t.mm_alto = Math.round((t.px_alto / dpiMeta) * 25.4); }
    if (!t.cm_ancho && t.mm_ancho) { t.cm_ancho = parseFloat((t.mm_ancho / 10).toFixed(1)); t.cm_alto = parseFloat((t.mm_alto / 10).toFixed(1)); }
    analisis.tamanio = t;
    analisis.archivo = { nombre: originalname, formato: ext.toUpperCase(), tamano_mb: parseFloat(sizeMB) };

    res.json({ ok: true, analisis });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ ok: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Preflight Pro corriendo en puerto " + PORT));
