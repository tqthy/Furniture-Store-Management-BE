'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VariantReceiptDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      VariantReceiptDetails.belongsTo(models.ProductVariant, { foreignKey: "variantId" });
      VariantReceiptDetails.belongsTo(models.GoodsReceiptDetails, { foreignKey: "goodsReceiptDetailsId" });
    }
  }
  VariantReceiptDetails.init({
    importPrice: DataTypes.DECIMAL(20, 2)
  }, {
    sequelize,
    modelName: 'VariantReceiptDetails',
    tableName: 'VariantReceiptDetails',
  });
  return VariantReceiptDetails;
};