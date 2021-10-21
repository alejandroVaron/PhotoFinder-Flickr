import jwt from 'jsonwebtoken'
const config = require('../../config/config')

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({
        message: "No token provided!"
        });
    };
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, config.key, (err, decoded) => {
        if (err) {
            return res.status(400).send({
                message: "Token decoding error"
            });
        }else{
            next();
        }
    });
 };