import { STORE } from '../config.js';

// Logo real de DTF Print (imagen). El fondo blanco fue removido; el texto es
// negro con acentos de marca, así que en dark mode se le pone un plato blanco
// detrás (ver .brand en index.css).
export default function Logo({ height = 34 }) {
  return (
    <img
      src="/logo.png"
      alt={STORE.name}
      className="logo"
      style={{ height, width: 'auto' }}
      draggable={false}
    />
  );
}
