import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FaqEcommerce.css';

// Tus preguntas con formato de múltiples párrafos para que quede perfecto
const faqs = [
  {
    pregunta: "¿Cómo funciona el mantenimiento técnico en E-commerce?",
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
    pregunta: "¿Qué necesito para empezar a vender online?",
    respuesta: [
      "Necesitas una plataforma robusta como por ejemplo <strong> WooCommerce, un catálogo de productos optimizado y pasarelas de pago seguras.</strong> En MN Design Web configuramos todo, desde el inventario hasta el certificado SSL, para que lances tu negocio con total confianza."
    ]
  },
  {
    pregunta: "¿Cómo se gestionan los pagos en la tienda online?",
    respuesta: [
      "Integramos los métodos más utilizados:<strong> tarjeta de crédito, PayPal y Bizum a través de pasarelas como Stripe.</strong> Todas las transacciones son directas a tu cuenta bancaria, sin intermediarios y con encriptación de seguridad avanzada."
    ]
  },
  {
    pregunta: "¿Puedo gestionar reservas o citas desde mi web?",
    respuesta: [
      "Por supuesto! Somos especialistas en <strong>implementar sistemas de reservas automatizados.</strong> Tus clientes podrán agendar citas o servicios directamente desde la web, con sincronización de calendario y confirmaciones automáticas por email"
    ]
  },
  {
    pregunta: "¿Es difícil gestionar los pedidos y productos yo mismo?",
    respuesta: [
      "Para nada. Diseñamos con un <strong>panel totalmente autogestionable donde podrás añadir productos, cambiar precios y gestionar pedidos de forma intuitiva.</strong> Además, te entregamos una <strong>guía básica de uso</strong> para que seas el dueño total de tu tienda."
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

const FaqEcommerce = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faqec-minimal-contenedor">
      <div className="faqec-minimal-header">
        <h2>Preguntas Frecuentes</h2>
        <p>Resolvemos tus dudas antes de empezar a trabajar juntos.</p>
      </div>

      <div className="faqec-minimal-lista">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div key={index} className="faqec-minimal-item">
              <div 
                className={`faqec-minimal-pregunta ${isOpen ? 'activa' : ''}`} 
                onClick={() => toggleFaq(index)}
              >
                <h3>{faq.pregunta}</h3>
                <div className="faqec-minimal-icono">
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
                    className="faqec-minimal-respuesta-wrapper"
                  >
                    <div className="faqec-minimal-respuesta">
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

export default FaqEcommerce;