// Archivo: Inicio.jsx
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "./seo/Seo";
import { EMPRESA } from "./seo/negocio";

// Importamos todas tus secciones
import Grainient from "./Inicio/GrainientBackground";
import ErrorBoundary from "./utils/ErrorBoundary";
import Hero from "./Inicio/Hero";
import Servicios from "./Inicio/Servicios";
import Tecnologias from "./Inicio/Tecnologias";
import Soluciones from "./Inicio/Soluciones";
import Beneficios from "./Inicio/Beneficios";
import ContactoDoble from "./Inicio/ContactoDoble";
import CallToActionFinal from "./Inicio/CallToActionFinal";
import BlogPreview from "./Inicio/BlogPreview";
import { crearLenis } from "./utils/lenis";

const Inicio = () => {
  const schemaInicio = [
    {
      ...EMPRESA,
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Diseño Web Corporativo y Webs con Reservas",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Desarrollo E-Commerce y Tiendas Online",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Posicionamiento SEO",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mantenimiento Web y Soporte Técnico",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Gestión de Redes Sociales y Marketing Digital",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Por qué mi negocio necesita una página web profesional?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tener una página web profesional no solo transmite confianza y autoridad a tus clientes, sino que funciona como un comercial trabajando para ti 24/7. Te ayuda a captar nuevos pacientes o clientes, automatizar procesos como las reservas y diferenciarte de la competencia local y nacional.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto cuesta diseñar una página web a medida?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "El precio de una página web depende de sus funcionalidades (tienda online, sistema de reservas, web corporativa). En MN Design Web estudiamos cada caso para ofrecerte un presupuesto ajustado, priorizando siempre un diseño optimizado que te genere un retorno de inversión real.",
          },
        },
        {
          "@type": "Question",
          name: "¿Aparecerá mi nueva página web en Google?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí, todas nuestras páginas web se desarrollan con una estructura técnica optimizada para SEO (posicionamiento en buscadores). Nos aseguramos de que Google entienda perfectamente qué ofreces para que empieces a escalar posiciones frente a tu competencia desde el primer día.",
          },
        },
        {
          "@type": "Question",
          name: "¿Se pueden añadir sistemas de reservas o tienda online a mi web?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "¡Por supuesto! Somos especialistas en diseño web corporativo y también en integrar sistemas complejos como pasarelas de pago para E-commerce o calendarios de reservas automatizados, ideales para clínicas, estética y eventos.",
          },
        },
        {
          "@type": "Question",
          name: "¿Podré modificar yo mismo el contenido de la web?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sí, diseñamos tu web en entornos amigables para que tengas total autonomía. Una vez terminada, podrás cambiar textos, subir nuevas fotos al portfolio o gestionar las reservas y pedidos de tus clientes de forma totalmente autogestionable.",
          },
        },
        {
          "@type": "Question",
          name: "¿Cuánto tiempo se tarda en crear y publicar un sitio web?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Los tiempos de desarrollo varían según la complejidad del proyecto. Una web corporativa o landing page puede estar lista en un par de semanas, mientras que plataformas de comercio electrónico o webs con bases de datos más complejas pueden requerir algo más de tiempo. Siempre marcamos plazos cerrados y transparentes.",
          },
        },
      ],
    },
  ];

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

    const timer = setTimeout(() => {
      if (window.innerWidth > 768) {
        ScrollTrigger.create({
          trigger: ".hero-section-container",
          start: "top top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          refreshPriority: 1,
        });
      }
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Seo
        ruta="/"
        titulo="MN Design Web | Diseño Web en Alcoi, E-commerce y SEO"
        descripcion="Diseño web profesional en Alcoi: webs a medida, tiendas online y sistemas de reservas para hacer crecer tu negocio. Pide presupuesto a MN Design Web."
      />

      <div className="hero-section-container">
        {/* Decorativo: si fallara, el degradado estático y la página sigue */}
        <ErrorBoundary nombre="Grainient" fallback={<div className="grainient-container" aria-hidden="true" />}>
          <Grainient />
        </ErrorBoundary>
        <Hero />
      </div>

      <div className="main-content-area">
        <section className="servicios-wrapper">
          <Servicios />
        </section>
        <section className="tech-section-wrapper">
          <Tecnologias />
        </section>
        <section className="soluciones-section-wrapper">
          <Soluciones />
        </section>
        <section className="beneficios-wrapper">
          <Beneficios />
        </section>
        <section className="contacto-section-wrapper">
          <ContactoDoble />
        </section>
        <section className="blog-preview-wrapper">
          <BlogPreview />
        </section>
        <CallToActionFinal />
      </div>

      {/* 🔥 4. AÑADIMOS EL SCHEMA EN FORMATO SCRIPT AL FINAL DEL COMPONENTE */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaInicio),
        }}
      />
    </>
  );
};

export default Inicio;
