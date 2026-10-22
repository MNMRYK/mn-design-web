import React from 'react';
import { PREGUNTAS_DEMO } from './preguntasDemo';
import Icono from '../utils/Icono';
import './FaqDemo.css';

const FaqDemo = () => {
  return (
    <div className="demo-faq-area">
      <h3>¿Cómo funciona la Demo?</h3>

      {PREGUNTAS_DEMO.map(({ icono, pregunta, respuesta }) => (
        <div className="faq-item" key={pregunta}>
          <div className="faq-icon"><Icono nombre={icono} /></div>
          <div className="faq-content">
            <h4>{pregunta}</h4>
            {respuesta.map((parrafo, i) => (
              <p key={i}>{parrafo}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqDemo;
