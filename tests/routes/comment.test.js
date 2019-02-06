require('dotenv').config();
require('../../lib/utils/connect')();
const request = require('supertest');
const app = require('../../lib/app');
const { getToken, getComment } = require('../dataHelpers');
// const trip = require('../../lib/models/TripInfo');

describe('comments', () => {
  it.only('can post a comment', () => {
    return getComment()
      .then(comment => {
        console.log('here', comment);
        return request(app)
          .post('/comments')
          .send({ user: user._id, text: 'whateva' })
          .set('Authorization', `Bearer ${getToken()}`)
          .then(res => {
            expect(res.body).toEqual({
              commentBy: expect.any(String),
              comment: 'whateva',
              _id: expect.any(String),
              __v: 0
            });
          });
      });
  });
});