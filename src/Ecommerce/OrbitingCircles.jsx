import React from "react";
import "./OrbitingCircles.css";

export default function OrbitingCircles({ 
  className = "", 
  children, 
  reverse = false, 
  duration = 20, 
  radius = 50,
  path = true
}) {
  // Convertimos los iconos en una lista para poder contarlos
  const childrenArray = React.Children.toArray(children);
  const count = childrenArray.length;

  return (
    <>
      {/* El dibujo de la pista de la órbita */}
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="orbit-svg-path"
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
        >
          <circle
            className="orbit-circle-line"
            cx={radius}
            cy={radius}
            r={radius}
          />
        </svg>
      )}

      {/* Aquí repartimos cada icono en su propio punto exacto */}
      {childrenArray.map((child, index) => {
        const delay = (duration / count) * index;
        
        return (
          <div
            key={index}
            className={`orbit-item-container ${className}`}
            style={{
              "--duration": duration,
              "--radius": radius,
              "--delay": -delay, /* El retraso negativo hace que empiece ya separado */
            }}
          >
            {/* Si tiene la propiedad 'reverse', le añadimos la clase que gira al revés */}
            <div className={`orbit-animate ${reverse ? 'orbit-reverse' : ''}`}>
              <div className="orbit-icon-center">
                {child}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}