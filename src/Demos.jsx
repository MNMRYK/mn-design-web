import React, { useEffect } from "react";
import Seo from "./seo/Seo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeaderDemos from "./Demos/HeaderDemos";
import BlogPreview from "./Nosotros/BlogPreview";
import SeccionContactoDemo from "./Demos/SeccionContactoDemo";
import FormularioDemo from "./Demos/FormularioDemo";
import { EMPRESA, REF_EMPRESA, AREA_SERVIDA } from "./seo/negocio";
import { schemaFaq } from "./seo/faq";
import { PREGUNTAS_DEMO } from "./Demos/preguntasDemo";
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

  // 2. Schema de "FAQPage": mismas preguntas que se ven en la página (el build falla si no coinciden)
  const schemaFAQ = schemaFaq(PREGUNTAS_DEMO);

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
