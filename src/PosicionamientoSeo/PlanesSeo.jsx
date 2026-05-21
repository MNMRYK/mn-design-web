import React from 'react';
import { motion } from 'framer-motion'; 
import './PlanesSeo.css';

const PlanesSeo = () => {
    return (
        <div className="seo-secciones-extras-wrapper">
        
        {/* ===================================================
            SECCIÓN 1: PLANES PREMIUM
            =================================================== */}
            <section className="seo-seccion-planes">
                
                {/* 🔥 1. Animamos el bloque del título para que suba suavemente */}
                <motion.div 
                    className="seo-section-title-container"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2>Nuestros Planes Adaptados</h2>
                    <p className="seo-section-subtitle">Soluciones transparentes para escalar tu negocio sin sorpresas.</p>
                </motion.div>

                <div className="seo-planes-grid">

                    {/* 🔥 2. Plan Izquierdo (Fidelización): Sube tras el título (delay: 0.1) */}
                    <motion.div 
                        className="seo-plan-card" 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        whileHover={{ y: -8 }}
                    >
                        <h3>Fidelización</h3>
                        <div className="seo-plan-precio">Tu negocio a otro nivel</div>
                        <ul className="seo-plan-features">
                            <li><i className="fa-solid fa-check"></i> Seguimiento mensual de palabras clave (Keywords)</li>
                            <li><i className="fa-solid fa-check"></i> <strong>Informes de rendimiento (Google Search Console y Analytics).</strong></li>
                            <li><i className="fa-solid fa-check"></i>  Ajustes técnicos continuos (WPO y seguridad).</li>
                            <li><i className="fa-solid fa-check"></i> Actualización de contenidos: 1 entrada de blog o mejora de texto mensual.</li>
                            <li><i className="fa-solid fa-check"></i>  Soporte prioritario para dudas o cambios menores.</li>
                            {/* 🛠️ Corregido: class por className */}
                            <li><i className="fa-solid fa-triangle-exclamation"></i>  La optimización de contenidos es obligatoria</li>
                        </ul>
                        <a 
                            href="https://wa.me/34645854934?text=¡Hola%21%20Estoy%20interesado%20en%20conseguir%20información%20sobre%20el%20Plan%20Básico%20de%20Posicionamiento%20SEO."
                            rel="noopener noreferrer" 
                            target="_blank" 
                            className="seo-btn-plan"
                        >
                            Solicitar presupuesto
                        </a>
                    </motion.div>

                    {/* 🔥 3. Plan Derecho (Rediseño): Sube un instante después (delay: 0.2) */}
                    <motion.div 
                        className="seo-plan-card" 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ y: -8 }}
                    >
                        <h3>Rediseño</h3>
                        <div className="seo-plan-precio">Soporte y Estrategia 360°</div>
                        <ul className="seo-plan-features">
                            <li><i className="fa-solid fa-check"></i> Auditoría SEO completa inicial para encontrar errores.</li>
                            <li><i className="fa-solid fa-check"></i> <strong>Optimización de Copywriting: Mejora de textos existentes para que gusten a Google (fundamental).</strong></li>
                            <li><i className="fa-solid fa-check"></i> Corrección de arquitectura: Reorganizamos tu web si es necesario.</li>
                            <li><i className="fa-solid fa-check"></i> Estudio de la competencia: Analizamos qué hacen los que van delante de ti.</li>
                            <li><i className="fa-solid fa-check"></i> Limpieza técnica: Eliminación de enlaces rotos y mejora de carga.</li>
                            {/* 🛠️ Corregido: class por className */}
                            <li><i className="fa-solid fa-triangle-exclamation"></i>  La optimización de contenidos es obligatoria</li>
                        </ul>
                        <a 
                            href="https://wa.me/34645854934?text=¡Hola%21%20Estoy%20interesado%20en%20conseguir%20información%20sobre%20el%20Plan%20Rediseño%20de%20Posicionamiento%20SEO." 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="seo-btn-plan"
                        >
                            Solicitar presupuesto
                        </a>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default PlanesSeo;