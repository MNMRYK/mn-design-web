import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import RedesSocialesSiguiente from "./RedesSociales/RedesSocialesSiguiente.jsx";
import FasesRedes from "./RedesSociales/FasesRedes.jsx";
import PlanesRedes from "./RedesSociales/PlanesRedes.jsx";
import RedesDoble from "./RedesSociales/RedesDoble.jsx";

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
        name: "Servicios",
        item: "https://mndesignweb.es/servicios/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Redes Sociales",
        item: "https://mndesignweb.es/redes-sociales/",
      },
    ],
  };

  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Gestión de Redes Sociales",
    // 🔥 ¡LA IMAGEN MÁGICA ESTÁ AQUÍ! 🔥
    image: "https://mndesignweb.es/logo-card.webp",
    description:
      "Estrategia de contenidos, creación de Reels/TikTok y gestión integral de marca.",
    brand: {
      "@type": "Brand",
      name: "MN Design Web",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "28",
      bestRating: "5",
      worstRating: "1",
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
      author: {
        "@type": "Person",
        name: "Cliente Verificado",
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Gestión de Redes Sociales en Alcoy 2026 | MN Design Web</title>
        <link rel="canonical" href="https://mndesignweb.es/redes-sociales" />

        {/* 🔥 TÍTULOS Y DESCRIPCIONES 100% UNIFICADOS 🔥 */}
        <meta
          name="description"
          content="¿Tus redes sociales no traen clientes? Creamos una estrategia de contenido que posiciona tu marca y aumenta tus ventas. ¡Transformamos tu presencia social!"
        />

        <meta
          property="og:title"
          content="Gestión de Redes Sociales en Alcoy 2026 | MN Design Web"
        />
        <meta
          property="og:description"
          content="¿Tus redes sociales no traen clientes? Creamos una estrategia de contenido que posiciona tu marca y aumenta tus ventas. ¡Transformamos tu presencia social!"
        />
        <meta
          property="og:url"
          content="https://mndesignweb.es/redes-sociales"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://mndesignweb.es/logo-card.webp"
        />
        <meta property="og:site_name" content="MN Design Web" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Gestión de Redes Sociales en Alcoy 2026 | MN Design Web"
        />
        <meta
          name="twitter:description"
          content="¿Tus redes sociales no traen clientes? Creamos una estrategia de contenido que posiciona tu marca y aumenta tus ventas. ¡Transformamos tu presencia social!"
        />
        <meta
          name="twitter:image"
          content="https://mndesignweb.es/logo-card.webp"
        />
      </Helmet>

      <div className="social-page-wrapper">
        <RedesSocialesSiguiente />
        <FasesRedes />
        <PlanesRedes />
        <RedesDoble />

        {/* 🔥 SCHEMAS UNIFICADOS Y FUERA DEL HELMET 🔥 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([schemaBreadcrumb, schemaService]),
          }}
        />
      </div>
    </>
  );
};

export default RedesSociales;
