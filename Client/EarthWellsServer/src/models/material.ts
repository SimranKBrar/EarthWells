import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
  name: String,
  locations: [String], // Array of locations, assuming each location is a string
  description: String,
});

// Create the 'Materials' model
const MaterialModel = mongoose.model('Materials', MaterialSchema);

export default MaterialModel;