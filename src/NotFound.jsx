import React from 'react';
import { Link } from 'react-router-dom';
import './Legales/TextosLegales.css'; // Puedes reutilizar tu CSS de textos legales si quieres

const NotFound = () => {
    return (
        <div className="legal-wrapper not-found-wrapper">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-text">¡Uy! Esta página se ha ido de vacaciones.</p>
            <Link to="/" className="btn-volver-inicio">Volver al inicio</Link>
        </div>
    );
};

export default NotFound;