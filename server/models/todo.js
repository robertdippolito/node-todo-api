var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true, //value must exist
    minLength: 1,
    trim: true //removes beginning and trailing white space
  },
  complete: {
    type: Boolean,
    default: false //sets the default value
  },
  completedAt: {
    type: Number,
    default: null //should not exist if a user doesn't add a todo
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {
  Todo: Todo
}
