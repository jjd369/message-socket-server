import mongoose from 'mongoose';
import { Schema } from 'mongoose'

const token = new mongoose.Schema({
  token: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  versionKey: false,
})

export default mongoose.model('Token', token)