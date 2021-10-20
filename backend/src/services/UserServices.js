import User from '../../models/User'

class UserService {

    static async getAllUsers() {
        try {
          return await User.findAll();
        } catch (error) {
          throw error;
        }
    }

    static async addUser(newUser) {
        try {
          return await User.create(newUser);
        } catch (error) {
          throw error;
        }
    }

    static async updateUserById(id, updateUser) {
        try {
          const userToUpdate = await User.findOne({
            where: { id_user: Number(id) }
          });
    
          if (userToUpdate) {
            await User.update(updateUser, { where: { id_user: Number(id) } });
            return updateUser;
          }
          return null;
        } catch (error) {
          throw error;
        }
    }

    static async deleteUserById(id) {
        try {
          const userToDelete = await User.findOne({ where: { id_user: Number(id) } });
    
          if (userToDelete) {
            const deletedUser = await User.destroy({
              where: { id_user: Number(id) }
            });
            return deletedUser;
          }
          return null;
        } catch (error) {
          throw error;
        }
    }

    static async getUserByEmail(email) {
        try {
          const returnedUser = await User.findOne({
            where: { user_email: email }
          });
          return returnedUser;
        } catch (error) {
          throw error;
        }
    }

}
export default UserService;