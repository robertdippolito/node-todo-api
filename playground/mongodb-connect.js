// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //same as code above

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
    return console.log(err);
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'my first entry',
  //   completed: false
  // }, (err, res) => {
  //   if(err){
  //     return console.log(err);
  //   }
  //   console.log(`The result returned was: ${JSON.stringify(res.ops)}`);
  // });

//   db.collection('Users').insertOne({
//     name: 'Robert',
//     age: 26,
//     location: 'Toronto'
//   }, (err, res) => {
//     if(err){
//       return console.log(err);
//     }
//     console.log(`The result returned was: ${JSON.stringify(res.ops[0]._id.getTimestamp())}`);
//   });
//   client.close();
});
