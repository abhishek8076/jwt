
const UserType = require("../models/usertype");
const express = require("express");
const app = express();
const CryptoJS = require("crypto-js")
const router = express.Router();
const jwt = require("jsonwebtoken");
const verify = require("../jwt/verifyToken");




//Register 
// router.post('/usertype',verify ,async (req, res) => {
//     const newUser= new UserType({
//         name:req.body.name,


//     });
//         //    console.log(newUser);
//            try{
//             const Reguser = await newUser.save();
//             res.status(201).json(Reguser);
//             console.log(Reguser)


//            }
//            catch(err){
//             res.status(501).json(err);
//            }  
//   });



router.post('/usertype', async (req, res) => {
    const newUser = new UserType({
        name: req.body.name,
    });

    try {
        console.log('Request Body:', req.body); // Log the request body
        const Reguser = await newUser.save();
        console.log('Saved User:', Reguser); // Log the saved user
        res.status(201).json(Reguser);
    } catch (err) {
        console.error('Error:', err);
        res.status(501).json(err);
    }
});

router.get('/getusertype', async (req, res) => {
    const quary = req.query.new;
    if (req) {

        try {
           const usertype =   await UserType.find();
            res.status(200).json(usertype)
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else {
        res.status(403).json("you can not allowed to see the user ")
    }


}
)
module.exports = router;