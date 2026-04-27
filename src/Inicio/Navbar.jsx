import React, { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion"; 
import "./Navbar.css";

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [desplegableAbierto, setDesplegableAbierto] = useState(false);
  
  // --- LÓGICA SMART SCROLL Y CAMBIO DE COLOR ---
  const [oculto, setOculto] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // NUEVO ESTADO
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious ? scrollY.getPrevious() : 0;
    
    // 1. Detectar si hemos pasado el Hero (ej: 90px de scroll)
    if (latest > window.innerHeight * 0.90) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // 2. Ocultar/Mostrar el menú al bajar/subir (Solo si ya hemos bajado un poco)
    if (latest > previous && latest > 150) {
      setOculto(true);
    } else {
      setOculto(false);
    }
  });

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  
  return (
    <header 
      className={`navbar-header ${isScrolled ? "scrolled" : "top"} ${oculto ? "escondido" : ""}`}
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
              Especialidades <span className="flecha">▾</span>
            </a>
            <ul className="desplegable">
              <li><a href="/diseno-web">Diseño Web</a></li>
              <li><a href="/e-commerce">E-commerce</a></li>
              <li><a href="/posicionamiento-seo">Posicionamiento SEO</a></li>
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