import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icono from "../utils/Icono";
import ImagenCreativa from "../Creativos/ImagenCreativa.jsx";
import "../Creativos/Creativos.css";

// /branding/: diseño de Figma "Identidad de marca y contenido visual" + secciones nuevas
// (el problema, qué recibes, por qué web y marca juntas, formas de trabajar ampliadas, trabajos).
// Lo que se dice de Lara y de los servicios creativos está respaldado por sus textos
// (contenido-lara/, fuera del repo).

// --- NUEVO: situaciones en las que se reconoce el cliente ---
const PROBLEMAS = [
  {
    icono: "layer-group",
    titulo: "Tu web es nueva, pero lo demás no va a juego",
    texto: "Estrenas web y tus redes, tus fotos o tu logotipo siguen contando otra historia.",
  },
  {
    icono: "fingerprint",
    titulo: "Tu marca se parece a la de tu competencia",
    texto: "Colores, imágenes y mensajes que podrían ser de cualquier negocio de tu sector.",
  },
  {
    icono: "paint-roller",
    titulo: "Cada pieza la ha hecho alguien distinto",
    texto: "La web, las redes y las fotos salen de manos diferentes y no se reconocen como una misma marca.",
  },
  {
    icono: "chart-line",
    titulo: "Tu negocio ha crecido y tu imagen no",
    texto: "La marca con la que empezaste ya no refleja lo que ofreces hoy ni a quién te diriges.",
  },
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
    enlace: { texto: "Ver dirección visual para redes", url: "/redes-sociales/" },
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

// --- NUEVO: por qué web y marca juntas ---
const VENTAJAS = [
  {
    icono: "handshake-angle",
    titulo: "Un solo equipo y un solo interlocutor",
    texto: "Tienes un único punto de contacto y nos coordinamos por dentro: no tienes que hacer de puente entre la parte creativa y la técnica.",
  },
  {
    icono: "code",
    titulo: "Coherencia entre lo visual y lo técnico",
    texto: "La dirección de arte y el desarrollo se deciden juntos, así que lo que se diseña es lo que después funciona en la web, en el móvil y en la tienda online.",
  },
  {
    icono: "layer-group",
    titulo: "La identidad se integra desde el diseño de la web",
    texto: "No se añade al final: la marca guía la estructura, las imágenes y la composición de la web desde el primer boceto.",
  },
];

// Formas de trabajar: textos de Figma + "Ideal para", "Qué incluye", "Qué obtienes" y ejemplo
// (NUEVOS; los ejemplos salen del catálogo de Lara)
const FORMAS = [
  {
    titulo: "Proyecto cerrado",
    texto:
      "Objetivos, entregables, revisiones, plazos y presupuesto definidos desde el principio. Por ejemplo, una nueva identidad visual o una web con dirección de arte.",
    ideal: "Marcas que necesitan crear o renovar su identidad, o lanzar una web con dirección de arte.",
    incluye: ["Objetivos y alcance definidos", "Entregables cerrados", "Rondas de revisión acordadas", "Plazos y presupuesto desde el principio"],
    obtienes: "Un resultado completo y terminado: tu identidad visual con su guía o tu web con dirección de arte.",
    ejemplo: "Un estudio profesional renueva su web y necesita unificar sus colores, tipografías y estilo visual.",
  },
  {
    titulo: "Servicio puntual",
    texto:
      "Imágenes, vídeos o piezas concretas con un alcance acordado. Para marcas que ya tienen su identidad y necesitan recursos visuales.",
    ideal: "Marcas que ya tienen su identidad y necesitan recursos visuales para algo concreto.",
    incluye: ["Imágenes de producto o editoriales", "Vídeos y reels", "Piezas para una campaña o un lanzamiento", "Alcance acordado"],
    obtienes: "Las piezas que necesitas para esa ocasión, listas para usar en tu web, tu tienda o tus redes.",
    ejemplo: "Una tienda de cosmética necesita imágenes para sus páginas de producto, una campaña y sus redes sociales.",
  },
  {
    titulo: "Colaboración mensual",
    texto:
      "Producción recurrente con un volumen de entregables, tiempos de respuesta y revisiones definidos de antemano.",
    ideal: "Marcas que, después de lanzar su web, necesitan contenido visual de forma continuada.",
    incluye: ["Volumen de entregables al mes", "Tiempos de respuesta acordados", "Revisiones definidas de antemano", "Planificación de contenidos"],
    obtienes: "Imágenes, vídeos y contenido cada mes para mantener activa tu comunicación.",
    ejemplo: "Un negocio estrena web, pero sus redes sociales necesitan una identidad visual coherente con ella.",
  },
];

// --- NUEVO: galería de trabajos (3 huecos, solo en desarrollo hasta tener las imágenes) ---
// [PENDIENTE: títulos reales de los proyectos y, si María lo indica, su enlace]
const TRABAJOS = [
  {
    src: "/branding/proyecto1.webp",
    width: "736",
    height: "575",
    titulo: "Identidad visual · Logotipo de línea",
    alt: "Logotipo de línea fina con una hoja tropical, en blanco sobre una fotografía de hojas verdes",
  },
  {
    src: "/branding/proyecto2.webp",
    width: "736",
    height: "736",
    titulo: "Identidad visual · Logotipo tipográfico",
    alt: "Logotipo tipográfico en blanco sobre una hoja verde en primer plano, con un pequeño símbolo",
  },
  {
    src: "/branding/proyecto3.webp",
    width: "749",
    height: "586",
    titulo: "Identidad visual · Símbolo y logotipo",
    alt: "Símbolo con una hoja dentro de un marco y logotipo en blanco sobre hojas oscuras",
  },
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

export const HeroBranding = () => (
  <section className="creativos-seccion creativos-hero">
    <div className="creativos-contenedor">
      <nav className="creativos-migas" aria-label="Miga de pan">
        <Link to="/">Inicio</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Branding e identidad de marca</span>
      </nav>

      <div className="creativos-hero-grid">
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
            <a href="#contacto" className="creativos-btn-primario">
              Cuéntanos tu proyecto
            </a>
            <a href="#servicios" className="creativos-btn-secundario">
              Ver servicios
            </a>
          </div>
        </motion.div>

        <div className="creativos-hero-media">
          <ImagenCreativa
            src="/branding/creatividad-principal.webp"
            alt="Identidad visual de una marca de helados: logotipo, paleta de colores, envases y fotografía de producto en tonos morados"
            width="720"
            height="960"
            entera
            prioridad
          />
        </div>
      </div>
    </div>
  </section>
);

export const ProblemaBranding = () => (
  <section className="creativos-seccion" aria-labelledby="branding-problema-titulo">
    <div className="creativos-contenedor">
      <p className="creativos-etiqueta">El problema</p>
      <h2 id="branding-problema-titulo" className="creativos-h2">
        ¿Te suena alguna de <span className="creativos-degradado">estas situaciones</span>?
      </h2>
      <div className="creativos-rejilla creativos-rejilla--4">
        {PROBLEMAS.map((problema, i) => (
          <motion.article
            key={problema.titulo}
            className="creativos-tarjeta"
            {...aparecer}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <span className="creativos-icono">
              <Icono nombre={problema.icono} />
            </span>
            <h3 className="creativos-h3">{problema.titulo}</h3>
            <p className="creativos-texto">{problema.texto}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export const ServiciosBranding = () => (
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

      <div className="creativos-rejilla creativos-rejilla--2 tema-oscuro">
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
              <a href={servicio.enlace.url} className="creativos-btn-secundario creativos-servicio-enlace">
                {servicio.enlace.texto}
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export const EquipoBranding = () => (
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

      {/* NUEVO: por qué web y marca juntas */}
      <h3 className="creativos-h2 creativos-h2--secundario">
        Por qué <span className="creativos-degradado">web y marca juntas</span>
      </h3>
      <div className="creativos-rejilla creativos-rejilla--3">
        {VENTAJAS.map((ventaja, i) => (
          <motion.article
            key={ventaja.titulo}
            className="creativos-tarjeta"
            {...aparecer}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <span className="creativos-icono">
              <Icono nombre={ventaja.icono} />
            </span>
            <h4 className="creativos-h3">{ventaja.titulo}</h4>
            <p className="creativos-texto">{ventaja.texto}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export const FormasBranding = () => (
  <section id="formas-de-trabajar" className="creativos-seccion" aria-labelledby="branding-formas-titulo">
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
            className="creativos-tarjeta creativos-forma"
            {...aparecer}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <h3 className="creativos-h3">{forma.titulo}</h3>
            <p className="creativos-texto">{forma.texto}</p>
            <dl className="creativos-forma-detalle">
              <div>
                <dt>Ideal para</dt>
                <dd>{forma.ideal}</dd>
              </div>
              <div>
                <dt>Qué incluye</dt>
                <dd>
                  <ul>
                    {forma.incluye.map((punto) => (
                      <li key={punto}>
                        <Icono nombre="check" />
                        {punto}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>Qué obtienes</dt>
                <dd>{forma.obtienes}</dd>
              </div>
            </dl>
            <p className="creativos-ideal">
              <strong>Ejemplo:</strong> {forma.ejemplo}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export const TrabajosBranding = () => (
  <section className="creativos-seccion" aria-labelledby="branding-trabajos-titulo">
    <div className="creativos-contenedor">
      <p className="creativos-etiqueta">Trabajos</p>
      <h2 id="branding-trabajos-titulo" className="creativos-h2">
        Proyectos de <span className="creativos-degradado">identidad y contenido visual</span>
      </h2>

      <div className="creativos-rejilla creativos-rejilla--3">
        {TRABAJOS.map((trabajo) => (
          <article key={trabajo.src} className="creativos-trabajo">
            <ImagenCreativa
              src={trabajo.src}
              alt={trabajo.alt}
              width={trabajo.width}
              height={trabajo.height}
              proporcion="4 / 3"
            />
            <h3 className="creativos-h3">{trabajo.titulo}</h3>
          </article>
        ))}
      </div>

      <div className="creativos-trabajos-demos">
        <a href="/demos/" className="creativos-btn-secundario">
          Mira nuestras demos
        </a>
      </div>
    </div>
  </section>
);
