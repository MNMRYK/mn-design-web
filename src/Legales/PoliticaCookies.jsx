import React, { useEffect } from 'react';
import './TextosLegales.css'; // Usamos el mismo CSS para todo

const PoliticaCookies = () => {
    
    useEffect(() => {
        // Fuerza el scroll activo al entrar
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    }, []);

    return (
        <div className="legal-wrapper">
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
                </ul>

                <h2>3. DESACTIVACIÓN DE COOKIES</h2>
                <p>
                    Usted puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador:
                </p>
                <ul>
                    <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies y otros datos de sitios.</li>
                    <li><strong>Mozilla Firefox:</strong> Ajustes &gt; Privacidad y Seguridad &gt; Cookies y datos del sitio.</li>
                    <li><strong>Safari:</strong> Preferencias &gt; Privacidad.</li>
                </ul>

                <h2>4. MÁS INFORMACIÓN</h2>
                <p>
                    Para más información sobre el tratamiento de sus datos personales, puede consultar nuestra <a href="/privacidad">Política de Privacidad</a>.
                </p>
            </main>
        </div>
    );
};

export default PoliticaCookies;