import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ResenasGoogle.css";
import Icono from "../utils/Icono";
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
        {r.logo ? (
          // Logo del negocio: mismo tamaño y estilo que los avatares (1174 × 1185 px)
          <img
            src={r.logo.src}
            width="96"
            height="97"
            loading="lazy"
            decoding="async"
            alt={r.logo.alt}
            className="resena-avatar resena-avatar--logo"
          />
        ) : r.foto ? (
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

// Con "reducir movimiento", el desplazamiento de las flechas es instantáneo
const comportamiento = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

// ¿El carrusel ha llegado al final?
const alFinalRef = (el) => el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;

const ResenasGoogle = ({
  ids = ["sara", "alinea", "lara", "miriam", "damaris", "nutrimente"],
  etiqueta = "Reseñas",
  titulo = "Lo que dicen quienes ya",
  tituloColor = "han trabajado con nosotros",
  destacada = false,
}) => {
  const lista = ids.map((id) => RESENAS[id]).filter(Boolean);
  const unica = lista.length === 1;
  const listaRef = useRef(null);
  // Carrusel (solo cuando las tarjetas no caben y la lista se desplaza en horizontal: en móvil;
  // en tablet y escritorio es una rejilla con todas a la vista y no hay flechas)
  const [carrusel, setCarrusel] = useState(false);
  const [actual, setActual] = useState(0);
  const [alPrincipio, setAlPrincipio] = useState(true);
  const [alFinal, setAlFinal] = useState(false);

  const medir = useCallback(() => {
    const el = listaRef.current;
    if (!el) return;
    const desborda = el.scrollWidth > el.clientWidth + 2;
    setCarrusel(desborda);
    if (!desborda) return;
    setAlPrincipio(el.scrollLeft <= 2);
    setAlFinal(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    // Tarjeta actual: la que más cerca tiene su borde izquierdo del inicio de la zona visible
    const inicio = el.getBoundingClientRect().left + parseFloat(getComputedStyle(el).scrollPaddingLeft || 0);
    const items = [...el.children];
    let mejor = 0;
    items.forEach((li, i) => {
      if (Math.abs(li.getBoundingClientRect().left - inicio) < Math.abs(items[mejor].getBoundingClientRect().left - inicio)) mejor = i;
    });
    setActual(alFinalRef(el) ? items.length - 1 : mejor);
  }, []);

  useEffect(() => {
    const el = listaRef.current;
    if (!el || unica) return undefined;
    medir();
    let pendiente = false;
    const alDesplazar = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        pendiente = false;
        medir();
      });
    };
    el.addEventListener("scroll", alDesplazar, { passive: true });
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(medir) : null;
    ro?.observe(el);
    window.addEventListener("resize", medir);
    return () => {
      el.removeEventListener("scroll", alDesplazar);
      ro?.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, [medir, unica]);

  // Una tarjeta exacta por clic: ancho de la tarjeta + hueco entre tarjetas
  const pasar = (dir) => {
    const el = listaRef.current;
    const item = el?.children[0];
    if (!item) return;
    const hueco = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (item.getBoundingClientRect().width + hueco), behavior: comportamiento() });
  };

  const irA = (i) => {
    const el = listaRef.current;
    const item = el?.children[i];
    if (!item) return;
    const destino = item.offsetLeft - el.children[0].offsetLeft;
    el.scrollTo({ left: destino, behavior: comportamiento() });
  };
  return (
    <section className={`resenas-seccion${unica ? " resenas-seccion--unica" : ""}`} aria-labelledby="resenas-titulo">
      <div className="resenas-encabezado">
        <p className="resenas-etiqueta">{etiqueta}</p>
        <h2 id="resenas-titulo" className="resenas-titulo">
          {titulo} <span>{tituloColor}</span>
        </h2>
      </div>
      <ul className="resenas-lista" aria-label="Reseñas de clientes" ref={listaRef}>
        {lista.map((r, i) => (
          <Tarjeta key={r.nombre} r={r} corta={!unica} destacada={destacada && !unica && i === 0} />
        ))}
      </ul>
      {carrusel && (
        <div className="resenas-controles">
          <button
            type="button"
            className="resenas-flecha"
            aria-label="Reseña anterior"
            onClick={() => pasar(-1)}
            disabled={alPrincipio}
          >
            <Icono nombre="arrow-left" />
          </button>
          <div className="resenas-puntos">
            {lista.map((r, i) => (
              <button
                key={r.nombre}
                type="button"
                className="resenas-punto"
                aria-label={`Ir a la reseña ${i + 1} de ${lista.length}`}
                aria-current={i === actual ? "true" : undefined}
                onClick={() => irA(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="resenas-flecha"
            aria-label="Reseña siguiente"
            onClick={() => pasar(1)}
            disabled={alFinal}
          >
            <Icono nombre="arrow-right" />
          </button>
        </div>
      )}
      <div className="resenas-pie">
        <a href={GOOGLE_RESENAS} target="_blank" rel="noopener" className="resenas-boton">
          Ver todas las reseñas en Google
        </a>
      </div>
    </section>
  );
};

export default ResenasGoogle;
