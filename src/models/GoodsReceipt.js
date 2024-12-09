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
      GoodsReceipt.hasMany(models.GoodsReceiptDetails, { foreignKey: "goodsReceiptId" });
      GoodsReceipt.belongsTo(models.Provider, { foreignKey: "providerId" });
    }
  }
  GoodsReceipt.init({
    receiptDate: DataTypes.DATEONLY,
    totalCost: DataTypes.INTEGER,
    shipping: DataTypes.INTEGER,
    status: DataTypes.ENUM('accepted', 'rejected','pending'),
  }, {
    sequelize,
    modelName: 'GoodsReceipt',
    tableName: 'GoodsReceipt',
  });
  return GoodsReceipt;
};