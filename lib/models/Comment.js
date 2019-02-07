const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: String,
    ref: 'User'
  },
  text: {
    type: String
  }
});

// comment
// const groupByPost = () => ({ $group: { _id: '$post', count: { $sum: 1 } } });
// const sortByDesc = () => ({ $sort: { count: -1 } });
// const limitBy10 = () => ({ $limit: 10 });

// commentSchema.statics.mostComments = function() {
//   return this.aggregate([
//     groupByPost(),
//     sortByDesc(),
//     limitBy10()
//   ]);
// };

module.exports = mongoose.model('Comment', commentSchema);