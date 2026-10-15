// Conversión de los formularios: generate_lead en GA4 (importada después en Google Ads) y Lead
// en el Píxel de Meta. window.enviarEvento y window.enviarMeta están en index.html y solo envían
// si el usuario ha aceptado las cookies (Meta, solo con Marketing).
export const registrarLead = (formulario) => {
  if (typeof window === "undefined") return;
  if (window.enviarEvento) window.enviarEvento("generate_lead", { formulario });
  if (window.enviarMeta) window.enviarMeta("Lead");
};
