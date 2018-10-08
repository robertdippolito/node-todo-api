const expect = require('expect');
const request = require('supertest');
const _ = require('lodash');

const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'my first todo'
}, {
  _id: new ObjectID(),
  text: 'my second todo',
  complete: true,
  completedAt: 333
}];

//this will run before EACH test case
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({
        text: text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if(err) {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it('should return 404 if not found', (done) => {
    //make sure you get a 404 back
    let testID = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${testID}`)
      .expect(404)
      .end(done);
  });
  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });
  it('should return 404 if todo not found', (done) => {
    let testID = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${testID}`)
      .expect(404)
      .end(done);
  });
  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    //grab id of first item
    let hexId = todos[0]._id.toHexString();
    text = "my updated text";
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        complete: true,
        text: text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe("my updated text");
        expect(res.body.todo.complete).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });
  it('should clear completedAt when todo is not completed', (done) => {
    //grab id of second todo item
    let hexId = todos[1]._id.toHexString();
    text = "my updated text for the second box";
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        complete: false,
        text: text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe("my updated text for the second box");
        expect(res.body.todo.complete).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });

});
