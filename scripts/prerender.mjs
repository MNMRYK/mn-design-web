// Prerenderizado post-build con Puppeteer.
//
// Para cada ruta de src/seo/rutas.js (RUTAS_REACT) abre la app compilada en Chrome
// headless, espera a que se pinte y guarda un HTML estático en dist/<ruta>/index.html
// con el contenido real de la página y las etiquetas de <Helmet>. Genera también
// dist/404.html. En el navegador, main.jsx monta React con createRoot (no hydrateRoot)
// y sustituye este HTML por la app.
//
// Durante el prerender:
//  - window.__PRERENDER__ = true → la app no pinta el chat de Typebot ni el banner de cookies
//  - se bloquean las peticiones a trackers (GA, Meta, Clarity) y a Typebot
//  - del DOM final solo se copian #root y las etiquetas de Helmet, sobre el index.html
//    original: así no se duplica ningún script que se haya inyectado en tiempo de ejecución
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import { DOMINIO, RUTAS_REACT } from "../src/seo/rutas.js";

const DIST = fileURLToPath(new URL("../dist/", import.meta.url));
const RUTA_404 = "/__pagina-no-encontrada__/";
const TEXTO_CARGA = "Cargando experiencia";
const TEXTO_404 = "se ha ido de vacaciones"; // texto de src/NotFound.jsx
const MIN_PALABRAS = 80;

const DOMINIOS_BLOQUEADOS = [
  "googletagmanager.com",
  "google-analytics.com",
  "doubleclick.net",
  "connect.facebook.net",
  "facebook.com/tr",
  "clarity.ms",
  "typebot.io",
  "typebotstorage.com",
];
// No hacen falta para generar el HTML y solo ralentizan
const TIPOS_BLOQUEADOS = new Set(["image", "media", "font"]);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

// ---------------------------------------------------------------------------
// Servidor estático mínimo sobre dist/ con fallback SPA al index.html original
// ---------------------------------------------------------------------------
function servir(plantilla) {
  const servidor = createServer(async (req, res) => {
    const ruta = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    const archivo = path.join(DIST, ruta);
    if (archivo.startsWith(DIST) && path.extname(ruta)) {
      try {
        const contenido = await readFile(archivo);
        res.writeHead(200, { "Content-Type": MIME[path.extname(ruta)] ?? "application/octet-stream" });
        return res.end(contenido);
      } catch {
        res.writeHead(404);
        return res.end();
      }
    }
    // Cualquier ruta sin extensión → la app (siempre la plantilla original, nunca un HTML ya prerenderizado)
    res.writeHead(200, { "Content-Type": MIME[".html"] });
    res.end(plantilla);
  });
  return new Promise((resolve) => {
    servidor.listen(0, "127.0.0.1", () => resolve(servidor));
  });
}

