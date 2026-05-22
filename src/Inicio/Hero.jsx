import React from 'react';
import { motion } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        {/* 1. TÍTULO: Aparece primero con un leve movimiento hacia arriba */}
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Arquitectura Web <br />
          <span className="ampersand">&</span> <br />
          Estrategia Digital
        </motion.h1>

        {/* 2. BOTONES: Aparecen después del título para dar dinamismo */}
        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <HashLink 
            to="/contacto#calendario-reserva" 
            className="btn-empezar" 
            smooth
            scroll={(el) => setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 500)}
          >
            Empezar proyecto
          </HashLink>
          
          {/* Enlace directo a tu página de portfolio */}
          <HashLink to="/portfolio" className="btn-portfolio" smooth>
            Ver Portfolio
          </HashLink>
        </motion.div>

        {/* 3. SUBTÍTULO: Aparece el último, cerrando la composición */}
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Creamos experiencias digitales de alto rendimiento enfocadas en convertir visitantes en clientes.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;