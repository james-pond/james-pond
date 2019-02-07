const { getUser } = require('../dataHelpers');
// const mongoose = require('mongoose');
const { Types } = require('mongoose');
const Comment = require('../../lib/models/Comment');

describe('Comment model', () => {
  it('validates a good model', async() => {
    const user = await getUser();
    const comment = new Comment({
      user: user._id,
    });
    console.log('blah', user._id);
  
    expect(comment.toJSON()).toEqual({
      user: expect.any(String),
      _id: expect.any(Types.ObjectId)
    });
  });

});