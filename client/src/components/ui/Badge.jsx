// Badge numérico para íconos (carrito / favoritos).
// El conteo se expone en el aria-label del botón, así que se oculta al lector.
export default function Badge({ count }) {
  if (!count) return null;
  return (
    <span className="badge" aria-hidden="true">
      {count}
    </span>
  );
}
