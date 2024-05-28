import { Product } from "../dao/repository/index.js";

export const productsService = {
  getAll: async (query) => {
    console.log(Product)
    try {
      const products = await Product.getAll(query);
      return products;
    } catch (error) {
      throw error;
    }
  },
  getById: async (filter) => {
    try {
      const products = await Product.getById(filter);
      return products;
    } catch (error) {
      throw error;
    }
  },
  insertOne: async (newProductInfo) => {
    try {
      const newProduct = await Product.insertOne(newProductInfo);
      return newProduct;
    } catch (error) {
      throw error;
    }
  },
  updateOne: async (filter, newProductInfo) => {
    try {
      const editedProduct = await Product.updateOne(filter, newProductInfo);
      return editedProduct;
    } catch (error) {
      throw error;
    }
  },
  deleteOne: async (id) => {
    try {
      const result = await Product.deleteOne(id);
      return result;
    } catch (error) {
      throw error;
    }
  },
};

export default productsService;
