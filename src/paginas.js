// Páginas de la app, cargadas bajo demanda (cada una en su propio chunk).
import { paginaDiferida } from "./utils/paginaDiferida.jsx";

export const Inicio = paginaDiferida(() => import("./Inicio.jsx"));
export const Nosotros = paginaDiferida(() => import("./Nosotros.jsx"));
export const Contacto = paginaDiferida(() => import("./Contacto.jsx"));
export const DisenoWeb = paginaDiferida(() => import("./DisenoWeb.jsx"));
export const Ecommerce = paginaDiferida(() => import("./Ecommerce.jsx"));
export const PosicionamientoSeo = paginaDiferida(() => import("./PosicionamientoSeo.jsx"));
export const RedesSociales = paginaDiferida(() => import("./RedesSociales.jsx"));
export const Demos = paginaDiferida(() => import("./Demos.jsx"));
export const PoliticaPrivacidad = paginaDiferida(() => import("./Legales/PoliticaPrivacidad.jsx"));
export const AvisoLegal = paginaDiferida(() => import("./Legales/AvisoLegal.jsx"));
export const PoliticaCookies = paginaDiferida(() => import("./Legales/PoliticaCookies.jsx"));
export const LandingLayout = paginaDiferida(() => import("./LandingLayout.jsx"));
export const NotFound = paginaDiferida(() => import("./NotFound.jsx"));

const PAGINAS_POR_RUTA = {
  "/": Inicio,
  "/nosotros": Nosotros,
  "/contacto": Contacto,
  "/disenoweb": DisenoWeb,
  "/e-commerce": Ecommerce,
  "/posicionamiento-seo": PosicionamientoSeo,
  "/redes-sociales": RedesSociales,
  "/demos": Demos,
  "/privacidad": PoliticaPrivacidad,
  "/aviso-legal": AvisoLegal,
  "/cookies": PoliticaCookies,
  "/rescate-kit-digital": LandingLayout,
};

// Descarga el código de la página que corresponde a una URL (o de la 404).
// React Router no distingue mayúsculas ni barra final, así que aquí tampoco.
export function precargarPagina(pathname) {
  const ruta = pathname.toLowerCase().replace(/\/+$/, "") || "/";
  const pagina = PAGINAS_POR_RUTA[ruta] ?? NotFound;
  return pagina.precargar();
}
