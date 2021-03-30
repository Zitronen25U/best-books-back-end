'use strict';

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT;

const mongoose = require('mongoose');

const User = require('./modules/User')


mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to DB');
});

app.get('/books', getUser);

async function getUser(request, response) {
  const name = request.query.user_name;
  console.log({ name })
  await User.find({ name: name }, function (err, items) {
    if (err) return console.error(err);
    console.log(items, items[0])
    response.status(200).send(items[0].books);
  })
}

const brian = new User({
  email: this.name,
  books: [{name: '1984', description: 'Such a good read', status: 'my fav books'}]
});
brian.save();


app.listen(PORT, () => console.log(`server is up on ${PORT}`));
