import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String },
  categories: [String],
  tags: [String],
  likes: [{ type: String }], // Array of user identifiers (IP or session ID)
  comments: [commentSchema],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Blog', blogSchema);
