//mango pw: 1234
//connecting string: mongodb+srv://zak1804:<password>@cluster0-ejyrz.mongodb.net/test?retryWrites=true&w=majority
//mongodb://zak1804:1234@cluster0-shard-00-00-ejyrz.mongodb.net:27017,cluster0-shard-00-01-ejyrz.mongodb.net:27017,cluster0-shard-00-02-ejyrz.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
//const cors = require('cors');


const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();

//db connection
mongoose.connect('mongodb://zak1804:1234@cluster0-shard-00-00-ejyrz.mongodb.net:27017,cluster0-shard-00-01-ejyrz.mongodb.net:27017,cluster0-shard-00-02-ejyrz.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
.then(()=>{
    console.log('Successfully connected to MongoDB Atlas!');
})
.catch((error)=>{
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
});
//

app.use(bodyParser.json());






//Cross Origin Resource Sharing
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  //app.use('/api/sauces', sauceRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/auth', userRoutes);
  app.use('/api/sauces', sauceRoutes);


  
  
module.exports = app;