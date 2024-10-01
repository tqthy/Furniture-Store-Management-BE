'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WarrantyAndRepair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WarrantyAndRepair.belongsTo(models.Customer, { foreignKey: "customerId" });
      WarrantyAndRepair.belongsTo(models.Product, { foreignKey: "productId" });
      WarrantyAndRepair.belongsTo(models.Staff, { foreignKey: "staffId" });
    }
  }
  WarrantyAndRepair.init({
    description: DataTypes.TEXT,
    releaseDate: DataTypes.DATEONLY,
    cost: DataTypes.DECIMAL(20,2),
    warrantyStatus: DataTypes.ENUM('valid', 'expired'),
    status: DataTypes.ENUM('done', 'pending'),
  }, {
    sequelize,
    modelName: 'WarrantyAndRepair',
    tableName: 'WarrantyAndRepair',
  });
  return WarrantyAndRepair;
};