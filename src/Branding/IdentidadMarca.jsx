import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icono from "../utils/Icono";
import "../Creativos/Creativos.css";

// /branding/: diseño de Figma "Identidad de marca y contenido visual".
// Lo que se dice de Lara y de los servicios creativos está respaldado por sus textos
// (contenido-lara/, fuera del repo). Huecos de imagen pendientes (hero): ocultos por ahora.

const FRANJA = [
  "Identidad de marca",
  "Imágenes con IA",
  "Vídeo y campañas",
  "Redes sociales",
  "Dirección de arte web",
];

const DESTACADOS = [
  {
    icono: "wand-magic-sparkles",
    antetitulo: "02 · Producción visual",
    titulo: "Imágenes y fotografía con inteligencia artificial",
    texto:
      "Imágenes y recursos visuales personalizados para tu web, tu tienda online, tus campañas y tus redes, combinando dirección de arte, herramientas de IA y edición profesional.",
    incluye: [
      "Producto y estilo de vida",
      "Imágenes editoriales",
      "Composiciones publicitarias",
      "Recursos para tiendas online",
      "Cabeceras de web",
      "Retoque y adaptación de formatos",
    ],
    ideal: "Ideal si necesitas imágenes para tus fichas de producto, una campaña y tus redes.",
  },
  {
    icono: "desktop",
    antetitulo: "05 · Web con identidad",
    titulo: "Dirección de arte para páginas web",
    texto:
      "Integramos la creatividad en el desarrollo web: no solo una página que funciona, sino una experiencia digital donde las imágenes, la composición y la tecnología reflejan la identidad de tu negocio.",
    incluye: ["Referencias", "Concepto visual", "Selección y producción de imágenes", "Criterios de composición"],
    partes: [
      { titulo: "Parte creativa", texto: "Concepto, imágenes, composición y coherencia visual." },
      { titulo: "Parte técnica", texto: "Desarrollo, móvil, integraciones, rendimiento y publicación." },
    ],
    ideal: "Ideal si quieres una web funcional con una estética propia y materiales visuales originales.",
  },
];

const SERVICIOS = [
  {
    numero: "01",
    icono: "palette",
    titulo: "Identidad de marca y diseño visual",
    texto:
      "Conceptos e identidades visuales que reflejan la personalidad de tu marca y dan coherencia a toda tu comunicación.",
    incluye: [
      "Análisis de tu identidad",
      "Referencias y moodboards",
      "Colores y tipografías",
      "Elementos gráficos",
      "Guía visual",
    ],
    ideal: "Ideal si renuevas tu web y quieres unificar colores, tipografías y estilo.",
  },
  {
    numero: "03",
    icono: "video",
    titulo: "Vídeo y campañas creativas",
    texto:
      "Ideas visuales y piezas audiovisuales para presentar productos, comunicar lanzamientos y dar forma a tus campañas.",
    incluye: ["Concepto de campaña", "Guion visual", "Vídeos con IA", "Montaje y edición", "Versiones para redes"],
    ideal: "Ideal si lanzas una colección y necesitas un vídeo principal y versiones cortas.",
  },
  {
    numero: "04",
    icono: "mobile-screen-button",
    titulo: "Dirección visual para redes sociales",
    texto:
      "Una comunicación visual reconocible y constante: planificación creativa, dirección de arte y producción de contenido.",
    incluye: ["Diagnóstico visual", "Planificación editorial", "Plantillas", "Guía de estilo", "Imágenes y vídeos"],
    enlace: { texto: "Ver dirección visual para redes →", url: "/redes-sociales/" },
  },
];

const PERSONAS = [
  {
    nombre: "María Nadal",
    cargo: "Fundadora de MN Design Web · desarrollo",
    texto:
      "Diseño y desarrollo web, tiendas online, software a medida y SEO. La parte que hace que tu marca funcione en internet.",
    foto: {
      src: "/maria-nadal-mn-design-web-480.webp",
      srcSet: "/maria-nadal-mn-design-web-480.webp 480w, /maria-nadal-mn-design-web-800.webp 800w",
      alt: "María Nadal, fundadora de MN Design Web",
    },
  },
  {
    nombre: "Lara Summers",
    cargo: "Dirección de arte y contenido visual",
    colaboradora: true,
    // Biografía de Lara (su texto), en tercera persona
    texto:
      "Directora de arte especializada en identidad visual, creación de contenido y producción creativa con inteligencia artificial. Trabaja desde el concepto creativo hasta su ejecución.",
    foto: {
      src: "/lara-summers-directora-arte.webp",
      srcSet: "/lara-summers-directora-arte-200.webp 200w, /lara-summers-directora-arte.webp 400w",
      alt: "Lara Summers, directora de arte y colaboradora de MN Design Web",
    },
  },
];

