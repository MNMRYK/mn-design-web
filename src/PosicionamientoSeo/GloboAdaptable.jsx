import { lazy, Suspense, useEffect, useRef, useState } from "react";
import ErrorBoundary from "../utils/ErrorBoundary";
import { puedeUsarEfectoWebGL } from "../utils/capacidadGrafica";

// three.js y three-globe pesan mucho: solo se descargan si el dispositivo puede mostrar
// el globo y el usuario se acerca a él
const World = lazy(() => import("./AceternityGlobe"));

// Versión estática: captura del mismo globo, con fondo transparente
const GloboEstatico = () => (
  <img
    src="/globo-seo.webp"
    alt=""
    aria-hidden="true"
    width="866"
    height="750"
    loading="lazy"
    decoding="async"
    style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
  />
);

const GloboAdaptable = (props) => {
  const ref = useRef(null);
  const [webgl, setWebgl] = useState(() => puedeUsarEfectoWebGL(2));
  const [cerca, setCerca] = useState(false); // ya se ha acercado: se carga el globo
  const [enPantalla, setEnPantalla] = useState(false);
  const [pestanaVisible, setPestanaVisible] = useState(
    () => typeof document === "undefined" || !document.hidden,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || !webgl) return;

    const precarga = new IntersectionObserver(
      (entradas) => {
        if (entradas[0].isIntersecting) {
          setCerca(true);
          precarga.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    // Solo se dibuja mientras se ve
    const visibilidad = new IntersectionObserver((entradas) => setEnPantalla(entradas[0].isIntersecting));
    precarga.observe(el);
    visibilidad.observe(el);

    const alCambiarPestana = () => setPestanaVisible(!document.hidden);
    document.addEventListener("visibilitychange", alCambiarPestana);

    return () => {
      precarga.disconnect();
      visibilidad.disconnect();
      document.removeEventListener("visibilitychange", alCambiarPestana);
    };
  }, [webgl]);

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      {webgl && cerca ? (
        <ErrorBoundary nombre="Globo" fallback={<GloboEstatico />}>
          <Suspense fallback={<GloboEstatico />}>
            <World
              {...props}
              activo={enPantalla && pestanaVisible}
              onContextoPerdido={() => setWebgl(false)}
            />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <GloboEstatico />
      )}
    </div>
  );
};

export default GloboAdaptable;
