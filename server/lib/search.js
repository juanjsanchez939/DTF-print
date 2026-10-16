// Búsquedas: el texto del usuario se usa como texto literal, nunca como patrón.
// Sin escapar, un `(` produce una query inválida (500) y una entrada maliciosa
// puede provocar backtracking catastrófico (ReDoS).
export function escapeRegex(text) {
  return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
