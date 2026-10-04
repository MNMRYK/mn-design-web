// Fuente única de URLs del dominio.
// La usan scripts/generar-sitemap.mjs (sitemap.xml) y, más adelante, el prerender.
// Todas las rutas van SIEMPRE con barra final.

export const DOMINIO = "https://mndesignweb.es";

// Rutas servidas por esta app React (se prerenderizan y van al sitemap).
export const RUTAS_REACT = [
  "/",
  "/nosotros/",
  "/contacto/",
  "/disenoweb/",
  "/e-commerce/",
  "/posicionamiento-seo/",
  "/redes-sociales/",
  "/demos/",
  "/rescate-kit-digital/",
  "/privacidad/",
  "/aviso-legal/",
  "/cookies/",
];

// Páginas de otros proyectos publicadas en el mismo dominio que deben indexarse.
// - Landings-mndesignweb (Astro)
// El blog (WordPress en /blog/) tiene su propio sitemap: /blog/sitemap_index.xml
export const RUTAS_EXTERNAS_INDEXABLES = [
  "/alcoi/",
  "/clinicas/",
  "/nutricionistas/",
  "/psicologos/",
  "/academia-nutricion/",
  "/bodas/",
  "/aprende-shopify/",
];

// Con noindex a propósito: nunca deben aparecer en el sitemap.
//   /enlaces/                    (linktree de redes sociales)
//   /psicologos/checklist-rgpd/
//   /supplyconnect/              (demo de ERP, proyecto DEMOS/portal-gestion-proveedores)
