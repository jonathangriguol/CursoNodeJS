import { Cart } from "../dao/repository/index.js";

const cartsService = {
  create: async (cartData) => {
    try {
      const carts = await Cart.create(cartData);
      return carts;
    } catch (error) {
      throw error;
    }
  },
  getAll: async () => {
    try {
      const carts = await Cart.getAll();
      return carts;
    } catch (error) {
      throw error;
    }
  },
  getProductsByCartId: async (cartId) => {
    try {
      const products = await Cart.getProductsByCartId(cartId);
      return products;
    } catch (error) {
      throw error;
    }
  },
  updateProductsByCartId: async (cartId, products) => {
    try {
      const updatedCart = await Cart.updateProductsByCartId(cartId, products);
      return updatedCart;
    } catch (error) {
      throw error;
    }
  },
  addProductByCartId: async (productId, cartId) => {
    try {
      const editedCart = await Cart.addProductByCartId(productId, cartId);
      return editedCart;
    } catch (error) {
      throw error;
    }
  },

  addProductsByCartId: async (cartId, arrOfProducts) => {
    try {
      const editedCart = await Cart.addProductsByCartId(cartId, arrOfProducts);
      return editedCart;
    } catch (error) {
      throw error;
    }
  },
  
  updateProductStockByCartId: async (productId, cartId) => {
    try {
      const editedCart = await Cart.updateProductStockByCartId(productId, cartId);
      return editedCart;
    } catch (error) {
      throw error;
    }
  },
  clearCart: async (cartId) => {
    try {
      const editedCart = await Cart.clearCart(cartId);
      return editedCart;
    } catch (error) {
      throw error;
    }
  },
};

export default cartsService