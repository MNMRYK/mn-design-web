import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "./seo/Seo";

import DisenoWebSiguiente from "./DisenoWeb/DisenoWebSiguiente.jsx";
import DisenoWebSeccionesEspeciales from "./DisenoWeb/DisenoWebSeccionesEspeciales.jsx";
import ResponsiveShowcase from "./DisenoWeb/ResponsiveShowcase.jsx";
import DisenoDoble from "./DisenoWeb/DisenoDoble.jsx";
import LlamadaDemos from "./DisenoWeb/LlamadaDemos.jsx";
import { EMPRESA, REF_EMPRESA, AREA_SERVIDA } from "./seo/negocio";
import { schemaFaq } from "./seo/faq";
import { PREGUNTAS_DISENO } from "./DisenoWeb/preguntasDiseno";
import { crearLenis } from "./utils/lenis";

const DisenoWeb = () => {
  // Mismas preguntas que se ven en la página (el build falla si no coinciden)
  const schemaFAQ = schemaFaq(PREGUNTAS_DISENO);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = crearLenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Seo
        ruta="/disenoweb/"
        titulo="Diseño Web a Medida para Empresas | MN Design Web"
        descripcion="Diseño web a medida y profesional: webs rápidas, autogestionables y pensadas para captar clientes, con planes y precios claros desde el primer día."
      />

      <div className="disenoweb-page-wrapper">
        <DisenoWebSiguiente />
        <DisenoWebSeccionesEspeciales />
        <LlamadaDemos />
        <ResponsiveShowcase />
        <DisenoDoble />

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
                    name: "Diseño Web",
                    item: "https://mndesignweb.es/disenoweb/",
                  },
                ],
              },
              {
                "@context": "https://schema.org/",
                "@type": "Service",
                name: "Servicios de Diseño Web MN Design Web",
                image: "https://mndesignweb.es/og-mndesignweb.jpg",
                description:
                  "Desarrollo y diseño de páginas web corporativas, sitios con reservas y tiendas online.",
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

export default DisenoWeb;
