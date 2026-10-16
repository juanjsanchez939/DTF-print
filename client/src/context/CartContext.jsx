import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getCart, saveCart } from '../api.js';
import { addItem, setItemQty } from '../lib/cart.js';

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

  // Espejo sincrónico del carrito: permite aplicar una operación y saber en el
  // acto si cambió algo (sin depender del estado del último render).
  const itemsRef = useRef(items);
  const applyItems = useCallback((next) => {
    itemsRef.current = next;
    setItems(next);
    return next;
  }, []);

  // Cargar carrito: localStorage primero, backend como respaldo.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      let local = null;
      try {
        local = JSON.parse(localStorage.getItem(CART_KEY));
      } catch {}
      if (Array.isArray(local) && local.length) {
        applyItems(local);
        setReady(true);
        return;
      }
      try {
        const remote = await getCart(cartId);
        if (!cancelled && Array.isArray(remote.items) && remote.items.length) {
          applyItems(remote.items);
        }
      } catch {}
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [cartId, applyItems]);

  // Persistir: localStorage siempre + sync al backend (best-effort).
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {}
    saveCart(cartId, items).catch(() => {});
  }, [items, ready, cartId]);

  // Nunca se agrega más cantidad que el stock disponible (ver lib/cart.js).
  // Devuelve `true` solo si el carrito cambió realmente.
  const add = (product, qty = 1) => {
    const before = itemsRef.current;
    const after = applyItems(addItem(before, product, qty));
    return after !== before;
  };

  const updateQty = (id, qty) => applyItems(setItemQty(itemsRef.current, id, qty));
  const remove = (id) => applyItems(itemsRef.current.filter((i) => i.id !== id));
  const clear = () => applyItems([]);

  const count = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, add, updateQty, remove, clear, count, total, cartId }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
