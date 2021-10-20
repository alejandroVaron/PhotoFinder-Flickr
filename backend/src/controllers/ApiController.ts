import Util from '../Util/Util'
const axios = require('axios');

const util = new Util();

class ApiController{

    static async getPhotos(req, res) {
        const tags = req.body;
        if(Object.keys(tags).length === 0){
            util.setError(400, 'Please add tags for search');
            return util.send(res);
        }else{
            try { 
                axios({
                    method: "post",
                    url: "https://www.flickr.com/services/feeds/photos_public.gne",
                    data: tags
                })
                .then(function (response) {
                    util.setSuccess(201, `These images were found!`, response.data);
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