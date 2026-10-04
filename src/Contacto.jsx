import React, { useEffect } from 'react';
import Seo from "./seo/Seo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ContactoSiguiente from './Contacto/ContactoSiguiente';
import ReservaYMapa from './Contacto/ReservaYMapa';
import Opiniones from './Contacto/Opiniones';
import DemoContacto from './Contacto/DemoContacto.jsx';
import { EMPRESA, REF_EMPRESA, AREA_SERVIDA } from "./seo/negocio";
import { crearLenis } from "./utils/lenis";

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
    const lenis = crearLenis({ 
      duration: 1.2, 
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: true, 

      prevent: (node) => {
        if (!node || !node.closest) return false;
        return node.nodeName.includes('TYPEBOT') || node.closest('typebot-bubble') !== null;
      }
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); lenis.destroy(); };
  }, []);

  return (
    <>
      <Seo
        ruta="/contacto/"
        titulo="Contacto | MN Design Web - Diseño Web en Alicante"
        descripcion="¿Listo para empezar tu proyecto? Contacta con nosotros para tu próximo diseño web o tienda E-Commerce. ¡Pide tu presupuesto sin compromiso!"
        tituloSocial="Contacto | MN Design Web"
        descripcionSocial="¿Listo para empezar tu proyecto? Contacta con nosotros para tu próximo diseño web o tienda E-Commerce."
      />

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
              EMPRESA,
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://mndesignweb.es/" },
                  { "@type": "ListItem", "position": 2, "name": "Contacto", "item": "https://mndesignweb.es/contacto/" }
                ]
              },
              {
                "@context": "https://schema.org/",
                "@type": "Service",
                "name": "Servicios Profesionales MN Design Web",
                "image": "https://mndesignweb.es/logo-card.webp",
                "description": "Servicios de diseño web profesional, tiendas online y posicionamiento en Alicante.",
                "provider": REF_EMPRESA,
                "areaServed": AREA_SERVIDA,
              }
            ]) 
          }}
        />
      </div>
    </>
  );
};

export default Contacto;