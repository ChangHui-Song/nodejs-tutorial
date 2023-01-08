import mongoose from 'mongoose';

const TokenSchema = mongoose.Schema({
  token: String,
  phone: String,
  isAuth: Boolean,
});

export default mongoose('Token', TokenSchema);
