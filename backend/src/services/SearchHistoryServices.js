import SearchHistory from '../../models/Searchhistory'

class SearchHistoryService {

    static async getAllSearchHistory() {
        try {
          return await SearchHistory.findAll();
        } catch (error) {
          throw error;
        }
    }

    static async addSearchHistory(newSearchHistory) {
        try {
          return await SearchHistory.create(newSearchHistory);
        } catch (error) {
          throw error;
        }
    }

    static async updateSearchHistoryById(id, searchHistoryToUpdate) {
        try {
          const searchHistoryToUpdate = await SearchHistory.findOne({
            where: { id_searchHistory: Number(id) }
          });
    
          if (searchHistoryToUpdate) {
            await SearchHistory.update(searchHistoryToUpdate, { where: { id_searchHistory: Number(id) } });
            return searchHistoryToUpdate;
          }
          return null;
        } catch (error) {
          throw error;
        }
    }

    static async deleteSearchHistoryById(id) {
        try {
          const searchHistoryToDelete = await SearchHistory.findOne({ where: { id_searchHistory: Number(id) } });
    
          if (searchHistoryToDelete) {
            const deletedSearchHistory = await SearchHistory.destroy({
              where: { id_searchHistory: Number(id) }
            });
            return deletedSearchHistory;
          }
          return null;
        } catch (error) {
          throw error;
        }
    }

    static async getSearchHistoryById(id) {
      try {
        const returnedSearchHistory = await SearchHistory.findOne({
          where: { id_searchHistory: Number(id) }
        });
        return returnedSearchHistory;
      } catch (error) {
        throw error;
      }
  }

}
export default SearchHistoryService;