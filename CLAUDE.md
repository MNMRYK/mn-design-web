# MN Design Web · Web principal (React)

## Qué es
Web de la **agencia** MN Design Web (María Nadal): diseño y desarrollo web, e-commerce, posicionamiento SEO, redes sociales y software a medida, para clientes de **toda España**.
https://mndesignweb.es/ · Passeig del Comtat, 75, 5º 1º · 03820 Cocentaina (Alicante) · +34 645 854 934 · info@mndesignweb.es

En el mismo dominio conviven:
- Esta app React (Vite + prerender con Puppeteer): `/`, `/nosotros/`, `/contacto/`, `/disenoweb/`, `/e-commerce/`, `/posicionamiento-seo/`, `/redes-sociales/`, `/demos/`, `/rescate-kit-digital/` y las legales.
- Las landings Astro (`../Landings-mndesignweb`): `/alcoi/`, `/software-a-mida-alcoi/`, `/clinicas/`, `/nutricionistas/`, `/psicologos/`, `/academia-nutricion/`, `/bodas/`, `/aprende-shopify/`, `/enlaces/` (noindex).
- El blog WordPress en `/blog/` (`../Blog-mndesignweb`), con su propio sitemap.

Antes de cambiar nada, lee también `../Landings-mndesignweb/CLAUDE.md` y `../Landings-mndesignweb/MEMORIA-SEO.md` (estrategia común, reglas de reseñas y del logotipo, objetivo de clics).

## Objetivo
**5 clics orgánicos al día** desde Google para todo el dominio (Search Console, 3 meses hasta el 14/10/2026: ~0,5 clics/día).

## Enfoque SEO de esta web: general y de marca, NO de ciudad
- Esta web posiciona por **servicios generales y por la marca**: "agencia de diseño y desarrollo web", "diseño web a medida", "diseño de tiendas online", "posicionamiento SEO", "gestión de redes sociales", "software a medida".
- Las búsquedas locales ("diseño web Alcoy (Alcoi)", "seo alcoy"…) son **solo de las landings locales**. `/alcoi/` es la única página que trabaja "diseño web Alcoy". Ninguna página de esta web debe competir con ella.
- **Nada de ciudad en titles ni en H1** (ni "Alcoi", ni "Alcoy", ni "Alicante"), ni el año ("2026").
- La ubicación (Cocentaina, Alicante) **sí** puede aparecer en el contenido, en el pie, en /contacto/ y en el schema (`address`, `areaServed`).
- Desde la home y /disenoweb/ se enlaza a las landings locales y de nicho (bajo los botones del hero: «¿Buscas una agencia de diseño web en Alcoy?» → /alcoi/). En localhost los enlaces a landings y a /blog/ dan 404: es normal, viven en otros repos.
- Una palabra clave principal por página; cada búsqueda se mide en una sola página (tabla en `REGISTRO-CAMBIOS.md`).

## Cómo funciona el build
- `npm run build` = `vite build` → `scripts/prerender.mjs` (Puppeteer genera `dist/<ruta>/index.html` y `dist/404.html` con el contenido real) → `scripts/seo-postbuild.mjs` (`dist/sitemap.xml`).
- Rutas: `src/seo/rutas.js` es la fuente única (`RUTAS_REACT` + `RUTAS_EXTERNAS_INDEXABLES` de las landings). Siempre con barra final. Si añades una página React, añádela también a `src/App.jsx`, `src/paginas.js` y a las reglas 5 y 6 de `public/.htaccess`.
- Metaetiquetas: componente `src/seo/Seo.jsx` (title, description, canonical, OG, Twitter). Datos del negocio y nodo de empresa del schema: `src/seo/negocio.js` (mismo `@id` que las landings: `https://mndesignweb.es/#empresa`).
- El prerender **falla** si una página no tiene 1 H1, title y description propios, canonical/og:url correctos, si hay títulos o descripciones repetidos, si el JSON-LD lleva `aggregateRating`/`Review` o si una pregunta del FAQPage no se ve en la página (o su respuesta no está en el HTML).
- **FAQPage**: se genera SIEMPRE con `schemaFaq()` (`src/seo/faq.js`) desde el mismo array que pinta las preguntas (`src/<Sección>/preguntas*.js`). Nunca se escriben preguntas a mano en el schema. Página sin preguntas visibles = sin FAQPage. El acordeón compartido es `src/utils/AcordeonFaq.jsx` (las respuestas plegadas siguen en el HTML).
- `public/.htaccess` (raíz de `public_html`): www → sin www, barras dobles, `index.html` explícito, URLs antiguas, rutas React sin barra → con barra y 404 real. Lo heredan las carpetas de las landings: cualquier cambio se prueba también en ellas y en `/blog/`.

