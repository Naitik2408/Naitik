import Settings from "../models/Settings.js";

// Get Settings Data
export const getSettings = async (req, res) => {
    try {
        console.log("Fetching settings...");
        let settings = await Settings.findOne();
        if (!settings) {
            console.log("Settings not found. Creating default settings...");
            // In the getSettings function in settingsController.js
            settings = await Settings.create({
                siteTitle: "My Portfolio",
                metaDescription: "A brief description of your portfolio site.",
                email: "contact@example.com",
                phone: "+1 (123) 456-7890",
                address: "San Francisco, CA",
                linkedin: "https://linkedin.com/in/username",
                github: "https://github.com/username",
                twitter: "https://twitter.com/username",
            });
        }
        res.json(settings);
    } catch (error) {
        console.error("Error fetching settings:", error);
        res.status(500).json({ message: "Failed to fetch settings", error });
    }
};

// Update Settings Data
export const updateSettings = async (req, res) => {
    try {
        console.log("Updating settings with data:", req.body);
        const updatedSettings = await Settings.findOneAndUpdate({}, req.body, {
            new: true,
            upsert: true, // Create if it doesn't exist
        });
        res.json(updatedSettings);
    } catch (error) {
        res.status(500).json({ message: "Failed to update settings", error });
    }
};