const express = require("express");
const router = express.Router();
const User = require(".././models/user");
const CryptoJS = require('crypto-js');
const verify = require("../jwt/verifyToken");

//UPDATE 
router.put('/:id', async (req, res) => {
    if (req) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password,
                process.env.SECRET_KEY).toString();
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id,
                { $set: req.body },
                { new: true });
            res.status(200).json(updateUser)
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("you can only update your account !")
    }

});
//DELETE
router.delete('/:id', verify, async (req, res) => {
    if (req) {

        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User deleted....")
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("you can delete your account !")
    }

});

//GET
router.get('/find/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id,);

        const { password, ...info } = user._doc;
        res.status(200).json(info);
    }
    catch (err) {
        res.status(500).json(err);
    }


});
//    ALL User 
router.get('/',  async (req, res) => {
    const quary = req.query.new;
    if (req) {

        try {
           const user =  quary ? await User.find().limit(10) :await User.find();
            res.status(200).json(user)
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("you can not allowed to see the user ")
    }

});


//  Get User  Starts 

// router.get("/starts", async(req,res)=>{
  
// });
module.exports = router;