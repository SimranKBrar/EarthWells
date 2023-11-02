import mongoose from 'mongoose';


const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const ReplySchema = new Schema({
  title: String,
});

const ReplyModel = mongoose.model("Reply", ReplySchema);

export default ReplyModel;