import React, { useEffect } from "react";
import { motion } from 'framer-motion';
import './Servicios.css';
import Icono from "../utils/Icono";

const serviciosData = [
  {
    title: "Diseño y Desarrollo Web",
    desc: "Desarrollo de páginas web optimizadas y modernas con WordPress o código a medida.",
    icon: "code",
    link: "/disenoweb/"
  },
  {
    title: "Tiendas Online",
    desc: "Diseñamos tu tienda desde cero para que vendas tus productos de forma segura.",
    icon: "store",
    link: "/e-commerce/"
  },
  {
    title: "Posicionamiento SEO",
    desc: "Mejora la visibilidad de tu negocio apareciendo en los primeros resultados de Google.",
    icon: "search-dollar",
    link: "/posicionamiento-seo/"
  },
  {
    title: "Branding e Identidad de Marca",
    desc: "Identidad visual, dirección de arte y contenido visual para que tu marca se reconozca en todo.",
    icon: "palette",
    link: "/branding/"
  },
  {
    title: "Redes Sociales y Contenido",
    desc: "Dirección visual y creación de contenido para que tus redes vayan a juego con tu marca.",
    icon: "instagram",
    link: "/redes-sociales/"
  }
];

const Servicios = () => {
  return (
    <section className="servicios-section" id="especialidades" >
      <motion.div 
        className="servicios-header"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="servicios-main-title">¿Quieres mejorar tu presencia digital?</h2>
        <p className="servicios-subtitle">Creamos soluciones digitales rentables y a medida. Somos especialistas en <strong>diseño web</strong>, desarrollo de <strong>tiendas e-commerce</strong> y <strong>posicionamiento SEO</strong> para hacer crecer tu visibilidad y tus ventas en internet.</p>
      </motion.div>

      <div className="servicios-grid">
        {serviciosData.map((servicio, index) => (
          <motion.div 
            className="servicio-card"
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <Icono nombre={servicio.icon} className="servicio-icono" />
            <h3>{servicio.title}</h3>
            <p>{servicio.desc}</p>
            
            {/* Añadimos el link aquí abajo */}
            <a href={servicio.link} className="leer-mas-btn">
              Leer más <Icono nombre="chevron-right" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Servicios;