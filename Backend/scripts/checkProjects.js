import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  demoLink: String,
  codeLink: String,
  problem: String,
  challenges: [String],
  decisions: [String],
  impact: String,
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

async function checkProjects() {
  try {
    console.log("Connecting to MongoDB...");
    // Use the same connection string as the main app
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB\n");

    const projects = await Project.find({});
    
    console.log(`Found ${projects.length} projects:\n`);
    console.log("=".repeat(80));

    projects.forEach((project, index) => {
      console.log(`\n${index + 1}. ${project.title}`);
      console.log(`   ID: ${project._id}`);
      console.log(`   Technologies: ${project.technologies.join(", ")}`);
      console.log(`   Has Problem: ${project.problem ? "✓ YES" : "✗ NO"}`);
      console.log(`   Has Challenges: ${project.challenges && project.challenges.length > 0 ? `✓ YES (${project.challenges.length})` : "✗ NO"}`);
      console.log(`   Has Decisions: ${project.decisions && project.decisions.length > 0 ? `✓ YES (${project.decisions.length})` : "✗ NO"}`);
      console.log(`   Has Impact: ${project.impact ? "✓ YES" : "✗ NO"}`);
      
      if (project.problem) {
        console.log(`\n   Problem Preview: ${project.problem.substring(0, 100)}...`);
      }
      if (project.impact) {
        console.log(`   Impact Preview: ${project.impact.substring(0, 100)}...`);
      }
      console.log(`\n   ${"-".repeat(76)}`);
    });

    console.log("\n" + "=".repeat(80));
    
  } catch (error) {
    console.error("\n✗ Error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("\n✓ Database connection closed");
  }
}

checkProjects();
