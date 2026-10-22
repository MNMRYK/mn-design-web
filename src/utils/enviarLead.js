// Envío de los formularios de la web: solo Web3Forms (llega por email a info@mndesignweb.es).
// Desde el 22/10/2026 ya no se envía nada a Make.
const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const WEB3FORMS_KEY = "1bc2d285-71cb-4fe3-806f-530066ab6e15";

// Asunto común a todos los formularios: "Nuevo lead desde [página]: …"
export const asuntoLead = (pagina, detalle) => `Nuevo lead desde ${pagina}: ${detalle}`;

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
  return resultado;
}
