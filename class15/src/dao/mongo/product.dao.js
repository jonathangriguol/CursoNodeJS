import { Product } from "../../models/product.model.js";

export default class ProductDao {
  async getAll() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getById(filter) {
    try {
      const products = await Product.findOne(filter);
      return products;
    } catch (error) {
      throw error;
    }
  }

  async insertOne(newProductInfo) {
    try {
      const newProduct = await Product.create(newProductInfo);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(filter, newProductInfo) {
    try {
      const editedProduct = await Product.updateOne(filter, newProductInfo);
      return editedProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id) {
    try {
      const result = await Product.deleteOne(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
