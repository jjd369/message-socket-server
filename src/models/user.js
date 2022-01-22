import mongoose from "mongoose";

const user = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  image: Buffer
}, {
  versionKey: false
});

export default mongoose.model("User", user)