export default class ResetPasswordRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getCode(email, token) {
    const resetToken = await this.dao.getCode(email, token);
    return resetToken;
  }

  async getAllCodes() {
    const tokens = await this.dao.getAllCodes();
    return tokens;
  }

  async saveCode(email, token) {
    const newToken = await this.dao.saveCode(email, token);
    return newToken;
  }

  async deleteCode(email, token) {
    const deletedToken = await this.dao.deleteCode(email, token);
    return deletedToken;
  }
}
