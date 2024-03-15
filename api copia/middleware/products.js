const { Sequelize } = require("sequelize");
const { ReturnModel } =require ("../model/returnModel");
const { ProductModel } = require("../model/productModel");

class Products{

    constructor (id){
        this.id=id?id:null;
    }

    async getProducts(like){
        const products=ProductModel.findAll({
            where: {
                name:{
                    [Sequelize.Op.like]: `%${like}%`
                }
              }
        })
        if (products){
            this.products=products
            return products
        }
        else
        {
            this.products=null
            return null
        }

    }
}

module.exports={
    Products
}
