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

        return () => { lenis.destroy(); };
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
                    <li>
                        <strong>Técnicas (necesarias):</strong> permiten que la web funcione y recuerdan tu decisión sobre las cookies. No necesitan tu consentimiento. Guardamos en el almacenamiento de tu navegador:
                        <ul>
                            <li><code>cookieConsent</code>: tu elección (todas aceptadas, todas rechazadas, solo Analítica o solo Marketing). Se mantiene hasta que la cambies o borres los datos del navegador.</li>
                            <li><code>cookieConsentVersion</code>: la versión del aviso con la que decidiste. Si cambiamos el aviso, te volvemos a preguntar.</li>
                        </ul>
                    </li>
                    <li><strong>Analítica:</strong> nos permiten saber cuántas personas visitan la web y cómo la usan, para mejorarla. Son las de Google Analytics y Microsoft Clarity.</li>
                    <li><strong>Marketing:</strong> nos permiten medir los resultados de nuestros anuncios y mostrarte publicidad de MN Design Web en otras webs y redes sociales. Son las del Píxel de Meta y las de remarketing de Google Ads.</li>
                </ul>

                <h2>3. COOKIES DE TERCEROS QUE UTILIZAMOS</h2>
                <p>
                    Las cookies de Analítica y de Marketing solo se instalan si las aceptas en el aviso de cookies, donde puedes aceptarlas todas, rechazarlas todas o elegir por categorías desde «Configurar». Puedes cambiar tu decisión en cualquier momento desde el enlace «Configurar cookies» del pie de página; si retiras una categoría, borramos sus cookies de esta web.
                </p>

                <h3>Microsoft Clarity (Analítica)</h3>
                <p>
                    Si aceptas las cookies de Analítica, usamos Microsoft Clarity, un servicio de Microsoft Corporation, para entender cómo se usa la web: mapas de calor, clics, desplazamiento y grabaciones anónimas de la sesión. Clarity no registra lo que escribes en los formularios. Las cookies principales son <code>_clck</code> (identifica al usuario de forma anónima, 1 año), <code>_clsk</code> (agrupa las páginas de una misma visita, 1 día), <code>CLID</code> (1 año), <code>MUID</code> (identificador de Microsoft, 1 año), <code>ANONCHK</code> (10 minutos), <code>MR</code> (7 días) y <code>SM</code> (sesión). Los datos pueden transferirse a Estados Unidos; Microsoft está adherida al Marco de Privacidad de Datos UE-EE. UU. Puedes retirar tu consentimiento en cualquier momento desde «Configurar cookies» o borrando las cookies del navegador. Más información: <a href="https://privacy.microsoft.com/es-es/privacystatement" target="_blank" rel="noopener noreferrer">https://privacy.microsoft.com/es-es/privacystatement</a>
                </p>

                <h3>Google Analytics (Analítica)</h3>
                <p>
                    Si aceptas las cookies de Analítica, usamos Google Analytics, un servicio de Google Ireland Limited, para saber cuántas personas visitan la web, de dónde llegan y qué páginas consultan. Las cookies son <code>_ga</code> (distingue a los usuarios de forma anónima, 2 años) y <code>_ga_&lt;ID&gt;</code> (mantiene el estado de la sesión, 2 años).
                </p>
                <p>
                    Si aceptas solo las cookies de Marketing, la etiqueta de Google se carga igualmente para Google Ads, pero Google Analytics funciona sin cookies: recibe datos básicos de la visita (por ejemplo, la página vista, el tipo de dispositivo o si se ha enviado un formulario) sin guardar nada en tu navegador ni usar identificadores que te reconozcan entre visitas.
                </p>
                <p>
                    Los datos pueden transferirse a Estados Unidos; Google está adherida al Marco de Privacidad de Datos UE-EE. UU. Puedes retirar tu consentimiento en cualquier momento desde «Configurar cookies» o borrando las cookies del navegador. Más información: <a href="https://policies.google.com/privacy?hl=es" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy?hl=es</a>
                </p>

                <h3>Google Ads (Marketing)</h3>
                <p>
                    Si aceptas las cookies de Marketing, la etiqueta de Google de esta web también envía información a Google Ads, un servicio de Google Ireland Limited, para medir qué visitas y contactos llegan desde nuestros anuncios y para mostrarte anuncios de MN Design Web cuando navegas por otras webs (remarketing). Las cookies son <code>_gcl_au</code> (mide las conversiones de los anuncios, 90 días), <code>IDE</code> (de doubleclick.net, para mostrar y medir anuncios de remarketing, 13 meses) y <code>test_cookie</code> (de doubleclick.net, comprueba si el navegador admite cookies, 15 minutos). Los datos pueden transferirse a Estados Unidos; Google está adherida al Marco de Privacidad de Datos UE-EE. UU. Puedes retirar tu consentimiento en cualquier momento desde «Configurar cookies» o borrando las cookies del navegador. Más información: <a href="https://policies.google.com/technologies/ads?hl=es" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads?hl=es</a>
                </p>

                <h3>Píxel de Meta (Marketing)</h3>
                <p>
                    Si aceptas las cookies de Marketing, usamos el Píxel de Meta, un servicio de Meta Platforms Ireland Limited, para medir los resultados de nuestros anuncios en Facebook e Instagram y mostrarlos a personas con intereses parecidos. Las cookies son <code>_fbp</code> (identifica el navegador para medir los anuncios, 90 días) y <code>fr</code> (cookie de Meta para mostrar y medir anuncios, 90 días).
                </p>
                <p>
                    Además, los eventos que mide el Píxel (visitas, envíos de formularios, reservas y clics en teléfono, WhatsApp o email) se envían a Meta también desde un servidor, a través de la API de Conversiones de Meta, para que la medición no dependa solo del navegador. Este envío solo se produce si has aceptado las cookies de Marketing.
                </p>
                <p>
                    Los datos pueden transferirse a Estados Unidos; Meta está adherida al Marco de Privacidad de Datos UE-EE. UU. Puedes retirar tu consentimiento en cualquier momento desde «Configurar cookies» o borrando las cookies del navegador. Más información: <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">https://www.facebook.com/privacy/policy/</a>
                </p>

                <h3>Calendario de reservas (Cal.com)</h3>
                <p>
                    Para reservar una llamada usamos el calendario de Cal.com, un servicio de Cal.com, Inc., que se muestra dentro de algunas páginas. Al cargarse, Cal.com usa la cookie técnica <code>__cf_bm</code> (de Cloudflare, protege el calendario frente a bots, 30 minutos) y guarda en tu navegador los datos técnicos necesarios para completar la reserva. También envía informes de errores técnicos a Sentry (Functional Software, Inc.) para que el calendario funcione correctamente. Cal.com no usa en nuestra web cookies de analítica ni de publicidad. Los datos pueden transferirse a Estados Unidos. Más información: <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer">https://cal.com/privacy</a>
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