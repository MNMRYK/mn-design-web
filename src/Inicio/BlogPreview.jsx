import React, { useState, useEffect } from 'react';
import '../Nosotros/BlogPreview.css';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react'; 

const BlogPreview = () => {
  // 1. Preparamos el estado para guardar tus artículos reales
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 2. Nos conectamos a tu WordPress al cargar la sección
  useEffect(() => {
    const obtenerArticulos = async () => {
      try {
        // 🔥 Esta es la URL mágica de tu WP que trae los 3 últimos posts con sus imágenes (embed)
        const respuesta = await fetch('https://blog.mndesignweb.es/wp-json/wp/v2/posts?_embed&per_page=3');
        const datos = await respuesta.json();
        setArticulos(datos);
        setCargando(false);
      } catch (error) {
        console.error("Oops, error al conectar con WordPress:", error);
        setCargando(false);
      }
    };

    obtenerArticulos();
  }, []);

  // Función para formatear la fecha que nos devuelve WordPress
  const formatearFecha = (fechaIso) => {
    const opciones = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(fechaIso).toLocaleDateString('es-ES', opciones);
  };

  return (
    /* 🔥 Cambiamos section por motion.section y aplicamos tu animación 🔥 */
    <motion.section 
      className="blog-preview-section-inicio"
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
                    <a href="https://blog.mndesignweb.es/" target="_blank" rel="noopener noreferrer" className="btn-ver-blog">
                    Ver todos los artículos
                    </a>
                </div>
                <p className="blog-subtitle">
                    Descubre trucos, consejos y las últimas tendencias en diseño y desarrollo web para llevar tu proyecto al siguiente nivel.
                </p>
            </div>
        </div>

        {/* CUADRÍCULA DINÁMICA CON DATOS DE WORDPRESS */}
        <div className="blog-grid">
          {cargando ? (
            <p style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Cargando los últimos artículos de MN Design Web...</p>
          ) : (
            articulos.map((articulo) => {
              const imagenDestacada = articulo._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/600x400?text=MN+Design+Web';
              const nombreCategoria = articulo._embedded?.['wp:term']?.[0]?.[0]?.name || 'Blog';

              return (
                <article key={articulo.id} className="blog-card">
                  <div className="blog-card-img-wrapper">
                    <img src={imagenDestacada} alt="Portada del artículo" className="blog-card-img" />
                    <span className="blog-badge">{nombreCategoria}</span>
                  </div>
                  <div className="blog-card-content">
                    <span className="blog-date">{formatearFecha(articulo.date)}</span>
                    <h3 
                      className="blog-card-title" 
                      dangerouslySetInnerHTML={{ __html: articulo.title.rendered }} 
                    />
                    <a href={articulo.link} target="_blank" rel="noopener noreferrer" className="blog-read-more">
                      Leer artículo <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              );
            })
          )}
        </div>

      </div>
    </motion.section>
  );
};

export default BlogPreview;