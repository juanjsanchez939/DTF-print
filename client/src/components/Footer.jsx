import { STORE } from '../config.js';
import Logo from './Logo.jsx';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14 8h2V5h-2c-2 0-3 1.3-3 3v2H9v3h2v6h3v-6h2l.5-3H14V8.5c0-.4.3-.5.5-.5Z" fill="currentColor" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="16.8" cy="7.2" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo height={30} />
          <p>Impresión por sublimación y DTF. Personalizamos tazas, remeras, bolsos y más.</p>
          <div className="socials" style={{ marginTop: 18 }}>
            <a href={STORE.social.facebook} className="social" aria-label="Facebook" rel="noreferrer"><FacebookIcon /></a>
            <a href={STORE.social.instagram} className="social" aria-label="Instagram" rel="noreferrer"><InstagramIcon /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Tienda</h4>
          <ul>
            <li><a href="#catalog">Catálogo</a></li>
            <li><a href="#catalog">Productos</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Términos y condiciones</a></li>
            <li><a href="#">Política de privacidad</a></li>
            <li><a href="#">Política de datos</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {STORE.name}. Todos los derechos reservados.</span>
        <span>Hecho con cariño para sublimar tus ideas.</span>
      </div>
    </footer>
  );
}
