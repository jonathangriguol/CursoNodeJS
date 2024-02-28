import { Cart } from "../../models/cart.model.js";

export default class CartDao {
  async getAll() {
    try {
      const products = await Cart.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getById(filter) {
    try {
      const products = await Cart.findOne(filter);
      return products;
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
