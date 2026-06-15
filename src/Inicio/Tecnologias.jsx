import React from "react";
import './Tecnologias.css';

const techLogos = [
  { name: 'WordPress', url: './wordpress.svg' },
  { name: 'Shopify', url: './shopify.svg' },
  { name: 'WooCommerce', url: './woocommerce.svg' },
  { name: 'PrestaShop', url: './prestashop.svg' },
  { name: 'HTML5', url: './html5.svg' },
  { name: 'CSS3', url: './css.svg' },
  { name: 'JavaScript', url: './javascript.svg' },
  { name: 'React', url: './react.svg' },
  { name: 'Python', url: './python.svg' },
  { name: 'PHP', url: './php.svg' },
  { name: 'SQL', url: './mysql.svg' },
  { name: 'APIs', url: './postman.svg' },
  { name: 'SaaS', url: './docker.svg' },
  { name: 'Node.js', url: './nodedotjs.svg' },

];

const Tecnologias = () => {
  
  return (
    <section className="tech-slider-section tema-oscuro">
      <div className="tech-slider-container">
        <div className="tech-track">
          {/* Duplicamos el array para que el scroll sea infinito sin cortes */}
          {[...techLogos, ...techLogos].map((tech, index) => (
            <div className="tech-card" key={index}>
              <div className="tech-icon-box">
                {/* Atributos width y height añadidos */}
                <img 
                  src={tech.url} 
                  alt={tech.name} 
                  className="tech-svg" 
                  width="70" 
                  height="70" 
                  loading="lazy" 
                />
              </div>
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tecnologias;