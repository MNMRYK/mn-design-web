// Enlace "Configurar cookies" del footer: vuelve a mostrar el banner (src/Legales/CookieBanner.jsx)
// para que el usuario pueda cambiar o retirar su consentimiento.
export const EVENTO_CONFIGURAR_COOKIES = "configurar-cookies";

export const abrirConfiguracionCookies = (evento) => {
  evento?.preventDefault();
  window.dispatchEvent(new Event(EVENTO_CONFIGURAR_COOKIES));
};
