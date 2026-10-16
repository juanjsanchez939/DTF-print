// Utilidades de formato compartidas.
export function formatPrice(n) {
  return '$' + String(n ?? 0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
