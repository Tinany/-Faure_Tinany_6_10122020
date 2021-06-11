// Technologies used
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require('express-rate-limit');

// API routes 
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Express app
const app = express();
const helmet = require('helmet');

// Mongoose connexion
mongoose.connect(process.env.BDD,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Headers 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//Limiter
const  limiter  =  rateLimit ({ 
  windowMs : 15 * 60 * 1000 ,
  max : 100 
});

// Data processing
app.use(bodyParser.json());
app.use(helmet());
app.use ('/api/' ,  limiter);

//App.use function
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;