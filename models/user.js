const  mongoose  = require("mongoose");

const UserSchema =  new mongoose.Schema({
    username : {type:String,unique:true},
    password:{type:String},
    email:{type:String,unique:true},
    mobileNo:{type:String,unique:false},
    address:{type:String,unquie:false}, 
    isAdmin:{type:Boolean ,default:true},
    userType:{type:String,unique:false}

},
    {timestamps:true}
);  
module.exports = mongoose.model("User",UserSchema);;