"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
router.post('/signIn', AuthController_1.default.signIn);
router.post('/signUp', AuthController_1.default.signUp);
exports.default = router;
