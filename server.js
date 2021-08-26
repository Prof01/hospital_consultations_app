const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();
const db = process.env.mongo_URI;

const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//Connecting Database
mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => 
console.log('Connected to DB...'))

//Routes
app.use('/api/v1', require('./routes/consultationRoute'));
app.use('/api/v1', require('./routes/officerRoute'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));