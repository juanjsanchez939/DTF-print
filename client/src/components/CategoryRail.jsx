export default function CategoryRail({ categories, activeCategory, onSelect }) {
  const chips = [{ name: 'all', label: 'Todos' }, ...categories.map((c) => ({ name: c.name, label: c.name }))];

  return (
    <div className="category-rail" role="tablist" aria-label="Categorías">
      {chips.map((c) => (
        <button
          key={c.name}
          role="tab"
          type="button"
          className={`chip ${activeCategory === c.name ? 'active' : ''}`}
          onClick={() => onSelect(c.name)}
        >
          <span className="chip-dot" />
          {c.label}
        </button>
      ))}
    </div>
  );
}
