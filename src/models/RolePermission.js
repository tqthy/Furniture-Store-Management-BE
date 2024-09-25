'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RolePermission.hasMany(models.Role, { foreignKey: "roleId" });
      RolePermission.hasMany(models.Permission, { foreignKey: "permissionId" });
    }
  }
  RolePermission.init({
  }, {
    sequelize,
    modelName: 'RolePermission',
  });
  return RolePermission;
};