import UserService from '../services/UserServices'
import Util from '../Util/Util'

const util = new Util();

class UserController{

    static async getAllUsers(req, res) {
        try {
            const allUsers = await UserService.getAllUsers();
            if (allUsers.length > 0) {
                util.setSuccess(200, 'Users returned', allUsers)
            } else {
                util.setSuccess(204, 'No users found', "");
            }
            return util.send(res);
        } catch (error) {
            console.log(error)
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addUser(req, res) {
        const newUser = req.body;
        try {
            const createdUser = await UserService.addUser(newUser);
            util.setSuccess(201, `new User created!`, createdUser);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async updateUserById(req, res) {
        const id = req.params.id;
        const updateUser = req.body;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            let updatesUser = null;
            updatesUser = await UserService.updateUserById(id, updateUser)
            if (updatesUser) {
                util.setSuccess(201, `User ${id} updated!`, updateUser);
            } else {
                util.setSuccess(204, `Could not update user ${id}!`, "")
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async deleteUserById(req, res) {
        const id = req.params.id;
        console.log(id)
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const userToDelete = await UserService.deleteUserById(id);
            if (userToDelete) {
                util.setSuccess(200, `Deleted user ${id}!`, userToDelete);
            } else {
                util.setSuccess(204, `The user you are looking for can not be found`, "");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getUserByEmail(req, res) {
        const requiredUser = req.params.email;
        try {
            const returnedUser = await UserService.getUserByEmail(requiredUser)
            if (returnedUser) {
                util.setSuccess(200, `User ${requiredUser} returned!`, returnedUser);
            } else {
                util.setSuccess(204, `Could not found user ${requiredUser}!`, "");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

}
export default UserController;