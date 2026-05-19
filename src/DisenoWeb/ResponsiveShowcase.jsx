import React, { useState } from 'react';
import './ResponsiveShowcase.css'; // 🔥 Recuerda poner aquí el nombre de tu archivo CSS real

const ResponsiveShowcase = () => {
  // Estado para controlar qué dispositivo está activo en el simulador
  const [dispositivoActivo, setDispositivoActivo] = useState('desktop');

  // ===================================================
  // NUEVA SECCIÓN: RESPONSIVE INTERACTIVO
  // ===================================================
  return (
    <section className="seccion-responsive-showcase tema-oscuro">
      <div className="responsive-flex-container">
        
        {/* LADO IZQUIERDO: Simulador Visual */}
        <div className="canvas-simulador-container">
          <div className={`simulador-device-wrapper ${dispositivoActivo}`}>
            
            {/* Cabecera del navegador simulado */}
            <div className="simulador-device-bar">
              <div className="simulador-dots">
                <span style={{background: '#FF5F56'}}></span>
                <span style={{background: '#FFBD2E'}}></span>
                <span style={{background: '#27C93F'}}></span>
              </div>
              <div className="simulador-browser-tab">
                <i className="fa-solid fa-lock" style={{fontSize: '10px'}}></i> mndesignweb.es
              </div>
            </div>
            
            {/* Contenido de la mini-web que reacciona al tamaño */}
            <div className="simulador-device-screen">
              <div className="mini-web-header">
                <span className="mini-web-logo">MN Design Web</span>
                <div className="mini-web-nav-links">
                  <span>Inicio</span>
                  <span>Proyectos</span>
                  <span>Contacto</span>
                </div>
                <i className="fa-solid fa-bars mini-web-burger"></i>
              </div>
              
              <div className="mini-web-hero">
                <h5>Diseño Líquido</h5>
                <p>Arquitecturas que se adaptan con precisión.</p>
              </div>

              <div className="mini-web-grid">
                <div className="mini-web-card">
                  <img src="/iconos/cohete.svg" alt="Rápido" className="simulador-icono-svg" />
                  <h6>Rápido</h6>
                </div>
                <div className="mini-web-card">
                  <img src="/iconos/lupa.svg" alt="SEO" className="simulador-icono-svg" />
                  <h6>SEO</h6>
                </div>
                <div className="mini-web-card">
                  <img src="/iconos/escudo.svg" alt="Seguro" className="simulador-icono-svg" />
                  <h6>Seguro</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: Textos y Botones */}
        <div className="responsive-text-content">
          <h2>
            <span className="titulo-responsive-oscuro">Diseño Web Responsivo</span>
            <br />
            <span className="titulo-responsive-claro">Tu marca, impecable en cada dispositivo</span>
          </h2>
          
          <p className="responsive-paragraph-highlight">
            En <strong>MN Design Web</strong>, no solo diseñamos páginas bonitas; creamos arquitecturas líquidas que se adaptan con precisión quirúrgica a cualquier resolución. Entendemos que el <strong>posicionamiento SEO</strong> y la <strong>experiencia de usuario (UX)</strong> caminan de la mano: un sitio que no carga perfecto en un móvil o se ve vacío en un monitor 4K, es un sitio que pierde clientes.
          </p>
          
          <p className="responsive-paragraph-secondary">
            Aplicamos estándares de diseño <strong>Mobile-First</strong> para asegurar que tu web sea rápida, intuitiva y profesional, superando las exigencias de los Core Web Vitals de Google en:
          </p>

          {/* Controles interactivos */}
          <div className="simulador-buttons-row">
            <button 
              className={dispositivoActivo === 'xl' ? 'btn-device active' : 'btn-device'} 
              onClick={() => setDispositivoActivo('xl')}
            >
              <i className="fa-solid fa-desktop"></i>
              <span>Monitor XL</span>
            </button>
            <button 
              className={dispositivoActivo === 'desktop' ? 'btn-device active' : 'btn-device'} 
              onClick={() => setDispositivoActivo('desktop')}
            >
              <i className="fa-solid fa-laptop"></i>
              <span>Monitor Normal</span>
            </button>
            <button 
              className={dispositivoActivo === 'tablet' ? 'btn-device active' : 'btn-device'} 
              onClick={() => setDispositivoActivo('tablet')}
            >
              <i className="fa-solid fa-tablet-screen-button"></i>
              <span>Tablet</span>
            </button>
            <button 
              className={dispositivoActivo === 'mobile' ? 'btn-device active' : 'btn-device'} 
              onClick={() => setDispositivoActivo('mobile')}
            >
              <i className="fa-solid fa-mobile-screen-button"></i>
              <span>Móvil</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ResponsiveShowcase;