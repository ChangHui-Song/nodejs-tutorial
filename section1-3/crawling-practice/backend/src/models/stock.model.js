import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  name: String,
  price: Number,
  date: Date,
});

export const Stock = mongoose.model('Stock', stockSchema);
