// Confetti liviano (DOM + CSS, sin dependencias). Explota desde un punto (o el centro).
const COLORS = ['#F8D000', '#F80068', '#0090E0', '#FFC400', '#C4004E', '#00B8D4'];

export function burst(origin, count = 36) {
  const rect = origin && origin.getBoundingClientRect ? origin.getBoundingClientRect() : null;
  const cx = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
  const cy = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'confetti';
    const angle = Math.random() * Math.PI * 2;
    const dist = 55 + Math.random() * 95;
    el.style.left = cx + 'px';
    el.style.top = cy + 'px';
    el.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
    el.style.setProperty('--dy', Math.sin(angle) * dist - 45 + 'px');
    el.style.setProperty('--c', COLORS[i % COLORS.length]);
    el.style.setProperty('--rot', Math.round(Math.random() * 720 - 360) + 'deg');
    el.style.setProperty('--sz', Math.round(6 + Math.random() * 7) + 'px');
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 950);
  }
}
