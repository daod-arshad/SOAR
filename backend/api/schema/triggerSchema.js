import mongoose from "mongoose";

const triggerSchema = mongoose.Schema({
    date: String,
    time: String,
    ruleId:Number,
    isEnabled: Boolean,
    nodes: Object,
});

export default mongoose.model("triggerSchema", triggerSchema);
