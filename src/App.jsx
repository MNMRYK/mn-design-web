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
const Portfolio = lazy(() => import('./Portfolio.jsx'));
const PoliticaPrivacidad = lazy(() => import('./Legales/PoliticaPrivacidad.jsx'));
const AvisoLegal = lazy(() => import('./Legales/AvisoLegal.jsx'));
const PoliticaCookies = lazy(() => import('./Legales/PoliticaCookies.jsx')); 
const NotFound = lazy(() => import('./NotFound'));

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

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <main>
          {/* El Navbar siempre visible arriba */}
          <Navbar />
          
          {/* 🔥 2. EL FILTRO SUSPENSE: Envuelve a tus rutas */}
          <Suspense fallback={<PantallaCarga />}>
            {/* ESTE ES EL SEMÁFORO QUE CAMBIA LA PÁGINA */}
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/disenoweb" element={<DisenoWeb />} />
              <Route path="/e-commerce" element={<Ecommerce />} />
              <Route path="/posicionamiento-seo" element={<PosicionamientoSeo />} />
              <Route path="/redes-sociales" element={<RedesSociales />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/privacidad" element={<PoliticaPrivacidad />} />
              <Route path="/aviso-legal" element={<AvisoLegal />} />
              <Route path="/cookies" element={<PoliticaCookies />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          {/* El Footer siempre visible abajo */}
          <Footer />

          {/* 🔥 2. TU NUEVA BURBUJA DE TYPEBOT (Reemplaza o acompaña al botón anterior) */}
          <Bubble
            typebot="my-typebot-7uabkh3"
            apiHost="https://typebot.io"
            theme={{
              button: { 
                backgroundColor: "#7E57C2", 
                size: "70px",
                customIconSrc:
                  "https://s3.typebotstorage.com/public/workspaces/cmpi7hetl000004jyy4lsgk3s/typebots/cmpi7ktu600000bi0i7uabkh3/bubble-icon?v=1779549222783",
              },
              chatWindow: {
                maxHeight: "600px" // Frena la altura para que no ocupe toda la web
              },
              previewMessage: {
                backgroundColor: "#fcfcff", // Corregido el doble ##
                textColor: "#1A102D",
                closeButtonBackgroundColor: "#efebfc",
                closeButtonIconColor: "#1A102D",
              },
            }}
            previewMessage={{
              message: "¡Hola! ¿En qué puedo ayudarte? 🚀",
              avatarUrl: "https://s3.typebotstorage.com/public/workspaces/cmpi7hetl000004jyy4lsgk3s/typebots/cmpi7ktu600000bi0i7uabkh3/hostAvatar?v=1779545605843",
              autoShowDelay: 3000, // Espera 3 segundos antes de asomarse
            }}
          />
        </main>

        <CookieBanner />

        {/* CONTENEDOR DE ALERTAS */}
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