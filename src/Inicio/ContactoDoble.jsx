import React from "react";
import './ContactoDoble.css'; 
import { motion } from 'framer-motion';

// 🔥 IMPORTACIONES NORMALES Y SEGURAS (Cero problemas con el scroll) 🔥
import FormularioContacto from './FormularioContacto';
import RutaTrabajo from './RutaTrabajo';

const ContactoDoble = () => {
  return (
    <motion.section 
      className="contacto-section-wrapper"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="contacto-grid">
        
        {/* Mitad izquierda: El formulario carga directamente */}
        <FormularioContacto />
        
        {/* Mitad derecha: La ruta de trabajo carga directamente */}
        <RutaTrabajo />
        
      </div>
    </motion.section>
  );
};

export default ContactoDoble;