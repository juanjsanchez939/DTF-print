import { useCallback, useEffect, useState } from 'react';
import { getCategories, getProducts } from '../api.js';

// Carga categorías + productos y expone los 4 estados (loading / error / data / reload).
export default function useCatalog() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const reload = useCallback(() => {
    setLoading(true);
    setError('');
    return Promise.all([getCategories(), getProducts()])
      .then(([cats, prods]) => {
        setCategories(cats);
        setProducts(prods);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { categories, products, loading, error, reload };
}
