// Scroll suave (Lenis) para cada página, sincronizado con GSAP/ScrollTrigger.
//  - Con "reducir movimiento" activado no se crea: scroll nativo del navegador.
//  - Al destruirlo también se quita su función del reloj de GSAP (antes se quedaba
//    una por cada página visitada, llamando a un Lenis ya destruido).
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefiereMenosMovimiento } from "./capacidadGrafica";

// Sustituto con la misma forma que Lenis para cuando no se usa
const SIN_LENIS = {
  on() {},
  off() {},
  raf() {},
  start() {},
  stop() {},
  destroy() {},
  scrollTo(destino) {
    if (typeof destino === "number") window.scrollTo(0, destino);
    else if (destino && destino.scrollIntoView) destino.scrollIntoView();
    else if (typeof destino === "string") document.querySelector(destino)?.scrollIntoView();
  },
};

export const crearLenis = (opciones) => {
  gsap.registerPlugin(ScrollTrigger);
  if (prefiereMenosMovimiento()) return SIN_LENIS;

  const lenis = new Lenis(opciones);
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);

  const destruir = lenis.destroy.bind(lenis);
  lenis.destroy = () => {
    gsap.ticker.remove(tick);
    destruir();
  };
  return lenis;
};
