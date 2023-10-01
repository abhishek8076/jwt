
const User =require("../models/user");
const express =  require("express");
const app = express();
const CryptoJS = require("crypto-js")
const router = express.Router();
const jwt = require("jsonwebtoken")
const dbConnection = require("../connection/dbConn")
const nodemailer = require('nodemailer');
const crypto = require('crypto');


  

 
//Register 
// router.post("/register",async (req,res)=>{
//     const newUser= new User({
//         username:req.body.username,
//         password:req.body.password,
//         password: CryptoJS.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString(),
//         email:req.body.email,
        
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
// });
router.post("/register", async (req, res) => {
  try {
    // Generate a random password
    const randomPassword = crypto.randomBytes(8).toString('hex'); // Change the length as needed
    // const randomPassword = crypto.randomBytes(8).toString('hex');

    // Encrypt the random password
    const encryptedPassword = CryptoJS.AES.encrypt(randomPassword, process.env.SECRET_KEY).toString();

    // Create a new User object
    const newUser = new User({
      username: req.body.username,
      password: encryptedPassword,
      email: req.body.email,
      mobileNo:req.body.mobileNo,
      address:req.body.address,
    });

    // Saving the user to the database
    

    // Sending a confirmation email with the generated password
    const transporter = nodemailer.createTransport({
      service: 'zimbra',
      host: 'mail.ornatets.com',
      port: 587,
      secure: false,
      auth: {
        user: 'abhishek@ornatets.com',
        pass: 'AbhisheK@123',
      }
      ,
  tls: {
    rejectUnauthorized: false, // Disable certificate verification (not recommended for production)
  },
    });

    const mailOptions = {
      from: 'abhishek@ornatets.com',
      to: req.body.email,
      subject: 'Registration Confirmation',
      text: `Thank you for registering with our website. Your generated password is: ${randomPassword}`,
    };
    const registeredUser = await newUser.save();
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Email could not be sent.' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(201).json(registeredUser);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Login
 
// router.post("/login", async(req,res)=>{
//     try {
//         const user =  await User.findOne({email:req.body.email});
//         !user && res.status(401).json("Wrong password or username! ");
         
         
//         const bytes = CryptoJS.AES.decrypt(user.password,process.env.SECRET_KEY);
//         const OriginalPassword = bytes.toString(CryptoJS.enc.Utf8);


//          OriginalPassword !== req.body.password &&
//          res.status(401).json("Wrong password or username! ");

//          const accessToken =jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.SECRET_KEY)
    
         
          
//          const{password,...info}=user._doc;
//          res.status(200).json({...info,accessToken});

//     } catch (error) {
//         res.status(501).json(error)
        
//     }
// })

router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(401).json({ error: 'Wrong username!' });
      }
  
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
  
      if (originalPassword !== req.body.password) {
        return res.status(401).json({ error: 'Wrong password!' });
      }
  
      // If username and password are correct, generate and send the access token
      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY
      );
  
      // Respond with user information and access token
      const { password, ...userInfo } = user._doc;
      res.status(200).json({ ...userInfo, accessToken });
    } catch (error) {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  });
  module.exports = router;
