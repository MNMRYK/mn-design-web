import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './EcommerceSiguiente.css';
import OrbitingCircles from './OrbitingCircles';

import Lottie from "lottie-react";
import animPago from "../assets/animations/ecommerce/pago.json";
import animVer from "../assets/animations/ecommerce/ver.json";
import animGestionn from "../assets/animations/ecommerce/gestion.json";
import aniDiseno from '../assets/animations/diseno-de-interfaz-de-usuario.json';

/* =========================================================
   COMPONENTE 1: EFECTO TEXTO DECODIFICADO (Corregido y Suave)
   ========================================================= */
const EfectoDecodificador = ({ text }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

  const dispararEfecto = () => {
    if (isAnimating) return; // Si ya está animando, no hacemos nada
    setIsAnimating(true);
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        text.split('').map((letter, index) => {
          if (index < iteration) return text[index]; // Letra ya resuelta
          
          // 🔥 EL SECRETO: Si es un espacio, lo dejamos en paz para no romper los márgenes
          if (letter === ' ') return ' '; 
          
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
      
      iteration += 1.5; // 🔥 Aumentamos la velocidad a 1.5 para que vaya rápido y "poco a poco"
    }, 20); // Intervalo más corto (20ms) para que sea súper fluido
  };

  // Lanzamos el efecto de forma automática la primera vez que carga
  useEffect(() => {
    dispararEfecto();
  }, []);

  return (
    <span 
      onMouseEnter={dispararEfecto} // Y se repite si le pasan el ratón por encima
      style={{ display: 'inline-block' }}
    >
      {displayText}
    </span>
  );
};

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
                            Estrategia y tecnología en tu <br />Tienda online
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

                            {/* AQUÍ VA EL NUEVO EFECTO DECODIFICADOR AL PASAR EL RATÓN */}
                            <motion.p 
                                className="ec-texto-destacado"
                                whileHover={{ scale: 1.02 }}
                            >
                                <EfectoDecodificador text="Ya sea para automatizar tus ventas o escalar tu facturación, diseñamos la plataforma de e-commerce que tu negocio necesita para crecer." />
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* COLUMNA DERECHA: El cuadrado premium con fondo */}
                    <div className="ecommerce-imagen-wrapper">
                        <div className="resplandor-imagen"></div>
                        <div className="orbit-wrapper">
                            
                            {/* NÚCLEO CENTRAL FIJO */}
                            <div className="orbit-center-core" title="MN Design Web">
                                <i className="fa-solid fa-server"></i>
                            </div>

                            {/* ÓRBITA INTERIOR (Funcionalidades): 6 Iconos */}
                            {/* Radio a 120 para que quepan los 6 sin pisarse */}
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
                                {/* Los 2 nuevos que bajamos aquí */}
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
                                    {/* Ojo: asegúrate de subir un icono-woocommerce.svg a tu carpeta public */}
                                    <img src="/iconos/woocommerce.svg" alt="WooCommerce" /> 
                                </div>
                                <div className="orbit-icon-bubble" title="PrestaShop">
                                    {/* Ojo: asegúrate de subir un icono-prestashop.svg a tu carpeta public */}
                                    <img src="/prestashop.svg" alt="PrestaShop" />
                                </div>
                                {/* El nuevo que subimos aquí */}
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
                    </div>

                </div>

                {/* Grid de servicios */}
                <div className="ecommerce-features">
                    {features.map((feature, index) => (
                        <div key={index} className="feat-card">
                            
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EcommerceSiguiente;