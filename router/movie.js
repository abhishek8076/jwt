const express = require("express");
const router = express.Router();
const Movie = require(".././models/Movies");
const CryptoJS = require('crypto-js');
const verify = require("../jwt/verifyToken");


router.use(verify);   //middleare
//Create 
router.post('/', async (req, res) => {
     if (req.user.isAdmin) {
          const newMovies = new Movies(req.body);

          try {
               const saveMovie = await newMovies.save();
               res.status(201).json(saveMovie)
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
               const updateMovie = await Movies.findByIdAndUpdate(req.param.id,{
                    $set :req.body
               },
               {
                     new:true
               }
               );
               res.status(201).json(updateMovie)
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
               const deleteMovie = await Movies.findByIdAndDelete(req.param.id)
              
               res.status(201).json("This movie had been deleted")
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
               const GetMovie = await Movies.findById(req.param.id)
              
               res.status(201).json(GetMovie)
          } catch (err) {
               res.status(500).json(err);
          }
     }
     else {
          res.status(403).json("You are not allowed !")
     }

});
//get all 
router.get('/', async (req, res) => {
     
               try {
               const GetAllMovie = await Movies.find(req.body.id)
              
               res.status(201).json(GetAllMovie)
          } catch (err) {
               res.status(500).json(err);
          }
     

});
module.exports = router;