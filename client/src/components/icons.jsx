// Set de iconos compartido. Todos heredan color y tamaño desde CSS (currentColor).

export const SearchIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </svg>
);

export const CartIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 6h2l2.4 10.2a1.5 1.5 0 0 0 1.46 1.18h7.86a1.5 1.5 0 0 0 1.46-1.18L21 9H6.6" />
    <circle cx="10" cy="20.4" r="1.3" fill="currentColor" stroke="none" />
    <circle cx="17.5" cy="20.4" r="1.3" fill="currentColor" stroke="none" />
  </svg>
);

export const HeartIcon = ({ filled, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 20.5S3.5 15.5 3.5 9.5A4.5 4.5 0 0 1 12 6.7a4.5 4.5 0 0 1 8.5 2.8c0 6-8.5 11-8.5 11Z" />
  </svg>
);

export const SunIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
  </svg>
);

export const CloseIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const ArrowRight = (props) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

export const ArrowLeft = (props) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M13 8H3M7 4l-4 4 4 4" />
  </svg>
);

export const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path d="M14 8h2V5h-2c-2 0-3 1.3-3 3v2H9v3h2v6h3v-6h2l.5-3H14V8.5c0-.4.3-.5.5-.5Z" fill="currentColor" />
  </svg>
);

export const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="16.8" cy="7.2" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const CheckIcon = (props) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 8.5l3.2 3.2L13 5" />
  </svg>
);

export const FilterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...props}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </svg>
);
