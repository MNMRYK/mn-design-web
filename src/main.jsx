import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.jsx';

const rootElement = document.getElementById('root');

// Guardamos la estructura de tu app en una variable para no repetir código
const appComponent = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

// Aquí viene la magia:
if (rootElement.hasChildNodes()) {
  // Si hay HTML pre-renderizado (es decir, en el servidor para Google), hidratamos:
  hydrateRoot(rootElement, appComponent);
} else {
  // Si el div está vacío (por ejemplo, cuando desarrollas en local con npm run dev), renderizamos normal:
  const root = createRoot(rootElement);
  root.render(appComponent);
}