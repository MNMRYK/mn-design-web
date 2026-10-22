// <div> con imagen de fondo que no se descarga hasta que está cerca de verse (las imágenes de
// fondo CSS no admiten loading="lazy"). Se usa en las maquetas que se desplazan al pasar el
// ratón (/disenoweb/, /contacto/, /demos/) y en las tarjetas del portfolio.
import React, { useEffect, useRef, useState } from "react";

const FondoDiferido = ({ url, className, style, margen = "400px", children }) => {
  const ref = useRef(null);
  const [cerca, setCerca] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (!el || cerca) return;
    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setCerca(true);
          observador.disconnect();
        }
      },
      { rootMargin: `${margen} 0px` },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, [cerca, margen]);

  return (
    <div ref={ref} className={className} style={cerca && url ? { ...style, backgroundImage: `url("${url}")` } : style}>
      {children}
    </div>
  );
};

export default FondoDiferido;
