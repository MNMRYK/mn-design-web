import React, { useEffect } from 'react';
import './TextosLegales.css'; // Usamos el mismo CSS para todo

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Seo from "../seo/Seo";
import { crearLenis } from "../utils/lenis";

const PoliticaCookies = () => {
    
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const lenis = crearLenis({ 
        duration: 1.2, 
        smoothWheel: true,
        smoothTouch: false,
        syncTouch: true,

        prevent: (node) => {
            if (!node || !node.closest) return false;
            return node.nodeName.includes('TYPEBOT') || node.closest('typebot-bubble') !== null;
        }
        });

        return () => { ScrollTrigger.getAll().forEach(t => t.kill()); lenis.destroy(); };
    }, []);

    return (
        <div className="legal-wrapper">
            <Seo
              ruta="/cookies/"
              titulo="Política de Cookies | MN Design Web"
              descripcion="Qué son las cookies, qué tipos utiliza la web de MN Design Web y cómo puedes desactivarlas o eliminarlas desde la configuración de tu navegador."
            />
            <main className="legal-container">
                <h1 className="legal-title">Política de Cookies</h1>

                <h2>1. ¿QUÉ SON LAS COOKIES?</h2>
                <p>
                    Una cookie es un pequeño archivo de texto que se descarga en su equipo al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo.
                </p>

                <h2>2. ¿QUÉ TIPOS DE COOKIES UTILIZA ESTA WEB?</h2>
                <ul>
                    <li><strong>Cookies Técnicas:</strong> Son aquellas necesarias para el correcto funcionamiento de la web, como las que permiten el control del tráfico y la comunicación de datos.</li>
                    <li><strong>Cookies de Personalización:</strong> Permiten al usuario acceder al servicio con algunas características de carácter general predefinidas (por ejemplo, el idioma).</li>
                    <li><strong>Cookies de Análisis:</strong> Son aquellas que nos permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado.</li>
                    <li><strong>Cookies publicitarias:</strong> permiten medir la eficacia de nuestros anuncios y mostrar publicidad relacionada con tus intereses en otras webs y redes sociales.</li>
                </ul>

                <h2>3. COOKIES DE TERCEROS QUE UTILIZAMOS</h2>
                <p>
                    Estas cookies solo se instalan si las aceptas en el aviso de cookies. Puedes cambiar tu decisión en cualquier momento desde el enlace «Configurar cookies» del pie de página.
                </p>

                <h3>Microsoft Clarity (cookies de análisis)</h3>
                <p>
                    Si aceptas las cookies, usamos Microsoft Clarity, un servicio de Microsoft Corporation, para entender cómo se usa la web: mapas de calor, clics, desplazamiento y grabaciones anónimas de la sesión. Clarity no registra lo que escribes en los formularios. Las cookies principales son <code>_clck</code> (identifica al usuario de forma anónima, 1 año), <code>_clsk</code> (agrupa las páginas de una misma visita, 1 día), <code>CLID</code> (1 año), <code>MUID</code> (identificador de Microsoft, 1 año), <code>ANONCHK</code> (10 minutos), <code>MR</code> (7 días) y <code>SM</code> (sesión). Los datos pueden transferirse a Estados Unidos; Microsoft está adherida al Marco de Privacidad de Datos UE-EE. UU. Puedes retirar tu consentimiento en cualquier momento borrando las cookies del navegador. Más información: <a href="https://privacy.microsoft.com/es-es/privacystatement" target="_blank" rel="noopener noreferrer">https://privacy.microsoft.com/es-es/privacystatement</a>
                </p>

                <h3>Google Analytics (cookies de análisis)</h3>
                <p>
                    Si aceptas las cookies, usamos Google Analytics, un servicio de Google Ireland Limited, para saber cuántas personas visitan la web, de dónde llegan y qué páginas consultan. Las cookies son <code>_ga</code> (distingue a los usuarios de forma anónima, 2 años) y <code>_ga_&lt;ID&gt;</code> (mantiene el estado de la sesión, 2 años). Los datos pueden transferirse a Estados Unidos; Google está adherida al Marco de Privacidad de Datos UE-EE. UU. Puedes retirar tu consentimiento en cualquier momento desde «Configurar cookies» o borrando las cookies del navegador. Más información: <a href="https://policies.google.com/privacy?hl=es" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy?hl=es</a>
                </p>

                <h3>Píxel de Meta (cookies publicitarias)</h3>
                <p>
                    Si aceptas las cookies, usamos el Píxel de Meta, un servicio de Meta Platforms Ireland Limited, para medir los resultados de nuestros anuncios en Facebook e Instagram y mostrarlos a personas con intereses parecidos. Las cookies son <code>_fbp</code> (identifica el navegador para medir los anuncios, 90 días) y <code>fr</code> (cookie de Meta para mostrar y medir anuncios, 90 días). Los datos pueden transferirse a Estados Unidos; Meta está adherida al Marco de Privacidad de Datos UE-EE. UU. Puedes retirar tu consentimiento en cualquier momento desde «Configurar cookies» o borrando las cookies del navegador. Más información: <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">https://www.facebook.com/privacy/policy/</a>
                </p>

                <h2>4. DESACTIVACIÓN DE COOKIES</h2>
                <p>
                    Usted puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador:
                </p>
                <ul>
                    <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
                    <li><strong>Mozilla Firefox:</strong> Ajustes &gt; Privacidad y Seguridad &gt; Cookies y datos del sitio.</li>
                    <li><strong>Safari:</strong> Preferencias &gt; Privacidad.</li>
                </ul>

                <h2>5. MÁS INFORMACIÓN</h2>
                <p>
                    Para más información sobre el tratamiento de sus datos personales, puede consultar nuestra <a href="/privacidad/">Política de Privacidad</a>.
                </p>
            </main>
        </div>
    );
};

export default PoliticaCookies;