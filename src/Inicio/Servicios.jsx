import React, { useEffect } from "react";
import { motion } from 'framer-motion';
import './Servicios.css';

const serviciosData = [
  {
    title: "Diseño y Desarrollo Web",
    desc: "Desarrollo de páginas web optimizadas y modernas con WordPress o código a medida.",
    icon: "fas fa-code",
    link: "diseno-web.html"
  },
  {
    title: "Tienda E-commerce",
    desc: "Diseñamos tu tienda desde cero para que vendas tus productos de forma segura.",
    icon: "fas fa-store",
    link: "e-commerce.html"
  },
  {
    title: "Posicionamiento SEO",
    desc: "Mejora la visibilidad de tu negocio apareciendo en los primeros resultados de Google.",
    icon: "fas fa-search-dollar",
    link: "posicionamiento-seo.html"
  },
  {
    title: "Mantenimiento y Optimización",
    desc: "Nos ocupamos de el mantenimiento y optimización de tu sitio web para garantizar su buen funcionamiento.",
    icon: "fas fa-cogs",
    link: "diseno-web.html"
  },
  {
    title: "Gestión de Redes Sociales",
    desc: "Creamos contenido estratégico para que tu marca destaque en redes sociales.",
    icon: "fa-brands fa-instagram",
    link: "posicionamiento-seo.html"
  }
];

const Servicios = () => {
  return (
    <section className="servicios-section" id="especialidades">
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
            <i className={`${servicio.icon} servicio-icono`}></i>
            <h3>{servicio.title}</h3>
            <p>{servicio.desc}</p>
            
            {/* Añadimos el link aquí abajo */}
            <a href={servicio.link} className="leer-mas-btn">
              Leer más <i className="fas fa-chevron-right"></i>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Servicios;