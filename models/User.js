const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Picture = require("../models/Picture");

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  status: {
    type: String,
    enum: ["Pending confirmation", "Active"],
    default: "Pending confirmation"
  },
  confirmationCode: {
    type: String,
    required: true,
    unique: true
  },
  profilePicture: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
