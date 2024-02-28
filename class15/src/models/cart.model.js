import mongoose from "mongoose"

const cartCollection = 'cart'

const cartSchema = new mongoose.Schema({
    cartId: String,
    productId: String

})

export const Cart = mongoose.model(cartCollection, cartSchema)