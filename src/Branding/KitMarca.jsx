import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../Creativos/Creativos.css";

// "Qué recibes" de /branding/: el kit de marca en bento grid (4 × 3 sin huecos en escritorio).
// Cada tarjeta lleva una mini ilustración en CSS con la paleta de la web; se anima al pasar el
// ratón o enfocar (y sola en pantallas táctiles, al entrar en pantalla). Entrada escalonada,
// como si se montara el kit. Solo transform y opacity; con "reducir movimiento", estático.

const Ilustracion = ({ tipo }) => {
  switch (tipo) {
    case "guia":
      // Manual de marca abierto: sus páginas pasan y resumen el resto del kit
      // (logotipo con área de respeto, paleta, tipografía con jerarquía y retícula)
      return (
        <div className="kit-ilu kit-manual">
          <div className="kit-manual-izq">
            <span className="kit-manual-linea" />
            <span className="kit-manual-linea kit-manual-linea--corta" />
            <span className="kit-manual-linea" />
            <span className="kit-manual-linea kit-manual-linea--corta" />
          </div>
          <div className="kit-manual-der">
            <div className="kit-pag kit-pag--4">
              <div className="kit-pag-reticula">{[0, 1, 2, 3, 4, 5].map((n) => <span key={n} />)}</div>
            </div>
            <div className="kit-pag kit-pag--3">
              <span className="kit-pag-aa">Aa</span>
              <span className="kit-pag-jerarquia"><span /><span /><span /></span>
            </div>
            <div className="kit-pag kit-pag--2">
              <div className="kit-pag-colores">{[0, 1, 2, 3, 4].map((n) => <span key={n} />)}</div>
            </div>
            <div className="kit-pag kit-pag--1">
              <span className="kit-pag-respeto"><span className="kit-pag-logo" /></span>
            </div>
          </div>
        </div>
      );
    case "paleta":
      return (
        <div className="kit-ilu kit-paleta">
          {[0, 1, 2, 3, 4].map((n) => <span key={n} className={`kit-muestra kit-muestra--${n}`} />)}
        </div>
      );
    case "tipografias":
      return (
        <div className="kit-ilu kit-tipos">
          <span className="kit-aa kit-aa--1">Aa</span>
          <span className="kit-aa kit-aa--2">Aa</span>
          <span className="kit-aa kit-aa--3">Aa</span>
        </div>
      );
    case "elementos":
      return (
        <div className="kit-ilu kit-formas">
          <span className="kit-forma kit-forma--circulo" />
          <span className="kit-forma kit-forma--cuadrado" />
          <span className="kit-forma kit-forma--pildora" />
        </div>
      );
    case "moodboard":
      return (
        <div className="kit-ilu kit-mood">
          {[0, 1, 2, 3, 4, 5].map((n) => <span key={n} className={`kit-mood-pieza kit-mood-pieza--${n}`} />)}
        </div>
      );
    case "plantillas":
      return (
        <div className="kit-ilu kit-rejilla">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => <span key={n} style={{ "--i": n }} />)}
        </div>
      );
    default:
      return (
        <div className="kit-ilu kit-video">
          <span className="kit-video-play" />
          <span className="kit-video-barra"><span /></span>
        </div>
      );
  }
};

// Textos de "Qué recibes" (respaldados por los textos de Lara)
const PIEZAS = [
  { id: "guia", titulo: "Guía visual", texto: "Las reglas de tu marca por escrito, para mantener la coherencia en cada pieza." },
  { id: "paleta", titulo: "Paleta cromática", texto: "Los colores de tu marca y cómo combinarlos." },
  { id: "tipografias", titulo: "Tipografías", texto: "Las fuentes para títulos y textos, y cómo usarlas." },
  { id: "elementos", titulo: "Elementos gráficos y aplicaciones", texto: "Recursos visuales propios y su aplicación a las piezas que necesites." },
  { id: "moodboard", titulo: "Moodboards y referencias", texto: "La exploración estética con la que se decide el estilo." },
  { id: "plantillas", titulo: "Plantillas para redes", texto: "Para publicar con la misma línea visual sin empezar cada vez de cero." },
  { id: "video", titulo: "Imágenes y vídeos", texto: "Producidos con la identidad de tu marca para tu web, tu tienda y tus redes." },
];

const KitMarca = () => {
  const rejillaRef = useRef(null);
  const [enPantalla, setEnPantalla] = useState(false);

  // En pantallas táctiles (sin hover), las ilustraciones se animan solas al entrar en pantalla
  useEffect(() => {
    const el = rejillaRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const obs = new IntersectionObserver(([e]) => setEnPantalla(e.isIntersecting), { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="creativos-seccion" aria-labelledby="branding-entregables-titulo">
      <div className="creativos-contenedor">
        <p className="creativos-etiqueta">Qué recibes</p>
        <h2 id="branding-entregables-titulo" className="creativos-h2">
          Entregables concretos, <span className="creativos-degradado">no solo ideas</span>
        </h2>
        <p className="creativos-subtitulo">
          Según el alcance de cada proyecto, estos son los materiales con los que trabajamos y que
          quedan definidos en la propuesta.
        </p>

        <ul ref={rejillaRef} className={`kit ${enPantalla ? "kit--en-pantalla" : ""}`}>
          {PIEZAS.map((pieza, i) => (
            <motion.li
              key={pieza.id}
              className={`kit-celda kit-celda--${pieza.id}`}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.09 }}
            >
              {/* La tarjeta va dentro: así la elevación al pasar el ratón no choca con la entrada */}
              <div className={`kit-tarjeta kit-tarjeta--${pieza.id}`} tabIndex={0}>
                <div className="kit-escena" aria-hidden="true">
                  <Ilustracion tipo={pieza.id} />
                </div>
                <h3 className="creativos-h3">{pieza.titulo}</h3>
                <p className="creativos-texto">{pieza.texto}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default KitMarca;
