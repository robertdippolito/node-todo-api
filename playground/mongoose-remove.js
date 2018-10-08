const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

// Todo.findOneAndRemove('5bbb908d02b6d83cf52a3162').then((todo) => {
//
// });
//
// Todo.findByIdAndRemove('5bbb908d02b6d83cf52a3162').then((todo) => {
//   console.log(JSON.stringify(todo, undefined, 2));
// });
