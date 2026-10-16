import { useEffect, useRef } from 'react';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/**
 * Comportamiento accesible de un panel modal (drawer / diálogo):
 * - bloquea el scroll del body y compensa el ancho de la barra
 * - manda el foco adentro al abrir
 * - atrapa el foco (Tab / Shift+Tab) dentro del panel
 * - cierra con Escape
 * - devuelve el foco al elemento que lo abrió al cerrar
 *
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {{ current: HTMLElement | null }} ref  ref del contenedor del panel
 */
export default function useOverlay(open, onClose, ref) {
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const node = ref.current;
    const previouslyFocused = document.activeElement;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`;

    const getFocusable = () => {
      if (!node) return [];
      return Array.from(node.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement
      );
    };

    const first = getFocusable()[0];
    (first || node)?.focus?.({ preventScroll: true });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current?.();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = getFocusable();
      if (!items.length) {
        e.preventDefault();
        return;
      }
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus({ preventScroll: true });
    };
  }, [open, ref]);
}
