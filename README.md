# DTF Print — Tienda de sublimación (stack MERN)

Catálogo de productos para sublimación y DTF, construido con **MERN**:

- **M**ongoDB — productos, categorías y carritos
- **E**xpress — API REST
- **R**eact (Vite) — frontend
- **N**ode.js — runtime del backend

> El frontend original era un SaaS de Domun.co. Este proyecto es una
> reconstrucción propia del frontend (rediseñada en 2025) + un backend real en
> MERN. Los **productos y las imágenes son de un proveedor** (ver
> [Datos e imágenes](#datos-e-imágenes)) y los **precios son de ejemplo**.

---

## Requisitos

- Node.js 18+ (probado con v24)
- MongoDB local o [Atlas](https://www.mongodb.com/atlas) — **opcional**:
  si no hay `MONGODB_URI`, el backend arranca con **datos en memoria**
  (usa `server/data/seedData.js` directamente, sin persistencia).

## Cómo correrlo

```bash
# 1) Instalar dependencias (raíz + server + client)
npm run setup

# 2) (Opcional) Configurar MongoDB
npm run db:up               # levanta MongoDB en Docker (ver abajo)
cd server
cp .env.example .env        # y poné tu MONGODB_URI
npm run seed                # carga productos y categorías
cd ..

# 3) Levantar backend + frontend juntos
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:5000/api/products

También podés correrlos por separado:

```bash
npm run dev --prefix server   # backend en :5000
npm run dev --prefix client   # frontend en :5173
```

En desarrollo, Vite redirige `/api` y `/products` al backend en `:5000`
(ver `client/vite.config.js`).

### MongoDB con Docker

El repo incluye `compose.yaml` con un MongoDB 8 listo para desarrollo. Los
secretos viven en `.env`, que **no** se versiona:

```bash
cp .env.example .env        # completá MONGO_USERNAME / MONGO_PASSWORD
npm run db:up               # docker compose up -d
npm run db:logs             # logs del servicio
npm run db:down             # lo detiene (los datos quedan en el volumen)
```

Armá la URI con esos valores y ponela en `server/.env`:

```bash
MONGODB_URI=mongodb://USUARIO:PASSWORD@127.0.0.1:27017/dtf_print?authSource=admin
```

Luego `npm run seed` y `npm run dev`. El puerto se publica solo en `BIND_IP`
(`127.0.0.1` por defecto), así que la base no queda expuesta a la red local.
Si ya tenés otro MongoDB escuchando en `27017`, cambiá `MONGO_PORT` en `.env`
(y usá ese puerto en la URI).

> Sin `MONGODB_URI` el backend arranca igual, con datos en memoria
> (`server/data/seedData.js`), sin persistencia.

### Modo producción

`npm start` sirve el build del cliente desde el mismo backend (Express), así
que todo queda en un solo puerto:

```bash
npm run build       # genera client/dist
npm start           # API + frontend en http://localhost:5000
```

Si `client/dist` no existe, el backend responde solo la API y los `/products`
(el modo dev con Vite en `:5173` sigue funcionando igual).

## Scripts

| Comando              | Qué hace                                                |
|----------------------|---------------------------------------------------------|
| `npm run setup`      | Instala dependencias de raíz, `server/` y `client/`      |
| `npm run dev`        | Backend + frontend en paralelo (`concurrently`)          |
| `npm run seed`       | Carga el seed en MongoDB (borra y reinserta)             |
| `npm test`           | Tests del backend y del cliente (`node:test`)            |
| `npm run db:up`      | Levanta MongoDB con Docker Compose                       |
| `npm run db:down`    | Detiene los contenedores (conserva el volumen)           |
| `npm run db:logs`    | Sigue los logs de MongoDB                                |
| `npm run build`      | Build de producción del cliente (Vite)                   |
| `npm start`          | Backend en producción (sirve el build de `client/dist`)  |
| `npm run dev --prefix client`  | Solo frontend (Vite)                           |
| `npm run dev --prefix server`  | Solo backend                                   |

---

## Estructura

```
server/                     → API Express + Mongoose
  server.js                 → entrada (conecta a Mongo y escucha)
  app.js                    → app de Express (API + /products + build del cliente)
  config/db.js              → conexión a MongoDB (con fallback en memoria)
  config/env.js             → carga server/.env (sin importar el cwd)
  models/                   → Product, Category, Cart (esquemas Mongoose)
  routes/api.js             → categorías, productos y carrito
  lib/search.js             → escapeRegex (la búsqueda es texto literal)
  test/search.test.js       → tests del backend (node:test)
  test/app.test.js          → tests de la app (SPA, API, estáticos)
  data/seedData.js          → 24 productos + 5 categorías
  seed.js                   → carga los datos en MongoDB
  public/products/          → imágenes de productos (01.webp … 24.webp)

client/                     → React + Vite (sin TypeScript)
  src/App.jsx               → layout, filtros, orden y navegación catálogo ↔ detalle
  src/api.js                → llamadas a la API
  src/config.js             → datos de la tienda (nombre, tagline, redes)
  src/index.css             → design tokens + tema claro/oscuro + Fondo (Aurora)
  src/context/
    CartContext.jsx         → carrito global (localStorage + sync a la API)
    ThemeContext.jsx        → modo claro/oscuro
    ColorContext.jsx        → paletas de acento CMYK en vivo
    ToastContext.jsx        → notificaciones (reemplaza alert())
  src/hooks/
    useCatalog.js           → fetch de productos + categorías (estados)
    useFavorites.js         → favoritos persistidos
    useOverlay.js           → foco/scroll/ESC de drawers modales
  src/lib/
    format.js               → formatPrice (es-AR)
    qty.js                  → tope de cantidad por stock
    cart.js                 → operaciones puras del carrito (cantidad ≤ stock)
    theme.js                → tema inicial (guardado o preferencia del sistema)
    confetti.js             → micro-festejo al agregar al carrito
  src/components/
    Header.jsx              → header de 2 niveles (marca + buscador / menú de categorías)
    Hero.jsx                → hero editorial + collage de productos
    Marquee.jsx             → marquee de frases
    StatsStrip.jsx          → contadores animados
    CatalogFilters.jsx      → panel de filtros (orden, favoritos, stock)
    ProductGrid.jsx         → grilla + skeleton/empty/error
    ProductCard.jsx         → tarjeta de producto (enlace "estirado")
    ProductDetail.jsx       → detalle con cantidad y stock
    CartDrawer.jsx          → carrito lateral
    Footer.jsx, Logo.jsx, Reveal.jsx, ColorSwatches.jsx, Aurora.jsx, BrandGallery.jsx
    icons.jsx               → set de iconos compartido
    ui/                     → primitivas: Button, IconButton, Badge, QtyStepper

scripts/fetch-sublimables.mjs → importa productos + imágenes del proveedor
assets/products/            → imágenes originales (origen, ignoradas por git)

compose.yaml                → MongoDB de desarrollo (Docker Compose)
.env.example                → variables del compose (copiar a `.env`, no se versiona)
```

> Los directorios `index.html`, `css/`, `js/` y `src/original/` de la raíz son
> la **versión estática antigua** y están ignorados por git. La app activa es
> `client/` + `server/`.

---

## API

| Método | Ruta                              | Descripción                               |
|--------|-----------------------------------|-------------------------------------------|
| GET    | `/api/categories`                 | Lista de categorías                        |
| GET    | `/api/products`                   | Todos los productos                        |
| GET    | `/api/products?category=Textil`   | Filtrar por categoría                      |
| GET    | `/api/products?search=taza`       | Buscar por nombre                          |
| GET    | `/api/products/:id`               | Un producto                                |
| GET    | `/api/cart/:cartId`               | Carrito por ID                             |
| POST   | `/api/cart/:cartId`               | Guardar carrito (`{ items: [...] }`)       |
| GET    | `/api/health`                     | Healthcheck                                |

---

## Funcionalidad

- **Catálogo** con grilla responsive y **estados de UI** explícitos: carga
  (skeleton), contenido, vacío y error con **reintento**.
- **Menú de categorías** en una barra sticky bajo el header (tabs `Todos` +
  categorías), con scroll horizontal en pantallas chicas.
- **Sidebar de filtros** (desktop) / **drawer “Filtros”** (móvil):
  orden (relevancia / precio ↑↓ / nombre), `Solo favoritos` y `Solo en stock`,
  más un botón **Limpiar**.
- **Búsqueda en vivo** en el header (buscador grande en desktop, toggle en móvil).
- **Favoritos** persistidos, con badge y contador en el header (desktop y menú móvil).
- **Detalle de producto**: foto grande, descripción, stock y cantidad.
- **Carrito real**: estado global (React Context) + persistencia en
  `localStorage` y sync a MongoDB vía `POST /api/cart/:cartId`. Subtotales por
  línea, contador y total en vivo. **La cantidad nunca supera el stock**
  disponible del producto.
- **Tema claro/oscuro** (toggle en el header) y **paletas de acento CMYK**
  seleccionables en vivo.
- **Toasts** para feedback, en lugar de `alert()`.

### Accesibilidad (WCAG 2.1 AA)

- HTML semántico, `skip link`, `:focus-visible` consistente y `aria-live` en
  conteos.
- Drawers (carrito, menú, filtros) con `role="dialog"`, `aria-modal`, **focus
  trap**, bloqueo de scroll, cierre con `Esc` y **restauración del foco**
  (`hooks/useOverlay.js`).
- Controles con `aria-pressed` / `aria-expanded` / `aria-controls` y etiquetas
  accesibles en todos los botones de icono.
- Estados vacíos y de error con mensajes claros y acción de recuperación.

---

## Diseño

Dirección **“Color Print Studio”**: vibrante pero disciplinado, con la firma
**CMYK** del logo como identidad de imprenta.

- **Amarillo** `#F8D000`, **Magenta** `#F80068`, **Cian** `#0090E0` → firma CMYK
  (franja superior, degradados, acentos).
- Escala de **neutros con matiz** (`--ink-*`), jerarquía de superficies
  (`--bg`, `--bg-elevated`, `--bg-subtle`, `--bg-inset`), radios, **escala de
  espaciado 8pt** y sombras tintadas.
- **Modo oscuro** vía `[data-theme="dark"]` y **paletas de acento** vía
  `ColorContext` (`--violet`, `--palette-deep`, `--gradient-brand`).
- **Fondo “Aurora” 100% CSS**: blobs CMYK animados + grilla de imprenta + grano
  sutil; respeta `prefers-reduced-motion` y se adapta al tema.
- **Tipografía:** Sora (display) + Outfit (cuerpo).

Los tokens viven en `client/src/index.css` (`:root` y `[data-theme="dark"]`).

---

## Mapa del código (graphify)

Este repo también se puede explorar como un **grafo de conocimiento**. Las
salidas viven en `graphify-out/` (generadas — están ignoradas por git):

- `graph.html` → grafo interactivo (se abre en el navegador, no necesita
  servidor).
- `GRAPH_REPORT.md` → reporte de auditoría: god nodes, comunidades,
  conexiones sorprendentes y preguntas sugeridas.

Para regenerarlo:

```bash
graphify .     # pipeline completo vía la skill /graphify
```

En un corpus solo de código no se necesita LLM: la extracción es estructural
(AST). Los nodos de documentación (el propio README, etc.) quedarían fuera del
grafo salvo que dispongas de una clave de Gemini.

## Datos e imágenes

- `server/data/seedData.js` contiene **24 productos** (nombre, categoría,
  descripción técnica, stock y precio de ejemplo) y **5 categorías**:
  `Cerámica`, `Polimero`, `Carton`, `Madera`, `Textil`.
- Las imágenes (`server/public/products/*.webp`) y los nombres se importaron del
  catálogo del proveedor **sistemacontinuo.com.ar** con
  `scripts/fetch-sublimables.mjs` (Store API de WooCommerce + descarga de
  imágenes optimizadas en WebP vía el optimizador de Next).
- ⚠️ Las imágenes pertenecen al proveedor; su uso comercial es responsabilidad
  del usuario. Los **precios son de ejemplo** (el catálogo de origen no publica
  precios).

Para reimportar:

```bash
node scripts/fetch-sublimables.mjs
```

---

## Personalizar con TU marca

### Colores y tipografía → `client/src/index.css`

Arriba del todo, en `:root`:

```css
--font-display: 'Sora', ...;
--font-body: 'Outfit', ...;
--yellow: #F8D000;    /* CMYK */
--magenta: #F80068;   /* CMYK */
--cyan: #0090E0;      /* CMYK */
--violet: #F80068;    /* acento vivo (default) */
--primary: var(--violet);
--bg: #FBFAF8;        /* superficie base */
```

Las paletas de acento seleccionables se definen en
`client/src/context/ColorContext.jsx` (`PALETTES`).

### Nombre / logo / redes → `client/src/config.js`

```js
export const STORE = {
  name: 'DTF Print',
  tagline: 'Sublimación & impresión personalizada',
  social: { facebook: '#', instagram: '#' },
};
```

El logo es `/logo.png` (en `client/public/`), servido por `components/Logo.jsx`.

### Productos → `server/data/seedData.js`

Agregá/quitá productos y categorías y corré `npm run seed` (o reiniciá en modo
memoria). Cada producto:
`{ id, name, price, category, image, stock, description }`.
