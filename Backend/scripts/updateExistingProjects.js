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

// Sample engineering depth data templates
const engineeringTemplates = [
  {
    problem: "Traditional approaches weren't scalable for modern user demands, requiring a solution that could handle high traffic while maintaining performance and user experience.",
    challenges: [
      "Optimizing database queries to handle thousands of concurrent users",
      "Implementing efficient caching strategies without data staleness",
      "Ensuring responsive UI across all device sizes and browsers",
      "Managing complex state synchronization in real-time features"
    ],
    decisions: [
      "Chose React for component reusability and virtual DOM performance",
      "Implemented Redux for predictable state management across components",
      "Used MongoDB for flexible schema and horizontal scalability",
      "Applied lazy loading and code splitting to improve initial load time"
    ],
    impact: "Achieved 40% faster load times, 99.9% uptime, and positive user feedback with 4.5+ star ratings. Successfully scaled to support 10,000+ active users."
  },
  {
    problem: "Users needed a seamless way to accomplish tasks without switching between multiple tools, but existing solutions were either too complex or lacked essential features.",
    challenges: [
      "Creating an intuitive interface for both novice and power users",
      "Handling file uploads and processing without blocking the UI",
      "Implementing secure authentication with JWT tokens",
      "Ensuring data consistency across multiple database collections"
    ],
    decisions: [
      "Adopted Node.js and Express for fast, non-blocking I/O operations",
      "Integrated Redis for session management and temporary data caching",
      "Used AWS S3 for reliable and cost-effective file storage",
      "Implemented middleware-based authentication for route protection"
    ],
    impact: "Reduced task completion time by 60%, increased user engagement by 45%, and maintained sub-200ms average API response times under load."
  },
  {
    problem: "Existing platforms lacked real-time collaboration features and had poor mobile experiences, making it difficult for teams to work together effectively on the go.",
    challenges: [
      "Building responsive design that works seamlessly on mobile and desktop",
      "Implementing WebSocket connections for real-time updates",
      "Optimizing bundle size to ensure fast load times on slow networks",
      "Managing complex user permissions and role-based access control"
    ],
    decisions: [
      "Used Tailwind CSS for rapid, responsive UI development",
      "Integrated Socket.io for reliable real-time bidirectional communication",
      "Implemented progressive web app features for offline functionality",
      "Applied JWT-based authentication with refresh token rotation"
    ],
    impact: "Enabled real-time collaboration for 5,000+ users, reduced page load time to under 2 seconds, and achieved 85% mobile user satisfaction."
  },
  {
    problem: "The market needed an accessible solution that developers could quickly deploy and customize without extensive configuration or infrastructure knowledge.",
    challenges: [
      "Balancing feature richness with simplicity and ease of use",
      "Creating comprehensive documentation for different skill levels",
      "Ensuring cross-platform compatibility across various environments",
      "Maintaining backward compatibility while adding new features"
    ],
    decisions: [
      "Built with vanilla JavaScript to minimize dependencies and bundle size",
      "Created detailed documentation with examples and use cases",
      "Used Docker for consistent development and deployment environments",
      "Implemented semantic versioning for clear upgrade paths"
    ],
    impact: "Adopted by 500+ developers, reduced setup time from days to hours, received 200+ GitHub stars, and maintains active community contributions."
  },
  {
    problem: "Organizations required a flexible content management solution that could serve multiple platforms without being tied to a specific frontend framework.",
    challenges: [
      "Designing RESTful APIs that are intuitive and well-documented",
      "Implementing content versioning and rollback capabilities",
      "Handling high-volume API requests with minimal latency",
      "Creating flexible content models without sacrificing type safety"
    ],
    decisions: [
      "Built headless CMS architecture for maximum frontend flexibility",
      "Used GraphQL for efficient data fetching and reduced over-fetching",
      "Implemented comprehensive API documentation with Swagger/OpenAPI",
      "Applied rate limiting and API key management for security"
    ],
    impact: "Serving 100+ client applications, handling 500K+ API requests daily, reduced content deployment time by 70%, and achieved 99.95% API uptime."
  },
  {
    problem: "Users were overwhelmed with raw data and needed meaningful insights presented in an easily digestible visual format for better decision-making.",
    challenges: [
      "Processing and visualizing large datasets without performance degradation",
      "Creating interactive charts that work across different screen sizes",
      "Handling third-party API rate limits and downtime gracefully",
      "Implementing efficient data caching to reduce API costs"
    ],
    decisions: [
      "Used D3.js for powerful, customizable data visualizations",
      "Implemented request batching and intelligent caching strategies",
      "Applied Chart.js for standard charts with good performance",
      "Created fallback mechanisms for API failures and offline modes"
    ],
    impact: "Improved user decision-making speed by 50%, reduced external API costs by 60% through caching, and maintained smooth 60fps chart animations."
  }
];

async function updateExistingProjects() {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    // Use the same connection string as the main app (without forcing database name)
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✓ Connected to MongoDB\n");

    // Fetch all existing projects
    console.log("Fetching existing projects...");
    const projects = await Project.find({});
    
    if (projects.length === 0) {
      console.log("✗ No projects found in database");
      console.log("  Run seedProjects.js first to add sample projects\n");
      return;
    }

    console.log(`✓ Found ${projects.length} projects\n`);

    // Update each project with engineering depth
    console.log("Updating projects with engineering depth...\n");
    let updatedCount = 0;

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      
      // Skip if already has engineering depth
      if (project.problem && project.challenges && project.challenges.length > 0) {
        console.log(`⊘ Skipping "${project.title}" - already has engineering depth`);
        continue;
      }

      // Select a template (cycle through templates)
      const template = engineeringTemplates[i % engineeringTemplates.length];

      // Update the project
      await Project.findByIdAndUpdate(project._id, {
        problem: template.problem,
        challenges: template.challenges,
        decisions: template.decisions,
        impact: template.impact
      });

      updatedCount++;
      console.log(`✓ Updated "${project.title}"`);
      console.log(`  - Problem: ${template.problem.substring(0, 60)}...`);
      console.log(`  - Challenges: ${template.challenges.length} items`);
      console.log(`  - Decisions: ${template.decisions.length} items`);
      console.log(`  - Impact: ${template.impact.substring(0, 60)}...`);
      console.log("");
    }

    console.log("═".repeat(70));
    console.log(`✓ Update completed successfully!`);
    console.log(`  Total projects: ${projects.length}`);
    console.log(`  Updated: ${updatedCount}`);
    console.log(`  Skipped: ${projects.length - updatedCount}`);
    console.log("═".repeat(70));
    
  } catch (error) {
    console.error("\n✗ Error updating projects:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("\n✓ Database connection closed");
  }
}

// Run the update function
updateExistingProjects();
