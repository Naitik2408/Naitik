import express from "express";
import { getSettings, updateSettings } from "../controllers/settingsController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get Settings Data
router.get("/", getSettings);

// Update Settings Data (Protected)
router.put("/", protect, updateSettings);

export default router;