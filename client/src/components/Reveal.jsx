import { useEffect, useRef, useState } from 'react';

// Wrapper de "scroll reveal" con IntersectionObserver (sin listener de scroll).
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div', style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'is-shown' : ''} ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </Tag>
  );
}
