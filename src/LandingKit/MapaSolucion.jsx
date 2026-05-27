import React from 'react';
import './MapaSolucion.css';

const MapaSolucion = () => {
    return (
        <section className="mapa-solucion-section">
            <h2 className="mapa-title">Tu camino hacia la tranquilidad</h2>
            
            <div className="mapa-container">
                {/* Paso 1 */}
                <div className="paso-card">
                    <div className="numero">01</div>
                    <h3>Auditoría: Diagnóstico Profundo</h3>
                    <p>Analizamos qué te hicieron, dónde están los fallos técnicos y por qué tu web no está generando resultados.</p>
                </div>

                <div className="linea-conectora"></div>

                {/* Paso 2 */}
                <div className="paso-card">
                    <div className="numero">02</div>
                    <h3>Rescate: Limpieza y Reparación</h3>
                    <p>Corregimos errores críticos, eliminamos código basura y blindamos tu web para que deje de dar errores.</p>
                </div>

                <div className="linea-conectora"></div>

                {/* Paso 3 */}
                <div className="paso-card">
                    <div className="numero">03</div>
                    <h3>Despegue: Estrategia de Venta</h3>
                    <p>Optimizamos el embudo, configuramos tus herramientas de conversión y ponemos tu web a trabajar para ti.</p>
                </div>
            </div>
        </section>
    );
};

export default MapaSolucion;