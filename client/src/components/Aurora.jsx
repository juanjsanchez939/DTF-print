// Fondo de manchas de pintura (splatters) en los colores de la marca.
// Subtiles, detrás del contenido, con deriva lenta. Solo transform + opacity.
export default function Aurora() {
  return (
    <div className="splatter" aria-hidden="true">
      <svg className="splat sp1" viewBox="0 0 200 200">
        <path d="M100 32 C132 24 158 42 160 72 C162 102 146 128 116 134 C86 140 56 130 44 106 C32 82 38 52 62 38 C74 30 88 33 100 32 Z" fill="#F8D000" />
        <circle cx="34" cy="36" r="10" fill="#F8D000" />
        <circle cx="176" cy="50" r="8" fill="#F8D000" />
        <circle cx="166" cy="154" r="7" fill="#F8D000" />
        <circle cx="40" cy="164" r="5" fill="#F8D000" />
      </svg>

      <svg className="splat sp2" viewBox="0 0 200 200">
        <path d="M104 28 C140 26 162 46 160 78 C158 110 140 132 110 134 C80 136 54 122 46 96 C38 70 46 44 70 36 C82 31 92 29 104 28 Z" fill="#F80068" />
        <circle cx="30" cy="60" r="8" fill="#F80068" />
        <circle cx="174" cy="36" r="6" fill="#F80068" />
        <circle cx="48" cy="152" r="9" fill="#F80068" />
      </svg>

      <svg className="splat sp3" viewBox="0 0 200 200">
        <path d="M98 34 C128 28 154 44 158 72 C162 102 148 128 120 134 C92 140 62 132 50 110 C38 88 42 56 64 40 C76 32 86 34 98 34 Z" fill="#0090E0" />
        <circle cx="168" cy="150" r="8" fill="#0090E0" />
        <circle cx="32" cy="34" r="6" fill="#0090E0" />
        <circle cx="60" cy="168" r="7" fill="#0090E0" />
        <circle cx="150" cy="24" r="5" fill="#0090E0" />
      </svg>
    </div>
  );
}
