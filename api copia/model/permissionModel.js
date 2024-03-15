const { DataTypes } = require("sequelize");
const {dbConf} = require('../config/dbConfig'); 
const { RoleModel } = require("./roleModel");




const PermissionModel = dbConf.define('Permissions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    unique: false,
    },
    write:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    unique:false
    }
  }, {tableName: "Permission", timestamps:false});

  PermissionModel.belongsTo(RoleModel, { foreignKey: 'role' });

  module.exports={PermissionModel}

