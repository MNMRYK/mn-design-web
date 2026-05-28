import React, { useEffect, useRef } from 'react';
import './BarraConfianza.css';

const badges = [
  { name: "Especialistas Shopify", icon: "./shopify.svg" },
  { name: "Rescate Express", icon: "/landing/rescate.svg" },               
  { name: "Seguridad Verificada", icon: "/iconos/escudo.svg" },   
  { name: "Especialistas Wordpress", icon: "./wordpress.svg" },            
  { name: "Optimización SEO", icon: "/landing/landing2.svg" },
  { name: "Gestión redes Sociales", icon: "/landing/redes.svg" },  
  { name: "Campañas de retos en Redes", icon: "/landing/retos.svg" },
  { name: "Auditoría 24h", icon: "/landing/auditoria.svg" },                     
  { name: "Soporte Premium", icon: "/landing/soporte.svg" },                 
  { name: "Automatización IA", icon: "/landing/servicio10.svg" },         
  { name: "Webs Alto Rendimiento", icon: "/landing/rendimiento.svg" },            
];

export const BarraConfianza = () => {
  useEffect(() => {
    // Creamos al vigilante
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Si la sección entra un 15% en la pantalla...
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible'); // ¡La mostramos!
                observer.unobserve(entry.target); // Dejamos de vigilarla
            }
        });
    }, { threshold: 0.15 });

    // Buscamos a todos los que tienen la clase escondida y los vigilamos
    const elementos = document.querySelectorAll('.reveal-on-scroll');
    elementos.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {/* Duplicamos el array para el efecto infinito */}
        {[...badges, ...badges].map((badge, index) => (
          <div className="badge-card " key={index}>
            <img src={badge.icon} alt={badge.name} className="badge-icon" />
            <span className="badge-text">{badge.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarraConfianza;