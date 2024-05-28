export default class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    getUsers = async () => {
        const users = await this.dao.getUsers();
        return users;
    }

    getUserById = async (userId) => {
        const user = await this.dao.getUserById(userId);
        return user;
    }
}