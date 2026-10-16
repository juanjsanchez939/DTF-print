// Tema claro/oscuro. La misma regla que el script inline de index.html
// (que evita el parpadeo antes del primer pintado): el tema guardado manda;
// si no hay ninguno, se usa la preferencia del sistema.
export const THEME_KEY = 'dtf-theme';

export function resolveInitialTheme(stored, prefersDark) {
  if (stored === 'dark' || stored === 'light') return stored;
  return prefersDark ? 'dark' : 'light';
}
