import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './ReservaYMapa.css';
import { Player } from '@lottiefiles/react-lottie-player';
import animacionReserva from '../assets/animations/reserva-movil.json';
import CalendarioCal from "../utils/CalendarioCal";

// Leaflet (y su CSS) solo se descarga cuando el mapa está a punto de verse
const MapaContacto = lazy(() => import('./MapaContacto'));

const ReservaYMapa = () => {
    const mapaRef = useRef(null);
    // Sin IntersectionObserver (navegadores muy antiguos) el mapa se carga directamente
    const [mostrarMapa, setMostrarMapa] = useState(() => !('IntersectionObserver' in window));

    useEffect(() => {
        const contenedor = mapaRef.current;
        if (!contenedor || mostrarMapa) return;
        const observador = new IntersectionObserver(
            (entradas) => {
                if (entradas.some((e) => e.isIntersecting)) {
                    setMostrarMapa(true);
                    observador.disconnect();
                }
            },
            { rootMargin: '400px 0px' }
        );
        observador.observe(contenedor);
        return () => observador.disconnect();
    }, [mostrarMapa]);

    useEffect(() => {
        const hash = window.location.hash;
        if (hash === '#calendario-reserva') { // Asegúrate de que esto coincida con el ID del div
            const element = document.getElementById('calendario-reserva');
            if (element) {
                // Aumentamos el tiempo de espera y usamos scrollIntoView con margen
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 800); // 800ms da tiempo a que el iframe y el mapa carguen
            }
        }
    }, []);

    const [esMovil, setEsMovil] = useState(window.innerWidth <= 1024);

    useEffect(() => {
        const comprobarResolucion = () => {
            setEsMovil(window.innerWidth <= 1024);
        };
        window.addEventListener('resize', comprobarResolucion);
        return () => window.removeEventListener('resize', comprobarResolucion);
    }, []);

  return (
    <section className="reserva-mapa-section tema-oscuro">
        <div className="reserva-mapa-container">
            
            {/* 🗓️ COLUMNA IZQUIERDA: EL CALENDARIO DE RESERVAS */}
            <motion.div 
                id="calendario-reserva"
                className="booking-wrapper"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {/* 🔥 INICIO DE LA CAJA GRID (LA FILA) 🔥 */}
                <div className="booking-header-row">
                    
                    {/* CAJA 1: LOS TEXTOS (Va a la izquierda) */}
                    <div className="booking-header-texts">
                        <span className="booking-subtitle">¿Hablamos?</span>
                        <h2 className="booking-title">Reserva tu Consultoría</h2>
                        <p className="booking-text">
                            Elige el día y la hora que mejor te vengan para analizar tu proyecto cara a cara.
                        </p>
                    </div>
                </div>

            {/* CONTENEDOR DEL WIDGET  */}
            <div className="calendar-embed-container">
                <CalendarioCal calLink="mndesignweb/reunion-30-min" nombre="contacto" className="calendar-cal" />
            </div>
        </motion.div>

        {/* 🗺️ COLUMNA DERECHA: EL MAPA INTERACTIVO CHULO */}
        <motion.div 
          className="map-wrapper"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
            <div className="lottie-encima-mapa">
                <Player
                autoplay
                loop
                src={animacionReserva}
                className="lottie-reserva"
                />
            </div>
            {/* La caja tiene altura fija en el CSS: el mapa aparece sin mover la página */}
            <div className="map-container-styled" ref={mapaRef}>
                {mostrarMapa && (
                    <Suspense fallback={null}>
                        <MapaContacto />
                    </Suspense>
                )}
            </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ReservaYMapa;