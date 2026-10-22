import React from 'react';
import './Opiniones.css';
import { motion } from 'framer-motion';

// Testimonios REALES de clientes de proyectos en los que María trabajó en OTRAS agencias,
// antes de fundar MN Design Web: no son clientes de MN Design Web y no deben parecerlo
// (etiqueta "Proyecto en agencia anterior", sin estrellas). Textos y usuarios reales.
// No tenemos sus fotos: avatar con la inicial.
const testimonios = [
  {
    nombre: "Javier",
    usuario: "@javi_ecommerce",
    texto: "La configuración de la tienda y el mantenimiento han sido impecables. Un servicio de 10.",
  },
  {
    nombre: "Álvaro",
    usuario: "@Alvaro_dev",
    texto: "¡Las integraciones del Píxel y los eventos van como un tiro! Brutal trabajar juntos.",
  },
  {
    nombre: "Elena",
    usuario: "@elena_mkt",
    texto: "El diseño es alucinante y la web va rapidísima. Justo lo que mi negocio necesitaba.",
  },
  {
    nombre: "Laura",
    usuario: "@laura_bcn",
    texto: "El rediseño ha quedado espectacular, súper intuitivo y con una estética premium de locos.",
  },
  {
    nombre: "Sofía",
    usuario: "@sofia_studio",
    texto: "Atención al detalle brutal. Captó la idea de mi marca desde el primer segundo. Recomendadísima.",
  },
  {
    nombre: "Miguel",
    usuario: "@miguel_tech",
    texto: "El plan de mantenimiento es una tranquilidad enorme. Relación calidad-precio insuperable, siempre al pie del cañón.",
  },
];

// Morados de la web y del logo para los avatares (se reparten en orden; todos con contraste
// suficiente con la inicial en blanco)
const COLORES_AVATAR = ["#7e57c2", "#5b13a3", "#6a1fb8", "#4c0d8c"];

const Tarjeta = ({ item, indice, oculta = false }) => (
  <div className="review-card" aria-hidden={oculta || undefined}>
    <div className="review-header">
      <span
        className="review-avatar review-avatar-inicial"
        style={{ backgroundColor: COLORES_AVATAR[indice % COLORES_AVATAR.length] }}
        aria-hidden="true"
      >
        {item.nombre.charAt(0)}
      </span>
      <div className="review-user-info">
        <span className="review-name">{item.nombre}</span>
        <span className="review-username">{item.usuario}</span>
      </div>
    </div>
    <span className="review-etiqueta">Proyecto en agencia anterior</span>
    <p className="review-body">{item.texto}</p>
  </div>
);

const Opiniones = () => {
  return (
    <section className="opiniones-section tema-oscuro">
      <motion.div
        className="opiniones-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="opiniones-title">Lo que dicen de mi trabajo</h2>
        <p className="opiniones-subtitle">Proyectos en los que trabajé en otras agencias, antes de fundar MN Design Web</p>
      </motion.div>

      {/* 🌟 CARRUSEL INFINITO (MARQUEE) 🌟 */}
      <motion.div
        className="marquee-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="marquee-track">
          {/* Primer bloque de tarjetas */}
          {testimonios.map((item, index) => (
            <Tarjeta item={item} indice={index} key={`first-${index}`} />
          ))}

          {/* Segundo bloque (el clon que da la vuelta), oculto para lectores de pantalla */}
          {testimonios.map((item, index) => (
            <Tarjeta item={item} indice={index} oculta key={`second-${index}`} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Opiniones;
