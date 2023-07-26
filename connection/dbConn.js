const mongoose  = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');

dotenv.config();

 // Database connection 
 mongoose.set('strictQuery', true);
 const dbConection = mongoose.connect(process.env.M_URL, { useNewUrlParser: true,
    useUnifiedTopology: true, }).then(()=>{
       console.log(chalk.magenta('DB connected sucessfully 💻💻'));

       //console.log("'DB connected sucessfully'")
    }).catch((err)=>{
       console.log(err)
    });
module.exports = dbConection;