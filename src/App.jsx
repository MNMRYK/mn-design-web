import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importamos el esqueleto global
import Navbar from './Inicio/Navbar';
import Footer from './Inicio/Footer';

// Importamos tus "Páginas" enteras
import Inicio from './Inicio.jsx'; // <-- El archivo que acabamos de crear en el PASO 1
import NosotrosHero from './Nosotros/NosotrosSiguiente.jsx';
import Nosotros from './Nosotros.jsx'; // <-- Aquí cargas tu página de Nosotros

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
      </div>
    </Router>
  );
}

export default App;