import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createLayout, stagger, random } from 'animejs';
import './PortfolioSiguiente.css';

const PortfolioSiguiente = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Lógica de separación de código en colores
    const keywordSet = /^(const|let|var|function|return|if|else|for|while|new|this|true|false|null|undefined|async|await|import|export|from|class|extends)$/;
    const tokenRegex = /(['"`])(?:\\.|[^\\])*?\1|[a-zA-Z_$][a-zA-Z0-9_$]*|\s+|[^a-zA-Z_$'"`\s]+/g;

    const highlightCode = (el) => {
      const code = el.textContent;
      const tokens = code.match(tokenRegex) || [];
      const counts = {};
      let html = '';
      
      for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        if (/^\s+$/.test(t)) {
          html += t;
          continue;
        }
        counts[t] = (counts[t] || 0) + 1;
        const dataAttr = `data-layout-id="${t}-${counts[t]}"`;
        
        if (/^['"`]/.test(t)) {
          html += `<span class="str" ${dataAttr}>${t}</span>`;
        } else if (/^[a-zA-Z_$]/.test(t)) {
          const rest = tokens.slice(i + 1).join('').trimStart();
          const isFunction = rest.startsWith('(');
          const cls = keywordSet.test(t) ? 'kw' : isFunction ? 'fn' : 'var';
          html += `<span class="${cls}" ${dataAttr}>${t}</span>`;
        } else {
          html += `<span class="op" ${dataAttr}>${t}</span>`;
        }
      }
      el.innerHTML = html;
    };

    // Aplicar los colores a los bloques de código
    const codeBlocks = containerRef.current.querySelectorAll('code');
    codeBlocks.forEach(highlightCode);

    // Inicializar el efecto de explosión de AnimeJS
    const layout = createLayout(containerRef.current, {
      loop: true,
      alternate: true,
      loopDelay: 500,
      duration: 1000,
      delay: 150,
      ease: 'inOutExpo',
      enterFrom: {
        opacity: 0,
        duration: 1250,
        delay: 100,
      },
      leaveTo: {
        opacity: 0,
        transform: () => `translate(${random(-50, 50)}px, ${random(-200, 200)}px) rotate(${random(-30, 30)}deg)`,
        duration: 750,
        delay: stagger([0, 200], { from: 'random' }),
        ease: 'out(3)'
      }
    });

    // Arrancar la animación
    document.fonts.ready.then(() => {
        layout.update(({ root }) => root.classList.toggle('show-animejs'));
    });

  }, []);

  return (
    <section className="portfolio-mantenimiento tema-oscuro">
      
      <div className="portfolio-header">
        <h1>Cocinando algo increíble...</h1>
        <p>Mi portafolio completo estará disponible muy pronto.</p>
      </div>

      <div className="animation-wrapper">
        <div className="container" ref={containerRef}>
          <pre className="waapi">
<code>
{`/* Arquitectura MN Design */

document.querySelectorAll('.proyecto').forEach(($el, i) => {
  el.animate({
    translate: '100px',
  }, {
    duration: 1000,
    delay: i * 100,
    easing: 'ease-out',
  }).finished.then(() => {
    $el.style.translate = '100px';
  })
});`}
</code>
          </pre>

          <pre className="animejs">
<code>
{`/* Estrategia Digital */

mnDesign.animate('.proyecto', {
  translate: '100px',
  duration: 1000,
  delay: stagger(100),
  ease: 'ease-out',
});`}
</code>
          </pre>
        </div>
      </div>

      <div className="portfolio-footer">
        <Link to="/" className="btn-volver-inicio">
          <i className="fa-solid fa-arrow-left"></i> Volver al Inicio
        </Link>
        
        <div className="portfolio-sociales">
          <a href="https://instagram.com/mndesignweb" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://github.com/mnmryk" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/tu-perfil" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </div>
      </div>

    </section>
  );
};

export default PortfolioSiguiente;