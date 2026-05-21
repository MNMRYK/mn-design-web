import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FaqSeo.css';

// Tus preguntas con formato de múltiples párrafos para que quede perfecto
const faqs = [
  {
    pregunta: "¿Cuánto tiempo se tarda en ver resultados con el SEO?",
    respuesta: [
      "El <strong>posicionamiento SEO</strong> es una estrategia a medio-largo plazo. Generalmente, los cambios significativos empiezan a ser visibles entre los <strong>3 y 6 meses,</strong> dependiendo de la competencia y el estado previo de la web."
    ]
  },
  {
    pregunta: "¿Podéis garantizar que mi web aparecerá en la primera posición?",
    respuesta: [
      "Nadie puede garantizar el puesto #1 porque el algoritmo de Google cambia constantemente. Lo que sí garantizamos en MN Design Web es la aplicación de las <strong>mejores prácticas de optimización</strong> y una estructura técnica impecable para maximizar tus posibilidades de éxito."
    ]
  },
  {
    pregunta: "¿Qué diferencia hay entre el SEO y el SEM (publicidad)?",
    respuesta: [
      "El SEO es <strong>tráfico orgánico (gratuito por clic)</strong> que genera autoridad a largo plazo, mientras que el SEM son anuncios de pago para visibilidad inmediata. Lo ideal es una estrategia combinada para dominar las búsquedas."
    ]
  },
  {
    pregunta: "¿Es necesario hacer mantenimiento SEO todos los meses?",
    respuesta: [
      "Sí, porque Google evoluciona y tu competencia también trabaja para superarte. Un <strong>mantenimiento mensual</strong> permite ajustar palabras clave, crear contenido relevante y vigilar que errores técnicos no penalicen tu ranking."
    ]
  },
  {
    pregunta: "¿Trabajáis el SEO Local para negocios físicos o solo a nivel nacional?",
    respuesta: [
      "¡Trabajamos ambos! Si tienes un local o prestas servicios en una ciudad concreta (como Alicante o cualquier otra parte de España), optimizamos tu web y tu <strong>Google Business Profile</strong> para que seas la primera opción en tu zona (SEO Local). Si tu mercado es online o nacional, trazamos una estrategia más amplia para competir con los grandes de tu sector."
    ]
  },
  {
    pregunta: "¿Tengo que escribir yo los textos de mi web o lo hacéis vosotros?",
    respuesta: [
      "El contenido es el rey, pero no te dejaremos solo. Tú conoces tu negocio mejor que nadie, pero nosotros en MN Design Web aplicamos técnicas de <strong>Copywriting SEO</strong>. Esto significa que cogemos tus ideas y las reescribimos estratégicamente con las <strong>palabras clave exactas</strong> que tus clientes están buscando, para que los textos no solo posicionen en Google, sino que también vendan."
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

const FaqSeo = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="seo-minimal-contenedor">
      <div className="seo-minimal-header">
        <h2>Preguntas Frecuentes</h2>
        <p>Resolvemos tus dudas antes de empezar a trabajar juntos.</p>
      </div>

      <div className="seo-minimal-lista">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div key={index} className="seo-minimal-item">
              <div 
                className={`seo-minimal-pregunta ${isOpen ? 'activa' : ''}`} 
                onClick={() => toggleFaq(index)}
              >
                <h3>{faq.pregunta}</h3>
                <div className="seo-minimal-icono">
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
                    className="seo-minimal-respuesta-wrapper"
                  >
                    <div className="seo-minimal-respuesta">
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

export default FaqSeo;