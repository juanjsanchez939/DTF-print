import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: { type: String, index: true },
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, index: true },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
