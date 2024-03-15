const { DataTypes } = require("sequelize");
const {dbConf} = require('../config/dbConfig'); 



const CustomerModel = dbConf.define('Customers', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    },
    postcode:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    },
    number:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:false
    }

  }, {tableName: "Customers", timestamps:false});


  module.exports={CustomerModel}

