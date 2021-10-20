const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');

class SearchHistory extends Model {
  static associate() {
  }
};
SearchHistory.init({
  id_searchHistory: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  searchHistory_description: DataTypes.STRING,
  id_user: {
    type: DataTypes.INTEGER,
      references:{
        model: 'User',
        key: 'id_user'
      }
  }
},{
  sequelize,
  modelName: 'SearchHistory',
});
module.exports = SearchHistory;
