const BASE = '/api';

async function request(path, options) {
  const res = await fetch(BASE + path, options);
  if (!res.ok) throw new Error(`Error ${res.status} en ${path}`);
  return res.json();
}

export const getCategories = () => request('/categories');

export const getProducts = (params = {}) => {
  const q = new URLSearchParams();
  if (params.category) q.set('category', params.category);
  if (params.search) q.set('search', params.search);
  const qs = q.toString();
  return request(`/products${qs ? '?' + qs : ''}`);
};

export const getProduct = (id) => request(`/products/${encodeURIComponent(id)}`);

export const getCart = (cartId) => request(`/cart/${encodeURIComponent(cartId)}`);

export const saveCart = (cartId, items) =>
  request(`/cart/${encodeURIComponent(cartId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
