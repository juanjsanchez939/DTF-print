import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCart, saveCart } from '../api.js';

const CartContext = createContext(null);

const CART_KEY = 'dtf-cart';
const CART_ID_KEY = 'dtf-cart-id';

function getCartId() {
  try {
    let id = localStorage.getItem(CART_ID_KEY);
    if (!id) {
      id = 'c' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem(CART_ID_KEY, id);
    }
    return id;
  } catch {
    return 'c-local';
  }
}

export function CartProvider({ children }) {
  const cartId = useMemo(getCartId, []);
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  // Cargar carrito: localStorage primero, backend como respaldo.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      let local = null;
      try {
        local = JSON.parse(localStorage.getItem(CART_KEY));
      } catch {}
      if (Array.isArray(local) && local.length) {
        setItems(local);
        setReady(true);
        return;
      }
      try {
        const remote = await getCart(cartId);
        if (!cancelled && Array.isArray(remote.items) && remote.items.length) {
          setItems(remote.items);
        }
      } catch {}
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [cartId]);

  // Persistir: localStorage siempre + sync al backend (best-effort).
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {}
    saveCart(cartId, items).catch(() => {});
  }, [items, ready, cartId]);

  const add = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + qty } : i));
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price: product.price, image: product.image, quantity: qty },
      ];
    });
  };

  const updateQty = (id, qty) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, add, updateQty, remove, clear, count, total, cartId }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
