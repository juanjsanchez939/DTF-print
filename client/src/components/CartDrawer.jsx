import { useCart } from '../context/CartContext.jsx';

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
const CartEmptyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h2l2.4 10.2a1.5 1.5 0 0 0 1.46 1.18h7.86a1.5 1.5 0 0 0 1.46-1.18L21 9H6.6" />
    <circle cx="10" cy="20.4" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="17.5" cy="20.4" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

export default function CartDrawer({ open, onClose }) {
  const { items, updateQty, remove, clear, total } = useCart();

  const handleCheckout = () => {
    alert('Checkout de demostración: acá iría Mercado Pago o tu pasarela de pago.');
  };

  return (
    <>
      <div className={`cart-backdrop ${open ? 'show' : ''}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? 'open' : ''}`} aria-label="Carrito">
        <div className="cart-head">
          <h2 className="cart-title">Tu carrito</h2>
          <button className="icon-btn" type="button" aria-label="Cerrar" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <CartEmptyIcon />
            <p>Tu carrito está vacío.</p>
            <button className="btn btn-primary" type="button" onClick={onClose}>Seguir comprando</button>
          </div>
        ) : (
          <>
            <ul className="cart-items">
              {items.map((item) => (
                <li className="cart-item" key={item.id}>
                  <div className="cart-item-media">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-body">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <span className="cart-item-price">{formatPrice(item.price)}</span>
                    <div className="qty">
                      <button type="button" onClick={() => updateQty(item.id, item.quantity - 1)} aria-label="Quitar uno">−</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQty(item.id, item.quantity + 1)} aria-label="Agregar uno">+</button>
                    </div>
                  </div>
                  <button className="cart-item-remove" type="button" onClick={() => remove(item.id)} aria-label="Eliminar">
                    <CloseIcon />
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-foot">
              <button className="cart-clear" type="button" onClick={clear}>Vaciar carrito</button>
              <div className="cart-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <button className="btn btn-primary cart-checkout" type="button" onClick={handleCheckout}>
                Finalizar compra
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function formatPrice(n) {
  return '$' + String(n ?? 0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
