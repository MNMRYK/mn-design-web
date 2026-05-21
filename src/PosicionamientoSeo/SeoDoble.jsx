import React, { useEffect } from "react";
import FormularioSeo from './FormularioSeo';
import FaqSeo from './FaqSeo';
import './SeoDoble.css'; // Aquí meteríamos el CSS del grid que divide la pantalla en 2
import { motion } from 'framer-motion';

const SeoDoble = () => {
  return (
    <section className="seo-section-wrapper">
        <div className="seo-grid">
            
            {/* 🔥 Mitad izquierda (Formulario): Sube suavemente primero */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <FormularioSeo />
            </motion.div>
            
            {/* 🔥 Mitad derecha (FAQs): Sube un instante después */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <FaqSeo />
            </motion.div>
            
        </div>
    </section>
  );
};

export default SeoDoble;