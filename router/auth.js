
const User =require("../models/user");
const express =  require("express");
const app = express();
const CryptoJS = require("crypto-js")
const router = express.Router();
const jwt = require("jsonwebtoken")
const dbConnection = require("../connection/dbConn")
  

 
//Register 
router.post("/register",async (req,res)=>{
    const newUser= new User({
        username:req.body.username,
        password:req.body.password,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString(),
        email:req.body.email,
        profilepic:req.body.profilepic
    });
        //    console.log(newUser);
           try{
            const Reguser = await newUser.save();
            res.status(201).json(Reguser);
            console.log(Reguser)
   

           }
           catch(err){
            res.status(501).json(err);
           }  
});
// Login
 
router.post("/login", async(req,res)=>{
    try {
        const user =  await User.findOne({email:req.body.email});
        !user && res.status(401).json("Wrong password or username! ");
         
         
        const bytes = CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY);
        const OriginalPassword = bytes.toString(CryptoJS.enc.Utf8);


         OriginalPassword !== req.body.password &&
         res.status(401).json("Wrong password or username! ");

         const accessToken =jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET_KEY)
    
         
          
         const{password,...info}=user._doc;
         res.status(200).json({...info,accessToken});

    } catch (error) {
        res.status(501).json(error)
        
    }
})
module.exports = router;
