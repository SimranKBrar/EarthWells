import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
  name: String,
  locations: [String], 
  description: String,
  alternatives: [{ type: Schema.Types.ObjectId, ref: 'Materials' }],
});

const MaterialModel = mongoose.model('Materials', MaterialSchema);

export default MaterialModel;