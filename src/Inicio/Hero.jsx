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
          Agencia de diseño <br />
          <span className="ampersand">y</span> <br />
          desarrollo web
        </h1>

        {/* 2. SUBTÍTULO: Aparece el último */}
        <p className="hero-subtitle animate-fade-in-delayed">
          Arquitectura web y estrategia digital: diseñamos webs a medida, tiendas
          online y software para empresas de toda España.
        </p>

        {/* 3. BOTONES: Aparecen después del título */}
        <div className="hero-buttons animate-fade-up-delayed">
          <a href="/contacto/#calendario-reserva" className="btn-empezar">
            Empezar proyecto
          </a>

          <a href="https://mndesignweb.es/clinicas/" className="btn-varios">
            Software Portal Clínico
          </a>
        </div>

        {/* Enlace discreto a la landing local: las búsquedas con ciudad son de /alcoi/ */}
        <a href="/alcoi/" className="hero-enlace-local animate-fade-in-delayed">
          ¿Buscas una agencia de diseño web en Alcoy?
        </a>
      </div>
    </section>
  );
};

export default Hero;
