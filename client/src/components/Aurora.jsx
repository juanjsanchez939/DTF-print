// Fondo decorativo 100% CSS: manchas de color de marca (aurora CMYK),
// grilla de imprenta y textura de grano. Sin imágenes, theme-aware y
// respetuoso de prefers-reduced-motion.
export default function Aurora() {
  return (
    <div className="backdrop" aria-hidden="true">
      <span className="backdrop-blob backdrop-blob--1" />
      <span className="backdrop-blob backdrop-blob--2" />
      <span className="backdrop-blob backdrop-blob--3" />
      <span className="backdrop-grid" />
      <span className="backdrop-grain" />
    </div>
  );
}
