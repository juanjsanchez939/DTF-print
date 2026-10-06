const PHRASES = [
  'Estampá tu idea',
  'Imprimí todo color',
  'Tu diseño, tu marca',
  'Sublimá sin límites',
  'DTF a todo color',
  'Personalizá lo que imagines',
];

export default function Marquee() {
  const row = PHRASES.map((p) => (
    <span className="marquee-item" key={p}>
      {p}
      <i className="marquee-dot" />
    </span>
  ));

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
