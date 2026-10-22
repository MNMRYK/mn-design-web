# Registro de cambios · Web principal (React)

Qué se cambia, por qué y cómo medirlo. Léelo antes de tocar nada y añade una entrada al terminar.
Formato: fecha · qué (archivos y URLs) · por qué · cómo medirlo · estado (hecho / publicado / pendiente de indexar).

## Situación de partida (Search Console, últimos 3 meses, a 22/10/2026)

| Página | Impresiones | Posición | Clics |
| --- | --- | --- | --- |
| / | 1.431 | 29,6 | 23 |
| /posicionamiento-seo/ | 2.306 | 34 | — |
| /e-commerce/ | 1.468 | 67 | — |
| /redes-sociales/ | 1.414 | 47 | — |
| /disenoweb/ | 1.213 (+620 sin barra) | 12,8 | — |
| /nosotros/ | ~1.000 | — | — |
| /contacto/ | 335 | — | — |

Búsquedas generales con oportunidad:

| Búsqueda | Impresiones | Posición |
| --- | --- | --- |
| agencia diseño web | 126 | 3,7 (0 clics) |
| agencia de diseño web | 68 | 4,6 |
| desarrollo web agencia | 78 | 5,3 |
| diseño web agencia | 53 | 4,8 |
| agencia web diseño | 34 | 3,2 |
| diseño web a medida | 46 | 15,7 |
| mantenimiento web wordpress | 95 | 29 |
| mantenimiento web alicante | — | 2,4 |
| diseño web alicante | 214 | 10,6 |
| presupuesto desarrollo web alicante | — | 5 |

Canibalización con /alcoi/ (dato de María, Search Console, 3 meses): "agencia de diseño web alcoy" tiene **318 impresiones y 0 clics** repartidas entre 10 URLs de esta web (/e-commerce 152, /redes-sociales 135, /posicionamiento-seo 122, /disenoweb 112 + 98 sin barra, home 61…), mientras que /alcoi/ solo tiene 31. Confirma el enfoque: esta web, sin ciudad; las búsquedas locales, solo en /alcoi/.

## Palabra clave por página (aplicada el 22/10/2026 en la fase 1; /demos/ y /nosotros/ conservan su title)

| Página | Palabra clave principal | Secundarias |
| --- | --- | --- |
| / | agencia de diseño y desarrollo web | agencia de diseño web, agencia web, MN Design Web |
| /disenoweb/ | diseño web a medida | diseño web profesional, desarrollo web a medida |
| /e-commerce/ | diseño de tiendas online | desarrollo e-commerce, tienda online Shopify / WooCommerce |
| /posicionamiento-seo/ | posicionamiento SEO | posicionamiento web, SEO para pymes |
| /redes-sociales/ | gestión de redes sociales | community manager para empresas |
| /contacto/ | presupuesto de diseño web | contacto agencia diseño web |
| /demos/ | ejemplos de páginas web | demos de diseño web por sectores |
| /nosotros/ | MN Design Web (marca) | María Nadal, agencia de diseño web |

Las búsquedas con ciudad se miden en las landings (ver `../Landings-mndesignweb/MEMORIA-SEO.md`).

## Registro

### 22/10/2026 · Formularios sin Make: solo Web3Forms y asunto común
- **Por qué:** María ya no usa Make (era un CRM en Excel para los leads de las campañas de Meta); ahora gestiona los leads con su propio software y los recibe por email desde Web3Forms.
- **Qué:**
  - `src/utils/enviarLead.js` (nuevo): `enviarLead(datos)` envía solo a Web3Forms, pone el `access_key` y lanza un error si Web3Forms no acepta el envío; `asuntoLead(página, detalle)` → «Nuevo lead desde [página]: …».
  - Los 7 formularios dejan de enviar al webhook de Make (`hook.eu1.make.com/mxvqg7…`) y usan `enviarLead()`: `Inicio/FormularioContacto.jsx` (home y /contacto/), `DisenoWeb/FormularioDiseno.jsx`, `Ecommerce/FormularioEcommerce.jsx`, `PosicionamientoSeo/FormularioSeo.jsx`, `RedesSociales/FormularioRedes.jsx`, `Demos/FormularioDemo.jsx` y `LandingKit/ContactoRescate.jsx`.
  - Asuntos: «Nuevo lead desde Inicio / Contacto: [servicio]», «… desde Diseño web / E-commerce / Posicionamiento SEO / Redes sociales: [servicios marcados]», «… desde Demos: solicitud de demo ([sector])» y «… desde Rescate Kit Digital: auditoría de rescate». Antes: «Nuevo lead desde la web (Diseño)», «🚀 SOLICITUD DE DEMO: …», «Nuevo Lead: Rescate Kit Digital»…
  - De paso, los 6 formularios restantes también liberan el botón si falla el envío (`.finally(() => setEstaCargando(false))`); antes se quedaban en «Enviando…» (el de rescate ya lo hacía con un `catch`).
  - CLAUDE.md: formularios = solo Web3Forms, sin Make.
