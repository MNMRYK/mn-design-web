import React, { useEffect, useRef, lazy, Suspense } from 'react'; // 🔥 Importamos lazy, Suspense y useRef
import { Helmet } from 'react-helmet-async';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"; 
import "lenis/dist/lenis.css";
import { useInView } from 'framer-motion'; // 🔥 Importamos el sensor

// 1. CARGA INMEDIATA: La primera sección que se ve al entrar (Hero de Nosotros)
import NosotrosSiguiente from './Nosotros/NosotrosSiguiente';

// 2. CARGA DIFERIDA (LAZY): Secciones que están más abajo
const MetodologiaSticky = lazy(() => import('./Nosotros/MetodologiaSticky'));
const DamosForma = lazy(() => import('./Nosotros/DamosForma'));
const CierreProximity = lazy(() => import('./Nosotros/CierreProximity'));

const Nosotros = () => {

  // 🔥 SENSORES PARA LAS SECCIONES DE ABAJO 🔥
  const refMetodologia = useRef(null);
  const isInViewMetodologia = useInView(refMetodologia, { once: true, margin: "400px" });

  const refDamosForma = useRef(null);
  const isInViewDamosForma = useInView(refDamosForma, { once: true, margin: "400px" });

  const refCierre = useRef(null);
  const isInViewCierre = useInView(refCierre, { once: true, margin: "400px" });

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Por qué MN Design Web es diferente a otras agencias?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Porque no somos una fábrica de webs. En MN Design Web tratamos cada proyecto como si fuera nuestro. Combinamos una metodología técnica sólida con un trato cercano, asegurándonos de que tu web no solo sea estética, sino una herramienta de negocio real."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es vuestra filosofía de trabajo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Creemos en la honestidad, la transparencia y la calidad por encima de la cantidad. Nos gusta trabajar con clientes que valoran la estrategia y la personalización, no soluciones rápidas y de bajo valor."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué tipo de proyectos soléis realizar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos especializamos en diseño web estratégico, desarrollo E-commerce y sistemas de reservas. Ayudamos a negocios locales en Alicante y empresas de toda España a digitalizarse de forma profesional y eficiente."
        }
      }
    ]
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); lenis.destroy(); };
  }, []);

  return (
    <>
      <Helmet>
        <title>Sobre Nosotros | MN Design Web - Agencia de Diseño Web</title>
        <link rel="canonical" href="https://mndesignweb.es/nosotros" />
        <meta name="description" content="Conoce al equipo detrás de MN Design Web. Creamos experiencias digitales únicas, desde e-commerce hasta webs con sistemas de reservas. ¡Transformamos tu visión en realidad!" />
        
        <meta property="og:title" content="Sobre MN Design Web | Tu aliado digital" />
        <meta property="og:description" content="Conoce al equipo detrás de MN Design Web. Creamos experiencias digitales únicas, desde e-commerce hasta webs con sistemas de reservas." />
        <meta property="og:url" content="https://mndesignweb.es/nosotros" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mndesignweb.es/logo-card.png" />
        <meta property="og:site_name" content="MN Design Web" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sobre MN Design Web | Tu aliado digital" />
        <meta name="twitter:description" content="Conoce al equipo detrás de MN Design Web. Creamos experiencias digitales únicas." />
        <meta name="twitter:image" content="https://mndesignweb.es/logo-card.png" />
      </Helmet>
      
      <div className="nosotros-page-wrapper">
        
        {/* CARGA INMEDIATA */}
        <NosotrosSiguiente />
        
        {/* 🔥 CARGA DIFERIDA CON SENSORES 🔥 */}
        <div ref={refMetodologia} style={{ minHeight: '100vh' }}>
            {isInViewMetodologia && (
                <Suspense fallback={<div>Cargando Metodología...</div>}>
                    <MetodologiaSticky />
                </Suspense>
            )}
        </div>

        <div ref={refDamosForma} style={{ minHeight: '80vh' }}>
            {isInViewDamosForma && (
                <Suspense fallback={<div>Cargando...</div>}>
                    <DamosForma />
                </Suspense>
            )}
        </div>

        <div ref={refCierre} style={{ minHeight: '50vh' }}>
            {isInViewCierre && (
                <Suspense fallback={<div>Cargando Cierre...</div>}>
                    <CierreProximity />
                </Suspense>
            )}
        </div>

        {/* METADATOS SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify([
              schemaFAQ,
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "MN Design Web",
                "url": "https://mndesignweb.es/",
                "logo": "https://mndesignweb.es/logo.png",
                "description": "Agencia de diseño web y desarrollo E-commerce profesional en Alicante."
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://mndesignweb.es/" },
                  { "@type": "ListItem", "position": 2, "name": "Nosotros", "item": "https://mndesignweb.es/nosotros" }
                ]
              }
            ]) 
          }}
        />
      </div>
    </>
  );
};

export default Nosotros;