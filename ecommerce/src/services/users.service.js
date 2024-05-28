import { User } from "../dao/repository/index.js";

const usersService = {
  getUsers: async () => {
    try {
      const carts = await Cart.getAll();
      return carts;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (userId) => {
    try {
      const products = await User.getUserById(userId);
      return products;
    } catch (error) {
      throw error;
    }
  }
};

export default cartsService