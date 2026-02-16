import mongoose, { Document, Schema, Model } from "mongoose";

export interface IOrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: IOrderItem[];
  kitchenNotes: string;
  discount: number;
  tax: number;
  serviceCharge: number;
  subtotal: number;
  total: number;
  status: "pending" | "confirmed" | "preparing" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false },
);

const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: { type: [OrderItemSchema], required: true },
    kitchenNotes: { type: String, default: "" },
    discount: { type: Number, default: 0 },
    tax: { type: Number, required: true },
    serviceCharge: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "completed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true },
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
