import React from 'react';
import { motion } from 'framer-motion';
import './FasesSeo.css';

const FasesSeo = () => {
    return (
        <section className="seo-scenarios-section">
            <div className="seo-scenarios-container">
                {/* 🔥 Título: Sube suavemente desde abajo */}
                <motion.h2 
                    className="scenarios-title"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    ¿En qué situación se encuentra tu negocio hoy?
                </motion.h2>
                
                <div className="scenarios-grid">
                    {/* 🔥 Camino 1: Sube suavemente (con un pelín de retraso tras el título) */}
                    <motion.div 
                      className="scenario-card-premium"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      whileHover={{ y: -8, scale: 1.01, transition: { type: "spring", stiffness: 300 } }}
                    >
                        <div className="scenario-glow"></div>
                        <div className="scenario-icon-box">
                            <i className="fa-solid fa-lightbulb"></i>
                        </div>
                        <h3>SEO desde el Nacimiento</h3>
                        <span className="scenario-subtitle">Para nuevas ideas y futuros lanzamientos</span>
                        <p>
                            Diseñamos la estructura de tu sitio pensando en lo que tus clientes buscarán en Google desde el minuto uno. Esto significa que tu web nacerá siendo ultrarrápida, fácil de leer para los motores de búsqueda y lista para escalar posiciones sin necesidad de costosas correcciones en el futuro. <strong>Si empiezas de cero, hazlo para ganar.</strong>
                        </p>
                    </motion.div>

                    {/* 🔥 Camino 2: Sube suavemente un instante después que la tarjeta 1 */}
                    <motion.div 
                      className="scenario-card-premium active"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      whileHover={{ y: -8, scale: 1.01, transition: { type: "spring", stiffness: 300 } }}
                    >
                        <div className="scenario-glow"></div>
                        <div className="scenario-icon-box">
                            <i className="fa-solid fa-life-ring"></i>
                        </div>
                        <h3>Auditoría y Rescate SEO</h3>
                        <span className="scenario-subtitle">Para webs activas que no consiguen clientes</span>
                        <p>
                            Analizamos tu sitio actual con una rigurosa lupa técnica para localizar los errores invisibles que te están penalizando o frenando ante los ojos de Google. Reestructuramos la arquitectura de navegación, optimizamos la velocidad y reenfocamos tu contenido estratégico. <strong>No des por perdida tu inversión; la rescatamos y la hacemos rentable.</strong>
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FasesSeo;