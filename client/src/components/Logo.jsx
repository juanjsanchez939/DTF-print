import { STORE } from '../config.js';

// Logo: icono de la marca (imagen) + wordmark "DTF Print" en tipografía.
export default function Logo({ height = 34 }) {
  return (
    <span className="logo-lockup">
      <img
        src="/icono.png"
        alt={STORE.name}
        className="logo-icon"
        style={{ height }}
        draggable={false}
      />
      <span className="logo-wordmark" style={{ fontSize: Math.round(height * 0.62) }}>
        DTF<span className="lw-print">Print</span>
      </span>
    </span>
  );
}
