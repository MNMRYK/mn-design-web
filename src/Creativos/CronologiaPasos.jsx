import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { esPrerender } from "../utils/prerender";
import "./Creativos.css";

// Cronología "Cómo trabajamos" de /branding/ y /redes-sociales/.
// Misma idea que RutaTrabajo de la home (GSAP + ScrollTrigger, limpieza con gsap.context): la
// línea avanza con el scroll y cada punto se enciende y muestra su texto cuando la línea llega.
// - Escritorio: horizontal. Móvil: vertical.
// - Con "reducir movimiento" (y en el prerender) no se anima: todo visible desde el principio.
//   El texto está siempre en el HTML; GSAP solo lo oculta en el navegador antes de animarlo.
const CronologiaPasos = ({ etiqueta, titulo, pasos }) => {
  const raizRef = useRef(null);

  useEffect(() => {
    if (esPrerender) return undefined;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          escritorio: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          movil: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        ({ conditions }) => {
          const horizontal = conditions.escritorio;
          const lista = raizRef.current.querySelector(".cronologia-lista");
          const linea = raizRef.current.querySelector(".cronologia-linea");
          const progreso = raizRef.current.querySelector(".cronologia-progreso");
          const nodos = gsap.utils.toArray(".cronologia-nodo", raizRef.current);
          const contenidos = gsap.utils.toArray(".cronologia-contenido", raizRef.current);

          // En vertical, la línea va del centro del primer punto al del último (se mide en cada
          // refresh: cambio de ancho, fuentes cargadas…)
          const ajustarLinea = () => {
            if (horizontal) {
              gsap.set(linea, { clearProps: "height" });
              return;
            }
            const primero = nodos[0].getBoundingClientRect();
            const ultimo = nodos[nodos.length - 1].getBoundingClientRect();
            gsap.set(linea, { height: ultimo.top - primero.top });
          };
          ajustarLinea();

          const eje = horizontal ? "scaleX" : "scaleY";
          gsap.set(progreso, { [eje]: 0 });
          gsap.set(contenidos, { opacity: 0, [horizontal ? "y" : "x"]: 16 });
          gsap.set(nodos, { scale: 0.7, opacity: 0.45 });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: lista,
              start: horizontal ? "top 85%" : "top 70%",
              end: horizontal ? "bottom 25%" : "bottom 55%",
              scrub: 0.6,
              invalidateOnRefresh: true,
              onRefresh: ajustarLinea,
            },
          });

          tl.to(progreso, { [eje]: 1, duration: 1 }, 0);

          nodos.forEach((nodo, i) => {
            // Momento en que la línea llega a este punto
            const momento = nodos.length === 1 ? 0 : (i / (nodos.length - 1)) * 0.94;
            tl.to(
              nodo,
              {
                scale: 1,
                opacity: 1,
                backgroundColor: "#7E57C2",
                borderColor: "#ffffff",
                boxShadow: "0 0 22px rgba(166, 114, 255, 0.9)",
                duration: 0.06,
              },
              momento,
            );
            tl.to(contenidos[i], { opacity: 1, x: 0, y: 0, duration: 0.12 }, momento);
          });
        },
      );
    }, raizRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="creativos-seccion" aria-labelledby="cronologia-titulo">
      <div className="creativos-contenedor">
        <div className="cronologia tema-oscuro" ref={raizRef} style={{ "--pasos": pasos.length }}>
          <p className="creativos-etiqueta creativos-etiqueta--clara">{etiqueta}</p>
          <h2 id="cronologia-titulo" className="cronologia-titulo">
            {titulo}
          </h2>

          <div className="cronologia-pista">
            <div className="cronologia-linea" aria-hidden="true">
              <div className="cronologia-progreso">
                <span className="cronologia-punta" />
              </div>
            </div>
            <ol className="cronologia-lista">
              {pasos.map((paso, i) => (
                <li className="cronologia-paso" key={paso.titulo}>
                  <span className="cronologia-nodo" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className="cronologia-contenido">
                    <h3 className="cronologia-paso-titulo">{paso.titulo}</h3>
                    <p className="cronologia-paso-texto">{paso.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CronologiaPasos;
