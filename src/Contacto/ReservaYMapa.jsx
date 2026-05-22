import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import './ReservaYMapa.css';
import { Player } from '@lottiefiles/react-lottie-player';
import animacionReserva from '../assets/animations/reserva-movil.json';

const customIcon = new L.DivIcon({
  className: 'custom-neon-marker',
  html: `<div class="marker-pulse"></div><div class="marker-core"></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

const ReservaYMapa = () => {
  const posicion = [38.73891339445123, -0.440249004021603]; 

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
                <iframe 
                    src="https://cal.com/mndesignweb/reserva-de-30-min" 
                    title="Reserva de citas"
                    frameBorder="0" 
                    scrolling="no"
                    className="calendar-iframe"
                />
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
            <div className="map-container-styled">
                <MapContainer 
                    center={posicion} 
                    zoom={13} 
                    scrollWheelZoom={false}
                    className="leaflet-map-actual"
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                
                {/* Marcador personalizado con luz de neón */}
                    <Marker position={posicion} icon={customIcon}>
                        <Popup className="custom-map-popup">
                            <div className="popup-content">
                                <h4>MN Design Web</h4>
                                <div className="popup-cita">
                                    <span>¡Creamos desde aquí para todo el mundo! Reserva tu cita</span>
                                    <img src="/cohete1.svg" alt="Reserva" className="popup-icono-svg" />
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ReservaYMapa;