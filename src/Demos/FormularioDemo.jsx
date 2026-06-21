import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast'; 
// Reutilizamos tu CSS de contacto porque las clases son las mismas
import './FormularioDemo.css';

const opcionesTiempo = [
  "Urgente (Lo necesito para ya)",
  "En las próximas 2-4 semanas",
  "Sin prisa, estoy explorando opciones"
];

const opcionesPresupuesto = [
  "Menos de 1.000€ (Fase inicial)",
  "Entre 1.000€ y 3.000€",
  "Más de 3.000€ (Proyecto a medida avanzado)"
];

const FormularioDemo = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    sector: '',
    tiempo: '',
    presupuesto: '',
    mensaje: ''
  });

  // Usamos un solo estado para saber qué desplegable está abierto
  const [selectAbierto, setSelectAbierto] = useState(null); 
  const [estaCargando, setEstaCargando] = useState(false); 

  const formRef = useRef(null);

  // Cierra el desplegable si haces clic fuera del formulario
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setSelectAbierto(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (campo, opcion) => {
    setFormData({ ...formData, [campo]: opcion });
    setSelectAbierto(null); // Cierra el desplegable tras elegir
  };

  const toggleSelect = (campo) => {
    // Si ya está abierto, lo cierra. Si es otro, lo abre.
    setSelectAbierto(selectAbierto === campo ? null : campo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de los selectores personalizados
    if (!formData.sector || !formData.tiempo || !formData.presupuesto) {
        toast('Por favor, completa todas las opciones de los desplegables.', { icon: '⚠️' });
        return;
    }

    setEstaCargando(true);

    const dataToSend = {
      access_key: "1bc2d285-71cb-4fe3-806f-530066ab6e15",
      subject: `🚀 SOLICITUD DE DEMO: ${formData.sector}`,
      from_name: formData.nombre,
      email: formData.email,
      Presupuesto: formData.presupuesto,
      Urgencia: formData.tiempo,
      message: formData.mensaje,
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
        const res = results[0]; 
        const result = await res.json();
        
        if (!result.success) throw new Error();
        
        // Limpiamos el formulario
        setFormData({ nombre: '', email: '', sector: '', tiempo: '', presupuesto: '', mensaje: '' });
        setEstaCargando(false);

        if (typeof window !== "undefined" && window.gtag) {
            window.gtag('event', 'generate_lead', {
                event_category: 'formulario',
                event_label: 'solicitud_demo'
            });
        }
        
        return result;
      }),
      {
        loading: 'Enviando solicitud...',
        success: '¡Petición recibida! Nos pondremos manos a la obra.',
        error: 'Error al enviar, intenta de nuevo.'
      },
      {
        success: { style: { borderLeft: '5px solid #00C851', borderRadius: '12px' } },
        error: { style: { borderLeft: '5px solid #ff4444', borderRadius: '12px' } }
      }
    );
  };

  return (
    <div className="contacto-formulario-area" ref={formRef}>
      <div className="form-header">
        <h2>Solicita tu Demo Gratuita</h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", color: "rgba(26, 16, 45, 0.7)", marginBottom: "20px" }}>
          Cuéntanos tu idea y prepararemos un prototipo inicial sin compromiso para que veas el potencial de tu marca.
        </p>
      </div>

      <form id="contact-form" onSubmit={handleSubmit}>
        <div className="form-grupo">
          <label htmlFor="nombre">Nombre o Empresa</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="¿Cómo te llamamos?" required />
        </div>

        <div className="form-grupo">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="hola@tuempresa.com" required />
        </div>

        {/* --- SELECT 1: SECTOR --- */}
        <div className="form-grupo">
          <label htmlFor="sector">¿Cuál es tu sector / negocio?</label>
          <input type="text" id="sector" name="sector" value={formData.sector} onChange={handleChange} placeholder="Ej: Clínica de fisioterapia, Agencia inmobiliaria..." required />
        </div>

        {/* --- SELECT 2: URGENCIA --- */}
        <div className="form-grupo custom-select-container">
          <label>¿Para cuándo necesitas tener la demo lista?</label>
          <div className={`custom-select-trigger ${selectAbierto === 'tiempo' ? 'open' : ''}`} onClick={() => toggleSelect('tiempo')}>
            <span>{formData.tiempo || "Indica tu urgencia..."}</span>
            <i className={`fas fa-chevron-down ${selectAbierto === 'tiempo' ? 'rotated' : ''}`}></i>
          </div>
          {selectAbierto === 'tiempo' && (
            <ul className="custom-options-list">
              {opcionesTiempo.map((opcion, index) => (
                <li key={index} className="custom-option" onClick={() => handleSelectChange('tiempo', opcion)}>{opcion}</li>
              ))}
            </ul>
          )}
        </div>

        {/* --- SELECT 3: PRESUPUESTO --- */}
        <div className="form-grupo custom-select-container">
          <label>¿Qué presupuesto tienes previsto?</label>
          <div className={`custom-select-trigger ${selectAbierto === 'presupuesto' ? 'open' : ''}`} onClick={() => toggleSelect('presupuesto')}>
            <span>{formData.presupuesto || "Rango de inversión..."}</span>
            <i className={`fas fa-chevron-down ${selectAbierto === 'presupuesto' ? 'rotated' : ''}`}></i>
          </div>
          {selectAbierto === 'presupuesto' && (
            <ul className="custom-options-list">
              {opcionesPresupuesto.map((opcion, index) => (
                <li key={index} className="custom-option" onClick={() => handleSelectChange('presupuesto', opcion)}>{opcion}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-grupo">
          <label htmlFor="mensaje">Cuéntanos un poco sobre tu idea</label>
          <textarea id="mensaje" name="mensaje" rows="2" value={formData.mensaje} onChange={handleChange} placeholder="Ej: Necesito una web para mi nueva clínica de estética con un sistema para que los clientes reserven cita..." required></textarea>
        </div>

        <button 
          type="submit" 
          className="btn-enviar-form" 
          disabled={estaCargando}
        >
          {estaCargando ? 'Analizando solicitud...' : 'Solicitar Demo Gratis'}
        </button>
      </form>
    </div>
    
  );
};

export default FormularioDemo;