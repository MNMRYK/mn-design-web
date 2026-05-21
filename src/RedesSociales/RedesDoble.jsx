import React, { useEffect } from "react";
import FormularioRedes from './FormularioRedes';
import FaqRedes from './FaqRedes';
import './RedesDoble.css'; // Aquí meteríamos el CSS del grid que divide la pantalla en 2
import { motion } from 'framer-motion';

const RedesDoble = () => {
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
            <FormularioRedes />
            
            {/* Mitad derecha */}
            <FaqRedes />
            
        </div>
    </motion.section>
  );
};

export default RedesDoble;