import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        {/* 1. TÍTULO: Animación nativa CSS */}
        <h1 className="hero-title animate-fade-up">
          Arquitectura Web <br />
          <span className="ampersand">&</span> <br />
          Estrategia Digital
        </h1>

        {/* 2. SUBTÍTULO: Aparece el último */}
        <p className="hero-subtitle animate-fade-in-delayed">
          Creamos experiencias digitales de alto rendimiento enfocadas en
          convertir visitantes en clientes.
        </p>

        {/* 3. BOTONES: Aparecen después del título */}
        <div className="hero-buttons animate-fade-up-delayed">
          <a href="/contacto#calendario-reserva" className="btn-empezar">
            Empezar proyecto
          </a>

          <a href="/rescate-kit-digital" className="btn-varios">
            Rescate Kit Digital
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
