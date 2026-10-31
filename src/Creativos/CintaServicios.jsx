import React from "react";
import "../Inicio/Tecnologias.css";
import "./Creativos.css";

// Cinta de servicios de /branding/: el mismo carrusel infinito que la sección de tecnologías de
// la home (.tech-slider-section), con texto en vez de logos.
// La primera copia de la lista es la que leen Google y los lectores de pantalla; la segunda solo
// existe para que el bucle no tenga cortes (aria-hidden).
// Términos respaldados por los textos de Lara o por Figma.
const TERMINOS = [
  "Identidad de marca",
  "Branding",
  "Dirección de arte",
  "Dirección creativa",
  "Imágenes con IA",
  "Imágenes de producto",
  "Vídeo y campañas",
  "Contenido para redes sociales",
  "Moodboards",
  "Paleta de colores y tipografías",
  "Guía de estilo",
  "Plantillas para redes",
  "Dirección de arte web",
];

const CintaServicios = () => (
  <section className="tech-slider-section tema-oscuro cinta-servicios" aria-label="Servicios creativos">
    <div className="tech-slider-container">
      <div className="cinta-servicios-pista">
        <ul className="cinta-servicios-lista">
          {TERMINOS.map((termino) => (
            <li key={termino}>{termino}</li>
          ))}
        </ul>
        <ul className="cinta-servicios-lista" aria-hidden="true">
          {TERMINOS.map((termino) => (
            <li key={termino}>{termino}</li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default CintaServicios;
