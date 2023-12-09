import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Posts',
    },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

  const ReplyModel = mongoose.model('Replies', ReplySchema);
  
  export default ReplyModel;

