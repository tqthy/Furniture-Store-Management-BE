'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RepairOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RepairOrder.belongsTo(models.Staff, { foreignKey: "staffId" });
      RepairOrder.belongsTo(models.Customer, { foreignKey: "customerId" });
    }
  }
  RepairOrder.init({
    productName: DataTypes.STRING,
    description: DataTypes.STRING,
    details: DataTypes.STRING,
    cost: DataTypes.DECIMAL,
    status: DataTypes.ENUM('pending', 'processing', 'done'),
    estimateFinishDate: DataTypes.DATE,
    finishDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'RepairOrder',
    tableName: 'RepairOrder',
  });
  return RepairOrder;
};