// Datos del negocio (NAP) para los datos estructurados de todas las páginas.
// El "@id" es el mismo que usan las landings de Landings-mndesignweb, para que
// Google lo trate como un único negocio en todo el dominio.
import { DOMINIO } from "./rutas.js";

export const ID_EMPRESA = `${DOMINIO}/#empresa`;
export const TELEFONO = "+34 645 85 49 34";
export const EMAIL = "info@mndesignweb.es";

export const DIRECCION = {
  "@type": "PostalAddress",
  streetAddress: "Passeig del Comtat, 75, 5º 1º",
  postalCode: "03820",
  addressLocality: "Cocentaina",
  addressRegion: "Alicante",
  addressCountry: "ES",
};

// La agencia trabaja para toda España; las ciudades son las de la zona del estudio
export const AREA_SERVIDA = [
  { "@type": "Country", name: "España" },
  { "@type": "City", name: "Alcoy" },
  { "@type": "City", name: "Cocentaina" },
  { "@type": "AdministrativeArea", name: "Alicante" },
];

// María Nadal. El nodo Person completo irá en /nosotros/ (pendiente: fase 3 de la auditoría)
export const ID_FUNDADORA = `${DOMINIO}/nosotros/#maria-nadal`;

// Nodo completo de la empresa. Se incluye en cada página (Google no resuelve "@id" entre páginas).
export const EMPRESA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": ID_EMPRESA,
  name: "MN Design Web",
  url: `${DOMINIO}/`,
  logo: `${DOMINIO}/logo.webp`,
  image: `${DOMINIO}/logo-card.webp`,
  description:
    "Agencia de diseño y desarrollo web: diseño web a medida, tiendas online, posicionamiento SEO, redes sociales y software a medida para empresas de toda España. Estudio en Cocentaina (Alicante).",
  founder: { "@id": ID_FUNDADORA },
  telephone: TELEFONO,
  email: EMAIL,
  address: DIRECCION,
  areaServed: AREA_SERVIDA,
  priceRange: "$$",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: TELEFONO,
    email: EMAIL,
    contactType: "customer service",
    availableLanguage: "Spanish",
  },
  sameAs: [
    "https://www.instagram.com/mndesignweb/",
    "https://www.facebook.com/people/MN-Design-Web/61588142654941/",
  ],
};

// Para enlazar un servicio o una página con la empresa sin repetir sus datos
export const REF_EMPRESA = { "@id": ID_EMPRESA };
