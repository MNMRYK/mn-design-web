import React, { useRef } from 'react';
import './Beneficios.css';
import { motion } from 'framer-motion';

const beneficiosData = [
  { title: "Identidad visual única", icon: "fas fa-fingerprint" },
  { title: "Experiencia de usuario fluida", icon: "fas fa-mouse-pointer" },
  { title: "Adaptabilidad móvil", icon: "fas fa-mobile-alt" },
  { title: "Aumento directo de facturación", icon: "fas fa-chart-line" },
  { title: "Primera huella digital", icon: "fas fa-bullseye" },
  { title: "Sistemas de gestión inteligentes", icon: "fas fa-brain" },
  { title: "Mayor visibilidad y alcance", icon: "fas fa-eye" },
  { title: "Acompañamiento y asesoria", icon: "fas fa-hands-helping" }
];

const Beneficios = () => {
    // 1. Creamos una referencia a la sección
    const sectionRef = useRef(null);

    // 2. Función que detecta el movimiento del ratón
    const handleMouseMove = (e) => {
        if (!sectionRef.current) return;
        
        // Calculamos la posición exacta dentro de la sección
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 3. Le pasamos las coordenadas al CSS como variables
        sectionRef.current.style.setProperty('--mouse-x', `${x}px`);
        sectionRef.current.style.setProperty('--mouse-y', `${y}px`);
    };
    return (

        <motion.section 
            className="beneficios-section" 
            ref={sectionRef} 
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="beneficios-header tema-oscuro">
                <h2 className="beneficios-title">¿Qué beneficio obtienes con nuestros servicios?</h2>
                <p className="beneficios-description">
                Obtendrás un diseño con personalidad propia creado desde cero mediante sketches y bocetos. 
                Esto garantiza que su marca destaque y sea recordada por ser diferente a la competencia.
                </p>
            </div>

            <div className="beneficios-grid">
                {beneficiosData.map((item, index) => (
                    <div className="beneficio-card" key={index}>
                        <div className="beneficio-icon">
                            <i className={item.icon}></i>
                        </div>
                        <span className="beneficio-text">{item.title}</span>
                    </div>
                ))}
            </div>
        </motion.section>
    );
};

export default Beneficios;