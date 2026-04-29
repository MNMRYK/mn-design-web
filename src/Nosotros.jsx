import React, { useEffect } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"; 
import "lenis/dist/lenis.css";

import NosotrosHero from './NosotrosHero';
// Aquí importarás las siguientes secciones cuando las hagas

const Nosotros = () => {
  
  // --- TODA LA MAGIA DE GSAP Y LENIS ---
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    const timer = setTimeout(() => {
      ScrollTrigger.create({
        // 🔥 IMPORTANTE: Usamos una clase única para esta página 🔥
        trigger: ".nosotros-hero-pin", 
        start: "top top",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        refreshPriority: 1
      });
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
      {/* 1. LA ZONA QUE SE QUEDA PEGADA (EL HERO) */}
      <div className="nosotros-hero-pin">
        <NosotrosHero />
      </div>
      
      {/* 2. LA ZONA QUE PASA POR ENCIMA COMO UN TELÓN */}
      {/* Reutilizamos tu clase main-content-area que ya tiene su z-index y su fondo */}
      <div className="main-content-area">
        
        {/* 🔥 ESTO ES TEMPORAL 🔥: 
            Como aún no hemos hecho más secciones, te pongo este bloque gigante 
            para que puedas hacer scroll hacia abajo y ver cómo el Hero se queda pillado.
            Cuando hagamos la siguiente sección, borras este div. */}
        <div style={{ height: "150vh", display: "flex", justifyContent: "center", alignItems: "center", borderTop: "2px dashed #a37dfa" }}>
           <h2 style={{ color: "var(--deep-eggplant)" }}>
             Haz scroll... ¡La siguiente sección tapará el Hero!
           </h2>
        </div>

        {/* <TuSiguienteSeccion /> */}
        
      </div>
    </>
  );
};

export default Nosotros;