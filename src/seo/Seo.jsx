import { Helmet } from "react-helmet-async";
import { DOMINIO } from "./rutas.js";

const IMAGEN_POR_DEFECTO = `${DOMINIO}/logo-card.webp`;

// Metaetiquetas de cada página: título, descripción, canonical, Open Graph y Twitter.
// `ruta` siempre con barra final (igual que en src/seo/rutas.js y el sitemap).
// Sin `ruta` (p. ej. la 404) no se genera canonical ni og:url.
export default function Seo({
  titulo,
  descripcion,
  ruta,
  imagen = IMAGEN_POR_DEFECTO,
  tituloSocial = titulo,
  descripcionSocial = descripcion,
  noindex = false,
}) {
  if (import.meta.env.DEV && ruta && !ruta.endsWith("/")) {
    console.warn(`<Seo>: la ruta "${ruta}" debe terminar en barra`);
  }
  const url = ruta ? DOMINIO + ruta : null;

  return (
    <Helmet>
      <title>{titulo}</title>
      <meta name="description" content={descripcion} />
      {url && <link rel="canonical" href={url} />}
      {noindex && <meta name="robots" content="noindex" />}

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content="MN Design Web" />
      <meta property="og:title" content={tituloSocial} />
      <meta property="og:description" content={descripcionSocial} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={imagen} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={tituloSocial} />
      <meta name="twitter:description" content={descripcionSocial} />
      <meta name="twitter:image" content={imagen} />
    </Helmet>
  );
}
