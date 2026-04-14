const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } });

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
body{font-family:'Source Sans 3',sans-serif;background:#f0eeeb;padding:16px;}
.acro{max-width:860px;margin:0 auto;border:1px solid #b0b0b0;border-radius:3px;overflow:hidden;}
.acro-titlebar{background:#3d3d3d;padding:6px 14px;display:flex;align-items:center;gap:10px;}
.acro-logo-icon{width:18px;height:18px;background:#e8200c;border-radius:2px;display:flex;align-items:center;justify-content:center;}
.acro-title{font-size:12px;color:#d0d0d0;font-weight:400;margin-left:7px;}
.acro-subtitle{font-size:11px;color:#888;margin-left:auto;}
.acro-toolbar{background:#f0eeeb;border-bottom:1px solid #c8c5c0;padding:6px 12px;display:flex;align-items:center;gap:6px;flex-wrap:wrap;}
.acro-tbtn{display:flex;align-items:center;gap:5px;padding:4px 10px;border-radius:2px;border:1px solid transparent;background:transparent;cursor:pointer;font-size:11px;color:#3a3a3a;font-family:'Source Sans 3',sans-serif;transition:all 0.12s;}
.acro-tbtn:hover{background:#e0ddd8;border-color:#c0bdb8;}
.acro-tbtn-red{background:#e8200c;color:white;border-color:#c41a09;}
.acro-tbtn-red:hover{background:#c41a09;}
.acro-divider{width:1px;height:20px;background:#c8c5c0;margin:0 4px;}
.acro-body{background:#e8e6e3;padding:16px;display:flex;gap:14px;}
.acro-sidebar{width:200px;flex-shrink:0;}
.acro-panel{background:#faf9f8;border:1px solid #c8c5c0;border-radius:2px;margin-bottom:10px;overflow:hidden;}
.acro-panel-hdr{background:#e8e6e3;border-bottom:1px solid #c8c5c0;padding:6px 10px;display:flex;align-items:center;gap:6px;}
.acro-panel-title{font-size:10px;font-weight:600;color:#3a3a3a;text-transform:uppercase;letter-spacing:0.05em;}
.acro-panel-body{padding:8px 10px;}
.acro-stat{display:flex;justify-content:space-between;align-items:baseline;padding:3px 0;border-bottom:1px solid #f0eee9;}
.acro-stat:last-child{border-bottom:none;}
.acro-stat-lbl{font-size:11px;color:#666;}
.acro-stat-val{font-size:11px;font-weight:600;color:#2a2a2a;}
.acro-stat-val.ok{color:#1a7a1a;} .acro-stat-val.warn{color:#b85c00;} .acro-stat-val.err{color:#c41a09;}
.acro-main{flex:1;min-width:0;}
.acro-doc{background:#faf9f8;border:1px solid #c8c5c0;border-radius:2px;padding:16px;}
.acro-drop{border:2px dashed #c8c5c0;border-radius:2px;padding:3rem 2rem;text-align:center;cursor:pointer;transition:all 0.15s;background:#faf9f8;}
.acro-drop:hover,.acro-drop.over{border-color:#e8200c;background:#fff5f5;}
.acro-drop-ico{width:40px;height:40px;margin:0 auto 12px;background:#e8200c;border-radius:2px;display:flex;align-items:center;justify-content:center;}
.acro-drop-title{font-size:13px;font-weight:600;color:#2a2a2a;margin-bottom:4px;}
.acro-drop-hint{font-size:11px;color:#777;}
.acro-drop-fmts{font-size:10px;color:#aaa;margin-top:6px;text-transform:uppercase;letter-spacing:0.04em;}
.acro-an{display:none;text-align:center;padding:2.5rem 1rem;}
.acro-spinner{width:28px;height:28px;border:3px solid #e0ddd8;border-top-color:#e8200c;border-radius:50%;animation:acrospin 0.7s linear infinite;margin:0 auto 10px;}
@keyframes acrospin{to{transform:rotate(360deg);}}
.acro-an-title{font-size:13px;font-weight:600;color:#2a2a2a;margin-bottom:3px;}
.acro-an-step{font-size:11px;color:#888;margin-bottom:8px;}
.acro-prog{height:3px;background:#e0ddd8;border-radius:1px;overflow:hidden;max-width:260px;margin:0 auto;}
.acro-prog-fill{height:100%;background:#e8200c;transition:width 0.5s ease;}
.acro-file-hdr{display:flex;align-items:center;gap:12px;padding-bottom:12px;border-bottom:1px solid #e0ddd8;margin-bottom:14px;}
.acro-fthumb{width:52px;height:52px;background:#e8e6e3;border:1px solid #c8c5c0;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:2px;flex-shrink:0;overflow:hidden;}
.acro-fthumb img{width:100%;height:100%;object-fit:contain;}
.acro-fext{font-size:9px;font-weight:600;color:#e8200c;letter-spacing:0.05em;}
.acro-fname{font-size:13px;font-weight:600;color:#1a1a1a;}
.acro-fmeta{font-size:11px;color:#666;margin-top:2px;}
.acro-vpill{margin-left:auto;padding:4px 10px;border-radius:2px;font-size:11px;font-weight:600;}
.pill-ok{background:#e8f5e8;color:#1a5c1a;border:1px solid #8fbc8f;}
.pill-warn{background:#fff3e0;color:#8a4500;border:1px solid #e6a030;}
.pill-err{background:#fde8e8;color:#8a1010;border:1px solid #e06060;}
.acro-sec-title{font-size:10px;font-weight:600;color:#555;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid #e0ddd8;}
.acro-checks{margin-bottom:14px;}
.acro-check{display:flex;align-items:flex-start;gap:8px;padding:6px 0;border-bottom:1px solid #f0eee9;}
.acro-check:last-child{border-bottom:none;}
.acro-cbullet{width:15px;height:15px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
.cb-ok{background:#1a7a1a;} .cb-warn{background:#b85c00;} .cb-err{background:#c41a09;}
.acro-cbody{flex:1;}
.acro-cname{font-size:12px;font-weight:600;color:#2a2a2a;}
.acro-cdetail{font-size:11px;color:#666;margin-top:1px;line-height:1.4;}
.acro-ctag{font-size:10px;padding:2px 6px;border-radius:2px;white-space:nowrap;flex-shrink:0;font-weight:600;}
.ct-ok{background:#e8f5e8;color:#1a5c1a;border:1px solid #8fbc8f;}
.ct-warn{background:#fff3e0;color:#8a4500;border:1px solid #e6a030;}
.ct-err{background:#fde8e8;color:#8a1010;border:1px solid #e06060;}
.ct-nd{background:#f0f0f0;color:#666;border:1px solid #ccc;}
.acro-ai{background:#f8f6f3;border:1px solid #d8d5d0;border-left:3px solid #e8200c;border-radius:2px;padding:10px 12px;margin-bottom:14px;}
.acro-ai-lbl{font-size:10px;font-weight:600;color:#e8200c;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;}
.acro-ai-txt{font-size:11px;color:#3a3a3a;line-height:1.6;}
.acro-error{background:#fde8e8;border:1px solid #e06060;border-left:3px solid #c41a09;border-radius:2px;padding:10px 12px;}
.acro-error-title{font-size:12px;font-weight:600;color:#8a1010;margin-bottom:4px;}
.acro-error-detail{font-size:11px;color:#a03030;line-height:1.5;}
.acro-actions{display:flex;gap:8px;margin-top:14px;}
.acro-btn{padding:6px 14px;border-radius:2px;font-size:12px;font-weight:600;cursor:pointer;font-family:'Source Sans 3',sans-serif;border:1px solid #c8c5c0;background:#faf9f8;color:#3a3a3a;transition:all 0.12s;}
.acro-btn:hover{background:#e8e6e3;}
.acro-btn-red{background:#e8200c;color:white;border-color:#c41a09;}
.acro-btn-red:hover{background:#c41a09;}
#acro-file-input{display:none;}
@media(max-width:600px){.acro-body{flex-direction:column;}.acro-sidebar{width:100%;}}
</style>
</head>
<body>
<div class="acro">
  <div class="acro-titlebar">
    <div class="acro-logo-icon"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 9L6 3l4 6H2z" fill="white"/></svg></div>
    <span class="acro-title">Preflight Pro — Análisis de archivos para imprenta</span>
    <span class="acro-subtitle">v1.0</span>
  </div>
  <div class="acro-toolbar">
    <button class="acro-tbtn acro-tbtn-red" onclick="document.getElementById('acro-file-input').click()">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 2v8M3.5 5l3-3 3 3" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.5 10.5h10" stroke="white" stroke-width="1.4" stroke-linecap="round"/></svg>
      Abrir archivo
    </button>
    <div class="acro-divider"></div>
    <button class="acro-tbtn" onclick="acroReset()">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5a4.5 4.5 0 1 0 1.4-3.2L2 2v3h3" stroke="#3a3a3a" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Nuevo análisis
    </button>
    <div class="acro-divider"></div>
    <span style="font-size:11px;color:#888;">PDF · PNG · JPG · TIFF · AI · EPS · PSD</span>
    <input type="file" id="acro-file-input" accept=".pdf,.png,.jpg,.jpeg,.tiff,.tif,.gif,.bmp,.webp,.svg,.ai,.eps,.psd">
  </div>
  <div class="acro-body">
    <div class="acro-sidebar">
      <div class="acro-panel">
        <div class="acro-panel-hdr"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="10" height="10" rx="1" stroke="#555" stroke-width="1.2"/><path d="M3.5 6h5M3.5 4h5M3.5 8h3" stroke="#555" stroke-width="1.1" stroke-linecap="round"/></svg><span class="acro-panel-title">Propiedades</span></div>
        <div class="acro-panel-body">
          <div class="acro-stat"><span class="acro-stat-lbl">Formato</span><span class="acro-stat-val" id="a-prop-fmt">—</span></div>
          <div class="acro-stat"><span class="acro-stat-lbl">Tamaño archivo</span><span class="acro-stat-val" id="a-prop-size">—</span></div>
          <div class="acro-stat"><span class="acro-stat-lbl">Medidas</span><span class="acro-stat-val" id="a-prop-tam">—</span></div>
          <div class="acro-stat"><span class="acro-stat-lbl">Resolución</span><span class="acro-stat-val" id="a-prop-dpi">—</span></div>
          <div class="acro-stat"><span class="acro-stat-lbl">Modo color</span><span class="acro-stat-val" id="a-prop-color">—</span></div>
        </div>
      </div>
      <div class="acro-panel">
        <div class="acro-panel-hdr"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#555" stroke-width="1.2"/><path d="M6 3.5v3l1.5 1" stroke="#555" stroke-width="1.1" stroke-linecap="round"/></svg><span class="acro-panel-title">Tiempo estimado</span></div>
        <div class="acro-panel-body">
          <div class="acro-stat"><span class="acro-stat-lbl">Total</span><span class="acro-stat-val" id="a-t-total">—</span></div>
          <div class="acro-stat"><span class="acro-stat-lbl">Corrección color</span><span class="acro-stat-val" id="a-t-color">—</span></div>
          <div class="acro-stat"><span class="acro-stat-lbl">Textos</span><span class="acro-stat-val" id="a-t-text">—</span></div>
          <div class="acro-stat"><span class="acro-stat-lbl">Sangría y corte</span><span class="acro-stat-val" id="a-t-sang">—</span></div>
          <div class="acro-stat"><span class="acro-stat-lbl">Resolución</span><span class="acro-stat-val" id="a-t-res">—</span></div>
          <div class="acro-stat"><span class="acro-stat-lbl">Revisión final</span><span class="acro-stat-val" id="a-t-rev">—</span></div>
        </div>
      </div>
      <div class="acro-panel">
        <div class="acro-panel-hdr"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1.5v1.5M6 9v1.5M1.5 6H3M9 6h1.5M3 3l1 1M8 8l1 1M3 9l1-1M8 4l1-1" stroke="#555" stroke-width="1.1" stroke-linecap="round"/></svg><span class="acro-panel-title">Calidad general</span></div>
        <div class="acro-panel-body">
          <div class="acro-stat"><span class="acro-stat-lbl">Calificación</span><span class="acro-stat-val" id="a-cal">—</span></div>
          <div class="acro-stat"><span class="acro-stat-lbl">Errores críticos</span><span class="acro-stat-val err" id="a-errs">—</span></div>
          <div class="acro-stat"><span class="acro-stat-lbl">Advertencias</span><span class="acro-stat-val warn" id="a-warns">—</span></div>
        </div>
      </div>
    </div>
    <div class="acro-main">
      <div class="acro-doc" id="acro-doc">
        <div id="acro-dropzone">
          <div class="acro-drop" id="acro-drop" onclick="document.getElementById('acro-file-input').click()">
            <div class="acro-drop-ico"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2v11M6.5 6L10 2l3.5 4" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M2.5 14.5v1.5A1.5 1.5 0 004 17.5h12a1.5 1.5 0 001.5-1.5v-1.5" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg></div>
            <div class="acro-drop-title">Arrastra tu archivo aquí</div>
            <div class="acro-drop-hint">o usa el botón "Abrir archivo" en la barra superior</div>
            <div class="acro-drop-fmts">PDF · PNG · JPG · TIFF · AI · EPS · PSD · GIF · BMP · WEBP · SVG</div>
          </div>
        </div>
        <div class="acro-an" id="acro-an">
          <div class="acro-spinner"></div>
          <div class="acro-an-title">Analizando archivo…</div>
          <div class="acro-an-step" id="acro-an-step">Iniciando</div>
          <div class="acro-prog"><div class="acro-prog-fill" id="acro-prog" style="width:3%"></div></div>
        </div>
        <div id="acro-report" style="display:none"></div>
      </div>
    </div>
  </div>
</div>
<script>
const BACKEND_URL='https://preflight-backend-production-e718.up.railway.app';
let acroURL=null;
const acroDrop=document.getElementById('acro-drop');
const acroInput=document.getElementById('acro-file-input');
acroDrop.addEventListener('dragover',e=>{e.preventDefault();acroDrop.classList.add('over');});
acroDrop.addEventListener('dragleave',()=>acroDrop.classList.remove('over'));
acroDrop.addEventListener('drop',e=>{e.preventDefault();acroDrop.classList.remove('over');acroStart(e.dataTransfer.files[0]);});
acroInput.addEventListener('change',e=>{if(e.target.files[0])acroStart(e.target.files[0]);});
function acroBytes(b){if(b<1024)return b+' B';if(b<1048576)return(b/1024).toFixed(1)+' KB';return(b/1048576).toFixed(2)+' MB';}
function acroSleep(ms){return new Promise(r=>setTimeout(r,ms));}
async function acroStart(file){
  const ext=file.name.split('.').pop().toLowerCase();
  if(acroURL){URL.revokeObjectURL(acroURL);acroURL=null;}
  const prev=['png','jpg','jpeg','gif','bmp','webp','svg'];
  if(prev.includes(ext))acroURL=URL.createObjectURL(file);
  document.getElementById('acro-dropzone').style.display='none';
  document.getElementById('acro-an').style.display='block';
  document.getElementById('acro-report').style.display='none';
  document.getElementById('acro-report').innerHTML='';
  const steps=[[10,'Leyendo metadatos…'],[28,'Preparando para IA…'],[48,'Enviando al servidor…'],[68,'Claude analizando el archivo…'],[88,'Generando reporte preflight…']];
  let si=0;
  const iv=setInterval(()=>{if(si<steps.length){document.getElementById('acro-prog').style.width=steps[si][0]+'%';document.getElementById('acro-an-step').textContent=steps[si][1];si++;}},1800);
  try{
    const fd=new FormData();fd.append('archivo',file,file.name);
    const resp=await fetch(BACKEND_URL+'/analizar',{method:'POST',body:fd});
    clearInterval(iv);document.getElementById('acro-prog').style.width='100%';
    if(!resp.ok){const e=await resp.json().catch(()=>({error:'HTTP '+resp.status}));throw new Error(e.error||'HTTP '+resp.status);}
    const data=await resp.json();
    if(!data.ok)throw new Error(data.error||'Error del servidor');
    await acroSleep(300);
    document.getElementById('acro-an').style.display='none';
    acroShowReport(file,data.analisis,ext);
  }catch(err){
    clearInterval(iv);document.getElementById('acro-an').style.display='none';
    acroShowError(file,err.message,ext);
  }
}
function acroIDot(e){
  if(e==='ok')return'<div class="acro-cbullet cb-ok"><svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
  if(e==='error')return'<div class="acro-cbullet cb-err"><svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="white" stroke-width="1.4" stroke-linecap="round"/></svg></div>';
  return'<div class="acro-cbullet cb-warn"><svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M4 2v3M4 6v.5" stroke="white" stroke-width="1.4" stroke-linecap="round"/></svg></div>';
}
function acroTag(e){
  if(e==='ok')return{cls:'ct-ok',lbl:'Correcto'};
  if(e==='error')return{cls:'ct-err',lbl:'Error'};
  if(e==='no_determinable'||e==='no_aplicable')return{cls:'ct-nd',lbl:'N/D'};
  return{cls:'ct-warn',lbl:'Advertencia'};
}
function acroFmtTam(t){
  if(!t)return'—';
  if(t.cm_ancho&&t.cm_alto){let s=t.cm_ancho+' x '+t.cm_alto+' cm';if(t.mm_ancho&&t.mm_alto)s+=' ('+t.mm_ancho+'x'+t.mm_alto+' mm)';return s;}
  if(t.mm_ancho&&t.mm_alto)return t.mm_ancho+' x '+t.mm_alto+' mm';
  if(t.px_ancho&&t.px_alto)return t.px_ancho+' x '+t.px_alto+' px';
  return'—';
}
function acroShowReport(file,d,ext){
  const t=d.tamanio||{};const dpi=d.resolucion?.valor_dpi;
  const allC=[d.resolucion,d.modo_color,d.textos_trazados,d.sangria,d.cruces_de_corte,d.transparencias,d.perfil_color_icc];
  const errN=allC.filter(x=>x&&x.estado==='error').length;
  const warnN=allC.filter(x=>x&&(x.estado==='advertencia'||x.estado==='no_determinable')).length;
  const verdict=errN>0?{cls:'pill-err',lbl:'Requiere correcciones'}:warnN>0?{cls:'pill-warn',lbl:'Advertencias menores'}:{cls:'pill-ok',lbl:'Listo para imprimir'};
  const cal=d.calidad_general||'media';
  const tamStr=acroFmtTam(t);
  const total=d.tiempo_estimado?.total_minutos||0;
  const totalStr=total>=60?Math.floor(total/60)+'h '+(total%60>0?total%60+'m':''):total+' min';
  const tb=d.tiempo_estimado?.desglose||{};
  document.getElementById('a-prop-fmt').textContent=ext.toUpperCase();
  document.getElementById('a-prop-size').textContent=acroBytes(file.size);
  document.getElementById('a-prop-tam').textContent=tamStr;
  document.getElementById('a-prop-dpi').textContent=dpi?dpi+' DPI':'No detectado';
  document.getElementById('a-prop-dpi').className='acro-stat-val '+(dpi>=300?'ok':dpi>=150?'warn':'err');
  document.getElementById('a-prop-color').textContent=d.modo_color?.valor||'—';
  document.getElementById('a-t-total').textContent=totalStr;
  document.getElementById('a-t-color').textContent=(tb.correccion_color_min||0)+' min';
  document.getElementById('a-t-text').textContent=(tb.textos_tipografia_min||0)+' min';
  document.getElementById('a-t-sang').textContent=(tb.sangria_corte_min||0)+' min';
  document.getElementById('a-t-res').textContent=(tb.resolucion_min||0)+' min';
  document.getElementById('a-t-rev').textContent=(tb.revision_final_min||0)+' min';
  document.getElementById('a-cal').textContent=cal==='alta'?'Alta':cal==='baja'?'Baja':'Media';
  document.getElementById('a-cal').className='acro-stat-val '+(cal==='alta'?'ok':cal==='baja'?'err':'warn');
  document.getElementById('a-errs').textContent=errN;
  document.getElementById('a-warns').textContent=warnN;
  const prev=['png','jpg','jpeg','gif','bmp','webp','svg'];
  const thumbHtml=acroURL&&prev.includes(ext)?'<div class="acro-fthumb"><img src="'+acroURL+'" alt=""></div>':'<div class="acro-fthumb"><div class="acro-fext">'+ext.toUpperCase()+'</div></div>';
  const checks=[
    {name:'Medidas reales',detail:tamStr+(t.detalle?' — '+t.detalle:''),estado:d.tamanio?.estado||'advertencia'},
    {name:'Resolución',detail:(dpi?dpi+' DPI':'No determinada')+(d.resolucion?.detalle?' — '+d.resolucion.detalle:''),estado:d.resolucion?.estado||'advertencia'},
    {name:'Modo de color',detail:(d.modo_color?.valor||'Desconocido')+(d.modo_color?.detalle?' — '+d.modo_color.detalle:''),estado:d.modo_color?.estado||'advertencia'},
    {name:'Textos trazados',detail:d.textos_trazados?.detalle||'No analizado',estado:d.textos_trazados?.estado||'advertencia',method:d.textos_trazados?.metodo},
    {name:'Sangría / excedente',detail:(d.sangria?.tiene?(d.sangria.valor_mm!=null?d.sangria.valor_mm+' mm':'presente'):'Sin sangría')+(d.sangria?.detalle?' — '+d.sangria.detalle:''),estado:d.sangria?.estado||'advertencia'},
    {name:'Cruces de corte',detail:d.cruces_de_corte?.detalle||'',estado:d.cruces_de_corte?.estado||'advertencia'},
    {name:'Perfil ICC',detail:(d.perfil_color_icc?.perfil?d.perfil_color_icc.perfil+' — ':'')+( d.perfil_color_icc?.detalle||''),estado:d.perfil_color_icc?.estado||'advertencia'},
    {name:'Transparencias',detail:d.transparencias?.detalle||'',estado:d.transparencias?.estado||'ok'},
  ];
  const r=document.getElementById('acro-report');
  r.innerHTML='<div class="acro-file-hdr">'+thumbHtml+'<div style="flex:1;min-width:0"><div class="acro-fname">'+file.name+'</div><div class="acro-fmeta">'+acroBytes(file.size)+' · '+ext.toUpperCase()+' · '+tamStr+'</div></div><span class="acro-vpill '+verdict.cls+'">'+verdict.lbl+'</span></div>'
  +'<div class="acro-sec-title">Verificaciones preflight</div>'
  +'<div class="acro-checks">'+checks.map(c=>'<div class="acro-check">'+acroIDot(c.estado)+'<div class="acro-cbody"><div class="acro-cname">'+c.name+'</div><div class="acro-cdetail">'+c.detail+'</div>'+(c.method?'<div style="font-size:10px;color:#aaa;margin-top:2px;font-style:italic">Método: '+c.method+'</div>':'')+'</div><span class="acro-ctag '+acroTag(c.estado).cls+'">'+acroTag(c.estado).lbl+'</span></div>').join('')+'</div>'
  +(d.resumen?'<div class="acro-ai"><div class="acro-ai-lbl">Análisis IA</div><div class="acro-ai-txt">'+d.resumen+'</div></div>':'')
  +(d.problemas_criticos?.length?'<div class="acro-sec-title" style="color:#c41a09">Problemas críticos</div><div class="acro-checks" style="margin-bottom:14px">'+d.problemas_criticos.map(p=>'<div class="acro-check">'+acroIDot('error')+'<div class="acro-cbody"><div class="acro-cdetail">'+p+'</div></div></div>').join('')+'</div>':'')
  +'<div class="acro-actions"><button class="acro-btn acro-btn-red" onclick="acroReset()">Analizar otro archivo</button></div>';
  r.style.display='block';
}
function acroShowError(file,msg,ext){
  const r=document.getElementById('acro-report');
  r.innerHTML='<div class="acro-file-hdr"><div class="acro-fthumb"><div class="acro-fext">'+ext.toUpperCase()+'</div></div><div><div class="acro-fname">'+file.name+'</div><div class="acro-fmeta">'+acroBytes(file.size)+'</div></div></div><div class="acro-error"><div class="acro-error-title">No se pudo completar el análisis</div><div class="acro-error-detail">'+msg+'</div></div><div class="acro-actions"><button class="acro-btn acro-btn-red" onclick="acroReset()">Intentar de nuevo</button></div>';
  r.style.display='block';
}
function acroReset(){
  document.getElementById('acro-report').style.display='none';
  document.getElementById('acro-report').innerHTML='';
  document.getElementById('acro-dropzone').style.display='block';
  document.getElementById('acro-an').style.display='none';
  acroInput.value='';
  document.getElementById('acro-prog').style.width='3%';
  ['a-prop-fmt','a-prop-size','a-prop-tam','a-prop-dpi','a-prop-color','a-t-total','a-t-color','a-t-text','a-t-sang','a-t-res','a-t-rev','a-errs','a-warns'].forEach(id=>document.getElementById(id).textContent='—');
  document.getElementById('a-cal').textContent='—';
  if(acroURL){URL.revokeObjectURL(acroURL);acroURL=null;}
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
    const tiposVisuales = ["png", "jpg", "jpeg", "gif", "bmp", "webp"];
    const esPDF = ext === "pdf";
    const esVisual = tiposVisuales.includes(ext);
    const systemPrompt = `Eres un experto preflight de imprenta con 20 años de experiencia. Analizas archivos para tarjetas, flyers, volantes y libros/revistas. Responde ÚNICAMENTE con un objeto JSON válido, sin backticks ni texto adicional.
REGLA CRÍTICA MEDIDAS: Reporta dimensiones REALES. Si puedes determinar DPI, indícalo. Reporta px_ancho, px_alto, mm_ancho, mm_alto si los puedes calcular. Para PDFs reporta el tamaño del mediabox. NUNCA inventes medidas.
DETECCIÓN DE TEXTOS: Rasterizadas: analiza nitidez de bordes de texto. PDF: detecta texto seleccionable vs paths. Vectoriales: busca objetos texto sin convertir.
Responde con este JSON exacto:
{"resolucion":{"valor_dpi":null,"fuente":"metadatos|estimado|no_determinable","estado":"ok|advertencia|error","detalle":""},"modo_color":{"valor":"CMYK|RGB|Escala de grises|Desconocido","estado":"ok|advertencia|error","detalle":""},"textos_trazados":{"metodo":"","hay_texto":null,"estado":"ok|advertencia|error|no_determinable","detalle":""},"sangria":{"tiene":false,"valor_mm":null,"estado":"ok|advertencia|error","detalle":""},"cruces_de_corte":{"tiene":false,"estado":"ok|advertencia|error","detalle":""},"tamanio":{"px_ancho":null,"px_alto":null,"mm_ancho":null,"mm_alto":null,"detalle":""},"transparencias":{"tiene":false,"estado":"ok|advertencia|error","detalle":""},"perfil_color_icc":{"tiene":false,"perfil":null,"estado":"ok|advertencia|error","detalle":""},"calidad_general":"alta|media|baja","problemas_criticos":[],"advertencias":[],"tiempo_estimado":{"total_minutos":0,"desglose":{"correccion_color_min":0,"textos_tipografia_min":0,"sangria_corte_min":0,"resolucion_min":0,"revision_final_min":0},"justificacion":""},"resumen":""}`;
    let userContent;
    if (esVisual || esPDF) {
      const mediaType = esPDF ? "application/pdf" : mimetype;
      const tipo = esPDF ? "document" : "image";
      userContent = [{ type: tipo, source: { type: "base64", media_type: mediaType, data: base64 } }, { type: "text", text: `Analiza este archivo para imprenta. Nombre: ${originalname}. Tamaño: ${sizeMB} MB. Formato: ${ext.toUpperCase()}. Responde solo con el JSON.` }];
    } else {
      userContent = `Analiza este archivo para imprenta. Nombre: ${originalname}. Tamaño: ${sizeMB} MB. Formato: ${ext.toUpperCase()}. No tienes acceso visual. Responde solo con el JSON.`;
    }
    const callClaude = async (retries = 3, delayMs = 5000) => {
      for (let i = 0; i < retries; i++) {
        const response = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, system: systemPrompt, messages: [{ role: "user", content: userContent }] }) });
        if (response.ok) return response;
        const errText = await response.text();
        if ((response.status === 529 || response.status === 500 || response.status === 503) && i < retries - 1) { await new Promise(r => setTimeout(r, delayMs)); delayMs = Math.round(delayMs * 1.5); continue; }
        throw new Error(`Claude API error ${response.status}: ${errText}`);
      }
    };
    const response = await callClaude();
    const data = await response.json();
    const rawText = data.content.map(b => b.text || "").join("").trim();
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("La API no devolvió JSON válido");
    const analisis = JSON.parse(jsonMatch[0]);
    const t = analisis.tamanio || {};
    const dpi = analisis.resolucion?.valor_dpi;
    if (t.px_ancho && t.px_alto && dpi && dpi > 0) { t.mm_ancho = Math.round((t.px_ancho / dpi) * 25.4); t.mm_alto = Math.round((t.px_alto / dpi) * 25.4); }
    if (t.mm_ancho && t.mm_alto) { t.cm_ancho = parseFloat((t.mm_ancho / 10).toFixed(1)); t.cm_alto = parseFloat((t.mm_alto / 10).toFixed(1)); }
    else if (t.cm_ancho && t.cm_alto) { t.mm_ancho = Math.round(t.cm_ancho * 10); t.mm_alto = Math.round(t.cm_alto * 10); }
    analisis.tamanio = t;
    analisis.archivo = { nombre: originalname, formato: ext.toUpperCase(), tamano_mb: parseFloat(sizeMB) };
    res.json({ ok: true, analisis });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ ok: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Preflight Pro corriendo en puerto ${PORT}`));
