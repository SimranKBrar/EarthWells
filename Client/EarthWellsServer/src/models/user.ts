const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  password: { type: String},
  location: {type:String},
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;