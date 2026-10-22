import React, { useEffect } from "react";
import gsap from "gsap";
import Seo from "./seo/Seo";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PosicionamientoSeoSiguiente from "./PosicionamientoSeo/PosicionamientoSeoSiguiente";
import FasesSeo from "./PosicionamientoSeo/FasesSeo";
import PlanesSeo from "./PosicionamientoSeo/PlanesSeo";
import SeoDoble from "./PosicionamientoSeo/SeoDoble";
import { EMPRESA, REF_EMPRESA, AREA_SERVIDA } from "./seo/negocio";
import { schemaFaq } from "./seo/faq";
import { PREGUNTAS_SEO } from "./PosicionamientoSeo/preguntasSeo";
import { crearLenis } from "./utils/lenis";

const PosicionamientoSeo = () => {
  // Mismas preguntas que se ven en la página (el build falla si no coinciden)
  const schemaFAQ = schemaFaq(PREGUNTAS_SEO);

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
        titulo="Posicionamiento SEO para Empresas y Pymes | MN Design Web"
        descripcion="Posicionamiento SEO para empresas y pymes: SEO técnico, contenidos y SEO local para que tu negocio aparezca en Google cuando te buscan."
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
