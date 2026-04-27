import React, { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion"; 
import "./Navbar.css";


const Navbar = () => {
  // 👇 ESTO ES LO QUE TE HABÍAS BORRADO SIN QUERER 👇
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [desplegableAbierto, setDesplegableAbierto] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // --- LÓGICA SMART SCROLL Y CAMBIO DE COLOR ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious ? scrollY.getPrevious() : 0;
    
    // 🔥 NUEVA LÓGICA INTELIGENTE (LA CINTA MÉTRICA) 🔥
    // 1. Buscamos el contenedor del Hero en la web
    const heroElement = document.querySelector('.hero-section-container');
    
    // 2. Calculamos su altura real (si no lo encuentra por lo que sea, usa la pantalla por defecto)
    const heroHeight = heroElement ? heroElement.offsetHeight : window.innerHeight;

    // 3. Cambiamos de color justo 50 píxeles antes de terminar el Hero, mida lo que mida
    if (latest > heroHeight - 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
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