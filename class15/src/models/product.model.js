import mongoose from "mongoose";

const productCollection = 'product'

const productSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    title: String,
    description: String,
    price: Number,
    thumbnails: [String],
    stock: Number,
    category: String,
    status: Boolean,
})

export const Product = mongoose.model(productCollection, productSchema)