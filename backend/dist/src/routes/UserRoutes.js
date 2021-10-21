"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const UserController_1 = __importDefault(require("../controllers/UserController"));
router.get('/', UserController_1.default.getAllUsers);
router.post('/', UserController_1.default.addUser);
router.put('/id=:id', UserController_1.default.updateUserById);
router.delete('/id=:id', UserController_1.default.deleteUserById);
router.get('/email=:email', UserController_1.default.getUserByEmail);
exports.default = router;
