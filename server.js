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

app.get('/entries', (rec, res) => {
  dan.save();
  brian.save();
  res.send('entries');
});

app.get('/books', Books.getUser);
app.post('/books', Books.addABook);
app.delete('/books/:index', Books.deleteABook);
app.put('/books/:index', Books.updateABook);


app.post('/books', addABook);
app.delete('/books/:index', deleteABook);

function addABook(request, response){
  console.log('inside of addABook', request.body);
  const name = request.body.name;
  const book = { name: request.body.bookName }

  User.findOne({ email: name }, (err, entry) => {
    if(err) return console.error(err);
    if(!entry){
      return console.error('user not found');
    }
    entry.books.push(book);
    entry.save();
    response.status(200).send(entry.books);
  })
}


app.get('/books', getUser);

async function getUser(request, response) {
  const name = request.query.user_name;
  // console.log(request.query);
  await User.find({ email: name }, function (err, items) {
    if (err) return console.error(err);
    console.log(items);
    response.status(200).send(items[items.length -1].books);
  })
}

function deleteABook(request, response) {
  const index = parseInt(request.params.index);
  const userName = request.query.name;
  // console.log("we are in deleteABook", index, userName);
  
  User.findOne({ email: userName }, (err, entry) => {
    if (err) return err;
    // console.log("this is our entry", entry);
    const newBookArray = entry.books.filter((book, i) => {
      // console.log(entry.books[i]);
      return i !== index;
    });
    console.log("this is our newBookArray", newBookArray);
    entry.books = newBookArray;
    entry.save();
    response.status(200).send('success!')
  })
}


app.listen(PORT, () => console.log(`server is up on ${PORT}`));
