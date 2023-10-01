
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  title:{type:String},
  desc:{type:String},
  imagePath:{type:String}, // This will store the path to the uploaded image
});

module.exports = mongoose.model('Image', ImageSchema);


