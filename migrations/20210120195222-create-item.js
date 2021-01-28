'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      url: {
        type: Sequelize.STRING
      },
      initialPrice: {
        type: Sequelize.DECIMAL
      },
      newPrice: {
        type: Sequelize.DECIMAL
      },
      category: {
        type: Sequelize.STRING
      },
      retailer: {
        type: Sequelize.STRING
      },
      isUpdated: {
        type: Sequelize.BOOLEAN
      },
      imgURL: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Items');
  }
};