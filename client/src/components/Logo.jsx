import { STORE } from '../config.js';

const TILE_COLORS = ['#F8D000', '#F80068', '#0090E0'];

// Logo tipográfico (sin imagen): "DTF PRINT".
// Cada letra de "DTF" va sobre un bloque de color de la marca (color detrás),
// con la letra negra encima; "PRINT" en el color del tema.
export default function Logo({ height = 34 }) {
  const fontSize = Math.round(height * 0.52);
  return (
    <span className="logo-wordmark" style={{ fontSize }} aria-label={STORE.name}>
      {['D', 'T', 'F'].map((letter, i) => (
        <span key={letter} className="lw-tile" style={{ background: TILE_COLORS[i] }}>
          {letter}
        </span>
      ))}
      <span className="lw-print">PRINT</span>
    </span>
  );
}
