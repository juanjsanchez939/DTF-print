import { STORE } from '../config.js';

// Logo tipográfico (sin imagen): "DTF PRINT" en negrita.
// "DTF" con cada letra en un color de marca (D dorado, T magenta, F azul)
// y "PRINT" en el color del tema.
export default function Logo({ height = 34 }) {
  const fontSize = Math.round(height * 0.56);
  return (
    <span className="logo-wordmark" style={{ fontSize }} aria-label={STORE.name}>
      <span style={{ color: '#F8D000' }}>D</span>
      <span style={{ color: '#F80068' }}>T</span>
      <span style={{ color: '#0090E0' }}>F</span>
      <span className="lw-print">PRINT</span>
    </span>
  );
}
