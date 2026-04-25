import React, { useEffect } from "react";
import './Soluciones.css';
import { motion } from 'framer-motion';

const Soluciones = () => {
  return (
    <motion.section 
      className="soluciones-section"
      // 1. Cómo empieza (Invisible y 50px más abajo)
      initial={{ opacity: 0, y: 50 }}
      // 2. Cómo termina cuando llegas a ella (Visible y en su sitio)
      whileInView={{ opacity: 1, y: 0 }}
      // 3. Control de la animación
      viewport={{ once: true, amount: 0.2 }} // 'once: true' para que no repita al subir
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
        <section className="soluciones-section">
            <motion.div 
                className="soluciones-header"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="soluciones-main-title">¿Código a medida o sistemas autogestionables?</h2>
                <p className="soluciones-subtitle">Analizamos tus necesidades para ofrecerte la tecnología que mejor impulse tu negocio.</p>
            </motion.div>
        
            <div className="soluciones-grid">
                {/* CARD 1: CÓDIGO */}
                <motion.div 
                    className="solucion-card-new"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                >
                    <div className="solucion-icon-box">
                        <i className="fas fa-code"></i>
                    </div>
                    <h3 className="solucion-card-title">Diseño a Medida</h3>
                    <p className="solucion-card-text">
                        Webs ultra-rápidas, sin límites de diseño y optimizadas al 100% para Google. Ideal para marcas que buscan exclusividad y rendimiento extremo.
                    </p>
                    <button className="solucion-card-btn">
                        SABER MÁS <i className="fas fa-chevron-right"></i>
                    </button>
                </motion.div>

                {/* CARD 2: WORDPRESS */}
                <motion.div 
                    className="solucion-card-new"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <div className="solucion-icon-box">
                        <i className="fas fa-layer-group"></i>
                    </div>
                    <h3 className="solucion-card-title">Sistemas Autogestionables</h3>
                    <p className="solucion-card-text">
                        Potenciamos tu negocio con los mejores gestores del mercado (Shopify, WordPress, WooCommerce). Ideal para e-commerce y proyectos que requieren autonomía total.
                    </p>
                    <button className="solucion-card-btn">
                        SABER MÁS <i className="fas fa-chevron-right"></i>
                    </button>
                </motion.div>
            </div>
        </section>
    </motion.section>
  );
};

export default Soluciones;