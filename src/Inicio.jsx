// Archivo: Inicio.jsx
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "./seo/Seo";
import { EMPRESA, REF_EMPRESA } from "./seo/negocio";
import { DOMINIO } from "./seo/rutas";

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
import ResenasGoogle from "./Resenas/ResenasGoogle";
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
    // Nombre del sitio en los resultados de Google.
    // (Sin FAQPage: la home no muestra preguntas frecuentes)
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${DOMINIO}/#web`,
      url: `${DOMINIO}/`,
      name: "MN Design Web",
      inLanguage: "es-ES",
      publisher: REF_EMPRESA,
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

    let pinHero = null;
    const timer = setTimeout(() => {
      if (window.innerWidth > 768) {
        pinHero = ScrollTrigger.create({
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
      // Solo el trigger de esta página: los componentes limpian los suyos
      if (pinHero) pinHero.kill(true);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Seo
        ruta="/"
        titulo="Agencia de Diseño y Desarrollo Web | MN Design Web"
        descripcion="Agencia de diseño y desarrollo web: webs a medida, tiendas online, SEO y software para empresas de toda España. Estudio en Cocentaina (Alicante)."
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
        <ResenasGoogle />
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
