import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./HeaderDemos.css"; // Tu archivo de estilos

const bloquesDemos = [
  {
    categoria: "Webs de Psicología y Nutrición",
    descripcion:
      "Estructuras diseñadas para transmitir confianza, autoridad y privacidad. Ideales para profesionales que necesitan automatizar su agenda y captar pacientes.",
    demos: [
      {
        slug: "demo-psicologia-clinica",
        titulo: "Psicología Clínica",
        tag: "Psicología",
        detalles:
          "Tonos neutros y verde salvia. Navegación por pestañas, acordeón clínico y panel de credenciales optimizado.",
        url: "https://mnmryk.github.io/demo-psicologia-clinica/",
      },
      {
        slug: "demo-psicologia-bienestar",
        titulo: "Psicología y Bienestar",
        tag: "Psicología",
        detalles:
          "Diseño limpio enfocado en la conversión fluida y la experiencia del paciente.",
        url: "https://mnmryk.github.io/demo-psicologia-bienestar/",
      },
      {
        slug: "demo-psicologia-especializada",
        titulo: "Gabinete de Psicología",
        tag: "Psicología",
        detalles:
          "Estructura sólida para clínicas con múltiples profesionales y especialidades.",
        url: "https://mnmryk.github.io/psicologia-especializada/",
      },
      {
        slug: "demo-nutricion",
        titulo: "Nutrición y Dietética",
        tag: "Nutrición",
        detalles:
          "Enfocada en planes nutricionales y agendamiento directo de consultas.",
        url: "https://mnmryk.github.io/demo-nutricion/",
      },
      {
        slug: "demo-nutricion-2",
        titulo: "Nutrición y Salud",
        tag: "Nutrición",
        detalles:
          "Variante visual con optimización de carga para campañas de captación.",
        url: "https://mnmryk.github.io/demo-nutricion-2/",
      },
      {
        slug: "demo-fisioterapia", 
        titulo: "Clínica de Fisioterapia", 
        tag: "Fisioterapia",
        detalles: "Diseño enfocado en la conversión clínica. Destaca por su evaluador de dolor interactivo desarrollado a medida, combinando una interfaz limpia con una imagen de máxima autoridad médica y deportiva.",
        url: "https://mnmryk.github.io/demo-fisioterapia/",
      },
    ],
  },
  {
    categoria: "Webs Corporativas y Eventos Estrategia B2B",
    descripcion:
      "Interfaces de alto rendimiento orientadas a la venta de servicios de alto valor, infoproductos y automatización de procesos comerciales.",
    demos: [
      {
        slug: "mentor-b2b",
        titulo: "Consultoría y Mentoría B2B",
        tag: "Web B2B",
        detalles:
          "Estética Navy/Dorado. Incluye 4 micro-interacciones JS nativas: Calculadora de ROI en tiempo real y filtro dinámico.",
        url: "https://mnmryk.github.io/mentor-b2b/",
      },
      {
        slug: "demo-evento-b2b",
        titulo: "Eventos Corporativos VIP",
        tag: "Evento B2B",
        detalles:
          "Estética violeta y cyan neón. Incluye cuenta atrás en JS nativo, agenda interactiva y marquesina animada en CSS.",
        url: "https://mnmryk.github.io/demo-evento-B2B/",
      },
      {
        slug: "demo-inmobiliaria-b2b",
        titulo: "Consultoría Inmobiliaria B2B",
        tag: "Web B2B",
        detalles: "Estructura corporativa de alto impacto para captación de inversores. Uso de tipografías contundentes, contraste estratégico y optimización visual diseñada para embudos de venta High Ticket.",
        url: "https://mnmryk.github.io/demo-inmobiliaria/",
      },
    ],
  },
  {
    categoria: "Eventos de Experiencias, Hostelería y Estética",
    descripcion:
      "Diseños de estilo editorial e inmersivos pensados para marcas que venden una experiencia exclusiva y requieren gestión de reservas.",
    demos: [
      {
        slug: "demo-evento-gastronomico",
        titulo: "Experiencias Gastronómicas",
        tag: "Evento Gastronómico",
        detalles:
          "Landing para restaurantes Michelin con efecto Parallax CSS nativo sin JS y menú de degustación maquetado clásicamente.",
        url: "https://mnmryk.github.io/demo-evento-gastronimico/",
      },
      {
        slug: "demo-evento-salones",
        titulo: "Masterclasses de Estética",
        tag: "Evento Estética",
        detalles:
          "Tonos nude/salvia. Diseño con imágenes en arco, paneles traslúcidos y formulario profesional con control de alergias.",
        url: "https://mnmryk.github.io/demo-evento-salones/",
      },
      {
        slug: "demo-micropigmentacion",
        titulo: "Cursos de Micropigmentación",
        tag: "Academia Micropigmentación",
        detalles: "Puro lujo silencioso. Estética minimalista en tonos nude y tipografía serif elegante. Arquitectura web pensada para unificar la reserva de tratamientos exclusivos con un portal formativo para alumnas.",
        url: "https://mnmryk.github.io/demo-micropigmentacion/",
      }
    ],
  },
  {
    categoria: "Invitaciones Eventos Boda Digitales",
    descripcion:
      "Modelos interactivos a medida para eventos sociales de alto nivel. Una alternativa ecológica, moderna y exclusiva a las invitaciones tradicionales.",
    demos: [
      {
        slug: "demo-invitacion",
        titulo: "Invitación de Boda Íntima",
        tag: "Invitación Digital",
        detalles:
          "Estilo limpio y natural. Enfoque atemporal donde prima la tipografía elegante y el uso inteligente de los espacios en blanco.",
        url: "https://mnmryk.github.io/demo-invitacion-boda/",
      },
      {
        slug: "demo-invitacion-2",
        titulo: "Gala Nocturna y Etiqueta",
        tag: "Invitación Digital",
        detalles:
          "Diseño sofisticado para eventos exclusivos utilizando contrastes cromáticos muy potentes y tipografía de tipo bloque.",
        url: "https://mnmryk.github.io/demo-invitacion-boda-2/",
      },
      {
        slug: "demo-invitacion-3",
        titulo: "Invitación Modular Joven",
        tag: "Invitación Digital",
        detalles:
          "Inspirada en interfaces modulares actuales. Formas amigables y frescas orientadas a un público joven.",
        url: "https://mnmryk.github.io/demo-invitacion-boda-3/",
      },
    ],
  },
];

