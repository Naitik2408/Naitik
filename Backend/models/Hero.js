import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  subheading: { type: String, required: true },
  techStack: [String],
});

export default mongoose.model('Hero', heroSchema);