// ---------------------------------------------------------------------------
// Renderizar una ruta y devolver lo que hay que copiar al HTML estático
// ---------------------------------------------------------------------------
async function renderizar(navegador, base, ruta) {
  const pagina = await navegador.newPage();
  const errores = [];
  const consola = [];
  const fallidas = [];
  pagina.on("pageerror", (e) => errores.push(e.message));
  pagina.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") consola.push(`${m.type()}: ${m.text()}`);
  });
  pagina.on("requestfailed", (p) => {
    const motivo = p.failure()?.errorText ?? "";
    if (motivo !== "net::ERR_FAILED") fallidas.push(`${motivo} ${p.url()}`); // ERR_FAILED = bloqueadas por nosotros
  });

  await pagina.setViewport({ width: 1366, height: 900 });
  await pagina.evaluateOnNewDocument(() => {
    window.__PRERENDER__ = true;
  });
  await pagina.setRequestInterception(true);
  pagina.on("request", (peticion) => {
    const url = peticion.url();
    if (
      TIPOS_BLOQUEADOS.has(peticion.resourceType()) ||
      DOMINIOS_BLOQUEADOS.some((d) => url.includes(d))
    ) {
      return peticion.abort();
    }
    peticion.continue();
  });

  await pagina.goto(base + ruta, { waitUntil: "networkidle0", timeout: 90_000 });
  try {
    await pagina.waitForFunction(
      (textoCarga) => {
        const root = document.getElementById("root");
        return root && root.children.length > 0 && !root.innerText.includes(textoCarga);
      },
      { timeout: 30_000 },
      TEXTO_CARGA
    );
  } catch (e) {
    const root = await pagina.evaluate(() => document.getElementById("root")?.innerHTML.slice(0, 500));
    throw new Error(
      [
        `La ruta ${ruta} no se ha pintado (${e.message})`,
        `#root: ${root || "(vacío)"}`,
        `Errores JS: ${errores.join(" | ") || "-"}`,
        `Consola: ${consola.slice(0, 10).join(" | ") || "-"}`,
        `Peticiones fallidas: ${fallidas.slice(0, 10).join(" | ") || "-"}`,
      ].join("\n  ")
    );
  }
  // Margen para Helmet y para animaciones de entrada que se disparan al montar
  await new Promise((r) => setTimeout(r, 1000));

  const datos = await pagina.evaluate(() => {
    const root = document.getElementById("root").cloneNode(true);

    // GSAP ScrollTrigger con pin: true envuelve el elemento en un .pin-spacer con estilos
    // en línea (position: fixed, alturas...). No deben quedar en el HTML estático.
    root.querySelectorAll(".pin-spacer").forEach((envoltorio) => {
      const fijado = envoltorio.firstElementChild;
      if (fijado) {
        fijado.removeAttribute("style");
        envoltorio.replaceWith(fijado);
      } else {
        envoltorio.remove();
      }
    });
    // Fuera cualquier script... salvo los datos estructurados (JSON-LD), que deben quedarse
    root.querySelectorAll('script:not([type="application/ld+json"])').forEach((s) => s.remove());

    return {
      html: root.innerHTML,
      texto: root.innerText,
      titulo: document.title,
      h1: document.querySelector("h1")?.innerText.trim() ?? "",
      numH1: document.querySelectorAll("h1").length,
      descripcion: document.querySelector('meta[name="description"]')?.content ?? "",
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
      ogUrl: document.querySelector('meta[property="og:url"]')?.content ?? "",
      robots: document.querySelector('meta[name="robots"]')?.content ?? "",
      // Etiquetas SEO de <Seo>/<Helmet>. react-helmet-async v3 con React 19 ya no las marca
      // con data-rh, así que se seleccionan por tipo (el index.html no trae ninguna de ellas)
      helmet: [
        ...document.head.querySelectorAll(
          'meta[name="description"], meta[name="robots"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"]'
        ),
      ].map((e) => e.outerHTML),
      // CSS y modulepreload que Vite añade al cargar el chunk de la página
      // (los que ya estaban en index.html se descartan en componer())
      recursos: [...document.head.querySelectorAll('link[href^="/assets/"]')].map((l) => l.outerHTML),
    };
  });

  await pagina.close();
  return { ...datos, errores };
}

