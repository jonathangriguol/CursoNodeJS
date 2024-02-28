import { json } from "express";
import Product from "../../models/product.model.js";

export default class ProductDao {
  async getAll(query) {
    try {
      //?limit=10&page=1&search=Playstation&sort=asc

      const sortField = query?.sort ?? ''; // Por defecto no hace sort
      const sortOrder = query?.order === "asc" ? 1 : -1; // -1 = desc

      const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } =
        await Product.paginate(
          {},
          {
            page: query?.page || 1,
            limit: query?.limit || 3,
            sort: { [sortField]: sortOrder },
            lean: true,
          }
        );

      return {
        products: docs,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
      };
    } catch (error) {
      console.log(error);
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
