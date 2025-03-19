import mongoose, { Schema, Document } from "mongoose";

interface IProduct {
    productID: string;
    quantity: number;
}

interface IOrder extends Document {
    orderID: string;
    products: IProduct[];
    orderWorth: number;
}

const ProductSchema = new Schema<IProduct>({
    productID: { type: String, required: true },
    quantity: { type: Number, required: true }
});

const OrderSchema = new Schema<IOrder>({
    orderID: { type: String, required: true, unique: true },
    products: { type: [ProductSchema], required: true },
    orderWorth: { type: Number, required: true }
});

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
