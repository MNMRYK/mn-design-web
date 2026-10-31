import React, { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import "./Navbar.css";
import Icono from "../utils/Icono";
import { SERVICIOS, SECTORES, MENU, CONTACTO } from "../utils/navegacion";

// Columnas del desplegable "Servicios"
const GRUPOS = [
  { id: "menu-grupo-servicios", titulo: "Servicios", enlaces: SERVICIOS },
  { id: "menu-grupo-sectores", titulo: "Por sector", enlaces: SECTORES },
];

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [desplegableAbierto, setDesplegableAbierto] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const botonServiciosRef = useRef(null);
  const botonMenuRef = useRef(null);

  // --- LÓGICA HÍBRIDA: MATEMÁTICAS + ESCÁNER VISUAL ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    // 🎯 1. LA LÓGICA DE TU HERO (La que ya tenías)
    const heroElement = document.querySelector(".hero-section-container");

    // Si la página actual tiene un Hero, comprobamos las matemáticas
    if (heroElement) {
      const heroHeight = heroElement.offsetHeight;

      // Si estamos dentro del Hero (respetando tus 50px de margen)...
      if (latest <= heroHeight - 50) {
        setIsScrolled(false); // Mantenemos textos blancos (clase "top")
        return; // 🔥 IMPORTANTE: Cortamos la función aquí. El Hero manda.
      }
    }

    // 🎯 2. EL ESCÁNER VISUAL (Para el resto de la web y secciones inferiores)
    // Si no hay Hero en esta página, o si ya hemos hecho scroll por debajo de él, entra esto:
    const x = window.innerWidth / 2;
    const y = 30; // Altura aproximada donde está tu Navbar

    // Obtenemos qué hay exactamente debajo del centro del Navbar
    const elementsUnder = document.elementsFromPoint(x, y);

    if (!elementsUnder) return;

    // Buscamos si algún elemento debajo del menú tiene la clase 'tema-oscuro'
    // Usamos .closest() por si el Navbar está pisando un texto o una foto que está dentro de esa sección
    const isOverDarkTheme = elementsUnder.some(
      (el) => el.closest && el.closest(".tema-oscuro"),
    );

    if (isOverDarkTheme) {
      setIsScrolled(false); // Fondo oscuro detectado -> Textos blancos (clase "top")
    } else {
      setIsScrolled(true); // Fondo claro detectado -> Textos morados (clase "scrolled")
    }
  });

  // Teclado: Escape cierra el desplegable (o el menú del móvil) y devuelve el foco al botón
  useEffect(() => {
    if (!menuAbierto && !desplegableAbierto) return undefined;
    const alPulsarTecla = (e) => {
      if (e.key !== "Escape") return;
      if (desplegableAbierto) {
        setDesplegableAbierto(false);
        botonServiciosRef.current?.focus();
      } else {
        setMenuAbierto(false);
        botonMenuRef.current?.focus();
      }
    };
    document.addEventListener("keydown", alPulsarTecla);
    return () => document.removeEventListener("keydown", alPulsarTecla);
  }, [menuAbierto, desplegableAbierto]);

  // Si el foco sale del desplegable con el tabulador, se cierra
  const alPerderFoco = (e) => {
    if (window.innerWidth > 1052 && !e.currentTarget.contains(e.relatedTarget)) {
      setDesplegableAbierto(false);
    }
  };

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  return (
    <header className={`navbar-header ${isScrolled ? "scrolled" : "top"} `}>
      <a href="/" className="enlace-logo">
        <div className="logo">
          <img src="/pajaro-morado.svg" alt="Logo MN Design Web" />
          <div className="texto-logo">
            <span className="siglas">MN</span>
            <span className="marca">Design Web</span>
          </div>
        </div>
      </a>

      <nav aria-label="Principal">
        <button
          ref={botonMenuRef}
          type="button"
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
          aria-controls="menu-principal"
        >
          <Icono nombre={menuAbierto ? "times" : "bars"} />
        </button>

        <ul id="menu-principal" className={`menu-principal ${menuAbierto ? "active" : ""}`}>
          <li
            className={`tiene-desplegable ${desplegableAbierto ? "abierto" : ""}`}
            onBlur={alPerderFoco}
            onMouseLeave={() => window.innerWidth > 1052 && setDesplegableAbierto(false)}
          >
            {/* En ordenador se abre al pasar el ratón (CSS) y también con clic o teclado */}
            <button
              ref={botonServiciosRef}
              type="button"
              className="boton-desplegable"
              aria-expanded={desplegableAbierto}
              aria-controls="menu-servicios"
              onClick={() => setDesplegableAbierto(!desplegableAbierto)}
            >
              Servicios <span className="flecha" aria-hidden="true">▾</span>
            </button>
            <div id="menu-servicios" className="desplegable">
              {GRUPOS.map((grupo) => (
                <div className="desplegable-grupo" key={grupo.id}>
                  <p className="desplegable-titulo" id={grupo.id}>
                    {grupo.titulo}
                  </p>
                  <ul aria-labelledby={grupo.id}>
                    {grupo.enlaces.map((enlace) => (
                      <li key={enlace.url}>
                        <a href={enlace.url}>{enlace.texto}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
          {MENU.map((enlace) => (
            <li key={enlace.url}>
              <a href={enlace.url}>{enlace.texto}</a>
            </li>
          ))}
          <li>
            <a href={CONTACTO.url} className="boton-contacto">
              {CONTACTO.texto}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
