import mongoose from "mongoose";

const MenuItemSchema = new mongoose.Schema({
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
  ingredients: [String],
  preparationNotes: String,
  allergies: [String],
  pairings: [String],
});

const MenuSectionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    items: [MenuItemSchema],
  },
  { timestamps: true },
);

export const MenuSection =
  mongoose.models.MenuSection ||
  mongoose.model("MenuSection", MenuSectionSchema);
