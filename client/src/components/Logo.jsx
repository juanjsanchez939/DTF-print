import { STORE } from '../config.js';

// Logo de DTF Print: solo las letras, sin fondo.
// - logo.png       -> letras negras (tema claro)
// - logo-white.png -> letras blancas (tema oscuro), para que se siga leyendo.
export default function Logo({ height = 34 }) {
  return (
    <>
      <img
        src="/logo.png"
        alt={STORE.name}
        className="logo logo-light"
        style={{ height, width: 'auto' }}
        draggable={false}
      />
      <img
        src="/logo-white.png"
        alt=""
        className="logo logo-dark"
        style={{ height, width: 'auto' }}
        draggable={false}
        aria-hidden="true"
      />
    </>
  );
}
