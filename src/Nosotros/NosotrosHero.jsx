import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './NosotrosHero.css';

/* 🔥 ESTA ES LA LÍNEA QUE TE FALTA PARA QUE REACT SEPA QUÉ ES UN <Link> 🔥 */
import { Link } from 'react-router-dom';

const tabsData = [
  { id: 'huella', title: 'Huella Digital', content: 'Creemos que toda empresa merece una presencia online profesional sin arruinarse. Hacemos el diseño web accesible.' },
  { id: 'resultados', title: 'Resultados', content: 'No hacemos webs bonitas que nadie visita. Nos enfocamos en maximizar tu visibilidad y tus ventas desde el día uno.' },
  { id: 'energia', title: 'Energía Joven', content: 'Combinamos 5 años de experiencia con la frescura y la innovación que el mercado actual exige.' }
];

const NosotrosHero = () => {
  const [activeTab, setActiveTab] = useState(tabsData[0].id);

  return (
    <section className="nosotros-hero-section">
      <div className="nosotros-hero-container">
        
        {/* COLUMNA IZQUIERDA: Textos y Tabs */}
        <motion.div 
          className="nosotros-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
            <div className="nosotros-badge">
                <Link to="/" className="breadcrumb-link">INICIO</Link>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">NOSOTROS</span>
            </div>

          <h2>Llevamos tu negocio al <br/><span className="text-gradient">siguiente nivel</span></h2>
          
          <p className="nosotros-desc">
            Somos una agencia joven con +5 años de experiencia transformando ideas en realidades digitales. Nacimos con una misión clara: <strong>ayudar a autónomos y empresas que están empezando</strong> a dar el salto al mundo online de forma profesional.
          </p>
          <p className="nosotros-desc">
            Nos especializamos en <strong>maximizar tu visibilidad y facturación mediante estrategias de marketing digital</strong> diseñadas para ser rentables desde el primer día. Conseguimos que tu negocio <strong>crezca en visitas y ventas</strong> con una inversión honesta y adaptada a tu realidad.
          </p>

          {/* LOS BOTONES MODERNOS */}
          <div className="nosotros-tabs-container">
            <div className="tabs-buttons">
              {tabsData.map((tab) => (
                <button 
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* EL CONTENIDO QUE CAMBIA SUAVEMENTE */}
            <div className="tab-content-area">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {tabsData.find(t => t.id === activeTab).content}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* COLUMNA DERECHA: Imagen/Gráfico */}
        <motion.div 
          className="nosotros-image-wrapper"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Aquí iría vuestra foto de equipo o un gráfico abstracto chulo */}
          <div className="image-placeholder">
            <div className="glass-shape glass-1"></div>
            <div className="glass-shape glass-2"></div>
            <span>[Aquí vuestra foto real o gráfico abstracto]</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default NosotrosHero;