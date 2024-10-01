'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GoodsReceiptDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GoodsReceiptDetail.belongsTo(models.Product, { foreignKey: "productId" });
      GoodsReceiptDetail.belongsTo(models.GoodsReceipt, { foreignKey: "goodsReceiptId" });
    }
  }
  GoodsReceiptDetail.init({
    quantity: DataTypes.INTEGER,
    cost: DataTypes.DECIMAL(20,2),
  }, {
    sequelize,
    modelName: 'GoodsReceiptDetail',
    tableName: 'GoodsReceiptDetail',
  });
  return GoodsReceiptDetail;
};