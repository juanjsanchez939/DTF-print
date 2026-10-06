import Reveal from './Reveal.jsx';

const IMAGES = [
  { src: '/brand/brand-1.jpg', color: '#F8D000', label: 'Nuestra esencia' },
  { src: '/brand/brand-2.jpg', color: '#F80068', label: 'Todo color' },
  { src: '/brand/brand-3.jpg', color: '#0090E0', label: 'Tu diseño' },
  { src: '/brand/brand-4.jpg', color: '#F8D000', label: 'DTF Print' },
];

export default function BrandGallery() {
  return (
    <Reveal as="section" className="brand-gallery">
      <div className="brand-gallery-head">
        <span className="eyebrow"><span className="dot" /> Nuestra marca</span>
        <h2 className="brand-gallery-title">
          Así se ve <span className="grad">DTF Print</span>
        </h2>
      </div>

      <div className="brand-gallery-grid">
        {IMAGES.map((img) => (
          <figure className="brand-photo" key={img.src} style={{ '--bc': img.color }}>
            <img src={img.src} alt={img.label} loading="lazy" />
            <figcaption className="brand-photo-label">
              <span className="brand-photo-dot" />
              {img.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </Reveal>
  );
}
