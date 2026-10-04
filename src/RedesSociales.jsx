import React, { useEffect } from "react";
import Seo from "./seo/Seo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import RedesSocialesSiguiente from "./RedesSociales/RedesSocialesSiguiente.jsx";
import FasesRedes from "./RedesSociales/FasesRedes.jsx";
import PlanesRedes from "./RedesSociales/PlanesRedes.jsx";
import RedesDoble from "./RedesSociales/RedesDoble.jsx";
import { EMPRESA, REF_EMPRESA, AREA_SERVIDA } from "./seo/negocio";

const RedesSociales = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
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

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);

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
    image: "https://mndesignweb.es/logo-card.webp",
    description:
      "Estrategia de contenidos, creación de Reels/TikTok y gestión integral de marca.",
    provider: REF_EMPRESA,
    areaServed: AREA_SERVIDA,
  };

  return (
    <>
      <Seo
        ruta="/redes-sociales/"
        titulo="Gestión de Redes Sociales en Alcoi 2026 | MN Design Web"
        descripcion="¿Tus redes sociales no traen clientes? Creamos una estrategia de contenido que posiciona tu marca y aumenta tus ventas. ¡Transformamos tu presencia social!"
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
            __html: JSON.stringify([EMPRESA, schemaBreadcrumb, schemaService]),
          }}
        />
      </div>
    </>
  );
};

export default RedesSociales;
