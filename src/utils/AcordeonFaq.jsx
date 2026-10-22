import React, { useId, useState } from 'react';
import { motion } from 'framer-motion';
import Icono from './Icono';

// Acordeón de preguntas frecuentes compartido por /disenoweb/, /e-commerce/,
// /posicionamiento-seo/ y /redes-sociales/. Cada página conserva su CSS: `prefijo` es el
// comienzo de sus clases (faq-minimal-*, faqec-minimal-*, seo-minimal-*, redes-minimal-*).
//
// Las preguntas salen del mismo array que genera el FAQPage del schema (src/seo/faq.js).
// Las respuestas están siempre en el HTML (plegadas con altura 0), no solo al abrirlas:
// Google exige que el contenido del FAQPage esté en la página.
const AcordeonFaq = ({ preguntas, prefijo, titulo = "Preguntas Frecuentes", subtitulo = "Resolvemos tus dudas antes de empezar a trabajar juntos." }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const idBase = useId();

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const alPulsarTecla = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFaq(index);
    }
  };

  return (
    <div className={`${prefijo}-minimal-contenedor`}>
      <div className={`${prefijo}-minimal-header`}>
        <h2>{titulo}</h2>
        <p>{subtitulo}</p>
      </div>

      <div className={`${prefijo}-minimal-lista`}>
        {preguntas.map((faq, index) => {
          const isOpen = activeIndex === index;
          const idRespuesta = `${idBase}-respuesta-${index}`;

          return (
            <div key={index} className={`${prefijo}-minimal-item`}>
              <div
                className={`${prefijo}-minimal-pregunta ${isOpen ? 'activa' : ''}`}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-controls={idRespuesta}
                onClick={() => toggleFaq(index)}
                onKeyDown={(e) => alPulsarTecla(e, index)}
              >
                <h3>{faq.pregunta}</h3>
                <div className={`${prefijo}-minimal-icono`} aria-hidden="true">
                  <Icono nombre="chevron-down" className={isOpen ? 'rotado' : ''} />
                </div>
              </div>

              <motion.div
                id={idRespuesta}
                initial={false}
                animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`${prefijo}-minimal-respuesta-wrapper`}
                aria-hidden={!isOpen}
                inert={!isOpen}
              >
                <div className={`${prefijo}-minimal-respuesta`}>
                  {/* Las respuestas llevan <strong> y enlaces: se pintan como HTML */}
                  {faq.respuesta.map((parrafo, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: parrafo }} />
                  ))}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AcordeonFaq;
