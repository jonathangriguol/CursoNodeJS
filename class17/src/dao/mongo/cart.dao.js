import mongoose from "mongoose";
import { Cart } from "../../models/cart.model.js";

export default class CartDao {
  async create(cartData) {
    try {
      const products = await Cart.create({ products: cartData });
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const products = await Cart.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductsByCartId(cartId) {
    try {
      const cart = await Cart.findById(cartId).populate("products.productId");
      const modifiedCart = cart.toObject();
      modifiedCart.products = modifiedCart.products.map((product) => {
        return {
          product: product.productId,
          quantity: product.quantity,
          _id: product._id,
        };
      });

      return modifiedCart;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateProductsByCartId(cartId, products) {
    try {
      const cart = await Cart.findById(cartId);
      
      // Verifica si el carrito existe, si no existe retorno error y corto el flujo
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }

      // Agrega al arreglo de productos del carrito con el nuevo arreglo recibido en la solicitud
      cart.products = cart.products.concat(products);

      // Guarda los cambios en el carrito actualizado en la base de datos
      const updatedCart = await cart.save();

      return updatedCart;
    } catch (error) {
      throw error;
    }
  }

  async insertOne(newProductInfo) {
    try {
      const newProduct = await Cart.create(newProductInfo);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(filter, newProductInfo) {
    try {
      const editedProduct = await Cart.updateOne(filter, newProductInfo);
      return editedProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id) {
    try {
      const result = await Cart.deleteOne(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
