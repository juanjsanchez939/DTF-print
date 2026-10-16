import { useMemo, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import StatsStrip from './components/StatsStrip.jsx';
import CatalogFilters from './components/CatalogFilters.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import Footer from './components/Footer.jsx';
import Aurora from './components/Aurora.jsx';
import BrandGallery from './components/BrandGallery.jsx';
import IconButton from './components/ui/IconButton.jsx';
import { CloseIcon, FilterIcon } from './components/icons.jsx';
import { useCart } from './context/CartContext.jsx';
import { useToast } from './context/ToastContext.jsx';
import { burst } from './lib/confetti.js';
import useCatalog from './hooks/useCatalog.js';
import useFavorites from './hooks/useFavorites.js';
import useOverlay from './hooks/useOverlay.js';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState('relevance');

  // Navegación simple por estado (catálogo <-> detalle)
  const [view, setView] = useState({ name: 'catalog' });
  const [cartOpen, setCartOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { categories, products, loading, error, reload } = useCatalog();
  const { favorites, toggle: toggleFavorite } = useFavorites();
  const { add } = useCart();
  const toast = useToast();
  const catalogRef = useRef(null);
  const filtersRef = useRef(null);

  useOverlay(filtersOpen, () => setFiltersOpen(false), filtersRef);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const id = p.id || p._id;
      if (favoritesOnly && !favorites.includes(id)) return false;
      if (inStock && (p.stock ?? 0) <= 0) return false;
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const matchQ = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQ;
    });
  }, [products, activeCategory, searchQuery, favoritesOnly, favorites, inStock]);

  const visible = useMemo(() => {
    const list = [...filtered];
    if (sort === 'price-asc') list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    else if (sort === 'price-desc') list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name, 'es'));
    return list;
  }, [filtered, sort]);

  const hasActiveFilters =
    activeCategory !== 'all' || Boolean(searchQuery) || favoritesOnly || inStock || sort !== 'relevance';
  const activeFilterCount =
    (activeCategory !== 'all' ? 1 : 0) +
    (favoritesOnly ? 1 : 0) +
    (inStock ? 1 : 0) +
    (sort !== 'relevance' ? 1 : 0);

  const clearFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setFavoritesOnly(false);
    setInStock(false);
    setSort('relevance');
  };

  // No se agrega más cantidad que el stock: `add` devuelve si el carrito cambió,
  // así el aviso nunca contradice al carrito real.
  const handleAdd = (p, qty = 1, origin) => {
    const stock = p.stock ?? Infinity;

    if (stock <= 0) {
      toast(`"${p.name}" no tiene stock disponible`);
      return;
    }
    if (!add(p, qty)) {
      toast(`No podés agregar más: el stock de "${p.name}" es ${stock}`);
      return;
    }

    burst(origin);
    toast(`"${p.name}" se agregó al carrito`);
  };

  const openProduct = (p) => {
    setView({ name: 'product', id: p.id || p._id });
    window.scrollTo({ top: 0 });
  };

  const goCatalog = () => setView({ name: 'catalog' });

  const scrollToCatalog = () => catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const selectCategory = (cat) => {
    setActiveCategory(cat);
    setFavoritesOnly(false);
    setView({ name: 'catalog' });
    scrollToCatalog();
  };

  const showFavorites = () => {
    setFavoritesOnly((v) => !v);
    setView({ name: 'catalog' });
    scrollToCatalog();
  };

  const detailProduct = view.name === 'product' ? products.find((p) => (p.id || p._id) === view.id) : null;

  const catalogTitle = favoritesOnly
    ? 'Favoritos'
    : searchQuery
      ? `Resultados para “${searchQuery}”`
      : activeCategory === 'all'
        ? 'Todos los productos'
        : activeCategory;

  const filterProps = {
    sort,
    onSortChange: setSort,
    favoritesOnly,
    onToggleFavorites: showFavorites,
    inStock,
    onToggleInStock: () => setInStock((v) => !v),
    onClear: clearFilters,
    hasActiveFilters,
  };

  return (
    <>
      <Aurora />

      <a className="skip-link" href="#main-content">
        Saltar al contenido
      </a>

      <div className="app-content">
        <Header
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={selectCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenCart={() => setCartOpen(true)}
          favoritesCount={favorites.length}
          favoritesOnly={favoritesOnly}
          onToggleFavorites={showFavorites}
          onContact={() => toast('Escribinos a hola@dtfprint.com o por Instagram 💬')}
        />

        <main id="main-content" tabIndex={-1} className="main-region">
          {view.name === 'product' ? (
            <ProductDetail product={detailProduct} onBack={goCatalog} onAdd={handleAdd} />
          ) : (
            <>
              <Hero products={products} onCTA={scrollToCatalog} />

              <Marquee />

              <StatsStrip
                stats={[
                  { value: products.length, label: 'productos' },
                  { value: categories.length, label: 'categorías' },
                  { value: 3, label: 'colores de marca' },
                ]}
              />

              <section className="catalog" id="catalog" ref={catalogRef}>
                <div className="catalog-head">
                  <div className="catalog-heading">
                    <h1 className="catalog-title">{catalogTitle}</h1>
                    <span className="catalog-count" aria-live="polite">
                      {visible.length} {visible.length === 1 ? 'producto' : 'productos'}
                    </span>
                  </div>

                  <button
                    className="filters-open"
                    type="button"
                    aria-haspopup="dialog"
                    aria-controls="catalog-filters"
                    onClick={() => setFiltersOpen(true)}
                  >
                    <FilterIcon />
                    Filtros
                    {activeFilterCount > 0 && (
                      <span className="filters-count" aria-hidden="true">{activeFilterCount}</span>
                    )}
                  </button>
                </div>

                <div className="catalog-layout">
                  <aside className="catalog-sidebar" aria-label="Filtros del catálogo">
                    <CatalogFilters {...filterProps} />
                  </aside>

                  <div className="catalog-main">
                    {error ? (
                      <div className="empty-state" role="alert">
                        <p>No pudimos cargar el catálogo: {error}</p>
                        <button className="btn btn-primary" type="button" onClick={reload}>
                          Reintentar
                        </button>
                      </div>
                    ) : (
                      <ProductGrid
                        products={visible}
                        loading={loading}
                        onAdd={handleAdd}
                        onOpen={openProduct}
                        favorites={favorites}
                        onToggleFavorite={toggleFavorite}
                        emptyMessage={
                          favoritesOnly
                            ? 'Todavía no tenés favoritos. Tocá el corazón en un producto para guardarlo.'
                            : 'No se encontraron productos.'
                        }
                      />
                    )}
                  </div>
                </div>
              </section>

              <BrandGallery />
            </>
          )}
        </main>

        <Footer />
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Filtros en móvil (drawer lateral derecho) */}
      <div
        className={`drawer-backdrop ${filtersOpen ? 'show' : ''}`}
        onClick={() => setFiltersOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`drawer drawer--end ${filtersOpen ? 'open' : ''}`}
        id="catalog-filters"
        role="dialog"
        aria-modal="true"
        aria-label="Filtros del catálogo"
        aria-hidden={!filtersOpen}
        tabIndex={-1}
        ref={filtersRef}
      >
        <div className="drawer-head">
          <span className="drawer-title">Filtros</span>
          <IconButton label="Cerrar filtros" onClick={() => setFiltersOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>

        <CatalogFilters {...filterProps} />

        <button className="btn btn-primary drawer-apply" type="button" onClick={() => setFiltersOpen(false)}>
          Ver {visible.length} {visible.length === 1 ? 'producto' : 'productos'}
        </button>
      </aside>
    </>
  );
}
