'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GoodsReceipt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GoodsReceipt.belongsTo(models.Staff, { foreignKey: "staffId" });
      GoodsReceipt.hasMany(models.GoodsReceiptDetail, { foreignKey: "goodsReceiptId" });
    }
  }
  GoodsReceipt.init({
    receiptDate: DataTypes.DATEONLY,
    totalCost: DataTypes.DECIMAL(20,2),
    shipping: DataTypes.DECIMAL(20,2),
    status: DataTypes.ENUM('accepted', 'rejected','pending'),
  }, {
    sequelize,
    modelName: 'GoodsReceipt',
  });
  return GoodsReceipt;
};