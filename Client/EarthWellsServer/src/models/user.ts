const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String},
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;