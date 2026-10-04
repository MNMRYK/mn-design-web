import React, { useEffect } from "react";
import Seo from "./seo/Seo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NosotrosSiguiente from "./Nosotros/NosotrosSiguiente";
import MetodologiaSticky from "./Nosotros/MetodologiaSticky";
import DamosForma from "./Nosotros/DamosForma";
import BlogPreview from "./Nosotros/BlogPreview";
import { EMPRESA } from "./seo/negocio";
import { crearLenis } from "./utils/lenis";

const Nosotros = () => {
  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Por qué MN Design Web es diferente a otras agencias?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Porque no somos una fábrica de webs. En MN Design Web tratamos cada proyecto como si fuera nuestro. Combinamos una metodología técnica sólida con un trato cercano, asegurándonos de que tu web no solo sea estética, sino una herramienta de negocio real.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuál es vuestra filosofía de trabajo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Creemos en la honestidad, la transparencia y la calidad por encima de la cantidad. Nos gusta trabajar con clientes que valoran la estrategia y la personalización, no soluciones rápidas y de bajo valor.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué tipo de proyectos soléis realizar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nos especializamos en diseño web estratégico, desarrollo E-commerce, sistemas de reservas y plataformas SaaS a medida. Ayudamos a negocios locales en Alicante y empresas de toda España a digitalizarse de forma profesional y eficiente.",
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
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Seo
        ruta="/nosotros/"
        titulo="Sobre Nosotros | MN Design Web - Agencia de Diseño Web"
        descripcion="Conoce a MN Design Web, agencia de diseño web en Cocentaina y Alcoi. Creamos webs, e-commerce y sistemas de reservas a medida para negocios locales."
        tituloSocial="Sobre MN Design Web | Tu aliado digital"
      />

      <div className="nosotros-page-wrapper">
        <NosotrosSiguiente />
        <MetodologiaSticky />
        <BlogPreview />

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
                    name: "Nosotros",
                    item: "https://mndesignweb.es/nosotros/",
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

export default Nosotros;