## Publicación (SiteGround, subida manual)
Igual que las landings: un push a `main` **no publica nada**.
1. `npm run build`.
2. Compara el `dist/` nuevo con lo publicado (los JS/CSS de `dist/assets/` llevan hash).
3. Sube **primero** los archivos nuevos de `dist/assets/` a `public_html/assets/`.
4. Sube **después** los HTML (`dist/index.html`, `dist/<ruta>/index.html`, `dist/404.html`, con sus `.gz`), `sitemap.xml`, `robots.txt`, `llms.txt`, `.htaccess` y lo nuevo de `public/`.
5. **No toques** las carpetas de las landings (`/alcoi/`, `/clinicas/`…, `/_astro/`, `/marca/`) ni `/blog/`.
6. Vacía la caché de SiteGround (Site Tools → Speed → Caching) y comprueba en una ventana privada.
7. Los `assets/` antiguos se borran solo cuando se ha comprobado que ninguna página los usa.
8. **IndexNow (Bing):** con todo subido, `npm run indexnow` envía las URLs de `dist/sitemap.xml` (o `npm run indexnow -- <url> …` solo las que cambien). La clave es `public/7cdae621f29f53e295912e22de1ea99e.txt` y tiene que estar en la raíz del servidor; no se borra ni se cambia. El blog avisa solo con Rank Math.

## Cookies y medición
- El código de consentimiento está en `index.html` y es **el mismo** que `../Landings-mndesignweb/src/components/CookiesHead.astro`: si cambias uno, cambia el otro.
- **Banner de cookies: también en `index.html`** (HTML y script al final del `<body>`, CSS en el `<head>`), no en React, para que se pinte con el HTML (era el LCP de la home). Ids `#cookie-banner`, `#btn-accept-cookies`, `#btn-decline-cookies`, `#cc-configurar`, `#cc-analitica`, `#cc-marketing`, `#cc-guardar`. El "Configurar cookies" del pie lanza el evento `configurar-cookies` (`src/utils/cookies.js`), que abre el panel con la elección actual.
- Categorías: **Analítica** (GA4 `G-36WYJMYT3Z` + Clarity → `analytics_storage`) y **Marketing** (Píxel de Meta + remarketing de Google Ads → `ad_storage`, `ad_user_data`, `ad_personalization`). Nada se carga antes de decidir.
- Eventos: `window.enviarEvento()` (GA4) y `window.enviarMeta()` (Meta). Los clics de teléfono, WhatsApp, email y cal.com se miden **solo** en `index.html`. Formularios: `registrarLead()` de `src/utils/analitica.js` tras un envío correcto.
- Formularios: **solo Web3Forms** (llega por email), con `enviarLead()` de `src/utils/enviarLead.js` (pone el `access_key` y lanza un error si el envío falla). Asunto común: `asuntoLead(página, detalle)` → «Nuevo lead desde [página]: …». **Make ya no se usa** (desde el 22/10/2026; los leads se gestionan con el software propio de María): no añadas envíos a webhooks. Reuniones: Cal.com (`mndesignweb/reunion-30-min`) con `src/utils/CalendarioCal.jsx`.

## Mapa de /contacto/ (CARTO)
- Leaflet con las teselas "Positron" de CARTO: `https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png?key=…`, en `src/Contacto/MapaContacto.jsx`.
- **La clave está en `.env` (`VITE_CARTO_KEY`)** y en ningún otro sitio. Es pública (va en el JS del build) y está **restringida al dominio mndesignweb.es** en el panel de CARTO (uso comercial gratuito hasta 1 M de peticiones al mes).
- **En localhost el mapa sale vacío (las teselas dan 403): es normal**, no hay que arreglarlo. Para comprobar la clave: `curl -H "Referer: https://mndesignweb.es/" "https://basemaps.cartocdn.com/rastertiles/light_all/14/8172/6268.png?key=<clave>"` (y lo mismo con `@2x.png`) debe devolver `200 image/png`.
- La atribución "© OpenStreetMap contributors © CARTO" es obligatoria: no se oculta.
- `ReservaYMapa.jsx` carga `MapaContacto` (Leaflet + `leaflet.css`) solo cuando la sección está a 400 px de verse. Leaflet no se descarga en ninguna otra página.

