import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FaqRedes.css';

// Tus preguntas con formato de múltiples párrafos para que quede perfecto
const faqs = [
  {
    pregunta: "¿Cuánto tiempo tardaré en ver resultados reales?",
    respuesta: [
      "El crecimiento en redes no es mágico, es estratégico. Por eso trabajamos en <strong>ciclos de 90 días</strong>. Durante el primer mes, nos enfocamos en la auditoría, optimización y los primeros ajustes en el algoritmo. A partir del segundo mes, verás un aumento cualitativo en la interacción y, a partir del tercero, el contenido empieza a trabajar como una máquina de atracción de clientes.",
      "La constancia y el enfoque en tu público objetivo son los que marcan la diferencia."
    ]
  },
  {
    pregunta: "¿Tengo que aprobar todo lo que se publica?",
    respuesta: [
      "¡Por supuesto! La marca es tuya y la última palabra también. Trabajamos con un <strong>calendario editorial compartido</strong> donde podrás revisar, sugerir cambios o aprobar cada post, historia o vídeo antes de que vea la luz.",
      "Nuestro objetivo es que te sientas 100% representado por cada pieza de contenido que publicamos."
    ]
  },
  {
    pregunta: "¿Es mejor hacer publicidad (Ads) o contenido orgánico?",
    respuesta: [
      "La respuesta corta es: <strong>necesitas ambos.</strong> El contenido orgánico construye tu marca y fideliza a tu comunidad; la publicidad (Ads) acelera el proceso y llega a personas que aún no te conocen.",
      "Nosotros nos encargamos de que la estrategia orgánica y la de pago remen en la misma dirección para que tu inversión sea rentable desde el primer día."
    ]
  },
  {
    pregunta: "¿Cómo evitáis que mis redes se llenen de seguidores que no compran?",
    respuesta: [
      "Nos alejamos de las 'métricas de vanidad'. Un perfil con miles de seguidores pero sin ventas no sirve de nada. Nuestra metodología se centra en <strong>atraer a tu cliente ideal</strong> a través de contenidos que resuelvan sus problemas y ataquen sus necesidades.",
      "Preferimos 100 seguidores que realmente necesiten tu servicio que 10.000 que solo estén de paso."
    ]
  },
  {
    pregunta: "¿Qué nivel de implicación necesito por mi parte?",
    respuesta: [
      "Queremos que te dediques a lo que mejor sabes hacer: gestionar tu negocio. Nuestra parte es la de profesionales del sector: estrategia, diseño, redacción y gestión diaria.",
      "Solo necesitamos una reunión mensual de seguimiento para ajustar objetivos y acceso a las fuentes de información clave de tu negocio. <strong>Tú pones la visión, nosotros la ejecución.</strong>"
    ]
  },
  {
    pregunta: "¿Gestionáis también la edición de vídeo para Reels o TikTok?",
    respuesta: [
      "¡Sí! El vídeo vertical es el formato con más alcance actualmente y es una pieza clave en nuestros planes. Incluimos <strong>edición dinámica, subtitulado y montaje estratégico</strong> para asegurarnos de que el usuario no haga scroll y se quede viendo tu mensaje hasta el final."
    ]
  },
  {
    pregunta: "¿Qué pasa si ya tengo una estrategia de redes pero no funciona?",
    respuesta: [
      "¡Es una gran oportunidad! Si ya tienes un camino recorrido, significa que tenemos datos para analizar. Realizamos una <strong>auditoría profunda</strong> de lo que ha fallado, identificamos las áreas de mejora y reenfocamos la estrategia hacia la conversión real.",
      "Como queremos ayudarte a dar el salto de calidad, si vienes de una gestión anterior que no te ha dado resultados, contáctanos y estudiaremos un <strong>plan de rescate específico</strong> para tu marca."
    ]
  },
  {
    pregunta: "¿Ha terminado mi año de Kit Digital, puedo seguir con vosotros?",
    respuesta: [
      "¡Por supuesto! De hecho, es el momento clave para consolidar los resultados obtenidos. Si tu periodo obligatorio de 12 meses de la subvención ha finalizado y quieres que sigamos impulsando tu estrategia sin perder el ritmo, te lo ponemos muy fácil.",
      "Ofrecemos un <strong>20% de descuento especial de fidelización</strong> para todos los clientes que deciden continuar con nuestros servicios tras finalizar su Kit Digital. Nuestro objetivo es garantizar la continuidad, la estabilidad de tus resultados y que tu marca siga creciendo con condiciones preferentes."
    ]
  }

]; 



const FaqRedes = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="redes-minimal-contenedor">
      <div className="redes-minimal-header">
        <h2>Preguntas Frecuentes</h2>
        <p>Resolvemos tus dudas antes de empezar a trabajar juntos.</p>
      </div>

      <div className="redes-minimal-lista">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;

          return (
            <div key={index} className="redes-minimal-item">
              <div 
                className={`redes-minimal-pregunta ${isOpen ? 'activa' : ''}`} 
                onClick={() => toggleFaq(index)}
              >
                <h3>{faq.pregunta}</h3>
                <div className="redes-minimal-icono">
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
                    className="redes-minimal-respuesta-wrapper"
                  >
                    <div className="redes-minimal-respuesta">
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

export default FaqRedes;