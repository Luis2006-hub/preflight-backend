const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } });
app.use(cors());
app.use(express.json());

const LOGO_CIRC = "data:image/png;base64,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";
const LOGO_CIRC_LARGE = "data:image/png;base64,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";

app.get("/", (req, res) => {
  res.json({ status: "Preflight Pro v6 (Tekkrom) activo" });
});

app.get("/widget", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("X-Frame-Options", "ALLOWALL");
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Preflight Pro - Tekkrom</title>
<link rel="icon" href="${LOGO_CIRC}">
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Inter',sans-serif;background:#f5f6f9;padding:0;color:#1a1d2e;min-height:100vh;}

.tk-hdr{background:linear-gradient(135deg,#ecfeff 0%,#eff6ff 50%,#eef2ff 100%);border-bottom:1px solid #d8e8f0;padding:12px 20px;}
.tk-hdr-inner{max-width:780px;margin:0 auto;display:flex;align-items:center;gap:12px;}
.tk-logo-circ{width:36px;height:36px;border-radius:50%;flex-shrink:0;}
.tk-prod{display:flex;flex-direction:column;}
.tk-prod-name{font-size:14px;font-weight:600;color:#1a1d2e;letter-spacing:-0.01em;}
.tk-prod-sub{font-size:11px;color:#6b7088;margin-top:1px;}
.tk-tag{margin-left:auto;font-size:11px;color:#6b7088;background:#f0f1f7;padding:4px 10px;border-radius:12px;font-weight:500;}

.app{max-width:780px;margin:0 auto;padding:1.5rem 1.25rem;}

.drop{border:none;border-radius:14px;padding:3.5rem 2rem;text-align:center;cursor:pointer;background:linear-gradient(135deg,#22d3ee 0%,#3b82f6 35%,#4f46e5 65%,#7c3aed 100%);transition:all 0.18s;box-shadow:0 4px 16px rgba(79,70,229,0.15);}
.drop:hover,.drop.over{transform:translateY(-1px);box-shadow:0 6px 20px rgba(79,70,229,0.25);}
.drop-ico{width:60px;height:60px;background:rgba(255,255,255,0.18);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.25);border-radius:14px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;}
.drop-t{font-size:17px;font-weight:600;color:white;margin-bottom:6px;}
.drop-h{font-size:13px;color:rgba(255,255,255,0.85);}
.drop-f{font-size:11px;color:rgba(255,255,255,0.75);margin-top:10px;text-transform:uppercase;letter-spacing:0.05em;}
.drop-limit{font-size:11px;color:rgba(255,255,255,0.95);margin-top:6px;font-weight:600;}
#fi{display:none;}

.szq{background:white;border:1px solid #e3e6f0;border-radius:14px;padding:1.5rem;}
.format-warn{display:flex;gap:12px;align-items:flex-start;background:#fff8eb;border:1px solid #fae2b8;border-radius:10px;padding:12px 14px;margin-bottom:1rem;}
.fw-ico{width:24px;height:24px;border-radius:50%;background:#8a5500;color:white;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;flex-shrink:0;}
.fw-body{flex:1;}
.fw-t{font-size:13px;font-weight:600;color:#5a3a0a;margin-bottom:4px;}
.fw-d{font-size:12px;color:#5a3a0a;line-height:1.5;}
.sqh{display:flex;align-items:center;gap:14px;margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px solid #f0f1f7;}
.sqt{width:80px;height:80px;border-radius:10px;background:#f5f6f9;border:1px solid #e3e6f0;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.sqt img{max-width:100%;max-height:100%;object-fit:contain;}
.sqt-ext{font-size:11px;font-weight:600;color:#1a3eb8;letter-spacing:0.04em;}
.sqfn{font-size:14px;font-weight:600;color:#1a1d2e;word-break:break-all;}
.sqm{font-size:12px;color:#6b7088;margin-top:3px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;}
.fm-pg{display:inline-flex;align-items:center;gap:5px;background:#eef1fc;color:#1a3eb8;padding:2px 9px;border-radius:10px;font-size:11px;font-weight:600;}

.sqtitle{font-size:15px;font-weight:600;color:#1a1d2e;margin-bottom:6px;}
.sqsub{font-size:13px;color:#6b7088;margin-bottom:18px;line-height:1.55;}

.presets{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin-bottom:14px;}
.preset{padding:13px;border:1px solid #e3e6f0;border-radius:10px;background:white;cursor:pointer;text-align:left;font-family:inherit;transition:all 0.15s;}
.preset:hover{border-color:#1a3eb8;background:#f8f9fd;}
.preset.active{border-color:#1a3eb8;background:#eef1fc;}
.pn{font-size:13px;font-weight:600;color:#1a1d2e;}
.ps{font-size:11px;color:#6b7088;margin-top:3px;}

.cust-big{padding:20px;background:#f5f6f9;border-radius:12px;margin-bottom:16px;}
.cust-row{display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap;margin-bottom:10px;}
.cust-input-big{width:130px;padding:14px 16px;border:1.5px solid #c5cad9;border-radius:10px;font-size:18px;font-weight:600;font-family:inherit;background:white;text-align:center;color:#1a1d2e;transition:all 0.15s;}
.cust-input-big::placeholder{font-weight:400;color:#9ba0b5;}
.cust-input-big:focus{outline:none;border-color:#1a3eb8;box-shadow:0 0 0 4px rgba(26,62,184,0.1);}
.cust-x{font-size:20px;color:#6b7088;font-weight:500;}
.cust-unit{font-size:16px;color:#6b7088;font-weight:500;}
.cust-hint{font-size:12px;color:#6b7088;text-align:center;display:block;margin-top:4px;font-style:italic;line-height:1.5;}

.acts{display:flex;gap:10px;flex-wrap:wrap;}
.bt:disabled,.bt-pr:disabled{background:#ececec !important;color:#9ba0b5 !important;border-color:#d3d1c7 !important;cursor:not-allowed;box-shadow:none !important;transform:none !important;}
.bt:disabled:hover,.bt-pr:disabled:hover{background:#ececec !important;color:#9ba0b5 !important;border-color:#d3d1c7 !important;box-shadow:none !important;transform:none !important;}
.skip-row{margin-top:14px;padding-top:14px;border-top:0.5px solid #e3e6f0;text-align:left;}
.skip-row a{font-size:12px;color:#1a3eb8;text-decoration:none;font-weight:500;}
.skip-row a:hover{text-decoration:underline;}
.bt{padding:11px 20px;border-radius:8px;border:1px solid #c5cad9;background:white;font-size:13px;font-weight:600;cursor:pointer;color:#1a1d2e;font-family:inherit;transition:all 0.15s;}
.bt:not(.bt-pr):hover{background:#f5f6f9;border-color:#1a3eb8;color:#1a3eb8;}
.bt-pr{background:linear-gradient(135deg,#22d3ee 0%,#3b82f6 35%,#4f46e5 65%,#7c3aed 100%);color:white;border-color:#3b82f6;box-shadow:0 2px 8px rgba(79,70,229,0.25);}
.bt-pr:hover{background:linear-gradient(135deg,#06b6d4 0%,#2563eb 35%,#4338ca 65%,#6d28d9 100%);color:white;border-color:#2563eb;box-shadow:0 4px 12px rgba(79,70,229,0.35);transform:translateY(-1px);}

.anz{background:white;border:1px solid #e3e6f0;border-radius:14px;padding:3.5rem 1.5rem;text-align:center;}
.big-spinner{position:relative;width:120px;height:120px;margin:0 auto 1.5rem;}
.big-spin-svg{transform:rotate(0deg);animation:big-spin-rotate 2s linear infinite;}
.big-spin-arc{transition:stroke-dashoffset 0.5s ease;}
@keyframes big-spin-rotate{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
.big-spin-pct{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:26px;font-weight:600;color:#1a1d2e;font-variant-numeric:tabular-nums;}
.anz-t{font-size:15px;font-weight:600;color:#1a1d2e;margin-bottom:5px;}
.anz-s{font-size:12px;color:#6b7088;}

.fhead{background:white;border:1px solid #e3e6f0;border-radius:14px;padding:1rem 1.25rem;margin-bottom:12px;display:flex;align-items:center;gap:14px;}
.ft{width:80px;height:80px;border-radius:10px;background:#f5f6f9;border:1px solid #e3e6f0;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.ft img{max-width:100%;max-height:100%;object-fit:contain;}
.ft-ext{font-size:11px;font-weight:600;color:#1a3eb8;letter-spacing:0.04em;}
.fn{font-size:14px;font-weight:600;color:#1a1d2e;word-break:break-all;}
.fm{font-size:12px;color:#6b7088;margin-top:4px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.fm-sep{color:#c5cad9;}

.verd{margin-left:auto;padding:6px 13px;border-radius:8px;font-size:12px;font-weight:600;flex-shrink:0;white-space:nowrap;}
.v-ok{background:#e6f7ec;color:#1a7a3a;}
.v-wn{background:#fff4e0;color:#8a5500;}
.v-er{background:#fce8e8;color:#a32d2d;}

.preview{background:white;border:1px solid #e3e6f0;border-radius:14px;padding:1rem;margin-bottom:12px;display:flex;align-items:center;justify-content:center;min-height:240px;}
.preview img,.preview canvas{max-width:100%;max-height:380px;border-radius:6px;border:1px solid #e3e6f0;}
.preview-pdf{display:flex;flex-direction:column;gap:12px;align-items:center;max-height:480px;overflow-y:auto;width:100%;padding:0 8px;}

.cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:12px;}
.card{background:white;border:1px solid #e3e6f0;border-radius:14px;padding:1.1rem 1.25rem;}
.c-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
.c-label{font-size:11px;color:#6b7088;text-transform:uppercase;letter-spacing:0.06em;font-weight:600;}
.c-pill{font-size:11px;padding:3px 9px;border-radius:10px;font-weight:600;}
.p-ok{background:#e6f7ec;color:#1a7a3a;}
.p-wn{background:#fff4e0;color:#8a5500;}
.p-er{background:#fce8e8;color:#a32d2d;}
.c-val{font-size:20px;font-weight:600;color:#1a1d2e;line-height:1.25;margin-bottom:5px;}
.size-block{margin:6px 0 10px;}
.size-row{display:flex;justify-content:space-between;align-items:baseline;padding:5px 0;border-bottom:1px dashed #e3e6f0;}
.size-row:last-child{border-bottom:none;}
.size-key{font-size:12px;color:#6b7088;font-weight:500;}
.size-val{font-size:15px;font-weight:600;color:#1a1d2e;}
.size-val-target{color:#1a3eb8;}
.c-sub{font-size:12px;color:#6b7088;line-height:1.5;}
.cal-reco{margin-top:12px;background:#eaf3de;border-left:3px solid #639922;border-radius:8px;padding:10px 12px;}
.cal-reco-l{font-size:10px;font-weight:600;color:#3b6d11;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:5px;}
.cal-reco-t{font-size:12px;color:#173404;line-height:1.5;}
.cal-reco-t strong{color:#27500a;font-weight:600;}

.ai{background:#eef1fc;border:1px solid #d8def0;border-radius:14px;padding:14px 16px;margin-bottom:12px;}
.ai-l{font-size:11px;font-weight:600;color:#1a3eb8;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;display:flex;align-items:center;gap:6px;}
.ai-l-dot{width:6px;height:6px;border-radius:50%;background:#1a3eb8;}
.ai-t{font-size:13px;color:#2a2d44;line-height:1.6;}

.adv-tg{font-size:12px;color:#6b7088;cursor:pointer;text-align:center;padding:10px;font-weight:500;}
.adv-c{display:none;font-size:11px;color:#4a4d68;background:white;padding:14px 18px;border:1px solid #e3e6f0;border-radius:10px;font-family:'Courier New',monospace;line-height:1.85;margin-top:6px;}
.adv-c.show{display:block;}

.err{background:#fce8e8;border:1px solid #f0a0a0;border-radius:14px;padding:1rem 1.25rem;margin-bottom:1rem;}
.err-t{font-size:14px;font-weight:600;color:#a32d2d;margin-bottom:5px;}
.err-d{font-size:12px;color:#a32d2d;line-height:1.5;}

footer.tk-foot{text-align:center;padding:1.5rem 1rem;font-size:11px;color:#9ba0b5;}
footer.tk-foot a{color:#1a3eb8;text-decoration:none;font-weight:500;}

.splash{position:fixed;inset:0;background:linear-gradient(135deg,#ecfeff 0%,#eff6ff 50%,#eef2ff 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;z-index:9999;animation:splashShow 2.3s ease-in-out forwards;}
.splash-logo{width:88px;height:88px;border-radius:50%;box-shadow:0 8px 28px rgba(79,70,229,0.18);animation:splashLogoIn 0.6s ease-out;}
.splash-name{font-size:26px;font-weight:600;color:#1a1d2e;letter-spacing:-0.02em;animation:splashTextIn 0.6s ease-out 0.15s both;}
.splash-ver{font-size:11px;color:#6b7088;text-transform:uppercase;letter-spacing:0.12em;margin-top:-12px;animation:splashTextIn 0.6s ease-out 0.25s both;}
.splash-by{position:absolute;bottom:28px;font-size:11px;color:#9ba0b5;letter-spacing:0.05em;animation:splashTextIn 0.6s ease-out 0.4s both;}
@keyframes splashShow{0%{opacity:0;}15%{opacity:1;}80%{opacity:1;}100%{opacity:0;visibility:hidden;pointer-events:none;}}
@keyframes splashLogoIn{from{opacity:0;transform:scale(0.85);}to{opacity:1;transform:scale(1);}}
@keyframes splashTextIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
</style>
</head>
<body>

<div class="splash" id="splash">
  <img src="${LOGO_CIRC_LARGE}" alt="Tekkrom" class="splash-logo">
  <div class="splash-name">Preflight Pro</div>
  <div class="splash-ver">Versión 1.1</div>
  <div class="splash-by">Tekkrom Servicios Gráficos</div>
</div>

<header class="tk-hdr">
  <div class="tk-hdr-inner">
    <img src="${LOGO_CIRC}" alt="Tekkrom" class="tk-logo-circ">
    <div class="tk-prod">
      <div class="tk-prod-name">Preflight Pro</div>
      <div class="tk-prod-sub">Tekkrom · Análisis técnico para imprenta</div>
    </div>
    <div class="tk-tag">v1.1</div>
  </div>
</header>

<div class="app">
  <div id="dropbox">
    <div class="drop" id="drop">
      <div class="drop-ico"><svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M13 4v14M9 10l4-6 4 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 19v2a2 2 0 002 2h14a2 2 0 002-2v-2" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></div>
      <div class="drop-t">Sube tu archivo de imprenta</div>
      <div class="drop-h">Arrastra aquí o haz clic para seleccionar</div>
      <div class="drop-f">PDF · PNG · JPG · TIFF · PSD · AI · EPS · SVG · GIF · BMP · WEBP</div>
      <div class="drop-limit">Máximo 50 MB por archivo</div>
    </div>
    <input type="file" id="fi" accept=".pdf,.png,.jpg,.jpeg,.tiff,.tif,.gif,.bmp,.webp,.svg,.psd,.ai,.eps">
  </div>

  <div class="szq" id="szq" style="display:none">
    <div class="sqh">
      <div class="sqt" id="szt"></div>
      <div style="flex:1;min-width:0">
        <div class="sqfn" id="szfn"></div>
        <div class="sqm" id="szm"></div>
      </div>
    </div>
    <div class="sqtitle">Ingresa tamaño aproximado de impresión</div>
    <div class="sqsub">Esto nos permite calcular si la calidad será suficiente al imprimirlo. Puedes omitir si no estás seguro.</div>
    <div class="cust-big">
      <div class="cust-row">
        <input type="number" class="cust-input-big" id="cw" placeholder="Ancho" step="0.1">
        <span class="cust-x">×</span>
        <input type="number" class="cust-input-big" id="ch" placeholder="Alto" step="0.1">
        <span class="cust-unit">cm</span>
      </div>
      <span class="cust-hint">Ingresa solo una medida, la otra se calcula automáticamente respetando las proporciones del archivo</span>
    </div>
    <div class="acts">
      <button class="bt bt-pr" id="btn-analyze" disabled>Analizar archivo</button>
      <button class="bt" id="btn-change-file">Seleccionar otro archivo</button>
    </div>
    <div class="skip-row">
      <a href="#" id="btn-skip-size">No sé el tamaño todavía, analizar de todos modos →</a>
    </div>
  </div>

  <div class="anz" id="anz" style="display:none">
    <div class="big-spinner">
      <svg class="big-spin-svg" width="120" height="120" viewBox="0 0 120 120">
        <circle class="big-spin-track" cx="60" cy="60" r="52" fill="none" stroke="#e3e6f0" stroke-width="6"/>
        <circle class="big-spin-arc" cx="60" cy="60" r="52" fill="none" stroke="url(#progress-grad)" stroke-width="6" stroke-linecap="round" stroke-dasharray="326.7" stroke-dashoffset="310" transform="rotate(-90 60 60)"/>
        <defs>
          <linearGradient id="progress-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#22d3ee"/>
            <stop offset="35%" stop-color="#3b82f6"/>
            <stop offset="65%" stop-color="#4f46e5"/>
            <stop offset="100%" stop-color="#7c3aed"/>
          </linearGradient>
        </defs>
      </svg>
      <div class="big-spin-pct" id="prog-pct">5%</div>
    </div>
    <div class="anz-t">Analizando archivo</div>
    <div class="anz-s" id="anzs">Iniciando</div>
  </div>

  <div id="results" style="display:none"></div>
</div>

<footer class="tk-foot">
  Powered by <a href="https://tekkrom.cl" target="_blank">Tekkrom Servicios Gráficos</a>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/psd@3.4.0/dist/psd.min.js"></script>
<script>
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
const BACKEND = 'https://preflight-backend-production-e718.up.railway.app';

const PRESETS = [];

let curFile = null, curURL = null, curPxW = null, curPxH = null, curDPI = null;
let curMmW = null, curMmH = null, curCmW = null, curCmH = null, curExt = '', curPages = 1;
let targetSize = null;

function init() {
  // Renderizar presets
  const pBox = document.getElementById('presets-box');
  PRESETS.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'preset';
    btn.innerHTML = '<div class="pn">' + p.name + '</div><div class="ps">' + p.size + '</div>';
    btn.addEventListener('click', () => szPick(btn, p.w, p.h));
    pBox.appendChild(btn);
  });

  const drop = document.getElementById('drop');
  const fi = document.getElementById('fi');

  drop.addEventListener('click', () => fi.click());
  drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('over'); });
  drop.addEventListener('dragleave', () => drop.classList.remove('over'));
  drop.addEventListener('drop', e => {
    e.preventDefault();
    drop.classList.remove('over');
    if (e.dataTransfer.files[0]) loadFile(e.dataTransfer.files[0]);
  });

  fi.addEventListener('change', e => {
    if (e.target.files[0]) loadFile(e.target.files[0]);
  });

  document.getElementById('btn-analyze').addEventListener('click', continueAn);
  document.getElementById('btn-change-file').addEventListener('click', () => {
    resetAll();
    document.getElementById('fi').click();
  });
  document.getElementById('btn-skip-size').addEventListener('click', e => {
    e.preventDefault();
    skipSize();
  });

  // Auto-calcular medida proporcional cuando el usuario ingresa una sola
  const cwInput = document.getElementById('cw');
  const chInput = document.getElementById('ch');

  // Habilitar/deshabilitar botón Analizar según si hay alguna medida ingresada
  function updateAnalyzeButton() {
    const w = parseFloat(cwInput.value);
    const h = parseFloat(chInput.value);
    const hasSize = (w > 0) || (h > 0);
    document.getElementById('btn-analyze').disabled = !hasSize;
  }

  function getAspectRatio() {
    // Usar la proporción real del archivo (ancho/alto)
    if (curCmW && curCmH) return curCmW / curCmH;
    if (curMmW && curMmH) return curMmW / curMmH;
    if (curPxW && curPxH) return curPxW / curPxH;
    return null;
  }

  cwInput.addEventListener('input', () => {
    const ratio = getAspectRatio();
    const w = parseFloat(cwInput.value);
    if (ratio && w > 0) {
      // Calcular alto proporcional
      chInput.value = (w / ratio).toFixed(1);
      // Quitar selección de presets si los hay
      document.querySelectorAll('.preset').forEach(b => b.classList.remove('active'));
    }
    updateAnalyzeButton();
  });

  chInput.addEventListener('input', () => {
    const ratio = getAspectRatio();
    const h = parseFloat(chInput.value);
    if (ratio && h > 0) {
      // Calcular ancho proporcional
      cwInput.value = (h * ratio).toFixed(1);
      document.querySelectorAll('.preset').forEach(b => b.classList.remove('active'));
    }
    updateAnalyzeButton();
  });
}

function fb(b) {
  if (b < 1024) return b + ' B';
  if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
  return (b / 1048576).toFixed(2) + ' MB';
}

let _currentPct = 0;
let _targetPct = 0;
let _progAnim = null;

function step(p, m) {
  document.getElementById('anzs').textContent = m;
  _targetPct = p;
  if (!_progAnim) {
    _progAnim = setInterval(() => {
      if (_currentPct < _targetPct) {
        _currentPct = Math.min(_currentPct + 0.5, _targetPct);
        updateProgressUI(_currentPct);
      } else if (_currentPct >= 100) {
        clearInterval(_progAnim);
        _progAnim = null;
      }
    }, 30);
  }
}

function updateProgressUI(pct) {
  document.getElementById('prog-pct').textContent = Math.round(pct) + '%';
  const total = 326.7;
  const offset = total - (total * pct / 100);
  const arc = document.querySelector('.big-spin-arc');
  if (arc) arc.setAttribute('stroke-dashoffset', offset);
}

function resetProgress() {
  _currentPct = 0;
  _targetPct = 0;
  if (_progAnim) { clearInterval(_progAnim); _progAnim = null; }
  updateProgressUI(0);
}

async function loadFile(file) {
  if (!file) return;

  // Validar tamaño antes de procesar
  const MAX_SIZE = 50 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    const sizeMB = (file.size / 1024 / 1024).toFixed(1);
    showSizeError(file, sizeMB);
    return;
  }

  curFile = file;
  curExt = file.name.split('.').pop().toLowerCase();
  if (curURL) { URL.revokeObjectURL(curURL); curURL = null; }
  curPages = 1;
  curPxW = null; curPxH = null; curDPI = null;
  curMmW = null; curMmH = null; curCmW = null; curCmH = null;

  const thumbEl = document.getElementById('szt');
  const isImg = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(curExt);

  if (isImg) {
    curURL = URL.createObjectURL(file);
    thumbEl.innerHTML = '<img src="' + curURL + '" alt="">';
    try {
      const dims = await getDims(file);
      curPxW = dims.w;
      curPxH = dims.h;
    } catch (e) { console.warn('getDims:', e); }
    try {
      curDPI = await getDPI(file);
    } catch (e) { console.warn('getDPI:', e); }
  } else if (curExt === 'psd') {
    thumbEl.innerHTML = '<div class="sqt-ext">PSD</div>';
    try {
      const psd = await getPSDDims(file);
      if (psd) {
        curPxW = psd.w;
        curPxH = psd.h;
        curDPI = psd.dpi;
        curMmW = Math.round((curPxW / curDPI) * 25.4);
        curMmH = Math.round((curPxH / curDPI) * 25.4);
        curCmW = parseFloat((curMmW / 10).toFixed(1));
        curCmH = parseFloat((curMmH / 10).toFixed(1));
      }
    } catch (e) { console.warn('getPSDDims:', e); }
    // Renderizar miniatura usando psd.js
    try {
      if (typeof PSD !== 'undefined') {
        const buf = await file.arrayBuffer();
        const psdFile = new PSD(new Uint8Array(buf));
        psdFile.parse();
        const img = psdFile.image.toBase64();
        // Guardar para usar en visor grande
        window._psdPreviewURL = img;
        // Mostrar miniatura
        thumbEl.innerHTML = '<img src="' + img + '" alt="" style="max-width:100%;max-height:100%;object-fit:contain">';
      }
    } catch (e) { console.warn('psd.js render falló:', e); }
  } else if (curExt === 'ai' || curExt === 'eps') {
    thumbEl.innerHTML = '<div class="sqt-ext">' + curExt.toUpperCase() + '</div>';
    window._aiHasPDFPreview = false;
    window._aiPdfBuffer = null;
    try {
      const buf = await file.arrayBuffer();
      // Buscar la firma "%PDF-" en el archivo. Los AI modernos tienen un PDF embebido
      // que puede empezar al inicio o después de algún offset.
      const bytes = new Uint8Array(buf);
      let pdfStart = -1;
      const searchLimit = Math.min(bytes.length - 5, 5000000); // hasta 5MB
      for (let i = 0; i < searchLimit; i++) {
        if (bytes[i] === 0x25 && bytes[i+1] === 0x50 && bytes[i+2] === 0x44 && bytes[i+3] === 0x46 && bytes[i+4] === 0x2D) {
          pdfStart = i;
          break;
        }
      }

      let pdfBuffer;
      if (pdfStart > 0) {
        // Recortar desde el inicio del PDF
        pdfBuffer = buf.slice(pdfStart);
      } else if (pdfStart === 0) {
        pdfBuffer = buf;
      } else {
        throw new Error('No se encontró PDF embebido en el archivo AI/EPS');
      }

      const pdf = await pdfjsLib.getDocument({ data: pdfBuffer }).promise;
      curPages = pdf.numPages;
      const page = await pdf.getPage(1);
      const vp1 = page.getViewport({ scale: 1 });
      curMmW = Math.round(vp1.width * (25.4 / 72));
      curMmH = Math.round(vp1.height * (25.4 / 72));
      curCmW = parseFloat((curMmW / 10).toFixed(1));
      curCmH = parseFloat((curMmH / 10).toFixed(1));

      // Renderizar miniatura
      const vp = page.getViewport({ scale: 0.5 });
      const canvas = document.createElement('canvas');
      canvas.width = vp.width;
      canvas.height = vp.height;
      canvas.style.maxWidth = '100%';
      canvas.style.maxHeight = '100%';
      canvas.style.objectFit = 'contain';
      await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
      thumbEl.innerHTML = '';
      thumbEl.appendChild(canvas);

      // Guardar UNA COPIA INDEPENDIENTE del buffer (ArrayBuffer no Uint8Array)
      // para poder reusarlo en el visor grande sin problemas de transferencia
      const copyBuffer = new ArrayBuffer(pdfBuffer.byteLength);
      new Uint8Array(copyBuffer).set(new Uint8Array(pdfBuffer));
      window._aiHasPDFPreview = true;
      window._aiPdfBufferCopy = copyBuffer;
      window._aiPdfPages = pdf.numPages;
    } catch (e) {
      console.warn('AI/EPS preview falló:', e);
      window._aiHasPDFPreview = false;
    }
  } else {
    thumbEl.innerHTML = '<div class="sqt-ext">' + curExt.toUpperCase() + '</div>';
    if (curExt === 'pdf') {
      try {
        // Una sola lectura del PDF: dimensiones + páginas + miniatura
        const buf = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: buf.slice(0) }).promise;
        curPages = pdf.numPages;

        // Leer dimensiones de la primera página (en puntos PDF, 1pt = 25.4/72 mm)
        const page = await pdf.getPage(1);
        const vp1 = page.getViewport({ scale: 1 });
        curMmW = Math.round(vp1.width * (25.4 / 72));
        curMmH = Math.round(vp1.height * (25.4 / 72));
        curCmW = parseFloat((curMmW / 10).toFixed(1));
        curCmH = parseFloat((curMmH / 10).toFixed(1));

        // Renderizar miniatura
        const vp = page.getViewport({ scale: 0.3 });
        const canvas = document.createElement('canvas');
        canvas.width = vp.width;
        canvas.height = vp.height;
        canvas.style.maxWidth = '100%';
        canvas.style.maxHeight = '100%';
        canvas.style.objectFit = 'contain';
        await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
        thumbEl.innerHTML = '';
        thumbEl.appendChild(canvas);
      } catch (e) { console.warn('PDF processing:', e); }
    }
  }

  if (isImg && curPxW) {
    const dpiUsado = curDPI || 72;
    curMmW = Math.round((curPxW / dpiUsado) * 25.4);
    curMmH = Math.round((curPxH / dpiUsado) * 25.4);
    curCmW = parseFloat((curMmW / 10).toFixed(1));
    curCmH = parseFloat((curMmH / 10).toFixed(1));
  }

  document.getElementById('szfn').textContent = file.name;
  let metaParts = [fb(file.size), curExt.toUpperCase()];
  if (curPxW) metaParts.push(curPxW + 'x' + curPxH + ' px');
  if (curCmW) metaParts.push(curCmW + 'x' + curCmH + ' cm');

  let metaHTML = metaParts.map((p, i) => (i > 0 ? '<span style="color:#c5cad9">-</span>' : '') + '<span>' + p + '</span>').join('');
  if (curPages > 1) {
    metaHTML += '<span class="fm-pg">' + curPages + ' páginas</span>';
  }
  document.getElementById('szm').innerHTML = metaHTML;

  // Disclaimer para formatos sin lectura completa
  const formatosLimitados = ['ai', 'eps', 'svg'];
  const disclaimerEl = document.getElementById('format-warning');
  if (formatosLimitados.includes(curExt)) {
    if (disclaimerEl) disclaimerEl.remove();
    const warn = document.createElement('div');
    warn.id = 'format-warning';
    warn.className = 'format-warn';
    warn.innerHTML = '<div class="fw-ico">!</div><div class="fw-body"><div class="fw-t">Formato con análisis limitado</div><div class="fw-d">Los archivos <strong>' + curExt.toUpperCase() + '</strong> son formatos cerrados de Adobe. El análisis será parcial — las medidas pueden no ser exactas y algunas verificaciones no se podrán realizar. Para mejor precisión, exporta tu archivo como <strong>PDF</strong> antes de subirlo.</div></div>';
    document.querySelector('.szq .sqh').after(warn);
  } else if (disclaimerEl) {
    disclaimerEl.remove();
  }

  document.getElementById('dropbox').style.display = 'none';
  document.getElementById('szq').style.display = 'block';
}

function szPick(btn, w, h) {
  document.querySelectorAll('.preset').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  targetSize = { w, h };
  document.getElementById('cw').value = w;
  document.getElementById('ch').value = h;
}

function continueAn() {
  const cwVal = document.getElementById('cw').value;
  const chVal = document.getElementById('ch').value;
  const w = parseFloat(cwVal);
  const h = parseFloat(chVal);
  if (w > 0 && h > 0) {
    targetSize = { w: parseFloat(w.toFixed(1)), h: parseFloat(h.toFixed(1)) };
  } else if (w > 0 || h > 0) {
    // Solo una medida — calcular la otra desde proporción del archivo
    const ratio = (curCmW && curCmH) ? curCmW / curCmH : (curPxW && curPxH ? curPxW / curPxH : null);
    if (ratio) {
      if (w > 0 && !h) {
        targetSize = { w: parseFloat(w.toFixed(1)), h: parseFloat((w / ratio).toFixed(1)) };
      } else if (h > 0 && !w) {
        targetSize = { w: parseFloat((h * ratio).toFixed(1)), h: parseFloat(h.toFixed(1)) };
      }
    }
  } else {
    targetSize = null;
  }
  startAnalysis();
}

function skipSize() {
  targetSize = null;
  startAnalysis();
}

async function startAnalysis() {
  document.getElementById('szq').style.display = 'none';
  document.getElementById('anz').style.display = 'block';
  resetProgress();
  step(8, 'Iniciando análisis...');
  await new Promise(r => setTimeout(r, 200));
  step(20, 'Renderizando vista previa...');
  await renderPrev();
  step(40, 'Preparando datos del archivo...');
  await new Promise(r => setTimeout(r, 200));
  step(55, 'Enviando a IA para análisis preflight...');

  try {
    const fd = new FormData();
    fd.append('archivo', curFile, curFile.name);
    if (curPxW) fd.append('px_ancho', curPxW);
    if (curPxH) fd.append('px_alto', curPxH);
    if (curDPI) fd.append('dpi_meta', curDPI);
    if (curMmW) fd.append('mm_ancho', curMmW);
    if (curMmH) fd.append('mm_alto', curMmH);
    if (curCmW) fd.append('cm_ancho', curCmW);
    if (curCmH) fd.append('cm_alto', curCmH);
    if (curPages) fd.append('paginas', curPages);

    // Mientras esperamos respuesta del backend, ir avanzando el progreso poco a poco
    let progressTick = 55;
    const fetchProgress = setInterval(() => {
      progressTick = Math.min(progressTick + 2, 88);
      step(progressTick, 'IA analizando archivo...');
    }, 800);

    const resp = await fetch(BACKEND + '/analizar', { method: 'POST', body: fd });
    clearInterval(fetchProgress);
    step(92, 'Procesando resultado...');
    await new Promise(r => setTimeout(r, 200));
    step(98, 'Generando reporte...');
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const data = await resp.json();
    if (!data.ok) throw new Error(data.error || 'Error');
    step(100, 'Listo');
    await new Promise(r => setTimeout(r, 300));
    showResults(data.analisis);
  } catch (err) {
    showError(err.message);
  }
}

async function renderPrev() {
  const html = document.getElementById('results');
  if (curExt === 'pdf') {
    try {
      const buf = await curFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      const total = Math.min(pdf.numPages, 10);
      html.dataset.prev = '<div class="preview"><div class="preview-pdf" id="pdf-prev"></div></div>';
      window._pdfDoc = pdf;
      window._pdfPages = total;
    } catch (e) {
      html.dataset.prev = '<div class="preview"><div style="color:#9ba0b5;padding:2rem;text-align:center">No se pudo renderizar el PDF</div></div>';
    }
  } else if (curExt === 'ai' || curExt === 'eps') {
    // Para AI/EPS: buscar PDF embebido directamente desde el archivo (búsqueda completa)
    let pdf = null, total = 0;
    try {
      const buf = await curFile.arrayBuffer();
      const bytes = new Uint8Array(buf);
      // Búsqueda completa del archivo, no solo primeros 50KB
      let pdfStart = -1;
      const searchLimit = Math.min(bytes.length - 5, 5000000); // hasta 5MB
      for (let i = 0; i < searchLimit; i++) {
        if (bytes[i] === 0x25 && bytes[i+1] === 0x50 && bytes[i+2] === 0x44 && bytes[i+3] === 0x46 && bytes[i+4] === 0x2D) {
          pdfStart = i;
          break;
        }
      }
      if (pdfStart >= 0) {
        // Crear copia limpia del buffer recortado
        const sliced = buf.slice(pdfStart);
        pdf = await pdfjsLib.getDocument({ data: sliced }).promise;
        total = Math.min(pdf.numPages, 10);
      }
    } catch (e) {
      console.warn('renderPrev AI/EPS falló:', e);
      pdf = null;
    }

    if (pdf) {
      html.dataset.prev = '<div class="preview"><div class="preview-pdf" id="pdf-prev"></div></div>';
      window._pdfDoc = pdf;
      window._pdfPages = total;
    } else {
      html.dataset.prev = '<div class="preview"><div style="color:#9ba0b5;padding:2rem;text-align:center"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" style="margin-bottom:10px;opacity:0.4"><rect x="6" y="4" width="28" height="32" rx="3" stroke="currentColor" stroke-width="2"/><path d="M14 16h12M14 22h12M14 28h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><div>' + (curExt.toUpperCase()) + ' sin vista previa embebida</div><div style="font-size:11px;margin-top:6px">Este archivo no incluye preview PDF. Para verlo, ábrelo en Illustrator o expórtalo como PDF.</div></div></div>';
    }
  } else if (curExt === 'psd') {
    // Para PSD, usar la imagen renderizada por psd.js
    if (window._psdPreviewURL) {
      html.dataset.prev = '<div class="preview"><img src="' + window._psdPreviewURL + '" alt=""></div>';
    } else {
      html.dataset.prev = '<div class="preview"><div style="color:#9ba0b5;padding:2rem;text-align:center"><svg width="40" height="40" viewBox="0 0 40 40" fill="none" style="margin-bottom:10px;opacity:0.4"><rect x="6" y="4" width="28" height="32" rx="3" stroke="currentColor" stroke-width="2"/><path d="M14 16h12M14 22h12M14 28h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><div>PSD sin vista previa</div><div style="font-size:11px;margin-top:6px">Para verlo, ábrelo en Photoshop o expórtalo como PNG/JPG.</div></div></div>';
    }
  } else {
    if (!curURL) curURL = URL.createObjectURL(curFile);
    html.dataset.prev = '<div class="preview"><img src="' + curURL + '" alt=""></div>';
  }
}

async function renderPDFPages() {
  if (!window._pdfDoc) return;
  const cont = document.getElementById('pdf-prev');
  if (!cont) return;
  // Render en alta resolución manteniendo proporciones exactas del archivo
  const internalScale = 3; // calidad interna alta para nitidez en HiDPI

  for (let p = 1; p <= window._pdfPages; p++) {
    const page = await window._pdfDoc.getPage(p);
    const vp = page.getViewport({ scale: internalScale });

    const canvas = document.createElement('canvas');
    canvas.width = vp.width;
    canvas.height = vp.height;

    // CSS: solo limitar ancho máximo, dejar que height se ajuste automáticamente
    // Esto preserva las proporciones reales del archivo (no distorsiona)
    canvas.style.maxWidth = '100%';
    canvas.style.height = 'auto';
    canvas.style.display = 'block';

    await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
    cont.appendChild(canvas);
  }
}

function showResults(d) {
  document.getElementById('anz').style.display = 'none';
  const r = document.getElementById('results');

  const dpi = (d.resolucion && d.resolucion.valor_dpi) || curDPI;
  const cmW = (d.tamanio && d.tamanio.cm_ancho) || curCmW;
  const cmH = (d.tamanio && d.tamanio.cm_alto) || curCmH;
  const modoColor = (d.modo_color && d.modo_color.valor) || 'Desconocido';
  const colorOK = modoColor === 'CMYK';
  const sangria = (d.sangria && d.sangria.tiene) || false;

  let calidadDPI = dpi, targetInfo = '';
  if (targetSize && curPxW && curPxH) {
    const dpiW = Math.round(curPxW / (targetSize.w / 2.54));
    const dpiH = Math.round(curPxH / (targetSize.h / 2.54));
    calidadDPI = Math.min(dpiW, dpiH);
    targetInfo = ' al imprimir en ' + targetSize.w + 'x' + targetSize.h + ' cm';
  }

  // Evaluación visual de la IA tiene prioridad sobre el cálculo matemático de DPI
  const calidadVisualIA = (d.calidad_visual || d.calidad_general || '').toLowerCase();

  let calLabel, calStatus, calDetail;

  // Cascada de calidad con prioridades correctas:
  // 1. PRIMERO: Si DPI matemático es bajo (<100), siempre se reporta tal cual sin importar lo que diga la IA
  //    (la IA puede equivocarse hacia abajo diciendo "media" cuando en realidad es muy baja, no debe ocultar problemas reales)
  // 2. La IA puede degradar a "Baja" solo si ve pixelación clara (override a calidad alta aparente)
  // 3. PDF vectorial sin DPI rasterizado → Vectorial (calidad óptima)
  // 4. DPI bueno (>=150) → respetar el cálculo matemático aunque la IA diga "media"
  if (calidadDPI && calidadDPI < 72) {
    calLabel = 'Muy baja'; calStatus = 'p-er';
    calDetail = 'No recomendado para imprenta (' + calidadDPI + ' DPI' + targetInfo + ')';
  } else if (calidadDPI && calidadDPI < 100) {
    calLabel = 'Limitada'; calStatus = 'p-wn';
    calDetail = 'Solo para uso pequeño (' + calidadDPI + ' DPI' + targetInfo + ')';
  } else if (calidadVisualIA === 'baja') {
    calLabel = 'Baja'; calStatus = 'p-er';
    calDetail = 'Imagen visualmente pixelada o borrosa' + (calidadDPI ? ' (' + calidadDPI + ' DPI' + targetInfo + ')' : '');
  } else if (calidadVisualIA === 'media' && calidadDPI && calidadDPI < 150) {
    calLabel = 'Media'; calStatus = 'p-wn';
    calDetail = 'Algo de pixelación visible' + (calidadDPI ? ' (' + calidadDPI + ' DPI' + targetInfo + ')' : '');
  } else if (curExt === 'pdf' && !dpi) {
    calLabel = 'Vectorial'; calStatus = 'p-ok';
    calDetail = 'Calidad óptima a cualquier tamaño';
  } else if (calidadDPI >= 300) {
    calLabel = 'Excelente'; calStatus = 'p-ok';
    calDetail = 'Calidad profesional (' + calidadDPI + ' DPI' + targetInfo + ')';
  } else if (calidadDPI >= 200) {
    calLabel = 'Alta'; calStatus = 'p-ok';
    calDetail = 'Perfecta para imprenta digital (' + calidadDPI + ' DPI' + targetInfo + ')';
  } else if (calidadDPI >= 150) {
    calLabel = 'Buena'; calStatus = 'p-ok';
    calDetail = 'Apta para imprenta digital (' + calidadDPI + ' DPI' + targetInfo + ')';
  } else if (calidadDPI >= 100) {
    calLabel = 'Aceptable'; calStatus = 'p-wn';
    calDetail = 'Funciona para flyers y volantes (' + calidadDPI + ' DPI' + targetInfo + ')';
  } else {
    calLabel = 'Sin información'; calStatus = 'p-wn';
    calDetail = 'No se pudo determinar la resolución';
  }

  let tamRecomendado = '';
  if (curPxW && curPxH) {
    const maxW = parseFloat(((curPxW / 200) * 2.54).toFixed(1));
    const maxH = parseFloat(((curPxH / 200) * 2.54).toFixed(1));
    tamRecomendado = 'Calidad alta hasta ' + maxW + ' x ' + maxH + ' cm para imprenta digital.';
  }

  const probs = [];
  if (calidadDPI && calidadDPI < 100) probs.push('calidad');
  if (!colorOK && curExt === 'pdf') probs.push('color');
  if (!sangria && curExt === 'pdf') probs.push('sangria');

  let vClass, vLabel;
  if (probs.length === 0) {
    vClass = 'v-ok'; vLabel = 'Listo para imprimir';
  } else if (probs.length <= 2) {
    vClass = 'v-wn'; vLabel = 'Necesita ajustes';
  } else {
    vClass = 'v-er'; vLabel = 'No imprimible';
  }

  let tamLabel = (cmW && cmH) ? cmW + ' x ' + cmH + ' cm' : '—';
  let tamRef = '';
  if (cmW && cmH) {
    if (Math.abs(cmW - 21) < 1 && Math.abs(cmH - 29.7) < 1) tamRef = 'Formato A4 estándar';
    else if (Math.abs(cmW - 14.8) < 1 && Math.abs(cmH - 21) < 1) tamRef = 'Formato A5';
    else if (cmW < 10 && cmH < 10) tamRef = 'Tamaño tarjeta';
    else if (cmW > 40 || cmH > 40) tamRef = 'Formato grande';
    else tamRef = 'Formato ' + cmW + 'x' + cmH + ' cm';
  }

  const isImg = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'].includes(curExt);
  const thumbHtml = (isImg && curURL)
    ? '<div class="ft"><img src="' + curURL + '" alt=""></div>'
    : '<div class="ft"><div class="ft-ext">' + curExt.toUpperCase() + '</div></div>';

  let metaParts = [fb(curFile.size), curExt.toUpperCase()];
  if (tamLabel !== '—') metaParts.push(tamLabel);
  let metaHTML = metaParts.map((p, i) => (i > 0 ? '<span class="fm-sep">-</span>' : '') + '<span>' + p + '</span>').join('');
  if (curPages > 1) {
    metaHTML += '<span class="fm-pg">' + curPages + ' páginas</span>';
  }

  let html = '';
  html += '<div class="fhead">' + thumbHtml + '<div style="flex:1;min-width:0"><div class="fn">' + curFile.name + '</div><div class="fm">' + metaHTML + '</div></div><span class="verd ' + vClass + '">' + vLabel + '</span></div>';
  html += r.dataset.prev || '';

  html += '<div class="cards">';
  // Construir info de tamaño según si hay tamaño objetivo
  let tamCardHTML = '';
  if (targetSize && cmW && cmH) {
    // Comparar tamaño archivo vs tamaño solicitado
    const factorEscala = (targetSize.w / cmW * 100).toFixed(0);
    const esIgual = Math.abs(targetSize.w - cmW) < 0.5 && Math.abs(targetSize.h - cmH) < 0.5;
    const esMayor = targetSize.w > cmW;

    let comparacion = '';
    if (esIgual) {
      comparacion = 'Mismo tamaño que el archivo';
    } else if (esMayor) {
      comparacion = 'Se ampliará al ' + factorEscala + '% del tamaño original';
    } else {
      comparacion = 'Se reducirá al ' + factorEscala + '% del tamaño original';
    }

    tamCardHTML = '<div class="card"><div class="c-head"><span class="c-label">Tamaño</span></div>'
      + '<div class="size-block"><div class="size-row"><span class="size-key">Tamaño original:</span><span class="size-val">' + cmW + ' × ' + cmH + ' cm</span></div>'
      + '<div class="size-row size-row-target"><span class="size-key">Tamaño requerido:</span><span class="size-val size-val-target">' + targetSize.w + ' × ' + targetSize.h + ' cm</span></div></div>'
      + '<div class="c-sub">' + comparacion + '</div></div>';
  } else {
    tamCardHTML = '<div class="card"><div class="c-head"><span class="c-label">Tamaño</span></div><div class="c-val">' + tamLabel + '</div><div class="c-sub">' + tamRef + '</div></div>';
  }
  html += tamCardHTML;
  // Calcular caja de recomendación de tamaño óptimo (solo cuando la calidad no es buena)
  let calRecomendacion = '';
  if (calStatus !== 'p-ok' && curPxW && curPxH) {
    // Calcular a qué tamaño se alcanza 150 DPI (Buena/Apta) y 200 DPI (Alta)
    const cm150W = parseFloat(((curPxW / 150) * 2.54).toFixed(1));
    const cm150H = parseFloat(((curPxH / 150) * 2.54).toFixed(1));
    const cm200W = parseFloat(((curPxW / 200) * 2.54).toFixed(1));
    const cm200H = parseFloat(((curPxH / 200) * 2.54).toFixed(1));
    // Solo mostrar si los tamaños sugeridos son razonables (no diminutos)
    if (cm150W >= 3) {
      calRecomendacion = '<div class="cal-reco"><div class="cal-reco-l">Tamaño óptimo de impresión</div><div class="cal-reco-t">Reduciendo a <strong>' + cm150W + ' × ' + cm150H + ' cm</strong> alcanza calidad alta. A <strong>' + cm200W + ' × ' + cm200H + ' cm</strong> calidad excelente.</div></div>';
    }
  }
  html += '<div class="card"><div class="c-head"><span class="c-label">Calidad</span><span class="c-pill ' + calStatus + '">' + (calStatus === 'p-ok' ? 'Apto' : calStatus === 'p-wn' ? 'Revisar' : 'Bajo') + '</span></div><div class="c-val">' + calLabel + '</div><div class="c-sub">' + calDetail + '</div>' + calRecomendacion + '</div>';
    // Detectar cruces de corte y medida interna
  const tieneCruces = (d.cruces_de_corte && d.cruces_de_corte.tiene) || false;
  const medidaInterna = (d.cruces_de_corte && d.cruces_de_corte.medida_interna_cm) || null;

  // Lógica mejorada de sangría/corte: 4 casos
  let sangriaPill, sangriaPillClass, sangriaTitle, sangriaSubtext;

  if (sangria && tieneCruces) {
    // Caso ideal: tiene ambos
    sangriaPill = 'Apto'; sangriaPillClass = 'p-ok';
    sangriaTitle = 'Con sangría y corte';
    sangriaSubtext = medidaInterna ? 'Medida final tras corte: <strong>' + medidaInterna + '</strong>' : 'Listo para corte profesional';
  } else if (!sangria && tieneCruces) {
    // Caso aceptable: tiene marca de corte pero falta sangría
    sangriaPill = 'Revisar'; sangriaPillClass = 'p-wn';
    sangriaTitle = 'Con marca de corte';
    sangriaSubtext = (medidaInterna ? 'Medida final tras corte: <strong>' + medidaInterna + '</strong>. ' : '') + 'Sin sangría — recomendado agregar 3mm de fondo extra para evitar bordes blancos si la cuchilla se desplaza.';
  } else if (sangria && !tieneCruces) {
    // Caso bueno: sangría sin marcas
    sangriaPill = 'Apto'; sangriaPillClass = 'p-ok';
    sangriaTitle = 'Con sangría';
    sangriaSubtext = 'Tu diseño no se cortará en el borde';
  } else {
    // Caso problema: ni sangría ni marcas
    sangriaPill = 'Falta'; sangriaPillClass = 'p-er';
    sangriaTitle = 'Sin sangría ni cortes';
    sangriaSubtext = 'Agrega 3mm de fondo extra y marcas de corte para impresión profesional';
  }

  html += '<div class="card"><div class="c-head"><span class="c-label">Sangría / Corte</span><span class="c-pill ' + sangriaPillClass + '">' + sangriaPill + '</span></div><div class="c-val">' + sangriaTitle + '</div><div class="c-sub">' + sangriaSubtext + '</div></div>';
  html += '<div class="card"><div class="c-head"><span class="c-label">Color</span><span class="c-pill ' + (colorOK ? 'p-ok' : 'p-wn') + '">' + (colorOK ? 'Apto' : 'Revisar') + '</span></div><div class="c-val">' + modoColor + '</div><div class="c-sub">' + (colorOK ? 'Configurado para imprenta' : 'Convertir a CMYK para colores fieles') + '</div></div>';
  html += '</div>';

  // Disclaimer en resultados para formatos limitados
  const fLim = ['ai', 'eps', 'svg'];
  if (fLim.includes(curExt)) {
    html += '<div class="format-warn" style="margin-bottom:12px"><div class="fw-ico">!</div><div class="fw-body"><div class="fw-t">Análisis limitado por formato</div><div class="fw-d">Los archivos <strong>' + curExt.toUpperCase() + '</strong> son formatos cerrados de Adobe. Algunos datos pueden ser estimaciones. Para análisis preciso exporta como <strong>PDF</strong>.</div></div></div>';
  }

  if (tamRecomendado && !targetSize) {
    html += '<div class="ai" style="background:#fff8eb;border-color:#fae2b8"><div class="ai-l" style="color:#8a5500"><span class="ai-l-dot" style="background:#8a5500"></span>Recomendación</div><div class="ai-t" style="color:#5a3a0a">' + tamRecomendado + '</div></div>';
  }

  html += '<div class="acts"><button class="bt bt-pr" id="btn-reset">Subir otro archivo</button></div>';
  html += '<div class="adv-tg" id="adv-toggle">Ver detalles técnicos</div>';
  html += '<div class="adv-c" id="adv-content">Archivo: ' + curFile.name + '<br>Formato: ' + curExt.toUpperCase() + '<br>Páginas: ' + curPages + '<br>' + (curPxW ? 'Píxeles: ' + curPxW + ' x ' + curPxH + '<br>' : '') + (dpi ? 'Resolución: ' + dpi + ' DPI<br>' : '') + 'Medidas: ' + tamLabel + '<br>Modo color: ' + modoColor + '<br>Sangría: ' + (sangria ? 'Sí' : 'No') + '<br>Tiempo estimado: ' + ((d.tiempo_estimado && d.tiempo_estimado.total_minutos) || '—') + ' min</div>';

  r.innerHTML = html;
  r.style.display = 'block';

  // Conectar handlers después del innerHTML
  document.getElementById('btn-reset').addEventListener('click', resetAll);
  document.getElementById('adv-toggle').addEventListener('click', () => {
    document.getElementById('adv-content').classList.toggle('show');
  });

  if (curExt === 'pdf' || curExt === 'ai' || curExt === 'eps') renderPDFPages();
}

function showSizeError(file, sizeMB) {
  document.getElementById('dropbox').style.display = 'none';
  const r = document.getElementById('results');
  r.innerHTML = '<div class="err"><div class="err-t">Archivo demasiado grande</div><div class="err-d">El archivo <strong>' + file.name + '</strong> pesa <strong>' + sizeMB + ' MB</strong>. El tamaño máximo permitido es <strong>50 MB</strong>.<br><br>Soluciones:<br>- Comprime el PDF en herramientas como ilovepdf.com o smallpdf.com<br>- Reduce la resolución de imágenes muy grandes<br>- Divide el documento en partes más pequeñas</div></div><div class="acts"><button class="bt bt-pr" id="btn-retry">Subir otro archivo</button></div>';
  r.style.display = 'block';
  document.getElementById('btn-retry').addEventListener('click', resetAll);
}

function showError(msg) {
  document.getElementById('anz').style.display = 'none';
  const r = document.getElementById('results');
  r.innerHTML = '<div class="err"><div class="err-t">No se pudo completar el análisis</div><div class="err-d">' + msg + '</div></div><div class="acts"><button class="bt bt-pr" id="btn-retry">Intentar de nuevo</button></div>';
  r.style.display = 'block';
  document.getElementById('btn-retry').addEventListener('click', resetAll);
}

function resetAll() {
  document.getElementById('dropbox').style.display = 'block';
  document.getElementById('szq').style.display = 'none';
  document.getElementById('anz').style.display = 'none';
  document.getElementById('results').style.display = 'none';
  document.getElementById('results').innerHTML = '';
  document.getElementById('fi').value = '';
  document.querySelectorAll('.preset').forEach(b => b.classList.remove('active'));
  document.getElementById('cw').value = '';
  document.getElementById('ch').value = '';
  const btnAn = document.getElementById('btn-analyze');
  if (btnAn) btnAn.disabled = true;
  curFile = null; curPxW = null; curPxH = null; curDPI = null;
  curMmW = null; curMmH = null; curCmW = null; curCmH = null;
  targetSize = null; curPages = 1;
  if (curURL) { URL.revokeObjectURL(curURL); curURL = null; }
  window._aiPdfBufferCopy = null;
  window._aiHasPDFPreview = false;
  window._pdfDoc = null;
  window._psdPreviewURL = null;
}

function getDims(file) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { res({ w: img.naturalWidth, h: img.naturalHeight }); URL.revokeObjectURL(url); };
    img.onerror = () => { URL.revokeObjectURL(url); rej(); };
    img.src = url;
  });
}

function getDPI(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const b = new Uint8Array(e.target.result);
        if (b[0] === 137 && b[1] === 80 && b[2] === 78) {
          for (let i = 0; i < b.length - 13; i++) {
            if (b[i] === 112 && b[i + 1] === 72 && b[i + 2] === 89 && b[i + 3] === 115) {
              const x = (b[i + 4] << 24) | (b[i + 5] << 16) | (b[i + 6] << 8) | b[i + 7];
              if (b[i + 12] === 1 && x > 0) { resolve(Math.round(x * 0.0254)); return; }
            }
          }
        }
        if (b[0] === 0xFF && b[1] === 0xD8) {
          let o = 2;
          while (o < Math.min(b.length - 4, 65536)) {
            if (b[o] !== 0xFF) break;
            const mk = b[o + 1], ln = (b[o + 2] << 8) | b[o + 3];
            if (mk === 0xE0 && ln >= 16) {
              const du = b[o + 11], xd = (b[o + 12] << 8) | b[o + 13];
              if (du === 1 && xd > 0) { resolve(xd); return; }
              if (du === 2 && xd > 0) { resolve(Math.round(xd * 2.54)); return; }
            }
            o += 2 + ln;
          }
        }
        resolve(null);
      } catch (e) { resolve(null); }
    };
    reader.readAsArrayBuffer(file.slice(0, 131072));
  });
}

async function getPDFDims(file) {
  // Usar PDF.js para leer dimensiones de la primera página de forma confiable
  try {
    const buf = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buf.slice(0) }).promise;
    const page = await pdf.getPage(1);
    const vp = page.getViewport({ scale: 1 });
    // PDF.js da el viewport en puntos PDF (1pt = 1/72 inch = 25.4/72 mm)
    const w = vp.width;
    const h = vp.height;
    const mmW = Math.round(w * (25.4 / 72));
    const mmH = Math.round(h * (25.4 / 72));
    const cmW = parseFloat((mmW / 10).toFixed(1));
    const cmH = parseFloat((mmH / 10).toFixed(1));
    return { mmW, mmH, cmW, cmH, ptW: Math.round(w), ptH: Math.round(h) };
  } catch (e) {
    console.warn('getPDFDims con PDF.js falló:', e);
    return null;
  }
}

function getPSDDims(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const b = new Uint8Array(e.target.result);
        if (b[0] === 0x38 && b[1] === 0x42 && b[2] === 0x50 && b[3] === 0x53) {
          const h = (b[14] << 24) | (b[15] << 16) | (b[16] << 8) | b[17];
          const w = (b[18] << 24) | (b[19] << 16) | (b[20] << 8) | b[21];
          let dpi = 72;
          let o = 26;
          const cml = (b[o] << 24) | (b[o + 1] << 16) | (b[o + 2] << 8) | b[o + 3];
          o += 4 + cml;
          const irl = (b[o] << 24) | (b[o + 1] << 16) | (b[o + 2] << 8) | b[o + 3];
          o += 4;
          const end = o + irl;
          while (o < end - 8) {
            if (b[o] === 0x38 && b[o + 1] === 0x42 && b[o + 2] === 0x49 && b[o + 3] === 0x4D) {
              const rid = (b[o + 4] << 8) | b[o + 5];
              const nl = b[o + 6];
              const np = nl % 2 === 0 ? nl + 2 : nl + 1;
              const dof = o + 6 + np;
              const dl = (b[dof] << 24) | (b[dof + 1] << 16) | (b[dof + 2] << 8) | b[dof + 3];
              if (rid === 0x03ED && dl >= 4) {
                const df = (b[dof + 4] << 8) | b[dof + 5];
                if (df > 0) dpi = df;
              }
              o = dof + 4 + dl + (dl % 2);
            } else break;
          }
          resolve({ w, h, dpi });
        } else resolve(null);
      } catch (e) { resolve(null); }
    };
    reader.readAsArrayBuffer(file.slice(0, 262144));
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Remover splash del DOM después de la animación para liberar recursos
setTimeout(() => {
  const sp = document.getElementById('splash');
  if (sp) sp.remove();
}, 2400);
</script>
</body>
</html>`;
  res.send(html);
});

app.post("/analizar", (req, res, next) => {
  upload.single("archivo")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ ok: false, error: "Archivo demasiado grande. Maximo 50 MB." });
      }
      return res.status(400).json({ ok: false, error: "Error al recibir archivo: " + err.message });
    } else if (err) {
      return res.status(500).json({ ok: false, error: "Error del servidor: " + err.message });
    }
    handleAnalysis(req, res);
  });
});

async function handleAnalysis(req, res) {
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
    const paginas = req.body.paginas ? parseInt(req.body.paginas) : 1;

    const visuales = ["png", "jpg", "jpeg", "gif", "bmp", "webp"];
    const esPDF = ext === "pdf";
    const esVisual = visuales.includes(ext);

    let ctx = "";
    if (cmAncho && cmAlto) ctx = "Medidas: " + cmAncho + "x" + cmAlto + " cm" + (dpiMeta ? ", DPI: " + dpiMeta : "") + ".";

    const sys = 'Experto preflight imprenta digital. JSON sin backticks. ' + ctx + ' Analiza modo color, sangria, transparencias. DETECCION DE SANGRIA — REGLA ESTRICTA: La sangria SOLO existe cuando hay MARCAS DE CORTE visibles (cruces o lineas en las esquinas) Y el fondo del diseño se extiende MAS ALLA de esas marcas. Si NO ves marcas de corte en el archivo, marca sangria.tiene=false SIEMPRE. NO confundas el borde de la pagina del PDF con sangria: que el fondo llegue al borde de la pagina NO es sangria, es solo un diseño sin sangria preparada. Sangria real = marcas de corte visibles + fondo que sobresale 2-5mm mas alla de esas marcas. Sin marcas de corte = sin sangria, sin excepciones. La mayoria de archivos enviados por clientes NO tienen sangria preparada — es lo normal. EVALUACION VISUAL DE NITIDEZ — IMPORTANTE: La imagen que recibes puede tener compresión propia del formato de envio que NO existe en el archivo original. NO confundir artefactos de transmision con problemas reales del archivo. Aplica este criterio BALANCEADO: (1) calidad_visual=ALTA por defecto cuando los textos son legibles, las fotos se ven definidas, los iconos tienen contornos claros y no hay pixelacion EVIDENTE. Es el caso mas comun en archivos profesionales. (2) calidad_visual=MEDIA solo si hay pixelacion CLARAMENTE visible en bordes de texto o imagenes (escalones notorios, no sutiles). (3) calidad_visual=BAJA solo con evidencia INDISCUTIBLE: bordes de texto completamente borrosos al punto de afectar legibilidad, artefactos JPEG MUY visibles (bloques de 8x8 evidentes), o imagenes obviamente estiradas/pixeladas. REGLA DE ORO INVERTIDA: si tienes DUDAS sobre si la calidad es buena o no, marca ALTA. Solo bajar la nota cuando el problema es OBVIO incluso para alguien sin experiencia tecnica. Un PDF profesional bien armado, una imagen con buen DPI, o un diseño que se ve nitido a primera vista debe marcarse ALTA. NO penalices por anti-aliasing normal de renderizado. NO penalices por compresion suave de transmision. CRUCES DE CORTE: si tiene cruces, calcula MEDIDA INTERNA en cm en cruces_de_corte.medida_interna_cm ej "10 x 15 cm". JSON: {"resolucion":{"valor_dpi":' + (dpiMeta || "null") + ',"estado":"ok|advertencia|error","detalle":""},"modo_color":{"valor":"CMYK|RGB|Escala de grises|Desconocido","estado":"ok|advertencia|error","detalle":""},"textos_trazados":{"metodo":"","estado":"ok|advertencia|error|no_determinable","detalle":""},"sangria":{"tiene":false,"valor_mm":null,"estado":"ok|advertencia|error","detalle":""},"cruces_de_corte":{"tiene":false,"medida_interna_cm":null,"estado":"ok|advertencia|error","detalle":""},"tamanio":{"px_ancho":' + (pxAncho || "null") + ',"px_alto":' + (pxAlto || "null") + ',"mm_ancho":' + (mmAncho || "null") + ',"mm_alto":' + (mmAlto || "null") + ',"cm_ancho":' + (cmAncho || "null") + ',"cm_alto":' + (cmAlto || "null") + '},"transparencias":{"tiene":false,"estado":"ok|advertencia|error","detalle":""},"perfil_color_icc":{"tiene":false,"perfil":null,"estado":"ok|advertencia|error","detalle":""},"calidad_visual":"alta|media|baja","calidad_general":"alta|media|baja","problemas_criticos":[],"advertencias":[],"tiempo_estimado":{"total_minutos":0,"desglose":{"correccion_color_min":0,"textos_tipografia_min":0,"sangria_corte_min":0,"resolucion_min":0,"revision_final_min":0},"justificacion":""},"resumen":""}';

    let userContent;
    if (esVisual || esPDF) {
      const mediaType = esPDF ? "application/pdf" : mimetype;
      const tipo = esPDF ? "document" : "image";
      userContent = [
        { type: tipo, source: { type: "base64", media_type: mediaType, data: base64 } },
        { type: "text", text: "Analiza preflight imprenta digital. " + originalname + ". " + ctx + " Solo JSON." }
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
    if (dpiMeta && !(analisis.resolucion && analisis.resolucion.valor_dpi)) {
      if (!analisis.resolucion) analisis.resolucion = {};
      analisis.resolucion.valor_dpi = dpiMeta;
    }
    analisis.tamanio = t;
    analisis.archivo = { nombre: originalname, formato: ext.toUpperCase(), tamano_mb: parseFloat(sizeMB), paginas };

    res.json({ ok: true, analisis });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ ok: false, error: error.message });
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Preflight Pro v6 (Tekkrom) puerto " + PORT));
