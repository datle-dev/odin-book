import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
});

const model = mongoose.model('User', UserSchema);

export default model;
