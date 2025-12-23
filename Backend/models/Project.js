import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  technologies: [{ type: String }],
  demoLink: { type: String },
  codeLink: { type: String },
  // Engineering depth fields
  problem: { type: String }, // Why you built it / What problem it solves
  challenges: [{ type: String }], // Technical challenges faced
  decisions: [{ type: String }], // Key technical decisions and reasoning
  impact: { type: String }, // Results, metrics, or outcomes
});

export default mongoose.model('Project', projectSchema);