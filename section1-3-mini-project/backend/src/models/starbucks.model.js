import mongoose from 'mongoose';

const StarbucksSchema = mongoose.Schema({
  name: String,
  img: String,
});

export default mongoose('Starbucks', StarbucksSchema);
