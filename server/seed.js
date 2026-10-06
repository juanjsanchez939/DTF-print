import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import { seedProducts, seedCategories } from './data/seedData.js';

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('❌ Falta MONGODB_URI. Copiá .env.example a .env y completá la URL de MongoDB.');
  process.exit(1);
}

const { connected } = await connectDB(uri);
if (!connected) {
  console.error('❌ No se pudo conectar a MongoDB. No se cargaron datos.');
  process.exit(1);
}

await Category.deleteMany();
await Product.deleteMany();
await Category.insertMany(seedCategories);
await Product.insertMany(seedProducts);

console.log(`✅ Se cargaron ${seedCategories.length} categorías y ${seedProducts.length} productos.`);
await mongoose.disconnect();
