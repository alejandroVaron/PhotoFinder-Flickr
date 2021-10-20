"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const node_url_shortener_1 = __importDefault(require("node-url-shortener"));
const cors_1 = __importDefault(require("cors"));
/* @ts-ignore */
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
/* @ts-ignore */
const SearchHistoryRoutes_1 = __importDefault(require("./routes/SearchHistoryRoutes"));
/* @ts-ignore */
const ApiRoutes_1 = __importDefault(require("./routes/ApiRoutes"));
const sequelize = require('../db/database');
const app = (0, express_1.default)();
var port = process.env.PORT || 3000;
if (!process.env.DATABASE_URL) {
    port = 3000;
}
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.end('¡Welcome!');
});
app.post('/url', function (req, res) {
    const url = req.body.url;
    node_url_shortener_1.default.short(url, function (err, shortUrl) {
        res.send(shortUrl);
    });
});
app.use('/api/user', UserRoutes_1.default);
app.use('/api/searchHistory', SearchHistoryRoutes_1.default);
app.use('/api/search', ApiRoutes_1.default);
sequelize.sync({ force: false, logging: console.log }).then(() => {
    console.log("¡We connect to the database!");
    app.listen(port, function () {
        console.log('¡Server up in port ' + port + '!');
    });
}).catch((error) => {
    console.log(error);
});
