const express = require('express');
const app = express();
const authRoute = require("../router/auth");
const userRoute = require("../router/user");
const movieRoute = require("../router/movie");
const listRoute = require("../router/list");
const chalk = require('chalk');



app.use(express.json());
app.use("/api/auth",authRoute);   // auth route
app.use("/api/users",userRoute);  // user route
app.use("/api/movies",movieRoute)  // mvoies route
app.use('/api/list',listRoute)      //list route

app.listen(process.env.PORT, () => 
console.log(chalk.magenta(`🚀 listening on port! 🚀${process.env.PORT}  `)))

module.exports =app;