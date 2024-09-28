'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductProvider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductProvider.belongsTo(models.Product, { foreignKey: "productId" });
      ProductProvider.belongsTo(models.Provider, { foreignKey: "providerId" });
    }
  }
  ProductProvider.init({
  }, {
    sequelize,
    modelName: 'ProductProvider',
  });
  return ProductProvider;
};