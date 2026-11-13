// Envío de los formularios de la web: Web3Forms (llega por email a info@mndesignweb.es) y, además,
// una copia al portal de clientes, que crea el lead en Directus.
// Desde el 22/10/2026 ya no se envía nada a Make.
// Las landings (../Landings-mndesignweb) tienen la misma copia en src/components/PortalLeads.astro.
const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = "1bc2d285-71cb-4fe3-806f-530066ab6e15";
const PORTAL_LEADS_URL = "https://clientes.mndesignweb.es/api/leads/web";

// Asunto común a todos los formularios: "Nuevo lead desde [página]: …"
export const asuntoLead = (pagina, detalle) => `Nuevo lead desde ${pagina}: ${detalle}`;

// Copia del lead en el portal. Nunca hace fallar el envío. Sin la clave de Web3Forms.
export function copiarAlPortal(datos) {
  try {
    const control = new AbortController();
    const espera = setTimeout(() => control.abort(), 8000);
    fetch(PORTAL_LEADS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(datos),
      keepalive: true,
      signal: control.signal,
    })
      .catch(() => {})
      .finally(() => clearTimeout(espera));
  } catch {
    // nada: el lead ya está en el email
  }
}

// Envía los datos y devuelve la respuesta de Web3Forms. Lanza un error si el envío falla,
// para que toast.promise muestre el aviso de error (y no se registre la conversión).
export async function enviarLead(datos) {
  const respuesta = await fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: WEB3FORMS_KEY, ...datos }),
  });
  const resultado = await respuesta.json();
  if (!resultado.success) throw new Error(resultado.message || "Web3Forms no ha aceptado el envío");
  // El portal reconoce name/nombre, no from_name (el campo de nombre de Web3Forms)
  copiarAlPortal({ nombre: datos.from_name, ...datos }); // sin await: no retrasa el aviso de «enviado»
  return resultado;
}
