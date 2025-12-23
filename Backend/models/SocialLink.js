import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
});

export default mongoose.model('SocialLink', socialLinkSchema);