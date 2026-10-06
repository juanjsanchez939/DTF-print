import Reveal from './Reveal.jsx';
import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products, loading, onAdd, onOpen, favorites, onToggleFavorite }) {
  if (loading) {
    return (
      <div className="products-grid" aria-busy="true" aria-label="Cargando productos">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="product-card skeleton" key={i}>
            <div className="sk-img" />
            <div className="sk-line" />
            <div className="sk-line short" />
          </div>
        ))}
      </div>
    );
  }
  if (!products.length) return <div className="empty-state">No se encontraron productos.</div>;

  return (
    <Reveal as="div" className="products-grid">
      {products.map((p, i) => {
        const id = p.id || p._id || p.name;
        return (
          <ProductCard
            key={id}
            product={p}
            index={i}
            onAdd={onAdd}
            onOpen={onOpen}
            isFavorite={favorites.includes(id)}
            onToggleFavorite={onToggleFavorite}
          />
        );
      })}
    </Reveal>
  );
}
