import React from 'react';
import './Opiniones.css';
import { motion } from 'framer-motion';

const testimonios = [
  {
    nombre: "Javier",
    usuario: "@javi_ecommerce",
    texto: "La configuración de la tienda y el mantenimiento han sido impecables. Un servicio de 10.",
    img: "/testimonios/1.webp"
  },
  {
    nombre: "Alvaro",
    usuario: "@Alvaro_dev",
    texto: "¡Las integraciones del Píxel y los eventos van como un tiro! Brutal trabajar juntos.",
    img: "/testimonios/2.webp"
  },
  {
    nombre: "Elena",
    usuario: "@elena_mkt",
    texto: "El diseño es alucinante y la web va rapidísima. Justo lo que mi negocio necesitaba.",
    img: "/testimonios/3.webp"
  },
  {
    nombre: "Laura",
    usuario: "@laura_bcn",
    texto: "El rediseño ha quedado espectacular, súper intuitivo y con una estética premium de locos.",
    img: "/testimonios/4.webp"
  },
  {
    nombre: "Sofía",
    usuario: "@sofia_studio",
    texto: "Atención al detalle brutal. Captó la idea de mi marca desde el primer segundo. Recomendadísima.",
    img: "/testimonios/5.webp"
  },
  {
    nombre: "Miguel",
    usuario: "@miguel_tech",
    texto: "El plan de mantenimiento es una tranquilidad enorme. Relación calidad-precio insuperable, siempre al pie del cañón.",
    img: "/testimonios/6.webp"
  },
  {
    nombre: "Pablo",
    usuario: "@pablo_emprende",
    texto: "La sesión de asesoramiento fue un antes y un después. Salí con las ideas súper claras y una estrategia ganadora.",
    img: "/testimonios/7.webp"
  }
];

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
        <h2 className="opiniones-title">Casos de éxito</h2>
        <p className="opiniones-subtitle">Hablemos de resultados</p>
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
          
          {/* 🔥 PRIMER BLOQUE DE TARJETAS 🔥 */}
          {testimonios.map((item, index) => (
            <div className="review-card" key={`first-${index}`}>
              <div className="review-header">
                {/* Aquí está la imagen correcta */}
                <img src={item.img} alt={`Foto de ${item.nombre}`} className="review-avatar" />
                <div className="review-user-info">
                  <span className="review-name">{item.nombre}</span>
                  <span className="review-username">{item.usuario}</span>
                </div>
              </div>
              <p className="review-body">{item.texto}</p>
            </div>
          ))}

          {/* 🔥 SEGUNDO BLOQUE DE TARJETAS (El clon invisible que da la vuelta) 🔥 */}
          {testimonios.map((item, index) => (
            <div className="review-card" key={`second-${index}`} aria-hidden="true">
              <div className="review-header">
                {/* ¡Y aquí también está la imagen correcta ahora! */}
                <img src={item.img} alt={`Foto de ${item.nombre}`} className="review-avatar" />
                <div className="review-user-info">
                  <span className="review-name">{item.nombre}</span>
                  <span className="review-username">{item.usuario}</span>
                </div>
              </div>
              <p className="review-body">{item.texto}</p>
            </div>
          ))}

        </div>
      </motion.div>
    </section>
  );
};

export default Opiniones;