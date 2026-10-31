import React, { useEffect, useRef, useState } from "react";
import "../Creativos/Creativos.css";

// "Formatos que trabajamos" de /redes-sociales/: pestañas + un móvil dibujado en CSS con una
// vista previa animada del formato activo (solo formas y degradados de la paleta: sin imágenes
// ni textos inventados). Rota sola cada 4 s mientras la sección se ve en pantalla; se pausa al
// pasar el ratón o enfocar, y deja de rotar en cuanto se elige una pestaña.
// Animaciones CSS solo con transform y opacity; con "reducir movimiento", estáticas.

const FORMATOS = [
  { id: "publicaciones", nombre: "Publicaciones", proporcion: "1:1 / 4:5", frase: "La pieza básica del perfil: una imagen o un diseño que se entiende de un vistazo." },
  { id: "carruseles", nombre: "Carruseles", proporcion: "4:5", frase: "Varias diapositivas para explicar un servicio o contar una idea paso a paso." },
  { id: "reels", nombre: "Reels y vídeos cortos", proporcion: "9:16", frase: "Vídeo vertical para mostrar tu producto, tu espacio o tu forma de trabajar." },
  { id: "stories", nombre: "Stories", proporcion: "9:16", frase: "Contenido del día a día, con plantillas para que todas sigan la misma línea." },
  { id: "portadas", nombre: "Portadas", proporcion: "Reels y destacados", frase: "Las portadas que ordenan tu perfil para que se vea como un conjunto." },
  { id: "campanas", nombre: "Piezas para campañas", proporcion: "Varios tamaños", frase: "Una misma pieza adaptada a cada formato y a cada red." },
];

const INTERVALO = 4000;

// Vistas previas (decorativas)
const Vista = ({ id }) => {
  switch (id) {
    case "publicaciones":
      return (
        <div className="fv-post">
          <div className="fv-post-imagen"><span className="fv-circulo" /></div>
          <div className="fv-barras"><span /><span /></div>
        </div>
      );
    case "carruseles":
      return (
        <div className="fv-carrusel">
          <div className="fv-carrusel-pista">
            <span className="fv-diapo fv-diapo--1" />
            <span className="fv-diapo fv-diapo--2" />
            <span className="fv-diapo fv-diapo--3" />
          </div>
          <div className="fv-puntos"><span /><span /><span /></div>
        </div>
      );
    case "reels":
      return (
        <div className="fv-reel">
          <span className="fv-reel-forma" />
          <span className="fv-play" />
          <span className="fv-progreso"><span /></span>
        </div>
      );
    case "stories":
      return (
        <div className="fv-story">
          <div className="fv-segmentos"><span><i /></span><span><i /></span><span><i /></span></div>
          <span className="fv-story-forma" />
          <span className="fv-story-barra" />
        </div>
      );
    case "portadas":
      return (
        <div className="fv-perfil">
          <div className="fv-perfil-cabecera"><span className="fv-avatar" /><span className="fv-barras"><span /><span /></span></div>
          <div className="fv-destacados">{[0, 1, 2, 3].map((n) => <span key={n} />)}</div>
          <div className="fv-cuadricula">{[0, 1, 2, 3, 4, 5].map((n) => <span key={n} />)}</div>
        </div>
      );
    default:
      return (
        <div className="fv-campana">
          <span className="fv-pieza fv-pieza--cuadrada" />
          <span className="fv-pieza fv-pieza--vertical" />
          <span className="fv-pieza fv-pieza--story" />
        </div>
      );
  }
};

const FormatosRedes = () => {
  const [activo, setActivo] = useState(0);
  const [enPantalla, setEnPantalla] = useState(false);
  const [pausado, setPausado] = useState(false); // ratón encima o foco dentro
  const [elegido, setElegido] = useState(false); // ya se ha elegido una pestaña a mano
  const seccionRef = useRef(null);
  const pestanasRef = useRef([]);

  // Solo rota con la sección en pantalla
  useEffect(() => {
    const el = seccionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const obs = new IntersectionObserver(([e]) => setEnPantalla(e.isIntersecting), { threshold: 0.35 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!enPantalla || pausado || elegido || reducido) return undefined;
    const t = setInterval(() => setActivo((a) => (a + 1) % FORMATOS.length), INTERVALO);
    return () => clearInterval(t);
  }, [enPantalla, pausado, elegido]);

  const elegir = (i, enfocar = false) => {
    setActivo(i);
    setElegido(true);
    if (enfocar) pestanasRef.current[i]?.focus();
  };

  // Flechas, Inicio y Fin mueven el foco y activan la pestaña
  const alPulsarTecla = (e, i) => {
    const n = FORMATOS.length;
    const destino = {
      ArrowRight: (i + 1) % n,
      ArrowDown: (i + 1) % n,
      ArrowLeft: (i - 1 + n) % n,
      ArrowUp: (i - 1 + n) % n,
      Home: 0,
      End: n - 1,
    }[e.key];
    if (destino === undefined) return;
    e.preventDefault();
    elegir(destino, true);
  };

  const formato = FORMATOS[activo];

  return (
    <section
      ref={seccionRef}
      className="creativos-seccion creativos-seccion--compacta"
      aria-labelledby="redes-formatos-titulo"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setPausado(false)}
    >
      <div className="creativos-contenedor formatos">
        <div className="formatos-texto">
          <p className="creativos-etiqueta">Formatos</p>
          <h2 id="redes-formatos-titulo" className="creativos-h2">
            Formatos que <span className="creativos-degradado">trabajamos</span>
          </h2>
          <p className="creativos-subtitulo">
            Cada formato lleva un trabajo distinto. Por eso el reparto entre ellos se acuerda antes de
            empezar, según lo que necesite tu marca.
          </p>

          <div className="formatos-pestanas" role="tablist" aria-label="Formatos para redes sociales">
            {FORMATOS.map((f, i) => (
              <button
                key={f.id}
                ref={(el) => (pestanasRef.current[i] = el)}
                type="button"
                role="tab"
                id={`formato-pestana-${f.id}`}
                aria-selected={i === activo}
                aria-controls="formato-panel"
                tabIndex={i === activo ? 0 : -1}
                className="formatos-pestana"
                onClick={() => elegir(i)}
                onKeyDown={(e) => alPulsarTecla(e, i)}
              >
                <span className="formatos-pestana-cabecera">
                  <span className="formatos-pestana-nombre">{f.nombre}</span>
                  <span className="formatos-pestana-proporcion">{f.proporcion}</span>
                </span>
                <span className="formatos-pestana-frase">{f.frase}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          id="formato-panel"
          role="tabpanel"
          aria-labelledby={`formato-pestana-${formato.id}`}
          className="formatos-panel"
        >
          <div className="formatos-movil" aria-hidden="true">
            <span className="formatos-movil-isla" />
            <div className="formatos-pantalla" key={formato.id} data-formato={formato.id}>
              <Vista id={formato.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormatosRedes;
