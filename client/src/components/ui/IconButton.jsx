// Botón de ícono circular con etiqueta accesible obligatoria.
export default function IconButton({ label, className = '', children, ...rest }) {
  return (
    <button className={`icon-btn ${className}`.trim()} type="button" aria-label={label} {...rest}>
      {children}
    </button>
  );
}
