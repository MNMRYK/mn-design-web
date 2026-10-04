import { useEffect, useRef } from "react";
import { esPrerender } from "./prerender";

// Calendario de Cal.com con el embed oficial (el mismo que las landings alcoi y psicologos).
// A diferencia de un <iframe> normal, avisa cuando se confirma una reserva: entonces se
// envía book_call a GA4 (solo con cookies aceptadas, ver window.enviarEvento en index.html).

// Fragmento oficial de Cal.com: crea window.Cal y carga embed.js la primera vez que se usa
const cargarCal = () => {
  (function (C, A, L) {
    const p = function (a, ar) {
      a.q.push(ar);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
  })(window, "https://app.cal.com/embed/embed.js", "init");
};

// Cal.com emite bookingSuccessful y bookingSuccessfulV2 por la misma reserva: solo contamos una.
// Los listeners se registran una vez por calendario, aunque el componente se monte varias veces.
const calendariosEscuchando = new Set();
let ultimaReserva = 0;
const alReservar = (calendario) => {
  if (Date.now() - ultimaReserva < 5000) return;
  ultimaReserva = Date.now();
  if (window.enviarEvento) window.enviarEvento("book_call", { method: "cal_com", calendario });
  if (typeof window.fbq === "function") window.fbq("track", "Schedule");
};

const CalendarioCal = ({ calLink, nombre, className }) => {
  const ref = useRef(null);
  const id = `cal-${nombre}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || esPrerender) return;

    let iniciado = false;
    const iniciar = () => {
      if (iniciado) return;
      iniciado = true;
      cargarCal();
      window.Cal("init", nombre, { origin: "https://cal.com" });
      const cal = window.Cal.ns[nombre];
      cal("inline", { elementOrSelector: `#${id}`, calLink, config: { layout: "month_view" } });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
      if (!calendariosEscuchando.has(nombre)) {
        calendariosEscuchando.add(nombre);
        cal("on", { action: "bookingSuccessfulV2", callback: () => alReservar(nombre) });
        cal("on", { action: "bookingSuccessful", callback: () => alReservar(nombre) });
      }
    };

    // Se carga al acercarse al calendario para no frenar la carga inicial
    if (!("IntersectionObserver" in window)) {
      iniciar();
      return;
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas[0].isIntersecting) {
          iniciar();
          observador.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    observador.observe(el);
    return () => observador.disconnect();
  }, [calLink, nombre, id]);

  return <div id={id} ref={ref} className={className} />;
};

export default CalendarioCal;
