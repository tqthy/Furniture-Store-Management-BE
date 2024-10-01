'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bill.belongsTo(models.Customer, { foreignKey: "customerId" });
      Bill.belongsTo(models.Staff, { foreignKey: "staffId" });
      Bill.hasMany(models.BillDetail, { foreignKey: "billId" });
    }
  }
  Bill.init({
    totalCost: DataTypes.DECIMAL(20,2),
    status: DataTypes.ENUM('paid', 'canceled','pending'),
  }, {
    sequelize,
    modelName: 'Bill',
    tableName: 'Bill',
  });
  return Bill;
};