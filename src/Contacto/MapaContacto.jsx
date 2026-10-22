// Mapa de /contacto/ (Leaflet + teselas "Positron" de CARTO). ReservaYMapa.jsx lo carga
// solo cuando el usuario se acerca a la sección: así Leaflet y su CSS van en un chunk aparte.
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Clave en .env (VITE_CARTO_KEY), restringida al dominio mndesignweb.es: en localhost no carga
const CARTO_KEY = import.meta.env.VITE_CARTO_KEY;
const URL_TESELAS = `https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png?key=${CARTO_KEY}`;
// Obligatoria según las condiciones de CARTO y OpenStreetMap
const ATRIBUCION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

if (import.meta.env.DEV && !CARTO_KEY) {
  console.warn('<MapaContacto>: falta VITE_CARTO_KEY en .env');
}

const POSICION = [38.73891339445123, -0.440249004021603];

const customIcon = new L.DivIcon({
  className: 'custom-neon-marker',
  html: `<div class="marker-pulse"></div><div class="marker-core"></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

const MapaContacto = () => (
  <MapContainer
    center={POSICION}
    zoom={13}
    scrollWheelZoom={false}
    className="leaflet-map-actual"
  >
    <TileLayer url={URL_TESELAS} attribution={ATRIBUCION} />

    {/* Marcador personalizado con luz de neón */}
    {/* title: nombre accesible del marcador (Leaflet lo hace pulsable) */}
    <Marker position={POSICION} icon={customIcon} title="MN Design Web · Passeig del Comtat, 75, Cocentaina">

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
);

export default MapaContacto;
