'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('Items', 'description', {
              type: Sequelize.TEXT,
              allowNull: true,
          })
      ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('Items', 'description', {
              type: Sequelize.STRING,
              allowNull: true,
          })
      ])
  }
};
