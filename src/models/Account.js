'use strict';
const {
  Model
} = require('sequelize');
const { DATE } = require('sequelize/lib/data-types');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.belongsTo(models.Role, { foreignKey: "roleId" });
      Account.hasMany(models.Staff, { foreignKey: "accountId" });
      // define association here
    }
  }
  Account.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.ENUM("active", "inactive"),
    resetPasswordToken: DataTypes.INTEGER,
    resetPasswordExpires: DATE,
  }, {
    sequelize,
    modelName: 'Account',
    tableName: 'Account',
  });
  return Account;
};