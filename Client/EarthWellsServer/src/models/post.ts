import mongoose from 'mongoose';


const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
  title: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  },
  body: String, // Add a field for the post body text
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
      ref: 'Materials', // Reference to the Materials model
    },
  ],
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tags', // Reference to the Materials model
    },
  ],
});   
 
const PostModel = mongoose.model("Posts", PostSchema);

export default PostModel;
 

