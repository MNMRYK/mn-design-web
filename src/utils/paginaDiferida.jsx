import { lazy } from "react";

// Igual que React.lazy, pero con un método .precargar().
// Si el módulo ya está descargado, la página se pinta directamente, sin pasar por
// <Suspense> (así React no sustituye el HTML prerenderizado por la pantalla de carga).
export function paginaDiferida(importar) {
  let Modulo = null;

  const cargar = () =>
    importar().then((m) => {
      Modulo = m.default;
      return m;
    });

  const Diferida = lazy(cargar);

  function Pagina(props) {
    return Modulo ? <Modulo {...props} /> : <Diferida {...props} />;
  }
  Pagina.precargar = cargar;

  return Pagina;
}
