const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = new Schema({
  content: String,
  creatorId: String,
  picPath: String,
  picName: String,
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