- **Comprobado con Puppeteer en el servidor de desarrollo** (todo interceptado, cookies aceptadas), en las 8 páginas con formulario: un único envío a Web3Forms con el `access_key` y el asunto nuevo, **ninguna petición a Make**, `enviarEvento("generate_lead", {formulario})` con el mismo valor que antes (`contacto_general`, `diseno_web`, `ecommerce`, `posicionamiento_seo`, `redes_sociales`, `solicitud_demo`, `rescate_kit_digital`) y su petición a GA4, `enviarMeta("Lead")`, aviso de éxito y botón disponible. Con error simulado de Web3Forms: aviso de error, sin conversión y botón disponible. ESLint sin errores nuevos.
- **Pendiente (fuera de este repo, sin tocar):** las landings siguen enviando a Make (ver `../Landings-mndesignweb/MEMORIA-SEO.md` cuando se cambie).
- **Cómo medirlo:** que los leads lleguen por email con el asunto nuevo; GA4 → `generate_lead` por `formulario`, igual que antes.
- **Estado:** hecho en local, con commit, sin build ni publicar.

### 22/10/2026 · Fase 1 de la auditoría: sin ciudad, FAQPage desde lo visible, prueba social, formulario y .htaccess
- **Por qué:** "agencia de diseño web alcoy" (318 impresiones, 0 clics) se reparte entre 10 URLs de esta web y /alcoi/ solo recibe 31: canibalización. Esta web pasa a posicionarse en general y por la marca, y las búsquedas con ciudad quedan para /alcoi/. Deshace lo que metió el commit 0993a81 (15/10, sin publicar).
- **1. Titles, descriptions, H1, primer párrafo y H2, sin Alcoy/Alcoi ni 2026:**

  | Página | Title | H1 | H2 con la palabra clave |
  | --- | --- | --- | --- |
  | / | Agencia de Diseño y Desarrollo Web \| MN Design Web | Agencia de diseño y desarrollo web (en tres líneas, como antes; «Arquitectura web y estrategia digital» abre el subtítulo) | — |
  | /disenoweb/ | Diseño Web a Medida para Empresas \| MN Design Web | ¿Buscas una agencia de diseño web a medida? · Diseño y Desarrollo Web | Planes de diseño web a medida |
  | /e-commerce/ | Diseño de Tiendas Online a Medida \| MN Design Web | Diseño de tiendas online a medida · Tu tienda online lista para vender | Planes de diseño de tiendas online |
  | /posicionamiento-seo/ | Posicionamiento SEO para Empresas y Pymes \| MN Design Web | Posicionamiento SEO para empresas y pymes · Que tus clientes te encuentren en Google | Planes de posicionamiento SEO |
  | /redes-sociales/ | Gestión de Redes Sociales para Empresas \| MN Design Web | Gestión de redes sociales para empresas · Convierte seguidores en clientes | Planes de gestión de redes sociales |
  | /contacto/ | Contacto y Presupuesto de Diseño Web \| MN Design Web | Pide presupuesto para tu web o tu tienda online | — |
  | /rescate-kit-digital/ | Rescate de Webs del Kit Digital \| MN Design Web | sin cambios | — |

  - Descriptions nuevas (126-153 caracteres) en la home, /disenoweb/, /e-commerce/, /posicionamiento-seo/, /redes-sociales/, /contacto/ y /nosotros/ (sin Alcoi; Cocentaina (Alicante) en la home y /nosotros/).
  - Primer párrafo con la palabra clave en la home (subtítulo), /disenoweb/ (+ «agencia de diseño y desarrollo web» en el segundo, para no perder las búsquedas de "agencia" mientras la home toma el relevo), /e-commerce/, /posicionamiento-seo/ y /redes-sociales/. En /posicionamiento-seo/ fuera «alguien de la comarca».
  - /contacto/: subtítulo «Cuéntanos qué necesitas y te respondemos en menos de 24 h laborables…» y el texto de «¿Hablamos de tu próximo gran salto?» con algo concreto (empresas de toda España; en persona en el estudio de Cocentaina o en tu negocio, o por videollamada; qué solución encaja y cuánto cuesta).
  - Home: H2 de Soluciones.jsx (copiado de /aprende-shopify/) → «¿Vendes con Shopify? Aprende a llevar tu tienda sin depender de nadie», con un párrafo propio.
  - Enlace discreto «¿Buscas una agencia de diseño web en Alcoy?» → /alcoi/ bajo los botones del hero de la home (`Hero.jsx`, `.hero-enlace-local`) y bajo los botones de /disenoweb/ (`DisenoWebSiguiente.jsx`, `.dw-enlace-local`).
  - Fuera de los títulos solo queda ciudad en esos dos enlaces y en el pie.
  - `src/seo/negocio.js`: `areaServed` = España (Country) + Alcoy + Cocentaina + Alicante; description general («…para empresas de toda España. Estudio en Cocentaina (Alicante).»); `founder` → `{"@id": "https://mndesignweb.es/nosotros/#maria-nadal"}` (constante `ID_FUNDADORA`; el nodo Person llega en la fase 3).
  - Home: nodo **WebSite** (`@id` …/#web, nombre, idioma y `publisher` → la empresa).
  - /demos/: fuera el bloque duplicado «Webs Corporativas y Eventos Estrategia B2B» (`HeaderDemos.jsx`: las mismas tres demos dos veces).
  - Pie: el `<h2>` del logotipo pasa a `<p>` (mismo tamaño y aspecto, medido).
- **2. FAQPage siempre desde lo visible:**
  - Preguntas en archivos de datos: `src/DisenoWeb/preguntasDiseno.js`, `src/Ecommerce/preguntasEcommerce.js`, `src/PosicionamientoSeo/preguntasSeo.js`, `src/RedesSociales/preguntasRedes.js` y `src/Demos/preguntasDemo.js`. Los pinta el componente y el schema sale de ellos con `schemaFaq()` (`src/seo/faq.js`).
  - Los 4 acordeones (iguales salvo el prefijo de las clases) pasan a `src/utils/AcordeonFaq.jsx`: las respuestas plegadas siguen en el HTML (antes solo existían al abrirlas), y la pregunta se abre con Intro o espacio (`role="button"`, `aria-expanded`). Cada página conserva su CSS.
  - Antes, el schema tenía preguntas distintas de las visibles (home 6 → 0 visibles, /nosotros/ 3 → 0, /contacto/ 3 → 0, /posicionamiento-seo/ 5 → 0, /rescate-kit-digital/ 5 → 0, /disenoweb/ 10 → 5, /e-commerce/ 5 → 1, /demos/ 4 → 3). Ahora: /disenoweb/ 7, /e-commerce/ 7, /posicionamiento-seo/ 7, /redes-sociales/ 8 (no tenía FAQPage) y /demos/ 4, todas visibles. **Sin FAQPage**: home, /nosotros/, /contacto/ y /rescate-kit-digital/.
  - `scripts/prerender.mjs`: **el build falla** si una pregunta del FAQPage no se ve en la página o su respuesta no está en el HTML. La tabla final muestra cuántas preguntas tiene cada página.
  - De paso: fuera los «**» que se veían en una respuesta de /disenoweb/.
- **3. Pie y enlaces:** «Diseño Web Alcoi» → «Diseño web en Alcoy» (/alcoi/); «Diseño Web Cocentaina» → «Software a mida (Alcoi i Cocentaina)» (/software-a-mida-alcoi/, `lang="ca"`); /redes-sociales/ y /demos/ añadidas a "Especialidades". `public/llms.txt`: /alcoi/ como diseño web en Alcoy y /software-a-mida-alcoi/ como software a medida. /bodas/ sin tocar.
- **4. Prueba social:**
  - Testimonios de /contacto/ (`src/Contacto/Opiniones.jsx`): título «Lo que dicen de mi trabajo», subtítulo «Proyectos en los que trabajé en otras agencias, antes de fundar MN Design Web», etiqueta «Proyecto en agencia anterior» en cada tarjeta, avatares con la inicial en morados de la web (contraste suficiente con el blanco) y «Álvaro» con tilde. Los @usuarios se quedan. El clon del carrusel lleva `aria-hidden`. Borrado `public/testimonios/` (las fotos no eran de esas personas).
  - Panel de /redes-sociales/: «● Live» → etiqueta «Ejemplo» (lila, con `title` «Datos de ejemplo…»).
  - /rescate-kit-digital/ (`BarraConfianza.jsx`): «Seguridad Verificada» → «Webs seguras con SSL».
  - «+5 años de experiencia» se queda (confirmado por María). Contexto de Lara S. apuntado en CLAUDE.md.
- **5. Formulario** (`src/Inicio/FormularioContacto.jsx`, el de la home y /contacto/):
  - `.finally(() => setEstaCargando(false))`: si falla el envío, el botón vuelve a «Enviar solicitud».
  - Asunto con la página real: «Nuevo lead desde Contacto: …» en /contacto/ y «Nuevo lead desde Inicio: …» en la home (formato común a todos los formularios desde la entrada siguiente).
  - Selector de servicio accesible: `<button>` con `aria-haspopup="listbox"` y lista `role="listbox"` (flechas, Inicio/Fin, Intro/espacio para elegir, Escape para cerrar y devolver el foco). Mismo aspecto (medidas y estilos computados idénticos al `div` anterior). Si no se elige servicio, el foco va al selector.
  - Línea de privacidad bajo el botón: «Responsable: MN Design Web. Finalidad: responder a tu consulta. Más información en la política de privacidad» (enlace a /privacidad/).
- **6. `public/.htaccess`:** `/servicios/` → `/` (301, regla 4); www + carpeta sin barra → URL final en un solo salto (regla 1); regla 5b: cualquier carpeta real sin barra → con barra, en un solo salto. Nada más.
- **7. Marcado de reseñas antiguo (solo consulta en git):** desde el 21/05/2026 (commit 0eca4da, "pre-deployment checkpoint") y el 27/05 (cc4cc4e, de2008a) la web llevaba `aggregateRating` inventado en un `Product` de cada página de servicio: /contacto/ 5 (25 valoraciones), /disenoweb/ 5 (15), /e-commerce/ 5 (22), /posicionamiento-seo/ 5 (18), /rescate-kit-digital/ 4,9 (89), /demos/ 5,0 (24) y /redes-sociales/ 4,9 (28); en /demos/ y /redes-sociales/ además una `Review` de 5 estrellas firmada por «Cliente Verificado». Se quitó todo en el commit **6b69038 (04/10/2026 11:46, "SEO: datos estructurados unificados de la empresa")**, que entró en el build publicado ese mismo día (Last-Modified de la home: 04/10/2026 15:53). Eso explica los "Fragmentos de reseñas" válidos en Search Console del 24/07 a principios de octubre y 0 desde entonces: **es lo esperado y no hay que recuperarlos** (Google no permite valoraciones de la propia empresa). Comprobado hoy: ninguna página publicada lleva `aggregateRating`, `Review` ni `ratingValue`.
- **Comprobado en el servidor de desarrollo con Puppeteer (envíos interceptados):**
  - Las 9 páginas: title, description y un H1 propios y sin ciudad; ninguna mención a Alcoy/Alcoi/comarca en el contenido salvo los dos enlaces y el pie; WebSite en la home; `areaServed` y `founder` en todas.
  - FAQPage: todas las preguntas visibles y todas las respuestas en el HTML en las 5 páginas que lo llevan.
  - Acordeón: Intro abre, espacio cierra y el clic funciona; plegado mide 0 px.
  - Formulario: Tab → selector, flecha abajo abre la lista con el foco en ella, dos flechas + Intro eligen «Posicionamiento SEO» y el foco vuelve al botón, Escape cierra; con error de Web3Forms el botón queda habilitado y el asunto dice «desde Contacto».
  - Capturas a 1440 y 390 px (hero de la home, /disenoweb/, /contacto/, testimonios, panel de redes, formulario y pie), sin scroll horizontal. En móvil el H1 de la home ocupa las mismas cinco líneas que el anterior.
  - ESLint: ningún error nuevo (los que salen ya estaban: `motion` sin usar porque la configuración no reconoce `<motion.div>`, `esMovil`, `handleScroll`, `useRef` e `index` en HeaderDemos).
  - **No probado: el build** (`npm run build` no se ha ejecutado, por indicación de María); la validación nueva del FAQPage se estrenará en el próximo build.
- **Cómo medirlo:** Search Console → consultas "agencia de diseño web alcoy" (que la URL pase a ser /alcoi/), "agencia diseño web" y variantes (home), "diseño web a medida" (/disenoweb/), "diseño de tiendas online", "posicionamiento seo", "gestión de redes sociales". Revisar a las 2, 4 y 6 semanas de publicar. Se espera una bajada de impresiones con ciudad en /posicionamiento-seo/, /e-commerce/ y /redes-sociales/.
- **Estado:** revisado por María en localhost; hecho en local y con commit, sin build ni publicar.

### 22/10/2026 · Mapa de /contacto/ recuperado (CARTO con clave) y Leaflet solo en /contacto/
- **Qué:**
  - Teselas "Positron" de CARTO como antes (`light_all`), con la ruta nueva y la clave: `https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png?key=…`. La clave va en `.env` (`VITE_CARTO_KEY`), restringida al dominio mndesignweb.es; en localhost el mapa sale vacío, como es de esperar.
  - El mapa pasa a `src/Contacto/MapaContacto.jsx`, que `src/Contacto/ReservaYMapa.jsx` carga con `lazy` solo cuando la sección está a 400 px de verse (IntersectionObserver). La caja ya tenía altura fija (480 / 450 / 400 px), así que no hay saltos.
  - `import 'leaflet/dist/leaflet.css'` sale de `src/App.jsx` (se cargaba en todas las páginas) y va en `MapaContacto.jsx`.
  - `src/Contacto/ReservaYMapa.css`: la atribución estaba oculta con `display: none !important`; ahora se ve ("© OpenStreetMap contributors © CARTO", obligatoria), en un recuadro blanco discreto con los enlaces en morado.
- **Causa de la avería:** el commit b275642 (15/06/2026) cambió en bloque `.png` por `.webp` y la URL de las teselas acabó en `.webp` (CARTO responde 404). Además, CARTO exige ahora una clave: sin ella, cada tesela es la imagen "API KEY REQUIRED".
- **Comprobado:**
  - curl con `Referer: https://mndesignweb.es/`: `light_all` responde `200 image/png` en tamaño normal y en `@2x` (también las URLs exactas que genera el mapa). Sin Referer, 403.
  - Servidor de desarrollo con Puppeteer: en la home no se descarga nada de Leaflet; en /contacto/, ni el código ni el CSS de Leaflet ni las teselas se piden hasta bajar a la sección; al llegar, se piden con la clave (y en `@2x` en móvil), el marcador, la ventana emergente y los botones de zoom mantienen su estilo y la atribución se ve. ESLint sin errores nuevos.
  - Pendiente: verlo en producción tras publicar (las teselas solo cargan desde mndesignweb.es).
- **Cómo medirlo:** /contacto/ en producción, con el mapa visible y sin errores en la consola; en el panel de CARTO, el consumo mensual de la clave.
- **Estado:** hecho en local y con commit, sin build ni publicar.

### 22/10/2026 · Memoria del proyecto y auditoría completa
- **Qué:** creados `CLAUDE.md` (enfoque general y de marca, sin ciudad en titles ni H1; build, publicación, cookies y reglas comunes con las landings) y este registro. Auditoría completa de SEO técnico, on-page, contenido, prueba social, marca y funcionalidad (informe entregado a María; **sin cambios en el código**).
- **Hallazgos principales:** mapa de /contacto/ roto (CARTO exige clave y la URL de las teselas pasó a `.webp` en el commit b275642); el commit 0993a81 (15/10, sin publicar) mete "Alcoy (Alcoi)" en titles y H1 de /posicionamiento-seo/, /e-commerce/ y /redes-sociales/, contrario al nuevo enfoque; FAQPage del schema que no coincide con las preguntas visibles; el blog enlaza a URLs sin barra; Lighthouse móvil de 29 a 66 en rendimiento.
- **Estado:** documentación hecha. Cambios de la auditoría, pendientes de aprobación.
