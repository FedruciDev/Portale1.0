const { DataTypes } = require("sequelize");
const {dbConf} = require('../config/dbConfig'); 
const { ReturnModel } = require("./returnModel");



const ProductModel = dbConf.define('Products', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      site_ref:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:true 
      }

  }, {tableName: "Products", timestamps:false});


  const ProductReturn = dbConf.define('product_returns', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_return: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    quantity:{
      type:DataTypes.INTEGER,
      allowNull:false,
      unique:false
    }
  }, { tableName: "product_returns", timestamps: false });


  module.exports={ProductReturn,ProductModel}

