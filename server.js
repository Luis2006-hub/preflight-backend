const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB máximo

app.use(cors());
app.use(express.json());

// Ruta de prueba para verificar que el servidor funciona
app.get("/", (req, res) => {
  res.json({ status: "Preflight Pro backend activo ✓" });
});

// Ruta principal: recibe imagen, llama a Claude, devuelve análisis
app.post("/analizar", upload.single("archivo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se recibió ningún archivo" });
    }

    const { originalname, mimetype, buffer, size } = req.file;
    const ext = originalname.split(".").pop().toLowerCase();
    const sizeMB = (size / 1024 / 1024).toFixed(2);

    // Convertir imagen a base64
    const base64 = buffer.toString("base64");

    // Tipos que Claude puede ver visualmente
    const tiposVisuales = ["png", "jpg", "jpeg", "gif", "bmp", "webp"];
    const esPDF = ext === "pdf";
    const esVisual = tiposVisuales.includes(ext);

    const systemPrompt = `Eres un experto preflight de imprenta con 20 años de experiencia. Analizas archivos para tarjetas, flyers, volantes y libros/revistas. Responde ÚNICAMENTE con un objeto JSON válido, sin backticks ni texto adicional.

REGLA CRÍTICA: tamanio debe reportar las dimensiones REALES del archivo, nunca medidas sugeridas.

DETECCIÓN DE TEXTOS:
- Imágenes rasterizadas: analiza visualmente si los bordes del texto son nítidos o pixelados.
- PDF: detecta si tiene texto seleccionable (no trazado = problema) o solo paths/curvas (correcto).
- Archivos vectoriales: busca objetos de texto sin convertir a curvas.

Responde con este JSON exacto:
{
  "resolucion": { "valor_dpi": null, "estado": "ok|advertencia|error", "detalle": "" },
  "modo_color": { "valor": "CMYK|RGB|Escala de grises|Desconocido", "estado": "ok|advertencia|error", "detalle": "" },
  "textos_trazados": { "metodo": "", "hay_texto": null, "estado": "ok|advertencia|error|no_determinable", "detalle": "" },
  "sangria": { "tiene": false, "valor_mm": null, "estado": "ok|advertencia|error", "detalle": "" },
  "cruces_de_corte": { "tiene": false, "estado": "ok|advertencia|error", "detalle": "" },
  "tamanio": { "px_ancho": null, "px_alto": null, "mm_ancho": null, "mm_alto": null, "cm_ancho": null, "cm_alto": null, "detalle": "" },
  "transparencias": { "tiene": false, "estado": "ok|advertencia|error", "detalle": "" },
  "perfil_color_icc": { "tiene": false, "perfil": null, "estado": "ok|advertencia|error", "detalle": "" },
  "calidad_general": "alta|media|baja",
  "problemas_criticos": [],
  "advertencias": [],
  "tiempo_estimado": {
    "total_minutos": 0,
    "desglose": {
      "correccion_color_min": 0,
      "textos_tipografia_min": 0,
      "sangria_corte_min": 0,
      "resolucion_min": 0,
      "revision_final_min": 0
    },
    "justificacion": ""
  },
  "resumen": ""
}`;

    // Construir mensaje para Claude
    let userContent;
    if (esVisual || esPDF) {
      const mediaType = esPDF ? "application/pdf" : mimetype;
      const tipo = esPDF ? "document" : "image";
      userContent = [
        {
          type: tipo,
          source: { type: "base64", media_type: mediaType, data: base64 },
        },
        {
          type: "text",
          text: `Analiza este archivo para imprenta. Nombre: ${originalname}. Tamaño: ${sizeMB} MB. Formato: ${ext.toUpperCase()}. Responde solo con el JSON.`,
        },
      ];
    } else {
      userContent = `Analiza este archivo para imprenta. Nombre: ${originalname}. Tamaño: ${sizeMB} MB. Formato: ${ext.toUpperCase()}. No tienes acceso visual — usa los metadatos disponibles e indica "no_determinable" cuando corresponda. Responde solo con el JSON.`;
    }

    // Llamada a la API de Anthropic
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: "user", content: userContent }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Claude API error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const rawText = data.content.map((b) => b.text || "").join("").trim();

    // Extraer JSON de la respuesta
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("La API no devolvió JSON válido");

    const analisis = JSON.parse(jsonMatch[0]);

    // Adjuntar metadatos básicos del archivo
    analisis.archivo = {
      nombre: originalname,
      formato: ext.toUpperCase(),
      tamano_mb: parseFloat(sizeMB),
    };

    res.json({ ok: true, analisis });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ ok: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Preflight Pro backend corriendo en puerto ${PORT}`);
});
