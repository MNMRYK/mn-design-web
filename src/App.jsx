import React, { lazy, Suspense } from "react"; // 🔥 1. Importamos lazy y Suspense
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { Toaster } from 'react-hot-toast';
import { Bubble } from "@typebot.io/react";

// 📦 COMPONENTES GLOBALES (NO se hacen lazy porque se ven en TODAS las páginas)
import Navbar from './Inicio/Navbar';
import Footer from './Inicio/Footer';
import CookieBanner from './Legales/CookieBanner';

// 🚀 IMPORTS DINÁMICOS (LA DIETA): Solo se descargan cuando el usuario hace clic
const Inicio = lazy(() => import('./Inicio.jsx')); 
const Nosotros = lazy(() => import('./Nosotros.jsx')); 
const Contacto = lazy(() => import('./Contacto.jsx'));
const DisenoWeb = lazy(() => import('./DisenoWeb.jsx'));
const Ecommerce = lazy(() => import('./Ecommerce.jsx'));
const PosicionamientoSeo = lazy(() => import('./PosicionamientoSeo.jsx'));
const RedesSociales = lazy(() => import('./RedesSociales.jsx'));
const Demos = lazy(() => import('./Demos.jsx'));
const PoliticaPrivacidad = lazy(() => import('./Legales/PoliticaPrivacidad.jsx'));
const AvisoLegal = lazy(() => import('./Legales/AvisoLegal.jsx'));
const PoliticaCookies = lazy(() => import('./Legales/PoliticaCookies.jsx')); 
const NotFound = lazy(() => import('./NotFound'));
const LandingLayout = lazy(() => import('./LandingLayout'));

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
      <div className="app-wrapper">
        <main>
          
          {/* 🔥 2. EL FILTRO SUSPENSE: Envuelve a tus rutas */}
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
        </main>

        <CookieBanner />


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
    </Router>
  );
}

export default App;