import { useRef } from 'react';
import IconButton from './ui/IconButton.jsx';
import Button from './ui/Button.jsx';
import QtyStepper from './ui/QtyStepper.jsx';
import { CartIcon, CloseIcon } from './icons.jsx';
import { formatPrice } from '../lib/format.js';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import useOverlay from '../hooks/useOverlay.js';

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, remove, clear, total, count } = useCart();
  const toast = useToast();
  const drawerRef = useRef(null);

  useOverlay(open, onClose, drawerRef);

  const handleCheckout = () => {
    toast('Checkout de demostración — acá iría Mercado Pago o tu pasarela de pago.');
  };

  return (
    <>
      <div className={`cart-backdrop ${open ? 'show' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside
        className={`cart-drawer ${open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        aria-hidden={!open}
        tabIndex={-1}
        ref={drawerRef}
      >
        <div className="cart-head">
          <h2 className="cart-title">
            Tu carrito{count > 0 ? <span className="cart-count-pill">{count}</span> : null}
          </h2>
          <IconButton label="Cerrar carrito" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <CartIcon />
            <p>Tu carrito está vacío.</p>
            <Button onClick={onClose}>Seguir comprando</Button>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item) => (
                <li className="cart-item" key={item.id}>
                  <div className="cart-item-media">
                    <img src={item.image} alt="" loading="lazy" decoding="async" width="64" height="64" />
                  </div>
                  <div className="cart-item-body">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <span className="cart-item-price">{formatPrice(item.price)}</span>
                    <QtyStepper value={item.quantity} max={item.stock} onChange={(q) => updateQty(item.id, q)} label={item.name} />
                  </div>
                  <div className="cart-item-end">
                    <span className="cart-item-subtotal">{formatPrice(item.price * item.quantity)}</span>
                    <button className="cart-item-remove" type="button" onClick={() => remove(item.id)} aria-label={`Eliminar ${item.name}`}>
                      <CloseIcon />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-foot">
              <button className="cart-clear" type="button" onClick={clear}>Vaciar carrito</button>
              <div className="cart-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <Button className="cart-checkout" onClick={handleCheckout}>
                Finalizar compra
              </Button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
