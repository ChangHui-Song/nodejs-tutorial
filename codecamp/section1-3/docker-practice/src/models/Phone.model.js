import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PhoneSchema = new Schema({
  phone: String,
  token: String,
  isAuth: Boolean,
});

export default mongoose.model('Phone', PhoneSchema);