const HeaderDemos = () => {
  const handleScrollSmooth = (e) => {
    e.preventDefault(); // Evitamos el teletransporte instantáneo del navegador
    const seccionFormulario = document.getElementById("solicitar-demo");
    if (seccionFormulario) {
      seccionFormulario.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className="contacto-badge" style={{ maxWidth: '1300px', margin: '120px auto 20px auto', padding: '0 24px' }}>
        <Link to="/" className="breadcrumb-link">INICIO</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">DEMOS</span>
      </div>

      <motion.div
        className="secciones-demos-wrapper"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        
        {/* EL ENCABEZADO "HERO" */}
        <header className="hero-demos-container">
          <div className="hero-demos-text">
            <span className="hero-badge"> Laboratorio de Diseño</span>
            <h1>
              Demos y <span className="text-neon-glow">Prototipos</span>
            </h1>
            <p>
              Explora diseños de alto rendimiento creados a medida para diferentes
              sectores comerciales. Interfaces preparadas para escalar y
              convertir.
            </p>
            <div className="hero-cta-buttons">
              <a href="/contacto#calendario-reserva" className="btn-primary-hero">
                Empezar Proyecto
              </a>
              <a
                href="#solicitar-demo"
                className="btn-secondary-hero"
                onClick={handleScrollSmooth}
              >
                Solicitar Demo Gratis
              </a>
            </div>
          </div>

          {/* EL MAC ANIMADO */}
          <div className="hero-demos-visual">
            <div className="mac-mockup-container">
              <div className="mac-mockup-hero">
                <div className="mac-head">
                  <div className="mac-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="mac-url">mndesignweb.es/demos</div>
                </div>
                <div className="mac-body">
                  <div
                    className="mac-img-scroll"
                    style={{
                      backgroundImage:
                        "url('/mockups/psicologia-especializada-mockup.webp')",
                    }}
                  ></div>
                </div>
              </div>
              <div className="scroll-hint">
                <i className="fa-solid fa-mouse"></i>
                <span>Desplaza para ver más</span>
              </div>
            </div>
          </div>
        </header>

        {/* LA CUADRÍCULA DE DEMOS */}
        {bloquesDemos.map((bloque, index) => (
          <motion.section
            className="demos-section"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-title-container">
              <h2>{bloque.categoria}</h2>
              <p className="section-subtitle">{bloque.descripcion}</p>
            </div>

            <div className="portfolio-grid">
              {bloque.demos.map((demo) => (
                <div key={demo.slug} className="portfolio-card demo-card-custom">
                  {/* EL NAVEGADOR DE LA DEMO */}
                  <div className="browser-mockup-complex">
                    <div className="tabs-head">
                      <div className="tab-open">
                        <div className="rounded-l">
                          <div className="mask-round"></div>
                        </div>
                        <span>{demo.titulo}</span>
                        <div className="close-tab">
                          <i className="fa-solid fa-xmark"></i>
                        </div>
                        <div className="rounded-r">
                          <div className="mask-round"></div>
                        </div>
                      </div>
                      <div className="window-opt">
                        <button>
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <button>
                          <i className="fa-regular fa-square"></i>
                        </button>
                        <button className="window-close">
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>
                    </div>

                    <div className="head-browser">
                      <button>
                        <i className="fa-solid fa-arrow-left"></i>
                      </button>
                      <button disabled>
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                      <input
                        type="text"
                        readOnly
                        value={
                          demo.url
                            ? demo.url.replace("https://", "").replace(/\/$/, "")
                            : ""
                        }
                      />
                      <button>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <div className="star">
                        <i className="fa-regular fa-star"></i>
                      </div>
                    </div>
                  </div>

                  {/* LA PANTALLA CON EL SCROLL */}
                  <div className="mockup-body">
                    <div
                      className="project-img-scroll"
                      style={{
                        backgroundImage: `url("/mockups/${demo.slug}.webp")`,
                      }}
                    ></div>
                  </div>

                  {/* LA INFORMACIÓN DE LA DEMO */}
                  <div className="demo-meta">
                    <span className="badge-destacado-custom">{demo.tag}</span>
                    <h3>{demo.titulo}</h3>
                    <p>{demo.detalles}</p>
                  </div>

                  {/* BOTÓN ESQUINERO */}
                  <a
                    href={demo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-visitar-esquina"
                    aria-label={`Ver demo de ${demo.titulo}`}
                  >
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </motion.div>
    </>
  );
};

export default HeaderDemos;
