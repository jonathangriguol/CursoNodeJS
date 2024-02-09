import { Message } from "../../models/message.model.js";


export default class MessageDao {
  async getAll() {
    try {
      const products = await Message.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async insertOne(data) {
    try {
      const newProduct = await Message.create(data);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }
}
