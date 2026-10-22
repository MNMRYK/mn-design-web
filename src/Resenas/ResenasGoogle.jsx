import React from "react";
import "./ResenasGoogle.css";
import { RESENAS, GOOGLE_RESENAS } from "./resenas";

// Reseñas reales (ver resenas.js). Sin schema Review ni aggregateRating.
// ids: qué reseñas y en qué orden. destacada: la primera ocupa dos columnas (solo con varias).
const Estrellas = () => (
  <span className="resena-estrellas" role="img" aria-label="5 de 5 estrellas">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.9z" />
      </svg>
    ))}
  </span>
);

const Comillas = () => (
  <span className="resena-comillas" aria-hidden="true">
    <svg viewBox="0 0 24 24"><path d="M9.6 6C6.4 7.4 4.5 10 4.5 13.4V18h6v-6H7.6c.2-1.9 1.3-3.3 3.2-4.2L9.6 6zm9 0c-3.2 1.4-5.1 4-5.1 7.4V18h6v-6h-2.9c.2-1.9 1.3-3.3 3.2-4.2L18.6 6z" /></svg>
  </span>
);

const Tarjeta = ({ r, destacada, corta }) => (
  <li className={`resena-item${destacada ? " resena-item--destacada" : ""}`}>
    <figure className="resena-tarjeta">
      <div className="resena-cabecera">
        {r.google ? <Estrellas /> : <Comillas />}
        <span className="resena-pildora">
          {r.google && <img src="/opiniones/google.webp" width="96" height="96" loading="lazy" decoding="async" alt="" />}
          {r.google ? "Reseña de Google" : "Cliente"}
        </span>
      </div>
      <blockquote className="resena-texto">«{corta && r.textoCorto ? r.textoCorto : r.texto}»</blockquote>
      <figcaption className="resena-autor">
        {r.foto ? (
          <img
            src={r.foto}
            srcSet={r.foto.includes("lara") ? `${r.foto} 1x, ${r.foto.replace(".webp", "@2x.webp")} 2x` : undefined}
            width="96"
            height="96"
            loading="lazy"
            decoding="async"
            alt=""
            className={`resena-avatar${r.google ? "" : " resena-avatar--logo"}`}
          />
        ) : (
          <span className="resena-avatar resena-avatar--inicial" aria-hidden="true">{r.nombre.charAt(0)}</span>
        )}
        <span>
          <span className="resena-nombre">{r.nombre}</span>
          {r.detalle && <span className="resena-detalle">{r.detalle}</span>}
        </span>
      </figcaption>
    </figure>
  </li>
);

const ResenasGoogle = ({
  ids = ["sara", "lara", "miriam", "damaris", "nutrimente"],
  etiqueta = "Reseñas",
  titulo = "Lo que dicen quienes ya",
  tituloColor = "han trabajado con nosotros",
  destacada = true,
}) => {
  const lista = ids.map((id) => RESENAS[id]).filter(Boolean);
  const unica = lista.length === 1;
  return (
    <section className={`resenas-seccion${unica ? " resenas-seccion--unica" : ""}`} aria-labelledby="resenas-titulo">
      <div className="resenas-encabezado">
        <p className="resenas-etiqueta">{etiqueta}</p>
        <h2 id="resenas-titulo" className="resenas-titulo">
          {titulo} <span>{tituloColor}</span>
        </h2>
      </div>
      <ul className="resenas-lista" aria-label="Reseñas de clientes">
        {lista.map((r, i) => (
          <Tarjeta key={r.nombre} r={r} corta={!unica} destacada={destacada && !unica && i === 0} />
        ))}
      </ul>
      <div className="resenas-pie">
        <a href={GOOGLE_RESENAS} target="_blank" rel="noopener" className="resenas-boton">
          Ver todas las reseñas en Google
        </a>
      </div>
    </section>
  );
};

export default ResenasGoogle;
