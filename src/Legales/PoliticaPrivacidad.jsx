import React, { useEffect } from 'react';
import './TextosLegales.css'; 



const PoliticaPrivacidad = () => {
    
    useEffect(() => {
        // Esto fuerza a que el scroll esté siempre activo al entrar en esta página
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    }, []);

    return (
        <div className="legal-wrapper">
        
            <div className="legal-container">
                <h1 className="legal-title">Política de Privacidad</h1>

                <h2>1. INFORMACIÓN AL USUARIO</h2>
                <p>
                    <strong>MN Design Web</strong>, como responsable del tratamiento, le informa de que, conforme al RGPD y la LOPDGDD, trataremos sus datos personales tal y como reflejamos en la presente Política de Privacidad.
                </p>

                <h2>2. ¿QUIÉN ES EL RESPONSABLE DEL TRATAMIENTO?</h2>
                <ul>
                    <li><strong>Nombre Comercial:</strong> MN Design Web.</li>
                    <li><strong>Titular:</strong> María del Carmen Nadal Masiá.</li>
                    <li><strong>NIF/DNI:</strong> 21807729A</li>
                    <li><strong>Domicilio:</strong> Cocentaina, Alicante. 03820.</li>
                    <li><strong>Email:</strong> info@mndesignweb.es</li>
                </ul>

                <h2>3. ¿CON QUÉ FINALIDAD TRATAMOS SUS DATOS?</h2>
                <p>Tratamos los datos que nos facilita para:</p>
                <ul>
                    <li>Atender las solicitudes de información o presupuestos recibidas a través de nuestro formulario de contacto sobre servicios de Diseño Web, SEO y Gestión de Redes Sociales.</li>
                    <li>Enviar comunicaciones comerciales sobre nuestros servicios si usted nos da su consentimiento expreso.</li>
                </ul>

                <h2>4. ¿POR CUÁNTO TIEMPO CONSERVAREMOS LOS DATOS?</h2>
                <p>
                    Se conservarán durante no más tiempo del necesario para mantener el fin del tratamiento o mientras existan prescripciones legales que dicten su custodia.
                </p>

                <h2>5. LEGITIMACIÓN</h2>
                <p>
                    El tratamiento se basa en el consentimiento que se le solicita al marcar la casilla de aceptación de nuestra política de privacidad antes de enviar su consulta.
                </p>

                <h2>6. DERECHOS DEL USUARIO</h2>
                <p>Usted tiene derecho a:</p>
                <ul>
                    <li>Acceder, rectificar o suprimir sus datos personales.</li>
                    <li>Limitar su tratamiento o oponerse al mismo.</li>
                    <li>Presentar una reclamación ante la autoridad de control (aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.</li>
                </ul>
            </div>
        </div>
    );
};

export default PoliticaPrivacidad;