// Fondo de manchas de pintura (imagen de referencia, transparente).
// Cubre todo el viewport de forma sutil, detrás del contenido.
export default function Aurora() {
  return (
    <div className="splatter" aria-hidden="true">
      <img src="/splatter.webp" alt="" className="splatter-img" draggable={false} />
    </div>
  );
}
