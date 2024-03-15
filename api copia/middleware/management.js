const { UserModel } =require ("../model/userModel");
const { RoleModel } =require ("../model/roleModel");
const { createResponse } = require("../controller/response.controller");
const { where, sequelize } = require("sequelize");
const { User } = require("./user");
const { verifyToken } = require("../auth/jwt");
const { PermissionModel } = require("../model/permissionModel");
const { RoutesModel } = require("../model/routesModel");
const { Products } = require("./products");
const { Returns } = require("./returns");

 const getAllUser=async (req,res)=>{
    try{

        const username=req.body.user.username;
        const userIdenity=new User(username);
        const isAllowed=await userIdenity.verifyReadPermission(UserModel.name)
        if (isAllowed){
            const users=(await UserModel.findAll({
            attributes:['id','username','email','role'],
            include:[
                {
                    model:RoleModel,
                    attributes:['name']  
                }
            ]
        })).map(item=>item.toJSON())
        res.status(200).send(createResponse(true,"",{users}));
        }
        else
        {
            res.status(200).send(createResponse(false,"Non hai i permessi per accedere alla risorsa!",{}));

        }
    
   
    }
    catch(err){
        res.status(400).send(createResponse(false,"C'è stato un problema!",{}));

    }


    
}

const getAllRoles=async (req,res)=>{
    const username=req.body.user.username;
    const userIdenity=new User(username);
    const isAllowed=await userIdenity.verifyReadPermission(RoleModel.name)
    if (isAllowed){
        RoleModel.hasMany(PermissionModel, { foreignKey: 'role' });
        RoleModel.hasMany(RoutesModel, { foreignKey: 'role' });
        const roles=(await RoleModel.findAll({
            include: [{
              model: PermissionModel,
              attributes: ['id', 'model', 'read', 'write'],
            },
            {
                model:RoutesModel,
                attributes:['id','path','allowed']

            }
        ],
            attributes: ['id', 'name'],
          })).map(item=>item.toJSON())
        if (roles){
            res.status(200).send(createResponse(true,"",{Role:roles}));
        }
        else
        {
            res.status(400).send(createResponse(false,"C'è stato un problema!",{}));
        }
        
    }
    else
    {
        res.status(400).send(createResponse(false,"Non hai i permessi per accedere alla risorsa!",{}));
    }

}

const editUser=async (req,res)=>{
    const username=req.body.user.username;
    const alterUser=req.body.alterUser
    const userIdenity=new User(username);
    const isAllowed=await userIdenity.verifyWritePermission(UserModel.name)
    if (isAllowed){
        const result=await UserModel.update({ username:alterUser.username,email:alterUser.email,role:alterUser.role }, {
            where: {
              id: alterUser.id,
            },
          });
          if (result){
            res.status(200).send(createResponse(true,"",{}));
          }
          else
          {
            res.status(400).send(createResponse(false,"C'è stato un problema!",{}));
          }
        
    }    
    else
    {
        res.status(400).send(createResponse(false,"Non hai i permessi per modificare la risorsa!",{}));
    }


    const user=req.body.alterUser;
   

}


const editRole=async (req,res)=>{
    const username=req.body.user.username;
    const alterRole=req.body.alterRole
    const userIdenity=new User(username);
    const isAllowedRole=await userIdenity.verifyWritePermission(RoleModel.name)
    const isAllowedPerm=await userIdenity.verifyWritePermission(PermissionModel.name)
    const isAllowedRoutes=await userIdenity.verifyWritePermission(RoutesModel.name)
    if (isAllowedRole && isAllowedPerm && isAllowedRoutes){

        try {
            Object.values(alterRole).forEach(async role => {
             
                role.Permissions.map(async (perm)=>{
                    const result= await PermissionModel.update(perm,{
                        where:{id:perm.id}
                    })

                })
                     
                role.Routes.map(async (routes)=>{
                    const result= await RoutesModel.update(routes,{
                        where:{id:routes.id}
                    })

                })
        

            });
            
        } catch (error) {
    
            res.status(400).send(createResponse(false,"C'è stato un problema!",{}));

        }
        res.status(200).send(createResponse(true,"",{}));

      
       
    }    
    else
    {
        res.status(400).send(createResponse(false,"Non hai i permessi per modificare la risorsa!",{}));
    }
}

/*Returns*/
const getAllReturns=async(req,res)=>{
    const returns=new Returns()
    const returnList=await returns.getAllReturns(req.body.like)
    res.status(200).send(createResponse(true,"",{returns:returnList}));


}
const addReturns=async(req,res)=>{
    const returns=new Returns()
    const result=await returns.addReturns(req.body.returns)

    result?res.status(200).send(createResponse(true,"",{})):res.status(400).send(createResponse(false,"C'è stato un problema!",{}));



}
const getAllProducts=async(req,res)=>{
    const products=new Products()
    const productList=await products.getProducts(req.body.like)
    res.status(200).send(createResponse(true,"",{products:productList}));

}




const deleteUser=async (req,res)=>{
    const username=req.body.user.username;
    const alterUser=req.body.alterUser
    const userIdenity=new User(username);
    const isAllowed=await userIdenity.verifyWritePermission(UserModel.name)
    if (isAllowed){
        const result=await UserModel.destroy( {
            where: {
              id: alterUser.id,
            },
          });
          if (result){
            res.status(200).send(createResponse(true,"",{}));
          }
          else
          {
            res.status(400).send(createResponse(false,"C'è stato un problema!",{}));
          }
        
    }    
    else
    {
        res.status(400).send(createResponse(false,"Non hai i permessi per modificare la risorsa!",{}));
    }


    const user=req.body.alterUser;
   

}



module.exports={
    getAllUser,
    getAllRoles,
    editUser,
    deleteUser,
    editRole,
    getAllReturns,
    getAllProducts,
    addReturns
}