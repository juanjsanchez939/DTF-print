import Reveal from './Reveal.jsx';
import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products, loading, onAdd, onOpen, favorites, onToggleFavorite }) {
  if (loading) return <div className="loading-state">Cargando productos…</div>;
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
