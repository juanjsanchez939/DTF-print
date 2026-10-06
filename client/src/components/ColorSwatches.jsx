import { useColor } from '../context/ColorContext.jsx';

export default function ColorSwatches() {
  const { palettes, current, setColor } = useColor();

  return (
    <div className="color-picker">
      <span className="color-picker-label">Elegí tu color:</span>
      <div className="color-swatches">
        {palettes.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`swatch ${current === p.id ? 'active' : ''}`}
            style={{ background: p.gradient }}
            onClick={() => setColor(p.id)}
            aria-label={`Color ${p.label}`}
            title={p.label}
          />
        ))}
      </div>
    </div>
  );
}
