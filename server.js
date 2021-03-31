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

app.use(express.json());

const dan = new User({
  email: 'engeldb@gmail.com',
  books: [{name: '1984', description: 'Such a good read', status: 'my fav books'}, {name: 'Let my People Surf', description: 'Surfing is good for you', status: 'my fav books'}, {name: 'Grapes of Wrath', description: 'Grapes taste good', status: 'my fav books'}]
});

app.get('/entries', (rec, res) => {
  dan.save();
  brian.save();
  res.send('entries');
});
app.post('/books', addABook);
app.delete('/books:index', deleteABook);

function addABook(request, response){
  console.log('inside of addABook', request.body);
  const name = request.body.name;
  const book = { name: request.body.bookName }

  User.findOne({ name }, (err, entry) => {
    if(err) return console.error(err);
    entry.boolks.push(book);
    entry.save();
    response.status(200).send(entry.books);
  })
}


const brian = new User({
  email: 'bethelemons@gmail.com',
  books: [{name: 'The Hobbit', description: 'Bilbao Baggins discovers the truth', status: 'my fav books'}, {name: 'The Witcher', description: 'A Monster Hunter', status: 'my fav books'}, {name: 'The Martian', description: 'Surviving on Mars', status: 'my fav books'}]
});


app.get('/books', getUser);

async function getUser(request, response) {
  const name = request.query.user_name;
  // console.log(request.query);
  await User.find({ email: name }, function (err, items) {
    if (err) return console.error(err);
    console.log('line 44', items[0].books);
    response.status(200).send(items[0].books);
  })
}

function deleteABook(request, response) {
  const index = request.params.index;
  const userName = request.query.name;
  // { index: '5', userName: 'Brian' }
  
  User.findOne({ name: userName }, (err, entry) => {
    const newBookArray = entry.books.filter((cat, i) => {
      return i !== index;
    });
    entry.books = newBookArray;
    entry.save();
    response.status(200).send('success!')
  })

}


app.listen(PORT, () => console.log(`server is up on ${PORT}`));
