import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal.jsx';

function Stat({ value, label, suffix = '', shown }) {
  const numRef = useRef(null);

  useEffect(() => {
    if (!shown) return;
    const el = numRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = value.toLocaleString('es-AR') + suffix;
      return;
    }
    const dur = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * value).toLocaleString('es-AR') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [shown, value, suffix]);

  return (
    <div className="stat">
      <span className="stat-value" ref={numRef}>0</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function StatsStrip({ stats }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Reveal as="section" className="stats-strip" style={{ marginBottom: 8 }}>
      <div ref={ref} className="stats-inner">
        {stats.map((s) => (
          <Stat key={s.label} value={s.value} label={s.label} suffix={s.suffix || ''} shown={shown} />
        ))}
      </div>
    </Reveal>
  );
}
