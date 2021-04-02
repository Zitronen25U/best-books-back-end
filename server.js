'use strict';

require('dotenv').config();

const express = require('express');
const Books = require('./Models/books');
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT;

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to DB');
});

app.use(express.json());

// const dan = new User({
//   email: 'engeldb@gmail.com',
//   books: [{name: '1984', description: 'Such a good read', status: 'my fav books'}, {name: 'Let my People Surf', description: 'Surfing is good for you', status: 'my fav books'}, {name: 'Grapes of Wrath', description: 'Grapes taste good', status: 'my fav books'}]
// });

app.get('/entries', (rec, res) => {
  dan.save();
  brian.save();
  res.send('entries');
});

app.get('/books', Books.getUser);
app.post('/books', Books.addABook);
app.delete('/books/:index', Books.deleteABook);
app.put('/books/:index', Books.updateABook);

// const brian = new User({
//   email: 'bethelemons@gmail.com',
//   books: [{name: 'The Hobbit', description: 'Bilbao Baggins discovers the truth', status: 'my fav books'}, {name: 'The Witcher', description: 'A Monster Hunter', status: 'my fav books'}, {name: 'The Martian', description: 'Surviving on Mars', status: 'my fav books'}]
// });

app.listen(PORT, () => console.log(`server is up on ${PORT}`));
