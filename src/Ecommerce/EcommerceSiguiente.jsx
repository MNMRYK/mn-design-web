import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './EcommerceSiguiente.css';
import OrbitingCircles from './OrbitingCircles';

import Lottie from "lottie-react";
import animPago from "../assets/animations/ecommerce/pago.json";
import animVer from "../assets/animations/ecommerce/ver.json";
import animGestionn from "../assets/animations/ecommerce/gestion.json";
import aniDiseno from '../assets/animations/diseno-de-interfaz-de-usuario.json';

const LottiePlayer = Lottie.default || Lottie;

const EcommerceSiguiente = () => {
    const features = [
        { 
        title: "Pagos Seguros",  
        animation: animPago 
        },
        { 
        title: "Visibilidad IA & SEO", 
        animation: animVer 
        },
        { 
        title: "UX Centrada en Usuario", 
        animation: aniDiseno 
        },
        { 
        title: "Gestión Inteligente", 
        animation: animGestionn 
        }
    ];

    // 🔥 NUEVO: Función para el scroll suave 🔥
    const scrollToForm = (e) => {
        e.preventDefault(); // Evita el salto brusco
        
        // Buscamos la sección de destino (Asegúrate de poner este ID abajo)
        const formElement = document.querySelector("#formulario-ecommerce");
        
        if (formElement) {
            formElement.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            console.error("❌ ERROR: No encuentro ninguna etiqueta con id='formulario-ecommerce'");
            alert("¡Falta ponerle el id='formulario-ecommerce' a la sección del formulario de abajo!");
        }
    };

    return (
        <section className="ecommerce-section">
            <div className="ecommerce-detalle-container">

                <div className="ecommerce-badge">
                    <Link to="/" className="breadcrumb-link">INICIO</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">E-COMMERCE</span>
                </div>

                <motion.div 
                    className="ecommerce-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="ecommerce-title">
                        <div className="ec-title-phrase-one">
                            Estrategia y tecnología en tu <br />Tienda Online
                        </div>
                        <span className="ec-text-gradient">E-commerce Inteligente</span>
                    </h1>
                </motion.div>

                <div className="ecommerce-main-grid">

                    {/* COLUMNA IZQUIERDA: Título + Textos */}
                    <div className="ecommerce-columna-izq">

                        <motion.div 
                            className="ec-detalle-textos"
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <p>
                                Vender online es mucho más que subir productos a una web. Transformamos tu catálogo en una <strong>herramienta de ventas automatizada</strong> de alto rendimiento. Diseñamos plataformas priorizando una experiencia de usuario (UX) fluida que minimice el abandono de carritos y maximice tu conversión.
                            </p>
                            <p>
                                En <strong>MN Design Web</strong>, nos enfocamos en entregar herramientas que generen beneficios. Desarrollamos cada página respetando los estándares internacionales de programación y optimizando la estructura para el <strong>posicionamiento en buscadores</strong>. Gracias al uso de datos estructurados, facilitamos que Google indexe tu contenido con total eficacia.
                            </p>

                            {/* Contenedor de Botones */}
                            <motion.div 
                                className="ec-hero-botones"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                {/* 🔥 Aquí añadimos el onClick 🔥 */}
                                <a 
                                    href="#formulario-ecommerce" 
                                    onClick={scrollToForm}
                                    className="ec-btn-hero-primario"
                                >
                                    Solicitar Presupuesto
                                </a>
                                <a 
                                    href="https://descubre.mndesignweb.es/aprende-shopify/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="ec-btn-hero-secundario"
                                >
                                    Mentorías Shopify
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* COLUMNA DERECHA: El cuadrado premium con fondo */}
                    <motion.div 
                        className="ecommerce-imagen-wrapper"
                        initial={{ opacity: 0, scale: 0.9 }} 
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <div className="resplandor-imagen"></div>
                        <div className="orbit-wrapper">
                            
                            {/* NÚCLEO CENTRAL FIJO */}
                            <div className="orbit-center-core" title="MN Design Web">
                                <i className="fa-solid fa-server"></i>
                            </div>

                            {/* ÓRBITA INTERIOR (Funcionalidades): 6 Iconos */}
                            <OrbitingCircles radius={120} duration={30}>
                                <div className="orbit-icon-bubble" title="Seguridad">
                                    <img src="/iconos/escudo.svg" alt="Seguridad" />
                                </div>
                                <div className="orbit-icon-bubble" title="Analítica">
                                    <img src="/iconos/analitico.svg" alt="Analítica" />
                                </div>
                                <div className="orbit-icon-bubble" title="Soporte WhatsApp">
                                    <img src="/iconos/apoyo-tecnico.svg" alt="Soporte" />
                                </div>
                                <div className="orbit-icon-bubble" title="Carrito Optimizado">
                                    <img src="/iconos/tienda-online.svg" alt="Tienda" />
                                </div>
                                <div className="orbit-icon-bubble" title="Pagos Seguros">
                                    <img src="/iconos/transferencia-movil.svg" alt="Pagos" />
                                </div>
                                <div className="orbit-icon-bubble" title="Envíos y Logística">
                                    <img src="/iconos/enviado.svg" alt="Envíos" />
                                </div>
                            </OrbitingCircles>
                            
                            {/* ÓRBITA EXTERIOR (Plataformas): 4 Iconos */}
                            <OrbitingCircles radius={200} duration={40} reverse>
                                <div className="orbit-icon-bubble" title="Shopify">
                                    <img src="/shopify.svg" alt="Shopify" />
                                </div>
                                <div className="orbit-icon-bubble" title="WooCommerce">
                                    <img src="/iconos/woocommerce.svg" alt="WooCommerce" /> 
                                </div>
                                <div className="orbit-icon-bubble" title="PrestaShop">
                                    <img src="/prestashop.svg" alt="PrestaShop" />
                                </div>
                                <div className="orbit-icon-bubble custom-code-bubble" title="Desarrollo a Medida">
                                    <img src="/iconos/codigo.svg" alt="Codigo" />
                                </div>
                                <div className="orbit-icon-bubble" title="Integración Amazon">
                                    <img src="/iconos/amazon.svg" alt="Amazon" />
                                </div>
                                <div className="orbit-icon-bubble" title="Google Shopping">
                                    <img src="/iconos/google.svg" alt="Google Shopping" />
                                </div>
                            </OrbitingCircles>
                            
                        </div>
                    </motion.div>

                </div>

                {/* Grid de servicios */}
                <div className="ecommerce-features">
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index} 
                            className="feat-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            whileHover={{ y: -5 }}
                        >
                            {/* Contenedor de la animación */}
                            <div className="feat-animation-wrapper">
                                <LottiePlayer 
                                    animationData={feature.animation} 
                                    loop={true} 
                                    autoplay={true} 
                                />
                            </div>
                            
                            {/* Texto de la tarjeta */}
                            <span>{feature.title}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EcommerceSiguiente;