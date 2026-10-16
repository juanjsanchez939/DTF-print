// Operaciones puras sobre las líneas del carrito.
// La cantidad de cada línea está siempre acotada por el stock del producto.
import { clampQty } from './qty.js';

const idOf = (product) => product.id ?? product._id;

// Agrega `qty` unidades del producto (o fusiona con la línea existente),
// sin superar el stock. Devuelve el MISMO array si la cantidad no cambió
// (así quien llama sabe si realmente se agregó algo).
export function addItem(items, product, qty = 1) {
  const id = idOf(product);
  const existing = items.find((i) => i.id === id);
  const stock = product.stock ?? existing?.stock;
  const current = existing?.quantity ?? 0;
  const quantity = clampQty(current + qty, stock);

  if (quantity === current) return items;

  if (existing) {
    return items.map((i) => (i.id === id ? { ...i, quantity, ...(stock == null ? null : { stock }) } : i));
  }

  const item = {
    id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity,
  };
  if (stock != null) item.stock = stock;
  return [...items, item];
}

// Cambia la cantidad de una línea. `qty <= 0` la elimina; nunca supera el stock.
// Devuelve el MISMO array si no hay nada que cambiar.
export function setItemQty(items, id, qty) {
  if (qty <= 0) return items.filter((i) => i.id !== id);

  const target = items.find((i) => i.id === id);
  if (!target) return items;

  const quantity = clampQty(qty, target.stock);
  if (quantity === target.quantity) return items;

  return items.map((i) => (i.id === id ? { ...i, quantity } : i));
}
