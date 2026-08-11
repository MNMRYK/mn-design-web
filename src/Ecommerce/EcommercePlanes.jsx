import React from 'react';
import { motion } from 'framer-motion'; 
import './EcommercePlanes.css';

const EcommercePlanes = () => {

    // Lista de estructuras simplificada y limpia (sin imágenes de ejemplo)
    const estructuras = [
        { 
            id: "shopify",
            img: "/ecommerce/shopify-3d.webp", // Cámbialo por la ruta de tu imagen guardada
            title: "Shopify", 
            subtitle: "Líder en facilidad",
            ventajas: [
                "Rápida puesta en marcha y facilidad de uso.",
                "Ecosistema completo con apps y temas.",
                "Seguridad y alojamiento incluidos.",
                "Soporte técnico 24/7."
            ]
        },
        { 
            id: "woocommerce",
            img: "/ecommerce/woo-3d.webp", 
            title: "WooCommerce", 
            subtitle: "Personalización total",
            ventajas: [
                "Control absoluto sobre tu plataforma (auto-alojado).",
                "Altamente personalizable y flexible.",
                "Sin cuotas mensuales de plataforma fijas.",
                "Ideal para integraciones complejas."
            ]
        },
        { 
            id: "astro",
            img: "/ecommerce/astro-3d.webp", 
            title: "E-commerce Astro", 
            subtitle: "Velocidad y control",
            ventajas: [
                "Rendimiento ultrarrápido (código a medida).",
                "Arquitectura de islas para interactividad.",
                "Desarrollo adaptado a necesidades únicas.",
                "Mejor SEO y experiencia de usuario."
            ]
        },
        { 
            id: "academia",
            img: "/ecommerce/academia-3d.webp", 
            title: "Academia", 
            subtitle: "Cursos y control",
            ventajas: [
                "Automatización de entrega de cursos (código a medida).",
                "Áreas privadas y gestión de alumnos.",
                "Herramientas exclusivas para educadores.",
                "Escalabilidad para grandes volúmenes."
            ]
        }
    ];

    return (
        <div className="ec-secciones-extras-wrapper">
        
            {/* ===================================================
            SECCIÓN 1: PLANES PREMIUM
            =================================================== */}
            <motion.section 
                className="ec-seccion-planes"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="ec-section-title-container">
                    <h2>Nuestros Planes Adaptados</h2>
                    <p className="ec-section-subtitle">Soluciones transparentes para escalar tu negocio sin sorpresas.</p>
                </div>

                <div className="ec-planes-grid">
                    {/* Plan Básico */}
                    <motion.div className="ec-plan-card" whileHover={{ y: -8 }}>
                        <h3>Básico</h3>
                        <div className="ec-plan-precio">Ideal para despegar</div>
                        <ul className="ec-plan-features">
                            <li><i className="fa-solid fa-check"></i> Catálogo de hasta 50 productos.</li>
                            <li><i className="fa-solid fa-check"></i> Pasarela de pagos segura (Stripe/PayPal).</li>
                            <li><i className="fa-solid fa-check"></i> Diseño UX optimizado para móvil.</li>
                            <li><i className="fa-solid fa-check"></i> Gestión básica de envíos y stock.</li>
                            <li><i className="fa-solid fa-check"></i> Formación para subir productos.</li>
                        </ul>
                        <a 
                            href="https://wa.me/34600000000?text=¡Hola%21%20Estoy%20interesado%20en%20conseguir%20información%20sobre%20el%20Plan%20Básico%20de%20E-commerce."
                            rel="noopener noreferrer" 
                            target="_blank" 
                            className="ec-btn-plan-secundario"
                        >
                            Solicitar presupuesto
                        </a>
                    </motion.div>

                    {/* Plan Impulso */}
                    <motion.div className="ec-plan-card destacado" whileHover={{ scale: 1.03, y: -8 }}>
                        <span className="ec-badge-destacado">MÁS SOLICITADO</span>
                        <h3>Impulso</h3>
                        <div className="ec-plan-precio">Tu negocio a otro nivel</div>
                        <ul className="ec-plan-features">
                            <li><i className="fa-solid fa-check"></i> Productos ilimitados.</li>
                            <li><i className="fa-solid fa-check"></i> <strong>Recuperación de carritos abandonados.</strong></li>
                            <li><i className="fa-solid fa-check"></i> Integración con Meta Pixel y Google Analytics.</li>
                            <li><i className="fa-solid fa-check"></i> Venta cruzada (Productos relacionados).</li>
                            <li><i className="fa-solid fa-check"></i> Mantenimiento preventivo incluido.</li>
                        </ul>
                        <a 
                            href="https://wa.me/34600000000?text=¡Hola%21%20Estoy%20interesado%20en%20conseguir%20información%20sobre%20el%20Plan%20Impulso%20de%20E-commerce."
                            rel="noopener noreferrer" 
                            target="_blank" 
                            className="ec-btn-plan-primario"
                        >
                            Agendar consultoría
                        </a>
                    </motion.div>

                    {/* Plan Esencial */}
                    <motion.div className="ec-plan-card" whileHover={{ y: -8 }}>
                        <h3>Esencial</h3>
                        <div className="ec-plan-precio">Soporte y Estrategia 360°</div>
                        <ul className="ec-plan-features">
                            <li><i className="fa-solid fa-check"></i> Todo lo del Plan Impulso +</li>
                            <li><i className="fa-solid fa-check"></i> <strong>Automatización de Marketing (Email).</strong></li>
                            <li><i className="fa-solid fa-check"></i> Estrategia CRO (Conversión Rate Optimization).</li>
                            <li><i className="fa-solid fa-check"></i> Integración CRM / ERP para sincronización.</li>
                            <li><i className="fa-solid fa-check"></i> Soporte técnico preferente.</li>
                        </ul>
                        <a 
                            href="https://wa.me/34600000000?text=¡Hola%21%20Estoy%20interesado%20en%20conseguir%20información%20sobre%20el%20Plan%20Esencial%20de%20E-commerce."
                            rel="noopener noreferrer" 
                            target="_blank" 
                            className="ec-btn-plan-secundario"
                        >
                            Solicitar presupuesto
                        </a>
                    </motion.div>
                </div>
            </motion.section>

            {/* ===================================================
            SECCIÓN 2: ESTRUCTURAS MÁS DEMANDADAS
            =================================================== */}
            <motion.section 
                className="ec-seccion-estructuras"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="ec-section-title-container">
                    <h2>¿Qué necesita tu E-Commerce?</h2>
                </div>

                <div className="ec-estructuras-grid-v2">
                    {estructuras.map((est, idx) => (
                        <motion.div key={idx} className="ec-estructura-item-v2" whileHover={{ y: -5 }}>
                            
                            {/* Bloque superior: Imagen */}
                            <div className="ec-estructura-img-wrapper">
                                <img src={est.img} alt={est.title} />
                            </div>
                            
                            {/* Bloque inferior: Textos y lista de ventajas */}
                            <div className="ec-estructura-info-v2">
                                <h4>{est.title} <br/><span>({est.subtitle})</span></h4>
                                
                                <ul className="ec-ventajas-list">
                                    {est.ventajas.map((ventaja, i) => (
                                        <li key={i}>
                                            <i className="fa-solid fa-circle-check"></i> 
                                            {ventaja}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* ===================================================
            SECCIÓN 3: PROMOCIÓN MENTORÍAS SHOPIFY
            =================================================== */}
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
                            <i className="fa-brands fa-shopify"></i> Especialistas en Liquid
                        </div>
                        <h2>Toma el control operativo de tu Shopify <br/><span>sin miedo a romper nada</span></h2>
                        <p>Mentoría técnica 1 a 1 para dueños de e-commerce que quieren dejar de perder ventas por fallos de configuración.</p>
                        
                        <div className="ec-promo-buttons">
                            {/* Botón principal a la landing general */}
                            <a 
                                href="https://descubre.mndesignweb.es/aprende-shopify/#precios" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="ec-btn-shopify-primary"
                            >
                                Ver sesiones y precios
                            </a>
                            
                            {/* Botón secundario directo a la sección de descarga (anclado al ID del form) */}
                            <a 
                                href="https://descubre.mndesignweb.es/aprende-shopify/#recurso-gratis" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="ec-btn-shopify-secondary"
                            >
                                <i className="fa-solid fa-file-pdf" style={{ marginRight: '8px' }}></i>
                                Descargar Arsenal Secreto
                            </a>
                        </div>
                    </div>
                    
                    {/* He puesto la ruta de la imagen flotante que pasaste en tu código */}
                    <div className="ec-promo-image">
                        <img src="/ecommerce/2.webp" alt="Mentorías Shopify MN Design Web" />
                    </div>
                </div>
            </motion.section>

        </div>
    );
};

export default EcommercePlanes;