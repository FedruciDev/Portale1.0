const { Sequelize, DataTypes } = require('sequelize');

const dbConf = new Sequelize('Portale', 'root', '1q2w3e4r', {
    host: 'localhost',
    dialect: 'mysql',
  });
module.exports={
    dbConf:dbConf
}