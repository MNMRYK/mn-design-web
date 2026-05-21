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
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
        >
            <FormularioDiseno />
        </motion.div>
          
        {/* 🔥 Mitad derecha (FAQs): Sube un instante después */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <FaqDiseno />
        </motion.div>
  
      </div>
    </motion.section>
  );
};

export default DisenoDoble;