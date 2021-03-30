'use strict';

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to DB');
});

app.listen(PORT, () => console.log(`server is up on ${PORT}`));
