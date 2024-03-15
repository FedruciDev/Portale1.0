const { DataTypes } = require("sequelize");
const {dbConf} = require('../config/dbConfig'); 
const { RoleModel } = require("./roleModel");




const RoutesModel = dbConf.define('Routes', {
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
    path: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    allowed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    unique: false,
    }
  }, {tableName: "Routes", timestamps:false});

  RoutesModel.belongsTo(RoleModel, { foreignKey: 'role' });
  
  module.exports={RoutesModel}

