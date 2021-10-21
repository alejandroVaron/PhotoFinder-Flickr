"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config = require('../../config/config');
module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    ;
    let token = req.headers.authorization.split(" ")[1];
    jsonwebtoken_1.default.verify(token, config.key, (err, decoded) => {
        if (err) {
            return res.status(400).send({
                message: "Token decoding error"
            });
        }
        else {
            next();
        }
    });
};
