import React, { useEffect, useRef } from 'react';
import './ServiciosRescate.css';

// 🔥 TUS 10 SERVICIOS DE RESCATE (2 Diseño, 2 Tienda, 2 SEO, 2 RRSS, 1 Mantenimiento, 1 Ads/IA)
const serviciosRescate = [
    { icon: "/landing/servicio1.svg", titulo: "Rediseño UX/UI Web", texto: "Reconstruimos la navegación de tu página para que sea intuitiva y guíe al visitante directo hacia la compra o el contacto." },
    { icon: "/landing/servicio2.svg", titulo: "Landing Pages de Venta", texto: "Diseñamos páginas de aterrizaje específicas para tus campañas, sin fugas y enfocadas 100% en la conversión." },
    { icon: "/landing/servicio3.svg", titulo: "E-commerce sin fricción", texto: "Arreglamos carritos abandonados, pasarelas de pago que dan error y hacemos que comprar en tu tienda sea un proceso fluido." },
    { icon: "/landing/servicio4.svg", titulo: "Sincronización de Catálogo", texto: "Organizamos tus productos, categorías y stock de forma lógica para gestionar tu tienda sin dolores de cabeza." },
    { icon: "/landing/servicio5.svg", titulo: "Auditoría SEO Técnica", texto: "Rastreamos y solucionamos todos los errores internos que el agente anterior ignoró y que te están penalizando en Google." },
    { icon: "/landing/servicio6.svg", titulo: "Posicionamiento Local", texto: "Optimizamos tu perfil y palabras clave para que, cuando tus clientes busquen servicios en tu ciudad, tú seas la primera opción." },
    { icon: "/landing/servicio7.svg", titulo: "Estrategia de Contenidos", texto: "Se acabó publicar por publicar. Creamos un plan de redes sociales enfocado en atraer leads cualificados, no solo 'likes'." },
    { icon: "/landing/servicio8.svg", titulo: "Gestión de Comunidad", texto: "Fidelizamos a tu audiencia respondiendo mensajes estratégicamente para transformar seguidores en clientes de pago." },
    { icon: "/landing/servicio9.svg", titulo: "Mantenimiento Integral", texto: "Tu web y tienda seguras 24/7. Actualizamos plugins, hacemos copias de seguridad y blindamos tu negocio contra ataques." },
    { icon: "/landing/servicio10.svg", titulo: "Google Ads y Agentes IA", texto: "Inyectamos tráfico de pago ultra-segmentado y ponemos un Typebot a captar contactos mientras tú duermes." }
];

const ServiciosRescate = () => {
    const carruselRef = useRef(null);

    // EFECTO: Bucle Infinito Real y Scroll Suave Horizontal
    useEffect(() => {
        const container = carruselRef.current;
        if (!container) return;

        let scrollInterval;

        const startAutoScroll = () => {
            scrollInterval = setInterval(() => {
                if (!container) return;

                const firstCard = container.querySelector('.servicio-card');
                if (!firstCard) return;

                const cardWidth = firstCard.offsetWidth + 30; // 30px es el gap
                const middlePoint = container.scrollWidth / 2;

                // Si hemos llegado a la mitad (donde empieza la lista clonada)
                if (container.scrollLeft >= middlePoint) {
                    // Salto invisible a la posición 0
                    container.style.scrollBehavior = 'auto';
                    container.scrollLeft = 0;
                    
                    // Un frame después, volvemos a poner animación
                    requestAnimationFrame(() => {
                        container.style.scrollBehavior = 'smooth';
                        container.scrollLeft += cardWidth;
                    });
                } else {
                    // Scroll normal hacia la derecha
                    container.style.scrollBehavior = 'smooth';
                    container.scrollLeft += cardWidth;
                }
            }, 5000); // Salta cada 5 segundos
        };

        startAutoScroll();

        // Pausar si el usuario mete el ratón
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

    // Funciones para las flechas manuales
    const scrollLeft = () => {
        if (carruselRef.current) {
            const firstCard = carruselRef.current.querySelector('.servicio-card');
            carruselRef.current.style.scrollBehavior = 'smooth';
            carruselRef.current.scrollLeft -= (firstCard.offsetWidth + 30);
        }
    };

    const scrollRight = () => {
        if (carruselRef.current) {
            const firstCard = carruselRef.current.querySelector('.servicio-card');
            carruselRef.current.style.scrollBehavior = 'smooth';
            carruselRef.current.scrollLeft += (firstCard.offsetWidth + 30);
        }
    };

    return (
        <section className="servicios-rescate-wrapper">
            <h2 className="servicios-title">Todo lo que podemos hacer para rescatar tu negocio</h2>
            
            <div className="carousel-controls-container">
                {/* Flecha Izquierda */}
                <button className="carousel-arrow" onClick={scrollLeft} aria-label="Anterior">
                    &#10094;
                </button>

                {/* Contenedor del Carrusel Horizontal */}
                <div className="horizontal-scroll-area" ref={carruselRef}>
                    {[...serviciosRescate, ...serviciosRescate].map((servicio, index) => (
                        <div className="servicio-card" key={index}>
                            <div className="servicio-icon">
                                <img src={servicio.icon} alt={servicio.titulo} />
                            </div>
                            <h3>{servicio.titulo}</h3>
                            <p>{servicio.texto}</p>
                        </div>
                    ))}
                </div>

                {/* Flecha Derecha */}
                <button className="carousel-arrow" onClick={scrollRight} aria-label="Siguiente">
                    &#10095;
                </button>
            </div>
        </section>
    );
};

export default ServiciosRescate;