const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } });
app.use(cors());
app.use(express.json());

const LOGO_CIRC = "data:image/png;base64,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";

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

.tk-hdr{background:white;border-bottom:1px solid #e3e6f0;padding:12px 20px;display:flex;align-items:center;gap:12px;}
.tk-logo-circ{width:36px;height:36px;border-radius:50%;flex-shrink:0;}
.tk-prod{display:flex;flex-direction:column;}
.tk-prod-name{font-size:14px;font-weight:600;color:#1a1d2e;letter-spacing:-0.01em;}
.tk-prod-sub{font-size:11px;color:#6b7088;margin-top:1px;}
.tk-tag{margin-left:auto;font-size:11px;color:#6b7088;background:#f0f1f7;padding:4px 10px;border-radius:12px;font-weight:500;}

.app{max-width:780px;margin:0 auto;padding:1.5rem 1.25rem;}

.drop{border:2px dashed #c5cad9;border-radius:14px;padding:3.5rem 2rem;text-align:center;cursor:pointer;background:white;transition:all 0.18s;}
.drop:hover,.drop.over{border-color:#1a3eb8;background:#f0f3fc;}
.drop-ico{width:60px;height:60px;background:linear-gradient(135deg,#1a3eb8,#4a1c8c);border-radius:14px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;}
.drop-t{font-size:17px;font-weight:600;color:#1a1d2e;margin-bottom:6px;}
.drop-h{font-size:13px;color:#6b7088;}
.drop-f{font-size:11px;color:#9ba0b5;margin-top:10px;text-transform:uppercase;letter-spacing:0.05em;}
.drop-limit{font-size:11px;color:#1a3eb8;margin-top:6px;font-weight:500;}
#fi{display:none;}

.szq{background:white;border:1px solid #e3e6f0;border-radius:14px;padding:1.5rem;}
.format-warn{display:flex;gap:12px;align-items:flex-start;background:#fff8eb;border:1px solid #fae2b8;border-radius:10px;padding:12px 14px;margin-bottom:1rem;}
.fw-ico{width:24px;height:24px;border-radius:50%;background:#8a5500;color:white;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px;flex-shrink:0;}
.fw-body{flex:1;}
.fw-t{font-size:13px;font-weight:600;color:#5a3a0a;margin-bottom:4px;}
.fw-d{font-size:12px;color:#5a3a0a;line-height:1.5;}
.sqh{display:flex;align-items:center;gap:14px;margin-bottom:1.25rem;padding-bottom:1rem;border-bottom:1px solid #f0f1f7;}
.sqt{width:54px;height:54px;border-radius:10px;background:#f5f6f9;border:1px solid #e3e6f0;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
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
.bt{padding:11px 20px;border-radius:8px;border:1px solid #c5cad9;background:white;font-size:13px;font-weight:600;cursor:pointer;color:#1a1d2e;font-family:inherit;}
.bt:hover{background:#f5f6f9;border-color:#1a3eb8;}
.bt-pr{background:linear-gradient(135deg,#1a3eb8,#4a1c8c);color:white;border-color:#1a3eb8;}
.bt-pr:hover{filter:brightness(1.1);}
.bt-sk{color:#6b7088;background:transparent;border:none;}

.anz{background:white;border:1px solid #e3e6f0;border-radius:14px;padding:3.5rem 1.5rem;text-align:center;}
.big-spinner{position:relative;width:120px;height:120px;margin:0 auto 1.5rem;}
.big-spin-svg{transform:rotate(0deg);animation:big-spin-rotate 2s linear infinite;}
.big-spin-arc{transition:stroke-dashoffset 0.5s ease;}
@keyframes big-spin-rotate{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
.big-spin-pct{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:26px;font-weight:600;color:#1a1d2e;font-variant-numeric:tabular-nums;}
.anz-t{font-size:15px;font-weight:600;color:#1a1d2e;margin-bottom:5px;}
.anz-s{font-size:12px;color:#6b7088;}

.fhead{background:white;border:1px solid #e3e6f0;border-radius:14px;padding:1rem 1.25rem;margin-bottom:12px;display:flex;align-items:center;gap:14px;}
.ft{width:54px;height:54px;border-radius:10px;background:#f5f6f9;border:1px solid #e3e6f0;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
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
</style>
</head>
<body>

<header class="tk-hdr">
  <img src="${LOGO_CIRC}" alt="Tekkrom" class="tk-logo-circ">
  <div class="tk-prod">
    <div class="tk-prod-name">Preflight Pro</div>
    <div class="tk-prod-sub">Tekkrom · Análisis técnico para imprenta</div>
  </div>
  <div class="tk-tag">v6.0</div>
</header>

<div class="app">
  <div id="dropbox">
    <div class="drop" id="drop">
      <div class="drop-ico"><svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M13 4v14M9 10l4-6 4 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 19v2a2 2 0 002 2h14a2 2 0 002-2v-2" stroke="white" stroke-width="2" stroke-linecap="round"/></svg></div>
      <div class="drop-t">Sube tu archivo de imprenta</div>
      <div class="drop-h">Arrastra aquí o haz clic para seleccionar</div>
      <div class="drop-f">PDF - PNG - JPG - TIFF - PSD - AI - EPS - SVG - GIF - BMP - WEBP</div>
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
      <button class="bt bt-pr" id="btn-analyze">Analizar archivo</button>
      <button class="bt bt-sk" id="btn-skip">Omitir y analizar</button>
    </div>
  </div>

  <div class="anz" id="anz" style="display:none">
    <div class="big-spinner">
      <svg class="big-spin-svg" width="120" height="120" viewBox="0 0 120 120">
        <circle class="big-spin-track" cx="60" cy="60" r="52" fill="none" stroke="#e3e6f0" stroke-width="6"/>
        <circle class="big-spin-arc" cx="60" cy="60" r="52" fill="none" stroke="url(#progress-grad)" stroke-width="6" stroke-linecap="round" stroke-dasharray="326.7" stroke-dashoffset="310" transform="rotate(-90 60 60)"/>
        <defs>
          <linearGradient id="progress-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1a3eb8"/>
            <stop offset="100%" stop-color="#4a1c8c"/>
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
  document.getElementById('btn-skip').addEventListener('click', skipSize);

  // Auto-calcular medida proporcional cuando el usuario ingresa una sola
  const cwInput = document.getElementById('cw');
  const chInput = document.getElementById('ch');

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
  });

  chInput.addEventListener('input', () => {
    const ratio = getAspectRatio();
    const h = parseFloat(chInput.value);
    if (ratio && h > 0) {
      // Calcular ancho proporcional
      cwInput.value = (h * ratio).toFixed(1);
      document.querySelectorAll('.preset').forEach(b => b.classList.remove('active'));
    }
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

  let calLabel, calStatus, calDetail;
  if (curExt === 'pdf' && !dpi) {
    calLabel = 'Vectorial'; calStatus = 'p-ok';
    calDetail = 'Calidad perfecta a cualquier tamaño';
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
  } else if (calidadDPI >= 72) {
    calLabel = 'Limitada'; calStatus = 'p-wn';
    calDetail = 'Solo para uso pequeño (' + calidadDPI + ' DPI' + targetInfo + ')';
  } else {
    calLabel = 'Muy baja'; calStatus = 'p-er';
    calDetail = 'No recomendado para imprenta (' + calidadDPI + ' DPI' + targetInfo + ')';
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
      + '<div class="size-block"><div class="size-row"><span class="size-key">Archivo:</span><span class="size-val">' + cmW + ' × ' + cmH + ' cm</span></div>'
      + '<div class="size-row size-row-target"><span class="size-key">A imprimir:</span><span class="size-val size-val-target">' + targetSize.w + ' × ' + targetSize.h + ' cm</span></div></div>'
      + '<div class="c-sub">' + comparacion + '</div></div>';
  } else {
    tamCardHTML = '<div class="card"><div class="c-head"><span class="c-label">Tamaño</span></div><div class="c-val">' + tamLabel + '</div><div class="c-sub">' + tamRef + '</div></div>';
  }
  html += tamCardHTML;
  html += '<div class="card"><div class="c-head"><span class="c-label">Calidad</span><span class="c-pill ' + calStatus + '">' + (calStatus === 'p-ok' ? 'Apto' : calStatus === 'p-wn' ? 'Revisar' : 'Bajo') + '</span></div><div class="c-val">' + calLabel + '</div><div class="c-sub">' + calDetail + '</div></div>';
    // Detectar cruces de corte y medida interna
  const tieneCruces = (d.cruces_de_corte && d.cruces_de_corte.tiene) || false;
  const medidaInterna = (d.cruces_de_corte && d.cruces_de_corte.medida_interna_cm) || null;
  let sangriaSubtext = sangria ? 'Tu diseño no se cortará en el borde' : 'Agrega 3mm de fondo extra para evitar bordes blancos';
  if (medidaInterna) {
    sangriaSubtext = 'Medida final tras corte: <strong>' + medidaInterna + '</strong>' + (sangria ? '' : '. Falta sangría — agrega 3mm de fondo extra.');
  } else if (tieneCruces) {
    sangriaSubtext = 'Con cruces de corte. ' + sangriaSubtext;
  }
  html += '<div class="card"><div class="c-head"><span class="c-label">Sangría / Corte</span><span class="c-pill ' + (sangria ? 'p-ok' : 'p-er') + '">' + (sangria ? 'Apto' : 'Falta') + '</span></div><div class="c-val">' + (sangria ? 'Con margen' : 'Sin margen') + '</div><div class="c-sub">' + sangriaSubtext + '</div></div>';
  html += '<div class="card"><div class="c-head"><span class="c-label">Color</span><span class="c-pill ' + (colorOK ? 'p-ok' : 'p-wn') + '">' + (colorOK ? 'Apto' : 'Revisar') + '</span></div><div class="c-val">' + modoColor + '</div><div class="c-sub">' + (colorOK ? 'Configurado para imprenta' : 'Convertir a CMYK para colores fieles') + '</div></div>';
  html += '</div>';

  // Disclaimer en resultados para formatos limitados
  const fLim = ['ai', 'eps', 'svg'];
  if (fLim.includes(curExt)) {
    html += '<div class="format-warn" style="margin-bottom:12px"><div class="fw-ico">!</div><div class="fw-body"><div class="fw-t">Análisis limitado por formato</div><div class="fw-d">Los archivos <strong>' + curExt.toUpperCase() + '</strong> son formatos cerrados de Adobe. Algunos datos pueden ser estimaciones. Para análisis preciso exporta como <strong>PDF</strong>.</div></div></div>';
  }

  if (d.resumen) {
    html += '<div class="ai"><div class="ai-l"><span class="ai-l-dot"></span>Análisis IA</div><div class="ai-t">' + d.resumen + '</div></div>';
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

  if (curExt === 'pdf') renderPDFPages();
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
  curFile = null; curPxW = null; curPxH = null; curDPI = null;
  curMmW = null; curMmH = null; curCmW = null; curCmH = null;
  targetSize = null; curPages = 1;
  if (curURL) { URL.revokeObjectURL(curURL); curURL = null; }
  window._aiPdfBufferCopy = null;
  window._aiHasPDFPreview = false;
  window._pdfDoc = null;
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

    const sys = 'Experto preflight imprenta digital. JSON sin backticks. ' + ctx + ' Analiza modo color, sangria, transparencias. IMPORTANTE para PDFs: los archivos profesionales mezclan texto vectorial nitido con imagenes de fondo rasterizadas (a veces con efectos artisticos pixelados intencionales). Si los textos y elementos importantes (logos, QR, numeros) estan nitidos, marca calidad como ALTA aunque el fondo decorativo se vea pixelado. Solo marca problema si todo el contenido principal es de baja resolucion. CRUCES DE CORTE: si el archivo tiene cruces de corte (lineas o marcas en las esquinas que indican donde cortar), calcula la MEDIDA INTERNA DEL CORTE en cm — la distancia entre las lineas de corte horizontales y verticales (es decir, el tamano final del producto despues de cortar, sin incluir sangria ni cruces). Reportalo en cruces_de_corte.medida_interna_cm como string ej "10 x 15 cm". JSON: {"resolucion":{"valor_dpi":' + (dpiMeta || "null") + ',"estado":"ok|advertencia|error","detalle":""},"modo_color":{"valor":"CMYK|RGB|Escala de grises|Desconocido","estado":"ok|advertencia|error","detalle":""},"textos_trazados":{"metodo":"","estado":"ok|advertencia|error|no_determinable","detalle":""},"sangria":{"tiene":false,"valor_mm":null,"estado":"ok|advertencia|error","detalle":""},"cruces_de_corte":{"tiene":false,"medida_interna_cm":null,"estado":"ok|advertencia|error","detalle":""},"tamanio":{"px_ancho":' + (pxAncho || "null") + ',"px_alto":' + (pxAlto || "null") + ',"mm_ancho":' + (mmAncho || "null") + ',"mm_alto":' + (mmAlto || "null") + ',"cm_ancho":' + (cmAncho || "null") + ',"cm_alto":' + (cmAlto || "null") + '},"transparencias":{"tiene":false,"estado":"ok|advertencia|error","detalle":""},"perfil_color_icc":{"tiene":false,"perfil":null,"estado":"ok|advertencia|error","detalle":""},"calidad_general":"alta|media|baja","problemas_criticos":[],"advertencias":[],"tiempo_estimado":{"total_minutos":0,"desglose":{"correccion_color_min":0,"textos_tipografia_min":0,"sangria_corte_min":0,"resolucion_min":0,"revision_final_min":0},"justificacion":""},"resumen":""}';

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
