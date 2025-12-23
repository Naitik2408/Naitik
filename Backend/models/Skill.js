import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  proficiency: { type: Number, required: true, min: 0, max: 100 },
});

export default mongoose.model('Skill', skillSchema);