// Fondo aurora animado con los colores de la marca (dorado / magenta / azul).
// Solo transform + opacity (GPU-friendly), respeta prefers-reduced-motion.
export default function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />
    </div>
  );
}
