// Decide si un efecto gráfico pesado (WebGL) puede ejecutarse en este dispositivo.
// Si no, los componentes muestran una versión estática con el mismo aspecto.
import { esPrerender } from "./prerender";

export const prefiereMenosMovimiento = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Dispositivo modesto o usuario que pide ahorrar: menos movimiento, poca memoria o ahorro de datos
export const modoLigero = () => {
  if (typeof navigator === "undefined") return true;
  if (prefiereMenosMovimiento()) return true;
  // 2 GB o menos: los móviles de gama media (4 GB) mantienen el fondo animado
  if (typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 2) return true;
  if (navigator.connection && navigator.connection.saveData) return true;
  return false;
};

// ¿Hay WebGL (1 o 2) con aceleración por hardware? failIfMajorPerformanceCaveat descarta el
// renderizado por software (sin GPU), que es justo donde el efecto va a tirones o falla.
// El resultado se guarda: crear contextos de prueba también cuesta memoria.
const cache = {};
export const soportaWebGL = (version = 2) => {
  if (version in cache) return cache[version];
  let ok = false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext(version === 2 ? "webgl2" : "webgl", {
      failIfMajorPerformanceCaveat: true,
    });
    ok = !!gl && !gl.isContextLost();
    // Chrome no siempre marca como "caveat" el renderizado por software (SwiftShader, que usan
    // los equipos sin GPU y el renderizador de Googlebot): lo detectamos por el nombre
    if (ok) {
      const info = gl.getExtension("WEBGL_debug_renderer_info");
      const nombre = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER) || "");
      if (/swiftshader|llvmpipe|softpipe|software|basic render/i.test(nombre)) ok = false;
    }
    // Liberamos el contexto de prueba en el acto (el navegador solo permite unos pocos a la vez)
    if (gl) gl.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    ok = false;
  }
  cache[version] = ok;
  return ok;
};

// Usar el efecto WebGL solo si hay WebGL, el dispositivo no es modesto y no estamos
// generando el HTML estático (el prerender guarda la versión estática, que se ve al instante)
export const puedeUsarEfectoWebGL = (version = 2) =>
  !esPrerender && typeof window !== "undefined" && !modoLigero() && soportaWebGL(version);
