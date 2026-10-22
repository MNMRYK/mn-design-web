import React, { useEffect } from "react";
import Seo from "./seo/Seo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NosotrosSiguiente from "./Nosotros/NosotrosSiguiente";
import MetodologiaSticky from "./Nosotros/MetodologiaSticky";
import BlogPreview from "./Nosotros/BlogPreview";
import { EMPRESA } from "./seo/negocio";
import { crearLenis } from "./utils/lenis";

const Nosotros = () => {
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
        ruta="/nosotros/"
        titulo="Sobre Nosotros | MN Design Web - Agencia de Diseño Web"
        descripcion="Conoce MN Design Web, agencia de diseño y desarrollo web con estudio en Cocentaina (Alicante): webs, tiendas online y software a medida para toda España."
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
