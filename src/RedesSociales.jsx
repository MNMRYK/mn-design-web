import React, { useEffect } from "react";
import Seo from "./seo/Seo";

import DireccionVisualRedes from "./RedesSociales/DireccionVisualRedes.jsx";
import RedesDoble from "./RedesSociales/RedesDoble.jsx";
import CtaCreativos from "./Creativos/CtaCreativos.jsx";
import { EMPRESA, REF_EMPRESA, AREA_SERVIDA } from "./seo/negocio";
import { schemaFaq } from "./seo/faq";
import { PREGUNTAS_REDES } from "./RedesSociales/preguntasRedes";
import { crearLenis } from "./utils/lenis";

// /redes-sociales/: dirección visual y contenido para redes sociales (diseño de Figma
// "Dirección visual para redes"). Sustituye a la antigua página de gestión de redes.
const RedesSociales = () => {
  useEffect(() => {
    const lenis = crearLenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: true,
      anchors: true, // "Pedir propuesta" y "Qué incluye" bajan con el mismo scroll suave
      prevent: (node) => {
        if (!node || !node.closest) return false;
        return node.nodeName.includes("TYPEBOT") || node.closest("typebot-bubble") !== null;
      },
    });
    return () => lenis.destroy();
  }, []);

  // Mismas preguntas que se ven en la página (el build falla si no coinciden)
  const schemaFAQ = schemaFaq(PREGUNTAS_REDES);

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://mndesignweb.es/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Redes sociales",
        item: "https://mndesignweb.es/redes-sociales/",
      },
    ],
  };

  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dirección visual y contenido para redes sociales",
    serviceType: "Creación de contenido para redes sociales",
    image: "https://mndesignweb.es/og-mndesignweb.jpg",
    description:
      "Diagnóstico visual, línea visual propia, plantillas, guía de estilo, planificación editorial y producción de publicaciones, imágenes y vídeos, también con inteligencia artificial. Servicio puntual o colaboración mensual.",
    provider: REF_EMPRESA,
    areaServed: AREA_SERVIDA,
    url: "https://mndesignweb.es/redes-sociales/",
  };

  return (
    <>
      <Seo
        ruta="/redes-sociales/"
        titulo="Contenido para redes sociales | MN Design Web"
        descripcion="Dirección visual y contenido para redes sociales: línea visual propia, plantillas, planificación y producción de imágenes y vídeos, también con IA."
      />

      <div className="social-page-wrapper creativos-pagina">
        <DireccionVisualRedes />
        <RedesDoble />
        <CtaCreativos texto="Prepararemos una propuesta personalizada para tus redes." />

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
