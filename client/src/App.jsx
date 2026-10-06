import { useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import CategoryRail from './components/CategoryRail.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Footer from './components/Footer.jsx';
import Aurora from './components/Aurora.jsx';
import BrandGallery from './components/BrandGallery.jsx';
import { useCart } from './context/CartContext.jsx';
import { getCategories, getProducts } from './api.js';
import { burst } from './lib/confetti.js';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Navegación simple por estado (catálogo <-> detalle)
  const [view, setView] = useState({ name: 'catalog' });
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dtf-fav')) || [];
    } catch {
      return [];
    }
  });

  const { add } = useCart();
  const toastTimer = useRef(null);
  const catalogRef = useRef(null);

  useEffect(() => {
    Promise.all([getCategories(), getProducts()])
      .then(([cats, prods]) => {
        setCategories(cats);
        setProducts(prods);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchQ = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQ;
    });
  }, [products, activeCategory, searchQuery]);

  const showToast = (msg) => {
    const el = document.getElementById('app-toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => el.classList.remove('show'), 1800);
  };

  const handleAdd = (p, qty = 1, origin) => {
    add(p, qty);
    burst(origin);
    showToast(`"${p.name}" agregado al carrito`);
  };

  const openProduct = (p) => {
    setView({ name: 'product', id: p.id || p._id });
    window.scrollTo({ top: 0 });
  };

  const toggleFavorite = (p) => {
    const id = p.id || p._id;
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem('dtf-fav', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const goCatalog = () => setView({ name: 'catalog' });

  const selectCategory = (cat) => {
    setActiveCategory(cat);
    setView({ name: 'catalog' });
    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const detailProduct = view.name === 'product' ? products.find((p) => (p.id || p._id) === view.id) : null;

  return (
    <>
      <Aurora />

      <div className="app-content">
        <Header
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={selectCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenCart={() => setCartOpen(true)}
        />

        {view.name === 'product' ? (
          <ProductDetail product={detailProduct} onBack={goCatalog} onAdd={handleAdd} />
        ) : (
          <>
            <Hero products={products} onCTA={() => catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />

            <Marquee />

            <main className="catalog" id="catalog" ref={catalogRef}>
              <CategoryRail categories={categories} activeCategory={activeCategory} onSelect={selectCategory} />

              <div className="catalog-head">
                <h1 className="catalog-title">{activeCategory === 'all' ? 'Todos los productos' : activeCategory}</h1>
                <span className="catalog-count">
                  {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'}
                </span>
              </div>

              {error ? (
                <div className="empty-state">Error cargando el catálogo: {error}</div>
              ) : (
                <ProductGrid
                  products={filtered}
                  loading={loading}
                  onAdd={handleAdd}
                  onOpen={openProduct}
                  favorites={favorites}
                  onToggleFavorite={toggleFavorite}
                />
              )}
            </main>

            <BrandGallery />
          </>
        )}

        <Footer />
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <div id="app-toast" className="toast" role="status" aria-live="polite" />
    </>
  );
}
