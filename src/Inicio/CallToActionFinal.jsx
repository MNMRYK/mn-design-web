import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CallToActionFinal.css';

// Aquí pones las palabras que quieras que vayan rotando
const palabras = ["VENDEN.", "ENAMORAN.", "IMPACTAN.", "CONVIERTEN."];

const CallToActionFinal = () => {
  const [index, setIndex] = useState(0);

  // Este useEffect cambia la palabra automáticamente cada 2.5 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % palabras.length);
    }, 2800); 
    
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="cta-final-container">
      <motion.div 
        className="cta-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>
          Creamos experiencias digitales <br />
          que{' '}
          {/* El wrapper es vital para que la altura no salte y se rompa el diseño */}
          <span className="texto-cambiante-wrapper">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                className="texto-cambiante"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {palabras[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h2>
        
        <p className="cta-subtitle">¿Lista para llevar tu marca al siguiente nivel?</p>
        
        {/* Reutilizamos las clases de tu botón premium del Hero */}
        <button className="btn-empezar cta-btn">Empezar mi proyecto</button>
      </motion.div>
    </section>
  );
};

export default CallToActionFinal;