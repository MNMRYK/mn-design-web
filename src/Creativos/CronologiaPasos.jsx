import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { esPrerender } from "../utils/prerender";
import "./Creativos.css";

// Cronología "Cómo trabajamos" de /branding/ y /redes-sociales/.
// Mismo comportamiento que RutaTrabajo de la home (GSAP + ScrollTrigger, limpieza con
// gsap.context): la tarjeta se queda fija (pin + scrub) mientras la línea avanza del 1 al 4;
// cada punto se enciende y muestra su texto al llegar la línea, y la tarjeta se suelta cuando el
// 4 ya está activo. Al volver hacia arriba se revierte.
// - Escritorio: horizontal. Móvil: vertical; si la tarjeta no cabe en la pantalla, sin pin y cada
//   paso se activa al entrar en pantalla.
// - Con "reducir movimiento" (y en el prerender) no se anima: todo visible y activo.
// Solo se animan transform y opacity (el relleno del punto es una capa aparte).
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
          const tarjeta = raizRef.current;
          const linea = tarjeta.querySelector(".cronologia-linea");
          const progreso = tarjeta.querySelector(".cronologia-progreso");
          const nodos = gsap.utils.toArray(".cronologia-nodo", tarjeta);
          const rellenos = gsap.utils.toArray(".cronologia-nodo-relleno", tarjeta);
          const contenidos = gsap.utils.toArray(".cronologia-contenido", tarjeta);
          const eje = horizontal ? "scaleX" : "scaleY";
          // Hueco del menú fijo: la tarjeta se fija justo debajo
          const margenMenu = horizontal ? 90 : 80;

          // En vertical, la línea va del centro del primer punto al del último
          const ajustarLinea = () => {
            if (horizontal) return;
            const primero = nodos[0].getBoundingClientRect();
            const ultimo = nodos[nodos.length - 1].getBoundingClientRect();
            gsap.set(linea, { height: ultimo.top - primero.top });
          };
          ajustarLinea();

          gsap.set(progreso, { [eje]: 0 });
          gsap.set(rellenos, { opacity: 0, scale: 0.6 });
          gsap.set(contenidos, { opacity: 0, [horizontal ? "y" : "x"]: 16 });

          const activar = (i) => [
            [rellenos[i], { opacity: 1, scale: 1, duration: 0.06 }],
            [nodos[i], { scale: 1.12, duration: 0.06 }],
            [contenidos[i], { opacity: 1, x: 0, y: 0, duration: 0.1 }],
          ];

          // En móvil, si la tarjeta no cabe entera debajo del menú, no se fija
          const cabe = tarjeta.offsetHeight <= window.innerHeight - margenMenu - 16;

          if (!horizontal && !cabe) {
            nodos.forEach((nodo, i) => {
              const tl = gsap.timeline({
                scrollTrigger: { trigger: nodo, start: "top 75%", toggleActions: "play none none reverse" },
              });
              activar(i).forEach(([el, props]) => tl.to(el, { ...props, duration: 0.35 }, 0));
            });
            gsap.to(progreso, {
              [eje]: 1,
              ease: "none",
              scrollTrigger: { trigger: linea, start: "top 75%", end: "bottom 75%", scrub: 0.5, onRefresh: ajustarLinea },
            });
            return;
          }

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: tarjeta,
              start: `top ${margenMenu}px`,
              end: horizontal ? "+=175%" : "+=160%",
              pin: true,
              pinSpacing: true,
              scrub: 0.5,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: ajustarLinea,
            },
          });

          // La línea llega al último punto en el 75 % del recorrido; el resto, con el 4 ya
          // activo, es margen antes de soltar la tarjeta
          tl.to(progreso, { [eje]: 1, duration: 0.75 }, 0);
          nodos.forEach((_, i) => {
            const momento = nodos.length === 1 ? 0 : (i / (nodos.length - 1)) * 0.75;
            activar(i).forEach(([el, props]) => tl.to(el, props, momento));
          });
          tl.to({}, { duration: 0.25 }, 0.75);
        },
      );
    }, raizRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="creativos-seccion creativos-seccion--cronologia" aria-labelledby="cronologia-titulo">
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
                    <span className="cronologia-nodo-relleno" />
                    <span className="cronologia-nodo-numero">{i + 1}</span>
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
