import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
        {/* 2. SUBTÍTULO: Aparece el último, cerrando la composición */}
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Creamos experiencias digitales de alto rendimiento enfocadas en convertir visitantes en clientes.
        </motion.p>

        {/* 3. BOTONES: Aparecen después del título para dar dinamismo */}
        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <a href="/contacto#calendario-reserva" className="btn-empezar">
            Empezar proyecto
          </a>
          
          {/* Enlace directo a tu página de portfolio */}
          <a href="/rescate-kit-digital" className="btn-varios">
            Rescate Kit Digital
          </a>
        </motion.div>

        
      </div>
    </section>
  );
};

export default Hero;