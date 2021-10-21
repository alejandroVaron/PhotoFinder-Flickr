import SearchHistoryService from '../services/SearchHistoryServices'
import Util from '../Util/Util'

const util = new Util();

class SearchHistoryController{

    static async getAllSearchHistory(req, res) {
        try {
            const allSearchHistories = await SearchHistoryService.getAllSearchHistory();
            if (allSearchHistories.length > 0) {
                util.setSuccess(200, 'Search history returned', allSearchHistories)
            } else {
                util.setSuccess(204, 'No Search history found', "");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addSearchHistory(req, res) {
        const SearchHistory = req.body;
        try {
            const createdSearchHistory = await SearchHistoryService.addSearchHistory(SearchHistory);
            util.setSuccess(201, `new Search history created!`, createdSearchHistory);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async updateSearchHistoryById(req, res) {
        const id = req.params.id;
        const updateSearchHistory = req.body;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const updatesSearchHistory = await SearchHistoryService.updateSearchHistoryById(id, updateSearchHistory)
            if (updatesSearchHistory) {
                util.setSuccess(201, `Search history ${id} updated!`, updatesSearchHistory);
            } else {
                util.setSuccess(204, `Could not update Search history ${id}!`, "")
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async deleteSearchHistoryById(req, res) {
        const id = req.params.id;
        if (!Number.isInteger(Number(id))) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }
        try {
            const searchHistoryToDelete = await SearchHistoryService.deleteSearchHistoryById(id);
            if (searchHistoryToDelete) {
                util.setSuccess(200, `Deleted Search history ${id}!`, searchHistoryToDelete);
            } else {
                util.setSuccess(204, `The Search history you are looking for can not be found`, "");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getSearchHistoryById(req, res) {
        const requiredSearchHistory = req.params.id;
        try {
            const returnedSearchHistory = await SearchHistoryService.getSearchHistoryById(requiredSearchHistory)
            if (returnedSearchHistory) {
                util.setSuccess(200, `Search history returned!`, returnedSearchHistory);
            } else {
                util.setSuccess(204, `Could not found Search history ${requiredSearchHistory}!`, "");
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

}
export default SearchHistoryController;