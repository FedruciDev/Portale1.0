const { UserModel } =require ("../model/userModel");
const { CustomerModel } =require ("../model/customerModel");
const { Permission } =require ("./permission");

class Customers{

    constructor (id){
        this.id=id?id:null;
    }

   
    async getCustomer(){
        const customer= await CustomerModel.findOne(
            {
                attributes:['name','address','city','postcode','number'],
                where:{id:this.id}
            }
        )
        if (customer){
            this.customer=customer
            return customer
        }
        else
        {
            this.customer=null
            return null
        }
    }

}

module.exports={
    User
}