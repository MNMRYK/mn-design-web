import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RutaTrabajo.css';

const pasos = [
  { id: 1, titulo: "1. Asesoramiento y Estrategia", texto: "Entendemos tu negocio y la esencia de tu marca." },
  { id: 2, titulo: "2. Diseño UX/UI", texto: "Bocetos y diseño visual único, sin plantillas." },
  { id: 3, titulo: "3. Desarrollo", texto: "Código a medida, optimizado para volar en Google." },
  { id: 4, titulo: "4. Lanzamiento y Acompañamiento", texto: "Puesta en marcha y soporte continuo." },
];

const RutaTrabajo = () => {
  const containerRef = useRef(null);
  const lineaProgresoRef = useRef(null);
  const pasosRef = useRef([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const sectionWrapper = containerRef.current.closest('.contacto-section-wrapper');
        // 1. Calculamos la distancia exacta desde el primer punto hasta el último
        const ultimoPaso = pasosRef.current[pasos.length - 1];
        const distanciaTotal = ultimoPaso.offsetTop; 

        // 2. Ajustamos la línea gris de fondo para que termine justo en el último punto
        gsap.set('.ruta-linea-fondo', { height: `${distanciaTotal}px` });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionWrapper,
                start: "top 40px", 
                end: "+=250%",    
                pin: true,        
                scrub: 1,         
                pinSpacing: true, 
                anticipatePin: 1
            }
        });

        // 1. Animamos la línea dentro de la línea de tiempo
        tl.to(lineaProgresoRef.current, {
            height: `${distanciaTotal}px`,
            ease: "none",
            duration: 1
        }, 0); // Empieza en el tiempo 0

        // 2. Animamos cada paso para que aparezca "al toque" de la línea
        pasosRef.current.forEach((paso, index) => {
            const contenido = paso.querySelector('.ruta-contenido');
            const nodo = paso.querySelector('.ruta-nodo');
            
            // Calculamos el momento exacto (proporcional al número de pasos)
            const startAt = distanciaTotal === 0 ? 0 : paso.offsetTop / distanciaTotal;

            // El texto aparece y el nodo brilla
            tl.to(contenido, {
                opacity: 1,
                x: 0,
                duration: 0.2,
            }, startAt);

            tl.to(nodo, {
                backgroundColor: "#A672FF", // var(--electric-violet)
                borderColor: "#ffffff",
                scale: 1.2,
                boxShadow: "0 0 25px #A672FF",
                duration: 0.1,
            }, startAt);
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

  return (
    <div className="ruta-wrapper" ref={containerRef}>
      <h3 className="ruta-titulo-principal">Nuestra metodología</h3>
      
        <div className="ruta-timeline">
            <div className="ruta-linea-fondo"></div>
            <div className="ruta-linea-progreso" ref={lineaProgresoRef}>
                <div className="punta-luminosa"></div>
            </div>

            {pasos.map((paso, index) => (
                <div className="ruta-paso" key={paso.id} ref={el => pasosRef.current[index] = el}>
                    <div className="ruta-nodo"></div>
                    <div className="ruta-contenido" style={{ opacity: 0, transform: 'translateX(20px)' }}>
                        <h4 className="ruta-titulo">{paso.titulo}</h4>
                        <p className="ruta-texto">{paso.texto}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default RutaTrabajo;