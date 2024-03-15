const {UserModel}= require('../model/userModel')
const {createToken,verifyToken} = require("../auth/jwt.js")
var jwt = require('jsonwebtoken');
const { PermissionModel } = require('../model/permissionModel');
const { RoleModel } = require('../model/roleModel');
const { createResponse } = require('../controller/response.controller');
const {Permission}= require('./permission')
const {User}= require('./user')


async function login(req, res) {
    const {username,password} = req.body;
    
    const user= await UserModel.findOne(
        {
            attributes:['username','email'],
            include:[{
              model:RoleModel,
              attributes:['id','name']  
            }],
            where: { username, password}
        }
        )
    if (user){
        const token= createToken(username,"1h")
        res.status(200).send({ok:true, user:user, token:token })
    }
    else
    {
        res.status(200).send({ok:false, message:"Username e/o password errati!" })
    }
}


async function checkToken(req,res){
    const {username,token} = req.body;

    const verify=verifyToken(token,username)
    if (verify){
        const user=new User(username);
        const perms=await user.getUserPermission();
        
        if (perms){
            setTimeout(() => {
                res.status(200).send(createResponse(true,"Token valido!",{token,user:perms.user,perms:perms.perms.routes}));

              }, 200);
        }
        else
        {
            res.status(401).send(createResponse(false,"Sessione non valida o scaduta!",req.body));
        }
    }
    else
    {
        res.status(401).send(createResponse(false,"Sessione non valida o scaduta!",req.body));
    }
}



module.exports={
    login,
    checkToken
}