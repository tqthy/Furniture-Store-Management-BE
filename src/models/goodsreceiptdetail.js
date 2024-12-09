'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GoodsReceiptDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GoodsReceiptDetails.belongsTo(models.ProductVariant, { foreignKey: "variantId" });
      GoodsReceiptDetails.belongsTo(models.GoodsReceipt, { foreignKey: "goodsReceiptId" });
    }
  }
  GoodsReceiptDetails.init({
    quantity: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'GoodsReceiptDetails',
    tableName: 'GoodsReceiptDetails',
  });
  return GoodsReceiptDetails;
};