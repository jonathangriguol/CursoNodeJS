export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getAll(query) {
    return await this.dao.getAll(query);
  }

  async getById(filter) {
    return await this.dao.getById(filter);
  }

  async insertOne(newProductInfo) {
    return await this.dao.insertOne(newProductInfo);
  }

  async updateOne(filter, newProductInfo) {
    return await this.dao.updateOne(filter, newProductInfo);
  }
  async deleteOne(id) {
    return await this.dao.deleteOne(id);
  }
}