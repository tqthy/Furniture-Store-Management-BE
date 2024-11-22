'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WarrantyOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WarrantyOrder.belongsTo(models.Warranty, { foreignKey: "warrantyId" });
      WarrantyOrder.belongsTo(models.Staff, { foreignKey: "staffId" });
    }
  }
  WarrantyOrder.init({
    description: DataTypes.TEXT,
    details: DataTypes.TEXT,
    cost: DataTypes.DECIMAL,
    status: DataTypes.ENUM('pending', 'processing', 'done'),
    estimateFinishDate: DataTypes.DATE,
    finishDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'WarrantyOrder',
    tableName: 'WarrantyOrder',
  });
  return WarrantyOrder;
};