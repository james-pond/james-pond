require('../../lib/routes/auth');
require('dotenv').config();
const User = require('../../lib/models/User');
const request = require('supertest');
const connect = require('../../lib/utils/connect');
const mongoose = require('mongoose');
const app = require('../../lib/app');

const createUser = (username) => {
  return User.create({ username, password: 'password' });
};

describe('auth route testing', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(done => {
    mongoose.connection.dropDatabase(done);
  });

  afterAll(done => {
    mongoose.connection.close(done);
  });

  it('can sign up a user', () => {
    console.log('***AUTH TEST HERE***');
    return request(app)
      .post('/auth/signup')
      .send({ username: 'abel', password: 'password' })
      .then(res => {
        console.log('id', typeof res.body.user._id, 'token', typeof res.body.token);
        console.log('***RESBODY AUTH TEST***', res.body);

        expect(res.body).toEqual({ 
          user: {
            _id: expect.any(String),
            username: 'abel'
          },
          token: expect.any(String)
        });
      });
  });

  it.only('can sign in a user', () => {
    return createUser('Bill')
      .then(() => {
        return request(app)
          .post('/auth/signin')
          .send({
            username: 'Bill',
            password: 'password'
          })
          .then(res => {
            console.log('hello', res.body);
            expect(res.body).toEqual({
              user: {
                _id: expect.any(String),
                username: 'Bill',
              },
              token: expect.any(String)
            });
          });
      });
  });
});