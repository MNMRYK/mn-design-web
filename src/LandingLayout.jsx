import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis"; 
import "lenis/dist/lenis.css";

import KitDigitalLanding from './LandingKit/KitDigitalLanding.jsx';
import ServiciosRescate from './LandingKit/ServiciosRescate.jsx';
import ContactoRescate from './LandingKit/ContactoRescate.jsx';
import BarraConfianza from './LandingKit/BarraConfianza.jsx';
import MapaSolucion from './LandingKit/MapaSolucion.jsx';
import FooterLanding from './LandingKit/FooterLanding.jsx';

const LandingLayout = () => {

    useEffect(() => {
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

    // Combinamos la información de WebPage con el esquema FAQ que tenías
    const schemaFAQ = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "¿Qué incluye el rescate de mi web tras el Kit Digital?",
                "acceptedAnswer": { "@type": "Answer", "text": "Incluye auditoría técnica, limpieza de código, optimización de seguridad y puesta a punto de tu estrategia de ventas." }
            },
            {
                "@type": "Question",
                "name": "¿Cuánto tiempo tarda el proceso de rescate?",
                "acceptedAnswer": { "@type": "Answer", "text": "Diagnóstico en menos de 24h y ejecución ágil personalizada según la complejidad de tu proyecto." }
            },
            {
                "@type": "Question",
                "name": "¿Podéis mejorar mi posicionamiento SEO?",
                "acceptedAnswer": { "@type": "Answer", "text": "Sí, realizamos auditoría y optimización técnica para corregir errores que te impiden aparecer en Google." }
            },
            {
                "@type": "Question",
                "name": "¿Qué garantía ofreces con el rescate?",
                "acceptedAnswer": { "@type": "Answer", "text": "Trabajamos con total transparencia, garantizando un código limpio y una configuración optimizada para tu negocio." }
            },
            {
                "@type": "Question",
                "name": "¿Cómo empiezo mi auditoría gratuita?",
                "acceptedAnswer": { "@type": "Answer", "text": "Solo tienes que rellenar el formulario de validación y reservar tu plaza en nuestro calendario para una sesión 1-a-1." }
            }
        ]
    };

    return (
        <HelmetProvider>
            <div className="landing-page-wrapper">
                <Helmet>
                    <title>MN Design Web | Rescate de Proyectos Web y Kit Digital</title>
                    <link rel="canonical" href="https://mndesignweb.es/rescate-kit-digital" />
                    <meta name="description" content="¿Tu web del Kit Digital no funciona o está abandonada? En MN Design Web rescatamos proyectos, optimizamos el SEO y relanzamos tu e-commerce. Soluciones profesionales en Alicante." />
                    
                    {/* He quitado la etiqueta del favicon de aquí. Asegúrate de tenerla SOLO en el public/index.html */}

                    {/* Open Graph (WhatsApp, Facebook, LinkedIn) */}
                    <meta property="og:title" content="MN Design Web | Rescate de Proyectos Web Kit Digital" />
                    <meta property="og:description" content="¿Tu web del Kit Digital no funciona o está abandonada? Recuperamos y optimizamos tu proyecto para que empiece a vender." />
                    <meta property="og:url" content="https://mndesignweb.es/rescate-kit-digital" />
                    <meta property="og:type" content="website" />
                    <meta property="og:image" content="https://mndesignweb.es/logo-card.png" />
                    <meta property="og:site_name" content="MN Design Web" />

                    {/* Twitter Cards */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Rescate de Proyectos Web Kit Digital | MN Design Web" />
                    <meta name="twitter:description" content="¿Tu web del Kit Digital no funciona? En MN Design Web rescatamos tu proyecto y lo ponemos a vender." />
                    <meta name="twitter:image" content="https://mndesignweb.es/logo-card.png" />
                    
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ 
                        __html: JSON.stringify([
                            schemaFAQ,
                            // Aquí he metido la información de "WebPage" que tenías en schemaData
                            {
                                "@context": "https://schema.org",
                                "@type": "WebPage",
                                "name": "Rescate de Proyectos Web y Kit Digital",
                                "description": "Expertos en recuperar webs abandonadas tras el Kit Digital. Auditoría técnica, optimización SEO y rescate de e-commerce."
                            },
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
                                    { "@type": "ListItem", "position": 2, "name": "Rescate de Proyectos", "item": "https://mndesignweb.es/rescate-kit-digital" }
                                ]
                            },
                            {
                                "@context": "https://schema.org/",
                                "@type": "Product",
                                "name": "Servicios de Rescate Web MN Design Web",
                                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "bestRating": "5", "ratingCount": "89" }
                            }
                        ]) 
                        }}
                    />
                </Helmet>

                <KitDigitalLanding />
                <BarraConfianza />
                <ServiciosRescate />
                <MapaSolucion />
                <ContactoRescate />
                <FooterLanding />
            </div>
        </HelmetProvider>
    );
};
export default LandingLayout;