## Estado actual y próximos pasos (22/10/2026)
- **Hecho, con commit y sin publicar:** mapa de /contacto/ (CARTO), fase 1 (sin ciudad, FAQPage desde lo visible, prueba social, formulario, `.htaccess`), formularios sin Make, fase 2 (rendimiento y accesibilidad) y fase 3 (logo y favicon nuevos, foto de María en /nosotros/ con schema Person, og:image `og-mndesignweb.jpg` y reseñas de Google en la home, /contacto/ y /nosotros/ con `src/Resenas/`). Producción sigue con el build del 4/10.
- **Próximo paso:**
  1. María hace `npm run build` (el build lo hace siempre ella; no lo lances sin que lo pida). Se estrena la validación del FAQPage: si falla, corregir.
  2. Lighthouse en móvil sobre `npm run preview` y comparar con el punto de partida de la fase 2 en `REGISTRO-CAMBIOS.md`.
  3. Darle la lista exacta de subida a SiteGround (orden, qué no subir: carpetas de las landings, `/marca/`, `/blog/`, el PNG de su foto `marianadalmndesignweb.es.png` y los SVG de logos aún sin usar) y qué `assets/` antiguos podrá borrar al día siguiente.
  4. Tras publicar: mapa de /contacto/ en ventana privada, enlaces a /alcoi/ y /software-a-mida-alcoi/, un envío de prueba del formulario, `curl -I` a /servicios/, a una landing sin barra y a www; "Inspeccionar URL" + "Validar corrección" de /nutricionistas y /aprende-shopify en Search Console.
