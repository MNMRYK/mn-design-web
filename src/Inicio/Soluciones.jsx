import React from "react";
import './Soluciones.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icono from "../utils/Icono";

const Soluciones = () => {
    const handleScroll = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
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
                        <div className="solucion-icon-box"><Icono nombre="code" /></div>
                        <h3 className="solucion-card-title">Diseño a Medida</h3>
                        <p className="solucion-card-text">
                            Plataformas SaaS y Webs ultra-rápidas, sin límites de diseño y optimizadas al 100% para Google.
                        </p>
                        <a href="/disenoweb/#portfolio" className="solucion-card-btn">
                            SABER MÁS <Icono nombre="chevron-right" />
                        </a>
                    </motion.div>

                    <motion.div className="solucion-card-new" whileHover={{ y: -5 }}>
                        <div className="solucion-icon-box"><Icono nombre="layer-group" /></div>
                        <h3 className="solucion-card-title">Sistemas Autogestionables</h3>
                        <p className="solucion-card-text">
                            Potenciamos tu negocio con los mejores gestores (Shopify, WordPress, WooCommerce).
                        </p>
                        <a href="/disenoweb/#estructuras" className="solucion-card-btn">
                            SABER MÁS <Icono nombre="chevron-right" />
                        </a>
                    </motion.div>
                </div>
            </motion.section>


            <motion.section 
                className="ec-promo-shopify tema-oscuro"
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="ec-promo-content">
                    <div className="ec-promo-text">
                        <div className="ec-promo-badge">
                            <Icono nombre="shopify" /> Especialistas en Liquid
                        </div>
                        <h2>¿Vendes con Shopify? <br/><span>Aprende a llevar tu tienda sin depender de nadie</span></h2>
                        <p>Sesiones 1 a 1 en las que revisamos contigo la configuración de tu tienda, resolvemos lo que te frena y te enseñamos a gestionarla tú.</p>
                        
                        <div className="ec-promo-buttons">
                            {/* Botón principal a la landing general */}
                            <a 
                                href="https://mndesignweb.es/aprende-shopify/#precios" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="ec-btn-shopify-primary"
                            >
                                Ver sesiones y precios
                            </a>
                            
                            {/* Botón secundario directo a la sección de descarga (anclado al ID del form) */}
                            <a 
                                href="https://mndesignweb.es/aprende-shopify/#recurso-gratis" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="ec-btn-shopify-secondary"
                            >
                                <Icono nombre="file-pdf" style={{ marginRight: '8px' }} />
                                Descargar Arsenal Secreto
                            </a>
                        </div>
                    </div>
                    
                    {/* He puesto la ruta de la imagen flotante que pasaste en tu código */}
                    <div className="ec-promo-image">
                        <img src="/ecommerce/2.webp" alt="Mentorías Shopify MN Design Web" width="422" height="426" loading="lazy" decoding="async" />
                    </div>
                </div>
            </motion.section>
        </>
    );
};

export default Soluciones;