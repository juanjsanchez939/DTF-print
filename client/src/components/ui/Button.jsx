// Primitiva de botón. Variantes: primary | ghost (+ cualquier clase extra).
export default function Button({ as: Tag = 'button', variant = 'primary', className = '', type, children, ...rest }) {
  const cls = `btn btn-${variant} ${className}`.trim();
  const buttonProps = Tag === 'button' ? { type: type || 'button' } : {};
  return (
    <Tag className={cls} {...buttonProps} {...rest}>
      {children}
    </Tag>
  );
}
