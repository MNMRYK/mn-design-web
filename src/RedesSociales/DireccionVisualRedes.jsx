import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icono from "../utils/Icono";
import ImagenCreativa, { ReelCreativo } from "../Creativos/ImagenCreativa.jsx";
import FormatosRedes from "./FormatosRedes.jsx";
import "../Creativos/Creativos.css";

// /redes-sociales/: diseño de Figma "Dirección visual para redes" + contenido ampliado
// (servicios en detalle, formatos y para quién es), respaldado por los textos de Lara
// (bloque 01 "Redes Sociales y Creación de Contenido" y su catálogo de servicios).

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

// Los seis servicios del bloque 01 de Lara (descripciones nuevas)
const SERVICIOS = [
  {
    icono: "palette",
    titulo: "Dirección de arte para redes sociales",
    texto: "Definimos cómo se ve tu marca en redes: estilo de imagen, composición, color y tono visual, para que cada publicación se reconozca como tuya.",
  },
  {
    icono: "video",
    titulo: "Creación de contenido gráfico y audiovisual",
    texto: "Diseñamos publicaciones, carruseles y piezas gráficas, y producimos vídeos cortos con la misma línea visual.",
  },
  {
    icono: "lightbulb",
    titulo: "Desarrollo de conceptos creativos",
    texto: "Antes de producir, pensamos la idea: cómo contar un lanzamiento, una temporada o un servicio para que tenga sentido en redes.",
  },
  {
    icono: "wand-magic-sparkles",
    titulo: "Contenido editorial generado con IA",
    texto: "Imágenes editoriales creadas con inteligencia artificial bajo dirección de arte, coherentes con tu marca y revisadas antes de publicarse.",
  },
  {
    icono: "calendar-days",
    titulo: "Estrategia visual y planificación de contenidos",
    texto: "Líneas temáticas, calendario editorial y reparto de formatos, para publicar con un plan y no sobre la marcha.",
  },
  {
    icono: "bullseye",
    titulo: "Diseño de campañas y piezas digitales",
    texto: "Piezas para campañas y lanzamientos, adaptadas a cada red y a cada formato.",
  },
];

const PARA_QUIEN = [
  {
    icono: "store",
    titulo: "Negocios locales",
    texto: "Comercios y negocios de servicios que quieren que sus redes transmitan la misma confianza que su local o su web.",
    enlaces: [{ texto: "Diseño web a medida", url: "/disenoweb/" }],
  },
  {
    icono: "hands-helping",
    titulo: "Clínicas y profesionales de la salud",
    texto: "Psicólogos, nutricionistas y clínicas que necesitan comunicar con cercanía y con una imagen cuidada y profesional.",
    enlaces: [
      { texto: "Clínicas", url: "/clinicas/" },
      { texto: "Psicólogos", url: "/psicologos/" },
      { texto: "Nutricionistas", url: "/nutricionistas/" },
    ],
  },
  {
    icono: "shopify",
    titulo: "Tiendas online",
    texto: "Tiendas que necesitan imágenes de producto, campañas y contenido constante para mover su catálogo en redes.",
    enlaces: [{ texto: "Tiendas online", url: "/e-commerce/" }],
  },
  {
    icono: "desktop",
    titulo: "Marcas que acaban de renovar su web",
    texto: "Si tu web ya está renovada, tus redes tienen que ir a juego: misma identidad, mismos colores, mismo tono.",
    enlaces: [
      { texto: "Diseño web", url: "/disenoweb/" },
      { texto: "Branding e identidad", url: "/branding/" },
    ],
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

export const HeroRedes = () => (
  <section className="creativos-seccion creativos-hero">
    <div className="creativos-contenedor">
      <nav className="creativos-migas" aria-label="Miga de pan">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Redes sociales</span>
      </nav>

      <div className="creativos-hero-grid">
        {/* Collage del diseño: dos imágenes y un reel (huecos pendientes) */}
        {/* Collage del diseño: reel vertical + publicación + pieza */}
        <div className="creativos-collage">
          <ReelCreativo
            src="/redes/reel.mp4"
            poster="/redes/reel-poster.webp"
            alt="Reel con la animación de un logotipo en blanco sobre fondo negro"
            width="338"
            height="546"
            proporcion="269 / 440"
          />
          <div className="creativos-collage-columna">
            <ImagenCreativa
              src="/redes/post.webp"
              alt="Publicación para redes sobre una rutina de cuidado de la piel, con fotografía y los pasos ilustrados con iconos"
              width="736"
              height="1104"
              proporcion="269 / 213"
              posicion="50% 12%"
              prioridad
            />
            <ImagenCreativa
              src="/redes/post2.webp"
              alt="Perfil de redes sociales y web de una peluquería en dos móviles, con publicaciones y su paleta de colores"
              width="800"
              height="1000"
              proporcion="269 / 213"
              posicion="50% 46%"
              prioridad
            />
          </div>
        </div>

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
            <a href="#contacto" className="creativos-btn-primario">
              Pedir propuesta
            </a>
            <a href="#que-incluye" className="creativos-btn-secundario">
              Qué incluye
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export const ContenidoRedes = () => (
  <>
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

    {/* SERVICIOS EN DETALLE */}
    <section className="creativos-seccion" aria-labelledby="redes-servicios-titulo">
      <div className="creativos-contenedor">
        <p className="creativos-etiqueta">Servicios</p>
        <h2 id="redes-servicios-titulo" className="creativos-h2">
          Contenido para redes sociales, <span className="creativos-degradado">con dirección visual</span>
        </h2>
        <p className="creativos-subtitulo">
          Creamos contenido visual y estratégico para marcas que quieren comunicar de forma coherente,
          atractiva y diferenciadora.
        </p>

        <div className="creativos-rejilla creativos-rejilla--3">
          {SERVICIOS.map((servicio, i) => (
            <motion.article
              key={servicio.titulo}
              className="creativos-tarjeta"
              {...aparecer}
              transition={{ duration: 0.5, delay: (i % 3) * 0.12 }}
            >
              <span className="creativos-icono">
                <Icono nombre={servicio.icono} />
              </span>
              <h3 className="creativos-h3">{servicio.titulo}</h3>
              <p className="creativos-texto">{servicio.texto}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* FORMATOS (interactivo) */}
    <FormatosRedes />

    {/* PARA QUIÉN ES */}
    <section className="creativos-seccion" aria-labelledby="redes-quien-titulo">
      <div className="creativos-contenedor">
        <p className="creativos-etiqueta">Para quién es</p>
        <h2 id="redes-quien-titulo" className="creativos-h2">
          Para negocios que quieren que sus redes <span className="creativos-degradado">vayan a juego</span>
        </h2>

        <div className="creativos-rejilla creativos-rejilla--2">
          {PARA_QUIEN.map((perfil, i) => (
            <motion.article
              key={perfil.titulo}
              className="creativos-tarjeta"
              {...aparecer}
              transition={{ duration: 0.5, delay: (i % 2) * 0.12 }}
            >
              <span className="creativos-icono">
                <Icono nombre={perfil.icono} />
              </span>
              <h3 className="creativos-h3">{perfil.titulo}</h3>
              <p className="creativos-texto">{perfil.texto}</p>
              <p className="creativos-enlaces-relacionados">
                {perfil.enlaces.map((enlace, j) => (
                  <React.Fragment key={enlace.url}>
                    {j > 0 && " · "}
                    <a href={enlace.url} className="creativos-enlace">
                      {enlace.texto}
                    </a>
                  </React.Fragment>
                ))}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* CÓMO TRABAJAMOS: modalidades */}
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
