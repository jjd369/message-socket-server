import mongoose from "mongoose";

const message = new mongoose.Schema(
  {
    members: [String],
    messages: [
      {
        sender: String,
        message: String,
        uploaded: { type: Date, default: Date.now }
      }
    ],
    total_messages: Number
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model("Message", message);
