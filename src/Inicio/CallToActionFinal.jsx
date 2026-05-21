import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './CallToActionFinal.css';


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
        
        <Link 
          to="/contacto#reserva-section" 
          className="btn-empezar cta-btn"
          style={{ display: 'inline-flex', justifyContent: 'center', textDecoration: 'none' }}
        >
          Empezar mi proyecto
        </Link>
      </motion.div>
    </section>
  );
};

export default CallToActionFinal;