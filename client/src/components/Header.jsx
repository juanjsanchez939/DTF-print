import { useEffect, useRef, useState } from 'react';
import { STORE } from '../config.js';
import Logo from './Logo.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useCart } from '../context/CartContext.jsx';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);
const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h2l2.4 10.2a1.5 1.5 0 0 0 1.46 1.18h7.86a1.5 1.5 0 0 0 1.46-1.18L21 9H6.6" />
    <circle cx="10" cy="20.4" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="17.5" cy="20.4" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
const Chevron = () => (
  <svg className="chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6l4 4 4-4" />
  </svg>
);

export default function Header({ categories, activeCategory, onSelectCategory, searchQuery, onSearchChange, onOpenCart }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const { theme, toggle } = useTheme();
  const { count } = useCart();

  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const pick = (cat) => {
    onSelectCategory(cat);
    setDropdownOpen(false);
    setDrawerOpen(false);
  };

  const showContact = () => {
    setDrawerOpen(false);
    alert('Catálogo de ejemplo — acá iría tu formulario o datos de contacto.');
  };

  return (
    <>
      <div className="cmyk-bar" />
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-shell">
          <a className="brand" href="#">
            <Logo />
            <span className="brand-tagline">{STORE.tagline}</span>
          </a>

          <nav className="nav" aria-label="Principal">
            <div className={`nav-item has-dropdown ${dropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
              <button className="nav-link" type="button" onClick={() => setDropdownOpen((v) => !v)}>
                Categorías <Chevron />
              </button>
              <div className="dropdown">
                <div className="dropdown-title">Categorías</div>
                <ul className="dropdown-list">
                  {categories.map((c) => (
                    <li key={c.slug || c.name}>
                      <button
                        type="button"
                        className={activeCategory === c.name ? 'active' : ''}
                        onClick={() => pick(c.name)}
                      >
                        {c.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="nav-item">
              <button className={`nav-link ${activeCategory === 'all' ? 'active' : ''}`} type="button" onClick={() => pick('all')}>
                Todos
              </button>
            </div>
            <div className="nav-item">
              <button className="nav-link" type="button" onClick={showContact}>Contacto</button>
            </div>
          </nav>

          <div className="header-actions">
            <button className="icon-btn" type="button" aria-label="Cambiar tema" onClick={toggle}>
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <button className="icon-btn" type="button" aria-label="Buscar" onClick={() => setSearchOpen((v) => !v)}>
              <SearchIcon />
            </button>
            <button className="icon-btn" type="button" aria-label="Carrito" onClick={onOpenCart}>
              <CartIcon />
              {count > 0 && <span className="cart-badge">{count}</span>}
            </button>
            <button className={`icon-btn burger ${drawerOpen ? 'open' : ''}`} type="button" aria-label="Menú" onClick={() => setDrawerOpen((v) => !v)}>
              <span className="burger-lines"><span /><span /><span /></span>
            </button>
          </div>
        </div>

        <div className={`search-bar ${searchOpen ? 'open' : ''}`}>
          <div className="search-inner">
            <SearchIcon />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="¿Qué estás buscando?"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className={`drawer-backdrop ${drawerOpen ? 'show' : ''}`} onClick={() => setDrawerOpen(false)} />
      <aside className={`drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="drawer-head">
          <span className="drawer-title">Menú</span>
          <button className="icon-btn" type="button" aria-label="Cerrar" onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <div className="drawer-section">
          <div className="drawer-label">Categorías</div>
          <ul className="drawer-list">
            {categories.map((c) => (
              <li key={c.slug || c.name}>
                <button type="button" className={activeCategory === c.name ? 'active' : ''} onClick={() => pick(c.name)}>
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="drawer-section">
          <button className="drawer-link" type="button" onClick={() => pick('all')}>Todos los productos</button>
          <button className="drawer-link" type="button" onClick={showContact}>Contacto</button>
        </div>
      </aside>
    </>
  );
}
