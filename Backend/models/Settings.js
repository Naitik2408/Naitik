import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  siteTitle: { type: String, required: true },
  metaDescription: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true, default: "San Francisco, CA" },
  linkedin: { type: String, required: true },
  github: { type: String, required: true },
  twitter: { type: String, required: true },
});

export default mongoose.model("Settings", settingsSchema);