const express = require('express');

const authRoute = require("../router/auth");
const userRoute = require("../router/user");
const Images = require("../router/images");
const chalk = require('chalk');
const cors = require('cors');
// const UserType = require('../r/usertype');
const UserType = require("../router/usertype");
const Navmenu = require('../router/navmenu');


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoute);   // auth route
app.use("/api/users",userRoute);  // user route
app.use('/api/img',Images)
app.use('/api/type',UserType)
app.use('/api/navmenu',Navmenu)


app.listen(process.env.PORT, () => 
console.log(chalk.magenta(`🚀 listening on port! 🚀${process.env.PORT}  `)))

module.exports =app;