import mongoose from 'mongoose';


const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const ReplySchema = new Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Posts', // Reference to the Post model
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
  // Create the 'Replies' model
  const ReplyModel = mongoose.model('Replies', ReplySchema);
  
  export default ReplyModel;

