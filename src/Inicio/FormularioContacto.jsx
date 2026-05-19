import React, { useState, useRef, useEffect } from 'react';
import './FormularioContacto.css';
import toast from 'react-hot-toast'; // 🔥 1. IMPORTAMOS LAS ALERTAS 🔥

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

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [estaCargando, setEstaCargando] = useState(false); // 🔥 Nuevo estado de carga 🔥

  const selectRef = useRef(null);

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (opcion) => {
    setFormData({ ...formData, servicio: opcion });
    setIsSelectOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica: Si no ha elegido servicio, avisamos
    if (!formData.servicio) {
        toast('Por favor, selecciona un servicio.', { icon: '⚠️' });
        return;
    }

    setEstaCargando(true);

    const dataToSend = {
      access_key: "1bc2d285-71cb-4fe3-806f-530066ab6e15",
      subject: `Nuevo lead desde Inicio: ${formData.servicio}`,
      from_name: formData.nombre,
      email: formData.email,
      message: formData.mensaje,
    };

    // 🔥 LA MAGIA DE TOAST.PROMISE 🔥
    toast.promise(
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(dataToSend)
      }).then(async (res) => {
        const result = await res.json();
        if (!result.success) throw new Error();
        
        setFormData({ nombre: '', email: '', servicio: '', mensaje: '' });
        setEstaCargando(false);
        return result;
      }).catch((err) => {
        setEstaCargando(false);
        throw err;
      }),
      {
        loading: 'Enviando...',
        success: '¡Recibido! Te contactaremos pronto.',
        error: 'Error al enviar, intenta de nuevo.'
      },
      // Estilos para que sigan el mismo look premium que el otro formulario
      {
        success: { 
            style: { borderLeft: '5px solid #00C851', borderRadius: '12px' } 
        },
        error: { 
            style: { borderLeft: '5px solid #ff4444', borderRadius: '12px' } 
        }
      }
    );
  };

  return (
    <div className="contacto-formulario-area">
      <div className="form-header">
        <h2>Cuéntanos tu proyecto</h2>
      </div>

      <form id="contact-form" onSubmit={handleSubmit}>
        <div className="form-grupo">
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Tu nombre" required />
        </div>

        <div className="form-grupo">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="hola@tuempresa.com" required />
        </div>

        <div className="form-grupo custom-select-container" ref={selectRef}>
          <label>¿En qué te podemos ayudar?</label>
          <div className={`custom-select-trigger ${isSelectOpen ? 'open' : ''}`} onClick={() => setIsSelectOpen(!isSelectOpen)}>
            <span>{formData.servicio || "Selecciona un servicio..."}</span>
            <i className={`fas fa-chevron-down ${isSelectOpen ? 'rotated' : ''}`}></i>
          </div>
          {isSelectOpen && (
            <ul className="custom-options-list blur-effect">
              {opcionesServicio.map((opcion, index) => (
                <li key={index} className="custom-option" onClick={() => handleSelectChange(opcion)}>{opcion}</li>
              ))}
            </ul>
          )}
          <input type="hidden" name="servicio" value={formData.servicio} required />
        </div>

        <div className="form-grupo">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea id="mensaje" name="mensaje" rows="2" value={formData.mensaje} onChange={handleChange} placeholder="Cuéntanos..." required></textarea>
        </div>

        <button 
          type="submit" 
          className="btn-enviar-form" 
          disabled={estaCargando}
        >
          {estaCargando ? 'Enviando...' : 'Enviar solicitud'}
        </button>
      </form>
    </div>
  );
};

export default FormularioContacto;