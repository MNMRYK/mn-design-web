import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Importamos los componentes hijos (que crearemos en el siguiente paso)
import HeaderDemos from "./Demos/HeaderDemos";
import BlogPreview from "./Nosotros/BlogPreview";
import SeccionContactoDemo from "./Demos/SeccionContactoDemo";
import FormularioDemo from "./Demos/FormularioDemo";

const Demos = () => {
  // 1. Schema de "CollectionPage"
  const schemaCollection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Demos y Proyectos de Diseño Web",
    description:
      "Explora nuestras demos interactivas y prototipos de alto rendimiento. Descubre diseños web a medida para e-commerce, clínicas, B2B, cursos e invitaciones digitales para eventos.",
    url: "https://mndesignweb.es/demos",
  };

  // 2. Schema de "FAQPage"
  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué incluye exactamente la demo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Diseñamos la estructura principal adaptada a tu marca, paleta de colores y modelo de negocio para que visualices el resultado real.",
        },
      },
      {
        "@type": "Question",
        name: "¿De verdad es 100% gratis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Totalmente. Es nuestra forma de demostrarte la calidad de nuestro diseño antes de que inviertas con nosotros.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto tardáis en hacerla?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Analizamos tu formulario y en un plazo de 48h nos reunimos contigo por videollamada para presentarte el prototipo.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué pasa después?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Si la demo te encaja, trazamos la estrategia técnica y te pasamos un presupuesto cerrado para desarrollar la web completa. Sin compromisos.",
        },
      },
    ],
  };

  // 3. Schema de "ProfessionalService"
  const schemaService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "MN Design Web",
    image: "https://mndesignweb.es/logo-card.webp",
    url: "https://mndesignweb.es/",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Alicante",
      addressCountry: "ES",
    },
    description:
      "Agencia de diseño web y desarrollo de alto rendimiento. Especialistas en conversión, UI/UX y sitios web con sistemas de reservas.",
  };

  // 4. Schema de "Product" (Con imagen, valoraciones y reseñas añadidas)
  const schemaProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Prototipo de Diseño Web a Medida",
    image: "https://mndesignweb.es/logo-card.webp",
    description:
      "Demostración inicial y diseño de estructura web de alto rendimiento (Hero y layout principal) adaptada a la identidad corporativa de tu marca.",
    brand: {
      "@type": "Brand",
      name: "MN Design Web",
    },
    offers: {
      "@type": "Offer",
      url: "https://mndesignweb.es/demos#solicitar-demo",
      priceCurrency: "EUR",
      price: "0",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "24",
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Cliente Verificado",
      },
    },
  };

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

    // Detectar si venimos de otra página con el ancla
    if (window.location.hash === "#solicitar-demo") {
      setTimeout(() => {
        const seccionFormulario = document.getElementById("solicitar-demo");
        if (seccionFormulario) {
          seccionFormulario.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Demos y Prototipos | MN Design Web - Estudio Diseño Web en Alicante
        </title>
        <link rel="canonical" href="https://mndesignweb.es/demos" />

        {/* 🔥 AHORA SÍ: TODAS LAS DESCRIPCIONES IGUALES 🔥 */}
        <meta
          name="description"
          content="Explora nuestras demos interactivas y prototipos de alto rendimiento. Descubre diseños web a medida para e-commerce, clínicas, B2B, cursos e invitaciones digitales para eventos."
        />

        <meta
          property="og:title"
          content="Demos y Prototipos | MN Design Web"
        />
        <meta
          property="og:description"
          content="Explora nuestras demos interactivas y prototipos de alto rendimiento. Descubre diseños web a medida para e-commerce, clínicas, B2B, cursos e invitaciones digitales para eventos."
        />
        <meta property="og:url" content="https://mndesignweb.es/demos" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://mndesignweb.es/logo-card.webp"
        />
        <meta property="og:site_name" content="MN Design Web" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Demos y Prototipos | MN Design Web"
        />
        <meta
          name="twitter:description"
          content="Explora nuestras demos interactivas y prototipos de alto rendimiento. Descubre diseños web a medida para e-commerce, clínicas, B2B, cursos e invitaciones digitales para eventos."
        />
        <meta
          name="twitter:image"
          content="https://mndesignweb.es/logo-card.webp"
        />
      </Helmet>

      <div className="demos-page-wrapper">
        <HeaderDemos />
        <SeccionContactoDemo />
        <BlogPreview />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              schemaCollection,
              schemaFAQ,
              schemaService,
              schemaProduct,
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
                    name: "Demos",
                    item: "https://mndesignweb.es/demos",
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

export default Demos;
