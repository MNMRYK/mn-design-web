import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-site">
      <div className="footer-container">
        {/* PARTE SUPERIOR: Logo y Columnas */}
        <div className="footer-main">
          <div className="footer-brand">
            <h2 className="footer-logo">MN <span>Design Web</span></h2>
            <p className="footer-tagline">Especialistas en código a medida con .NET y WordPress desde Alcoy.</p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-column">
              <h3>ESPECIALIDADES</h3>
              <ul>
                <li><a href="#diseno">Diseño Web</a></li>
                <li><a href="#ecommerce">E-commerce / Tienda Online</a></li>
                <li><a href="#seo">Posicionamiento SEO</a></li>
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
          <div className="footer-socials">
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.linkedin.com/in/mar%C3%ADa-nadal-masi%C3%A1-080a77315/" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://github.com/MNMRYK" aria-label="GitHub"><i className="fab fa-github"></i></a>
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