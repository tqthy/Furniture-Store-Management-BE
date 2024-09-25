'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Staff.belongsTo(models.Account, { foreignKey: "accountId" });
      Staff.hasMany(models.WarrantyAndRepair, { foreignKey: "staffId" });
      Staff.hasMany(models.GoodsReceipt, { foreignKey: "staffId" });
      Staff.hasMany(models.Bill, { foreignKey: "staffId" });
    }
  }
  Staff.init({
    fullname: DataTypes.STRING,
    birth: DataTypes.DATEONLY,
    gender: DataTypes.ENUM('male', 'female'),
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    idNumber: DataTypes.STRING,
    status: DataTypes.ENUM('active', 'inactive', 'resigned'),
    startDate: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'Staff',
  });
  return Staff;
};