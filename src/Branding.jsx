import React, { useEffect } from "react";
import Seo from "./seo/Seo";

import {
  HeroBranding,
  ProblemaBranding,
  ServiciosBranding,
  EntregablesBranding,
  EquipoBranding,
  FormasBranding,
  TrabajosBranding,
} from "./Branding/IdentidadMarca.jsx";
import CintaServicios from "./Creativos/CintaServicios.jsx";
import CronologiaPasos from "./Creativos/CronologiaPasos.jsx";
import RedesDoble from "./RedesSociales/RedesDoble.jsx";
import CtaCreativos from "./Creativos/CtaCreativos.jsx";
import { PASOS_CREATIVOS, TITULO_PASOS } from "./Creativos/pasos";
import { EMPRESA, REF_EMPRESA, AREA_SERVIDA, ID_FUNDADORA, ID_EMPRESA } from "./seo/negocio";
import { DOMINIO } from "./seo/rutas";
import { WEBSITE, schemaBreadcrumb, schemaWebPage, catalogo } from "./seo/paginaServicio";
import { schemaFaq } from "./seo/faq";
import { PREGUNTAS_BRANDING } from "./Branding/preguntasBranding";
import { crearLenis } from "./utils/lenis";

const RUTA = "/branding/";
const TITULO = "Branding e identidad de marca | MN Design Web";
const DESCRIPCION =
  "Branding e identidad de marca para tu negocio: identidad visual, imágenes con IA, vídeo y campañas, contenido para redes y dirección de arte para tu web.";
const ID_LARA = `${DOMINIO}${RUTA}#lara-summers`;
const ID_SERVICIO = `${DOMINIO}${RUTA}#servicio`;

const SERVICIOS = [
  "Identidad de marca y diseño visual",
  "Imágenes y fotografía con inteligencia artificial",
  "Vídeo y campañas creativas",
  "Dirección visual para redes sociales",
  "Dirección de arte para páginas web",
];

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
// visual" + secciones nuevas). Palabra clave: "branding e identidad de marca".
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

  // Lara colabora con la agencia (no es empleada): affiliation, nunca worksFor.
  const schemaLara = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ID_LARA,
    name: "Lara Summers",
    jobTitle: "Directora de arte y contenido visual",
    description:
      "Directora de arte especializada en identidad visual, creación de contenido y producción creativa con inteligencia artificial. Trabaja desde el concepto creativo hasta su ejecución.",
    image: `${DOMINIO}/lara-summers-directora-arte.webp`,
    affiliation: REF_EMPRESA,
    knowsAbout: ["Dirección de arte", "Identidad visual", "Creación de contenido", "Imágenes con inteligencia artificial"],
  };

  // María, fundadora (mismo @id que en /nosotros/; la empresa la enlaza con "founder")
  const schemaMaria = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ID_FUNDADORA,
    name: "María Nadal",
    jobTitle: "Fundadora de MN Design Web",
    image: `${DOMINIO}/maria-nadal-mn-design-web-800.webp`,
    worksFor: { "@id": ID_EMPRESA },
  };

  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": ID_SERVICIO,
    name: "Branding e identidad de marca",
    serviceType: "Branding e identidad visual",
    description:
      "Identidad de marca y diseño visual, imágenes y fotografía con inteligencia artificial, vídeo y campañas creativas, dirección visual para redes sociales y dirección de arte para páginas web. Proyecto cerrado, servicio puntual o colaboración mensual.",
    image: `${DOMINIO}/og-mndesignweb.jpg`,
    url: `${DOMINIO}${RUTA}`,
    provider: REF_EMPRESA,
    areaServed: AREA_SERVIDA,
    hasOfferCatalog: catalogo("Servicios creativos", SERVICIOS),
  };

  // Service no admite "contributor" en schema.org: Lara se enlaza como colaboradora desde la
  // WebPage (CreativeWork), que sí lo admite.
  const schemaPagina = schemaWebPage({
    ruta: RUTA,
    titulo: TITULO,
    descripcion: DESCRIPCION,
    extra: { about: { "@id": ID_SERVICIO }, contributor: { "@id": ID_LARA } },
  });

  const schema = [
    EMPRESA,
    WEBSITE,
    schemaPagina,
    schemaBreadcrumb(RUTA, "Branding e identidad de marca"),
    schemaService,
    schemaLara,
    schemaMaria,
    // Mismas preguntas que se ven en la página (el build falla si no coinciden)
    schemaFaq(PREGUNTAS_BRANDING),
  ];

  return (
    <>
      <Seo ruta={RUTA} titulo={TITULO} descripcion={DESCRIPCION} />

      <div className="creativos-pagina">
        <HeroBranding />
        <CintaServicios />
        <ProblemaBranding />
        <ServiciosBranding />
        <EntregablesBranding />
        <EquipoBranding />
        <FormasBranding />
        <CronologiaPasos etiqueta="Cómo trabajamos" titulo={TITULO_PASOS} pasos={PASOS_CREATIVOS} />
        <TrabajosBranding />
        <RedesDoble
          preguntas={PREGUNTAS_BRANDING}
          formulario={{ opciones: OPCIONES_FORMULARIO, pagina: "Branding", formulario: "branding" }}
        />
        <CtaCreativos
          texto="Prepararemos una propuesta personalizada."
          imagenALaDerecha
          imagen={{
            descripcion: "Imagen de cierre: detalle de un trabajo de marca o de una sesión creativa",
            medidas: "1000 × 640 px (se muestra a 500 × 320)",
          }}
        />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </div>
    </>
  );
};

export default Branding;
