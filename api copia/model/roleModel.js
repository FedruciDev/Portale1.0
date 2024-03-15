const { DataTypes } = require("sequelize");
const {dbConf} = require('../config/dbConfig'); 



const RoleModel = dbConf.define('Roles', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    }
  }, {tableName: "Roles", timestamps:false});


  module.exports={RoleModel}

