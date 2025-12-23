import SEO from '../models/SEO.js';

// Get SEO Settings
export const getSEO = async (req, res) => {
  try {
    const seo = await SEO.findOne();
    if (!seo) {
      return res.status(404).json({ message: 'SEO settings not found' });
    }
    res.json(seo);
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    res.status(500).json({ message: 'Failed to fetch SEO settings', error });
  }
};

// Update SEO Settings
export const updateSEO = async (req, res) => {
  try {
    const { siteTitle, metaDescription } = req.body;

    const seo = await SEO.findOneAndUpdate(
      {},
      { siteTitle, metaDescription },
      { new: true, upsert: true }
    );

    res.json(seo);
  } catch (error) {
    console.error('Error updating SEO settings:', error);
    res.status(500).json({ message: 'Failed to update SEO settings', error });
  }
};