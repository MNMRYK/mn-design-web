import React, { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion"; 
import "./Navbar.css";

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [desplegableAbierto, setDesplegableAbierto] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // --- LÓGICA HÍBRIDA: MATEMÁTICAS + ESCÁNER VISUAL ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    
    // 🎯 1. LA LÓGICA DE TU HERO (La que ya tenías)
    const heroElement = document.querySelector('.hero-section-container');
    
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
    const isOverDarkTheme = elementsUnder.some(el => el.closest && el.closest('.tema-oscuro'));

    if (isOverDarkTheme) {
      setIsScrolled(false); // Fondo oscuro detectado -> Textos blancos (clase "top")
    } else {
      setIsScrolled(true);  // Fondo claro detectado -> Textos morados (clase "scrolled")
    }
  });

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  return (
    <header 
      className={`navbar-header ${isScrolled ? "scrolled" : "top"} `}
    >
      <a href="/" className="enlace-logo">
        <div className="logo">
          <img src="/logo.png" alt="Logo MN Design Web" />
          <div className="texto-logo">
            <span className="siglas">MN</span>
            <span className="marca">Design Web</span>
          </div>
        </div>
      </a>

      <nav>
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Abrir menú">
          <i className={menuAbierto ? "fas fa-times" : "fas fa-bars"}></i>
        </button>

        <ul className={`menu-principal ${menuAbierto ? "active" : ""}`}>
          <li className={`tiene-desplegable ${desplegableAbierto ? "abierto" : ""}`}>
            <a href="#" onClick={(e) => {
              if (window.innerWidth <= 1052) {
                e.preventDefault();
                setDesplegableAbierto(!desplegableAbierto);
              }
            }}>
              Servicios <span className="flecha">▾</span>
            </a>
            <ul className="desplegable">
              <li><a href="/disenoweb">Diseño Web</a></li>
              <li><a href="/e-commerce">E-commerce</a></li>
              <li><a href="/posicionamiento-seo">Posicionamiento SEO</a></li>
              <li><a href="/redessociales">Redes Sociales</a></li>
            </ul>
          </li>
          <li><a href="/portfolio">Portfolio</a></li>
          <li><a href="/nosotros">Nosotros</a></li>
          <li><a href="/contacto" className="boton-contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;