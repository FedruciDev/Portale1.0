const { DataTypes } = require("sequelize");
const {dbConf} = require('../config/dbConfig'); 
const { CustomerModel } = require("./customerModel");
const { ProductModel, ProductReturn } = require("./productModel");



const ReturnModel = dbConf.define('Returns', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    data:{
      type:DataTypes.DATE,
      unique:false,
      allowNull:false
    },
    customer:{
      type:DataTypes.INTEGER,
      unique:false,
      allowNull:false
    },
    condition_declared:{
      type:DataTypes.STRING,
      unique:false,
      allowNull:true
    },
    condition_checked:{
      type:DataTypes.STRING,
      unique:false,
      allowNull:true
    },
    warranty:{
      type:DataTypes.BOOLEAN,
      unique:false,
      allowNull:false
    },
    type:{
      type:DataTypes.STRING,
      unique:false,
      allowNull:false
    },
    notes:{
      type:DataTypes.STRING,
      unique:false,
      allowNull:true
    }
  }, {tableName: "Returns", timestamps:false});

  ReturnModel.belongsTo(CustomerModel, { foreignKey: "customer" });
  ReturnModel.hasMany(ProductReturn, {foreignKey:"id_return", as:"products"})  
  ProductReturn.belongsTo(ProductModel,{foreignKey:"id_product", as:"info"})
  ProductReturn.belongsTo(ReturnModel,{foreignKey:"id_return"})
  module.exports={ReturnModel}

