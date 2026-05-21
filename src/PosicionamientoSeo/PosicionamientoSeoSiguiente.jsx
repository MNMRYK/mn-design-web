import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './PosicionamientoSeoSiguiente.css';
import { World } from './AceternityGlobe';

import Lottie from "lottie-react";
import animGrafico from "../assets/animations/seo/graficoseo.json";
import animVelocimetro from "../assets/animations/seo/velocimetro.json";
import animContenido from "../assets/animations/seo/contenido.json";
import animSeo from '../assets/animations/seo/seo.json';

const TypingAnimation = ({ text }) => {
  // Separamos primero por palabras para que el navegador no las rompa
  const words = text.split(" ");

    return (
        <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
            visible: { transition: { staggerChildren: 0.015 } }, // Un poco más rápido para que sea fluido
            hidden: {}
        }}
        >
        {words.map((word, wordIndex) => (
            // Envolvemos cada palabra en un span que no se puede romper (nowrap)
            <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap", marginRight: "0.25em" }}>
            {word.split("").map((char, charIndex) => (
                <motion.span
                key={charIndex}
                variants={{
                    hidden: { opacity: 0, display: "none" },
                    visible: { opacity: 1, display: "inline-block" }
                }}
                >
                {char}
                </motion.span>
            ))}
            </span>
        ))}
        </motion.span>
    );
};

const LottiePlayer = Lottie.default || Lottie;

const PosicionamientoSeoSiguiente = () => {
    const features = [
        { 
        title:  "Auditoría SEO On-Page",  
        animation: animSeo 
        },
        { 
        title: "Optimización de Contenidos", 
        animation: animContenido 
        },
        { 
        title: "Core Web Vitals", 
        animation: animVelocimetro 
        },
        { 
        title: "Autoridad y Linkbuilding", 
        animation: animGrafico 
        }
    ];

    // DEFINIMOS LAS VARIABLES AQUÍ DENTRO
    const globeConfig = {
        pointSize: 1,
        globeColor: "#381e69", 
        showAtmosphere: true,
        atmosphereColor: "#7E57C2",
        atmosphereAltitude: 0.1,
        emissive: "#1A102D",
        emissiveIntensity: 0.1,
        shininess: 0.9,
        polygonColor: "#ffffff",
        ambientLight: "#7E57C2",
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 2000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        autoRotate: true,
        autoRotateSpeed: 0.5,
    };

    // 🔥 Tres puntos de origen en España disparando al mundo
    const sampleArcs = [
        // Desde Alcoy/Alicante (38.69, -0.47)
        { order: 1, startLat: 38.6983, startLng: -0.4736, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3, color: "#7E57C2" }, // NY
        { order: 2, startLat: 38.6983, startLng: -0.4736, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.5, color: "#efebfc" }, // Buenos Aires

        // Desde Madrid (40.41, -3.70)
        { order: 3, startLat: 40.4168, startLng: -3.7038, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.2, color: "#b388ff" }, // Londres
        { order: 4, startLat: 40.4168, startLng: -3.7038, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.5, color: "#7E57C2" }, // Tokio
        { order: 5, startLat: 40.4168, startLng: -3.7038, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.6, color: "#efebfc" }, // Sidney

        // Desde Barcelona (41.38, 2.17)
        { order: 6, startLat: 41.3851, startLng: 2.1734, endLat: 48.8566, endLng: 2.3522, arcAlt: 0.1, color: "#7E57C2" }, // París
        { order: 7, startLat: 41.3851, startLng: 2.1734, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.4, color: "#b388ff" }, // Río de Janeiro
        { order: 8, startLat: 41.3851, startLng: 2.1734, endLat: 19.4326, endLng: -99.1332, arcAlt: 0.4, color: "#efebfc" }, // México DF
    ];

    return (
        <section className="seo-section">
            <div className="seo-detalle-container">
                <div className="seo-badge">
                    <Link to="/" className="breadcrumb-link">INICIO</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">SEO</span>
                </div>

                <motion.div className="seo-header" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="seo-title">
                        <div className="seo-title-phrase-one">
                            Atrae clientes en piloto automático y <br />Domina tu sector en Google
                        </div>
                        <span className="seo-text-gradient">Servicios de <br />Posicionamiento Web SEO</span>
                    </h1>
                </motion.div>

                <div className="seo-main-grid">
                    <motion.div 
                        className="seo-columna-izq"
                        initial={{ opacity: 0, x: -30 }} 
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="seo-detalle-textos">
                            <p>
                                Tener una web espectacular no sirve de nada si nadie la visita. Tu cliente ideal ya está buscando tus servicios en Google; nuestro objetivo es asegurar que <strong>te encuentren a ti antes que a tu competencia</strong>. Dejamos las suposiciones a un lado y diseñamos estrategias basadas en datos para atraer tráfico cualificado.
                            </p>
                            <p>
                                Más allá de ajustar palabras clave, optimizamos la arquitectura técnica y el rendimiento de tu sitio para que tanto a Google como a tus usuarios les encante navegar por él. Convertimos tu página en un <strong>activo rentable que genera confianza y ventas</strong> las 24 horas del día.
                            </p>
                            <motion.p className="seo-texto-destacado" whileHover={{ scale: 1.02 }}>
                                <TypingAnimation text="Cada búsqueda es una oportunidad de venta perdida si no estás en la primera página. Hagamos que tu negocio sea la única respuesta lógica cuando alguien necesite lo que ofreces." />
                            </motion.p>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="seo-imagen-wrapper"
                        initial={{ opacity: 0, scale: 0.9 }} 
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <div className="resplandor-seo"></div>
                        {/* El contenedor con altura fija es obligatorio para Three.js */}
                        <div className="globe-canvas-container">
                            <World data={sampleArcs} globeConfig={globeConfig} />
                        </div>
                    </motion.div>
                </div>

                <div className="seo-features">
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index} 
                            className="feat-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            whileHover={{ y: -5 }} /* Pequeño saltito al pasar el ratón */
                        >

                            {/* Contenedor de la animación */}
                            <div className="feat-icon-wrapper">
                                <LottiePlayer 
                                    animationData={feature.animation} 
                                    loop={true} 
                                    autoplay={true} 
                                />
                            </div>

                            <span>{feature.title}</span>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PosicionamientoSeoSiguiente;

