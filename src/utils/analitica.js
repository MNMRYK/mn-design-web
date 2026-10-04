// Conversiones para GA4 (importadas después en Google Ads).
// window.enviarEvento está en index.html y solo envía si el usuario ha aceptado las cookies.
export const registrarLead = (formulario) => {
  if (typeof window !== "undefined" && window.enviarEvento) {
    window.enviarEvento("generate_lead", { formulario });
  }
};
