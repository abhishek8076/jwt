const express = require("express");
const router = express.Router();
const List = require(".././models/List");
const CryptoJS = require('crypto-js');
const verify = require("../jwt/verifyToken");


router.use(verify);   //middleare
//Create 
router.post('/', async (req, res) => {
     if (req.user.isAdmin) {
          const newList = new List(req.body);

          try {
               const saveList = await newList.save();
               res.status(201).json(saveList)
          } catch (err) {
               res.status(500).json(err);
          }
     }
     else {
          res.status(403).json("You are not authoried !")
     }

});
//Udate
router.put('/:id', async (req, res) => {
     if (req.user.isAdmin) {
               try {
               const updateList = await List.findByIdAndUpdate(req.param.id,{
                    $set :req.body
               },
               {
                     new:true
               }
               );
               res.status(201).json(updateList)
          } catch (err) {
               res.status(500).json(err);
          }
     }
     else {
          res.status(403).json("You are not authoried !")
     }

});
//Delete
router.delete('/:id', async (req, res) => {
     if (req.user.isAdmin) {
               try {
               const deleteList = await Movies.findByIdAndDelete(req.param.id)
              
               res.status(201).json("This List had been deleted")
          } catch (err) {
               res.status(500).json(err);
          }
     }
     else {
          res.status(403).json("You are not allowed !")
     }

});

// Get 
router.get('/:id', async (req, res) => {
     if (req.user.isAdmin) {
               try {
               const GetList = await Movies.findById(req.param.id)
              
               res.status(201).json(GetList)
          } catch (err) {
               res.status(500).json(err);
          }
     }
     else {
          res.status(403).json("You are not allowed !")
     }

});
router.get('/', async (req, res) => {
     
               try {
               const GetAllList = await Movies.find(req.body.id)
              
               res.status(201).json(GetAllList)
          } catch (err) {
               res.status(500).json(err);
          }
     

});
module.exports = router;