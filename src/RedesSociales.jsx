import React, { useEffect, useRef, lazy, Suspense } from 'react'; // 🔥 Imports añadidos
import { Helmet } from 'react-helmet-async';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"; 
import "lenis/dist/lenis.css";
import { useInView } from 'framer-motion'; // 🔥 Sensor de scroll

// 1. CARGA INMEDIATA: Hero de Redes Sociales
import RedesSocialesSiguiente from './RedesSociales/RedesSocialesSiguiente.jsx';

// 2. CARGA DIFERIDA (LAZY)
const FasesRedes = lazy(() => import('./RedesSociales/FasesRedes.jsx'));
const PlanesRedes = lazy(() => import('./RedesSociales/PlanesRedes.jsx'));
const RedesDoble = lazy(() => import('./RedesSociales/RedesDoble.jsx'));

const RedesSociales = () => {

  // 🔥 SENSORES DE PROXIMIDAD 🔥
  const refFases = useRef(null);
  const isInViewFases = useInView(refFases, { once: true, margin: "400px" });

  const refPlanes = useRef(null);
  const isInViewPlanes = useInView(refPlanes, { once: true, margin: "400px" });

  const refDoble = useRef(null);
  const isInViewDoble = useInView(refDoble, { once: true, margin: "400px" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); lenis.destroy(); };
  }, []);

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://mndesignweb.es/" },
      { "@type": "ListItem", "position": 2, "name": "Servicios", "item": "https://mndesignweb.es/servicios/" },
      { "@type": "ListItem", "position": 3, "name": "Redes Sociales", "item": "https://mndesignweb.es/redes-sociales/" }
    ]
  };

  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Product", 
    "name": "Gestión de Redes Sociales",
    "description": "Estrategia de contenidos, creación de Reels/TikTok y gestión integral de marca.",
    "brand": { 
        "@type": "Brand", 
        "name": "MN Design Web" 
    }, 
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "28",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Cliente Verificado"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Gestión de Redes Sociales en Alcoy 2026 | MN Design Web</title>
        <link rel="canonical" href="https://mndesignweb.es/redes-sociales" />
        <meta name="description" content="¿Tus redes sociales no traen clientes? Creamos una estrategia de contenido que posiciona tu marca y aumenta tus ventas. ¡Transformamos tu presencia social!" />
        
        <meta property="og:title" content="Estrategia y Gestión de Redes Sociales | MN Design Web" />
        <meta property="og:description" content="Tu marca merece ser el centro de atención. Creamos contenido premium que convierte seguidores en clientes." />
        <meta property="og:url" content="https://mndesignweb.es/redes-sociales" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mndesignweb.es/logo-card.png" />
        <meta property="og:site_name" content="MN Design Web" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Estrategia y Gestión de Redes Sociales | MN Design Web" />
        <meta name="twitter:description" content="Tu marca merece ser el centro de atención. Creamos contenido premium que convierte seguidores en clientes." />
        <meta name="twitter:image" content="https://mndesignweb.es/logo-card.png" />

        {/* Esquemas JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(schemaBreadcrumb)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(schemaService)}
        </script>
      </Helmet>

      <div className="social-page-wrapper">
        
        {/* Renderizado inmediato */}
        <RedesSocialesSiguiente />
        
        {/* 🔥 CARGA DIFERIDA CON SENSORES 🔥 */}
        <div ref={refFases} style={{ minHeight: '80vh' }}>
          {isInViewFases && (
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem', color: '#ece8ff' }}>Cargando fases...</div>}>
              <FasesRedes />
            </Suspense>
          )}
        </div>

        <div ref={refPlanes} style={{ minHeight: '80vh' }}>
          {isInViewPlanes && (
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem', color: '#ece8ff' }}>Cargando planes...</div>}>
              <PlanesRedes />
            </Suspense>
          )}
        </div>

        <div ref={refDoble} style={{ minHeight: '60vh' }}>
          {isInViewDoble && (
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem', color: '#ece8ff' }}>Cargando contacto...</div>}>
              <RedesDoble />
            </Suspense>
          )}
        </div>

      </div>
    </>
  );
};

export default RedesSociales;