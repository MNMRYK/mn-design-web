import React, { useEffect } from "react";
import Seo from "./seo/Seo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import RedesSocialesSiguiente from "./RedesSociales/RedesSocialesSiguiente.jsx";
import FasesRedes from "./RedesSociales/FasesRedes.jsx";
import PlanesRedes from "./RedesSociales/PlanesRedes.jsx";
import RedesDoble from "./RedesSociales/RedesDoble.jsx";
import { EMPRESA, REF_EMPRESA, AREA_SERVIDA } from "./seo/negocio";
import { schemaFaq } from "./seo/faq";
import { PREGUNTAS_REDES } from "./RedesSociales/preguntasRedes";
import { crearLenis } from "./utils/lenis";

const RedesSociales = () => {
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

  // Mismas preguntas que se ven en la página (el build falla si no coinciden)
  const schemaFAQ = schemaFaq(PREGUNTAS_REDES);

  const schemaBreadcrumb = {
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
        name: "Redes Sociales",
        item: "https://mndesignweb.es/redes-sociales/",
      },
    ],
  };

  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Gestión de Redes Sociales",
    image: "https://mndesignweb.es/og-mndesignweb.jpg",
    description:
      "Estrategia de contenidos, creación de Reels/TikTok y gestión integral de marca.",
    provider: REF_EMPRESA,
    areaServed: AREA_SERVIDA,
  };

  return (
    <>
      <Seo
        ruta="/redes-sociales/"
        titulo="Gestión de Redes Sociales para Empresas | MN Design Web"
        descripcion="Gestión de redes sociales para empresas: estrategia, contenido y publicación para que tus perfiles dejen de ser un escaparate y te traigan clientes."
      />

      <div className="social-page-wrapper">
        <RedesSocialesSiguiente />
        <FasesRedes />
        <PlanesRedes />
        <RedesDoble />

        {/* 🔥 SCHEMAS UNIFICADOS Y FUERA DEL HELMET 🔥 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([schemaFAQ, EMPRESA, schemaBreadcrumb, schemaService]),
          }}
        />
      </div>
    </>
  );
};

export default RedesSociales;
