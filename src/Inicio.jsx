// Archivo: Inicio.jsx
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"; 
import "lenis/dist/lenis.css";

// Importamos todas tus secciones
import Grainient from "./Inicio/GrainientBackground";
import Hero from './Inicio/Hero';
import Servicios from './Inicio/Servicios';
import Tecnologias from './Inicio/Tecnologias';
import Soluciones from './Inicio/Soluciones';
import Beneficios from './Inicio/Beneficios';
import ContactoDoble from './Inicio/ContactoDoble';
import CallToActionFinal from './Inicio/CallToActionFinal';
import BlogPreview from './Nosotros/BlogPreview';

const Inicio = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: true,

      prevent: (node) => {
        if (!node || !node.closest) return false;
        return node.nodeName.includes('TYPEBOT') || node.closest('typebot-bubble') !== null;
      }
      
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    const timer = setTimeout(() => {
      if (window.innerWidth > 768) {
        ScrollTrigger.create({
          trigger: ".hero-section-container",
          start: "top top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          refreshPriority: 1
        });
      }
      ScrollTrigger.refresh();
    }, 100); 

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
      lenis.destroy(); 
    };
  }, []);

  return (
    <>
      <div className="hero-section-container">
        <Grainient /> 
        <Hero />      
      </div>

      <div className="main-content-area">
        <section className="servicios-wrapper"><Servicios /></section>
        <section className="tech-section-wrapper"><Tecnologias /></section>
        <section className="soluciones-section-wrapper"><Soluciones /></section>
        <section className="beneficios-wrapper"><Beneficios /></section>
        <section className="contacto-section-wrapper"><ContactoDoble /></section>
        <section className="blog-preview-wrapper"><BlogPreview /></section>
        <CallToActionFinal />
      </div>
    </>
  );
};

export default Inicio;