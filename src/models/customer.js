'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Invoice, { foreignKey: "customerId" });
      Customer.hasMany(models.Warranty, { foreignKey: "customerId" });
      Customer.hasMany(models.RepairOrder, { foreignKey: "customerId" });
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    point: DataTypes.INTEGER,
    status: DataTypes.ENUM('active', 'inactive'),
  }, {
    sequelize,
    modelName: 'Customer',
    tableName: 'Customer',
  });
  return Customer;
};