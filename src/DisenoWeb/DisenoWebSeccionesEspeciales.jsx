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
            img: "/ejemplos/corporativa.webp" // <-- Cambia por tus imágenes reales
        },
        { 
            animation: animReserva,
            icon: "fa-calendar-days", 
            title: "Webs con Reserva", 
            desc: "Ideal para comercios que necesitan agendar citas y sincronizarlas de forma automática.",
            img: "/ejemplos/reservas.webp"
        },
        { 
            animation: animPortafolio,
            icon: "fa-palette", 
            title: "Portafolio", 
            desc: "Enfocado en mostrar el trabajo visual de artistas, fotógrafos o profesionales.",
            img: "/ejemplos/portafolio.webp"
        },
        { 
            animation: animOnPage,
            icon: "fa-file-lines", 
            title: "On Page", 
            desc: "Todo el sitio web se desarrolla en una sola página fluida, ideal para lanzamientos rápidos.",
            img: "/ejemplos/onpage.webp"
        },
        { 
            animation: animLanding,
            icon: "fa-bullseye", 
            title: "Landing Page", 
            desc: "Páginas de aterrizaje diseñadas con el único objetivo de convertir visitas en clientes con cero distracciones.",
            img: "/ejemplos/landingpage.webp"
        },
        // 🔥 NUEVA OPCIÓN 6: Academias y Membresías 🔥
        { 
            animation: animAcademia,
            icon: "fa-graduation-cap", 
            title: "Academias & Membresías", 
            desc: "Plataformas de e-learning preparadas para vender cursos, infoproductos y gestionar áreas privadas.",
            img: "/ejemplos/academia.webp"
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

        // 🔥 EL ÚNICO USEEFFECT DE SCROLL QUE NECESITAS (Sustituye a los otros dos) 🔥
        useEffect(() => {
            const hash = window.location.hash; 
            if (hash) {
                const element = document.querySelector(hash);
                if (element) {
                    // 500ms es el tiempo perfecto para que carguen los Lotties antes de bajar
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 500); 
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
                id="estructuras"
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
            SECCIÓN 3: LANDINGS ESPECIALIZADAS (Ex-Portfolio)
            =================================================== */}
            <motion.section 
                id="portfolio"
                className="seccion-portfolio"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="section-title-container">
                    <h2>Soluciones Web Especializadas</h2>
                    <p className="section-subtitle">Descubre nuestras plataformas diseñadas a medida para impulsar tu sector.</p>
                </div>

                <div className="portfolio-grid">
                    {[
                        { 
                            title: "Psicólogos y Terapeutas", 
                            desc: "Atrae más pacientes con una web optimizada, profesional y orientada a generar confianza, con sistema de reservas integrado.", 
                            img: "/psicologos.webp", // <-- Ojo, asegúrate de tener esta imagen
                            url: "https://descubre.mndesignweb.es/psicologos/" 
                        },
                        { 
                            title: "Portal Clínico & Academia", 
                            desc: "Plataforma de desarrollo propio. Digitaliza la gestión de pacientes, agendas y academia de formación, ideal para clínicas y nutricionistas.", 
                            img: "/clinicas.webp", // <-- Ojo, asegúrate de tener esta imagen
                            url: "https://descubre.mndesignweb.es/clinicas/" 
                        },
                        { 
                            title: "Invitaciones de Boda Web", 
                            desc: "Sorprende a tus invitados con una invitación digital elegante, interactiva y con confirmación de asistencia automatizada.", 
                            img: "/bodas.webp", // <-- Ojo, asegúrate de tener esta imagen
                            url: "https://descubre.mndesignweb.es/bodas/" 
                        },
                    ].map((proj, idx) => (
                        <motion.div key={idx} className="portfolio-card" whileHover={{ y: -10 }}>
                            
                            {/* EL NAVEGADOR DE UIVERSE */}
                            <div className="browser-mockup-complex">
                                <div className="tabs-head">
                                    <div className="tabs">
                                        <div className="tab-open">
                                            <div className="rounded-l"><div className="mask-round"></div></div>
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
                                    
                                    <input
                                        type="text"
                                        readOnly
                                        value={proj.url.replace('https://', '').replace(/\/$/, '')}
                                    />

                                    <button><i className="fa-solid fa-ellipsis-vertical"></i></button>
                                    <div className="star"><i className="fa-regular fa-star"></i></div>
                                </div>
                            </div>

                            <div className="mockup-body">
                                <div className="project-img-scroll" style={{ backgroundImage: `url("${proj.img}")` }}>
                                {!proj.img && <div className="img-placeholder"><i className="fa-solid fa-code"></i></div>}
                                </div>
                            </div>
                            
                            <div className="portfolio-meta">
                                <p>{proj.desc}</p>
                            </div> 

                            <a 
                                href={proj.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="btn-visitar-esquina"
                                title="Ver Solución"
                                aria-label="Ver Solución"
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