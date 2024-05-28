import mongoose from "mongoose";

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      // Cada objeto en el array "products" tiene dos campos: "_id" y "quantity".
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product", //referenciamos con que lo vamos a popular.
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [],
  },
});

cartSchema.pre('find', function(){
    this.populate('products.productId');
});

export const Cart = mongoose.model(cartCollection, cartSchema);
