class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async create (cartData) {
    return await this.dao.create(cartData);
  }

  async getAll () {
    return await this.dao.getAll();
  }

  async getProductsByCartId (cartId) {
    return await this.dao.getProductsByCartId(cartId);
  }

  async updateProductsByCartId (cartId, products) {
    return await this.dao.updateProductsByCartId(cartId, products);
  }

  async addProductByCartId (productId, cartId) {
    return await this.dao.addProductByCartId(productId, cartId);
  }

  async addProductsByCartId (cartId, arrOfProducts) {
    return await this.dao.addProductsByCartId(cartId, arrOfProducts)
  }

  async updateProductStockByCartId (productId, cartId) {
    return await this.dao.updateProductStockByCartId(productId, cartId);
  }
  async clearCart (cartId) {
    return await this.dao.clearCart(cartId);
  }
}

export default CartRepository