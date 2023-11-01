import mongoose from 'mongoose';


const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
  title: String,
});

const PostModel = mongoose.model("Posts", PostSchema);

export default PostModel;


