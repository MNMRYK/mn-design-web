import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { esPrerender } from "../utils/prerender";
import Icono from "../utils/Icono";
import "../Creativos/Creativos.css";

// "Cómo funciona un proyecto de branding" (/branding/): las 7 fases que pasó Lara, con sus
// textos exactos (contenido-lara/textos-lara.md). Cronología VERTICAL en todos los tamaños.
// En escritorio, la columna izquierda (intro, nota, botón e indicador de fase) se queda fija
// mientras se recorren las fases: con un pin de ScrollTrigger, porque position: sticky no
// funciona en esta web (el overflow-x: hidden de html/body lo anula).
// La línea avanza con el scroll (su punta va a la altura del 60 % de la pantalla) y cada fase
// se enciende cuando la línea llega a su punto; al volver hacia arriba se apaga.
// GSAP + ScrollTrigger con gsap.context; solo transform y opacity. Con "reducir movimiento" y en
// el prerender no se anima: todo visible y activo (el indicador cambia, pero sin transiciones).
export const FASES = [
  { nombre: "Discovery", icono: "magnifying-glass", texto: "Conocer el negocio, sus objetivos, audiencia y necesidades." },
  { nombre: "Estrategia", icono: "bullseye", texto: "Definir posicionamiento, personalidad y diferenciación de la marca." },
  { nombre: "Dirección creativa", icono: "palette", texto: "Investigar referencias, crear moodboards y proponer conceptos visuales." },
  { nombre: "Identidad visual", icono: "shapes", texto: "Desarrollar los elementos gráficos que representan la marca." },
  { nombre: "Aplicaciones", icono: "mobile-screen-button", texto: "Trasladar esa identidad a web, redes, packaging u otros soportes." },
  { nombre: "Guía de marca", icono: "book", texto: "Documentar cómo debe utilizarse la identidad." },
  { nombre: "Activación", icono: "bullhorn", texto: "Desarrollar campañas, imágenes, vídeos y contenido para poner esa identidad en práctica." },
];

const ALTURA = "60%"; // altura de la pantalla a la que va la punta de la línea
const MARGEN_MENU = 110; // la columna izquierda se fija justo debajo del menú

