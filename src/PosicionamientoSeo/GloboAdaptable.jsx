import { lazy, Suspense, useEffect, useRef, useState } from "react";
import ErrorBoundary from "../utils/ErrorBoundary";
import { puedeUsarEfectoWebGL } from "../utils/capacidadGrafica";

// three.js y three-globe pesan mucho (~730 KB gzip): solo se descargan en ordenador, si el
// dispositivo puede mostrar el globo y el usuario se acerca a él
const World = lazy(() => import("./AceternityGlobe"));

// En móvil y tablet (pantalla estrecha o táctil) siempre la imagen: el globo no compensa ahí
// lo que cuesta descargarlo y dibujarlo
const esMovilOTablet = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(max-width: 1024px), (pointer: coarse)").matches;

// Espera a que la página haya terminado de cargar y el navegador esté libre (máx. 3 s más):
// así el globo no compite con el primer pintado. Devuelve la función para cancelar.
function cuandoEsteLibre(hacer) {
  let cancelado = false;
  let idIdle = null;
  let idTimeout = null;
  const lanzar = () => {
    if (cancelado) return;
    if ("requestIdleCallback" in window) idIdle = window.requestIdleCallback(hacer, { timeout: 3000 });
    else idTimeout = setTimeout(hacer, 1500);
  };
  if (document.readyState === "complete") lanzar();
  else window.addEventListener("load", lanzar, { once: true });
  return () => {
    cancelado = true;
    window.removeEventListener("load", lanzar);
    if (idIdle !== null) window.cancelIdleCallback?.(idIdle);
    if (idTimeout !== null) clearTimeout(idTimeout);
  };
}

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
  const [webgl, setWebgl] = useState(() => !esMovilOTablet() && puedeUsarEfectoWebGL(2));
  const [cerca, setCerca] = useState(false); // ya se ha acercado: se carga el globo
  const [enPantalla, setEnPantalla] = useState(false);
  const [pestanaVisible, setPestanaVisible] = useState(
    () => typeof document === "undefined" || !document.hidden,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || !webgl) return;

    let cancelarEspera = null;
    const precarga = new IntersectionObserver(
      (entradas) => {
        if (entradas[0].isIntersecting) {
          precarga.disconnect();
          cancelarEspera = cuandoEsteLibre(() => setCerca(true));
        }
      },
      { rootMargin: "300px 0px" },
    );
    // Solo se dibuja mientras se ve
    const visibilidad = new IntersectionObserver((entradas) => setEnPantalla(entradas[0].isIntersecting));
    precarga.observe(el);
    visibilidad.observe(el);

    const alCambiarPestana = () => setPestanaVisible(!document.hidden);
    document.addEventListener("visibilitychange", alCambiarPestana);

    return () => {
      precarga.disconnect();
      cancelarEspera?.();
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
