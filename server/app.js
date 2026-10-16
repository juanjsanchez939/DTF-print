import express from 'express';
import cors from 'cors';
import path from 'path';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import apiRouter from './routes/api.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cliente compilado por Vite (lo genera `npm run build`).
export const CLIENT_DIST = path.join(__dirname, '..', 'client', 'dist');

/**
 * Arma la app de Express (sin escuchar).
 * Si existe el build del cliente, lo sirve y agrega el fallback del SPA;
 * si no, el backend funciona igual (modo API/dev).
 */
export function createApp({ clientDist = CLIENT_DIST } = {}) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Imágenes de productos servidas estáticamente
  app.use('/products', express.static(path.join(__dirname, 'public', 'products')));

  // API
  app.use('/api', apiRouter);
  app.get('/api/health', (req, res) => res.json({ ok: true }));

  // Cliente compilado + fallback para las rutas del SPA.
  // El fallback excluye /api y /products para no tapar sus 404.
  const indexHtml = path.join(clientDist, 'index.html');
  if (existsSync(indexHtml)) {
    app.use(express.static(clientDist));
    app.get(/^(?!\/(?:api|products)(?:\/|$)).*/, (req, res) => res.sendFile(indexHtml));
  }

  // Manejo de errores
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  });

  return app;
}
