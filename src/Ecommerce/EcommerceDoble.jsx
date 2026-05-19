import React, { useEffect } from "react";
import FormularioEcommerce from './FormularioEcommerce';
import FaqEcommerce from './FaqEcommerce';
import './EcommerceDoble.css'; // Aquí meteríamos el CSS del grid que divide la pantalla en 2
import { motion } from 'framer-motion';

const EcommerceDoble = () => {
  return (
    <motion.section 
      className="ecommerce-section-wrapper"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
        <div className="ecommerce-grid">
            
            {/* Mitad izquierda */}
            <FormularioEcommerce />
            
            {/* Mitad derecha */}
            <FaqEcommerce />
            
        </div>
    </motion.section>
  );
};

export default EcommerceDoble;