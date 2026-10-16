import { useCallback, useState } from 'react';

const FAV_KEY = 'dtf-fav';

// Los favoritos se guardan como ids; normaliza datos viejos guardados como objeto producto.
const normalize = (x) => (x && typeof x === 'object' ? x.id ?? x._id : x);

// Favoritos persistentes en localStorage.
export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(FAV_KEY));
      if (!Array.isArray(saved)) return [];
      return saved.map(normalize).filter((v) => v != null);
    } catch {
      return [];
    }
  });

  const toggle = useCallback((id) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(FAV_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  return { favorites, toggle, isFavorite };
}
