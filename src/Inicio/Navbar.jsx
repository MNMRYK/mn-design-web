import React, { useState } from "react";
// 1. IMPORTA MOTION
import { motion } from "framer-motion"; 
import "./Navbar.css";

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [desplegableAbierto, setDesplegableAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const toggleDesplegable = (e) => {
    if (window.innerWidth <= 950) {
      e.preventDefault();
      setDesplegableAbierto(!desplegableAbierto);
    }
  };

  return (
    /* 2. CAMBIA EL <header> POR <motion.header> */
    <motion.header 
      className="navbar-header"
      initial={{ opacity: 0, y: -20 }} // Empieza invisible y un poco más arriba
      animate={{ opacity: 1, y: 0 }}    // Baja a su posición original y aparece
      transition={{ duration: 0.8, ease: "easeOut" }} // Duración suave
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
            <a href="#" onClick={toggleDesplegable}>
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