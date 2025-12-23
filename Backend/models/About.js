import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  stats: [
    {
      value: String,
      label: String,
    },
  ],
  services: [
    {
      icon: String, // Store icon names or paths
      title: String,
      description: String,
    },
  ],
  content: {
    type: String,
    required: true,
  },
});

export default mongoose.model('About', aboutSchema);