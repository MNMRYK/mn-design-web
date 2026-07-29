// Archivo: Inicio.jsx
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { Helmet } from "react-helmet-async";

// Importamos todas tus secciones
import Grainient from "./Inicio/GrainientBackground";
import Hero from "./Inicio/Hero";
import Servicios from "./Inicio/Servicios";
import Tecnologias from "./Inicio/Tecnologias";
import Soluciones from "./Inicio/Soluciones";
import Beneficios from "./Inicio/Beneficios";
import ContactoDoble from "./Inicio/ContactoDoble";
import CallToActionFinal from "./Inicio/CallToActionFinal";
import BlogPreview from "./Inicio/BlogPreview";

const Inicio = () => {
  const schemaInicio = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "MN Design Web",
      url: "https://mndesignweb.es/",
      logo: "https://mndesignweb.es/favicon_v2.webp",
      image: "https://mndesignweb.es/logo-card.webp",
      description:
        "Agencia de desarrollo y diseño web premium en Alcoy, Alicante. Especialistas en Diseño Web, E-commerce, posicionamiento SEO y Redes Sociales.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Alcoy",
        addressCountry: "ES",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+34-645-854-934",
        contactType: "customer service",
        email: "info@mndesignweb.es",
        availableLanguage: "Spanish",
      },
      priceRange: "$$",
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

    const lenis = new Lenis({
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

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
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
      <Helmet>
        <title>MN Design Web | Diseño Web en Alcoy, E-commerce y SEO</title>

        <link rel="canonical" href="https://mndesignweb.es/" />

        <meta
          name="description"
          content="Diseño web profesional en Alcoy. Especialistas en creación de sitios web a medida, tiendas online y sistemas de reservas. ¡Haz crecer tu negocio con MN Design Web!"
        />

        <meta
          property="og:title"
          content="MN Design Web | Diseño Web en Alcoy, E-commerce y SEO"
        />
        <meta
          property="og:description"
          content="Diseño web profesional en Alcoy. Especialistas en creación de sitios web a medida, tiendas online y sistemas de reservas. ¡Haz crecer tu negocio con MN Design Web!"
        />
        <meta property="og:url" content="https://mndesignweb.es/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://mndesignweb.es/logo-card.webp"
        />
        <meta property="og:site_name" content="MN Design Web" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="MN Design Web | Diseño Web en Alcoy, E-commerce y SEO"
        />
        <meta
          name="twitter:description"
          content="Diseño web profesional en Alcoy. Especialistas en creación de sitios web a medida, tiendas online y sistemas de reservas. ¡Haz crecer tu negocio con MN Design Web!"
        />
        <meta
          name="twitter:image"
          content="https://mndesignweb.es/logo-card.webp"
        />
      </Helmet>

      <div className="hero-section-container">
        <Grainient />
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
