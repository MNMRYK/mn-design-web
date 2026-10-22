// Avisa a Bing (y a Yandex, Seznam, Naver…) de las URLs del sitemap con IndexNow.
// Uso, DESPUÉS de subir el build a SiteGround: npm run indexnow
//   npm run indexnow -- https://mndesignweb.es/contacto/   (solo esas URLs)
// La clave es pública: el archivo public/7cdae621f29f53e295912e22de1ea99e.txt tiene que estar subido en la raíz del dominio.
// El blog (WordPress) ya avisa solo con Rank Math.
import { readFileSync } from "node:fs";

const HOST = "mndesignweb.es";
const KEY = "7cdae621f29f53e295912e22de1ea99e";

let urls = process.argv.slice(2);
if (!urls.length) {
  const sitemap = readFileSync(new URL("../dist/sitemap.xml", import.meta.url), "utf8");
  urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
urls = urls.filter((u) => u.startsWith("https://" + HOST + "/"));
if (!urls.length) {
  console.error("No hay URLs que enviar (¿has hecho npm run build?).");
  process.exit(1);
}

const clave = await fetch("https://" + HOST + "/" + KEY + ".txt").then((r) => (r.ok ? r.text() : ""), () => "");
if (clave.trim() !== KEY) {
  console.error("La clave no está publicada: sube dist/" + KEY + ".txt a la raíz de public_html y vuelve a probar.");
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: "https://" + HOST + "/" + KEY + ".txt", urlList: urls }),
});
console.log(res.status === 200 || res.status === 202
  ? "IndexNow: " + urls.length + " URLs enviadas (" + res.status + ")."
  : "IndexNow respondió " + res.status + ": " + (await res.text()));
