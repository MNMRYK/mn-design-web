import React, { useEffect } from "react";
import Seo from "./seo/Seo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import EcommerceSiguiente from "./Ecommerce/EcommerceSiguiente.jsx";
import EcommercePlanes from "./Ecommerce/EcommercePlanes.jsx";
import ResponsiveShowcase from "./DisenoWeb/ResponsiveShowcase.jsx";
import EcommerceDoble from "./Ecommerce/EcommerceDoble.jsx";
import { EMPRESA, REF_EMPRESA, AREA_SERVIDA } from "./seo/negocio";
import { schemaFaq } from "./seo/faq";
import { PREGUNTAS_ECOMMERCE } from "./Ecommerce/preguntasEcommerce";
import { crearLenis } from "./utils/lenis";

const Ecommerce = () => {
  // Mismas preguntas que se ven en la página (el build falla si no coinciden)
  const schemaFAQ = schemaFaq(PREGUNTAS_ECOMMERCE);

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
        ruta="/e-commerce/"
        titulo="Diseño de Tiendas Online a Medida | MN Design Web"
        descripcion="Diseño de tiendas online con Shopify, WooCommerce o a medida: catálogo, pagos y envíos listos para vender desde el primer día."
      />

      <div className="ecommerce-page-wrapper">
        <EcommerceSiguiente />
        <EcommercePlanes />
        <ResponsiveShowcase />
        <EcommerceDoble />

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
                    name: "E-commerce",
                    item: "https://mndesignweb.es/e-commerce/",
                  },
                ],
              },
              {
                "@context": "https://schema.org/",
                "@type": "Service",
                name: "Desarrollo de Tiendas Online E-commerce",
                image: "https://mndesignweb.es/logo-card.webp",
                description:
                  "Desarrollo de tiendas online a medida, escalables y optimizadas para una máxima conversión de ventas.",
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

export default Ecommerce;
