import mongoose from "mongoose";

const CommentReplySchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userImage: { type: String },
  text: { type: String, required: true },
  likes: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const CommentSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userImage: { type: String },
  text: { type: String, required: true },
  likes: [{ type: String }],
  replies: [CommentReplySchema],
  createdAt: { type: Date, default: Date.now },
});

const NewsletterPostSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String },
    content: { type: String },
    quote: { type: String },
    image: { type: String },
    images: [String],
    category: { type: String },
    tags: [String],
    author: {
      name: String,
      image: String,
      role: String,
    },
    publishedAt: { type: String },
    readTime: { type: Number },
    likes: [{ type: String }],
    comments: [CommentSchema],
  },
  { timestamps: true },
);

export const NewsletterPostModel =
  mongoose.models.NewsletterPost ||
  mongoose.model("NewsletterPost", NewsletterPostSchema);
