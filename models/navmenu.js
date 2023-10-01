const  mongoose  = require("mongoose");

const Navmenu =  new mongoose.Schema({
    id: {type:String},
    name : {type:String},
    is_submenu:{type:Number},
    menu_id:{type:Number},
    content_id:{type:String},
    content_type:{type:String}, 
    content_data:{type:String},
    

},
    {timestamps:true}
);  
module.exports = mongoose.model("navmenu",Navmenu);;