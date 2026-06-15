import React, { useEffect } from 'react';
import gsap from "gsap";
import { Helmet } from 'react-helmet-async';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"; 
import "lenis/dist/lenis.css";

import PosicionamientoSeoSiguiente from './PosicionamientoSeo/PosicionamientoSeoSiguiente';
import FasesSeo from './PosicionamientoSeo/FasesSeo';
import PlanesSeo from './PosicionamientoSeo/PlanesSeo';
import SeoDoble from './PosicionamientoSeo/SeoDoble';



const PosicionamientoSeo = () => {

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Garantizáis la primera posición en Google?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ninguna agencia seria puede garantizar el puesto #1, ya que los algoritmos de Google cambian constantemente y dependen de la competencia. Lo que sí garantizamos en MN Design Web es una estrategia basada en datos, transparencia absoluta y una optimización constante para que tu visibilidad crezca de forma real y duradera."
        }
      },
      {
        "@type": "Question",
        "name": "¿Es el SEO una solución rápida para conseguir ventas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El SEO es una estrategia de inversión a medio-largo plazo. A diferencia de la publicidad pagada que se detiene al dejar de invertir, el SEO construye un activo que trabaja por ti 24/7. Normalmente empezamos a ver cambios en 3 meses y una tendencia ascendente sólida a los 6 meses."
        }
      },
      {
        "@type": "Question",
        "name": "¿Tengo que escribir yo el contenido de mi web?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tú eres quien mejor conoce tu negocio, pero nosotros somos expertos en hacerlo rentable. Trabajamos juntos: tú nos das las directrices y los puntos clave, y nosotros realizamos el copy SEO y la optimización para que Google entienda perfectamente qué ofreces."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué os diferencia de otras agencias de SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En MN Design Web no vendemos 'tráfico por tráfico'. Nos enfocamos en ROI (Retorno de Inversión). Nos alejamos de técnicas oscuras o 'black hat' que penalizan tu web, y apostamos por un SEO técnico y de contenidos que te posiciona como referente en tu sector, tanto a nivel local en Alicante como nacional."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué pasa si mi web tiene una tecnología antigua?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Analizamos tu plataforma actual. Si es viable, la optimizamos. Si no, te asesoramos en una migración hacia un entorno más rápido, seguro y escalable. Nuestro objetivo es que la tecnología nunca sea un freno para tu crecimiento."
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
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); lenis.destroy(); };
  }, []);

  return (
    <>
      <Helmet>
        <title>Posicionamiento SEO en Alcoy 2026 | MN Design Web</title>
        <link rel="canonical" href="https://mndesignweb.es/posicionamiento-seo" />
        <meta name="description" content="Especialistas en posicionamiento SEO para negocios que buscan resultados reales. Optimizamos tu web para aparecer en los primeros puestos de Google. ¡Consigue más clientes hoy!" />
        
        <meta property="og:title" content="Posicionamiento SEO en Alcoy 2026 | MN Design Web" />
        <meta property="og:description" content="¿Tu web no vende? Optimizamos tu estructura y contenido para liderar los resultados en Google." />
        <meta property="og:url" content="https://mndesignweb.es/posicionamiento-seo" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mndesignweb.es/logo-card.webp" />
        <meta property="og:site_name" content="MN Design Web" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Posicionamiento SEO en Alcoy 2026 | MN Design Web" />
        <meta name="twitter:description" content="¿Tu web no vende? Optimizamos tu estructura y contenido para liderar los resultados en Google." />
        <meta name="twitter:image" content="https://mndesignweb.es/logo-card.webp" />
      </Helmet>

      <div className="PosicionamientoSeo-page-wrapper">
        <PosicionamientoSeoSiguiente />
        <FasesSeo />
        <PlanesSeo />
        <SeoDoble />

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
                  { "@type": "ListItem", "position": 2, "name": "SEO", "item": "https://mndesignweb.es/posicionamiento-seo" }
                ]
              },
              {
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": "Servicio de Posicionamiento SEO",
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "bestRating": "5", "ratingCount": "18" }
              }
            ]) 
          }}
        />
      </div>
    </>
  );
};

export default PosicionamientoSeo;