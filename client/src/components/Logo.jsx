import { STORE } from '../config.js';

// Logo: solo el icono de la marca.
export default function Logo({ height = 42 }) {
  return (
    <img
      src="/logo.png"
      alt={STORE.name}
      className="logo-icon"
      style={{ height }}
      draggable={false}
    />
  );
}
