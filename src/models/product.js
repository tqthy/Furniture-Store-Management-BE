'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.ProductVariant, { foreignKey: "productId" });
      Product.belongsTo(models.Catalogue, { foreignKey: "catalogueId" });

    }
  }
  Product.init({
    category: DataTypes.STRING,
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    description: DataTypes.TEXT,
    available: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    defective: DataTypes.INTEGER,
    sold: DataTypes.INTEGER,
    warranty: DataTypes.INTEGER,
    status: DataTypes.ENUM('in stock', 'stop selling', 'sold out'),
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Product',
  });
  return Product;
};