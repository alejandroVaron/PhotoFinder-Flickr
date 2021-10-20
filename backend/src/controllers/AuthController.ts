import Util from '../Util/Util'
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const authConfig = require('../authConfig/auth')

const util = new Util();

class AuthController{

    static async signIn(req, res) {
        let {user_email, password_email} = req.body
        User.findOne({
            where: {
                user_email: user_email
            }
        }).then(user =>{
            if(!user){
                util.setError(400, "User not found");
                return util.send(res);
            }else{
                if(user.contraseña_usuario == password_email){
                    let token = jwt.sign({user: user}, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    res.json({
                        message:`Welcome user ${user.id_user}!`,
                        body: {user: user},
                        token: token
                    })
                }else{
                    util.setError(401, "Unauthorized access:  Account incorrect");
                    return util.send(res);
                }
            }
        }).catch(error => {
            util.setError(500, error);
            return util.send(res);
        });
    }

    static async signUp(req, res){
        User.findOne({
            where: {
                user_email: req.body.user_email
            }
        }).then(user => {
            if(user){
                util.setError(400, "Failed! Email is already in use!");
                return util.send(res);
            }
        });
        let usercreate = {
            user_email: req.body.user_email,
            user_password: req.body.user_password
        }
        User.create(usercreate).then(newUser => {
            let token = jwt.sign({user: newUser}, authConfig.secret, {
                expiresIn: authConfig.expires
            });
            res.json({
                message:`Welcome user ${newUser.id_user}!`,
                body: {user: newUser},
                token: token
            })
        }).catch(error => {
            util.setError(500, error);
            return util.send(res);
        });
    }

}

export default AuthController;