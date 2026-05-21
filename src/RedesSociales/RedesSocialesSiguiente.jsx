import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './RedesSocialesSiguiente.css';

import Lottie from "lottie-react";
import animContenido from "../assets/animations/redes/contenido.json";
import animAnalitica from "../assets/animations/redes/analitica.json";
import animCliente from "../assets/animations/redes/cliente.json";
import animPremium from '../assets/animations/redes/premium.json';

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

const ContadorAnimado = ({ end, duration = 1.5 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = end / (duration * 60); // Asumiendo 60fps
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                clearInterval(timer);
                setCount(end);
            } else {
                setCount(start);
            }
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [end, duration]);

    return <span>{count.toFixed(1)}</span>;
};

const LottiePlayer = Lottie.default || Lottie;

const RedesSocialesSiguiente = () => {

    // 🔥 Marketing de alto impacto para Redes Sociales
    const features = [
        { title: "Contenido que Vende", animation: animContenido },
        { title: "Clientes, no solo Likes", animation: animCliente },
        { title: "Imagen 100% Profesional", animation: animPremium },
        { title: "Resultados Demostrables", animation: animAnalitica }
    ];

    return (
        <section className="rs-section">
            <div className="rs-detalle-container">
                <div className="rs-badge">
                    <Link to="/" className="breadcrumb-link">INICIO</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">REDES SOCIALES</span>
                </div>

                <motion.div className="rs-header" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <h1 className="rs-title">
                        <div className="rs-title-phrase-one">Deja de ser invisible en redes sociales</div>
                        <span className="rs-text-gradient">Estrategia para convertir<br /> seguidores en clientes reales</span>
                    </h1>
                </motion.div>

                <div className="rs-main-grid">
                    <div className="rs-columna-izq">
                        <motion.div className="rs-detalle-textos" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
                            <p>
                                La <strong>gestión de redes sociales</strong> no va de publicar por publicar ni de coleccionar <em>likes</em> vacíos; va de convertir tus perfiles en un imán de ventas continuo. Nos olvidamos de las métricas de vanidad y ejecutamos estrategias de <strong>social media marketing</strong> diseñadas para lo que de verdad importa: crear comunidad, generar confianza y aumentar tu facturación.
                            </p>
                            <p>
                                Construimos una narrativa visual y textual que demuestra por qué el cliente debe elegirte a ti y no a tu competencia. Diseñamos contenido estratégico que humaniza tu marca, te posiciona como líder de tu sector y transforma a tus seguidores en clientes fieles.
                            </p>
                            <motion.p className="rs-texto-destacado" whileHover={{ scale: 1.02 }}>
                                <TypingAnimation text="Un perfil inactivo o sin estrategia es como tener el escaparate de tu negocio apagado. Hagamos que tu marca sea la única opción que tu cliente ideal quiera seguir, recomendar y comprar." /> 
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* COLUMNA DERECHA: Resplandor + Tarjeta Flotante + Analíticas Animadas */}
                    <div className="rs-columna-der">
                        <div className="rs-imagen-wrapper">

                            {/* Wrapper para la animación de ENTRADA (Aparece desde abajo) */}
                            <motion.div 
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                style={{ width: '100%', display: 'flex', justifyContent: 'center', zIndex: 2 }}
                            >
                                {/* Tarjeta para la animación de FLOTAR (Infinito) */}
                                <motion.div 
                                    className="rs-analytics-card tema-oscuro"
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(126, 87, 194, 0.4)" }}
                                >
                                    <div className="rs-card-header">
                                        <div className="rs-card-title-group">
                                            <span className="rs-icon-chart">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2ed573" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                                                    <polyline points="16 7 22 7 22 13"></polyline>
                                                </svg>
                                            </span>
                                            <h4>Rendimiento Mensual</h4>
                                        </div>
                                        <span className="rs-live-badge">● Live</span>
                                    </div>

                                    <div className="rs-metrics-grid">
                                        <div className="rs-metric-item">
                                            <p>Cuentas Alcanzadas</p>
                                            <h3><ContadorAnimado end={124.5} />K</h3>
                                            <motion.span 
                                                className="rs-positive"
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1, duration: 0.5 }}
                                            >↑ 34.2%</motion.span>
                                        </div>
                                        <div className="rs-metric-item">
                                            <p>Interacciones</p>
                                            <h3><ContadorAnimado end={18.2} />K</h3>
                                            <motion.span 
                                                className="rs-positive"
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1.2, duration: 0.5 }}
                                            >↑ 12.8%</motion.span>
                                        </div>
                                    </div>

                                    <div className="rs-mini-chart">
                                        {/* Las barras suben progresivamente creando un efecto de gráfica de crecimiento */}
                                        <motion.div className="rs-bar" initial={{ height: 0 }} whileInView={{ height: '40%' }} transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}></motion.div>
                                        <motion.div className="rs-bar" initial={{ height: 0 }} whileInView={{ height: '60%' }} transition={{ duration: 1.2, delay: 0.7, ease: "easeOut" }}></motion.div>
                                        <motion.div className="rs-bar" initial={{ height: 0 }} whileInView={{ height: '45%' }} transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}></motion.div>
                                        <motion.div className="rs-bar" initial={{ height: 0 }} whileInView={{ height: '80%' }} transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}></motion.div>
                                        <motion.div className="rs-bar rs-bar-highlight" initial={{ height: 0 }} whileInView={{ height: '100%' }} transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}></motion.div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="rs-features">
                    {features.map((feature, index) => (
                        <motion.div key={index} className="rs-feat-card" whileHover={{ y: -5 }}>
                            <div className="rs-feat-animation-wrapper">
                                {/* 🔥 AHORA SÍ ESTÁ LA ETIQUETA LOTTIE 🔥 */}
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

export default RedesSocialesSiguiente;