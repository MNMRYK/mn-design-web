import React, { useEffect, useRef, lazy, Suspense } from 'react'; // 🔥 Importamos herramientas
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"; 
import "lenis/dist/lenis.css";
import { Helmet } from 'react-helmet-async';
import { useInView } from 'framer-motion'; // 🔥 Importamos el sensor

// 1. CARGA INMEDIATA: Hero
import DisenoWebSiguiente from './DisenoWeb/DisenoWebSiguiente.jsx';

// 2. CARGA DIFERIDA (LAZY): Componentes pesados
const DisenoWebSeccionesEspeciales = lazy(() => import('./DisenoWeb/DisenoWebSeccionesEspeciales.jsx'));
const ResponsiveShowcase = lazy(() => import('./DisenoWeb/ResponsiveShowcase.jsx'));
const DisenoDoble = lazy(() => import('./DisenoWeb/DisenoDoble.jsx'));

const DisenoWeb = () => {

  // 🔥 SENSORES DE PROXIMIDAD 🔥
  const refSecciones = useRef(null);
  const isInViewSecciones = useInView(refSecciones, { once: true, margin: "400px" });

  const refShowcase = useRef(null);
  const isInViewShowcase = useInView(refShowcase, { once: true, margin: "400px" });

  const refDoble = useRef(null);
  const isInViewDoble = useInView(refDoble, { once: true, margin: "400px" });


  // 🔥 1. GUARDAMOS EL JSON EN UNA VARIABLE (Antes de los efectos)
  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cuánto cuesta diseñar una página web profesional?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El precio varía según la complejidad, pero en MN Design Web ofrecemos planes desde 350€ (en oferta) que garantizan un diseño profesional, rápido y optimizado para SEO desde el primer día. Siempre escuchamos qué proyecto quieres llevar a cabo para ofrecerte un presupuesto adaptado."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuánto tiempo se tarda en crear una página web a medida?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Depende del proyecto, pero suelen oscilar entre 1 a 3 semanas. Trabajamos con procesos optimizados para que tu web esté lista en tiempo récord, asegurando que cada sección funcione a la perfección y sin errores técnicos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Mi página web estará adaptada a teléfonos móviles y tablets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutamente. Diseñamos bajo la estricta filosofía Mobile-First, creando arquitecturas líquidas. Esto garantiza que tu sitio se adapte con precisión quirúrgica a cualquier resolución, ofreciendo una experiencia de usuario (UX) impecable."
        }
      },
      {
        "@type": "Question",
        "name": "¿Tengo que proporcionar yo los textos y las imágenes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Lo ideal es que nos facilites el material base porque tú conoces tu negocio mejor que nadie. Sin embargo, aplicamos técnicas de Copywriting SEO para reescribir y optimizar tus textos para que vendan. Además, podemos integrar imágenes de banco profesionales si te faltan recursos gráficos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Mi web aparecerá en los primeros resultados de Google?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No solo diseñamos; optimizamos la structure técnica para el posicionamiento en buscadores (SEO). Usamos herramientas como Rank Math y datos estructurados para que Google rastree, entienda y priorice tu contenido frente a tu competencia."
        }
      },
      {
        "@type": "Question",
        "name": "¿Podré gestionar yo mismo el contenido de la web?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, construimos plataformas para que tengas total autonomía. Podrás actualizar textos, subir nuevos proyectos o gestionar las reservas de tus clientes de forma totalmente autogestionable y sin tocar código."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo funcionan los sistemas de reservas integrados?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Implementamos sistemas de reservas automatizados para que tus clientes puedan agendar citas directamente desde la web 24/7. Esto se sincroniza con tu calendario en tiempo real, evitando solapamientos y ahorrándote horas de gestión."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué gastos fijos anuales tiene mantener una página web?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Además del diseño inicial, toda web requiere renovar anualmente un Dominio (tu nombre en internet) y un Hosting (el servidor). Si tu proyecto usa funcionalidades premium muy concretas, podrían tener un coste de licencia. Siempre te informaremos de estos costes externos con total transparencia."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué pasa si ya tengo mi propio dominio o hosting contratado?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No hay ningún problema. Evaluaremos si tu proveedor actual cumple con los estándares técnicos de velocidad y seguridad requeridos. Si es apto, desarrollaremos ahí; si se queda corto, nos encargaremos de toda la gestión técnica y migración de DNS a un entorno profesional sin que tengas que preocuparte de nada."
        }
      },
      {
        "@type": "Question",
        "name": "¿Está incluido el mantenimiento técnico de la web?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El Plan Esencial incluye el primer año de soporte y mantenimiento Premium. Para el resto de planes, ofrecemos un Mantenimiento Estándar por 200€/año. Como oferta para nuevos clientes, el primer año queda en 170€. Además, premiamos la fidelidad: la renovación a partir del segundo año tiene un 50% de descuento (100€/año)."
        }
      }
    ]
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);


    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      lenis.destroy(); 
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Diseño Web Profesional en Alcoy 2026 | MN Design Web</title>
        <link rel="canonical" href="https://mndesignweb.es/disenoweb" />
        <meta name="description" content="¿Buscas una web que venda? Creamos diseños estratégicos, optimizados y listos para convertir. Especialistas en diseño web en Alcoy." />
        
        <meta property="og:title" content="Diseño Web Profesional en Alcoy 2026 | MN Design Web" />
        <meta property="og:description" content="¿Buscas una web que venda? Creamos diseños estratégicos, optimizados y listos para convertir." />
        <meta property="og:url" content="https://mndesignweb.es/disenoweb" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mndesignweb.es/logo-card.png" />
        <meta property="og:site_name" content="MN Design Web" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Diseño Web Profesional en Alcoy 2026 | MN Design Web" />
        <meta name="twitter:description" content="¿Buscas una web que venda? Creamos diseños estratégicos, optimizados y listos para convertir." />
        <meta name="twitter:image" content="https://mndesignweb.es/logo-card.png" />
      </Helmet>
      
      <div className="disenoweb-page-wrapper">
        
        {/* Renderizado inmediato */}
        <DisenoWebSiguiente />
        
        {/* 🔥 CARGA DIFERIDA CON SENSORES 🔥 */}
        <div ref={refSecciones} style={{ minHeight: '80vh' }}>
          {isInViewSecciones && (
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem', color: '#ece8ff' }}>Cargando planes y estructuras...</div>}>
              <DisenoWebSeccionesEspeciales />
            </Suspense>
          )}
        </div>

        <div ref={refShowcase} style={{ minHeight: '80vh' }}>
          {isInViewShowcase && (
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem', color: '#ece8ff' }}>Cargando portfolio...</div>}>
              <ResponsiveShowcase />
            </Suspense>
          )}
        </div>

        <div ref={refDoble} style={{ minHeight: '60vh' }}>
          {isInViewDoble && (
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem', color: '#ece8ff' }}>Cargando contacto...</div>}>
              <DisenoDoble />
            </Suspense>
          )}
        </div>
        
        {/* JSON-LD ÚNICO Y BIEN CERRADO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify([
              schemaFAQ,
              {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "name": "MN Design Web",
                "image": "https://mndesignweb.es/logo-card.png",
                "url": "https://mndesignweb.es/",
                "address": { "@type": "PostalAddress", "addressLocality": "Alicante", "addressCountry": "ES" },
                "priceRange": "$$"
              },
              {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://mndesignweb.es/" },
                  { "@type": "ListItem", "position": 2, "name": "Diseño Web", "item": "https://mndesignweb.es/disenoweb" }
                ]
              },
              {
                "@context": "https://schema.org/",
                "@type": "Product",
                "name": "Servicios de Diseño Web MN Design Web",
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "bestRating": "5", "ratingCount": "15" }
              }
            ]) 
          }}
        />
      </div>
    </>
  );
};

export default DisenoWeb;