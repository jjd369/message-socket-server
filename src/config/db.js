import mongoose from "mongoose";

export async function connectMongoDb() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
  } catch (e) {
    throw e;
  }
}
