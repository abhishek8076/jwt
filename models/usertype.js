const  mongoose  = require("mongoose");

const UserTypeSchema =  new mongoose.Schema({
    name : {type:String},
},
    {timestamps:true}
);  
module.exports = mongoose.model("Usertype",UserTypeSchema);