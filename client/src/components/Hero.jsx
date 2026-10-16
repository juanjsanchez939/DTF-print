import ColorSwatches from './ColorSwatches.jsx';
import Button from './ui/Button.jsx';
import { ArrowRight } from './icons.jsx';

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
          <Button onClick={onCTA}>
            Ver catálogo
            <span className="btn-arrow"><ArrowRight style={{ width: 15, height: 15 }} /></span>
          </Button>
          <Button as="a" variant="ghost" href="#catalog">Explorar</Button>
        </div>

        <ColorSwatches />
      </div>

      {tiles.length > 0 && (
        <div className="hero-collage" aria-hidden="true">
          {tiles.map((p, i) => (
            <div className="hero-tile" key={p._id || p.name}>
              <img
                src={p.image}
                alt=""
                loading={i > 0 ? 'lazy' : 'eager'}
                decoding="async"
                width="600"
                height="600"
              />
              <span>{p.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
