import { useState } from 'react';
import Button from './ui/Button.jsx';
import QtyStepper from './ui/QtyStepper.jsx';
import { ArrowLeft, CartIcon } from './icons.jsx';
import { formatPrice } from '../lib/format.js';
import { clampQty } from '../lib/qty.js';

export default function ProductDetail({ product, onBack, onAdd }) {
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="detail-wrap">
        <Button variant="ghost" onClick={onBack}><ArrowLeft /> Volver</Button>
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
      <Button variant="ghost" onClick={onBack}><ArrowLeft /> Volver al catálogo</Button>

      <div className="detail-grid">
        <div className="detail-media">
          <img src={product.image} alt={product.name} loading="eager" decoding="async" width="800" height="800" />
        </div>

        <div className="detail-info">
          <span className="eyebrow"><span className="dot" /> {product.category}</span>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-desc">{product.description}</p>

          <div className="detail-price">{formatPrice(product.price)}</div>

          <div className={`detail-stock ${outOfStock ? 'out' : ''}`}>
            <span className="stock-dot" />
            {outOfStock ? 'Sin stock' : `${product.stock} disponibles`}
          </div>

          <div className="detail-actions">
            <QtyStepper
              size="lg"
              value={qty}
              max={product.stock}
              onChange={(q) => setQty(clampQty(q, product.stock))}
              label="este producto"
            />
            <Button disabled={outOfStock} onClick={add}>
              Agregar al carrito <CartIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
