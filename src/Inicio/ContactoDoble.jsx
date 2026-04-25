import React from 'react';
import FormularioContacto from './FormularioContacto';
import RutaTrabajo from './RutaTrabajo';
import './ContactoDoble.css'; // Aquí meteríamos el CSS del grid que divide la pantalla en 2
import { motion } from 'framer-motion';

const ContactoDoble = () => {
  return (
    <motion.section 
      className="contacto-section-wrapper"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="contacto-grid">
        
        {/* Mitad izquierda */}
        <FormularioContacto />
        
        {/* Mitad derecha */}
        <RutaTrabajo />
        
      </div>
    </motion.section>
  );
};

export default ContactoDoble;