import { Users } from "../../models/user.model.js";

export default class MongoUserDao {
  async getUsers() {
    try {
      const users = await Users.find().lean();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const user = await userModel.findById(userId).lean();
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
