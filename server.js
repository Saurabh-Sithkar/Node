const express = require('express')
const app = express();
const dp = require('./db');

const bodyParser  = require('body-parser');
app.use(bodyParser.json()); // req.body

const Person = require('./models/Person')
const MenuItem = require('./models/MenuItem');
const { join } = require('lodash');

// app.get('/', function (req,res){
//     res.send("Hello World")
// })

 

 




const personRoutes = require('./routes/personRoutes');
//Use the routers
app.use('/person',personRoutes);

const menuRoutes = require('./routes/menuRoutes');
//Use the routes. 
app.use('/menuItem',menuRoutes);

app.listen(3000,()=>{
    console.log('listening on port 3000')
})