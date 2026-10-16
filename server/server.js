import './config/env.js';
import { connectDB } from './config/db.js';
import { createApp } from './app.js';
import { setInMemory } from './routes/api.js';

const PORT = process.env.PORT || 5000;

const { connected } = await connectDB(process.env.MONGODB_URI);
setInMemory(!connected);

createApp().listen(PORT, () => {
  console.log(`🚀 API DTF Print en http://localhost:${PORT} (${connected ? 'MongoDB' : 'modo memoria'})`);
});
