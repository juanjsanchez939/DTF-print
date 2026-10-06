import { createContext, useContext, useEffect, useState } from 'react';

// Paletas de acento: cambian el gradiente de la marca y el color principal en vivo.
const PALETTES = [
  { id: 'dorado', label: 'Marca', violet: '#F80068', gradient: 'linear-gradient(115deg, #F8D000 0%, #F80068 50%, #0090E0 100%)' },
  { id: 'fresa', label: 'Fresa', violet: '#FF2E8A', gradient: 'linear-gradient(115deg, #FF2E8A 0%, #FF5E7A 50%, #FF9A3D 100%)' },
  { id: 'cian', label: 'Cian', violet: '#00B8D4', gradient: 'linear-gradient(115deg, #00B8D4 0%, #22D3EE 45%, #6C2BD9 100%)' },
  { id: 'sunset', label: 'Sunset', violet: '#F97316', gradient: 'linear-gradient(115deg, #F97316 0%, #FF2E8A 55%, #B32BFF 100%)' },
  { id: 'lima', label: 'Lima', violet: '#10B981', gradient: 'linear-gradient(115deg, #10B981 0%, #34D399 45%, #00B8D4 100%)' },
];

const KEY = 'dtf-color';
const ColorContext = createContext(null);

export function ColorProvider({ children }) {
  const [paletteId, setPaletteId] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY);
      return saved === 'violeta' ? 'dorado' : saved || 'dorado';
    } catch {
      return 'dorado';
    }
  });

  const palette = PALETTES.find((p) => p.id === paletteId) || PALETTES[0];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--violet', palette.violet);
    root.style.setProperty('--gradient-brand', palette.gradient);
    try {
      localStorage.setItem(KEY, palette.id);
    } catch {}
  }, [palette]);

  const setColor = (id) => setPaletteId(id);

  return (
    <ColorContext.Provider value={{ palettes: PALETTES, current: palette.id, setColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export const useColor = () => useContext(ColorContext);
