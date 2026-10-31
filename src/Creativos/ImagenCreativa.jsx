import React, { useEffect, useRef, useState } from "react";
import { esPrerender } from "../utils/prerender";

// Imágenes de los huecos de /branding/ y /redes-sociales/.
// Ocupan su hueco con object-fit: cover; `posicion` (object-position) decide qué parte se ve
// para no perder lo importante. Las del hero van con fetchpriority="high" y sin lazy.
const ImagenCreativa = ({ src, alt, width, height, proporcion, posicion = "50% 50%", prioridad = false, className = "" }) => (
  <img
    className={`creativos-img ${className}`.trim()}
    src={src}
    alt={alt}
    width={width}
    height={height}
    loading={prioridad ? "eager" : "lazy"}
    fetchPriority={prioridad ? "high" : undefined}
    decoding="async"
    style={{ aspectRatio: proporcion, objectPosition: posicion }}
  />
);

// Reel del hero de /redes-sociales/: vídeo en bucle, sin sonido ni controles.
// - El vídeo no se descarga hasta que el hueco está a punto de verse (en el prerender solo
//   queda el póster).
// - Con "reducir movimiento", solo el póster (imagen).
export const ReelCreativo = ({ src, poster, alt, width, height, proporcion }) => {
  const videoRef = useRef(null);
  const [reducido, setReducido] = useState(false);
  const [cargar, setCargar] = useState(false);

  useEffect(() => {
    // En el HTML prerenderizado solo queda el póster: el vídeo lo pone el navegador al verse
    if (esPrerender) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducido(true);
      return undefined;
    }
    const el = videoRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setCargar(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Con la fuente ya puesta, se carga y se reproduce (silenciado, para que el autoplay funcione)
  useEffect(() => {
    const v = videoRef.current;
    if (!cargar || !v) return;
    v.muted = true;
    v.load();
    v.play?.().catch(() => {});
  }, [cargar]);

  if (reducido) {
    return <ImagenCreativa src={poster} alt={alt} width={width} height={height} proporcion={proporcion} prioridad />;
  }

  return (
    <video
      ref={videoRef}
      className="creativos-img"
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      aria-label={alt}
      style={{ aspectRatio: proporcion }}
    >
      {cargar && <source src={src} type="video/mp4" />}
    </video>
  );
};

export default ImagenCreativa;
