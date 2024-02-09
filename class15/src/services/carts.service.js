import CartDao from "../dao/mongo/cart.dao.js";

const Cart = new CartDao();

const cartsService = {
  getAll: async () => {
    try {
      const carts = await Cart.getAll();
      return carts;
    } catch (error) {
      throw error;
    }
  },
  getProductsByCartId: async (filter) => {
    try {
      const carts = await Cart.getById(filter);
      return carts;
    } catch (error) {
      throw error;
    }
  },
  createCart: async (products) => {
    try {
      const newCart = await Cart.insertOne(products);
      return newCart;
    } catch (error) {
      throw error;
    }
  },
  updateOne: async (filter, newCartInfo) => {
    try {
      const editedCart = await Cart.updateOne(filter, newCartInfo);
      return editedCart;
    } catch (error) {
      throw error;
    }
  },
  deleteOne: async (id) => {
    try {
      const result = await Cart.deleteOne(id);
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default cartsService