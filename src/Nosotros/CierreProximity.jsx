import React, { useEffect, useState, useRef } from 'react';
import VariableProximity from './VariableProximity';
import './CierreProximity.css';

const CierreProximity = () => {
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  // 1. EL VIGILANTE PARA EL EFECTO BLUR
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(containerRef.current);
        }
      },
      { threshold: 0.4 } // Lo bajamos un pelín para que salte un poco antes
    );
    
    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section className="cierre-final-section" ref={containerRef}>
      <div className={`blur-reveal-container ${inView ? 'is-visible' : ''}`}>
        
        {/* 🔥 FRASE NUEVA, MÁS LARGA Y CON MÁS SIGNIFICADO 🔥 */}
        <VariableProximity
          label="NO CREAMOS SIMPLES WEBS, CONSTRUIMOS EL FUTURO DIGITAL DE TU NEGOCIO"
          className="proximity-text-final"
          fromFontVariationSettings="'wght' 700, 'opsz' 20" 
          toFontVariationSettings="'wght' 1000, 'opsz' 60" 
          containerRef={containerRef}
          radius={200}      /* Lo subimos de 150 a 200 para que el "foco" del ratón sea más amplio */
          falloff="gaussian" 
        />
        
      </div>
    </section>
  );
};

export default CierreProximity;