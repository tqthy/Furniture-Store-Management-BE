'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SaleProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SaleProduct.belongsTo(models.Product, { foreignKey: "productId" });
      SaleProduct.belongsTo(models.Sale, { foreignKey: "saleId" });
    }
  }
  SaleProduct.init({
  }, {
    sequelize,
    modelName: 'SaleProduct',
  });
  return SaleProduct;
};