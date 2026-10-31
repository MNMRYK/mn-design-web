import React, { useEffect } from "react";
import Seo from "./seo/Seo";

import IdentidadMarca from "./Branding/IdentidadMarca.jsx";
import RedesDoble from "./RedesSociales/RedesDoble.jsx";
import CtaCreativos from "./Creativos/CtaCreativos.jsx";
import { EMPRESA, REF_EMPRESA, AREA_SERVIDA } from "./seo/negocio";
import { DOMINIO } from "./seo/rutas";
import { schemaFaq } from "./seo/faq";
import { PREGUNTAS_BRANDING } from "./Branding/preguntasBranding";
import { crearLenis } from "./utils/lenis";

const URL_PAGINA = `${DOMINIO}/branding/`;
const ID_LARA = `${URL_PAGINA}#lara-summers`;

// Opciones del formulario: los cinco servicios de la página
const OPCIONES_FORMULARIO = [
  "Identidad de marca y diseño visual",
  "Imágenes y fotografía con IA",
  "Vídeo y campañas creativas",
  "Dirección visual para redes sociales",
  "Dirección de arte para mi web",
  "Consulta rápida / Otra duda",
];

// /branding/: branding e identidad de marca (diseño de Figma "Identidad de marca y contenido
// visual"). Palabra clave: "branding e identidad de marca".
const Branding = () => {
  useEffect(() => {
    const lenis = crearLenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: true,
      anchors: true,
      prevent: (node) => {
        if (!node || !node.closest) return false;
        return node.nodeName.includes("TYPEBOT") || node.closest("typebot-bubble") !== null;
      },
    });
    return () => lenis.destroy();
  }, []);

  // Mismas preguntas que se ven en la página (el build falla si no coinciden)
  const schemaFAQ = schemaFaq(PREGUNTAS_BRANDING);

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${DOMINIO}/` },
      { "@type": "ListItem", position: 2, name: "Branding e identidad de marca", item: URL_PAGINA },
    ],
  };

  // Lara colabora con la agencia (no es empleada): affiliation, no worksFor
  const schemaLara = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ID_LARA,
    name: "Lara Summers",
    jobTitle: "Directora de arte",
    description:
      "Directora de arte especializada en identidad visual, creación de contenido y producción creativa con inteligencia artificial.",
    image: `${DOMINIO}/lara-summers-directora-arte.webp`,
    affiliation: REF_EMPRESA,
    knowsAbout: ["Dirección de arte", "Identidad visual", "Creación de contenido", "Imágenes con inteligencia artificial"],
  };

  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Branding e identidad de marca",
    serviceType: "Branding e identidad visual",
    image: `${DOMINIO}/og-mndesignweb.jpg`,
    description:
      "Identidad de marca y diseño visual, imágenes y fotografía con inteligencia artificial, vídeo y campañas creativas, dirección visual para redes sociales y dirección de arte para páginas web.",
    provider: [REF_EMPRESA, { "@id": ID_LARA }],
    areaServed: AREA_SERVIDA,
    url: URL_PAGINA,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios creativos",
      itemListElement: [
        "Identidad de marca y diseño visual",
        "Imágenes y fotografía con inteligencia artificial",
        "Vídeo y campañas creativas",
        "Dirección visual para redes sociales",
        "Dirección de arte para páginas web",
      ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
    },
  };

  return (
    <>
      <Seo
        ruta="/branding/"
        titulo="Branding e identidad de marca | MN Design Web"
        descripcion="Branding e identidad de marca para tu negocio: identidad visual, imágenes con IA, vídeo y campañas, contenido para redes y dirección de arte para tu web."
      />

      <div className="creativos-pagina">
        <IdentidadMarca />
        <RedesDoble
          preguntas={PREGUNTAS_BRANDING}
          formulario={{ opciones: OPCIONES_FORMULARIO, pagina: "Branding", formulario: "branding" }}
        />
        <CtaCreativos texto="Prepararemos una propuesta personalizada." />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([schemaFAQ, EMPRESA, schemaBreadcrumb, schemaLara, schemaService]),
          }}
        />
      </div>
    </>
  );
};

export default Branding;
