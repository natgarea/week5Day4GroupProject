const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  description: String,
  imgName: String,
  imgPath: String,
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
