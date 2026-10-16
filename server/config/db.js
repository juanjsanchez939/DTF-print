import mongoose from 'mongoose';

/**
 * Intenta conectar a MongoDB.
 * Devuelve { connected: boolean }. Si no hay URI o falla la conexión,
 * NO lanza error: el servidor cae a "modo memoria" para poder probar sin DB.
 */
export async function connectDB(uri) {
  if (!uri) {
    console.warn('⚠️  MONGODB_URI no definida → usando datos en memoria.');
    return { connected: false };
  }
  try {
    await mongoose.connect(uri);
    console.log('✅ MongoDB conectado');
    return { connected: true };
  } catch (err) {
    console.warn(`⚠️  No se pudo conectar a MongoDB (${err.message}) → usando datos en memoria.`);
    return { connected: false };
  }
}
