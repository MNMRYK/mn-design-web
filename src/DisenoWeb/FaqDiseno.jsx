import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FaqDiseno.css';

// Tus preguntas con formato de múltiples párrafos para que quede perfecto
const faqs = [
  {
    pregunta: "¿Está incluido el mantenimiento técnico?",
    respuesta: [
      "El Plan Esencial incluye el primer año de <strong>soporte y mantenimiento Premium</strong>. Para el resto de planes o renovaciones, ofrecemos un servicio de mantenimiento gestionado con condiciones especiales:",
      "• <strong>Mantenimiento Estandar:</strong> desde 85€ / mes.",
      "• <strong>Oferta Nuevo Cliente</strong> (15% dto.): desde 65€ / mes el primer año (si no han contratado el Plan Esencial).",
      "• <strong>Precio Renovación 2º año</strong> (50% dto. de fidelidad): desde 55€ / mes"
    ]
  },
  {
    pregunta: "¿Qué gastos adicionales tiene mantener mi página web?",
    respuesta: [
      "Además del diseño, toda web requiere un <strong>Dominio</strong> (tu nombre en internet) y un <strong>Hosting</strong> (donde se aloja el contenido). Asimismo, si tu proyecto requiere <strong>funcionalidades premium especializadas</strong>, estas pueden conllevar un coste de licencia adicional.",
      "En MN Design Web siempre te informaremos con <strong>total transparencia</strong>."
    ]
  },
  {
    pregunta: "¿Cuánto cuesta diseñar una página web profesional?",
    respuesta: [
      "El precio varía según la complejidad, pero en MN Design Web ofrecemos planes desde 350€ (en oferta) que garantizan un <strong>diseño profesional, rápido y optimizado para SEO</strong> desde el primer día.",
      "**Siempre escuchamos qué proyecto quieres llevar a cabo para ofrecerte un <strong>presupuesto adaptado</strong>."
    ]
  },
  {
    pregunta: "¿Cuánto tiempo se tarda en crear una página web?",
    respuesta: [
      "Dependiendo del proyecto suelen oscilar entre <strong>1 a 3 semanas</strong>, pero trabajamos con procesos optimizados para que tu web esté <strong>lista en tiempo récord</strong>, asegurando que cada sección funcione a la perfección."
    ]
  },
  {
    pregunta: "¿Mi web aparecerá en los primeros resultados de Google?",
    respuesta: [
      "No solo diseñamos; optimizamos la estructura para el <strong>posicionamiento en buscadores (SEO)</strong>. Usamos herramientas como Rank Math y <strong>datos estructurados</strong> para que Google entienda y priorice tu contenido."
    ]
  },
  {
    pregunta: "¿Podré gestionar yo mismo el contenido de la web?",
    respuesta: [
      "Nos aseguramos que sepas controlar el contenido que necesites para que puedas <strong>actualizar textos, imágenes y gestionar tus reservas</strong> de forma <strong>totalmente autogestionable</strong>."
    ]
  },
  {
    pregunta: "¿Tengo una web del Kit Digital, podéis mejorarla?",
    respuesta: [
      "¡Por supuesto! Si tienes una web creada con el <strong>Kit Digital</strong> que no te convence o no está dando resultados, realizamos un <strong>rediseño completo y optimización profesional</strong>.",
      "Como queremos ayudarte a dar el salto de calidad, te ofrecemos un <strong>20% de descuento adicional</strong> ¡Contacta con nosotros y cuéntanos tu caso!"
    ]
  }
];

const FaqDiseno = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-minimal-contenedor">
      <div className="faq-minimal-header">
        <h2>Preguntas Frecuentes</h2>
        <p>Resolvemos tus dudas antes de empezar a trabajar juntos.</p>
      </div>

      <div className="faq-minimal-lista">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div key={index} className="faq-minimal-item">
              <div 
                className={`faq-minimal-pregunta ${isOpen ? 'activa' : ''}`} 
                onClick={() => toggleFaq(index)}
              >
                <h3>{faq.pregunta}</h3>
                <div className="faq-minimal-icono">
                  <i className={`fa-solid fa-chevron-down ${isOpen ? 'rotado' : ''}`}></i>
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="faq-minimal-respuesta-wrapper"
                  >
                    <div className="faq-minimal-respuesta">
                      {/* Usamos dangerouslySetInnerHTML para que React nos lea las etiquetas <strong> */}
                      {faq.respuesta.map((parrafo, i) => (
                        <p key={i} dangerouslySetInnerHTML={{ __html: parrafo }} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqDiseno;