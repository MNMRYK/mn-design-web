import React, { useState } from 'react';
import './FormularioSeo.css';
import toast from 'react-hot-toast'; 

// Opciones
const opcionesServicio = [
  "Auditoría y Rescate SEO (Mi web no recibe visitas)",
  "SEO para Proyecto Nuevo (Quiero empezar bien)",
  "Mantenimiento / Fidelización SEO Mensual",
  "Consultoría SEO (Dudas o estrategia puntual)",
  "Información sobre Kit Digital"
];

const FormularioSeo = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    servicios: [],
    mensaje: ''
  });

  // 🔥 Creamos un estado de carga independiente para bloquear el botón 🔥
  const [estaCargando, setEstaCargando] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (opcion) => {
    setFormData((prevData) => {
      const nuevosServicios = prevData.servicios.includes(opcion)
        ? prevData.servicios.filter((s) => s !== opcion)
        : [...prevData.servicios, opcion];
      
      return { ...prevData, servicios: nuevosServicios };
    });
  };

 // 🔥 EL NUEVO MOTOR DE ENVÍO CON ALERTAS CORREGIDAS 🔥
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validación manual: Obligamos a marcar al menos un checkbox
    if (formData.servicios.length === 0) {
      toast('Por favor, selecciona al menos un servicio.', {
        icon: '⚠️', 
        style: {
          borderRadius: '12px',
          background: '#FFF8E1', 
          color: '#856404', 
          border: '1px solid #FFE082',
          padding: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      });
      return; 
    }

    // 2. Si todo está bien, empezamos el envío real
    setEstaCargando(true);

    const dataToSend = {
      access_key: "1bc2d285-71cb-4fe3-806f-530066ab6e15",
      subject: `Nuevo lead desde la web (SEO)`,
      from_name: formData.nombre,
      email: formData.email,
      message: `Intereses: ${formData.servicios.join(', ')}\n\nMensaje: ${formData.mensaje}`,
    };

    toast.promise(
      Promise.all([
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(dataToSend)
        }),
        fetch("https://hook.eu1.make.com/mxvqg7gwne43yab165v2uhtyw5yh115r", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend)
        })
      ]).then(async (results) => {
        // Procesamos solo la respuesta de Web3Forms
        const result = await results[0].json();
        if (!result.success) throw new Error(); 
        
        setFormData({ nombre: '', email: '', servicios: [], mensaje: '' });
        setEstaCargando(false);

        // Radar para Google Ads (etiqueta Posicionamiento_SEO)
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag('event', 'generate_lead', {
                event_category: 'formulario',
                event_label: 'Posicionamiento_SEO' 
            });
        }
        return result;
      }),

      // PARTE 2: Los textos de las notificaciones (¡React ahora los entenderá!)
      {
        loading: 'Enviando tu solicitud...',
        success: '¡Petición enviada! Te contactaremos pronto.',
        error: 'Ups, algo salió mal. Inténtalo de nuevo.',
      },

      // PARTE 3: Los estilos e iconos super premium
      {
        loading: {
          icon: '⏳',
          style: {
            borderRadius: '12px',
            background: '#ffffff',
            color: 'var(--deep-eggplant)',
            border: '1px solid rgba(126, 87, 194, 0.2)',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(26, 16, 45, 0.1)',
          },
        },
        success: {
          icon: <i className="fa-solid fa-circle-check" style={{color: '#00C851'}}></i>, 
          style: {
            borderRadius: '12px',
            background: '#ffffff',
            color: 'var(--deep-eggplant)',
            borderLeft: '5px solid #00C851', 
            padding: '16px',
            boxShadow: '0 10px 25px rgba(0, 200, 81, 0.15)', 
          },
        },
        error: {
          icon: <i className="fa-solid fa-circle-xmark" style={{color: '#ff4444'}}></i>, 
          style: {
            borderRadius: '12px',
            background: '#ffffff',
            color: 'var(--deep-eggplant)',
            borderLeft: '5px solid #ff4444', 
            padding: '16px',
            boxShadow: '0 10px 25px rgba(255, 68, 68, 0.15)', 
          },
        },
      }
    );
  };

  return (
    <div className="seo-formulario-area">
      <div className="seo-form-header">
        <h2>Cuéntanos tu proyecto</h2>
      </div>

      <form id="seo-form" onSubmit={handleSubmit}>
        {/* ... inputs normales de Nombre y Email (están igual) ... */}
        <div className="seo-form-grupo">
          <label htmlFor="nombre">Nombre *</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Tu nombre" required />
        </div>
        <div className="seo-form-grupo">
          <label htmlFor="email">Correo electrónico *</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="hola@tuempresa.com" required />
        </div>

        {/* Checkboxes */}
        <div className="seo-form-grupo">
          <label>¿En qué te podemos ayudar? *</label> {/* Añadimos asterisco */}
          <div className="seo-checkbox-grid">
            {opcionesServicio.map((opcion, index) => (
              <label key={index} className="seo-checkbox-label">
                <input type="checkbox" value={opcion} checked={formData.servicios.includes(opcion)} onChange={() => handleCheckboxChange(opcion)} />
                <span className="seo-checkmark"><i className="fa-solid fa-check"></i></span>
                <span className="seo-checkbox-text">{opcion}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mensaje */}
        <div className="seo-form-grupo">
          <label htmlFor="mensaje">Comentario o mensaje *</label>
          <textarea id="mensaje" name="mensaje" rows="2" value={formData.mensaje} onChange={handleChange} placeholder="Cuéntanos..." required></textarea>
        </div>

        {/* 🔥 EL BOTÓN AHORA USA EL ESTADO 'estaCargando' 🔥 */}
        <button 
          type="submit" 
          className="btn-enviar-seo"
          disabled={estaCargando}
          style={{ opacity: estaCargando ? 0.6 : 1, cursor: estaCargando ? 'not-allowed' : 'pointer' }}
        >
          {estaCargando ? 'Enviando...' : 'Enviar solicitud'}
        </button>

      </form>
    </div>
  );
};

export default FormularioSeo;