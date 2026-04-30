import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import TrueFocus from './TrueFocus';
import './DamosForma.css';

const items = [
    {
    titulo: 'Pautas para encontrar tu verdadera necesidad',
    desc: 'Para optimizar los resultados de tu marca, realizamos un asesoramiento personalizado desde la primera toma de contacto. Aplicamos una serie de pautas y preguntas estratégicas diseñadas para entender el alma de tu negocio. A través de este proceso, averiguamos qué es lo que realmente necesitas —ya sea una web corporativa, un sistema de reservas integrado o una tienda online— para que cada clic se traduzca en beneficio para ti.',
    img: '/img/seo-growth.png' // Imagen de la mano robótica o métricas
  },
  {
    titulo: 'Personalidad Propia',
    desc: 'En nuestra agencia, no somos partidarios de utilizar plantillas genéricas que limitan tu marca. Creemos que cada proyecto merece una identidad visual auténtica que respire los valores de tu negocio.',
    img: '/img/cerebro-digital.png' // Imagen del cerebro o circuitos
  },
  {
    titulo: 'Diseño fiel a tu visión',
    desc: 'Para nosotros, tu opinión es el motor del diseño. No improvisamos: trabajamos de la mano contigo desarrollando varios sketches y bocetos previos. Este proceso nos permite experimentar y ajustar cada detalle antes de la fase final, asegurándonos de que el resultado sea totalmente fiel a lo que habías imaginado.',
    img: '/img/diseno-ui.png' // Imagen del móvil con gráficas
  },
  {
    titulo: 'Colaboración y Contenido',
    desc: 'Para lograr esta excelencia, trabajamos en equipo. Mientras nosotros ponemos la magia del diseño y la estructura, necesitamos que tú nos proporciones una base de contenido sólida (textos, ideas clave y materiales de tu negocio). Con ese punto de partida, nosotros transformamos la información en una experiencia digital de alto impacto.',
    img: '/img/laptop-neon.png' // Tu imagen favorita "Sin título.jpg"
  },
  {
    titulo: 'Acompañamiento en todo el proceso',
    desc: 'Te guiaremos de la mano durante todo el estructuramiento de la web. Desde la organización de las secciones hasta la jerarquía de los textos, te ayudaremos a dar forma a la base de contenido necesaria para que tu sitio sea lógico, intuitivo y profesional. Tú pones la esencia de tu negocio y nosotros la convertimos en una herramienta digital que trabaja para ti las 24 horas.',
    img: '/img/rocket-final.png', // Algún icono de éxito o cohete
    isFinal: true
  }
];

const DamosForma = () => {
    return (
        <section className="damos-forma-section">
            <div className="damos-forma-header">
                <TrueFocus 
                    sentence="DAMOS FORMA A TU IDEA"
                    manualMode={false}
                    blurAmount={5}
                    borderColor="#a672ff" // He puesto tu lila para que combine
                    glowColor="rgba(166, 114, 255, 0.6)"
                    animationDuration={0.5}
                    pauseBetweenAnimations={1}
                />
            </div>

            <ScrollStack 
                itemDistance={150}         // 🔥 Bajamos esto para reducir el espacio final
                itemStackDistance={45}     // 🔥 Subimos de 20 a 45 para que se vean bien los escalones entre cartas
                stackPosition="20%"        // Un poco más abajo para que se vea mejor
                baseScale={0.7}            // Subimos un pelo la escala para que sean legibles las de atrás
                blurAmount={0}             // He puesto el blur a 0 para que la última sea "bien legible" como pedías
                useWindowScroll={true}
            >
                {items.map((item, index) => (
                    /* He cambiado la key a 'index' ya que quitaste los IDs */
                    <ScrollStackItem key={index} itemClassName={`mn-stack-card ${item.isFinal ? 'final-card' : ''}`}>
                        <div className="card-inner">
                            <div className="card-text">
                                {/* He quitado el span del número si ya no lo quieres ver */}
                                <h3>{item.titulo}</h3>
                                <p>{item.desc}</p>
                                {item.isFinal && <button className="cta-stack">¡EMPECEMOS YA!</button>}
                            </div>
                            <div className="card-image">
                                <img src={item.img} alt={item.titulo} />
                            </div>
                        </div>
                    </ScrollStackItem>
                ))}
            </ScrollStack>
        </section>
    );
};

export default DamosForma;