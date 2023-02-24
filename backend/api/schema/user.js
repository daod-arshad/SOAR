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

export const findUser = async (username) => {
    try {
      const user = await user.findOne({ username });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Could not find user");
    }
};

//export const User = mongoose.model("user", userSchema);
export default mongoose.model("user", userSchema);
// {User, findUser};