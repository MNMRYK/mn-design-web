import React from "react";

// Hueco de imagen pendiente de los diseños de Figma.
// - En desarrollo (npm run dev): recuadro discontinuo con lo que va ahí (descripción, formato y
//   medidas recomendadas), para no perder ningún hueco de vista.
// - En el build de producción: no se pinta nada. Los contenedores que lo llevan cambian su
//   distribución con :has(.hueco-imagen), así que no quedan espacios vacíos.
// Cuando llegue la imagen, se sustituye el <HuecoImagen> por un <img> con width/height,
// loading="lazy" (si no se ve al entrar) y srcset.
const HuecoImagen = ({ descripcion, formato = "WebP", medidas, proporcion, className = "" }) => {
  if (!import.meta.env.DEV) return null;

  return (
    <div
      className={`hueco-imagen ${className}`.trim()}
      style={proporcion ? { aspectRatio: proporcion } : undefined}
      aria-hidden="true"
    >
      <span className="hueco-imagen-etiqueta">Imagen pendiente</span>
      <span className="hueco-imagen-descripcion">{descripcion}</span>
      <span className="hueco-imagen-medidas">
        {formato} · {medidas}
      </span>
    </div>
  );
};

export default HuecoImagen;
