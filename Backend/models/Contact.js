import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  socialLinks: [
    {
      platform: String,
      url: String,
    },
  ],
});

export default mongoose.model('Contact', contactSchema);