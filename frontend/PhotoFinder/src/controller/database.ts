import axios from 'axios';

class databaseController{

    //The method returns the token to navigate the endpoints
    static async login(email: string, password: string){
        return await axios({
            url: 'http://localhost:3000/api/signIn',
            method: 'post',
            data: {user_email: email+"", user_password: password+""}
        });
    }

    //The method returns the public images of the api flickr
    static async getPhotos(tags: string, token: string){
        return await axios({
            url: 'http://localhost:3000/api/search/flicker',
            method: 'post',
            headers: { Authorization: `Bearer ${token}` },
            data: {tags: tags}
        });
    }

    static async sendSearchHistory(tags: string, token: string, id_user: string){
        await axios({
            url: 'http://localhost:3000/api/searchHistory',
            method: 'post',
            headers: { Authorization: `Bearer ${token}` },
            data: {searchHistory_description: tags, id_user: id_user}
        }).then((response: any) => {
            console.log(response.data)
        })
    }

    static async getSearchHistory(token: string, id_user: string){
        return await axios({
            url: 'http://localhost:3000/api/searchHistory/id='+id_user,
            method: 'get',
            headers: { Authorization: `Bearer ${token}`}
        });
    }
    
}
export default databaseController;