const FORMAS = [
  {
    titulo: "Proyecto cerrado",
    texto:
      "Objetivos, entregables, revisiones, plazos y presupuesto definidos desde el principio. Por ejemplo, una nueva identidad visual o una web con dirección de arte.",
  },
  {
    titulo: "Servicio puntual",
    texto:
      "Imágenes, vídeos o piezas concretas con un alcance acordado. Para marcas que ya tienen su identidad y necesitan recursos visuales.",
  },
  {
    titulo: "Colaboración mensual",
    texto:
      "Producción recurrente con un volumen de entregables, tiempos de respuesta y revisiones definidos de antemano.",
  },
];

const PASOS = [
  { titulo: "Nos cuentas qué necesitas", texto: "En una primera llamada vemos tu negocio y tus objetivos." },
  { titulo: "Reunión creativa", texto: "Una sesión específica para concretar el alcance creativo." },
  { titulo: "Propuesta personalizada", texto: "Entregables, revisiones, plazos y presupuesto, por escrito." },
  { titulo: "Producción y revisiones", texto: "Trabajamos con las rondas de ajustes acordadas." },
];

const aparecer = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const Etiquetas = ({ lista, clara = false }) => (
  <ul className={`creativos-chips ${clara ? "creativos-chips--claras" : ""}`} aria-label="Incluye">
    {lista.map((texto) => (
      <li key={texto}>{texto}</li>
    ))}
  </ul>
);

