import mongoose from "mongoose";

const ShopProductSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  excerpt: String,
  description: String,
  tags: [String],
  image: String,
  images: [String],
  rating: Number,
  reviewCount: Number,
  details: [String],
  careInstructions: String,
  relatedProducts: [String],
});

const ShopCategorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    items: [ShopProductSchema],
  },
  { timestamps: true },
);

export const ShopCategory =
  mongoose.models.ShopCategory ||
  mongoose.model("ShopCategory", ShopCategorySchema);
