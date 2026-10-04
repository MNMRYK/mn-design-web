import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { Toaster } from 'react-hot-toast';
import { MotionConfig } from 'framer-motion';
import { Bubble } from "@typebot.io/react";

// 📦 COMPONENTES GLOBALES (NO se hacen lazy porque se ven en TODAS las páginas)
import Navbar from './Inicio/Navbar';
import Footer from './Inicio/Footer';
import CookieBanner from './Legales/CookieBanner';
import { esPrerender } from './utils/prerender';
import ErrorBoundary from './utils/ErrorBoundary';

// 🚀 IMPORTS DINÁMICOS (LA DIETA): cada página se descarga solo cuando hace falta.
// main.jsx precarga la de la URL actual antes de montar React (ver src/paginas.js).
import {
  Inicio,
  Nosotros,
  Contacto,
  DisenoWeb,
  Ecommerce,
  PosicionamientoSeo,
  RedesSociales,
  Demos,
  PoliticaPrivacidad,
  AvisoLegal,
  PoliticaCookies,
  NotFound,
  LandingLayout,
} from './paginas';

// Importamos los CSS globales
import "./App.css";
import "./Inicio/Navbar.css";

// Un pequeño componente de carga para cuando saltas de una página a otra
const PantallaCarga = () => (
  <div style={{
    height: '100vh', 
    backgroundColor: 'var(--deep-eggplant, #1a102d)', // Tu color de fondo
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    color: '#ece8ff',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  }}>
    Cargando experiencia...
  </div>
);

// Si una página falla al renderizar (o no se puede descargar su código tras publicar una
// versión nueva), aviso con opción de recargar en vez de dejar la pantalla en blanco
const PantallaError = () => (
  <div style={{
    minHeight: '100vh',
    backgroundColor: 'var(--deep-eggplant, #1a102d)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.2rem',
    padding: '0 24px',
    textAlign: 'center',
    color: '#ece8ff',
    fontFamily: 'Montserrat, sans-serif'
  }}>
    <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>Algo no ha cargado bien.</p>
    <button
      type="button"
      onClick={() => window.location.reload()}
      style={{
        background: '#7E57C2', color: '#fff', border: 'none', borderRadius: '20px',
        padding: '10px 24px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer'
      }}
    >
      Recargar la página
    </button>
  </div>
);

// Se reinicia al cambiar de página: un fallo en una no deja bloqueadas las demás
const ProteccionPorRuta = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <ErrorBoundary key={pathname} nombre="App" fallback={<PantallaError />}>
      {children}
    </ErrorBoundary>
  );
};

// Layout profesional para las páginas que SI llevan Navbar y Footer
const MainLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <Router>
      {/* Con "reducir movimiento" activado, framer-motion quita desplazamientos y escalados
          y deja solo los fundidos de opacidad */}
      <MotionConfig reducedMotion="user">
      <div className="app-wrapper">
        <main>
          
          {/* 🔥 2. EL FILTRO SUSPENSE: Envuelve a tus rutas */}
          <ProteccionPorRuta>
          <Suspense fallback={<PantallaCarga />}>
            {/* ESTE ES EL SEMÁFORO QUE CAMBIA LA PÁGINA */}
            <Routes>
              {/* Páginas con Layout (Navbar + Footer) */}
              <Route path="/" element={<MainLayout><Inicio /></MainLayout>} />
              <Route path="/nosotros" element={<MainLayout><Nosotros /></MainLayout>} />
              <Route path="/contacto" element={<MainLayout><Contacto /></MainLayout>} />
              <Route path="/disenoweb" element={<MainLayout><DisenoWeb /></MainLayout>} />
              <Route path="/e-commerce" element={<MainLayout><Ecommerce /></MainLayout>} />
              <Route path="/posicionamiento-seo" element={<MainLayout><PosicionamientoSeo /></MainLayout>} />
              <Route path="/redes-sociales" element={<MainLayout><RedesSociales /></MainLayout>} />
              <Route path="/demos" element={<MainLayout><Demos /></MainLayout>} />
              <Route path="/privacidad" element={<MainLayout><PoliticaPrivacidad /></MainLayout>} />
              <Route path="/aviso-legal" element={<MainLayout><AvisoLegal /></MainLayout>} />
              <Route path="/cookies" element={<MainLayout><PoliticaCookies /></MainLayout>} />

              {/* TU LANDING (SOLA, SIN NAVBAR NI FOOTER) */}
              <Route path="/rescate-kit-digital" element={<LandingLayout />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          </ProteccionPorRuta>

          {/* El chat de Typebot no se pinta durante el prerender: así su script no queda en el HTML estático */}
          {!esPrerender && (
          <div data-lenis-prevent="true" style={{ overscrollBehavior: 'contain' }}>
            <Bubble
              typebot="my-typebot-7uabkh3"
              apiHost="https://typebot.io"
              theme={{
                button: { 
                  backgroundColor: "#7E57C2", 
                  size: "60px",
                  customIconSrc:
                    "https://s3.typebotstorage.com/public/workspaces/cmpi7hetl000004jyy4lsgk3s/typebots/cmpi7ktu600000bi0i7uabkh3/bubble-icon?v=1779549222783",
                },
                previewMessage: {
                  backgroundColor: "#fcfcff", // Corregido el doble ##
                  textColor: "#1A102D",
                  closeButtonBackgroundColor: "#efebfc",
                  closeButtonIconColor: "#1A102D",
                },
                customCss: `
                  /* Para navegadores Chrome, Edge y Safari */
                  .typebot-container .scrollable-container::-webkit-scrollbar {
                    display: block !important;
                    width: 8px !important;
                  }
                  .typebot-container .scrollable-container::-webkit-scrollbar-track {
                    background-color: #fcfcff !important;
                  }
                  .typebot-container .scrollable-container::-webkit-scrollbar-thumb {
                    background-color: #7E57C2 !important;
                    border-radius: 8px !important;
                  }
                  
                  /* Para navegadores Firefox (que usan otro motor) */
                  .typebot-container .scrollable-container {
                    scrollbar-width: thin !important;
                    scrollbar-color: #7E57C2 #fcfcff !important;
                  }
                `
              }}
              previewMessage={{
                message: "¡Hola! ¿En qué puedo ayudarte?",
                avatarUrl: "https://s3.typebotstorage.com/public/workspaces/cmpi7hetl000004jyy4lsgk3s/typebots/cmpi7ktu600000bi0i7uabkh3/hostAvatar?v=1779545605843",
                autoShowDelay: 3000, // Espera 3 segundos antes de asomarse
              }}
            />
          </div>
          )}
        </main>

        {!esPrerender && <CookieBanner />}


        <Toaster 
          position="bottom-right" 
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: 'Nunito, sans-serif',
            },
          }}
        />
      </div>
      </MotionConfig>
    </Router>
  );
}

export default App;