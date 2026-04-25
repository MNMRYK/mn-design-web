import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"; // 1. IMPORTAMOS LENIS
import "lenis/dist/lenis.css";
import Grainient from "./Inicio/GrainientBackground";
import Navbar from './Inicio/Navbar';
import Hero from './Inicio/Hero';
import Servicios from './Inicio/Servicios';
import Tecnologias from './Inicio/Tecnologias';
import Soluciones from './Inicio/Soluciones';
import Beneficios from './Inicio/Beneficios';
import ContactoDoble from './Inicio/ContactoDoble';
import CallToActionFinal from './Inicio/CallToActionFinal';
import Footer from './Inicio/Footer';
import "./App.css";
import "./Inicio/Navbar.css";


function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // --- CONFIGURACIÓN DE LENIS (SCROLL LÍQUIDO) ---
    const lenis = new Lenis({
      duration: 1.2, // Tiempo que tarda en frenar
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
    });

    // --- SINCRONIZAMOS LENIS CON GSAP ---
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);
    // ---------------------------------------------

    // --- TU CÓDIGO ORIGINAL DEL HERO ---
    const timer = setTimeout(() => {
      ScrollTrigger.create({
        trigger: ".hero-section-container",
        start: "top top",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        refreshPriority: 1
      });
      
      // Refrescamos para que detecte bien la altura de Servicios
      ScrollTrigger.refresh();
    }, 100); 

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
      lenis.destroy(); // <-- 3. MATAMOS A LENIS AL DESMONTAR
    };
  }, []);

  // App.jsx
  return (
    <div className="app-wrapper">
      <main>
        <Navbar />
        <div className="hero-section-container">
          <Grainient /> 
          <Hero />      
        </div>

        {/* ENVOLVEMOS TODO EL CONTENIDO POST-HERO */}
        <div className="main-content-area">
          <section className="servicios-wrapper">
            <Servicios />
          </section>
          
          <section className="tech-section-wrapper">
            <Tecnologias />
          </section>

          <section className="soluciones-section-wrapper">
            <Soluciones />
          </section>

          <section className="beneficios-wrapper">
            <Beneficios />
          </section>

          {/* --- NUEVA SECCIÓN DE CONTACTO DIVIDIDA --- */}
          <section className="contacto-section-wrapper">
            <ContactoDoble />
          </section>

          <CallToActionFinal />

          <Footer />

          {/* Botón flotante de WhatsApp */}
          <a 
            href="https://api.whatsapp.com/send?phone=34645854934&text=Hola,%20estoy%20interesado%20en%20presupuestar%20un%20servicio" 
            className="whatsapp-float" 
            target="_blank" 
            rel="noreferrer"
            aria-label="Contactar por WhatsApp"
          >
            <i className="fa-brands fa-whatsapp"></i>
          </a>
        </div>
      </main>
    </div>
  );
}
export default App;