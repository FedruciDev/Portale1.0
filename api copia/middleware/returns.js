const { UserModel } =require ("../model/userModel");
const { ReturnModel } =require ("../model/returnModel");
const { Permission } =require ("./permission");
const { ProductModel, ProductReturn } = require("../model/productModel");
const { CustomerModel } = require("../model/customerModel");
const { Sequelize } = require("sequelize");

class Returns{

    constructor (id){
        this.id=id?id:null;
    }

   
    async getAllReturns(like){
        console.log(like);
        const returns= await ReturnModel.findAll({
            attributes: ['id', 'order_id','data', 'condition_declared', 'condition_checked','warranty','type','notes'],
            include: [
                { model: CustomerModel, attributes: ['name', 'address', 'city', 'postcode', 'number'] },
                {
                  model: ProductReturn,
                  as: 'products',
                  attributes:["id", 'quantity'],
                  include: [
                    { model: ProductModel, attributes: ['id', 'name', 'code', 'site_ref'],as:"info" },
                  ],
                },
              ],
              
              where: {
                [Sequelize.Op.or]: [
                  {
                    order_id: {
                      [Sequelize.Op.like]: `%${like}%`, // Utilizzo di 'like' al posto di 'Like'
                    },
                  },
                  {
                    '$Customer.name$': {
                      [Sequelize.Op.like]: `%${like}%`, // Utilizzo di 'like' al posto di 'Like'
                    },
                  },
                ],
              },
            
          })
          
        if (returns){
            this.returns=returns
            return returns
        }
        else
        {
            this.returns=null
            return null
        }
    }
    async addReturns(returns){
      console.log(returns);
      const newReturn = await ReturnModel.create({
          order_id: returns.order_id,
          data: new Date(),
          condition_declared: "DANNEGGIATO" ,
          condition_checked: "OK",
          warranty: true,
          type: "RESO",
          notes: 'valore_notes',
          customer:1
      });
  
      await Promise.all(returns.products.map(async (product) => {
          await ProductReturn.create({
              id_return: newReturn.id,
              id_product: product.id,
              quantity: product.quantity,
          });
      }));
  
      
    if (newReturn){
        
        return true
    }
    else
    {
        return false
    }
}

}

module.exports={
    Returns
}