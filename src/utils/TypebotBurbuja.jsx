// Chat de Typebot (bot "my-typebot-7uabkh3" de typebot.io). Lo carga ChatTypebot.jsx SOLO
// cuando el usuario pulsa el botón del chat: así sus ~190 KB de JS no se descargan al entrar.
// Configuración igual que antes; el icono del botón y el avatar se sirven desde el dominio.
import React, { useEffect } from "react";
import { Bubble, open } from "@typebot.io/react";

const ICONO_BOTON = "/chat/boton.webp";
const AVATAR = "/chat/avatar.webp";

// Espera a que el botón de Typebot esté pintado y entonces abre el chat
function abrirCuandoEsteListo(alAbrir) {
  let intentos = 0;
  const comprobar = () => {
    const boton = document.querySelector("typebot-bubble")?.shadowRoot?.querySelector('[part="button"]');
    if (boton) {
      open();
      alAbrir();
    } else if (intentos++ < 100) {
      setTimeout(comprobar, 50);
    } else {
      alAbrir(); // no ha cargado en 5 s: se quita el lanzador propio igualmente
    }
  };
  comprobar();
}

const TypebotBurbuja = ({ alAbrir }) => {
  useEffect(() => {
    abrirCuandoEsteListo(alAbrir);
  }, [alAbrir]);

  return (
    <div data-lenis-prevent="true" style={{ overscrollBehavior: "contain" }}>
      <Bubble
        typebot="my-typebot-7uabkh3"
        apiHost="https://typebot.io"
        theme={{
          button: {
            backgroundColor: "#7E57C2",
            size: "60px",
            customIconSrc: ICONO_BOTON,
          },
          previewMessage: {
            backgroundColor: "#fcfcff",
            textColor: "#1A102D",
            closeButtonBackgroundColor: "#efebfc",
            closeButtonIconColor: "#1A102D",
          },
          customCss: `
            /* Para navegadores Chrome, Edge y Safari */
            .typebot-container .scrollable-container::-webkit-scrollbar {
              display: block !important;
              width: 8px !important;
            }
            .typebot-container .scrollable-container::-webkit-scrollbar-track {
              background-color: #fcfcff !important;
            }
            .typebot-container .scrollable-container::-webkit-scrollbar-thumb {
              background-color: #7E57C2 !important;
              border-radius: 8px !important;
            }

            /* Para navegadores Firefox (que usan otro motor) */
            .typebot-container .scrollable-container {
              scrollbar-width: thin !important;
              scrollbar-color: #7E57C2 #fcfcff !important;
            }
          `,
        }}
        // Sin autoShowDelay: el mensaje de bienvenida ya lo ha mostrado ChatTypebot.jsx
        previewMessage={{
          message: "¡Hola! ¿En qué puedo ayudarte?",
          avatarUrl: AVATAR,
        }}
      />
    </div>
  );
};

export default TypebotBurbuja;
