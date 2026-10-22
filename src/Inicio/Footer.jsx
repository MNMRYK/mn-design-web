import React from "react";
import './Footer.css';
import { abrirConfiguracionCookies } from '../utils/cookies';
import { CalendarDays, MessageCircle, MapPin } from 'lucide-react';

// Los clics en cal.com y wa.me se miden solos en index.html (click_reserva / click_whatsapp).
const WHATSAPP = 'https://wa.me/34645854934?text=' + encodeURIComponent('¡Hola! Vengo de vuestra web y me gustaría pedir información.');
const COMO_LLEGAR = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent('MN Design Web, Passeig del Comtat 75, 03820 Cocentaina, Alicante');

const Footer = () => {
  return (
    <footer className="footer-site tema-oscuro">
      <div className="footer-container">
        {/* PARTE SUPERIOR: Logo y Columnas */}
        <div className="footer-main">
          <div className="footer-brand">
            <a href="/" aria-label="Ir a inicio" className="footer-logo-link">
              {/* 1. Tu circulito */}
              <img src="/logo-morado.svg" alt="" width="50" height="50" className="footer-logo-img" />
              {/* 2. Tu texto original */}
              <p className="footer-logo">MN <span>Design Web</span></p>
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
            <a href="tel:+34645854934" className="correo-gigante">
              +34 645 85 49 34
            </a>
            <p className="horario-texto">Lunes a Viernes | 09:00 - 18:00</p>
          </div>

          {/* ACCIONES RÁPIDAS: llenan el hueco bajo la marca y el contacto */}
          <div className="footer-acciones">
            <a href="https://cal.com/mndesignweb/reunion-30-min" target="_blank" rel="noopener noreferrer" className="footer-accion">
              <span className="footer-accion-icono"><CalendarDays aria-hidden="true" /></span>
              <span>
                <span className="footer-accion-titulo">Reserva una videollamada</span>
                <span className="footer-accion-texto">30 minutos, gratis y sin compromiso</span>
              </span>
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="footer-accion">
              <span className="footer-accion-icono"><MessageCircle aria-hidden="true" /></span>
              <span>
                <span className="footer-accion-titulo">Escríbenos por WhatsApp</span>
                <span className="footer-accion-texto">Respuesta en menos de 24 h laborables</span>
              </span>
            </a>
            <a href={COMO_LLEGAR} target="_blank" rel="noopener noreferrer" className="footer-accion">
              <span className="footer-accion-icono"><MapPin aria-hidden="true" /></span>
              <span>
                <span className="footer-accion-titulo">Cómo llegar</span>
                <address className="footer-accion-texto">Passeig del Comtat, 75 · 03820 Cocentaina (Alicante)</address>
              </span>
            </a>
          </div>

          <div className="footer-links-grid">
            <div className="footer-column">
              <h3>ESPECIALIDADES</h3>
              <ul>
                <li><a href="/disenoweb/">Diseño Web</a></li>
                <li><a href="/e-commerce/">E-commerce</a></li>
                <li><a href="/posicionamiento-seo/">Posicionamiento SEO</a></li>
                <li><a href="/redes-sociales/">Redes Sociales</a></li>
                <li><a href="/demos/">Demos</a></li>
                
                <li><a href="https://mndesignweb.es/clinicas/">Para Clínicas </a></li>
                <li><a href="https://mndesignweb.es/nutricionistas/">Para Nutricionistas</a></li>
                <li><a href="https://mndesignweb.es/psicologos/">Para Psicólogos</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>EMPRESA</h3>
              <ul>
                <li><a href="/contacto/">Contacto</a></li>
                <li><a href="/nosotros/">Nosotros</a></li>
                <li><a href="https://mndesignweb.es/aprende-shopify/">Aprende Shopify</a></li>
                <li><a href="https://mndesignweb.es/blog/">Blog</a></li>
                <li><a href="https://mndesignweb.es/alcoi/">Diseño web en Alcoy</a></li>
                <li><a href="https://mndesignweb.es/software-a-mida-alcoi/" lang="ca">Software a mida (Alcoi i Cocentaina)</a></li>
                <li><a href="https://mndesignweb.es/academia-nutricion/">Academias E-Learning</a></li>
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
            <a href="/aviso-legal/">Aviso legal</a>
            <a href="/privacidad/">Política de privacidad</a>
            <a href="/cookies/">Política de Cookies</a>
            <a href="/cookies/" onClick={abrirConfiguracionCookies}>Configurar cookies</a>
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