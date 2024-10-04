'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.belongsTo(models.Customer, { foreignKey: "customerId" });
      Invoice.belongsTo(models.Staff, { foreignKey: "staffId" });
      Invoice.hasMany(models.InvoiceDetails, { foreignKey: "InvoiceId" });
    }
  }
  Invoice.init({
    totalCost: DataTypes.DECIMAL(20,2),
    status: DataTypes.ENUM('paid', 'canceled','pending'),
  }, {
    sequelize,
    modelName: 'Invoice',
    tableName: 'Invoice',
  });
  return Invoice;
};