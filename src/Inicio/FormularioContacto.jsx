import React, { useState, useRef, useEffect, useId } from 'react';
import { useLocation } from 'react-router-dom';
import './FormularioContacto.css';
import { registrarLead } from "../utils/analitica";
import { enviarLead, asuntoLead } from "../utils/enviarLead";
import toast from 'react-hot-toast';

const opcionesServicio = [
  "Diseño Web",
  "E-Commerce / Tienda Online",
  "Posicionamiento SEO",
  "Mantenimiento Web",
  "Gestión de Redes Sociales"
];

// Nombre de la página en el asunto del email: "Nuevo lead desde Inicio: …" en la home y
// "Nuevo lead desde Contacto: …" en /contacto/ (mismo formato que el resto de formularios)
const NOMBRES_PAGINA = {
  "/": "Inicio",
  "/contacto/": "Contacto",
};
const nombrePagina = (pathname) => {
  const ruta = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return NOMBRES_PAGINA[ruta] ?? ruta;
};

const FormularioContacto = () => {
  const { pathname } = useLocation();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    servicio: '',
    mensaje: ''
  });

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  // Opción resaltada con el teclado mientras la lista está abierta
  const [opcionActiva, setOpcionActiva] = useState(0);
  const [estaCargando, setEstaCargando] = useState(false);

  const selectRef = useRef(null);
  const triggerRef = useRef(null);
  const listaRef = useRef(null);
  const idBase = useId();
  const idEtiqueta = `${idBase}-servicio-etiqueta`;
  const idLista = `${idBase}-servicio-lista`;
  const idOpcion = (i) => `${idBase}-servicio-opcion-${i}`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Al abrir la lista, el foco pasa a ella para moverse con las flechas
  useEffect(() => {
    if (isSelectOpen) listaRef.current?.focus();
  }, [isSelectOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const abrirLista = () => {
    const actual = opcionesServicio.indexOf(formData.servicio);
    setOpcionActiva(actual >= 0 ? actual : 0);
    setIsSelectOpen(true);
  };

  const cerrarLista = () => {
    setIsSelectOpen(false);
    triggerRef.current?.focus();
  };

  const handleSelectChange = (opcion) => {
    setFormData({ ...formData, servicio: opcion });
    cerrarLista();
  };

  const alPulsarEnBoton = (e) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      abrirLista();
    }
  };

  const alPulsarEnLista = (e) => {
    const ultima = opcionesServicio.length - 1;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setOpcionActiva((i) => Math.min(i + 1, ultima));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setOpcionActiva((i) => Math.max(i - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        setOpcionActiva(0);
        break;
      case 'End':
        e.preventDefault();
        setOpcionActiva(ultima);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleSelectChange(opcionesServicio[opcionActiva]);
        break;
      case 'Escape':
        e.preventDefault();
        cerrarLista();
        break;
      case 'Tab':
        setIsSelectOpen(false);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica: Si no ha elegido servicio, avisamos
    if (!formData.servicio) {
        toast('Por favor, selecciona un servicio.', { icon: '⚠️' });
        triggerRef.current?.focus();
        return;
    }

    setEstaCargando(true);

    const dataToSend = {
      subject: asuntoLead(nombrePagina(pathname), formData.servicio),
      from_name: formData.nombre,
      email: formData.email,
      message: formData.mensaje,
    };

    toast.promise(
      enviarLead(dataToSend).then((result) => {

        setFormData({ nombre: '', email: '', servicio: '', mensaje: '' });

        // Conversión para GA4: solo tras un envío correcto
        registrarLead("contacto_general");

        return result;
      })
        // Pase lo que pase (también si falla el envío), el botón vuelve a estar disponible
        .finally(() => setEstaCargando(false)),
      {
        loading: 'Enviando...',
        success: '¡Recibido! Te contactaremos pronto.',
        error: 'Error al enviar, intenta de nuevo.'
      },
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

        {/* Desplegable propio (por el diseño), accesible con teclado: flechas, Inicio/Fin,
            Intro o espacio para elegir y Escape para cerrar */}
        <div className="form-grupo custom-select-container" ref={selectRef}>
          <label id={idEtiqueta}>¿En qué te podemos ayudar?</label>
          <button
            type="button"
            ref={triggerRef}
            className={`custom-select-trigger ${isSelectOpen ? 'open' : ''}`}
            aria-haspopup="listbox"
            aria-expanded={isSelectOpen}
            aria-controls={isSelectOpen ? idLista : undefined}
            aria-labelledby={`${idEtiqueta} ${idBase}-servicio-valor`}
            onClick={() => (isSelectOpen ? setIsSelectOpen(false) : abrirLista())}
            onKeyDown={alPulsarEnBoton}
          >
            <span id={`${idBase}-servicio-valor`}>{formData.servicio || "Selecciona un servicio..."}</span>
            <i className={`fas fa-chevron-down ${isSelectOpen ? 'rotated' : ''}`} aria-hidden="true"></i>
          </button>
          {isSelectOpen && (
            <ul
              ref={listaRef}
              id={idLista}
              role="listbox"
              tabIndex={-1}
              aria-labelledby={idEtiqueta}
              aria-activedescendant={idOpcion(opcionActiva)}
              className="custom-options-list blur-effect"
              onKeyDown={alPulsarEnLista}
            >
              {opcionesServicio.map((opcion, index) => (
                <li
                  key={index}
                  id={idOpcion(index)}
                  role="option"
                  aria-selected={formData.servicio === opcion}
                  className={`custom-option ${index === opcionActiva ? 'activa' : ''}`}
                  onClick={() => handleSelectChange(opcion)}
                  onMouseEnter={() => setOpcionActiva(index)}
                >
                  {opcion}
                </li>
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

        <p className="form-privacidad">
          Responsable: MN Design Web. Finalidad: responder a tu consulta. Más información en la{" "}
          <a href="/privacidad/">política de privacidad</a>.
        </p>
      </form>
    </div>
  );
};

export default FormularioContacto;
