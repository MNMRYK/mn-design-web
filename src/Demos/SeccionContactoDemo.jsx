import React from 'react';
import FormularioDemo from './FormularioDemo';
import { motion, AnimatePresence } from 'framer-motion'; 
import FaqDemo from './FaqDemo';
import './SeccionContactoDemo.css';

const SeccionContactoDemo = () => {
  return (
    <motion.section
      className="demo-form-section-wrapper"
      id="solicitar-demo"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="demo-contacto-layout">
        {/* Hijo Izquierdo */}
        <FormularioDemo />
        
        {/* Hijo Derecho */}
        <FaqDemo />
      </div>
    </motion.section>
  );
};

export default SeccionContactoDemo;