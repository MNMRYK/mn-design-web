import React, { useEffect } from "react";
import gsap from "gsap";
import Seo from "./seo/Seo";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PosicionamientoSeoSiguiente from "./PosicionamientoSeo/PosicionamientoSeoSiguiente";
import FasesSeo from "./PosicionamientoSeo/FasesSeo";
import PlanesSeo from "./PosicionamientoSeo/PlanesSeo";
import SeoDoble from "./PosicionamientoSeo/SeoDoble";
import { EMPRESA, REF_EMPRESA, AREA_SERVIDA } from "./seo/negocio";
import { crearLenis } from "./utils/lenis";

const PosicionamientoSeo = () => {
  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Garantizáis la primera posición en Google?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ninguna agencia seria puede garantizar el puesto #1, ya que los algoritmos de Google cambian constantemente y dependen de la competencia. Lo que sí garantizamos en MN Design Web es una estrategia basada en datos, transparencia absoluta y una optimización constante para que tu visibilidad crezca de forma real y duradera.",
        },
      },
      {
        "@type": "Question",
        name: "¿Es el SEO una solución rápida para conseguir ventas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El SEO es una estrategia de inversión a medio-largo plazo. A diferencia de la publicidad pagada que se detiene al dejar de invertir, el SEO construye un activo que trabaja por ti 24/7. Normalmente empezamos a ver cambios en 3 meses y una tendencia ascendente sólida a los 6 meses.",
        },
      },
      {
        "@type": "Question",
        name: "¿Tengo que escribir yo el contenido de mi web?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tú eres quien mejor conoce tu negocio, pero nosotros somos expertos en hacerlo rentable. Trabajamos juntos: tú nos das las directrices y los puntos clave, y nosotros realizamos el copy SEO y la optimización para que Google entienda perfectamente qué ofreces.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué os diferencia de otras agencias de SEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "En MN Design Web no vendemos 'tráfico por tráfico'. Nos enfocamos en ROI (Retorno de Inversión). Nos alejamos de técnicas oscuras o 'black hat' que penalizan tu web, y apostamos por un SEO técnico y de contenidos que te posiciona como referente en tu sector, tanto a nivel local en Alicante como nacional.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué pasa si mi web tiene una tecnología antigua?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Analizamos tu plataforma actual. Si es viable, la optimizamos. Si no, te asesoramos en una migración hacia un entorno más rápido, seguro y escalable. Nuestro objetivo es que la tecnología nunca sea un freno para tu crecimiento.",
        },
      },
    ],
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
        return (
          node.nodeName.includes("TYPEBOT") ||
          node.closest("typebot-bubble") !== null
        );
      },
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Seo
        ruta="/posicionamiento-seo/"
        titulo="Posicionamiento SEO en Alcoi 2026 | MN Design Web"
        descripcion="Posicionamiento SEO en Alcoi y Alicante para negocios que buscan resultados reales: optimizamos tu web para subir en Google y conseguir más clientes."
      />

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
              EMPRESA,
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Inicio",
                    item: "https://mndesignweb.es/",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "SEO",
                    item: "https://mndesignweb.es/posicionamiento-seo/",
                  },
                ],
              },
              {
                "@context": "https://schema.org/",
                "@type": "Service",
                name: "Servicio de Posicionamiento SEO",
                image: "https://mndesignweb.es/logo-card.webp",
                description:
                  "Servicios profesionales de posicionamiento SEO, auditoría y optimización técnica para mejorar tu visibilidad en buscadores.",
                provider: REF_EMPRESA,
                areaServed: AREA_SERVIDA,
              },
            ]),
          }}
        />
      </div>
    </>
  );
};

export default PosicionamientoSeo;
