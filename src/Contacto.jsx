import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"; 
import "lenis/dist/lenis.css";

import ContactoSiguiente from './Contacto/ContactoSiguiente';
import ReservaYMapa from './Contacto/ReservaYMapa';
import Opiniones from './Contacto/Opiniones';
import DemoContacto from './Contacto/DemoContacto.jsx';

const Contacto = () => {

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
    const lenis = new Lenis({ 
      duration: 1.2, 
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: true, 

      prevent: (node) => {
        if (!node || !node.closest) return false;
        return node.nodeName.includes('TYPEBOT') || node.closest('typebot-bubble') !== null;
      }
    });

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
        <meta property="og:image" content="https://mndesignweb.es/logo-card.webp" />
        <meta property="og:site_name" content="MN Design Web" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contacto | MN Design Web" />
        <meta name="twitter:description" content="¿Listo para empezar tu proyecto? Contacta con nosotros para tu próximo diseño web." />
        <meta name="twitter:image" content="https://mndesignweb.es/logo-card.webp" />
      </Helmet>

      <div className="contacto-page-wrapper">
        <ContactoSiguiente />
        <DemoContacto />
        <ReservaYMapa />
        <Opiniones />
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
                "image": "https://mndesignweb.es/logo-card.webp", /* 🔥 LA IMAGEN OBLIGATORIA 🔥 */
                "description": "Servicios de diseño web profesional, tiendas online y posicionamiento en Alicante.",
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