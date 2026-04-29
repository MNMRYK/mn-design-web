import React, { useState, useRef, useEffect } from 'react';
import './FormularioContacto.css';

// Las opciones de tu agencia
const opcionesServicio = [
  "Diseño Web",
  "E-Commerce / Tienda Online",
  "Posicionamiento SEO",
  "Mantenimiento Web",
  "Gestión de Redes Sociales"
];

const FormularioContacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    servicio: '',
    mensaje: ''
  });

  // ¡Estos dos son los que te faltaban!
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [estadoEnvio, setEstadoEnvio] = useState(''); 

  // Referencia para saber si hacemos clic fuera del desplegable
  const selectRef = useRef(null);

  // Cerramos el menú si el usuario hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (opcion) => {
    setFormData({
      ...formData,
      servicio: opcion
    });
    setIsSelectOpen(false); // Ahora sí sabe qué es esto
  };

  // El motor de envío con tu llave
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoEnvio('Enviando...');

    const dataToSend = {
      access_key: "1bc2d285-71cb-4fe3-806f-530066ab6e15",
      subject: `Nuevo lead desde la web: ${formData.servicio}`,
      from_name: formData.nombre,
      email: formData.email,
      message: formData.mensaje,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.json();
      
      if (result.success) {
        setEstadoEnvio('¡Mensaje enviado!');
        setFormData({ nombre: '', email: '', servicio: '', mensaje: '' });
        
        setTimeout(() => {
          setEstadoEnvio('');
        }, 3000);
      } else {
        setEstadoEnvio('Error al enviar');
        setTimeout(() => setEstadoEnvio(''), 3000);
      }
    } catch (error) {
      console.error(error);
      setEstadoEnvio('Error de conexión');
      setTimeout(() => setEstadoEnvio(''), 3000);
    }
  };

  return (
    <div className="contacto-formulario-area">
      <div className="form-header">
        <h2>Cuéntanos tu proyecto</h2>
      </div>

      <form id="contact-form" onSubmit={handleSubmit}>
        
        <div className="form-grupo">
          <label htmlFor="nombre">Nombre</label>
          <input 
            type="text" id="nombre" name="nombre" 
            value={formData.nombre} onChange={handleChange} 
            placeholder="Tu nombre o el de tu empresa" required 
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="email">Email</label>
          <input 
            type="email" id="email" name="email" 
            value={formData.email} onChange={handleChange} 
            placeholder="hola@tuempresa.com" required 
          />
        </div>

        {/* --- EL NUEVO DESPLEGABLE DE CRISTAL --- */}
        <div className="form-grupo custom-select-container" ref={selectRef}>
          <label>¿En qué te podemos ayudar?</label>
          
          <div 
            className={`custom-select-trigger ${isSelectOpen ? 'open' : ''}`}
            onClick={() => setIsSelectOpen(!isSelectOpen)}
          >
            <span>{formData.servicio || "Selecciona un servicio..."}</span>
            <i className={`fas fa-chevron-down ${isSelectOpen ? 'rotated' : ''}`}></i>
          </div>

          {isSelectOpen && (
            <ul className="custom-options-list blur-effect">
              {opcionesServicio.map((opcion, index) => (
                <li 
                  key={index} 
                  className="custom-option"
                  onClick={() => handleSelectChange(opcion)}
                >
                  {opcion}
                </li>
              ))}
            </ul>
          )}
          
          {/* Input oculto para que HTML5 validación funcione si es necesario */}
          <input 
            type="hidden" 
            name="servicio" 
            value={formData.servicio} 
            required 
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea 
            id="mensaje" name="mensaje" rows="2"
            value={formData.mensaje} onChange={handleChange} 
            placeholder="Cuéntanos un poco sobre tu idea..." required 
          ></textarea>
        </div>

        {/* ESTE BOTÓN AHORA HABLA Y TE DICE SI SE ESTÁ ENVIANDO */}
        <button 
          type="submit" 
          className="btn-enviar-form"
          disabled={estadoEnvio === 'Enviando...'}
          style={{ opacity: estadoEnvio === 'Enviando...' ? 0.7 : 1 }}
        >
          {estadoEnvio || 'Enviar solicitud'}
        </button>

      </form>
    </div>
  );
};

export default FormularioContacto;