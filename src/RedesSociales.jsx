import React, { useEffect } from "react";
import Seo from "./seo/Seo";

import { HeroRedes, ContenidoRedes } from "./RedesSociales/DireccionVisualRedes.jsx";
import CronologiaPasos from "./Creativos/CronologiaPasos.jsx";
import RedesDoble from "./RedesSociales/RedesDoble.jsx";
import CtaCreativos from "./Creativos/CtaCreativos.jsx";
import { PASOS_CREATIVOS, TITULO_PASOS } from "./Creativos/pasos";
import { EMPRESA, REF_EMPRESA, AREA_SERVIDA } from "./seo/negocio";
import { DOMINIO } from "./seo/rutas";
import { WEBSITE, schemaBreadcrumb, schemaWebPage, catalogo } from "./seo/paginaServicio";
import { schemaFaq } from "./seo/faq";
import { PREGUNTAS_REDES } from "./RedesSociales/preguntasRedes";
import { crearLenis } from "./utils/lenis";

const RUTA = "/redes-sociales/";
const TITULO = "Contenido para redes sociales | MN Design Web";
const DESCRIPCION =
  "Dirección visual y contenido para redes sociales: línea visual propia, plantillas, planificación y producción de imágenes y vídeos, también con IA.";
const ID_SERVICIO = `${DOMINIO}${RUTA}#servicio`;

// /redes-sociales/: dirección visual y contenido para redes sociales (diseño de Figma
// "Dirección visual para redes" + contenido ampliado). Sustituye a la antigua gestión de redes.
const RedesSociales = () => {
  useEffect(() => {
    const lenis = crearLenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: true,
      anchors: true, // "Pedir propuesta" y "Qué incluye" bajan con el mismo scroll suave
      prevent: (node) => {
        if (!node || !node.closest) return false;
        return node.nodeName.includes("TYPEBOT") || node.closest("typebot-bubble") !== null;
      },
    });
    return () => lenis.destroy();
  }, []);

  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": ID_SERVICIO,
    name: "Dirección visual y contenido para redes sociales",
    serviceType: "Creación de contenido para redes sociales",
    description:
      "Diagnóstico visual, línea visual propia, plantillas, guía de estilo, planificación editorial y producción de publicaciones, imágenes y vídeos, también con inteligencia artificial. Servicio puntual o colaboración mensual.",
    image: `${DOMINIO}/og-mndesignweb.jpg`,
    url: `${DOMINIO}${RUTA}`,
    provider: REF_EMPRESA,
    areaServed: AREA_SERVIDA,
    hasOfferCatalog: catalogo("Contenido para redes sociales", [
      "Dirección de arte para redes sociales",
      "Creación de contenido gráfico y audiovisual",
      "Desarrollo de conceptos creativos",
      "Contenido editorial generado con IA",
      "Estrategia visual y planificación de contenidos",
      "Diseño de campañas y piezas digitales",
    ]),
  };

  const schema = [
    EMPRESA,
    WEBSITE,
    schemaWebPage({ ruta: RUTA, titulo: TITULO, descripcion: DESCRIPCION, extra: { about: { "@id": ID_SERVICIO } } }),
    schemaBreadcrumb(RUTA, "Redes sociales"),
    schemaService,
    // Mismas preguntas que se ven en la página (el build falla si no coinciden)
    schemaFaq(PREGUNTAS_REDES),
  ];

  return (
    <>
      <Seo ruta={RUTA} titulo={TITULO} descripcion={DESCRIPCION} />

      <div className="social-page-wrapper creativos-pagina">
        <HeroRedes />
        <ContenidoRedes />
        <CronologiaPasos etiqueta="Paso a paso" titulo={TITULO_PASOS} pasos={PASOS_CREATIVOS} />
        <RedesDoble />
        <CtaCreativos
          texto="Prepararemos una propuesta personalizada para tus redes."
          imagen={{
            descripcion: "Imagen de cierre: mosaico de piezas de redes de un trabajo real",
            medidas: "1000 × 640 px (se muestra a 500 × 320)",
          }}
        />

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </div>
    </>
  );
};

export default RedesSociales;
