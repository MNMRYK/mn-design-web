import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './MetodologiaSticky.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pasos = [
  { id: '01', titulo: 'Arquitectura', desc: 'La arquitectura es el motor de tu página: nos encargamos de que la navegación sea fluida y de que cada herramienta integrada trabaje para mejorar la interacción con tus clientes. Diseñamos una estructura lógica que guía al usuario de forma intuitiva para generar resultados.', icon: "M3 3h18v18H3z M3 9h18 M9 9v12" }, // Grid de arquitectura
  { id: '02', titulo: 'Diseño UI/UX', desc: 'Estructuramos y optimizamos la información de tu página para que sea clara, persuasiva y aporte valor real a tus visitantes desde el primer segundo, aumentando el posicionamiento en buscadores (SEO).', icon: "M12 2v20 M2 12h20 M12 2l10 10-10 10L2 12z" }, // Diamante/Diseño
  { id: '03', titulo: 'Contenido web', desc: 'Diseñamos una identidad visual única y atractiva que refleja la esencia de tu marca y está enfocada a captar clientes potenciales. Cuidamos cada detalle para ofrecer un diseño profesional que genere confianza y convierta cada visita en una oportunidad real de negocio.', icon: "M4 6h16M4 10h16M4 14h10" }, // Líneas de texto
  { id: '04', titulo: 'Testing', desc: 'Realizamos pruebas exhaustivas de velocidad, adaptabilidad móvil y funcionamiento de todos los enlaces para asegurar que tu web sea perfecta desde el minuto uno.', icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3" } // Check de verificación
];

const MetodologiaSticky = () => {
  const mainRef = useRef(null);
  const triggerRef = useRef(null);
  const iconPathRef = useRef(null);

  useGSAP(() => {
    const circumference = 2 * Math.PI * 160;

    // Seteamos el círculo al inicio
    gsap.set(".progress-ring", { 
      strokeDasharray: circumference, 
      strokeDashoffset: circumference 
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top 100px",
        end: "+=500%", 
        pin: true,
        scrub: 1,
        pinSpacing: true,
      }
    });

    // 🔄 COREOGRAFÍA: Dividimos la línea de tiempo en 4 tramos exactos
    pasos.forEach((paso, i) => {
      const label = `paso${i}`;
      tl.add(label);

      // 1. Dibujar el tramo del círculo (25% cada vez)
      if (i > 0) {
        tl.to(".progress-ring", {
          strokeDashoffset: circumference - (circumference * (i / (pasos.length - 1))),
          ease: "none",
          duration: 1
        }, label);
      }

      // 2. Activar Dot
      tl.to(`.dot-${i}`, { 
        fill: "#a672ff", 
        stroke: "#fff", 
        scale: 1.3, // Escala reducida para que no sea gigante
        filter: "drop-shadow(0 0 10px #a672ff)",
        duration: 0.3 
      }, label);

      // 3. Cambiar Icono Central
      tl.to(iconPathRef.current, {
        attr: { d: paso.icon },
        duration: 0.3,
        ease: "power2.inOut"
      }, label);

      // 4. Cambiar Textos
      tl.to(`.step-item-${i}`, { opacity: 1, y: 0, pointerEvents: 'all', duration: 0.5 }, label);
      
      if (i > 0) {
        tl.to(`.step-item-${i-1}`, { opacity: 0, y: -40, pointerEvents: 'none', duration: 0.5 }, label);
        tl.to(`.dot-${i-1}`, { scale: 1, stroke: "rgba(166,114,255,0.3)", duration: 0.2 }, label);
      }

      // Añadimos un pequeño espacio de "espera" en cada paso
      tl.to({}, { duration: 0.5 });
    });

  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="metodologia-outer">
      <section className="metodologia-pin-trigger" ref={triggerRef}>
        <div className="metodologia-content">
          
          <div className="metodologia-left-carousel">
            {pasos.map((paso, index) => (
              <div key={paso.id} className={`step-carousel-item step-item-${index}`}>
                <span className="step-id">{paso.id}</span>
                <h2 className="step-heading">{paso.titulo}</h2>
                <p className="step-body">{paso.desc}</p>
              </div>
            ))}
          </div>

          <div className="metodologia-right-graphic">
            <div className="svg-wrapper">
              <svg viewBox="0 0 400 400" className="circle-graphic">
                <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(166, 114, 255, 0.05)" strokeWidth="1" />
                <circle className="progress-ring" cx="200" cy="200" r="160" fill="none" stroke="#a672ff" strokeWidth="8" strokeLinecap="round" transform="rotate(-90 200 200)" />
                
                {/* Dots */}
                <circle cx="200" cy="40" r="10" className="dot dot-0" fill="#0a0118" stroke="rgba(166,114,255,0.3)" strokeWidth="3" />
                <circle cx="360" cy="200" r="10" className="dot dot-1" fill="#0a0118" stroke="rgba(166,114,255,0.3)" strokeWidth="3" />
                <circle cx="200" cy="360" r="10" className="dot dot-2" fill="#0a0118" stroke="rgba(166,114,255,0.3)" strokeWidth="3" />
                <circle cx="40" cy="200" r="10" className="dot dot-3" fill="#0a0118" stroke="rgba(166,114,255,0.3)" strokeWidth="3" />

                {/* ICONO CENTRAL */}
                <g className="central-icon-container">
                   <path 
                    ref={iconPathRef}
                    d={pasos[0].icon} 
                    fill="none" 
                    stroke="#fff" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    transform="translate(170, 170) scale(2.5)" 
                   />
                </g>
              </svg>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default MetodologiaSticky;