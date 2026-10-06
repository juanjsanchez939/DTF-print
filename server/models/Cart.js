import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, default: '' },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    cartId: { type: String, required: true, unique: true, index: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('Cart', cartSchema);
