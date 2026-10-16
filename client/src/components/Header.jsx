import { useEffect, useRef, useState } from 'react';
import { STORE } from '../config.js';
import Logo from './Logo.jsx';
import IconButton from './ui/IconButton.jsx';
import Badge from './ui/Badge.jsx';
import { CartIcon, CloseIcon, HeartIcon, MoonIcon, SearchIcon, SunIcon } from './icons.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import useOverlay from '../hooks/useOverlay.js';

// Header en dos niveles:
//   1) marca · buscador central · acciones
//   2) barra de categorías (el menú principal de la tienda)
export default function Header({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenCart,
  favoritesCount = 0,
  favoritesOnly = false,
  onToggleFavorites,
  onContact,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const drawerRef = useRef(null);
  const searchInputRef = useRef(null);
  const { theme, toggle } = useTheme();
  const { count } = useCart();

  useOverlay(drawerOpen, () => setDrawerOpen(false), drawerRef);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const pick = (cat) => {
    onSelectCategory(cat);
    setDrawerOpen(false);
  };

  const showContact = () => {
    setDrawerOpen(false);
    onContact?.();
  };

  const tabs = [{ name: 'all', label: 'Todos' }, ...categories.map((c) => ({ name: c.name, label: c.name }))];

  const searchField = (inputId, ref) => (
    <>
      <SearchIcon />
      <label className="sr-only" htmlFor={inputId}>Buscar productos</label>
      <input
        id={inputId}
        ref={ref}
        type="search"
        placeholder="¿Qué estás buscando?"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchQuery && (
        <button
          className="search-clear"
          type="button"
          aria-label="Limpiar búsqueda"
          onClick={() => onSearchChange('')}
        >
          <CloseIcon />
        </button>
      )}
    </>
  );

  return (
    <>
      <div className="cmyk-bar" />
      <header className="site-header">
        {/* Nivel 1 */}
        <div className="topbar">
          <div className="topbar-inner">
            <a className="brand" href="#main-content" aria-label={`${STORE.name} — Inicio`}>
              <Logo height={40} />
              <span className="brand-text">
                <span className="brand-wordmark">{STORE.name}</span>
                <span className="brand-tagline">{STORE.tagline}</span>
              </span>
            </a>

            <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
              {searchField('site-search-input')}
            </form>

            <div className="header-actions">
              <IconButton label="Cambiar tema" onClick={toggle}>
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </IconButton>

              <IconButton
                className="search-toggle"
                label="Buscar"
                aria-expanded={searchOpen}
                aria-controls="site-search"
                onClick={() => setSearchOpen((v) => !v)}
              >
                <SearchIcon />
              </IconButton>

              <IconButton
                className={`fav-btn ${favoritesOnly ? 'is-active' : ''}`}
                label={`Favoritos${favoritesCount ? ` (${favoritesCount})` : ''}`}
                aria-pressed={favoritesOnly}
                onClick={onToggleFavorites}
              >
                <HeartIcon filled={favoritesOnly} />
                <Badge count={favoritesCount} />
              </IconButton>

              <IconButton label={`Carrito${count ? ` (${count})` : ''}`} onClick={onOpenCart}>
                <CartIcon />
                <Badge count={count} />
              </IconButton>

              <IconButton
                className={`burger ${drawerOpen ? 'open' : ''}`}
                label="Menú"
                aria-expanded={drawerOpen}
                aria-controls="mobile-menu"
                onClick={() => setDrawerOpen((v) => !v)}
              >
                <span className="burger-lines" aria-hidden="true"><span /><span /><span /></span>
              </IconButton>
            </div>
          </div>
        </div>

        {/* Buscador desplegable en móvil */}
        <div className={`search-bar ${searchOpen ? 'open' : ''}`} id="site-search">
          <div className="search-inner">{searchField('search-input-mobile', searchInputRef)}</div>
        </div>

        {/* Nivel 2: menú de categorías */}
        <nav className="category-bar" aria-label="Categorías">
          <div className="category-bar-inner">
            {tabs.map((t) => {
              const active = activeCategory === t.name;
              return (
                <button
                  key={t.name}
                  type="button"
                  className={`cat-tab ${active ? 'active' : ''}`}
                  aria-pressed={active}
                  onClick={() => pick(t.name)}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      <div
        className={`drawer-backdrop ${drawerOpen ? 'show' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`drawer ${drawerOpen ? 'open' : ''}`}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        aria-hidden={!drawerOpen}
        tabIndex={-1}
        ref={drawerRef}
      >
        <div className="drawer-head">
          <span className="drawer-title">Menú</span>
          <IconButton label="Cerrar" onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className="drawer-section">
          <button
            className="drawer-link"
            type="button"
            onClick={() => { onToggleFavorites?.(); setDrawerOpen(false); }}
          >
            Favoritos{favoritesCount ? ` (${favoritesCount})` : ''}
          </button>
          <button className="drawer-link" type="button" onClick={() => pick('all')}>Todos los productos</button>
          <button className="drawer-link" type="button" onClick={showContact}>Contacto</button>
        </div>
      </aside>
    </>
  );
}
