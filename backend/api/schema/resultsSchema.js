import mongoose from "mongoose";

const results = mongoose.Schema({
  // user:String
  date: String,
  time: String,
  noOfPlaybooks: Number,
  data: String,
  
});

export default mongoose.model("Results", results);