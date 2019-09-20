const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  authorId: {type: Schema.Types.ObjectId, ref: 'User'},
  picPath: String,
  picName: String,
}, {
  timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
