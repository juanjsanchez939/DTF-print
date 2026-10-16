import { STORE } from '../config.js';
import Logo from './Logo.jsx';
import { FacebookIcon, InstagramIcon } from './icons.jsx';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo height={36} />
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
