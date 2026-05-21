import React, { useEffect } from 'react';
import './TextosLegales.css';

const AvisoLegal = () => {
    
    useEffect(() => {
        // Fuerza el scroll activo al entrar
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    }, []);

    return (
        <div className="legal-wrapper">
            <main className="legal-container">
                <h1 className="legal-title">Aviso Legal</h1>

                <h2>1. DATOS IDENTIFICATIVOS</h2>
                <p>
                    En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos:
                </p>

                <h2>2. ¿QUIÉN ES EL RESPONSABLE DEL TRATAMIENTO?</h2>
                <ul>
                    <li><strong>Nombre Comercial:</strong> MN Design Web.</li>
                    <li><strong>Titular:</strong> María del Carmen Nadal Masiá.</li>
                    <li><strong>NIF/DNI:</strong> 218007729A</li>
                    <li><strong>Domicilio:</strong> Cocentaina, Alicante. 03820.</li>
                    <li><strong>Email:</strong> info@mndesignweb.es</li>
                </ul>

                <h2>3. USUARIOS</h2>
                <p>
                    El acceso y/o uso de este portal de <strong>MN Design Web</strong> atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.
                </p>

                <h2>4. USO DEL PORTAL</h2>
                <p>
                    MN Design Web proporciona el acceso a multitud de informaciones, servicios o datos en Internet pertenecientes a sus licenciantes a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal.
                </p>

                <h2>5. PROPIEDAD INTELECTUAL E INDUSTRIAL</h2>
                <p>
                    MN Design Web, por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, etc.), titularidad de MN Design Web o bien de sus licenciantes. Todos los derechos reservados.
                </p>

                <h2>6. EXCLUSIÓN DE GARANTÍAS Y RESPONSABILIDAD</h2>
                <p>
                    MN Design Web no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
                </p>

                <h2>7. MODIFICACIONES</h2>
                <p>
                    MN Design Web se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
                </p>
            </main>
        </div>
    );
};

export default AvisoLegal;