import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import './DisenoWebSeccionesEspeciales.css';

import Lottie from "lottie-react";
import animCorporativa from "../assets/animations/disenoweb/corporativa.json";
import animReserva from "../assets/animations/disenoweb/reserva.json";
import animPortafolio from "../assets/animations/disenoweb/portafolio.json";
import animOnPage from "../assets/animations/disenoweb/onpage.json";
import animLanding from "../assets/animations/disenoweb/landing.json";
import animAcademia from "../assets/animations/disenoweb/academia.json";


const LottiePlayer = Lottie.default || Lottie;

const DisenoWebSeccionesEspeciales = () => {
    const [imagenModal, setImagenModal] = useState(null);


    // Lista de estructuras con la Opción 6 añadida y rutas de imagen
    const estructuras = [
        { 
            animation: animCorporativa,
            icon: "fa-building", 
            title: "Webs Corporativas", 
            desc: "Presentan información clara de tu empresa, servicios y contacto directo con el cliente.",
            img: "/ejemplos/corporativa.jpg" // <-- Cambia por tus imágenes reales
        },
        { 
            animation: animReserva,
            icon: "fa-calendar-days", 
            title: "Webs con Reserva", 
            desc: "Ideal para comercios que necesitan agendar citas y sincronizarlas de forma automática.",
            img: "/ejemplos/reservas.jpg"
        },
        { 
            animation: animPortafolio,
            icon: "fa-palette", 
            title: "Portafolio", 
            desc: "Enfocado en mostrar el trabajo visual de artistas, fotógrafos o profesionales.",
            img: "/ejemplos/portafolio.jpg"
        },
        { 
            animation: animOnPage,
            icon: "fa-file-lines", 
            title: "On Page", 
            desc: "Todo el sitio web se desarrolla en una sola página fluida, ideal para lanzamientos rápidos.",
            img: "/ejemplos/onpage.jpg"
        },
        { 
            animation: animLanding,
            icon: "fa-bullseye", 
            title: "Landing Page", 
            desc: "Páginas de aterrizaje diseñadas con el único objetivo de convertir visitas en clientes con cero distracciones.",
            img: "/ejemplos/landingpage.jpg"
        },
        // 🔥 NUEVA OPCIÓN 6: Academias y Membresías 🔥
        { 
            animation: animAcademia,
            icon: "fa-graduation-cap", 
            title: "Academias & Membresías", 
            desc: "Plataformas de e-learning preparadas para vender cursos, infoproductos y gestionar áreas privadas.",
            img: "/ejemplos/academia.jpg"
        }
    ];

    // 🔥 EL EFECTO CON CANDADO DOBLE 🔥
        useEffect(() => {
            if (imagenModal) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }
            return () => { document.body.style.overflow = 'unset'; };
        }, [imagenModal]);

        useEffect(() => {
            const hash = window.location.hash; 
            if (hash) {
                const element = document.querySelector(hash);
                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                }
            }
        }, []);
    

    return (
        <div className="secciones-extras-wrapper">
        
            {/* ===================================================
            SECCIÓN 1: PLANES PREMIUM
            =================================================== */}
            <motion.section 
                className="seccion-planes"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="section-title-container">
                    <h2>Nuestros Planes Adaptados</h2>
                    <p className="section-subtitle">Soluciones transparentes para escalar tu negocio sin sorpresas.</p>
                </div>

                <div className="planes-grid">
                    {/* Plan Básico */}
                    <motion.div className="plan-card" whileHover={{ y: -8 }}>
                        <h3>Básico</h3>
                        <div className="plan-precio">Ideal para empezar</div>
                        <ul className="plan-features">
                        <li><i className="fa-solid fa-check"></i> Diseño web de hasta 5 secciones.</li>
                        <li><i className="fa-solid fa-check"></i> Arquitectura SEO base.</li>
                        <li><i className="fa-solid fa-check"></i> Diseño 100% responsivo y ultra-rápido.</li>
                        <li><i className="fa-solid fa-check"></i> Formularios de contacto inteligentes.</li>
                        </ul>
                        <a 
                            href="https://wa.me/34645854934?text=¡Hola%21%20Estoy%20interesado%20en%20conseguir%20información%20sobre%20el%20Plan%20Básico%20de%20Diseño%20Web." 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-plan-secundario"
                        >
                            Solicitar presupuesto
                        </a>
                    </motion.div>

                    {/* Plan Impulso (DESTACADO) */}
                    <motion.div className="plan-card destacado" whileHover={{ scale: 1.03, y: -8 }}>
                        <span className="badge-destacado">MÁS SOLICITADO</span>
                        <h3>Impulso</h3>
                        <div className="plan-precio">Tu negocio a otro nivel</div>
                        <ul className="plan-features">
                        <li><i className="fa-solid fa-check"></i> Diseño web con secciones ilimitadas.</li>
                        <li><i className="fa-solid fa-check"></i> Arquitectura SEO avanzado.</li>
                        <li><i className="fa-solid fa-check"></i> Web Multi-idioma.</li>
                        <li><i className="fa-solid fa-check"></i> Calendario integrado y gestión de citas.</li>
                        <li><i className="fa-solid fa-check"></i> Mantenimiento web incluido primer año.</li>
                        </ul>
                        <a 
                            href="https://wa.me/34600000000?text=¡Hola%21%20Estoy%20interesado%20en%20conseguir%20información%20sobre%20el%20Plan%20Impulso%20de%20Diseño%20Web." 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-plan-primario"
                        >
                            Agendar consultoría
                        </a>
                    </motion.div>

                    {/* Plan Esencial */}
                    <motion.div className="plan-card" whileHover={{ y: -8 }}>
                        <h3>Esencial</h3>
                        <div className="plan-precio">Soporte y Estrategia 360°</div>
                        <ul className="plan-features">
                        <li><i className="fa-solid fa-check"></i> Incluye todo el Plan Impulso.</li>
                        <li><i className="fa-solid fa-check"></i> Analítica avanzada y Estrategia Digital.</li>
                        <li><i className="fa-solid fa-check"></i> Optimización para IA (AEO/GEO).</li>
                        <li><i className="fa-solid fa-check"></i> Automatización de Marketing & CRM.</li>
                        </ul>
                        <a 
                            href="https://wa.me/34600000000?text=¡Hola%21%20Estoy%20interesado%20en%20conseguir%20información%20sobre%20el%20Plan%20Esencial%20de%20Diseño%20Web." 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn-plan-secundario"
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
                id="estructuras-section"
                className="seccion-estructuras"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="section-title-container">
                    <h2>¿Qué estructura necesita tu presencia digital?</h2>
                </div>

                <div className="estructuras-grid">
                    {estructuras.map((est, idx) => (
                        <motion.div key={idx} className="estructura-item" whileHover={{ y: -5 }}>
                            <div className="estructura-icon-wrapper" style={{ width: '80px', height: '80px', margin: '0 auto' }}>
                                {/* 🔥 USAMOS EL COMPONENTE PARCHEADO LottiePlayer EN VEZ DE Lottie 🔥 */}
                                <LottiePlayer 
                                  animationData={est.animation} 
                                  loop={true} 
                                  autoplay={true} 
                                  style={{ width: '60px', height: '60px' }}
                                />
                            </div>
                            <div className="estructura-info">
                                <h4>{est.title}</h4>
                                <div className="estructura-contenido-row">
                                    <p>{est.desc}</p>
                                </div>
                            </div>
                            
                            {/* 🔥 El botón lo sacamos de la row de texto para posicionarlo libremente 🔥 */}
                            <button 
                                className="btn-ver-ejemplo" 
                                onClick={() => setImagenModal(est.img)}
                                title="Ver ejemplo"
                            >
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                            
                        </motion.div>
                    ))}
                </div>
            </motion.section>

        {/* ===================================================
            SECCIÓN 3: PORTFOLIO / GITHUB PREMIUM
            =================================================== */}
            <motion.section 
                id="portfolio-section"
                className="seccion-portfolio"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="section-title-container">
                    <h2>Diseño a Medida de Alto Rendimiento</h2>
                    <p className="section-subtitle">Explora algunos proyectos reales optimizados en rendimiento y código limpio.</p>
                </div>

                <div className="portfolio-grid">
                    {[
                        { 
                            title: "L'Essence", 
                            desc: "Restaurante con sistema de reservas online integrado y carta digital autogestionable.", 
                            img: "/ejemplos/restaurant.png", // ⚠️ ¡Revisa si en tu carpeta se llama así o "restaurant.jpg"!
                            url: "https://mnmryk.github.io/L-Essence-Restaurante/" 
                        },
                        { 
                            title: "Salón Belleza Luna", 
                            desc: "Sitio web 'soft & clean' con módulo de gestión de citas y panel de administración.", 
                            img: "/ejemplos/salon.png", 
                            url: "https://mnmryk.github.io/Belleza-Luna/" 
                        },
                        { 
                            title: "Tattoo & Gallery", 
                            desc: "Plataforma visual tipo galería para mostrar trabajos de artistas con alta fidelidad.", 
                            img: "/ejemplos/tatto.png", // ⚠️ ¡Revisa si en tu carpeta se llama así o "tattoo.jpg"!
                            url: "https://mnmryk.github.io/tattoo-studio-cms/" 
                        },
                        { 
                            title: "Borcelle Carousel", 
                            desc: "Web experimental interactiva con múltiples diseños de carrusel y efectos de scroll dinámico.", 
                            img: "/ejemplos/borcelle.png", 
                            url: "https://mnmryk.github.io/borcelle-carousell/" 
                        },
                        { 
                            title: "Kit Glass Liquid", 
                            desc: "Ejemplo de interfaz de usuario (UI) enfocado en maquetación de contenido con efectos avanzados.", 
                            img: "/ejemplos/kitliquid.png", 
                            url: "https://mnmryk.github.io/kit-glassliquid/" 
                        },
                        { 
                            title: "Buttons Effect", 
                            desc: "Muestra de componentes UI interactivos con microanimaciones y efectos visuales para botones.", 
                            img: "/ejemplos/buttons.png", 
                            url: "https://mnmryk.github.io/buttons-effect/" 
                        }
                    ].map((proj, idx) => (
                        <motion.div key={idx} className="portfolio-card" whileHover={{ y: -10 }}>
                            
                            {/* 🔥 EL NUEVO NAVEGADOR DE UIVERSE ADAPTADO A REACT 🔥 */}
                            <div className="browser-mockup-complex">
                                <div className="tabs-head">
                                    <div className="tabs">
                                        <div className="tab-open">
                                            <div className="rounded-l"><div className="mask-round"></div></div>
                                            {/* El título de la pestaña cambia según el proyecto */}
                                            <span>{proj.title}</span>
                                            <div className="close-tab"><i className="fa-solid fa-xmark"></i></div>
                                            <div className="rounded-r"><div className="mask-round"></div></div>
                                        </div>
                                    </div>

                                    <div className="window-opt">
                                        <button><i className="fa-solid fa-minus"></i></button>
                                        <button><i className="fa-regular fa-square"></i></button>
                                        <button className="window-close"><i className="fa-solid fa-xmark"></i></button>
                                    </div>
                                </div>

                                <div className="head-browser">
                                    <button><i className="fa-solid fa-arrow-left"></i></button>
                                    <button disabled><i className="fa-solid fa-arrow-right"></i></button>
                                    
                                    {/* La URL limpia (quitamos el https:// para que parezca más real) */}
                                    <input
                                        type="text"
                                        readOnly
                                        value={proj.url.replace('https://', '').replace(/\/$/, '')}
                                    />

                                    <button><i className="fa-solid fa-ellipsis-vertical"></i></button>
                                    <div className="star"><i className="fa-regular fa-star"></i></div>
                                </div>
                            </div>
                            {/* 🔥 FIN DEL NUEVO NAVEGADOR 🔥 */}

                            <div className="mockup-body">
                                <div className="project-img-scroll" style={{ backgroundImage: `url("${proj.img}")` }}>
                                {!proj.img && <div className="img-placeholder"><i className="fa-solid fa-code"></i></div>}
                                </div>
                            </div>
                            
                            <div className="portfolio-meta">
                                <p>{proj.desc}</p>
                            </div> 

                            {/* 🔥 EL NUEVO BOTÓN ESQUINERO (Sin texto y fuera del meta) 🔥 */}
                            <a 
                                href={proj.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn-visitar-esquina"
                                title="Visitar Proyecto"
                                aria-label="Visitar Proyecto"
                            >
                                <i className="fa-solid fa-arrow-right"></i>
                            </a>                
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            <AnimatePresence>
                {imagenModal && (
                    <motion.div 
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setImagenModal(null)} // Cierra al hacer clic fuera
                    >
                        <motion.div 
                        className="modal-content"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()} // Evita que se cierre al clicar la foto
                        >
                        <button className="modal-close-btn" onClick={() => setImagenModal(null)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <div className="modal-body-img">
                            <img src={imagenModal} alt="Ejemplo de estructura web" />
                        </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default DisenoWebSeccionesEspeciales;