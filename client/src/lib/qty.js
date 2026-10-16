// Cantidad válida para una línea de producto: entero, mínimo 1 y nunca más
// que el stock disponible (0 si no hay stock). `stock` desconocido = sin tope.
export function clampQty(value, stock = Infinity) {
  const max = stock == null ? Infinity : Math.max(0, Math.floor(Number(stock) || 0));
  if (max <= 0) return 0;
  const n = Math.floor(Number(value) || 0);
  return Math.min(Math.max(n, 1), max);
}
