// FAQPage del schema a partir del MISMO array que pinta las preguntas visibles
// (p. ej. src/DisenoWeb/preguntasDiseno.js). Nunca escribas las preguntas del schema a mano:
// scripts/prerender.mjs hace fallar el build si alguna pregunta o respuesta del FAQPage
// no está en la página.
//
// Cada pregunta: { pregunta: "…", respuesta: ["párrafo con <strong>HTML</strong>", …] }

const aTexto = (html) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

export function schemaFaq(preguntas) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: preguntas.map(({ pregunta, respuesta }) => ({
      "@type": "Question",
      name: pregunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: [].concat(respuesta).map(aTexto).join(" "),
      },
    })),
  };
}
