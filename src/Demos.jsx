import React, { useEffect } from "react";
import Seo from "./seo/Seo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeaderDemos from "./Demos/HeaderDemos";
import BlogPreview from "./Nosotros/BlogPreview";
import SeccionContactoDemo from "./Demos/SeccionContactoDemo";
import FormularioDemo from "./Demos/FormularioDemo";
import { EMPRESA, REF_EMPRESA, AREA_SERVIDA } from "./seo/negocio";
import { crearLenis } from "./utils/lenis";

const Demos = () => {
  // 1. Schema de "CollectionPage"
  const schemaCollection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Demos y Proyectos de Diseño Web",
    description:
      "Explora nuestras demos interactivas de diseño web a medida: e-commerce, clínicas, empresas B2B, cursos online e invitaciones digitales para eventos.",
    url: "https://mndesignweb.es/demos/",
  };

  // 2. Schema de "FAQPage"
  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué incluye exactamente la demo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Diseñamos la estructura principal adaptada a tu marca, paleta de colores y modelo de negocio para que visualices el resultado real.",
        },
      },
      {
        "@type": "Question",
        name: "¿De verdad es 100% gratis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Totalmente. Es nuestra forma de demostrarte la calidad de nuestro diseño antes de que inviertas con nosotros.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto tardáis en hacerla?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Analizamos tu formulario y en un plazo de 48h nos reunimos contigo por videollamada para presentarte el prototipo.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué pasa después?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Si la demo te encaja, trazamos la estrategia técnica y te pasamos un presupuesto cerrado para desarrollar la web completa. Sin compromisos.",
        },
      },
    ],
  };

  // 3. Schema de "ProfessionalService"
  const schemaService = EMPRESA;

  // 4. Schema de "Service": la demo gratuita (sin valoraciones: no se usa marcado de reseñas)
  const schemaDemo = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Prototipo de Diseño Web a Medida",
    image: "https://mndesignweb.es/logo-card.webp",
    description:
      "Demostración inicial y diseño de estructura web de alto rendimiento (Hero y layout principal) adaptada a la identidad corporativa de tu marca.",
    provider: REF_EMPRESA,
    areaServed: AREA_SERVIDA,
    offers: {
      "@type": "Offer",
      url: "https://mndesignweb.es/demos/#solicitar-demo",
      priceCurrency: "EUR",
      price: "0",
      availability: "https://schema.org/InStock",
    },
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


    // Detectar si venimos de otra página con el ancla
    if (window.location.hash === "#solicitar-demo") {
      setTimeout(() => {
        const seccionFormulario = document.getElementById("solicitar-demo");
        if (seccionFormulario) {
          seccionFormulario.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Seo
        ruta="/demos/"
        titulo="Demos y Prototipos de Diseño Web | MN Design Web"
        descripcion="Explora nuestras demos interactivas de diseño web a medida: e-commerce, clínicas, empresas B2B, cursos online e invitaciones digitales para eventos."
        tituloSocial="Demos y Prototipos | MN Design Web"
      />

      <div className="demos-page-wrapper">
        <HeaderDemos />
        <SeccionContactoDemo />
        <BlogPreview />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              schemaCollection,
              schemaFAQ,
              schemaService,
              schemaDemo,
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
                    name: "Demos",
                    item: "https://mndesignweb.es/demos/",
                  },
                ],
              },
            ]),
          }}
        />
      </div>
    </>
  );
};

export default Demos;
