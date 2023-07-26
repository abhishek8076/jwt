const dbConection = require('./connection/dbConn');
const App = require("./Mainapp/mianRoutes");
const mongoose  = require('mongoose');
const user = require('./models/user');


//  database Connection
dbConection;  

//Main Router Call with the App
App;
