import About from '../models/About.js';

// Get About Section Data
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne(); // Assuming there's only one About document
    if (!about) {
      return res.status(404).json({ message: 'About section not found' });
    }
    res.json(about);
  } catch (error) {
    console.error('Error fetching About section:', error);
    res.status(500).json({ message: 'Failed to fetch About section', error });
  }
};

// Update About Section Data
export const updateAbout = async (req, res) => {
  try {
    const { stats, services, content } = req.body;

    // Find the existing About document or create a new one
    const about = await About.findOneAndUpdate(
      {},
      { stats, services, content },
      { new: true, upsert: true }
    );

    res.json(about);
  } catch (error) {
    console.error('Error updating About section:', error);
    res.status(500).json({ message: 'Failed to update About section', error });
  }
};