import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './DisenoWebSiguiente.css';

import { useLottie } from 'lottie-react';
import animacionNodo from '../assets/animations/estructura-web.json';

/* =========================================================
   COMPONENTE 1: EFECTO TEXTO DECODIFICADO (Corregido y Suave)
   ========================================================= */
const EfectoDecodificador = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

  const dispararEfecto = () => {
    if (isAnimating) return; // Si ya está animando, no hacemos nada
    setIsAnimating(true);
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        text.split('').map((letter, index) => {
          if (index < iteration) return text[index]; // Letra ya resuelta
          
          // 🔥 EL SECRETO: Si es un espacio, lo dejamos en paz para no romper los márgenes
          if (letter === ' ') return ' '; 
          
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
      
      iteration += 1.5; // 🔥 Aumentamos la velocidad a 1.5 para que vaya rápido y "poco a poco"
    }, 20); // Intervalo más corto (20ms) para que sea súper fluido
  };

  // Lanzamos el efecto de forma automática la primera vez que carga
  useEffect(() => {
    dispararEfecto();
  }, []);

  return (
    <span 
      onMouseEnter={dispararEfecto} // Y se repite si le pasan el ratón por encima
      style={{ display: 'inline-block' }}
    >
      {displayText}
    </span>
  );
};

/* =========================================================
   COMPONENTE 2: ANIMATED BEAM (Plan B Anti-Errores para Lottie)
   ========================================================= */
const RayoAnimado = () => {
  
  // 🔥 CAMBIO 2: Configuramos la animación aquí arriba usando el Hook 🔥
  const opcionesLottie = {
    animationData: animacionNodo,
    loop: true,
    style: { width: '80%', height: '80%' }
  };
  const { View } = useLottie(opcionesLottie);

  return (
    <div className="beam-container">
      {/* 5 Nodos de la izquierda (Tu Stack) */}
      <div className="beam-columna">
        <div className="beam-nodo" title="Figma"><i className="fa-brands fa-figma"></i></div>
        <div className="beam-nodo" title="React"><i className="fa-brands fa-react"></i></div>
        <div className="beam-nodo" title="Tailwind">
          {/* SVG Oficial de Tailwind CSS */}
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '28px', height: '28px' }}>
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-8.4 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C7.937 13.382 6.576 12 3.601 12z" />
          </svg>
        </div>
        <div className="beam-nodo" title="HTML5"><i className="fa-brands fa-html5"></i></div>
        <div className="beam-nodo" title="CSS3"><i className="fa-brands fa-css3-alt"></i></div>
      </div>
      {/* Los rayos SVG en el centro (Coordenadas matemáticas exactas) */}
      <div className="beam-caminos">
        <svg width="100%" height="100%" viewBox="0 0 200 400" preserveAspectRatio="none">
          {/* Caminos base (Grises) */}
          <path d="M0 25 C 100 25, 100 200, 200 200" className="beam-linea-fondo" />
          <path d="M0 112.5 C 100 112.5, 100 200, 200 200" className="beam-linea-fondo" />
          <path d="M0 200 C 100 200, 100 200, 200 200" className="beam-linea-fondo" />
          <path d="M0 287.5 C 100 287.5, 100 200, 200 200" className="beam-linea-fondo" />
          <path d="M0 375 C 100 375, 100 200, 200 200" className="beam-linea-fondo" />
          
          {/* Rayos de luz animados con distintos retrasos */}
          <motion.path 
            d="M0 25 C 100 25, 100 200, 200 200" className="beam-luz"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0 }}
          />
          <motion.path 
            d="M0 112.5 C 100 112.5, 100 200, 200 200" className="beam-luz"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.4 }}
          />
          <motion.path 
            d="M0 200 C 100 200, 100 200, 200 200" className="beam-luz"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.8 }}
          />
          <motion.path 
            d="M0 287.5 C 100 287.5, 100 200, 200 200" className="beam-luz"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.2 }}
          />
          <motion.path 
            d="M0 375 C 100 375, 100 200, 200 200" className="beam-luz"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.6 }}
          />
        </svg>
      </div>

      {/* Nodo final (Tu Lottie Animado a prueba de bombas) */}
      <div className="beam-columna">
        <div className="beam-nodo nodo-final">
          {/* 🔥 CAMBIO 3: Renderizamos la vista del Hook directo 🔥 */}
          {View}
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   TU PÁGINA PRINCIPAL
   ========================================================= */
const DisenoWebSiguiente = () => {
  return (
    <section className="servicio-detalle-section">
      <div className="servicio-detalle-container">

        <div className="diseno-badge">
          <Link to="/" className="breadcrumb-link">INICIO</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">DISEÑO WEB</span>
        </div>
        
        {/* --- HEADER SUPERIOR (Alineado a la Izquierda) --- */}
        <motion.div 
          className="detalle-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="diseno-title">
            <div className="title-phrase-one">
              ¿Buscas una agencia que diseñe<br />
               tu proyecto?
            </div>
            <span className="diseno-text-gradient">Diseño y Desarrollo Web</span>
          </h1>
        </motion.div>

        {/* --- CONTENIDO PRINCIPAL --- */}
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
            
            {/* AQUÍ VA EL NUEVO EFECTO DECODIFICADOR AL PASAR EL RATÓN */}
            <motion.p 
              className="texto-destacado"
              whileHover={{ scale: 1.02 }}
            >
              <EfectoDecodificador text="Ya estés lanzando una nueva marca o escalando un negocio consolidado, tenemos la solución integral que necesitas." />
            </motion.p>
          </motion.div>

          <motion.div 
            className="detalle-imagen-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* AQUÍ CARGAMOS EL COMPONENTE ANIMATED BEAM EN VEZ DE LA FOTO ROTA */}
            <RayoAnimado />
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