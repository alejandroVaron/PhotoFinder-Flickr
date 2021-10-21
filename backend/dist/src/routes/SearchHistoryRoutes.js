"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const SearchHistoryController_1 = __importDefault(require("../controllers/SearchHistoryController"));
router.get('/', SearchHistoryController_1.default.getAllSearchHistory);
router.post('/', SearchHistoryController_1.default.addSearchHistory);
router.put('/id=:id', SearchHistoryController_1.default.updateSearchHistoryById);
router.delete('/id=:id', SearchHistoryController_1.default.deleteSearchHistoryById);
router.get('/id=:id', SearchHistoryController_1.default.getSearchHistoryById);
exports.default = router;
