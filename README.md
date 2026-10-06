# DTF Print — Tienda de sublimación (stack MERN)

Catálogo de productos construido con **MERN**:

- **M**ongoDB — base de datos de productos y categorías
- **E**xpress — API REST
- **R**eact — frontend (Vite)
- **N**ode.js — runtime del backend

> La tienda original era un SaaS de Domun.co. Este proyecto es una
> reconstrucción propia del frontend + un backend real en MERN, con los
> productos originales como **placeholder**.

## Estructura

```
server/                 → API Express + Mongoose
  server.js             → entrada (API + sirve las imágenes)
  config/db.js          → conexión a MongoDB (con fallback en memoria)
  models/               → Product, Category, Cart (esquemas Mongoose)
  routes/api.js         → categorías, productos y carrito
  data/seedData.js      → datos iniciales (24 productos, 11 categorías)
  seed.js               → carga los datos en MongoDB
  public/products/      → imágenes de los productos
client/                 → React + Vite
  src/App.jsx           → navegación catálogo <-> detalle + estado
  src/context/          → CartContext (carrito) y ThemeContext (dark mode)
  src/components/       → Header, Hero, CategoryRail, ProductGrid, ProductCard, ProductDetail, CartDrawer, Footer
  src/index.css         → diseño + paleta + tema claro/oscuro (tokens)
  src/api.js            → llamadas a la API
assets/products/        → imágenes originales (origen)
```

## Requisitos

- Node.js 18+ (probado con v24)
- MongoDB (local o [Atlas](https://www.mongodb.com/atlas)) — *opcional para probar*:
  si no hay `MONGODB_URI`, el backend arranca con **datos en memoria**.

## Cómo correrlo

```bash
# 1) Instalar dependencias (raíz + server + client)
npm run setup

# 2) (Opcional) Configurar MongoDB
cd server
copy .env.example .env      # y poné tu MONGODB_URI
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

## API

| Método | Ruta                              | Descripción                              |
|--------|-----------------------------------|------------------------------------------|
| GET    | `/api/categories`                 | Lista de categorías                       |
| GET    | `/api/products`                   | Todos los productos                       |
| GET    | `/api/products?category=Textil`   | Filtrar por categoría                     |
| GET    | `/api/products?search=remera`     | Buscar por nombre                         |
| GET    | `/api/products/:id`               | Un producto                               |
| GET    | `/api/cart/:cartId`               | Carrito por ID                            |
| POST   | `/api/cart/:cartId`               | Guardar carrito (body: `{ items: [...] }`)|
| GET    | `/api/health`                     | Healthcheck                               |

## Funcionalidad

- **Catálogo** con grilla responsive, filtro por categoría (chips + dropdown) y búsqueda en vivo.
- **Detalle de producto**: click en una tarjeta abre la vista con foto grande, descripción, stock y cantidad.
- **Carrito real**: estado global (React Context) + persistencia en `localStorage` y sync a MongoDB vía `POST /api/cart/:cartId`. Agregar, cambiar cantidad, quitar y total en vivo.
- **Dark mode**: toggle en el header, persiste la preferencia y respeta `prefers-color-scheme`.

## Personalizar con TU marca

### Colores y tipografía → `client/src/index.css`

Arriba del todo, en `:root`:

```css
--font-display: 'Sora', ...;   /* títulos y logo */
--font-body: 'Outfit', ...;    /* texto */
--violet: #6C2BD9;             /* color principal */
--magenta: #FF2E8A;            /* acento CMYK */
--cyan: #00B8D4;               /* acento CMYK */
--yellow: #FFC400;             /* acento CMYK */
--bg: #FBFAF8;                 /* fondo */
```

### Nombre / logo / redes → `client/src/config.js`

```js
export const STORE = {
  name: 'DTF Print',
  tagline: 'Sublimación & impresión personalizada',
  social: { facebook: '#', instagram: '#' },
};
```

Para usar un logo con imagen, poné `logo.png` en `client/public/` y descomentá
la línea `<img className="brand-logo" ...>` en `components/Header.jsx`.

### Productos → `server/data/seedData.js`

Agregá/quitanás productos y categorías, y corré `npm run seed` (o reiniciá en
modo memoria). Cada producto: `{ id, name, price, category, image, stock, description }`.

## Diseño (psicología del color)

Dirección **"Color Print Studio"**: vibrante pero disciplinado, con la firma CMYK
como identidad de imprenta.

- **Violeta** `#6C2BD9` → creatividad, innovación, personalización
- **Magenta** `#FF2E8A` → energía y deseo (acentos y CTA)
- **Cian** `#00B8D4` + **Amarillo** `#FFC400` → firma CMYK (franja superior, chips)
- Fondo off-white `#FBFAF8` → deja que los productos coloridos destaquen
- **Tipografía:** Sora (display) + Outfit (cuerpo) — sin Inter genérico

Componentes: header flotante "isla de vidrio", hero editorial con collage de
productos reales, barra de categorías (chips), grilla de productos con doble
bisel y reveal escalonado al hacer scroll.
