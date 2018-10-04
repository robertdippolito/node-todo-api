// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //same as code above

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
    return console.log(err);
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  //takes the following arguments: filter, update, options and callback
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5bb5716c02b6d83cf52a10de')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // })
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5bb15c6544614d0314935a2f')
  }, {
    $set: {
      name: 'Drizzy Drake'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  })
  // db.close();
});
