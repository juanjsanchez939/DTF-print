// Fetches the original storefront, extracts products + categories,
// downloads product images locally, and writes js/data.js (editable catalog).
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SRC_URL = 'https://galvangunellasublimables-pablogalvan19g.sumerlabs.com/';
const IMG_DIR = join(ROOT, 'assets', 'products');
const DATA_FILE = join(ROOT, 'js', 'data.js');

mkdirSync(IMG_DIR, { recursive: true });
mkdirSync(join(ROOT, 'js'), { recursive: true });

const html = await (await fetch(SRC_URL, {
  headers: { 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36' }
})).text();

const decode = (s) => s
  .replace(/&amp;/g, '&')
  .replace(/&#39;/g, "'")
  .replace(/&quot;/g, '"')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');

// --- Categories from the nav ---
const catSet = new Set();
for (const m of html.matchAll(/href="\/categoria\/([^"?]+)"/g)) {
  catSet.add(decode(decodeURIComponent(m[1])));
}
const categories = [...catSet];

// --- Products from the grid cards ---
// Card shape: <a class="_4ythJ" ...> <figure><img alt=".." src=".."/></figure> <div class="iKwBQ">NAME</div> ... <div class="_0Xin1">PRICE</div>
const products = [];
const cardRe = /<a class="_4ythJ"[^>]*?href="([^"]+)"[^>]*>.*?<img alt="([^"]*)"[^>]*?src="([^"]+)"[^>]*?\/>.*?<div class="iKwBQ">([^<]*)<\/div>.*?<div class="_0Xin1">([^<]*)<\/div>/gs;
for (const m of html.matchAll(cardRe)) {
  products.push({
    href: decode(m[1]),
    alt: decode(m[2]).trim(),
    image: decode(m[3]),
    name: decode(m[4]).trim(),
    price: decode(m[5]).trim(),
  });
}

// --- Category assignment heuristic (placeholder data, editable) ---
const RULES = [
  [/camiseta|remera|gorra|bebe|bebé|servilleta|mochila/i, 'Textil'],
  [/tela termoadhesiva|dtf/i, 'Insumos para DTF'],
  [/azucarera|yerbera|posa vaso|vaso/i, 'Cerámica'],
  [/estuche/i, 'Plastico'],
];
const categorize = (name) => {
  for (const [re, cat] of RULES) if (re.test(name)) return cat;
  return 'Otras categorias';
};

const catalog = products.map((p, i) => ({
  id: String(i + 1).padStart(2, '0'),
  name: p.name,
  price: p.price,
  category: categorize(p.name),
  image: `assets/products/${String(i + 1).padStart(2, '0')}.webp`,
  _src: p.image,
}));

// --- Download images ---
console.log(`Extracted ${products.length} products, ${categories.length} categories`);
for (const [i, p] of products.entries()) {
  const out = join(IMG_DIR, `${String(i + 1).padStart(2, '0')}.webp`);
  if (existsSync(out)) { console.log(`  [skip] ${p.name}`); continue; }
  try {
    const r = await fetch(p.image, { headers: { 'user-agent': 'Mozilla/5.0' } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const buf = Buffer.from(await r.arrayBuffer());
    writeFileSync(out, buf);
    console.log(`  [ok ${buf.length}b] ${p.name}`);
  } catch (e) {
    console.log(`  [FAIL] ${p.name} -> ${e.message}`);
    catalog[i].image = p.image; // fall back to remote URL
  }
}

// --- Write editable data file ---
const dataJs = `// =====================================================================
//  CATÁLOGO — editá este archivo para cambiar productos y categorías.
//  - categories: secciones que aparecen en el menú "Categories".
//  - products:   { name, price, category, image }
//    (la imagen puede ser una ruta local en assets/products/ o una URL).
// =====================================================================
window.CATALOG = {
  brand: {
    name: "TU MARCA",            // <-- poné el nombre de tu tienda
    tagline: "Productos sublimables",
  },
  categories: ${JSON.stringify(categories, null, 2)},
  products: ${JSON.stringify(catalog, null, 2)},
};
`;
writeFileSync(DATA_FILE, dataJs);
console.log(`\nWrote ${DATA_FILE} (${catalog.length} products)`);
