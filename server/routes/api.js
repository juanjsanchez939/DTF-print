import { Router } from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Cart from '../models/Cart.js';
import { seedProducts, seedCategories } from '../data/seedData.js';

export const state = { inMemory: false };
export function setInMemory(value) {
  state.inMemory = !!value;
}

// Carritos en memoria (para modo sin MongoDB)
const memoryCarts = new Map();

const router = Router();

// GET /api/categories
router.get('/categories', async (req, res, next) => {
  try {
    if (state.inMemory) return res.json(seedCategories);
    res.json(await Category.find().sort({ order: 1 }));
  } catch (err) {
    next(err);
  }
});

// GET /api/products?category=&search=
router.get('/products', async (req, res, next) => {
  try {
    const { category, search } = req.query;

    if (state.inMemory) {
      let list = seedProducts;
      if (category) list = list.filter((p) => p.category === category);
      if (search) {
        const q = String(search).toLowerCase();
        list = list.filter((p) => p.name.toLowerCase().includes(q));
      }
      return res.json(list);
    }

    const filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: String(search), $options: 'i' };
    res.json(await Product.find(filter).sort({ name: 1 }));
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = state.inMemory
      ? seedProducts.find((p) => p.id === id) || null
      : await Product.findOne({ id });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// ----------------------------- CARRITO -----------------------------

// GET /api/cart/:cartId
router.get('/cart/:cartId', async (req, res, next) => {
  try {
    const { cartId } = req.params;
    if (state.inMemory) return res.json(memoryCarts.get(cartId) || { cartId, items: [] });
    const cart = await Cart.findOne({ cartId });
    res.json(cart || { cartId, items: [] });
  } catch (err) {
    next(err);
  }
});

// POST /api/cart/:cartId  ->  body: { items: [...] }
router.post('/cart/:cartId', async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (state.inMemory) {
      memoryCarts.set(cartId, { cartId, items });
      return res.json({ cartId, items });
    }
    const cart = await Cart.findOneAndUpdate({ cartId }, { items }, { upsert: true, new: true });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

export default router;
