import { STORE } from '../config.js';

// Logo tipográfico "DTF Print" (sin imagen): "DTF" en gradiente de marca
// (dorado -> magenta -> azul) y "Print" en el color del tema.
export default function Logo({ height = 34 }) {
  const fontSize = Math.round(height * 0.62);
  return (
    <span className="logo-wordmark" style={{ fontSize }} aria-label={STORE.name}>
      <span className="lw-dtf">DTF</span>
      <span className="lw-print">Print</span>
    </span>
  );
}
