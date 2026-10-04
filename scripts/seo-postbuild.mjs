// Se ejecuta después de `vite build` y del prerender:
// genera dist/sitemap.xml a partir de src/seo/rutas.js
// (dist/404.html lo genera scripts/prerender.mjs)
import { writeFileSync } from "node:fs";
import { DOMINIO, RUTAS_REACT, RUTAS_EXTERNAS_INDEXABLES } from "../src/seo/rutas.js";

const DIST = new URL("../dist/", import.meta.url);

const urls = [...new Set([...RUTAS_REACT, ...RUTAS_EXTERNAS_INDEXABLES])];

const malas = urls.filter((ruta) => !ruta.startsWith("/") || !ruta.endsWith("/"));
if (malas.length) {
  throw new Error(`Rutas sin barra inicial/final en src/seo/rutas.js: ${malas.join(", ")}`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((ruta) => `  <url><loc>${DOMINIO}${ruta}</loc></url>`).join("\n")}
</urlset>
`;
writeFileSync(new URL("sitemap.xml", DIST), sitemap);
console.log(`✓ sitemap.xml generado con ${urls.length} URLs`);
