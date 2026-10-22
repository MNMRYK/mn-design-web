import React, { useEffect } from 'react';
import Seo from "./seo/Seo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ContactoSiguiente from './Contacto/ContactoSiguiente';
import ReservaYMapa from './Contacto/ReservaYMapa';
import Opiniones from './Contacto/Opiniones';
import DemoContacto from './Contacto/DemoContacto.jsx';
import ResenasGoogle from './Resenas/ResenasGoogle';
import { EMPRESA, REF_EMPRESA, AREA_SERVIDA } from "./seo/negocio";
import { crearLenis } from "./utils/lenis";

const Contacto = () => {

  // Sin FAQPage: esta página no muestra preguntas frecuentes (el schema debe coincidir con lo visible)

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

    return () => { lenis.destroy(); };
  }, []);

  return (
    <>
      <Seo
        ruta="/contacto/"
        titulo="Contacto y Presupuesto de Diseño Web | MN Design Web"
        descripcion="Pide presupuesto de diseño web, tienda online o SEO sin compromiso: te respondemos en menos de 24 h laborables o reserva una videollamada de 30 minutos."
        tituloSocial="Contacto | MN Design Web"
        descripcionSocial="Pide presupuesto para tu web o tu tienda online: te respondemos en menos de 24 h laborables."
      />

      <div className="contacto-page-wrapper">
        <ContactoSiguiente />
        <ResenasGoogle ids={["sara"]} etiqueta="Reseña de Google" titulo="«Te escucha y entiende" tituloColor="a la perfección»" />
        <DemoContacto />
        <ReservaYMapa />
        <Opiniones />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify([
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
                "image": "https://mndesignweb.es/og-mndesignweb.jpg",
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