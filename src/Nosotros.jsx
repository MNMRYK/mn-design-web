import React, { useEffect } from "react";
import Seo from "./seo/Seo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import NosotrosSiguiente from "./Nosotros/NosotrosSiguiente";
import MetodologiaSticky from "./Nosotros/MetodologiaSticky";
import BlogPreview from "./Nosotros/BlogPreview";
import ResenasGoogle from "./Resenas/ResenasGoogle";
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
        <ResenasGoogle ids={["sara"]} etiqueta="Reseña de Google" titulo="Cómo es trabajar" tituloColor="con nosotros" />
        <BlogPreview />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              EMPRESA,
              {
                "@context": "https://schema.org",
                "@type": "Person",
                "@id": "https://mndesignweb.es/nosotros/#maria-nadal",
                name: "María Nadal",
                jobTitle: "Fundadora de MN Design Web",
                image: "https://mndesignweb.es/maria-nadal-mn-design-web-800.webp",
                worksFor: { "@id": "https://mndesignweb.es/#empresa" },
                sameAs: [
                  "https://www.linkedin.com/in/mar%C3%ADa-nadal-masi%C3%A1-080a77315/",
                  "https://github.com/MNMRYK",
                ],
              },
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
