const jwt = require('jsonwebtoken');
function verify(req,res,next){
     const token = req.headers.token;
     if(token){   
       
         jwt.verify(token, process.env.SECRET_KEY,(err,user)=>{
            if(err) res.status(403).json("Token is not valid");
             req.user = user; 
             next();
         })
     }
     else{
        return res.status(401).json(" you are not authenticated !")
     }

 }
 module.exports = verify;