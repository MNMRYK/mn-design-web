import React from 'react';
import { motion } from 'framer-motion';
import './PlanesRedes.css';
import Icono from "../utils/Icono";


const PlanesRedes = () => {
  return (
    <section className="rs-secciones-extras-wrapper">
        
        <motion.section 
            className="rs-seccion-planes"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
        >
            <div className="rs-section-title-container">
                <h2>Planes de gestión de redes sociales</h2>
                <p className="rs-section-subtitle">Soluciones estratégicas diseñadas para escalar tu marca y convertir seguidores en clientes.</p>
            </div>

            <div className="rs-planes-grid">
                {/* Plan 1: Despegue Digital */}
                <motion.div className="rs-plan-card" whileHover={{ y: -8 }}>
                    <h3>Despegue Digital</h3>
                    <div className="rs-plan-precio">Configuración profesional</div>
                    <ul className="rs-plan-features">
                        <li><Icono nombre="check" /> Auditoría de perfil y competencia.</li>
                        <li><Icono nombre="check" /> Optimización SEO de Biografía.</li>
                        <li><Icono nombre="check" /> Guía de estilo visual y branding.</li>
                        <li><Icono nombre="check" /> 9 Plantillas editables Premium.</li>
                        <li><Icono nombre="check" /> Formación básica de uso.</li>
                    </ul>
                    <a 
                        href="https://wa.me/34645854934?text=¡Hola%21%20Estoy%20interesado%20en%20conseguir%20información%20sobre%20el%20Plan%20Básico%20de%20Redes%20Sociales."
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="rs-btn-plan-secundario"
                    >
                        Solicitar presupuesto
                    </a>
                </motion.div>

                {/* Plan 2: Reto Aceleración (DESTACADO) */}
                <motion.div className="rs-plan-card destacado" whileHover={{ scale: 1.03, y: -8 }}>
                    <span className="rs-badge-destacado">RETO 90 DÍAS</span>
                    <h3>Reto Aceleración</h3>
                    <div className="rs-plan-precio">Sprint de alto rendimiento</div>
                    <ul className="rs-plan-features">
                        <li><Icono nombre="check" /> Estrategia de crecimiento en Reels/TikTok.</li>
                        <li><Icono nombre="check" /> <strong>Calendario editorial a 3 meses.</strong></li>
                        <li><Icono nombre="check" /> Copywriting enfocado a ventas.</li>
                        <li><Icono nombre="check" /> Gestión activa de comunidad.</li>
                        <li><Icono nombre="check" /> Análisis de conversión semanal.</li>
                    </ul>
                    <a 
                        href="https://wa.me/34645854934?text=¡Hola%21%20Estoy%20interesado%20en%20conseguir%20información%20sobre%20el%20Plan%20Reto%20Aceleración%20de%20Redes%20Sociales." 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="rs-btn-plan-primario"
                    >
                        Comenzar el reto
                    </a>
                </motion.div>

                {/* Plan 3: Autoridad 360 */}
                <motion.div className="rs-plan-card" whileHover={{ y: -8 }}>
                    <h3>Autoridad 360</h3>
                    <div className="rs-plan-precio">Gestión integral recurrente</div>
                    <ul className="rs-plan-features">
                        <li><Icono nombre="check" /> Social Media Manager dedicado.</li>
                        <li><Icono nombre="check" /> <strong>Producción de contenidos visuales.</strong></li>
                        <li><Icono nombre="check" /> Estrategia omnicanal (IG, TikTok, LinkedIn).</li>
                        <li><Icono nombre="check" /> Informes avanzados de ROI.</li>
                        <li><Icono nombre="check" /> Soporte VIP 24/7.</li>
                    </ul>
                    <a 
                        href="https://wa.me/34645854934?text=¡Hola%21%20Estoy%20interesado%20en%20conseguir%20información%20sobre%20el%20Plan%20Esencial%20de%20Redes%20Sociales."
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="rs-btn-plan-secundario"
                    >
                        Solicitar presupuesto
                    </a>
                </motion.div>
            </div>
        </motion.section>
    </section>
  );
};

export default PlanesRedes;