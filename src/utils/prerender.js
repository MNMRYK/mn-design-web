// true solo mientras scripts/prerender.mjs genera el HTML estático con Puppeteer.
// Sirve para no pintar elementos que no deben quedar en el HTML prerenderizado
// (chat de Typebot, banner de cookies).
export const esPrerender =
  typeof window !== "undefined" && window.__PRERENDER__ === true;
