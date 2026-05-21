import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FasesRedes.css';

const pasosRedes = [
  { id: 1, titulo: "Fase 1: Auditoría y Puesta a Punto", texto: "Antes de correr, hay que saber andar. Analizamos a tu competencia, optimizamos tu biografía (SEO en Instagram/TikTok) y dejamos tu perfil listo para recibir visitas.", icono: "/auditoria.svg" },
  { id: 2, titulo: "Fase 2: Estrategia y Planificación", texto: "Nada de improvisar. Creamos un calendario editorial mensual basado en pilares de contenido (educar, entretener, vender). Tú apruebas todo.", icono: "/marketing.svg" },
  { id: 3, titulo: "Fase 3: Creación y Gestión (La Magia)", texto: "Diseñamos los posts, editamos los Reels/TikToks con transiciones dinámicas, redactamos textos persuasivos y gestionamos tu comunidad.", icono: "/creacion.svg" },
  { id: 4, titulo: "Fase 4: Análisis y Crecimiento", texto: "A final de mes analizamos qué ha funcionado mejor, qué métricas hemos superado y cómo vamos a escalar los resultados el mes siguiente.", icono: "/diagrama.svg" },
];

const FasesRedes = () => {
  const containerRef = useRef(null);
  const lineaProgresoRef = useRef(null);
  const wrapperRef = useRef(null); // Ref para el wrapper
  const pasosRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Animación inicial de entrada (Sustituye al motion)
    gsap.fromTo(wrapperRef.current, 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", scrollTrigger: { trigger: wrapperRef.current, start: "top 80%" } }
    );

    const ultimoPaso = pasosRef.current[pasosRedes.length - 1];
    if (!ultimoPaso) return;
    
    const distanciaTotal = ultimoPaso.offsetTop - 7;
    gsap.set('.fr-linea-fondo', { height: `${distanciaTotal}px` });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "+=80%",
            scrub: 1,
        }
    });

    tl.to(lineaProgresoRef.current, { height: `${distanciaTotal}px`, ease: "none", duration: 1 }, 0);

    pasosRedes.forEach((_, index) => {
        const paso = pasosRef.current[index];
        const contenido = paso.querySelector('.fr-contenido');
        const nodo = paso.querySelector('.fr-nodo');
        const startAt = paso.offsetTop / distanciaTotal;

        tl.to(contenido, { opacity: 1, x: 0, duration: 0.3 }, startAt);
        tl.to(nodo, { backgroundColor: "#A672FF", borderColor: "#ffffff", scale: 1.3, boxShadow: "0 0 30px rgba(166, 114, 255, 0.8)", duration: 0.2 }, startAt);
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="fr-section-wrapper tema-oscuro" ref={containerRef}>
        {/* Usamos wrapperRef en lugar de motion.section */}
        <div className="fr-ruta-wrapper" ref={wrapperRef}> 
            <div className="fr-header-box">
                <h3 className="fr-titulo-principal">Tu Hoja de Ruta hacia el Crecimiento</h3>
                <p className="fr-subtitulo">Metodología probada, transparente y orientada a resultados reales para que tu marca destaque.</p>
            </div>
        
            <div className="fr-ruta-timeline">
                <div className="fr-linea-fondo"></div>
                <div className="fr-linea-progreso" ref={lineaProgresoRef}>
                    <div className="fr-punta-luminosa"></div>
                </div>

                {pasosRedes.map((paso, index) => (
                    <div className="fr-ruta-paso" key={paso.id} ref={el => pasosRef.current[index] = el}>
                        <div className="fr-nodo"></div>
                        <div className="fr-contenido" style={{ opacity: 0, transform: 'translateX(30px)' }}>
                            <h4 className="fr-titulo fr-titulo-con-icono">
                                <span className="fr-icono-svg" style={{ WebkitMaskImage: `url(${paso.icono})`, maskImage: `url(${paso.icono})` }}></span>
                                {paso.titulo}
                            </h4>
                            <p className="fr-texto">{paso.texto}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default FasesRedes;