// ---------------------------------------------------------------------------
// Componer el HTML final sobre el index.html original
// ---------------------------------------------------------------------------
const escaparHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function componer(plantilla, datos, { noindex = false } = {}) {
  const enlacesPlantilla = new Set(plantilla.match(/<link[^>]+href="\/assets\/[^"]+"[^>]*>/g) ?? []);
  const hrefsPlantilla = new Set([...enlacesPlantilla].map((l) => l.match(/href="([^"]+)"/)[1]));
  const recursos = datos.recursos.filter((l) => !hrefsPlantilla.has(l.match(/href="([^"]+)"/)[1]));

  // data-prerender: main.jsx las borra al arrancar, porque React vuelve a añadir las suyas
  const marcar = (etiqueta) => etiqueta.replace(/\s*\/?>$/, ' data-prerender="">');

  const extraHead = [
    ...recursos,
    ...datos.helmet.map(marcar),
    // Red de seguridad por si <NotFound /> deja de declarar su propio noindex
    ...(noindex && !datos.robots.includes("noindex") ? [marcar('<meta name="robots" content="noindex">')] : []),
  ].join("\n    ");

  // Funciones como reemplazo: el HTML puede contener "$&", "$1"...
  return plantilla
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escaparHtml(datos.titulo)}</title>`)
    .replace("</head>", () => `    ${extraHead}\n  </head>`)
    .replace('<div id="root"></div>', () => `<div id="root">${datos.html}</div>`);
}

async function guardar(rutaArchivo, html) {
  await mkdir(path.dirname(rutaArchivo), { recursive: true });
  await writeFile(rutaArchivo, html);
  // vite-plugin-compression generó un .gz del index.html vacío: lo regeneramos
  await writeFile(rutaArchivo + ".gz", gzipSync(html, { level: 9 }));
}

const contarPalabras = (texto) => texto.split(/\s+/).filter(Boolean).length;

// Páginas sin datos estructurados a propósito
const SIN_DATOS_ESTRUCTURADOS = new Set(["/privacidad/", "/aviso-legal/", "/cookies/", "404"]);

// Datos estructurados del HTML final: JSON válido, sin marcado de valoraciones
// y con el nodo completo de la empresa (src/seo/negocio.js)
function validarDatosEstructurados(ruta, html) {
  const problemas = [];
  const bloques = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const nodos = [];
  for (const [, json] of bloques) {
    try {
      const datos = JSON.parse(json);
      nodos.push(...(Array.isArray(datos) ? datos : datos["@graph"] ?? [datos]));
    } catch (e) {
      problemas.push(`${ruta}: JSON-LD no válido (${e.message})`);
    }
  }
  const texto = bloques.map((b) => b[1]).join("");
  if (/"(aggregateRating|review)"|"@type":"(AggregateRating|Review|Rating)"/.test(texto)) {
    problemas.push(`${ruta}: contiene marcado de valoraciones (aggregateRating/review)`);
  }
  // Sin valoraciones, un Product necesita "offers" o Search Console lo marca como no válido
  for (const n of nodos) {
    if (n["@type"] === "Product" && !n.offers) {
      problemas.push(`${ruta}: Product "${n.name}" sin offers (si es un servicio, usa "@type": "Service")`);
    }
  }
  if (!SIN_DATOS_ESTRUCTURADOS.has(ruta)) {
    const empresa = nodos.find((n) => n["@id"] === `${DOMINIO}/#empresa`);
    if (!empresa) problemas.push(`${ruta}: falta el nodo de empresa (${DOMINIO}/#empresa)`);
    else if (!empresa.address?.streetAddress || !empresa.telephone || !empresa.areaServed) {
      problemas.push(`${ruta}: el nodo de empresa no tiene dirección, teléfono o areaServed`);
    }
  }
  return problemas;
}

// Reglas de SEO on-page que debe cumplir cada página (si no, el build falla)
function validarSeo(resultados) {
  const problemas = [];
  for (const { ruta, datos } of resultados) {
    if (datos.numH1 !== 1) problemas.push(`${ruta}: tiene ${datos.numH1} <h1> (debe tener 1)`);
    if (!datos.titulo || datos.titulo === "MN Design Web") problemas.push(`${ruta}: sin <title> propio`);
    if (!datos.descripcion) problemas.push(`${ruta}: sin meta description`);
  }

  for (const { ruta, datos } of resultados.filter((r) => r.ruta !== "404")) {
    const esperado = DOMINIO + ruta;
    if (datos.canonical !== esperado) problemas.push(`${ruta}: canonical "${datos.canonical}" (esperado "${esperado}")`);
    if (datos.ogUrl !== esperado) problemas.push(`${ruta}: og:url "${datos.ogUrl}" (esperado "${esperado}")`);
    if (datos.robots.includes("noindex")) problemas.push(`${ruta}: tiene noindex`);
  }

  for (const campo of ["titulo", "descripcion"]) {
    const vistos = new Map();
    for (const { ruta, datos } of resultados) {
      if (vistos.has(datos[campo])) problemas.push(`${campo} repetido en ${vistos.get(datos[campo])} y ${ruta}`);
      else vistos.set(datos[campo], ruta);
    }
  }

  const r404 = resultados.find((r) => r.ruta === "404");
  if (!r404?.datos.robots.includes("noindex")) problemas.push("404: sin noindex");
  return problemas;
}

// ---------------------------------------------------------------------------
async function main() {
  const plantilla = await readFile(path.join(DIST, "index.html"), "utf8");
  if (!plantilla.includes('<div id="root"></div>')) {
    throw new Error('dist/index.html no contiene <div id="root"></div>: ¿se ha prerenderizado ya?');
  }

  const servidor = await servir(plantilla);
  const base = `http://127.0.0.1:${servidor.address().port}`;
  const navegador = await puppeteer.launch({ headless: true });

  const resultados = [];
  const problemas = [];
  try {
    for (const ruta of RUTAS_REACT) {
      const datos = await renderizar(navegador, base, ruta);
      const palabras = contarPalabras(datos.texto);
      if (palabras < MIN_PALABRAS) problemas.push(`${ruta}: solo ${palabras} palabras`);
      if (datos.texto.includes(TEXTO_404)) problemas.push(`${ruta}: se ha pintado la página 404`);
      if (datos.errores.length) problemas.push(`${ruta}: errores JS → ${datos.errores.join(" | ")}`);
      resultados.push({ ruta, datos, palabras });
    }

    const datos404 = await renderizar(navegador, base, RUTA_404);
    if (!datos404.texto.includes(TEXTO_404)) problemas.push("404: no se ha pintado <NotFound />");
    resultados.push({ ruta: "404", datos: datos404, palabras: contarPalabras(datos404.texto) });
  } finally {
    await navegador.close();
    servidor.close();
  }

  problemas.push(...validarSeo(resultados));

  if (problemas.length) {
    console.error("\n✗ Prerender con problemas:\n  - " + problemas.join("\n  - "));
    process.exit(1);
  }

  // Se compone todo y se valida el HTML FINAL antes de escribir nada
  // (el servidor debe seguir usando la plantilla original mientras se renderiza)
  const salidas = resultados.map(({ ruta, datos }) => {
    const es404 = ruta === "404";
    return {
      ruta,
      destino: es404 ? path.join(DIST, "404.html") : path.join(DIST, ruta, "index.html"),
      html: componer(plantilla, datos, { noindex: es404 }),
    };
  });

  const contar = (html, patron) => (html.match(patron) ?? []).length;
  for (const { ruta, html } of salidas) {
    const esperadas = {
      "<title>": [/<title>/g, 1],
      "meta description": [/<meta name="description"/g, 1],
      "<h1>": [/<h1[\s>]/g, 1],
      "canonical": [/<link rel="canonical"/g, ruta === "404" ? 0 : 1],
      "og:url": [/<meta property="og:url"/g, ruta === "404" ? 0 : 1],
      "meta robots": [/<meta name="robots"/g, ruta === "404" ? 1 : 0],
    };
    for (const [nombre, [patron, n]] of Object.entries(esperadas)) {
      const real = contar(html, patron);
      if (real !== n) problemas.push(`${ruta} (HTML final): ${real} × ${nombre}, se esperaba ${n}`);
    }
    problemas.push(...validarDatosEstructurados(ruta, html));
  }
  if (problemas.length) {
    console.error("\n✗ HTML prerenderizado incorrecto:\n  - " + problemas.join("\n  - "));
    process.exit(1);
  }

  for (const { destino, html } of salidas) await guardar(destino, html);

  console.log("\n✓ Prerender completado:\n");
  console.table(
    resultados.map(({ ruta, datos, palabras }) => ({
      ruta,
      palabras,
      titulo: datos.titulo.slice(0, 60),
      h1: datos.h1.replace(/\s+/g, " ").slice(0, 45),
      desc: datos.descripcion.length,
      canonical: datos.canonical.replace(DOMINIO, ""),
    }))
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
