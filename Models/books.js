'use strict';

const User = require('../modules/User');

const Books= {};

Books.addABook = async(request, response) => {
  console.log('inside of addABook', request.body);
  const name = request.body.name;
  const book = { name: request.body.bookName }

  await User.findOne({ email: name }, (err, entry) => {
    if(err) return console.error(err);
    if(!entry){
      return console.error('user not found');
    }
    entry.books.push(book);
    entry.save();
    response.status(200).send(entry.books);
  })
}

Books.getUser = async(request, response) => {
  const name = request.query.user_name;
  // console.log(request.query);
  await User.find({ email: name }, function (err, items) {
    if (err) return console.error(err);
    // console.log(items);
    response.status(200).send(items[items.length -1].books);
  })
}

Books.deleteABook = async(request, response) => {
  const index = parseInt(request.params.index);
  const userName = request.query.name;
  // console.log("we are in deleteABook", index, userName);
  
  await User.findOne({ email: userName }, (err, entry) => {
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

Books.updateABook = async (request, response) => {
  const index = parseInt(request.params.index);
  const bookName = request.body.bookName;
  const description = request.body.description;
  const status = request.body.status;
  const userName = request.body.user_name;


  console.log('we are in updateABook', {index, bookName, userName, status, description});
  // { index: '1', catName: 'sam', personName: 'Brian' }
  await User.findOne({email:userName}, (err, user) => {
    const book = { name: bookName, description: description, status: status }
    user.books.splice(parseInt(index), 1, book);
    user.save();
    response.status(200).send(user.books);
  })
}

module.exports = Books;