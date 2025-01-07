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
      Invoice.hasMany(models.InvoiceDetails, { foreignKey: "invoiceId" });
    }
  }
  Invoice.init({
    totalCost: DataTypes.INTEGER,
    status: DataTypes.ENUM('paid', 'canceled','pending'),
    paymentMethod: DataTypes.ENUM('Cash', 'QR code'),
    invoiceNumber: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Invoice',
    tableName: 'Invoice',
  });
  return Invoice;
};