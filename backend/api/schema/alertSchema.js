import mongoose from "mongoose";

const alertSchema = mongoose.Schema({
  date: String,
  time: String,
  os: String,
  recievedAlert: Object,
  
});

export default mongoose.model("alertSchema", alertSchema);