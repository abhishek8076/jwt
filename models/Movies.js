const  mongoose  = require("mongoose");

const MovieSchema = new mongoose.Schema({
    title : {type:String,require:true,unique:true},
    desc:{type:String,require:true,},
    img:{type:String},
    imgTitle:{type:String},
    imgSm:{type:String},
    trailer:{type:String},
    vidoe:{type:String},
    year:{type:String},
    limit:{type:Number},
    genre:{type:String},
    isSeries:{type:Boolean,default:false},

},
    {timestamps:true}
);
module.exports = mongoose.model("Movie",MovieSchema);