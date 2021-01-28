'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate (models) {}
  }
  Category.init(
    {
      name: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Category'
    }
  )

  Category.associate = models => {
    // A Category should belong to a user
    Category.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  }
  return Category
}
