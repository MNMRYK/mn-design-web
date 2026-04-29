import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './MetodologiaSticky.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pasos = [
  { id: '01', titulo: 'Arquitectura', desc: 'Cimentamos tu éxito con una estructura lógica y optimizada basándonos en la psicología de tu cliente.' },
  { id: '02', titulo: 'Diseño UI/UX', desc: 'Creamos interfaces exclusivas que no solo son visualmente impactantes, sino que guían a la compra.' },
  { id: '03', titulo: 'Desarrollo', desc: 'Programamos a medida con React y animaciones GSAP para que tu web sea rápida y fluida como una app.' },
  { id: '04', titulo: 'Lanzamiento', desc: 'Auditamos el rendimiento extremo y el SEO para que estés listo para conquistar el mercado.' }
];

const MetodologiaSticky = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  useGSAP(() => {
    const circumference = 2 * Math.PI * 160;

    // Seteamos el estado inicial
    gsap.set(".progress-ring", { 
      strokeDasharray: circumference, 
      strokeDashoffset: circumference 
    });

    // --- 1. EL CÍRCULO: Se dibuja de 0 a 100 siguiendo el scroll de TODO el contenedor ---
    gsap.to(".progress-ring", {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center", 
        end: "bottom center",
        scrub: 1, // Esto hace que el dibujo siga el dedo/ratón perfectamente
      }
    });

    // --- 2. LOS PUNTOS Y TEXTOS: Se activan al pasar por cada bloque ---
    const stepBoxes = gsap.utils.toArray('.step-box');
    
    stepBoxes.forEach((step, i) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          // Encender Punto
          gsap.to(`.dot-${i}`, { fill: "#a672ff", stroke: "#a672ff", scale: 1.5, duration: 0.4 });
          // Cambiar texto central
          if(titleRef.current) titleRef.current.textContent = pasos[i].id;
          if(descRef.current) descRef.current.textContent = pasos[i].titulo;
          gsap.fromTo([titleRef.current, descRef.current], { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
        },
        onLeaveBack: () => {
          // Apagar Punto al volver arriba
          gsap.to(`.dot-${i}`, { fill: "#0a0118", stroke: "rgba(166,114,255,0.3)", scale: 1, duration: 0.4 });
          // Volver al texto anterior
          if(i > 0) {
            if(titleRef.current) titleRef.current.textContent = pasos[i-1].id;
            if(descRef.current) descRef.current.textContent = pasos[i-1].titulo;
          }
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section className="metodologia-container" ref={containerRef}>
      <div className="metodologia-left">
        {pasos.map((paso) => (
          <div key={paso.id} className="step-box">
            <span className="step-id">{paso.id}</span>
            <h2 className="step-heading">{paso.titulo}</h2>
            <p className="step-body">{paso.desc}</p>
          </div>
        ))}
      </div>

      <div className="metodologia-right">
        <div className="svg-wrapper">
          <svg viewBox="0 0 400 400" className="circle-graphic">
            <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(166, 114, 255, 0.05)" strokeWidth="1" />
            <circle className="progress-ring" cx="200" cy="200" r="160" fill="none" stroke="#a672ff" strokeWidth="6" strokeLinecap="round" transform="rotate(-90 200 200)" />
            
            {/* Los 4 puntos */}
            <circle cx="200" cy="40" r="10" className="dot dot-0" fill="#0a0118" stroke="rgba(166,114,255,0.3)" strokeWidth="3" />
            <circle cx="360" cy="200" r="10" className="dot dot-1" fill="#0a0118" stroke="rgba(166,114,255,0.3)" strokeWidth="3" />
            <circle cx="200" cy="360" r="10" className="dot dot-2" fill="#0a0118" stroke="rgba(166,114,255,0.3)" strokeWidth="3" />
            <circle cx="40" cy="200" r="10" className="dot dot-3" fill="#0a0118" stroke="rgba(166,114,255,0.3)" strokeWidth="3" />

            <text ref={titleRef} x="200" y="190" textAnchor="middle" fill="#efebfc" fontSize="60" fontWeight="900" fontFamily="Montserrat">01</text>
            <text ref={descRef} x="200" y="235" textAnchor="middle" fill="rgba(239, 235, 252, 0.6)" fontSize="18" fontWeight="800" fontFamily="Montserrat" textTransform="uppercase" letterSpacing="2">Arquitectura</text>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default MetodologiaSticky;