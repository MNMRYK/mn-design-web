import React, { useEffect, useRef } from 'react';
import './KitDigitalLanding.css';



// 🔥 TRUCO PRO: Guardamos los datos en un Array fuera del componente
const dolores = [
    { icon: "/landing/landing1.svg", titulo: "Soporte fantasma", texto: "Pasó el año de contrato y ya no te cogen el teléfono. Estás sola ante el peligro con los plugins pidiendo actualización a gritos." },
    { icon: "/landing/landing2.svg", titulo: "El SEO es invisible", texto: "Te prometieron 'posicionamiento básico', pero buscas tu propia empresa en Google y ni siquiera apareces en la primera página." },
    { icon: "/landing/landing3.svg", titulo: "Cero formación", texto: "Te dieron las claves de un WordPress inmenso, te desearon suerte y ahora no sabes ni cómo cambiar una simple foto sin romper la web." },
    { icon: "/landing/landing4.svg", titulo: "Tienda online caótica", texto: "Tu e-commerce da errores al pagar, los correos no llegan a los clientes o la gestión del inventario es un auténtico rompecabezas." },
    { icon: "/landing/landing5.svg", titulo: "Velocidad de tortuga", texto: "La web tarda una eternidad en cargar. Para cuando el cliente por fin entra, ya se ha cansado y se ha ido a la competencia." },
    { icon: "/landing/landing6.svg", titulo: "Proyecto de 'Plantilla'", texto: "Cumplieron lo mínimo legal para cobrar la subvención, pero te han dejado una web genérica que no transmite la esencia de tu marca." }
];

const KitDigitalLanding = () => {

    const scrollRef = useRef(null);

    // EFECTO: Bucle Infinito Real y Scroll Suave
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        let scrollInterval;

        const startAutoScroll = () => {
            scrollInterval = setInterval(() => {
                if (!container) return;

                const firstCard = container.querySelector('.card-dolor');
                if (!firstCard) return;

                const cardHeight = firstCard.offsetHeight + 20; // 20px es el gap
                const middlePoint = container.scrollHeight / 2; // La mitad exacta del contenido

                // Si hemos llegado a la mitad (donde empieza la lista clonada)
                if (container.scrollTop >= middlePoint) {
                    // 1. Damos un salto invisible a la tarjeta 0 (quitando la animación)
                    container.style.scrollBehavior = 'auto';
                    container.scrollTop = 0;
                    
                    // 2. Un milisegundo después, volvemos a poner animación y bajamos a la tarjeta 1
                    requestAnimationFrame(() => {
                        container.style.scrollBehavior = 'smooth';
                        container.scrollTop += cardHeight;
                    });
                } else {
                    // Scroll normal hacia abajo
                    container.style.scrollBehavior = 'smooth';
                    container.scrollTop += cardHeight;
                }
            }, 4000); // Salta cada 4 segundos
        };

        startAutoScroll();

        // Si el usuario mete el ratón (o hace scroll manual), pausamos la ruleta
        const handleMouseEnter = () => clearInterval(scrollInterval);
        const handleMouseLeave = () => startAutoScroll();

        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearInterval(scrollInterval);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="landing-premium-container">
            <a href="https://mndesignweb.es/" className="global-logo" target="_blank" rel="noopener noreferrer">
                <img src="/logo.png" alt="MN Design Web" />
                <div className="texto-logo">
                    <span className="siglas">MN</span>
                    <span className="marca">Design Web</span>
                </div>
            </a>
            
            <header className="hero-split-container">
                <div className="hero-split-grid">
                    
                    {/* LADO IZQUIERDO (60%) */}
                    <div className="hero-left">
                        <div className="centered-hero-actions">
                            <span className="badge-premium">Programa de Rescate Digital</span>
                        </div>
                        <div className="hero-content-left-text">
                            <h1 className="hero-title">
                                ¿Tu año del Kit Digital terminó y te han dejado una web a medias?
                            </h1>
                            <div className="hero-description">
                            <p style={{ marginBottom: '1rem' }}>
                                Sabemos la frustración que sientes. Te vendieron la ilusión de digitalizar tu negocio, pero terminaste siendo un número más en una "fábrica de webs". El año del bono ha caducado, el soporte técnico ha desaparecido por arte de magia y tu página sigue siendo un escaparate invisible que no genera ni una sola venta.
                            </p>
                            <p>
                                No dejes que esa inversión se convierta en un peso muerto. Nosotros entramos a auditar el desastre, limpiamos lo que no sirve y transformamos tu web en una verdadera máquina de captar clientes. Recupera el control de tu negocio hoy mismo aplicando tu <strong>20% de descuento exclusivo</strong>.
                            </p>
                        </div>
                        </div>
                        <div className="centered-hero-actions">
                            <a href="#validacion" className="btn-primary-glow">
                                Solicitar mi 20% de descuento
                            </a>
                        </div>
                    </div>

                    {/* LADO DERECHO (40%): CARRUSEL INFINITO */}
                    <div className="hero-right-carousel">
                        <h3 className="carousel-title">Sabemos por lo que estás pasando... </h3>
                        
                        <div className="vertical-scroll-area" ref={scrollRef}>
                            {[...dolores, ...dolores].map((dolor, index) => (
                                <div className="card-dolor" key={index}>
                                    <div className="card-icon">
                                        <img src={dolor.icon} alt={dolor.titulo} />
                                    </div>
                                    <h4>{dolor.titulo}</h4>
                                    <p>{dolor.texto}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </header>
        </div>
    );
};

export default KitDigitalLanding;