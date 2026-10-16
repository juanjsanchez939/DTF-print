import { CheckIcon } from './icons.jsx';

const SORTS = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'name', label: 'Nombre (A–Z)' },
];

// Panel de filtros del catálogo. Se reutiliza en el sidebar (desktop)
// y en el drawer off-canvas (móvil). Presentacional: todo llega por props.
export default function CatalogFilters({
  sort,
  onSortChange,
  favoritesOnly,
  onToggleFavorites,
  inStock,
  onToggleInStock,
  onClear,
  hasActiveFilters,
}) {
  return (
    <div className="filter-panel">
      <div className="filter-panel-head">
        <span className="filter-panel-title">Filtros</span>
        {hasActiveFilters && (
          <button className="filter-clear" type="button" onClick={onClear}>
            Limpiar
          </button>
        )}
      </div>

      <label className="filter-field">
        <span className="filter-label">Ordenar por</span>
        <select className="filter-select" value={sort} onChange={(e) => onSortChange(e.target.value)}>
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </label>

      <div className="filter-group">
        <span className="filter-label">Mostrar</span>

        <button
          type="button"
          className={`filter-toggle ${favoritesOnly ? 'on' : ''}`}
          aria-pressed={favoritesOnly}
          onClick={onToggleFavorites}
        >
          <span className="filter-check" aria-hidden="true"><CheckIcon /></span>
          Solo favoritos
        </button>

        <button
          type="button"
          className={`filter-toggle ${inStock ? 'on' : ''}`}
          aria-pressed={inStock}
          onClick={onToggleInStock}
        >
          <span className="filter-check" aria-hidden="true"><CheckIcon /></span>
          Solo en stock
        </button>
      </div>
    </div>
  );
}
