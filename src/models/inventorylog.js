'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InventoryLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InventoryLog.belongsTo(models.ProductVariant, { foreignKey: "variantId" });
    }
  }
  InventoryLog.init({
    variantId: DataTypes.INTEGER,
    changeType: DataTypes.STRING,
    changeQuantity: DataTypes.INTEGER,
    changeDate: DataTypes.DATEONLY,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'InventoryLog',
    tableName: 'InventoryLog',
  });
  return InventoryLog;
};