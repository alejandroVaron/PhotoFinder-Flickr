"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const ApiController_1 = __importDefault(require("../controllers/ApiController"));
router.post('/flicker', ApiController_1.default.getPhotos);
exports.default = router;
