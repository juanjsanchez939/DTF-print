import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Carga siempre server/.env (el .env de la raíz es para docker compose),
// sin importar desde qué directorio se ejecute el proceso.
dotenv.config({ path: path.join(__dirname, '..', '.env') });
