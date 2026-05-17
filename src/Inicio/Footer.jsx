import React, { useEffect } from "react";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-site tema-oscuro">
      <div className="footer-container">
        {/* PARTE SUPERIOR: Logo y Columnas */}
        <div className="footer-main">
          <div className="footer-brand">
            <a href="/" aria-label="Ir a inicio" className="footer-logo-link">
              {/* 1. Tu circulito */}
              <img src="/favicon.png" alt="Símbolo MN" className="footer-logo-img" />
              {/* 2. Tu texto original */}
              <h2 className="footer-logo">MN <span>Design Web</span></h2>
            </a>
            <p className="footer-tagline">
              Transformamos tu visión en un ecosistema digital de alto rendimiento. Especialistas en diseño web estratégico y desarrollo a medida enfocado en conversiones, escalabilidad y resultados reales para tu negocio.
            </p>
          </div>

          {/* COLUMNA 2 (LA NUEVA IDEA DEL MEDIO): CONTACTO RÁPIDO */}
          <div className="footer-contacto-medio">
            <h3>¿HABLEMOS DE TU PROYECTO?</h3>
            <a href="mailto:info@mndesignweb.es" className="correo-gigante">
              info@mndesignweb.es
            </a>
            <p className="horario-texto">Lunes a Viernes | 09:00 - 18:00</p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-column">
              <h3>ESPECIALIDADES</h3>
              <ul>
                <li><a href="#diseno">Diseño Web</a></li>
                <li><a href="#ecommerce">E-commerce / Tienda Online</a></li>
                <li><a href="#seo">Posicionamiento SEO</a></li>
                <li><a href="#mantenimiento">Mantenimiento Web</a></li>
                <li><a href="#rrss">Gestión Redes Sociales</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>EMPRESA</h3>
              <ul>
                <li><a href="#contacto">Contacto</a></li>
                <li><a href="#nosotros">Nosotros</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* PARTE INFERIOR: Redes, Legal y Copyright */}
        <div className="footer-bottom">
          <div className="enlaces-externos">
            <a 
              href="https://www.instagram.com/mndesignweb/" 
              aria-label="Instagram" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-enlace-icono"
            >
              <img src="/instagram-icon.svg" alt="Instagram" className="footer-img-raw" />
            </a>
            
            <a 
              href="https://www.linkedin.com/in/mar%C3%ADa-nadal-masi%C3%A1-080a77315/" 
              aria-label="LinkedIn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-enlace-icono"
            >
              <img src="/linkedin.svg" alt="LinkedIn" className="footer-img-raw" />
            </a>
            
            <a 
              href="https://www.facebook.com/people/MN-Design-Web/61588142654941/?locale=es_ES" 
              aria-label="Facebook" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-enlace-icono"
            >
              <img src="/facebook-icon.svg" alt="Facebook" className="footer-img-raw" />
            </a>

            <a 
              href="https://github.com/MNMRYK" 
              aria-label="GitHub" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-enlace-icono"
            >
              <img src="/GitHub_dark.svg" alt="GitHub" className="footer-img-raw" />
            </a>

          </div>

          <div className="footer-legal">
            <a href="/aviso-legal">Aviso legal</a>
            <a href="/privacidad">Política de privacidad</a>
            <a href="/cookies">Política de Cookies</a>
          </div>

          <div className="footer-copy">
            Web diseñada por © MN Design Web 2026
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;