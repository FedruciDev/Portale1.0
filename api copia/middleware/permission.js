const { PermissionModel } = require('../model/permissionModel');
const {RoutesModel } =require('../model/routesModel');
const {UserModel} = require('../model/userModel')
class Permission{

    constructor(user) {
        this.user=user;
    }
    


    async getAllPermission(){
        
        try{
            const entityPerm=(await PermissionModel.findAll(
                    {
                        attributes:['model','read','write'],
                        where: { role:this.user.role }
                    }

                )).map(item=>item.toJSON());
            const routesPerm=(await RoutesModel.findAll(
                {
                    attributes:['path','allowed'],
                    where: { role:this.user.role }
                }
            )).map(item=> item.toJSON());
            
            if (entityPerm&&routesPerm){
                return ({entity:entityPerm,routes:routesPerm})
            }
            else
            {
                return false
            }


        

        }catch(error){
            return false
        }
        
    
    }
    

}

module.exports={
    Permission
}