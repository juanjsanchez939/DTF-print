// Importa los productos de la categoría "Productos para Sublimar" (id 25) de
// sistemacontinuo.com.ar: descarga las imágenes y genera un mapeo con nombre,
// slug y categorías reales. Salida: tmp/sublimables-map.json
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'server', 'public', 'products');
const OUT_JSON = join(ROOT, 'tmp', 'sublimables-map.json');

mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(join(ROOT, 'tmp'), { recursive: true });

const API = 'https://api.sistemacontinuo.com.ar/wp-json/wc/store/v1/products';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';

// Imágenes que muestra la página /sublimables (en orden de aparición).
const TARGETS = [
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/2752-863-Bandeja-A4-madera-cristal-20x29-en-bolsa-por-unidad.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/2871-2b8-Jarro-Para-Cafe-Sublimable.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/3428-9d7-Caja-para-vino-Sublimable-De-Madera.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/4105-104-Caja-de-Carton-Sublimable-con-Ventana-para-Tazas.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/4628-1cb-Jarro.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/4629-ce1-Mate.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/4736-d6c-Taza-Blanca.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/4740-3d0-Chop-Polimero-Para-Sublimar.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/4741-efa-Vaso-Lapicero.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/5333-772-Plancha-de-6-Posa-vaso-de-Carton-Blanco-Brillante-sublimable.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/5359-13d-Jarro-1.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/6281-8e7-Cantimplora-Nino-1.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/6771-db2-Plancha-con-2-rompecabezas-sublimable-de-carton-8-piezas-blanco-brillante.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/7117-99c-Tapa-Alcancia-de-Polimero-Sublimable-1.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/7529-24d-Porta-celular-Madera-Cristal-bolsa-x-5-unidades.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/8107-9ef-Taza-Recta-Apilable-de-Polimero-SubliPol-Blanca.png',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/8362-ffa-Caja-sublimable-de-carton-para-tazas.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/8449-710-Taza-Sublimable-Importada-de-Ceramica-Blanca.png',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/8659-570-Carton-sublimable-A4.png',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/8815-8bf-Rompecabezas-sublimable-de-carton-Forma-Corazon-blanco-brillante-x-10-unidades.jpg',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/GTS-AB-1.png',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/GTS-P34.png',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/GTS-V08-1.png',
  'https://api.sistemacontinuo.com.ar/wp-content/uploads/2026/04/TApa-especiero-1.jpg',
];

const clean = (s) => s.split('?')[0];

async function fetchAllCategory() {
  const all = [];
  for (let page = 1; page <= 3; page++) {
    const res = await fetch(`${API}?category=25&per_page=100&page=${page}`, { headers: { 'user-agent': UA } });
    if (!res.ok) break;
    const json = await res.json();
    if (!Array.isArray(json) || json.length === 0) break;
    all.push(...json);
    if (json.length < 100) break;
  }
  return all;
}

const products = await fetchAllCategory();
console.log(`Productos en categoría 25: ${products.length}`);

// Índice: URL de imagen (sin query) -> producto
const byImage = new Map();
for (const p of products) {
  for (const img of p.images || []) {
    byImage.set(clean(img.src), p);
  }
}

const result = [];
let n = 0;
for (const target of TARGETS) {
  n += 1;
  const product = byImage.get(clean(target));
  // Usamos el optimizador de imágenes del propio sitio: entrega WebP ~750px,
  // mucho más liviano que el original (algunos PNG superaban 1 MB).
  // Reintentamos con otros anchos si el caché del sitio devuelve AVIF.
  let buf = null;
  let ext = '';
  let type = '';
  for (const w of [750, 640, 1200, 1920]) {
    const optimizer = `https://sistemacontinuo.com.ar/_next/image?url=${encodeURIComponent(clean(target))}&w=${w}&q=75`;
    const res = await fetch(optimizer, {
      headers: { 'user-agent': UA, accept: 'image/webp,*/*;q=0.8', referer: 'https://sistemacontinuo.com.ar/' },
    });
    if (!res.ok) continue;
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    const body = Buffer.from(await res.arrayBuffer());
    if (ct.includes('webp')) {
      buf = body;
      ext = '.webp';
      type = ct;
      break;
    }
    if (!buf) {
      buf = body;
      ext = ct.includes('avif') ? '.avif' : extname(clean(target)) || '.jpg';
      type = ct;
    }
  }
  if (!buf) {
    console.error(`  ! ${n}: no se pudo descargar ${target}`);
    continue;
  }
  const file = `${String(n).padStart(2, '0')}${ext}`;
  writeFileSync(join(OUT_DIR, file), buf);
  console.log(`     [${type || 'sin tipo'} -> ${file}]`);

  if (!product) {
    console.warn(`  ? ${n}: sin match de producto para ${target}`);
    result.push({ id: String(n).padStart(2, '0'), file, image: target, name: null, slug: null, categories: [] });
    continue;
  }

  result.push({
    id: String(n).padStart(2, '0'),
    file,
    image: target,
    name: product.name,
    slug: product.slug,
    categories: (product.categories || []).map((c) => c.name),
    short: (product.short_description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
    full: (product.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
  });
  console.log(`  ${n}: "${product.name}" -> ${file}`);
}

writeFileSync(OUT_JSON, JSON.stringify(result, null, 2));
console.log(`\nEscrito ${OUT_JSON} (${result.length} items)`);
