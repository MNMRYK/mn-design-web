import React from 'react';
import './FooterLanding.css';

const FooterLanding = () => {
    return (
        <footer className="footer-minimal">
            <div className="footer-content">
                {/* IZQUIERDA: Contacto */}
                <div className="footer-section footer-contact">
                    <a href="tel:+34645854934" className="correo-gigante">
                        + 34 645 854 934
                    </a>
                    <a href="mailto:info@mndesignweb.es" className="correo-gigante">
                        info@mndesignweb.es
                    </a>
                </div>

                {/* CENTRO: Políticas */}
                <div className="footer-section footer-links">
                    <a href="/aviso-legal">Aviso Legal</a>
                    <a href="/privacidad">Privacidad</a>
                    <a href="/cookies">Cookies</a>
                </div>

                {/* DERECHA: Copyright */}
                <div className="footer-section footer-copyright">
                    <p>© 2026 MN Design Web. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default FooterLanding;