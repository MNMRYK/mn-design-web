import React from 'react';
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
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {/* Duplicamos el array para el efecto infinito */}
        {[...badges, ...badges].map((badge, index) => (
          <div className="badge-card" key={index}>
            <img src={badge.icon} alt={badge.name} className="badge-icon" />
            <span className="badge-text">{badge.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarraConfianza;