'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('SearchHistory', {
      id_searchHistory: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      searchHistory_description: {
        type: Sequelize.STRING
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: "id_user"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('SearchHistory');
  }
};