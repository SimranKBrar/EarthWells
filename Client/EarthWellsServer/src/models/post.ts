import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  body: String,
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Replies',
    },
  ], 
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  dislikes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  materials: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Materials', 
    },
  ],
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tags', 
    },
  ],
});   
 
const PostModel = mongoose.model("Posts", PostSchema);

export default PostModel;
 

