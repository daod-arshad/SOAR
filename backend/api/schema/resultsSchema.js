import mongoose from "mongoose";

const results = mongoose.Schema({
  // user:String
  date: String,
  time: String,
  noOfPlaybooks: String,
  data: String,
  
});

export default mongoose.model("Results", results);