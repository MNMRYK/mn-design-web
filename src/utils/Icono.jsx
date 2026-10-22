// Iconos de la web. Sustituyen a Font Awesome, que se cargaba entero desde cdnjs (una hoja CSS
// que bloqueaba el render y una fuente de ~75 KB). Son los mismos dibujos, en SVG en línea
// (src/utils/iconosTrazados.js), así que la web se ve igual. Los nombres son los de Font Awesome
// sin "fa-": <Icono nombre="check" />.
//
// Se pinta un <i> con el SVG dentro, como el <i> de antes: siguen valiendo todos los estilos que
// ya había (".plan-features li i", "i.rotado"…). El SVG mide 1em de alto, con el ancho propio de
// cada icono, y usa currentColor: tamaño y color salen de font-size y color, como con la fuente.
import React from "react";
import { TRAZADOS } from "./iconosTrazados";

const Icono = ({ nombre, className = "", style }) => {
  const icono = TRAZADOS[nombre];
  if (!icono) {
    if (import.meta.env.DEV) console.warn(`<Icono>: no existe el icono "${nombre}" (añádelo a iconosTrazados.js)`);
    return null;
  }
  const [ancho, alto, trazado] = icono;

  return (
    <i className={`icono ${className}`.trim()} style={style} aria-hidden="true">
      <svg
        viewBox={`0 0 ${ancho} ${alto}`}
        style={{ width: `${ancho / alto}em` }}
        fill="currentColor"
        focusable="false"
      >
        <path d={trazado} />
      </svg>
    </i>
  );
};

export default Icono;
