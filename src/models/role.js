'use strict';
const { Model } = require('sequelize');

const { Enums } = require('../utils/common');
const { ADMIN, CUSTOMER } = Enums.USER_ROLES;

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, { through: 'userRoles', as: 'user' });
    }
  }
  Role.init({
    name: {
      type: DataTypes.STRING,
      defaultValue: CUSTOMER,
      allowNull: false,
      validate: {
        isIn: [[ADMIN, CUSTOMER]]
      }
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};