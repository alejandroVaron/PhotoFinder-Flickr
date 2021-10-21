"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Util_1 = __importDefault(require("../Util/Util"));
const axios = require('axios');
const util = new Util_1.default();
class ApiController {
    static async getPhotos(req, res) {
        const tags = req.body.tags;
        if (Object.keys(tags).length === 0) {
            util.setError(400, 'Please add tags for search');
            return util.send(res);
        }
        else {
            try {
                // was added 'nojsoncallback=?' and 'format=json' in url for return JSON 
                axios({
                    method: "post",
                    url: "https://www.flickr.com/services/feeds/photos_public.gne?nojsoncallback=?&format=json&tags=" + tags
                })
                    .then(function (response) {
                    util.setSuccess(200, "¡The images have been found!", response.data);
                    return util.send(res);
                });
            }
            catch (error) {
                util.setError(400, error);
                return util.send(res);
            }
        }
    }
}
exports.default = ApiController;
