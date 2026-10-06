import { useState } from 'react';

const BackIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <path d="M13 8H3M7 4l-4 4 4 4" />
  </svg>
);
const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h2l2.4 10.2a1.5 1.5 0 0 0 1.46 1.18h7.86a1.5 1.5 0 0 0 1.46-1.18L21 9H6.6" />
    <circle cx="10" cy="20.4" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="17.5" cy="20.4" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

// Colores para el personalizador (incluye los de la marca).
const COLORS = [
  { name: 'Original', value: null },
  { name: 'Dorado', value: '#F8D000' },
  { name: 'Magenta', value: '#F80068' },
  { name: 'Azul', value: '#0090E0' },
  { name: 'Negro', value: '#17131F' },
  { name: 'Verde', value: '#22C55E' },
  { name: 'Naranja', value: '#FF5A1F' },
  { name: 'Blanco', value: '#F7F7F7' },
];

export default function ProductDetail({ product, onBack, onAdd }) {
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(null);

  if (!product) {
    return (
      <div className="detail-wrap">
        <button className="btn btn-ghost" type="button" onClick={onBack}><BackIcon /> Volver</button>
        <div className="empty-state">Producto no encontrado.</div>
      </div>
    );
  }

  const outOfStock = (product.stock ?? 0) <= 0;
  const add = (e) => {
    onAdd(product, qty, e.currentTarget);
    setQty(1);
  };

  return (
    <div className="detail-wrap">
      <button className="btn btn-ghost" type="button" onClick={onBack}><BackIcon /> Volver al catálogo</button>

      <div className="detail-grid">
        <div className="detail-media">
          <img src={product.image} alt={product.name} className={color ? 'recolored' : ''} />
          {color && <div className="color-overlay" style={{ background: color }} />}
        </div>

        <div className="detail-info">
          <span className="eyebrow"><span className="dot" /> {product.category}</span>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-desc">{product.description}</p>

          <div className="detail-price">{formatPrice(product.price)}</div>

          {/* Personalizador de color (previsualización en vivo) */}
          <div className="detail-colors">
            <span className="detail-colors-label">Elegí color:</span>
            <div className="detail-swatches">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  className={`color-swatch ${color === c.value ? 'active' : ''} ${c.value == null ? 'original' : ''}`}
                  style={c.value ? { background: c.value } : undefined}
                  onClick={() => setColor(c.value)}
                  title={c.name}
                  aria-label={`Color ${c.name}`}
                  aria-pressed={color === c.value}
                />
              ))}
            </div>
          </div>

          <div className={`detail-stock ${outOfStock ? 'out' : ''}`}>
            <span className="stock-dot" />
            {outOfStock ? 'Sin stock' : `${product.stock} disponibles`}
          </div>

          <div className="detail-actions">
            <div className="qty qty-lg">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Quitar uno">−</button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Agregar uno">+</button>
            </div>
            <button className="btn btn-primary" type="button" disabled={outOfStock} onClick={add}>
              Agregar al carrito <CartIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatPrice(n) {
  return '$' + String(n ?? 0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
