const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const ImageSchema = require("../models/image");

const path = require('path');
const fs = require('fs');

const router = express.Router();
const verify = require("../jwt/verifyToken");

const app = express();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './images');
//     },
//     filename: function (req, file, cb) {
//       const ext = path.extname(file.originalname);
//       cb(null, `${Date.now()}${ext}`);
//     },
//   });
  
//   const upload = multer({ storage: storage });

const storageEngine = multer.diskStorage({
    destination: "./data/img",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
    },
  });
  const upload = multer({
    storage: storageEngine,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
      },
  });
  const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;
  
    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
    const mimeType = fileTypes.test(file.mimetype);
  
    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb("Error: You can Only Upload Images!!");
    }
  };

router.post('/uploadimage', upload.single('title'), async (req, res) => {
    try {
      // Access request body data
      const { title, desc } = req.body;
  
      // Get the file path of the uploaded image
      const imagePath = req.file.path;
  
      // Insert image data into MongoDB
      const newImage = new ImageSchema({ title, desc, imagePath });
      await newImage.save();
  
      res.status(200).json({ message: 'Image uploaded successfully', imageData: newImage });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Image upload failed' });
    }
  });

router.get('/getimage',async (req,res)=>{
    try {
        const GetAllImages = await ImageSchema.find(req.body.id)

        res.status(201).json(GetAllImages)
   } catch (err) {
        res.status(500).json(err);
   }
})
router.delete('/:id', async (req, res) => {
    if (req.user.isAdmin) {
         try {
              const deleteImage = await Movies.findByIdAndDelete(req.param.id)

              res.status(201).json("This movie had been deleted",deleteImage)
         } catch (err) {
              res.status(500).json(err);
         }
    }
    else {
         res.status(403).json("You are not allowed !")
    }

});
module.exports = router;