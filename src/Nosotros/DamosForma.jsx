import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack'; 
import TrueFocus from './TrueFocus'; 
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import './DamosForma.css';
import aniAnalitica from '../assets/animations/analitica4.json';
import aniGestion from '../assets/animations/gestion.json';
import aniDiseño from '../assets/animations/diseno-de-interfaz-de-usuario.json';
import aniDinero from '../assets/animations/analitica5.json';
import aniProteccion from '../assets/animations/proteccion.json';

const items = [
    {
    titulo: 'Diagnóstico de Negocio',
    desc: 'Para optimizar los resultados de tu marca, realizamos un asesoramiento personalizado desde la primera toma de contacto. Aplicamos una serie de pautas y preguntas estratégicas diseñadas para entender el alma de tu negocio. A través de este proceso, averiguamos qué es lo que realmente necesitas —ya sea una web corporativa, un sistema de reservas integrado o una tienda online— para que cada clic se traduzca en beneficio para ti.',
    animation: aniAnalitica
  },
  {
    titulo: 'Identidad Blindada',
    desc: 'En nuestra agencia, no utilizamos plantillas genéricas que limitan el crecimiento de tu marca. Creemos que cada proyecto merece una identidad visual auténtica que respire los valores de tu negocio. Diseñamos desde cero para garantizar coherencia estética, logrando que tu sitio no solo destaque, sino que transmita la profesionalidad necesaria para que tus clientes te elijan sin dudarlo.',
    animation: aniProteccion
  },
  {
    titulo: 'Diseño de Alto Impacto',
    desc: 'Para nosotros, tu opinión es el motor del diseño. No improvisamos: trabajamos de la mano contigo desarrollando varios sketches y bocetos previos. Este proceso nos permite experimentar y ajustar cada detalle antes de la fase final, asegurándonos de que el resultado sea totalmente fiel a lo que habías imaginado.',
    animation: aniDiseño
  },
  {
    titulo: 'Contenido que Convierte',
    desc: 'Para lograr esta excelencia, trabajamos en equipo. Mientras nosotros ponemos la magia del diseño y la estructura, necesitamos que tú nos proporciones una base de contenido sólida (textos, ideas clave y materiales de tu negocio). Con ese punto de partida, nosotros transformamos la información en una experiencia digital de alto impacto.',
    animation: aniDinero
  },
  {
    titulo: 'Éxito Sin Interrupciones',
    desc: 'Te guiaremos de la mano durante todo el estructuramiento de la web. Desde la organización de las secciones hasta la jerarquía de los textos, te ayudaremos a dar forma a la base de contenido necesaria para que tu sitio sea lógico, intuitivo y profesional. Tú pones la esencia de tu negocio y nosotros la convertimos en una herramienta digital que trabaja para ti las 24 horas.',
    animation: aniGestion,
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
                stackPosition="15%"        // Un poco más abajo para que se vea mejor
                baseScale={0.7}            // Subimos un pelo la escala para que sean legibles las de atrás
                blurAmount={0}             // He puesto el blur a 0 para que la última sea "bien legible" como pedías
                useWindowScroll={true}
            >
                {items.map((item, index) => {
                    // 🪄 Lógica para separar la última palabra
                    const words = item.titulo.split(' ');
                    const lastWord = words.pop();
                    const mainTitle = words.join(' ');

                    return (
                        <ScrollStackItem key={index} itemClassName={`mn-stack-card ${item.isFinal ? 'final-card' : ''}`}>
                            <div className="card-inner">
                                <div className="card-text">
                                    <h3 className="card-title-dynamic">
                                        {mainTitle} <span className="title-gradient">{lastWord}</span>
                                    </h3>
                                    <p>{item.desc}</p>
                                    {item.isFinal && (
                                        <Link to="/contacto#calendario-reserva" className="cta-stack btn-empezar-final">
                                            ¡EMPECEMOS YA!
                                        </Link>
                                    )}
                                </div>
                                <div className="card-image lottie-container">
                                    {/* 🔥 LA MAGIA OCURRE AQUÍ 🔥 */}
                                    {item.animation ? (
                                        <Player
                                            autoplay
                                            loop
                                            src={item.animation}
                                            className="lottie-icon"
                                        />
                                    ) : (
                                        item.img ? <img src={item.img} alt={item.titulo} className="lottie-icon" /> : null
                                    )}
                                </div>
                            </div>
                        </ScrollStackItem>
                    );
                })}
            </ScrollStack>
        </section>
    );
};

export default DamosForma;