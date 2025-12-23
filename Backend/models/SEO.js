import mongoose from 'mongoose';

const seoSchema = new mongoose.Schema({
  siteTitle: { type: String, required: true },
  metaDescription: { type: String, required: true },
});

export default mongoose.model('SEO', seoSchema);