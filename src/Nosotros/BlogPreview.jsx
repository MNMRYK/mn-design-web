import React, { useState, useEffect } from 'react';
import './BlogPreview.css';
import { SIZES_BLOG } from '../utils/imagenBlog';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Los 3 últimos artículos del blog (Astro, repo ../Blog-mndesignweb). El blog publica
// /blog/ultimos.json en cada build; antes se leía la API de WordPress. En localhost da 404: es normal.
const URL_ULTIMOS = 'https://mndesignweb.es/blog/ultimos.json';

const BlogPreview = () => {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerArticulos = async () => {
      try {
        const respuesta = await fetch(URL_ULTIMOS);
        if (!respuesta.ok) throw new Error(respuesta.status);
        setArticulos(await respuesta.json());
      } catch (error) {
        console.error('No se han podido cargar los artículos del blog:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerArticulos();
  }, []);

  const formatearFecha = (fechaIso) => {
    const opciones = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(fechaIso).toLocaleDateString('es-ES', opciones);
  };

  return (
    <motion.section
      className="blog-preview-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="blog-preview-container">

        {/* CABECERA */}
        <div className="blog-header">
            <div className="blog-intro">

                <div className="blog-top-row">
                    <h2 className="blog-title">Aprende y crece con nosotros</h2>
                    <a href="/blog/" className="btn-ver-blog">
                    Ver todos los artículos
                    </a>
                </div>
                <p className="blog-subtitle">
                    Descubre trucos, consejos y las últimas tendencias en diseño y desarrollo web para llevar tu proyecto al siguiente nivel.
                </p>
            </div>
        </div>

        {/* CUADRÍCULA CON LOS ÚLTIMOS ARTÍCULOS DEL BLOG */}
        <div className="blog-grid">
          {cargando ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Cargando los últimos artículos de MN Design Web...</p>
          ) : (
            articulos.map((articulo) => (
              <article key={articulo.url} className="blog-card">
                <div className="blog-card-img-wrapper">
                  <img src={articulo.imagen} sizes={SIZES_BLOG} width={articulo.imagenAncho} height={articulo.imagenAlto} loading="lazy" decoding="async" alt={articulo.imagenAlt || 'Portada del artículo'} className="blog-card-img" />
                  <span className="blog-badge">{articulo.categoria}</span>
                </div>
                <div className="blog-card-content">
                  <span className="blog-date">{formatearFecha(articulo.fecha)}</span>
                  <h3 className="blog-card-title">{articulo.titulo}</h3>
                  <a href={articulo.url} className="blog-read-more">
                    Leer artículo <ArrowRight size={16} />
                  </a>
                </div>
              </article>
            ))
          )}
        </div>

      </div>
    </motion.section>
  );
};

export default BlogPreview;
