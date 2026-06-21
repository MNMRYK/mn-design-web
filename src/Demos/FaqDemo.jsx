import React from 'react';
import './FaqDemo.css';

const FaqDemo = () => {
  return (
    <div className="demo-faq-area">
      <h3>¿Cómo funciona la Demo?</h3>
      
      <div className="faq-item">
        <div className="faq-icon"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
        <div className="faq-content">
          <h4>¿Qué incluye exactamente?</h4>
          <p>Diseñamos la estructura principal adaptada a tu marca, paleta de colores y modelo de negocio para que visualices el resultado real.</p>
        </div>
      </div>

      <div className="faq-item">
        <div className="faq-icon"><i className="fa-solid fa-comments-dollar"></i></div>
        <div className="faq-content">
          <h4>¿De verdad es 100% gratis?</h4>
          <p>Totalmente. Es nuestra forma de demostrarte la calidad de nuestro diseño antes de que inviertas con nosotros.</p>
        </div>
      </div>

      <div className="faq-item">
        <div className="faq-icon"><i className="fa-regular fa-clock"></i></div>
        <div className="faq-content">
          <h4>¿Cuánto tardáis en hacerla?</h4>
          <p>Analizamos tu formulario y en un plazo de 48h nos reunimos contigo por videollamada para presentarte el prototipo.</p>
        </div>
      </div>

      <div className="faq-item">
        <div className="faq-icon"><i className="fa-solid fa-handshake-angle"></i></div>
        <div className="faq-content">
          <h4>¿Qué pasa después?</h4>
          <p>Si la demo te encaja, trazamos la estrategia técnica y te pasamos un presupuesto cerrado para desarrollar la web completa. Sin compromisos.</p>
        </div>
      </div>
    </div>
  );
};

export default FaqDemo;