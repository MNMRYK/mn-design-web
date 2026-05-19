import React, { useState } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import './EcommercePlanes.css';

import Lottie from "lottie-react";
import animCarrito from "../assets/animations/ecommerce/carrito.json";
import animCompletar from "../assets/animations/ecommerce/completar.json";
import animCronometro from "../assets/animations/ecommerce/cronometro.json";
import animGblo from "../assets/animations/ecommerce/glob.json";
import animLibro from "../assets/animations/ecommerce/libro.json";
import animRelacion from "../assets/animations/ecommerce/relacion.json";


const LottiePlayer = Lottie.default || Lottie;

const EcommercePlanes = () => {
    const [imagenModal, setImagenModal] = useState(null);

    // Lista de estructuras con la Opción 6 añadida y rutas de imagen
    const estructuras = [
        { 
            animation: animCarrito, // Ajusta a la animación que más encaje
            icon: "fa-store", 
            title: "D2C: Tienda de Marca", 
            desc: "Tu marca directa al consumidor. Diseños únicos para potenciar tu identidad visual y fidelizar a tus clientes.",
            img: "/ejemplos/tienda-marca.jpg"
        },
        { 
            animation: animLibro, 
            icon: "fa-book-open", 
            title: "Infoproductos & Cursos", 
            desc: "Plataformas especializadas en la venta y entrega automática de cursos, ebooks y áreas privadas de contenido.",
            img: "/ejemplos/cursos.jpg"
        },
        { 
            animation: animRelacion, 
            icon: "fa-handshake", 
            title: "B2B: Catálogo Mayorista", 
            desc: "Tiendas enfocadas a profesionales con gestión de precios personalizados, niveles de acceso y grandes volúmenes.",
            img: "/ejemplos/b2b.jpg"
        },
        { 
            animation: animGblo, 
            icon: "fa-users", 
            title: "Marketplace Multivendedor", 
            desc: "Plataformas donde varios proveedores pueden vender sus productos bajo tu gestión centralizada.",
            img: "/ejemplos/marketplace.jpg"
        },
        { 
            animation: animCompletar, 
            icon: "fa-box-open", 
            title: "Suscripciones (Box)", 
            desc: "Modelos de venta recurrente ideales para cajas de suscripción, consumibles o servicios de pago mensual.",
            img: "/ejemplos/suscripcion.jpg"
        },
        { 
            animation: animCronometro, 
            icon: "fa-rocket", 
            title: "Venta de Lanzamiento", 
            desc: "Estrategias de venta rápida o 'flash sale' con páginas optimizadas para generar urgencia y máxima conversión.",
            img: "/ejemplos/flash-sale.jpg"
        }
    ];

    return (
        <div className="ec-secciones-extras-wrapper">
        
        {/* ===================================================
            SECCIÓN 1: PLANES PREMIUM
            =================================================== */}
            <section className="ec-seccion-planes">
                <div className="ec-section-title-container">
                    <h2>Nuestros Planes Adaptados</h2>
                    <p className="ec-section-subtitle">Soluciones transparentes para escalar tu negocio sin sorpresas.</p>
                </div>

                <div className="ec-planes-grid">
                    {/* Plan Básico: Enfocado en el lanzamiento */}
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
                        <button className="ec-btn-plan-secundario">Solicitar presupuesto</button>
                    </motion.div>

                    {/* Plan Impulso: Enfocado en crecimiento y ventas */}
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
                        <button className="ec-btn-plan-primario">Solicitar presupuesto</button>
                    </motion.div>

                    {/* Plan Esencial: Enfocado en automatización y escalabilidad */}
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
                        <button className="ec-btn-plan-secundario">Solicitar presupuesto</button>
                    </motion.div>
                </div>
            </section>

        {/* ===================================================
            SECCIÓN 2: ESTRUCTURAS MÁS DEMANDADAS
            =================================================== */}
            <section className="ec-seccion-estructuras">
                <div className="ec-section-title-container">
                    <h2>¿Qué estructura necesita tu presencia digital?</h2>
                </div>

                <div className="ec-estructuras-grid">
                    {estructuras.map((est, idx) => (
                        <motion.div key={idx} className="ec-estructura-item" whileHover={{ y: -5 }}>
                            <div className="ec-estructura-icon-wrapper" style={{ width: '80px', height: '80px', margin: '0 auto' }}>
                                {/* 🔥 USAMOS EL COMPONENTE PARCHEADO LottiePlayer EN VEZ DE Lottie 🔥 */}
                                <LottiePlayer 
                                  animationData={est.animation} 
                                  loop={true} 
                                  autoplay={true} 
                                  style={{ width: '60px', height: '60px' }}
                                />
                            </div>
                            <div className="ec-estructura-info">
                                <h4>{est.title}</h4>
                                <div className="ec-estructura-contenido-row">
                                    <p>{est.desc}</p>
                                </div>
                            </div>
                            
                            {/* 🔥 El botón lo sacamos de la row de texto para posicionarlo libremente 🔥 */}
                            <button 
                                className="ec-btn-ver-ejemplo" 
                                onClick={() => setImagenModal(est.img)}
                                title="Ver ejemplo"
                            >
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                            
                        </motion.div>
                    ))}
                </div>
            </section>

            <AnimatePresence>
                {imagenModal && (
                    <motion.div 
                        className="ec-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setImagenModal(null)} // Cierra al hacer clic fuera
                    >
                        <motion.div 
                        className="ec-modal-content"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()} // Evita que se cierre al clicar la foto
                        >
                        <button className="ec-modal-close-btn" onClick={() => setImagenModal(null)}>
                            <i className="ec-fa-solid fa-xmark"></i>
                        </button>
                        <div className="ec-modal-body-img">
                            <img src={imagenModal} alt="Ejemplo de estructura web" />
                        </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default EcommercePlanes;