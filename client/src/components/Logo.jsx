import { STORE } from '../config.js';

// Logo de DTF Print: marca de "separación de color" (círculos superpuestos
// en los colores de la marca) + wordmark. El texto usa currentColor para
// adaptarse al tema claro/oscuro.
export default function Logo({ height = 34 }) {
  return (
    <svg
      viewBox="0 0 158 40"
      style={{ height, width: 'auto' }}
      className="logo"
      role="img"
      aria-label={STORE.name}
    >
      <circle cx="17" cy="23" r="10.5" fill="#F8D000" style={{ mixBlendMode: 'multiply' }} />
      <circle cx="27.5" cy="23" r="10.5" fill="#F80068" style={{ mixBlendMode: 'multiply' }} />
      <circle cx="22.5" cy="12.5" r="10.5" fill="#0090E0" style={{ mixBlendMode: 'multiply' }} />
      <text
        x="45"
        y="26.5"
        fontFamily="'Sora', sans-serif"
        fontWeight="800"
        fontSize="19"
        fill="currentColor"
        letterSpacing="-0.5"
      >
        DTF<tspan fontWeight="500" opacity="0.72">Print</tspan>
      </text>
    </svg>
  );
}
