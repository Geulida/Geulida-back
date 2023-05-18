import mongoose from "mongoose";
const collectionSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
},{ timestamps: true });

export default mongoose.model('Collection', collectionSchema);
