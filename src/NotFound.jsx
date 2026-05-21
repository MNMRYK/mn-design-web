import React from 'react';
import { Link } from 'react-router-dom';
import './Legales/TextosLegales.css'; // Puedes reutilizar tu CSS de textos legales si quieres

const NotFound = () => {
    return (
        <div className="legal-wrapper" style={{textAlign: 'center', paddingTop: '200px'}}>
            <h1 style={{fontSize: '5rem', color: '#7E57C2'}}>404</h1>
            <p>¡Uy! Esta página se ha ido de vacaciones.</p>
            <Link to="/" className="btn-empezar">Volver al inicio</Link>
        </div>
    );
};

export default NotFound;