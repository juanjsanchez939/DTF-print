import { useRef } from 'react';

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h2l2.4 10.2a1.5 1.5 0 0 0 1.46 1.18h7.86a1.5 1.5 0 0 0 1.46-1.18L21 9H6.6" />
    <circle cx="10" cy="20.4" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="17.5" cy="20.4" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20.5S3.5 15.5 3.5 9.5A4.5 4.5 0 0 1 12 6.7a4.5 4.5 0 0 1 8.5 2.8c0 6-8.5 11-8.5 11Z" />
  </svg>
);

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function ProductCard({ product, onAdd, onOpen, index = 0, isFavorite, onToggleFavorite }) {
  const cardRef = useRef(null);

  const onMove = (e) => {
    if (reduceMotion()) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', (0.5 - py) * 9 + 'deg');
    el.style.setProperty('--ry', (px - 0.5) * 9 + 'deg');
    el.style.setProperty('--px', px * 100 + '%');
    el.style.setProperty('--py', py * 100 + '%');
  };
  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <article
      ref={cardRef}
      className="product-card"
      style={{ '--i': index % 12 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => onOpen(product)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(product)}
    >
      <figure className="product-media">
        <img src={product.image} alt={product.name} loading="lazy" />
      </figure>

      <button
        className={`card-fav ${isFavorite ? 'active' : ''}`}
        type="button"
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(product);
        }}
      >
        <HeartIcon filled={isFavorite} />
      </button>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-bottom">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button
            className="product-add"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAdd(product, 1, e.currentTarget);
            }}
          >
            Agregar <CartIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

function formatPrice(n) {
  return '$' + String(n ?? 0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
