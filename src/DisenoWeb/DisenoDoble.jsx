import React, { useEffect } from "react";
import FormularioDiseno from './FormularioDiseno';
import FaqDiseno from './FaqDiseno';
import './DisenoDoble.css'; // Aquí meteríamos el CSS del grid que divide la pantalla en 2
import { motion } from 'framer-motion';

const DisenoDoble = () => {
  return (
    <motion.section 
      className="diseno-section-wrapper"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
        <div className="diseno-grid">
            
            {/* Mitad izquierda */}
            <FormularioDiseno />
            
            {/* Mitad derecha */}
            <FaqDiseno />
            
        </div>
    </motion.section>
  );
};

export default DisenoDoble;