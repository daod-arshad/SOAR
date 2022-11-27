import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        usertype:String,
        fullname: String,
        email:String,
        designation: String
    }
)
export default mongoose.model("user", userSchema);