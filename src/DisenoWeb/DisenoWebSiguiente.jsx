import React from 'react';
import { motion } from 'framer-motion';
import './DisenoWebSiguiente.css';

const DisenoWebSiguiente = () => {
  return (
    <section className="servicio-detalle-section">
      <div className="servicio-detalle-container">
        
        {/* --- HEADER SUPERIOR --- */}
        <motion.div 
          className="detalle-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="detalle-hook">¿Buscas una agencia que diseñe tu proyecto?</span>
          <h1 className="detalle-main-title">Diseño y Desarrollo Web</h1>
        </motion.div>

        {/* --- CONTENIDO PRINCIPAL (Grid 2 columnas en PC) --- */}
        <div className="detalle-content-grid">
          
          <motion.div 
            className="detalle-textos"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p>
              Crear una web que funcione no es cuestión de suerte. Para nosotros el éxito de un proyecto digital depende de una estrategia sólida, no de la improvisación.
            </p>
            <p>
              En <strong>MN Design Web</strong>, nos enfocamos en entregar herramientas que generen beneficios. Desarrollamos cada página respetando los estándares internacionales de programación y optimizando la estructura para el <strong>posicionamiento en buscadores</strong>. Gracias al uso de datos estructurados, facilitamos que Google indexe tu contenido con total eficacia.
            </p>
            <p className="texto-destacado">
              Ya estés lanzando una nueva marca o escalando un negocio consolidado, tenemos la solución integral que necesitas.
            </p>
          </motion.div>

          <motion.div 
            className="detalle-imagen-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Aquí pones la ruta de tu imagen de los ordenadores flotando */}
            <img 
              src="/ruta-a-tu-imagen-de-ordenadores.jpg" 
              alt="[Imagen de ordenadores y código web]" 
              className="detalle-imagen" 
            />
            {/* Un pequeño resplandor decorativo detrás de la imagen */}
            <div className="resplandor-imagen"></div>
          </motion.div>

        </div>

        {/* --- TARJETAS INFERIORES --- */}
        <div className="detalle-cards-grid">
          
          <motion.div 
            className="detalle-card-opcion"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="card-opcion-icono">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3>Desarrollo de Proyectos de Nueva Creación</h3>
            <p>
              Olvida las plantillas genéricas. Construimos tu presencia digital desde los cimientos, transformando tu idea en una plataforma web sólida, profesional y preparada para escalar desde el primer día.
            </p>
          </motion.div>

          <motion.div 
            className="detalle-card-opcion"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="card-opcion-icono">
              <i className="fas fa-paint-roller"></i>
            </div>
            <h3>Rediseño y Optimización</h3>
            <p>
              Si ya dispones de un sitio web pero no refleja la calidad de tus servicios o ha quedado obsoleto técnicamente, realizamos una transformación profunda. Analizamos tu estructura actual para mejorar la experiencia de usuario y actualizar la imagen visual.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default DisenoWebSiguiente;