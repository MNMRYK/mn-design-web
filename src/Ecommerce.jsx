import React, { useEffect } from "react";
import Seo from "./seo/Seo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import EcommerceSiguiente from "./Ecommerce/EcommerceSiguiente.jsx";
import EcommercePlanes from "./Ecommerce/EcommercePlanes.jsx";
import ResponsiveShowcase from "./DisenoWeb/ResponsiveShowcase.jsx";
import EcommerceDoble from "./Ecommerce/EcommerceDoble.jsx";
import { EMPRESA, REF_EMPRESA, AREA_SERVIDA } from "./seo/negocio";
import { crearLenis } from "./utils/lenis";

const Ecommerce = () => {
  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué plataforma es mejor: Shopify o WooCommerce?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Depende de tu modelo de negocio. Shopify es ideal para escalar rápido y despreocuparte de la técnica. WooCommerce te da control total y menores costes fijos si buscas un proyecto a medida. Analizamos tu caso y te recomendamos la que realmente te hará ganar más dinero.",
        },
      },
      {
        "@type": "Question",
        name: "¿Es seguro el proceso de pago en mi tienda online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutamente. Implementamos pasarelas certificadas (Stripe, PayPal, Redsys) con encriptación SSL de grado bancario. La seguridad del cliente es nuestra prioridad para que la tasa de conversión sea máxima.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo convierto visitantes en clientes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Diseñamos bajo principios de CRO (Conversion Rate Optimization). No solo buscamos una estética bonita, sino una experiencia de usuario (UX) que facilite el carrito, reduzca el abandono y guíe al usuario hacia el botón de compra de forma natural.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué gastos adicionales tiene mantener una tienda online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Además de Hosting y Dominio, hay que considerar comisiones de la pasarela de pago y posibles licencias de plugins premium. Siempre te daremos un desglose transparente antes de empezar para que no tengas sorpresas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué incluye vuestro mantenimiento de E-commerce?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El mantenimiento asegura que pagos, inventario y checkout funcionen 24/7. Monitorizamos caídas, actualizamos seguridad y optimizamos la velocidad para que nunca pierdas una venta por un error técnico.",
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
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Seo
        ruta="/e-commerce/"
        titulo="Tienda Online y E-commerce en Alcoi 2026 | MN Design Web"
        descripcion="Expertos en desarrollo E-Commerce: Shopify, WooCommerce o tiendas a medida. Creamos tu tienda online optimizada para vender 24/7. ¡Pide tu presupuesto!"
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
