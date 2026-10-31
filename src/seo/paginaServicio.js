// Nodos de schema comunes a las páginas de servicio (/redes-sociales/, /branding/):
// WebSite (el mismo @id que la home), WebPage y BreadcrumbList enlazados entre sí.
// Google no resuelve "@id" entre páginas: cada página lleva sus propios nodos completos.
import { DOMINIO } from "./rutas.js";
import { REF_EMPRESA } from "./negocio.js";

export const ID_WEB = `${DOMINIO}/#web`;

export const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": ID_WEB,
  url: `${DOMINIO}/`,
  name: "MN Design Web",
  inLanguage: "es-ES",
  publisher: REF_EMPRESA,
};

export function schemaBreadcrumb(ruta, nombre) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${DOMINIO}${ruta}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${DOMINIO}/` },
      { "@type": "ListItem", position: 2, name: nombre, item: `${DOMINIO}${ruta}` },
    ],
  };
}

// `extra`: propiedades propias de la página (about, contributor…)
export function schemaWebPage({ ruta, titulo, descripcion, extra = {} }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${DOMINIO}${ruta}#webpage`,
    url: `${DOMINIO}${ruta}`,
    name: titulo,
    description: descripcion,
    inLanguage: "es-ES",
    isPartOf: { "@id": ID_WEB },
    breadcrumb: { "@id": `${DOMINIO}${ruta}#breadcrumb` },
    ...extra,
  };
}

// Catálogo de servicios sin precios
export function catalogo(nombre, servicios) {
  return {
    "@type": "OfferCatalog",
    name: nombre,
    itemListElement: servicios.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  };
}
