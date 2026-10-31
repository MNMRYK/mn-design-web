import React, { useEffect } from "react";
import FormularioRedes from './FormularioRedes';
import AcordeonFaq from '../utils/AcordeonFaq';
import { PREGUNTAS_REDES } from './preguntasRedes';
import './FaqRedes.css';
import './RedesDoble.css'; // Aquí meteríamos el CSS del grid que divide la pantalla en 2
import { motion } from 'framer-motion';

// Formulario + preguntas frecuentes. /branding/ lo reutiliza con sus preguntas y su formulario.
const RedesDoble = ({ preguntas = PREGUNTAS_REDES, formulario = {} }) => {
  return (
    <motion.section 
      className="redes-section-wrapper"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
        <div className="redes-grid">
            
            {/* Mitad izquierda */}
            <FormularioRedes {...formulario} />
            
            {/* Mitad derecha */}
            <AcordeonFaq preguntas={preguntas} prefijo="redes" />
            
        </div>
    </motion.section>
  );
};

export default RedesDoble;