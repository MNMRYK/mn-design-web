import React, { useRef, lazy, Suspense } from "react";
import './ContactoDoble.css'; 
import { motion, useInView } from 'framer-motion';

// 🔥 1. LAZY LOADING INTERNO: Sacamos estos componentes del archivo principal
const FormularioContacto = lazy(() => import('./FormularioContacto'));
const RutaTrabajo = lazy(() => import('./RutaTrabajo'));

const ContactoDoble = () => {
  // 🔥 2. EL SENSOR: Detecta si la sección está a punto de aparecer en pantalla
  const sectionRef = useRef(null);
  // El margin "400px" significa: "empieza a descargar el código cuando el usuario esté a 400px de llegar"
  const isInView = useInView(sectionRef, { once: true, margin: "400px" });

  return (
    <motion.section 
      ref={sectionRef} // Conectamos el sensor aquí
      className="contacto-section-wrapper"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="contacto-grid">
        
        {/* 🔥 3. RENDERIZADO CONDICIONAL: Solo existen si el sensor se activa */}
        {isInView ? (
          <Suspense fallback={
            // Un pequeño esqueleto de carga para que no se vea feo si el internet va lento
            <div style={{ width: '100%', minHeight: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--deep-violet)' }}>
              Cargando sección...
            </div>
          }>
            {/* Mitad izquierda */}
            <FormularioContacto />
            
            {/* Mitad derecha */}
            <RutaTrabajo />
          </Suspense>
        ) : (
          // 👻 CAJA FANTASMA: Mantiene la altura de la web para que el scroll no dé saltos raros
          <div style={{ width: '100%', minHeight: '600px' }}></div>
        )}
        
      </div>
    </motion.section>
  );
};

export default ContactoDoble;