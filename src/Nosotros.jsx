// Archivo: Nosotros/Nosotros.jsx
import React, { useEffect } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"; 
import "lenis/dist/lenis.css";

import NosotrosHero from './Nosotros/NosotrosHero';
import MetodologiaSticky from './Nosotros/MetodologiaSticky';
import DamosForma from './Nosotros/DamosForma';

const Nosotros = () => {
  
  // --- TODA LA MAGIA DEL SCROLL SUAVE (LENIS) ---
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

    // 🔥 HEMOS BORRADO EL CÓDIGO QUE ANCLABA EL HERO 🔥
    // Ahora todo fluirá hacia abajo de forma natural.

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      lenis.destroy(); 
    };
  }, []);

  return (
    <>
      
      <div className="nosotros-page-wrapper">

        <NosotrosHero />
        <MetodologiaSticky />
        <DamosForma />
        
      </div>
    </>
  );
};

export default Nosotros;