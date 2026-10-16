// Stepper de cantidad reutilizable (carrito y detalle).
// `max` acota la cantidad (stock); al alcanzarlo se deshabilita el botón "+".
export default function QtyStepper({ value, onChange, size = 'md', label = '', max = Infinity }) {
  const suffix = label ? ` de ${label}` : '';
  const atMax = value >= max;
  return (
    <div className={`qty ${size === 'lg' ? 'qty-lg' : ''}`}>
      <button type="button" onClick={() => onChange(value - 1)} aria-label={`Quitar uno${suffix}`}>
        −
      </button>
      <span aria-hidden="true">{value}</span>
      <button
        type="button"
        disabled={atMax}
        onClick={() => onChange(value + 1)}
        aria-label={`Agregar uno${suffix}`}
      >
        +
      </button>
    </div>
  );
}
