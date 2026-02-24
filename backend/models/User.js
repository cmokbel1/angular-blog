import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

userSchema.plugin(passportLocalMongoose.default);

const User = mongoose.model("User", userSchema);

export default User;
