import { STORE } from '../config.js';

const TILE_COLORS = ['#F8D000', '#F80068', '#0090E0'];
const TILE_ROT = ['-5deg', '4deg', '-3deg'];

// Logo tipográfico (sin imagen): "DTF PRINT".
// Detrás de cada letra de "DTF" hay una pincelada de color de la marca,
// con la letra negra encima.
export default function Logo({ height = 34 }) {
  const fontSize = Math.round(height * 0.52);
  return (
    <span className="logo-wordmark" style={{ fontSize }} aria-label={STORE.name}>
      {['D', 'T', 'F'].map((letter, i) => (
        <span
          key={letter}
          className="lw-tile"
          style={{ color: TILE_COLORS[i], transform: `rotate(${TILE_ROT[i]})` }}
        >
          <svg className="lw-brush" viewBox="0 0 48 48" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M7 24 C10 13 20 7 29 9 C37 11 42 17 40 24 C38 31 31 37 23 36 C14 35 6 30 7 24 Z"
              fill="currentColor"
            />
          </svg>
          <span className="lw-letter">{letter}</span>
        </span>
      ))}
      <span className="lw-print">PRINT</span>
    </span>
  );
}
