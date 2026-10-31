import React from "react";
import { motion } from "framer-motion";
import HuecoImagen from "./HuecoImagen.jsx";
import "./Creativos.css";

// Bloque al final de /disenoweb/ y /e-commerce/ (antes del formulario) que lleva a /branding/.
// Textos: diseño de Figma "5 · Bloque para /disenoweb/ y /e-commerce/".
const BloqueServiciosCreativos = () => (
  <section className="bloque-creativos-seccion" aria-labelledby="bloque-creativos-titulo">
    <motion.div
      className="creativos-tarjeta-oscura bloque-creativos tema-oscuro"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="bloque-creativos-texto-col">
        <p className="creativos-etiqueta creativos-etiqueta--clara">Servicios creativos</p>
        <h2 id="bloque-creativos-titulo" className="bloque-creativos-titulo">
          ¿Tu página web también necesita <span>una identidad visual</span>?
        </h2>
        <p className="bloque-creativos-texto">
          Además del desarrollo técnico, podemos ayudarte con la dirección de arte, la identidad
          visual y la creación de imágenes y vídeos para tu negocio. Trabajamos con profesionales
          creativos especializados, desde el concepto visual hasta los materiales que dan vida a tu
          web o tienda online.
        </p>
        <a href="/branding/" className="creativos-btn-primario">
          Conoce nuestros servicios creativos
        </a>
      </div>
      <HuecoImagen
        className="bloque-creativos-imagen"
        proporcion="300 / 280"
        descripcion="Un trabajo de identidad visual aplicado a una web (marca + web juntas)"
        medidas="600 × 560 px (se muestra a 300 × 280)"
      />
    </motion.div>
  </section>
);

export default BloqueServiciosCreativos;
