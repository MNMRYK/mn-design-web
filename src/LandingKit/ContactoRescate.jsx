import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import './ContactoRescate.css';

const ContactoRescate = () => {
    const [formData, setFormData] = useState({ 
        nombre: '', 
        email: '', 
        doc: '', 
        frustracion: '',
        mensaje: ''
    });
    const [estaCargando, setEstaCargando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEstaCargando(true);

        const dataToSend = {
            access_key: "1bc2d285-71cb-4fe3-806f-530066ab6e15",
            subject: "Nuevo Lead: Rescate Kit Digital",
            nombre: formData.nombre,
            email: formData.email,
            doc: formData.doc,
            frustracion: formData.frustracion,
            mensaje: formData.mensaje,
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
                const result = await results[0].json();
                if (!result.success) throw new Error();
                
                // Limpiamos los campos
                setFormData({ nombre: '', email: '', doc: '', frustracion: '', mensaje: '' });
                setEstaCargando(false);

                if (typeof window !== "undefined" && window.gtag) {
                    window.gtag('event', 'generate_lead', {
                        event_category: 'formulario',
                        event_label: 'rescate_kit_digital'
                    });
                }
                return result;
            }),
            {
                loading: 'Validando datos...',
                success: '¡Solicitud recibida! Te contactaremos pronto.',
                error: 'Error al enviar. Inténtalo de nuevo.'
            }
        ).catch(() => {
            setEstaCargando(false);
        });
    };

    const [esMovil, setEsMovil] = useState(window.innerWidth <= 1024);
    
    useEffect(() => {
        const comprobarResolucion = () => {
            setEsMovil(window.innerWidth <= 1024);
        };
        window.addEventListener('resize', comprobarResolucion);
        return () => window.removeEventListener('resize', comprobarResolucion);
    }, []);

    return (
        <section className="contacto-rescate-section">
            <div id="validacion" className="contacto-grid reveal-on-scroll">
                
                {/* LADO IZQUIERDO */}
                <div className="contacto-left ">
                    <h2 className="title-white">Reserva tu plaza para la auditoría de rescate</h2>
                    <div className="cal-widget">
                        <iframe 
                            src="https://cal.com/mndesignweb/asesoramiento-kit-digital" 
                            title="Reserva tu cita"
                            className="calendar-iframe"
                            width="100%"
                            height="100%"
                            scrolling="auto"
                            frameBorder="0"
                        />
                    </div>
                    <ul className="beneficios-lista">
                        <li>
                            <span className="check-icon">
                                <span className="check-icon-circle">
                                    <i className="fa-solid fa-circle-check"></i>
                                </span>
                            </span>
                            Diagnóstico técnico en menos de 24h.
                        </li>
                         <li>
                            <span className="check-icon">
                                <span className="check-icon-circle">
                                    <i className="fa-solid fa-circle-check"></i>
                                </span>
                            </span>
                            Plan de acción personalizado para tu web.
                        </li>
                         <li>
                            <span className="check-icon">
                                <span className="check-icon-circle">
                                    <i className="fa-solid fa-circle-check"></i>
                                </span>
                            </span>
                            Sesión de valoración 1-a-1 por videollamada.
                        </li>
                    </ul>
                </div>

                {/* LADO DERECHO: Formulario Premium */}
                <div className="contacto-right">
                    <form className="formulario-rescate" onSubmit={handleSubmit}>
                        <h3>Valida tus datos de acceso</h3>
                        <p className="form-subtext">Necesitamos estos datos para verificar tu elegibilidad en el censo.</p>
                        
                        <div className="diseno-form-grupo">
                            <input type="text" placeholder="Nombre completo" required onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
                        </div>
                        <div className="diseno-form-grupo">
                            <input type="email" placeholder="Email de contacto" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
                        </div>
                        <div className="diseno-form-grupo">
                            <input type="text" placeholder="DNI o CIF del beneficiario" required onChange={(e) => setFormData({...formData, doc: e.target.value})} />
                        </div>

                        <div className="diseno-form-grupo">
                            <label>¿Cuál es tu mayor frustración con tu web actual? </label>
                            <textarea 
                                rows="3" 
                                placeholder="Ej: La web va lenta, el antiguo agente no me responde, la tienda no vende nada..." 
                                required 
                                onChange={(e) => setFormData({...formData, frustracion: e.target.value, mensaje: e.target.value})}
                            />
                        </div>
                        <label className="checkbox-label">
                            <input type="checkbox" required />
                            <span>Confirmo que mi contrato anterior ha finalizado.</span>
                        </label>
                        
                        <button type="submit" className="btn-final-glow" disabled={estaCargando}>
                            {estaCargando ? 'Validando...' : 'Solicitar Validación Gratuita'}
                        </button>
                        <div className="content-garantia">
                            <p className="garantia-text">🔒 Tus datos están seguros y protegidos bajo RGPD.</p>
                            <p className="garantia-text">📩 Tras la validación, recibirás un PDF gratuito con nuestro método de trabajo.</p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactoRescate;