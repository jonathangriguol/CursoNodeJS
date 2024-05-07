import ResetPasswordModel from "../../models/resetPassword.model.js";

class MongoResetPasswordDao {
  constructor() {}
  async getCode(code) {
    const resetCode = await ResetPasswordModel.findOne({ code }).lean();
    return resetCode;
  }

  async getAllCodes() {
    const codes = await ResetPasswordModel.find();
    return codes;
  }

  async saveCode(email, code) {
    const newCode = await ResetPasswordModel.create({ email, code });
    return newCode;
  }

  async deleteCode(email, code) {
    const deletedCode = await ResetPasswordModel.deleteOne({ email, code });
    return deletedCode;
  }
}

export default MongoResetPasswordDao;
