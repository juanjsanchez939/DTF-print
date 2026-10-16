import { useRef } from 'react';
import { CartIcon, HeartIcon } from './icons.jsx';
import { formatPrice } from '../lib/format.js';

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
    <article ref={cardRef} className="product-card" style={{ '--i': index % 12 }} onMouseMove={onMove} onMouseLeave={onLeave}>
      <figure className="product-media">
        <img src={product.image} alt={product.name} loading="lazy" decoding="async" width="600" height="600" />
      </figure>

      <button
        className={`card-fav ${isFavorite ? 'active' : ''}`}
        type="button"
        aria-label={isFavorite ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(product)}
      >
        <HeartIcon filled={isFavorite} />
      </button>

      <div className="product-info">
        <h3 className="product-name">
          <button className="product-open" type="button" onClick={() => onOpen(product)}>
            {product.name}
          </button>
        </h3>
        <div className="product-bottom">
          <span className="product-price">{formatPrice(product.price)}</span>
          <button className="product-add" type="button" onClick={(e) => onAdd(product, 1, e.currentTarget)}>
            Agregar <CartIcon />
          </button>
        </div>
      </div>
    </article>
  );
}
