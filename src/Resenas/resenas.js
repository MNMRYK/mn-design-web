/* Reseñas REALES. Mismos textos que en las landings (../Landings-mndesignweb/src/pages/alcoi/index.astro).
   Textos LITERALES de Google (sin corregir); solo se puede recortar con "[…]".
   NO añadir schema Review ni aggregateRating. Sin fechas relativas.
   textoCorto: versión recortada con "[…]" para las tarjetas junto a otras reseñas (mismo alto);
   el texto completo se usa cuando la reseña va sola (/contacto/, /nosotros/).
   Lara S. fue clienta (portfolio) y ahora colabora en branding: NUNCA en /branding/. */

export const GOOGLE_RESENAS = "https://share.google/H7PZUbk3sAkb31aDe";

export const RESENAS = {
  sara: {
    nombre: "Sara Santos",
    detalle: "Nutricionista · software de gestión de pacientes y academia online",
    google: true,
    texto:
      "Conocí a María a través de instagram. Cuando hicimos la primera reunión tuve claro que iba a ser una gran idea trabajar con ella. La recomiendo totalmente, te escucha y entiende a la perfección y aporta ideas y soluciones muy buenas. Estoy encantada con el diseño, la funcionalidad y el acompañamiento cercano. Cuida mucho los detalles en todo y el soporte cuando hay dudas se agradece muchísimo. Gran profesional!",
    textoCorto:
      "[…] La recomiendo totalmente, te escucha y entiende a la perfección y aporta ideas y soluciones muy buenas. Estoy encantada con el diseño, la funcionalidad y el acompañamiento cercano. […]",
  },
  lara: {
    nombre: "Lara S.",
    detalle: "Directora de arte · clienta (portfolio)",
    foto: "/opiniones/lara.webp",
    google: true,
    texto:
      "[…] me ayudó a crear una web profesional a modo de portfolio y presentación de mi perfil, entendiendo perfectamente lo que buscaba y aportando siempre ideas y soluciones creativas que iban un paso más allá.",
  },
  miriam: {
    nombre: "Miriam A.",
    google: true,
    texto:
      "Excelente servicio! Ha superado por completo mis expectativas con el diseño de la página web. […] un resultado final súper visual, moderno y fácil de navegar.",
  },
  damaris: {
    nombre: "Damaris López",
    google: true,
    texto: "Gran profesional! Cualquier duda me informo y me resolvió perfectamente. […] Muchas gracias, 100% recomendada.",
  },
  nutrimente: {
    // Testimonio de cliente, NO de Google (etiqueta "Cliente", sin estrellas).
    // [PENDIENTE: confirmar el texto original en castellano; está traducido del valenciano, igual que en las landings]
    nombre: "Nutrimente",
    detalle: "Nutrición integrativa · Jaén",
    foto: "/opiniones/nutrimente.webp",
    google: false,
    texto:
      "Esta plataforma ha transformado nuestra presencia digital con un diseño impecable y un acompañamiento que nos ha ahorrado horas de trabajo.",
  },
};
