const { DataTypes } = require("sequelize");
const {dbConf} = require('../config/dbConfig'); 
const { RoleModel } = require("./roleModel");




const UserModel = dbConf.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:false
      }
  }, {tableName: "User", timestamps:false});

  UserModel.belongsTo(RoleModel, {foreignKey:'role'})
  module.exports={UserModel}

