// ContactoSiguiente.jsx
import React from 'react';
import { MapPin, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import FormularioContacto from '../Inicio/FormularioContacto'; // <-- Aquí importamos tu formulario
import './ContactoSiguiente.css';

const ContactoSiguiente = () => {
  return (
    <div className="contacto-wrapper">
      <div className="contacto-container">
        {/* --- BREADCRUMB INTERACTIVO --- */}
        <div className="contacto-badge">
            <Link to="/" className="breadcrumb-link">INICIO</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">CONTACTO</span>
        </div>
        
        {/* CABECERA */}
        <div className="contacto-header">

          <h1 className="contacto-title">
            No dejes para mañana el éxito <br className="hidden-mobile" />
            <span className="text-gradient">que tu negocio necesita hoy.</span>
          </h1>
          <p className="contacto-subtitle">
            Contacta y empecemos a construir algo increíble juntos. Creemos que la comunicación fluida es la base de un proyecto de éxito.
          </p>
        </div>

        {/* GRID PRINCIPAL */}
        <div className="contacto-grid">
          
          {/* COLUMNA IZQUIERDA (Info y Opciones, ya SIN la imagen) */}
          <div className="info-column">
            
            <div>
              <h2 className="info-title">
                ¿Hablamos de tu <br />próximo gran salto?
              </h2>
              <p className="info-text">
                En <strong>MN Design Web</strong>, ofrecemos una cobertura de servicio personalizada y cercana, adaptándonos totalmente a tus necesidades de planificación. ¿Tienes una idea en mente? Nos encantaría escucharla.
              </p>
            </div>

            <div className="opciones-grid">
              {/* Opción 1: Presencial */}
              <div className="card-contacto">
                <div className="card-icon">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="card-title">Consultoría Presencial</h3>
                  <p className="card-text">
                    Si prefieres el trato directo, nos desplazamos a tus instalaciones o nos reunimos en nuestro estudio para tratar todos los detalles de <strong>tu proyecto de forma cercana</strong>.
                  </p>
                </div>
              </div>

              {/* Opción 2: Videollamada */}
              <div className="card-contacto">
                <div className="card-icon">
                  <Video size={28} />
                </div>
                <div>
                  <h3 className="card-title">Consultoría por Videollamada</h3>
                  <p className="card-text">
                    Si te encuentras lejos o buscas optimizar tu tiempo, coordinamos sesiones estratégicas por videollamada. Avanzamos garantizando una <strong>gestión ágil sin importar la distancia</strong>.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMNA DERECHA (Aquí cargamos tu componente) */}
          <div className="form-column">

            
            {/* Renderizamos tu formulario reutilizable */}
            <FormularioContacto />

          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactoSiguiente;