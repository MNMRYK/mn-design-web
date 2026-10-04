import React from 'react';
import { Link } from 'react-router-dom';
import './Legales/TextosLegales.css'; // Puedes reutilizar tu CSS de textos legales si quieres
import Seo from "./seo/Seo";

const NotFound = () => {
    return (
        <div className="legal-wrapper not-found-wrapper">
            <Seo
              titulo="Página no encontrada | MN Design Web"
              descripcion="La página que buscas no existe o ha cambiado de dirección. Vuelve al inicio de MN Design Web para ver nuestros servicios de diseño web, e-commerce y SEO."
              noindex
            />
            <h1 className="not-found-title">404</h1>
            <p className="not-found-text">¡Uy! Esta página se ha ido de vacaciones.</p>
            <Link to="/" className="btn-volver-inicio">Volver al inicio</Link>
        </div>
    );
};

export default NotFound;