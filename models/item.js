'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Item.init({
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    url: DataTypes.TEXT,
    initialPrice: DataTypes.DECIMAL(10,2),
    newPrice: DataTypes.DECIMAL(10,2),
    category: DataTypes.STRING,
    retailer: DataTypes.STRING,
    isUpdated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    imgURL: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Item',
  });

  Item.associate = (models) => {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Item.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Item;
};