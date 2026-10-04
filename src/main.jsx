import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.jsx';
import { precargarPagina } from './paginas';

const rootElement = document.getElementById('root');

const appComponent = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

// Siempre createRoot (nunca hydrateRoot): GSAP y las animaciones modifican el DOM,
// así que el HTML prerenderizado no coincide con el primer render y la hidratación fallaría.
// createRoot sustituye el HTML prerenderizado por la app real.
//
// Antes de montar, descargamos el código de la página actual: así React pasa directamente
// del HTML prerenderizado a la página, sin mostrar la pantalla de "Cargando experiencia...".
precargarPagina(window.location.pathname)
  .catch(() => {
    // Si falla la descarga, <Suspense> la reintentará al renderizar
  })
  .finally(() => {
    // Las etiquetas SEO del HTML prerenderizado se quitan: <Seo> las vuelve a crear
    // en el mismo render (si no, quedarían duplicadas en el <head>)
    document.head.querySelectorAll("[data-prerender]").forEach((el) => el.remove());
    createRoot(rootElement).render(appComponent);
  });
