import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { esPrerender } from "../utils/prerender";
import "../Creativos/Creativos.css";

// "Cómo funciona un proyecto de branding" (/branding/): las 7 fases que pasó Lara, con sus
// textos exactos (contenido-lara/textos-lara.md).
// - Escritorio: la sección cabe en una pantalla y se queda fija (pin de ScrollTrigger) mientras
//   el scroll recorre las fases (~45 vh por fase); después se suelta. A la derecha, las fases en
//   modo compacto: solo la activa se despliega con su descripción. Las pasadas quedan
//   completadas, las siguientes inactivas. Un clic en una fase también la activa.
// - Tablet y móvil, "reducir movimiento" y prerender: sin pin, todas las fases abiertas; la línea
//   avanza al hacer scroll (con "reducir movimiento", ya completa).
// Las 7 descripciones están siempre en el HTML (plegadas o no).
export const FASES = [
  { nombre: "Discovery", texto: "Conocer el negocio, sus objetivos, audiencia y necesidades." },
  { nombre: "Estrategia", texto: "Definir posicionamiento, personalidad y diferenciación de la marca." },
  { nombre: "Dirección creativa", texto: "Investigar referencias, crear moodboards y proponer conceptos visuales." },
  { nombre: "Identidad visual", texto: "Desarrollar los elementos gráficos que representan la marca." },
  { nombre: "Aplicaciones", texto: "Trasladar esa identidad a web, redes, packaging u otros soportes." },
  { nombre: "Guía de marca", texto: "Documentar cómo debe utilizarse la identidad." },
  { nombre: "Activación", texto: "Desarrollar campañas, imágenes, vídeos y contenido para poner esa identidad en práctica." },
];

const N = FASES.length;
const VH_POR_FASE = 0.45; // recorrido de scroll por fase, en altos de pantalla
const MARGEN_MENU = 80; // el menú fijo mide 65 px (10 de margen + 55): la tarjeta se fija debajo

const FasesBranding = () => {
  const raizRef = useRef(null);
  // "lista": todas abiertas (móvil, reducir movimiento, prerender) · "pin": una abierta (escritorio)
  const [modo, setModo] = useState("lista");
  const [activa, setActiva] = useState(0);
  const [hecho, setHecho] = useState(N - 1); // en modo lista: última fase alcanzada por la línea

  useEffect(() => {
    if (esPrerender) return undefined;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          escritorio: "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
          movil: "(max-width: 900px) and (prefers-reduced-motion: no-preference)",
          reducido: "(prefers-reduced-motion: reduce)",
        },
        ({ conditions }) => {
          if (conditions.reducido) {
            setModo("lista");
            setHecho(N - 1);
            return undefined;
          }

          if (conditions.movil) {
            setModo("lista");
            setHecho(-1);
            // La línea avanza: cada fase se completa cuando su punto llega al 65 % de la pantalla
            gsap.utils.toArray(".fases-paso", raizRef.current).forEach((paso, i) => {
              ScrollTrigger.create({
                trigger: paso,
                start: "top 65%",
                onEnter: () => setHecho(i),
                onLeaveBack: () => setHecho(i - 1),
              });
            });
            return undefined;
          }

          // Escritorio: primero se pasa a modo compacto; el pin se crea en el efecto de abajo,
          // cuando React ya ha pintado ese modo (si no, GSAP mediría la tarjeta con las 7 fases
          // abiertas y le fijaría esa altura)
          setModo("pin");
          setActiva(0);
          return () => setModo("lista");
        },
      );
    }, raizRef);

    return () => ctx.revert();
  }, []);

  // Pin (solo en modo compacto): la tarjeta se queda fija mientras el scroll recorre las fases
  useEffect(() => {
    if (modo !== "pin") return undefined;
    const ctx = gsap.context(() => {
      let ultima = 0; // última fase que ha marcado el scroll (un clic no la cambia)
      ScrollTrigger.create({
        trigger: raizRef.current,
        start: `top ${MARGEN_MENU}px`,
        end: () => `+=${Math.round(window.innerHeight * VH_POR_FASE * N)}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const i = Math.min(N - 1, Math.floor(self.progress * N));
          if (i !== ultima) {
            ultima = i;
            setActiva(i);
          }
        },
      });
      ScrollTrigger.refresh();
    }, raizRef);
    return () => ctx.revert();
  }, [modo]);

  const enPin = modo === "pin";
  // Estado de cada fase: completada / activa / pendiente
  const estado = (i) => {
    if (enPin) return i < activa ? "completada" : i === activa ? "activa" : "pendiente";
    return i <= hecho ? "completada" : "pendiente";
  };
  const abierta = (i) => !enPin || i === activa;
  const avance = enPin ? (activa + 1) / N : (hecho + 1) / N;

  return (
    <section className="creativos-seccion creativos-seccion--fases" aria-labelledby="fases-titulo">
      <div className="creativos-contenedor">
        <div className={`cronologia fases tema-oscuro ${enPin ? "fases--pin" : ""}`} ref={raizRef}>
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

            <div className="fases-barra" aria-hidden="true">
              <span style={{ transform: `scaleX(${avance})` }} />
            </div>
          </div>

          <ol className="fases-lista">
            {FASES.map((fase, i) => (
              <li key={fase.nombre} className="fases-paso" data-estado={estado(i)}>
                <button
                  type="button"
                  className="fases-paso-boton"
                  id={`fase-boton-${i}`}
                  aria-expanded={abierta(i)}
                  aria-controls={`fase-desc-${i}`}
                  onClick={() => enPin && setActiva(i)}
                >
                  <span className="cronologia-nodo" aria-hidden="true">
                    <span className="cronologia-nodo-relleno" />
                    <span className="cronologia-nodo-numero">{i + 1}</span>
                  </span>
                  <span className="fases-paso-nombre">{fase.nombre}</span>
                </button>
                <div
                  className="fases-paso-desc"
                  id={`fase-desc-${i}`}
                  role="region"
                  aria-labelledby={`fase-boton-${i}`}
                >
                  <div>
                    <p className="cronologia-paso-texto">{fase.texto}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default FasesBranding;