const FasesBranding = () => {
  const raizRef = useRef(null);
  const [activa, setActiva] = useState(0);

  useEffect(() => {
    if (esPrerender) return undefined;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const raiz = raizRef.current;
      const linea = raiz.querySelector(".fases-linea");
      const nodos = gsap.utils.toArray(".cronologia-nodo", raiz);

      // La línea va del centro del primer punto al del último
      const ajustarLinea = () => {
        const lista = raiz.querySelector(".fases-lista").getBoundingClientRect();
        const primero = nodos[0].getBoundingClientRect();
        const ultimo = nodos[nodos.length - 1].getBoundingClientRect();
        gsap.set(linea, {
          top: primero.top + primero.height / 2 - lista.top,
          height: ultimo.top - primero.top,
        });
      };

      // Escritorio: columna izquierda fija + indicador de fase (también con "reducir movimiento":
      // fijar la columna no es una animación, y el indicador cambia sin transiciones)
      mm.add("(min-width: 901px)", () => {
        const intro = raiz.querySelector(".fases-intro");
        const cuerpo = raiz.querySelector(".fases-cuerpo");
        ScrollTrigger.create({
          trigger: intro,
          start: `top ${MARGEN_MENU}px`,
          endTrigger: cuerpo,
          end: () => `bottom ${MARGEN_MENU + intro.offsetHeight}px`,
          pin: intro,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });

        // Fase activa: la última cuyo punto ya ha alcanzado la línea
        nodos.forEach((nodo, i) => {
          ScrollTrigger.create({
            trigger: nodo,
            start: `center ${ALTURA}`,
            onEnter: () => setActiva(i),
            onLeaveBack: () => setActiva(Math.max(0, i - 1)),
          });
        });

        // Barra del indicador, sincronizada con la línea vertical
        gsap.fromTo(
          raiz.querySelector(".fases-indicador-progreso"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: linea, start: `top ${ALTURA}`, end: `bottom ${ALTURA}`, scrub: 0.4 },
          },
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const progreso = raiz.querySelector(".fases-progreso");
        const rellenos = gsap.utils.toArray(".cronologia-nodo-relleno", raiz);
        const contenidos = gsap.utils.toArray(".fases-contenido", raiz);
        ajustarLinea();

        gsap.set(progreso, { scaleY: 0 });
        gsap.set(rellenos, { opacity: 0, scale: 0.6 });
        gsap.set(contenidos, { opacity: 0.35, x: 12 });

        gsap.to(progreso, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: linea,
            start: `top ${ALTURA}`,
            end: `bottom ${ALTURA}`,
            scrub: 0.4,
            invalidateOnRefresh: true,
            onRefresh: ajustarLinea,
          },
        });

        nodos.forEach((nodo, i) => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: nodo,
                start: `center ${ALTURA}`,
                toggleActions: "play none none reverse",
              },
            })
            .to(rellenos[i], { opacity: 1, scale: 1, duration: 0.3 }, 0)
            .to(nodo, { scale: 1.12, duration: 0.3 }, 0)
            .to(contenidos[i], { opacity: 1, x: 0, duration: 0.35 }, 0);
        });
      });
    }, raizRef);

    return () => ctx.revert();
  }, []);

  const fase = FASES[activa];

  return (
    <section className="creativos-seccion" aria-labelledby="fases-titulo">
      <div className="creativos-contenedor">
        <div className="cronologia fases tema-oscuro" ref={raizRef}>
          <div className="fases-intro">
            <p className="creativos-etiqueta creativos-etiqueta--clara">Cómo funciona un proyecto de branding</p>
            <h2 id="fases-titulo" className="cronologia-titulo">
              Así construimos una identidad de marca, fase a fase
            </h2>
            <p className="fases-entradilla">
              Para que tengas una referencia, un proyecto completo suele incluir varias fases.
            </p>

            <div className="fases-nota">
              <p>
                No todos los clientes necesitan todas estas fases. Podemos ofrecer un proyecto integral o
                trabajar en partes concretas, siempre que tengan sentido para las necesidades reales de la
                marca.
              </p>
              <a href="#formas-de-trabajar" className="creativos-btn-secundario">
                Ver las tres formas de trabajar juntos
              </a>
            </div>

            {/* Indicador de progreso (solo escritorio) */}
            <div className="fases-indicador">
              <span className="fases-indicador-icono" key={fase.icono} aria-hidden="true">
                <Icono nombre={fase.icono} />
              </span>
              <div className="fases-indicador-texto">
                <p className="fases-indicador-contador">
                  Fase {activa + 1} de {FASES.length}
                </p>
                {/* La región aria-live es estable; el span interior se vuelve a montar para la transición */}
                <p className="fases-indicador-nombre" aria-live="polite">
                  <span key={fase.nombre}>{fase.nombre}</span>
                </p>
              </div>
              <div className="fases-indicador-barra" aria-hidden="true">
                <span className="fases-indicador-progreso" />
              </div>
            </div>
          </div>

          <div className="fases-cuerpo">
            <div className="fases-pista">
              <div className="fases-linea" aria-hidden="true">
                <div className="fases-progreso">
                  <span className="cronologia-punta" />
                </div>
              </div>
              <ol className="fases-lista">
                {FASES.map((f, i) => (
                  <li className="fases-paso" key={f.nombre}>
                    <span className="cronologia-nodo" aria-hidden="true">
                      <span className="cronologia-nodo-relleno" />
                      <span className="cronologia-nodo-numero">{i + 1}</span>
                    </span>
                    <div className="fases-contenido">
                      <h3 className="cronologia-paso-titulo">{f.nombre}</h3>
                      <p className="cronologia-paso-texto">{f.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FasesBranding;
