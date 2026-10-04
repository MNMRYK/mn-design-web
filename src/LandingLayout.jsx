import React, { useEffect } from "react";
import Seo from "./seo/Seo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import KitDigitalLanding from "./LandingKit/KitDigitalLanding.jsx";
import ServiciosRescate from "./LandingKit/ServiciosRescate.jsx";
import ContactoRescate from "./LandingKit/ContactoRescate.jsx";
import BarraConfianza from "./LandingKit/BarraConfianza.jsx";
import MapaSolucion from "./LandingKit/MapaSolucion.jsx";
import FooterLanding from "./LandingKit/FooterLanding.jsx";
import { EMPRESA, REF_EMPRESA, AREA_SERVIDA } from "./seo/negocio";
import { crearLenis } from "./utils/lenis";

const LandingLayout = () => {
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

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué incluye el rescate de mi web tras el Kit Digital?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Incluye auditoría técnica, limpieza de código, optimización de seguridad y puesta a punto de tu estrategia de ventas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto tiempo tarda el proceso de rescate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Diagnóstico en menos de 24h y ejecución ágil personalizada según la complejidad de tu proyecto.",
        },
      },
      {
        "@type": "Question",
        name: "¿Podéis mejorar mi posicionamiento SEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, realizamos auditoría y optimización técnica para corregir errores que te impiden aparecer en Google.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué garantía ofreces con el rescate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trabajamos con total transparencia, garantizando un código limpio y una configuración optimizada para tu negocio.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo empiezo mi auditoría gratuita?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Solo tienes que rellenar el formulario de validación y reservar tu plaza en nuestro calendario para una sesión 1-a-1.",
        },
      },
    ],
  };

  return (
    <>
      <Seo
        ruta="/rescate-kit-digital/"
        titulo="MN Design Web | Rescate de Proyectos Web y Kit Digital"
        descripcion="¿Tu web del Kit Digital no funciona o está abandonada? La rescatamos: auditoría técnica, optimización SEO y relanzamiento de tu tienda online."
        tituloSocial="MN Design Web | Rescate de Proyectos Web Kit Digital"
        descripcionSocial="¿Tu web del Kit Digital no funciona o está abandonada? Recuperamos y optimizamos tu proyecto para que empiece a vender."
        imagen="https://mndesignweb.es/rescate-kit-digital.webp"
      />

      <div className="landing-page-wrapper">
        <KitDigitalLanding />
        <BarraConfianza />
        <ServiciosRescate />
        <MapaSolucion />
        <ContactoRescate />
        <FooterLanding />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              schemaFAQ,
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "Rescate de Proyectos Web y Kit Digital",
                description:
                  "Expertos en recuperar webs abandonadas tras el Kit Digital. Auditoría técnica, optimización SEO y rescate de e-commerce.",
              },
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
                    name: "Rescate de Proyectos",
                    item: "https://mndesignweb.es/rescate-kit-digital/",
                  },
                ],
              },
              {
                "@context": "https://schema.org/",
                "@type": "Service",
                name: "Servicios de Rescate Web MN Design Web",
                image: "https://mndesignweb.es/logo-card.webp",
                description:
                  "Auditoría técnica, limpieza de código y rescate de proyectos web abandonados tras el Kit Digital.",
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
export default LandingLayout;
