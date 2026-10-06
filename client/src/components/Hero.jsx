import ColorSwatches from './ColorSwatches.jsx';

const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

export default function Hero({ products, onCTA }) {
  const tiles = products.slice(0, 4);

  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-copy">
        <span className="eyebrow">
          <span className="dot" /> Sublimación &amp; DTF
        </span>
        <h1 className="hero-title">
          Tu idea, en <span className="grad">todo color.</span>
        </h1>
        <p className="hero-sub">
          Tazas, remeras, bolsos y más con impresión personalizada de alta calidad.
          Pedí tu diseño y lo estampamos.
        </p>
        <div className="hero-ctas">
          <button className="btn btn-primary" type="button" onClick={onCTA}>
            Ver catálogo
            <span className="btn-arrow"><Arrow /></span>
          </button>
          <a className="btn btn-ghost" href="#catalog">Explorar</a>
        </div>

        <ColorSwatches />
      </div>

      {tiles.length > 0 && (
        <div className="hero-collage" aria-hidden="true">
          {tiles.map((p, i) => (
            <div className="hero-tile" key={p._id || p.name}>
              <img src={p.image} alt="" loading={i > 0 ? 'lazy' : 'eager'} />
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
