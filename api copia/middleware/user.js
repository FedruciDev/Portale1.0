const { UserModel } =require ("../model/userModel");
const { RoleModel } =require ("../model/roleModel");
const { Permission } =require ("./permission");

class User{

    constructor (username,password){
        this.username=username;
        this.password=password?password:null;
    }

   
    async getUser(){
        const user= await UserModel.findOne(
            {
                attributes:['username','email','role'],
                include:[
                    {
                        model:RoleModel,
                        attributes:['name']  
                    }
                ],
                where:{username:this.username}
            }
        )
        if (user){
            this.user=user
            return user
        }
        else
        {
            this.user=null
            return null
        }
    }

    async getUserPermission(){

        await this.getUser()
        if (this.user){
            const perms=new Permission(this.user)
            const userPerm=await perms.getAllPermission()
            if (userPerm){
                
                return ({
                    user:this.user,
                    perms:userPerm
                })
            }
            else
            {
                return null
            }
        }
        else
        {
            return null
        }
        
    }


    async verifyReadPermission(entity){

            const permissions=await this.getUserPermission()
            if (permissions){
                const isAllowed=(permissions.perms.entity).some((perm)=>perm.model === entity && perm.read);
                return isAllowed
    
            }
            else
            {
                return false
            }

            
        }
    

    async verifyWritePermission(entity){

        const permissions=await this.getUserPermission()
        if (permissions){
            const isAllowed=(permissions.perms.entity).some((perm)=>perm.model === entity && perm.write);
            return isAllowed
        }
        else
        {
            return false
        }

        
    }
}

module.exports={
    User
}