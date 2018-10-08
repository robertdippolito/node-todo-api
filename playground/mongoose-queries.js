const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5bbaca7d53344a24ef625eca11';
var userID = '5bb8f88744405b193d12c333';

// if (!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id //mongoose will transfer this into an ID
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });
User.findById(userID).then((user) => {
  if(!user) {
    return console.log('Unable to find User ID');
  }
  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});
// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     return console.log('Unable to find ID');
//   }
//   console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));
