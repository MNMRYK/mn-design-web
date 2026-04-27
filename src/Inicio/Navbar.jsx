import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion"; 
import "./Navbar.css";

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [desplegableAbierto, setDesplegableAbierto] = useState(false);
  
  // --- LÓGICA SMART SCROLL ---
  const [oculto, setOculto] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Obtenemos el valor justo anterior manualmente
    const previous = scrollY.getPrevious ? scrollY.getPrevious() : 0;
    
    // Si bajamos más de 100px y la dirección es hacia abajo
    if (latest > previous && latest > 100) {
      setOculto(true);
    } else {
      setOculto(false);
    }
  });

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  
  return (
    <motion.header 
      className="navbar-header"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" }, // Lo mandamos bien lejos arriba
      }}
      animate={oculto ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
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
              if (window.innerWidth <= 950) {
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
    </motion.header>
  );
};

export default Navbar;