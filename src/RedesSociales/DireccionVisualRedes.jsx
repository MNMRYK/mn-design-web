import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../Creativos/Creativos.css";

// /redes-sociales/: diseño de Figma "Dirección visual para redes".
// El collage del hero (dos imágenes y un reel) está pendiente: mientras no haya imágenes,
// el hero es solo texto.

const INCLUYE = [
  {
    numero: "01",
    titulo: "Diagnóstico y estrategia",
    texto: "Diagnóstico visual de tus perfiles, líneas temáticas de contenido y planificación editorial.",
  },
  {
    numero: "02",
    titulo: "Dirección creativa",
    texto: "Una línea visual propia, plantillas y una guía de estilo para que todo se reconozca como tuyo.",
  },
  {
    numero: "03",
    titulo: "Producción de contenido",
    texto: "Diseño de publicaciones e imágenes y vídeos, también creados o asistidos con inteligencia artificial.",
  },
];

const MODALIDADES = [
  {
    titulo: "Servicio puntual",
    texto: "Las piezas de una campaña o un lanzamiento, una nueva línea visual para tus redes o unos reels concretos, con un alcance acordado.",
  },
  {
    titulo: "Colaboración mensual",
    texto: "Producción recurrente con un volumen de piezas, tiempos de respuesta y revisiones definidos de antemano. Sabes cada mes qué vas a recibir.",
  },
];

const aparecer = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const DireccionVisualRedes = () => (
  <>
    {/* HERO */}
    <section className="creativos-seccion creativos-hero">
      <div className="creativos-contenedor">
        <nav className="creativos-migas" aria-label="Miga de pan">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Redes sociales</span>
        </nav>

        <motion.div
          className="creativos-hero-texto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="creativos-h1">
            Dirección visual y contenido para <span className="creativos-degradado">redes sociales</span>
          </h1>
          <p className="creativos-entradilla">
            Ayudamos a las marcas a mantener una presencia visual coherente mediante planificación
            creativa, dirección de arte y producción de imágenes, vídeos y publicaciones.
          </p>
          <p className="creativos-ideal-hero">
            Ideal si tu web ya está renovada y tus redes todavía no van a juego.
          </p>
          <div className="creativos-botones">
            <a href="#contacto" className="creativos-boton creativos-boton--primario">
              Pedir propuesta
            </a>
            <a href="#que-incluye" className="creativos-enlace">
              Qué incluye →
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* QUÉ INCLUYE */}
    <section id="que-incluye" className="creativos-seccion" aria-labelledby="redes-incluye-titulo">
      <div className="creativos-contenedor">
        <p className="creativos-etiqueta">Qué incluye</p>
        <h2 id="redes-incluye-titulo" className="creativos-h2">
          Una comunicación visual <span className="creativos-degradado">reconocible y constante</span>
        </h2>

        <div className="creativos-rejilla creativos-rejilla--3">
          {INCLUYE.map((bloque, i) => (
            <motion.article
              key={bloque.numero}
              className="creativos-tarjeta"
              {...aparecer}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <span className="creativos-numero" aria-hidden="true">{bloque.numero}</span>
              <h3 className="creativos-h3">{bloque.titulo}</h3>
              <p className="creativos-texto">{bloque.texto}</p>
            </motion.article>
          ))}
        </div>

        <p className="creativos-nota">
          La publicación y la gestión de tus perfiles solo se incluyen si las contratas.
        </p>
      </div>
    </section>

    {/* CÓMO TRABAJAMOS */}
    <section className="creativos-seccion" aria-labelledby="redes-trabajamos-titulo">
      <div className="creativos-contenedor">
        <p className="creativos-etiqueta">Cómo trabajamos</p>
        <h2 id="redes-trabajamos-titulo" className="creativos-h2">
          Para una campaña o <span className="creativos-degradado">mes a mes</span>
        </h2>

        <div className="creativos-rejilla creativos-rejilla--2">
          {MODALIDADES.map((modalidad, i) => (
            <motion.article
              key={modalidad.titulo}
              className="creativos-tarjeta"
              {...aparecer}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <h3 className="creativos-h3">{modalidad.titulo}</h3>
              <p className="creativos-texto">{modalidad.texto}</p>
            </motion.article>
          ))}
        </div>

        <p className="creativos-enlace-cruzado">
          ¿Tu marca necesita antes una identidad visual?{" "}
          <a href="/branding/" className="creativos-enlace">
            Identidad de marca y dirección creativa →
          </a>
        </p>
      </div>
    </section>
  </>
);

export default DireccionVisualRedes;
