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
- Desde la home y /disenoweb/ se enlaza a las landings locales y de nicho (por ejemplo, "¿Eres de Alcoy o la comarca? → /alcoi/").
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

## Cookies y medición
- El código de consentimiento está en `index.html` y es **el mismo** que `../Landings-mndesignweb/src/components/CookiesHead.astro`: si cambias uno, cambia el otro. Banner: `src/Legales/CookieBanner.jsx`.
- Categorías: **Analítica** (GA4 `G-36WYJMYT3Z` + Clarity → `analytics_storage`) y **Marketing** (Píxel de Meta + remarketing de Google Ads → `ad_storage`, `ad_user_data`, `ad_personalization`). Nada se carga antes de decidir.
- Eventos: `window.enviarEvento()` (GA4) y `window.enviarMeta()` (Meta). Los clics de teléfono, WhatsApp, email y cal.com se miden **solo** en `index.html`. Formularios: `registrarLead()` de `src/utils/analitica.js` tras un envío correcto.
- Formularios: **solo Web3Forms** (llega por email), con `enviarLead()` de `src/utils/enviarLead.js` (pone el `access_key` y lanza un error si el envío falla). Asunto común: `asuntoLead(página, detalle)` → «Nuevo lead desde [página]: …». **Make ya no se usa** (desde el 22/10/2026; los leads se gestionan con el software propio de María): no añadas envíos a webhooks. Reuniones: Cal.com (`mndesignweb/reunion-30-min`) con `src/utils/CalendarioCal.jsx`.

## Mapa de /contacto/ (CARTO)
- Leaflet con las teselas "Positron" de CARTO: `https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png?key=…`, en `src/Contacto/MapaContacto.jsx`.
- **La clave está en `.env` (`VITE_CARTO_KEY`)** y en ningún otro sitio. Es pública (va en el JS del build) y está **restringida al dominio mndesignweb.es** en el panel de CARTO (uso comercial gratuito hasta 1 M de peticiones al mes).
- **En localhost el mapa sale vacío (las teselas dan 403): es normal**, no hay que arreglarlo. Para comprobar la clave: `curl -H "Referer: https://mndesignweb.es/" "https://basemaps.cartocdn.com/rastertiles/light_all/14/8172/6268.png?key=<clave>"` (y lo mismo con `@2x.png`) debe devolver `200 image/png`.
- La atribución "© OpenStreetMap contributors © CARTO" es obligatoria: no se oculta.
- `ReservaYMapa.jsx` carga `MapaContacto` (Leaflet + `leaflet.css`) solo cuando la sección está a 400 px de verse. Leaflet no se descarga en ninguna otra página.

## Reglas fijas
- No inventar reseñas, testimonios, logos de clientes, cifras ni proyectos. Si falta algo, `[PENDIENTE: ...]`.
- Nada de schema `aggregateRating` ni `Review` sobre la propia empresa.
- **Reseñas de Google** (textos literales; solo se puede recortar con "[…]"; etiqueta "Reseña de Google" y estrellas): Lara S. (Directora de arte), Miriam A., Damaris López y Sara Santos (Nutricionista). Textos de las tres primeras en `../Landings-mndesignweb/src/pages/alcoi/index.astro`. Debajo de cada bloque, el botón "Ver todas las reseñas en Google" → https://share.google/H7PZUbk3sAkb31aDe.
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

## Registro
Todo cambio SEO o de contenido se apunta en `REGISTRO-CAMBIOS.md` (qué, por qué, cómo medirlo y estado). Si afecta a la estrategia común, también en `../Landings-mndesignweb/MEMORIA-SEO.md`.
