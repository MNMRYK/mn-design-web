import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"; 
import "lenis/dist/lenis.css";

// Importamos el componente hijo con la animación que acabamos de crear
import PortfolioSiguiente from './Portfolio/PortfolioSiguiente.jsx';

const Portfolio = () => {

  useEffect(() => {
    // Inicializamos el scroll suave y GSAP igual que en las otras páginas
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ 
      duration: 1.2, 
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); lenis.destroy(); };
  }, []);

  return (
    <>
      {/* 🔥 METADATOS Y SEO PARA EL PORTFOLIO 🔥 */}
      <Helmet>
        <title>Portfolio de Diseño y Desarrollo Web en Alcoy | MN Design Web</title>
        <link rel="canonical" href="https://mndesignweb.es/portfolio" />
        <meta name="description" content="Explora nuestro portafolio de proyectos. Creamos páginas web a medida, tiendas online e-commerce y arquitecturas SEO de alto rendimiento." />
        
        <meta property="og:title" content="Portfolio de Proyectos | MN Design Web" />
        <meta property="og:description" content="Descubre cómo ayudamos a otras empresas a escalar su negocio con webs rápidas, seguras y listas para convertir." />
        <meta property="og:url" content="https://mndesignweb.es/portfolio" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mndesignweb.es/logo-card.webp" />
        <meta property="og:site_name" content="MN Design Web" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio de Proyectos | MN Design Web" />
        <meta name="twitter:description" content="Descubre cómo ayudamos a otras empresas a escalar su negocio con webs rápidas, seguras y listas para convertir." />
        <meta name="twitter:image" content="https://mndesignweb.es/logo-card.webp" />
      </Helmet>

      {/* 🔥 CONTENEDOR PRINCIPAL DONDE INYECTAMOS LAS SECCIONES 🔥 */}
      <div className="portfolio-page-wrapper">
        
        {/* Aquí entra tu animación de código rompedora */}
        <PortfolioSiguiente />
        
        {/* Si en el futuro haces más secciones para el portfolio, las irías poniendo aquí debajo */}

        {/* 🔥 DATOS ESTRUCTURADOS (SCHEMA) PARA GOOGLE 🔥 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "name": "MN Design Web",
                "url": "https://mndesignweb.es/",
                "address": { "@type": "PostalAddress", "addressLocality": "Alcoy", "addressCountry": "ES" }
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://mndesignweb.es/" },
                  { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://mndesignweb.es/portfolio" }
                ]
              }
            ]) 
          }}
        />
      </div>
    </>
  );
};

export default Portfolio;