const IdentidadMarca = () => (
  <>
    {/* HERO */}
    <section className="creativos-seccion creativos-hero">
      <div className="creativos-contenedor">
        <nav className="creativos-migas" aria-label="Miga de pan">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Branding e identidad de marca</span>
        </nav>

        <motion.div
          className="creativos-hero-texto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="creativos-etiqueta">Identidad de marca · Dirección creativa · Contenido visual</p>
          <h1 className="creativos-h1">
            Creatividad y tecnología para construir marcas <span className="creativos-degradado">con identidad</span>
          </h1>
          <p className="creativos-entradilla">
            Una buena presencia digital combina tecnología, estrategia y creatividad. Por eso
            complementamos el desarrollo web con branding: identidad de marca, dirección creativa y
            producción de contenido visual.
          </p>
          <div className="creativos-botones">
            <a href="#contacto" className="creativos-boton creativos-boton--primario">
              Cuéntanos tu proyecto
            </a>
            <a href="#servicios" className="creativos-enlace">
              Ver servicios →
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* CINTA DE SERVICIOS */}
    <div className="creativos-franja tema-oscuro">
      <ul className="creativos-franja-lista">
        {FRANJA.map((texto) => (
          <li key={texto}>{texto}</li>
        ))}
      </ul>
    </div>

    {/* QUÉ HACEMOS */}
    <section id="servicios" className="creativos-seccion" aria-labelledby="branding-servicios-titulo">
      <div className="creativos-contenedor">
        <p className="creativos-etiqueta">Qué hacemos</p>
        <h2 id="branding-servicios-titulo" className="creativos-h2">
          Cinco servicios creativos, <span className="creativos-degradado">adaptados a cada proyecto</span>
        </h2>
        <p className="creativos-subtitulo">
          Colaboramos con profesionales especializados según las necesidades de cada proyecto para
          ofrecer soluciones coherentes y adaptadas a cada negocio.
        </p>

        <div className="creativos-rejilla creativos-rejilla--2">
          {DESTACADOS.map((servicio, i) => (
            <motion.article
              key={servicio.titulo}
              className="creativos-tarjeta-oscura creativos-destacado tema-oscuro"
              {...aparecer}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="creativos-destacado-cabecera">
                <span className="creativos-icono creativos-icono--claro">
                  <Icono nombre={servicio.icono} />
                </span>
                <span className="creativos-insignia">Servicio destacado</span>
              </div>
              <p className="creativos-etiqueta creativos-etiqueta--clara">{servicio.antetitulo}</p>
              <h3 className="creativos-destacado-titulo">{servicio.titulo}</h3>
              <p className="creativos-destacado-texto">{servicio.texto}</p>
              <Etiquetas lista={servicio.incluye} clara />
              {servicio.partes && (
                <div className="creativos-partes">
                  {servicio.partes.map((parte) => (
                    <div key={parte.titulo} className="creativos-parte">
                      <h4>{parte.titulo}</h4>
                      <p>{parte.texto}</p>
                    </div>
                  ))}
                </div>
              )}
              <p className="creativos-ideal creativos-ideal--claro">{servicio.ideal}</p>
            </motion.article>
          ))}
        </div>

        <div className="creativos-rejilla creativos-rejilla--3 creativos-rejilla--servicios">
          {SERVICIOS.map((servicio, i) => (
            <motion.article
              key={servicio.numero}
              className="creativos-tarjeta creativos-servicio"
              {...aparecer}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="creativos-servicio-cabecera">
                <span className="creativos-icono">
                  <Icono nombre={servicio.icono} />
                </span>
                <span className="creativos-numero" aria-hidden="true">{servicio.numero}</span>
              </div>
              <h3 className="creativos-h3">{servicio.titulo}</h3>
              <p className="creativos-texto">{servicio.texto}</p>
              <Etiquetas lista={servicio.incluye} />
              {servicio.ideal && <p className="creativos-ideal">{servicio.ideal}</p>}
              {servicio.enlace && (
                <a href={servicio.enlace.url} className="creativos-enlace creativos-servicio-enlace">
                  {servicio.enlace.texto}
                </a>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* QUIÉN ESTÁ DETRÁS */}
    <section className="creativos-seccion" aria-labelledby="branding-quien-titulo">
      <div className="creativos-contenedor">
        <p className="creativos-etiqueta">Quién está detrás</p>
        <h2 id="branding-quien-titulo" className="creativos-h2">
          Desarrollo y dirección creativa, <span className="creativos-degradado">trabajando juntas</span>
        </h2>

        <div className="creativos-rejilla creativos-rejilla--2">
          {PERSONAS.map((persona, i) => (
            <motion.article
              key={persona.nombre}
              className="creativos-tarjeta creativos-persona"
              {...aparecer}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <img
                className="creativos-persona-foto"
                src={persona.foto.src}
                srcSet={persona.foto.srcSet}
                sizes="140px"
                alt={persona.foto.alt}
                width="140"
                height="170"
                loading="lazy"
                decoding="async"
              />
              <div>
                {persona.colaboradora && (
                  <p className="creativos-persona-rol">Colaboradora de MN Design Web</p>
                )}
                <h3 className="creativos-h3">{persona.nombre}</h3>
                <p className="creativos-persona-cargo">{persona.cargo}</p>
                <p className="creativos-texto">{persona.texto}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* TRES FORMAS DE TRABAJAR */}
    <section className="creativos-seccion" aria-labelledby="branding-formas-titulo">
      <div className="creativos-contenedor">
        <p className="creativos-etiqueta">Servicios adaptados a cada proyecto</p>
        <h2 id="branding-formas-titulo" className="creativos-h2">
          Tres formas de <span className="creativos-degradado">trabajar juntos</span>
        </h2>
        <p className="creativos-subtitulo">
          Siempre con un alcance definido y adaptado a los objetivos de tu marca.
        </p>

        <div className="creativos-rejilla creativos-rejilla--3">
          {FORMAS.map((forma, i) => (
            <motion.article
              key={forma.titulo}
              className="creativos-tarjeta"
              {...aparecer}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <h3 className="creativos-h3">{forma.titulo}</h3>
              <p className="creativos-texto">{forma.texto}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    {/* CÓMO TRABAJAMOS */}
    <section className="creativos-seccion" aria-labelledby="branding-proceso-titulo">
      <div className="creativos-contenedor">
        <p className="creativos-etiqueta">Cómo trabajamos</p>
        <h2 id="branding-proceso-titulo" className="creativos-h2">
          Primero entendemos tu marca, <span className="creativos-degradado">después producimos</span>
        </h2>

        <ol className="creativos-pasos">
          {PASOS.map((paso, i) => (
            <motion.li key={paso.titulo} {...aparecer} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <span className="creativos-paso-numero" aria-hidden="true">{i + 1}</span>
              <h3 className="creativos-paso-titulo">{paso.titulo}</h3>
              <p className="creativos-texto">{paso.texto}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  </>
);

export default IdentidadMarca;
