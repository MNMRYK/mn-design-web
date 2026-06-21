import React from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "../Demos/HeaderDemos.css"; // Tu archivo de estilos

const LlamadaDemos = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollSmooth = (e) => {
    // Si estamos exactamente en la página de demos, hacemos el scroll suave de siempre
    if (location.pathname === "/demos") {
      e.preventDefault();
      const seccionFormulario = document.getElementById("solicitar-demo");
      if (seccionFormulario) {
        seccionFormulario.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

  };

  return (
    <motion.div
      className="secciones-diseno-wrapper"
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
            <a href="/demos" className="btn-primary-hero">
              Descubrir Demos
            </a>
            <a
              href="/demos#solicitar-demo"
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
                      "url('/mockups/demo-nutricion-mockup.webp')",
                  }}
                ></div>
              </div>
            </div>
            <div className="scroll-hint">
              <i className="fa-solid fa-computer-mouse"></i>
              <span>Pasa el cursor para explorar</span>
            </div>
          </div>
        </div>
      </header>
    </motion.div>
  );
};

export default LlamadaDemos;
