const  mongoose  = require("mongoose");

const UserSchema =  new mongoose.Schema({
    username : {type:String,unique:true},
    password:{type:String,},
    email:{type:String,unique:true},
    profilepic:{type:String,default:" "}, 
    isAdmin:{type:Boolean ,default:false},

},
    {timestamps:true}
);  
module.exports = mongoose.model("User",UserSchema);;