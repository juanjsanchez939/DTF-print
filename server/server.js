import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import apiRouter, { setInMemory } from './routes/api.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Imágenes de productos servidas estáticamente
app.use('/products', express.static(path.join(__dirname, 'public', 'products')));

// API
app.use('/api', apiRouter);
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error del servidor' });
});

const { connected } = await connectDB(process.env.MONGODB_URI);
setInMemory(!connected);

app.listen(PORT, () => {
  console.log(`🚀 API DTF Print en http://localhost:${PORT} (${connected ? 'MongoDB' : 'modo memoria'})`);
});
