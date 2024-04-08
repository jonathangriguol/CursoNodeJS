import CartDao from "../dao/mongo/cart.dao.js";

const Cart = new CartDao();

const cartsService = {
  createCart: async (cartData) => {
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
      const editedCart = await Cart.updateOne(productId, cartId);
      return editedCart;
    } catch (error) {
      throw error;
    }
  },
  updateProductStockByCartId: async (productId, cartId) => {
    try {
      const editedCart = await Cart.updateOne(productId, cartId);
      return editedCart;
    } catch (error) {
      throw error;
    }
  },
  clearCart: async (cartId) => {
    try {
      const editedCart = await Cart.updateOne(cartId);
      return editedCart;
    } catch (error) {
      throw error;
    }
  },
};

export default cartsService