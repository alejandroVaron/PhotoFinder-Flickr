import { Console } from 'console';
import Util from '../Util/Util'
const axios = require('axios');

const util = new Util();

class ApiController{

    static async getPhotos(req, res) {
        const tags = req.body.tags;
        if(Object.keys(tags).length === 0){
            util.setError(400, 'Please add tags for search');
            return util.send(res);
        }else{
            try { 
                // was added 'nojsoncallback=?' and 'format=json' in url for return JSON 
                axios({
                    method: "post",
                    url: "https://www.flickr.com/services/feeds/photos_public.gne?nojsoncallback=?&format=json&tags="+tags
                })
                .then(function (response) {
                    util.setSuccess(200, "¡The images have been found!",response.data);
                    return util.send(res);
                })
                
            } catch (error) {
                util.setError(400, error);
                return util.send(res);
            }
        }
    }

}

export default ApiController;