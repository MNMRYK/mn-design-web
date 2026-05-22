import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { Toaster } from 'react-hot-toast';

// Importamos el esqueleto global
import Navbar from './Inicio/Navbar';
import Footer from './Inicio/Footer';

// Importamos tus "Páginas" enteras
import Inicio from './Inicio.jsx'; 
import Nosotros from './Nosotros.jsx'; 
import Contacto from './Contacto.jsx';
import DisenoWeb from './DisenoWeb.jsx';
import Ecommerce from './Ecommerce.jsx';
import PosicionamientoSeo from './PosicionamientoSeo.jsx';
import RedesSociales from './RedesSociales.jsx';
import PoliticaPrivacidad from './Legales/PoliticaPrivacidad.jsx';
import AvisoLegal from './Legales/AvisoLegal.jsx';
import PoliticaCookies from './Legales/PoliticaCookies.jsx'; 
import CookieBanner from './Legales/CookieBanner';
import NotFound from './NotFound';

// Importamos los CSS globales
import "./App.css";
import "./Inicio/Navbar.css";

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <main>
          {/* El Navbar siempre visible arriba */}
          <Navbar />
          
          {/* 🔥 ESTE ES EL SEMÁFORO QUE CAMBIA LA PÁGINA 🔥 */}
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/disenoweb" element={<DisenoWeb />} />
            <Route path="/e-commerce" element={<Ecommerce />} />
            <Route path="/posicionamiento-seo" element={<PosicionamientoSeo />} />
            <Route path="/redes-sociales" element={<RedesSociales />} />
            <Route path="/privacidad" element={<PoliticaPrivacidad />} />
            <Route path="/aviso-legal" element={<AvisoLegal />} />
            <Route path="/cookies" element={<PoliticaCookies />} />
            <Route path="*" element={<NotFound />} />

          </Routes>

          {/* El Footer siempre visible abajo */}
          <Footer />

          {/* El botón de WhatsApp siempre flotando en todas las páginas */}
          <a 
            href="https://api.whatsapp.com/send?phone=34645854934&text=Hola" 
            className="whatsapp-float" 
            target="_blank" 
            rel="noreferrer"
          >
            <i className="fa-brands fa-whatsapp"></i>
          </a>
        </main>

        <CookieBanner />

        {/* 🔥 2. PLANTAMOS EL CONTENEDOR DE ALERTAS 🔥 */}
        <Toaster 
          position="bottom-right" 
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: 'Nunito, sans-serif', // Tu fuente corporativa
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;