- **Pendientes:**
  - **Resto de la fase 3:** logo del schema (`/marca/icon-512.png`, cambiándolo a la vez en las landings) y, si se quiere, Lara S. y Miriam A. en /disenoweb/ (con `<ResenasGoogle ids={[…]} />`).
  - **Landings (repo `../Landings-mndesignweb`):** quitar Make de sus formularios (alcoi, software-a-mida-alcoi, nutricionistas, clinicas, psicologos ×2, academia-nutricion ×2, aprende-shopify ×2, bodas), reseña de Sara Santos en /nutricionistas/, /academia-nutricion/ y /clinicas/, y revisar "agencia de diseño web" en title/H1 de /alcoi/. Cuando estén publicadas sin Make, María desactiva y borra el escenario de Make.
  - **/branding/** (colaboración con Lara, directora de arte): palabra clave "branding e identidad visual para empresas"; menú Servicios tras "Diseño web", tarjeta en la home, pie, enlace desde /disenoweb/, opción del formulario, `rutas.js`, `App.jsx`, `paginas.js`, reglas 5 y 6 del `.htaccess` y `llms.txt`. Falta el apellido de Lara y su portfolio. Sin la reseña de Lara S. en esa página.
  - Más adelante: /mantenimiento-web/, /software-a-medida/ (castellano, general), sección de precios en /disenoweb/, textos genéricos del hero de la home y del pie, orden de encabezados, enlaces sin barra del menú y el pie de WordPress (lo hace María), política de cookies (menciona la API de Conversiones de Meta, que no se usa) y Typebot/CARTO en la política de privacidad.
- **Trabajo con Claude Code:** al terminar cada fase, conversación nueva (este archivo y el registro tienen todo el contexto).

## Reglas fijas
- No inventar reseñas, testimonios, logos de clientes, cifras ni proyectos. Si falta algo, `[PENDIENTE: ...]`.
- Nada de schema `aggregateRating` ni `Review` sobre la propia empresa.
- **Reseñas de Google** (textos literales; solo se puede recortar con "[…]"; etiqueta "Reseña de Google" y estrellas): Lara S. (Directora de arte), Miriam A., Damaris López, Sara Santos (Nutricionista) y Alinea (plataforma de cursos online). Fuente única en esta web: `src/Resenas/resenas.js`. Textos de las tres primeras en `../Landings-mndesignweb/src/pages/alcoi/index.astro`. Debajo de cada bloque, el botón "Ver todas las reseñas en Google" → https://share.google/H7PZUbk3sAkb31aDe.
  - **Lara S.** fue clienta (María le hizo su portfolio) y ahora colabora con nosotros en branding. Su reseña se usa con el contexto «Clienta · portfolio», pero **nunca en /branding/** (ni en nada de esa colaboración).
  - **Sara Santos** (Nutricionista): le hicimos el software de gestión de pacientes y la academia online.
- **Testimonios de clientes que no vienen de Google** (etiqueta "Cliente", sin estrellas): Nutrimente (Nutrición integrativa · Jaén).
- **Testimonios de /contacto/** (Javier, Álvaro, Elena, Laura, Sofía, Miguel; `src/Contacto/Opiniones.jsx`): son reales, pero de clientes de proyectos que María hizo trabajando en **otras agencias**, antes de fundar MN Design Web. No son clientes de MN Design Web y no deben parecerlo: título «Lo que dicen de mi trabajo», subtítulo «Proyectos en los que trabajé en otras agencias, antes de fundar MN Design Web», etiqueta «Proyecto en agencia anterior» en cada tarjeta, sin estrellas y sin mezclarlos con las reseñas de Google. Los @usuarios son reales. No tenemos sus fotos: avatar con la inicial.
- «+5 años de experiencia» (/nosotros/) es cierto.
- Nada de valoraciones medias, número de reseñas ni "reseñas verificadas".
- Demos (SupplyConnect, Novoteix, las de `mnmryk.github.io`…) se presentan como demos, nunca como clientes. Las cifras de maquetas (p. ej. el panel de /redes-sociales/) se marcan como ejemplo.
- Copy en "nosotros" (equipo), salvo los textos personales de María en /nosotros/ y el título de los testimonios de sus trabajos anteriores.
- URLs internas y canonical **siempre con barra final**.
- Mantener el diseño, las tipografías (Montserrat + Nunito) y los colores; nada de librerías pesadas nuevas.
- **Logotipo** (misma regla que las landings): pájaro + "MN Design Web" ("MN" en negrita y "Design Web" fino). Pájaro morado (`pajaro-morado.svg`) sobre fondos claros; pájaro blanco/lila (`pajaro-blanco.svg`, `logo-blanco.svg`) sobre fondos morados oscuros como el `#1A102D` de esta web; blanco puro sobre oscuros neutros. El favicon es siempre el morado (`logo-morado.svg`, pájaro sobre círculo lila). Los iconos ya publicados por las landings están en `/marca/` (favicon.ico, favicon.svg, apple-touch-icon, icon-192/512, manifest). `/logo.webp` y `/favicon_v2.webp` de la raíz los usa también el schema de las landings: no se borran sin cambiarlo allí.
- Cualquier cambio en piezas compartidas (`index.html` de cookies, `.htaccess`, `src/seo/rutas.js`, `negocio.js`) se comprueba en todas las páginas afectadas, también en las landings.

## Rendimiento (no deshacer)
- **Nada externo que bloquee el render.** Sin Google Fonts ni cdnjs.
- **Fuentes:** `public/fonts/montserrat-latin.woff2` y `nunito-latin.woff2` (variables de Google Fonts, solo latín, OFL), con `@font-face` y `preload` en `index.html`. Se declaran solo los pesos que se pedían a Google (Montserrat 400/500/700/800/900; Nunito 400/600/700/900) para que el navegador elija el mismo peso que antes: si se añade un peso, el texto que lo use cambiará de grosor.
- **Iconos:** `<Icono nombre="check" />` (`src/utils/Icono.jsx`), con los trazados SVG de Font Awesome 6 en `src/utils/iconosTrazados.js` (CC BY 4.0). Pinta un `<i class="icono">` con el SVG: los estilos `… i` siguen funcionando. Para un icono nuevo, añadir su trazado al archivo (nada de volver a cargar Font Awesome).
- **Chat:** `src/utils/ChatTypebot.jsx` es una copia ligera del botón y del mensaje de bienvenida de Typebot (mismo aspecto, medido). Typebot (`TypebotBurbuja.jsx`, ~190 KB) se descarga solo al pulsarlo (y se precarga al pasar el ratón o tocar el botón). Icono y avatar en `public/chat/`.
- **Globo de /posicionamiento-seo/:** en móvil y tablet, siempre la imagen `globo-seo.webp`; en ordenador, el WebGL se carga cerca de verse y con la página ya cargada (`GloboAdaptable.jsx`).
- **Imágenes:** con `width`/`height`, `loading="lazy"` si no se ven al entrar y `srcset` si se muestran a tamaños distintos. Los fondos CSS grandes van con `<FondoDiferido url=…>` (`src/utils/FondoDiferido.jsx`). Las tarjetas del blog usan las miniaturas de WordPress (`src/utils/imagenBlog.js`). Para redimensionar sin `sharp` se puede usar Chrome (Puppeteer) con `createImageBitmap` y exportar a webp.
- `/admin.webp` y otras imágenes de la raíz también las usan las landings: no se sustituyen ni se borran; las versiones optimizadas de esta web van con otro nombre (`public/portfolio/`, `-800.webp`…).

## Registro
Todo cambio SEO o de contenido se apunta en `REGISTRO-CAMBIOS.md` (qué, por qué, cómo medirlo y estado). Si afecta a la estrategia común, también en `../Landings-mndesignweb/MEMORIA-SEO.md`.
