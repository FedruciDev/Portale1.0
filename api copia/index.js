const {login, checkToken}= require("./middleware/auth")
const {getAllUser,getAllRoles,editUser, deleteUser,editRole, getAllReturns, getAllProducts, addReturns}= require("./middleware/management")
const express = require("express");
const cors=require("cors");
const { verifyTokenMiddleware } = require("./auth/jwt");
const app = express ();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

app.post("/login", login);
app.post("/verifyToken", checkToken)  

app.post("/getAllUser", verifyTokenMiddleware,getAllUser)  
app.post("/getAllRoles", verifyTokenMiddleware,getAllRoles)  
app.post("/editUser",verifyTokenMiddleware,editUser)  
app.post("/editRole",verifyTokenMiddleware,editRole)  
app.post("/deleteUser",verifyTokenMiddleware,deleteUser)  
app.post("/addReturns",verifyTokenMiddleware,addReturns)  


app.post("/getAllReturns", verifyTokenMiddleware,getAllReturns)  
app.post("/getAllProducts", verifyTokenMiddleware,getAllProducts)  
