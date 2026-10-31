import React from "react";
import { motion } from "framer-motion";
import "./Creativos.css";

// Los clics en cal.com y wa.me se miden solos en index.html (click_reserva / click_whatsapp).
const RESERVA = "https://cal.com/mndesignweb/reunion-30-min";
const WHATSAPP =
  "https://wa.me/34645854934?text=" +
  encodeURIComponent("¡Hola! Vengo de vuestra web y me gustaría pedir información.");

// Llamada final de /redes-sociales/ y /branding/ (tarjeta oscura con el degradado de la web).
// El hueco de imagen del diseño está pendiente: mientras no haya imagen, solo va el texto.
const CtaCreativos = ({ texto }) => (
  <section className="creativos-seccion creativos-seccion--cta" aria-labelledby="cta-creativos-titulo">
    <motion.div
      className="creativos-tarjeta-oscura cta-creativos tema-oscuro"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 id="cta-creativos-titulo" className="cta-creativos-titulo">
        Cuéntanos qué necesita <span>tu negocio</span>
      </h2>
      <p className="cta-creativos-texto">
        {texto} Te respondemos en menos de 24 h laborables.
      </p>
      <div className="cta-creativos-botones">
        <a href={RESERVA} target="_blank" rel="noopener noreferrer" className="creativos-boton creativos-boton--claro">
          Reservar videollamada
        </a>
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="creativos-boton creativos-boton--contorno-claro">
          Escribir por WhatsApp
        </a>
      </div>
    </motion.div>
  </section>
);

export default CtaCreativos;
