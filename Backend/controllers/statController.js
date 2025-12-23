import Stat from '../models/Stat.js';

// Get Stats
export const getStats = async (req, res) => {
  try {
    const stats = await Stat.find();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Failed to fetch stats', error });
  }
};

// Update Stats
export const updateStats = async (req, res) => {
  try {
    const { stats } = req.body;

    const updatedStats = await Stat.findOneAndUpdate(
      {},
      { stats },
      { new: true, upsert: true }
    );

    res.json(updatedStats);
  } catch (error) {
    console.error('Error updating stats:', error);
    res.status(500).json({ message: 'Failed to update stats', error });
  }
};