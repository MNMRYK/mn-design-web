
import React, { useEffect } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"; 
import "lenis/dist/lenis.css";

import DisenoWebSiguiente from './DisenoWeb/DisenoWebSiguiente.jsx';
import DisenoWebSeccionesEspeciales from './DisenoWeb/DisenoWebSeccionesEspeciales.jsx';
import ResponsiveShowcase from './DisenoWeb/ResponsiveShowcase.jsx';
import DisenoDoble from './DisenoWeb/DisenoDoble.jsx';

const DisenoWeb = () => {
  

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


    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      lenis.destroy(); 
    };
  }, []);

  return (
    <>
      
      <div className="disenoweb-page-wrapper">

          <DisenoWebSiguiente />
          <DisenoWebSeccionesEspeciales />
          <ResponsiveShowcase />
          <DisenoDoble />
          
      </div>
    </>
  );
};

export default DisenoWeb;