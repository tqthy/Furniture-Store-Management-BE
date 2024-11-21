'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warranty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Warranty.belongsTo(models.Customer, { foreignKey: "customerId" });
      Warranty.hasMany(models.WarrantyOrder, { foreignKey: "warrantyId" });
      Warranty.hasOne(models.InvoiceDetails, { foreignKey: "invoiceDetailsId" });
    }
  }
  Warranty.init({
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'Warranty',
    tableName: 'Warranty',
  });
  return Warranty;
};