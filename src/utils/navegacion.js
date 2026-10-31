// Enlaces del menú (Navbar) y del pie (Footer): una sola fuente para los dos.
// Todas las URLs con barra final. Las landings (/psicologos/, /alcoi/…) y /blog/ viven en
// otros repos: en localhost dan 404, es normal. Las landings Astro tienen su propio menú y
// pie (de conversión) y no usan estas listas.

export const SERVICIOS = [
  { texto: "Diseño web", url: "/disenoweb/" },
  { texto: "Tiendas online", url: "/e-commerce/" },
  { texto: "Posicionamiento SEO", url: "/posicionamiento-seo/" },
  { texto: "Redes sociales", url: "/redes-sociales/" },
  { texto: "Branding e identidad", url: "/branding/" },
  { texto: "Mentorías Shopify", url: "/aprende-shopify/" },
];

export const SECTORES = [
  { texto: "Psicólogos", url: "/psicologos/" },
  { texto: "Nutricionistas", url: "/nutricionistas/" },
  { texto: "Clínicas · Portal Salud", url: "/clinicas/" },
  { texto: "Academias online", url: "/academia-nutricion/" },
];

// Barra del menú (además del desplegable "Servicios" y del botón "Contacto")
export const MENU = [
  { texto: "Demos", url: "/demos/" },
  { texto: "Blog", url: "/blog/" },
  { texto: "Nosotros", url: "/nosotros/" },
];

export const CONTACTO = { texto: "Contacto", url: "/contacto/" };

export const EMPRESA = [
  { texto: "Nosotros", url: "/nosotros/" },
  { texto: "Demos", url: "/demos/" },
  { texto: "Blog", url: "/blog/" },
  { texto: "Contacto", url: "/contacto/" },
];

// /alcoi/ es la única página que trabaja "diseño web Alcoy"
export const ZONAS = [
  { texto: "Diseño web en Alcoy (Alcoi)", url: "/alcoi/" },
  { texto: "Software a mida (Alcoi i Cocentaina)", url: "/software-a-mida-alcoi/", lang: "ca" },
];

export const BODAS = [{ texto: "Invitaciones de boda", url: "/bodas/" }];
