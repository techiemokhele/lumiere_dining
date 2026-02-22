import mongoose, { Document, Schema, Model } from "mongoose";

export interface IReview extends Document {
  userId: mongoose.Types.ObjectId;
  userName: string;
  userEmail: string;
  itemName: string;
  rating: number;
  title: string;
  review: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    itemName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    review: { type: String, required: true },
  },
  { timestamps: true },
);

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
