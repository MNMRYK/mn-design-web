// Botón del chat. Es una copia ligera del botón y del mensaje de bienvenida de Typebot (mismas
// medidas, colores y sombra, medidos en el original): se ve igual, pero no descarga nada de
// Typebot al entrar. Typebot (TypebotBurbuja.jsx, ~190 KB de JS) se carga solo al pulsar el
// botón o el mensaje, y se abre directamente. Se empieza a descargar un poco antes, al pasar
// el ratón por encima o al tocar el botón, para que el chat se abra rápido.
import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import "./ChatTypebot.css";

const cargarTypebot = () => import("./TypebotBurbuja");
const TypebotBurbuja = lazy(cargarTypebot);

const RETRASO_MENSAJE = 3000; // como el autoShowDelay que tenía Typebot

const ChatTypebot = () => {
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [mensajeCerrado, setMensajeCerrado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [typebotListo, setTypebotListo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMensajeVisible(true), RETRASO_MENSAJE);
    return () => clearTimeout(t);
  }, []);

  const precargar = () => {
    cargarTypebot().catch(() => {});
  };
  const abrirChat = () => setCargando(true);
  const alAbrir = useCallback(() => setTypebotListo(true), []);

  return (
    <>
      {!typebotListo && (
        <div className={`chat-lanzador ${cargando ? "chat-lanzador--cargando" : ""}`}>
          {mensajeVisible && !mensajeCerrado && !cargando && (
            <div className="chat-mensaje">
              <button type="button" className="chat-mensaje-abrir" onClick={abrirChat} onPointerEnter={precargar} onTouchStart={precargar}>
                <img src="/logo-morado.svg" alt="" width="32" height="32" className="chat-mensaje-avatar" />
                <span className="chat-mensaje-texto">¡Hola! ¿En qué puedo ayudarte?</span>
              </button>
              <button
                type="button"
                className="chat-mensaje-cerrar"
                aria-label="Cerrar el mensaje del chat"
                onClick={() => setMensajeCerrado(true)}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}
          <button
            type="button"
            className="chat-boton"
            aria-label="Abrir el chat"
            onClick={abrirChat}
            onPointerEnter={precargar}
            onTouchStart={precargar}
            onFocus={precargar}
          >
            <img src="/chat/boton.webp" alt="" width="60" height="60" />
          </button>
        </div>
      )}

      {cargando && (
        <Suspense fallback={null}>
          <TypebotBurbuja alAbrir={alAbrir} />
        </Suspense>
      )}
    </>
  );
};

export default ChatTypebot;
