import React from "react";
import './Soluciones.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Soluciones = () => {
    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.section 
            className="soluciones-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="soluciones-header">
                <h2 className="soluciones-main-title">¿Código a medida o sistemas autogestionables?</h2>
                <p className="soluciones-subtitle">Analizamos tus necesidades para ofrecerte la tecnología que mejor impulse tu negocio.</p>
            </div>

            <div className="soluciones-grid">
                <motion.div className="solucion-card-new" whileHover={{ y: -5 }}>
                    <div className="solucion-icon-box"><i className="fas fa-code"></i></div>
                    <h3 className="solucion-card-title">Diseño a Medida</h3>
                    <p className="solucion-card-text">
                        Webs ultra-rápidas, sin límites de diseño y optimizadas al 100% para Google.
                    </p>
                    <a href="/disenoweb#portfolio" className="solucion-card-btn">
                        SABER MÁS <i className="fas fa-chevron-right"></i>
                    </a>
                </motion.div>

                <motion.div className="solucion-card-new" whileHover={{ y: -5 }}>
                    <div className="solucion-icon-box"><i className="fas fa-layer-group"></i></div>
                    <h3 className="solucion-card-title">Sistemas Autogestionables</h3>
                    <p className="solucion-card-text">
                        Potenciamos tu negocio con los mejores gestores (Shopify, WordPress, WooCommerce).
                    </p>
                    <a href="/disenoweb#estructuras" className="solucion-card-btn">
                        SABER MÁS <i className="fas fa-chevron-right"></i>
                    </a>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Soluciones;