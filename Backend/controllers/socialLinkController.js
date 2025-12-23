import SocialLink from '../models/SocialLink.js';

// Get All Social Links
export const getSocialLinks = async (req, res) => {
  try {
    const socialLinks = await SocialLink.find();
    res.json(socialLinks);
  } catch (error) {
    console.error('Error fetching social links:', error);
    res.status(500).json({ message: 'Failed to fetch social links', error });
  }
};

// Add a New Social Link
export const addSocialLink = async (req, res) => {
  try {
    const socialLink = await SocialLink.create(req.body);
    res.status(201).json(socialLink);
  } catch (error) {
    console.error('Error adding social link:', error);
    res.status(500).json({ message: 'Failed to add social link', error });
  }
};

// Delete a Social Link
export const deleteSocialLink = async (req, res) => {
  try {
    const socialLink = await SocialLink.findByIdAndDelete(req.params.id);
    if (!socialLink) {
      return res.status(404).json({ message: 'Social link not found' });
    }
    res.json({ message: 'Social link deleted successfully' });
  } catch (error) {
    console.error('Error deleting social link:', error);
    res.status(500).json({ message: 'Failed to delete social link', error });
  }
};