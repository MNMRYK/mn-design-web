import React, { useEffect, useRef, lazy, Suspense } from 'react'; // 🔥 Importamos lazy, Suspense y useRef
import { Helmet } from 'react-helmet-async';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"; 
import "lenis/dist/lenis.css";
import { useInView } from 'framer-motion'; // 🔥 Importamos el sensor de scroll

// 1. CARGA INMEDIATA: La cabecera/Hero de la página se queda normal
import ContactoSiguiente from './Contacto/ContactoSiguiente';

// 2. CARGA DIFERIDA (LAZY): Ponemos a dieta las secciones pesadas de abajo
const ReservaYMapa = lazy(() => import('./Contacto/ReservaYMapa'));
const Opiniones = lazy(() => import('./Contacto/Opiniones'));

const Contacto = () => {

  // 🔥 SENSORES DE PROXIMIDAD 🔥
  // Empezarán a descargar los componentes cuando el usuario esté a 400px de llegar a ellos
  const refReserva = useRef(null);
  const isInViewReserva = useInView(refReserva, { once: true, margin: "400px" });

  const refOpiniones = useRef(null);
  const isInViewOpiniones = useInView(refOpiniones, { once: true, margin: "400px" });

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cómo es el proceso para empezar un proyecto con vosotros?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Primero nos escribes por el formulario, luego tenemos una breve llamada para entender tus objetivos y necesidades. A partir de ahí, te enviamos un presupuesto detallado y sin compromiso."
        }
      },
      {
        "@type": "Question",
        "name": "¿Trabajáis solo en Alicante o también en remoto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trabajamos con clientes de toda España. Aunque estamos en Alicante y podemos reunirnos presencialmente, nuestras herramientas de comunicación y gestión nos permiten trabajar con la misma eficacia estéis donde estéis."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto tardáis en responder a una solicitud de presupuesto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Normalmente respondemos en menos de 24-48 horas laborables. Si tu proyecto es urgente, por favor, indícalo en el formulario y priorizaremos tu solicitud."
        }
      }
    ]
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); lenis.destroy(); };
  }, []);

  return (
    <>
      <Helmet>
        <title>Contacto | MN Design Web - Diseño Web en Alicante</title>
        <link rel="canonical" href="https://mndesignweb.es/contacto" />
        <meta name="description" content="¿Listo para empezar tu proyecto? Contacta con nosotros para tu próximo diseño web o tienda E-Commerce. ¡Pide tu presupuesto sin compromiso!" />
        
        <meta property="og:title" content="Contacto | MN Design Web" />
        <meta property="og:description" content="¿Listo para empezar tu proyecto? Contacta con nosotros para tu próximo diseño web o tienda E-Commerce." />
        <meta property="og:url" content="https://mndesignweb.es/contacto" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mndesignweb.es/logo-card.png" />
        <meta property="og:site_name" content="MN Design Web" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contacto | MN Design Web" />
        <meta name="twitter:description" content="¿Listo para empezar tu proyecto? Contacta con nosotros para tu próximo diseño web." />
        <meta name="twitter:image" content="https://mndesignweb.es/logo-card.png" />
      </Helmet>

      <div className="contacto-page-wrapper">
        
        {/* Renderizado inmediato */}
        <ContactoSiguiente />
        
        {/* 🔥 SECCIÓN DE AGENDA Y MAPA CON LAZY LOADING 🔥 */}
        {/* Reservamos una altura mínima estimada para evitar saltos bruscos en el scroll */}
        <div ref={refReserva} style={{ minHeight: '700px' }}>
          {isInViewReserva && (
            <Suspense fallback={<div style={{ textAlign: 'center', color: '#ece8ff', padding: '2rem' }}>Cargando agenda interactiva...</div>}>
              <ReservaYMapa />
            </Suspense>
          )}
        </div>

        {/* 🔥 SECCIÓN DE OPINIONES CON LAZY LOADING 🔥 */}
        <div ref={refOpiniones} style={{ minHeight: '400px' }}>
          {isInViewOpiniones && (
            <Suspense fallback={<div style={{ textAlign: 'center', color: '#ece8ff', padding: '2rem' }}>Cargando testimonios...</div>}>
              <Opiniones />
            </Suspense>
          )}
        </div>
          
        {/* ESTRUCTURAS DE DATOS SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify([
              schemaFAQ,
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "name": "MN Design Web",
                "url": "https://mndesignweb.es/",
                "address": { "@type": "PostalAddress", "addressLocality": "Alicante", "addressCountry": "ES" }
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://mndesignweb.es/" },
                  { "@type": "ListItem", "position": 2, "name": "Contacto", "item": "https://mndesignweb.es/contacto" }
                ]
              },
              {
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": "Servicios Profesionales MN Design Web",
                "aggregateRating": { 
                  "@type": "AggregateRating", 
                  "ratingValue": "5", 
                  "bestRating": "5", 
                  "ratingCount": "25" 
                }
              }
            ]) 
          }}
        />
      </div>
    </>
  );
};

export default Contacto;