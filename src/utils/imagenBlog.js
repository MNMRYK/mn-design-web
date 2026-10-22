// Imagen destacada de una entrada del blog (API de WordPress con _embed) para las tarjetas de
// "Aprende y crece con nosotros". Antes se usaba la imagen original (hasta 500 KB); ahora se dan
// al navegador los tamaños que genera WordPress (300, 768 y 1024 px) para que elija el justo.
const TAMANOS = ["medium", "medium_large", "large"];
const IMAGEN_POR_DEFECTO = { src: "/og-mndesignweb.jpg", srcSet: undefined, width: 1200, height: 628 };

export function imagenDestacadaBlog(articulo) {
  const media = articulo._embedded?.["wp:featuredmedia"]?.[0];
  if (!media?.source_url) return IMAGEN_POR_DEFECTO;

  const tamanos = media.media_details?.sizes ?? {};
  const candidatas = TAMANOS.map((t) => tamanos[t]).filter((t) => t?.source_url && t.width);
  const mediana = tamanos.medium_large ?? candidatas[candidatas.length - 1];

  return {
    src: mediana?.source_url ?? media.source_url,
    srcSet: candidatas.length ? candidatas.map((t) => `${t.source_url} ${t.width}w`).join(", ") : undefined,
    width: mediana?.width ?? media.media_details?.width,
    height: mediana?.height ?? media.media_details?.height,
  };
}

// Ancho de la tarjeta: una columna en móvil y hasta tres (~420 px) en pantallas grandes
export const SIZES_BLOG = "(max-width: 768px) 92vw, 420px";
