import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Project Schema (replicating the model structure)
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

// Sample projects with engineering depth
const sampleProjects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured online shopping platform with payment integration and inventory management.",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=600&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redis", "AWS S3"],
    demoLink: "https://example.com/ecommerce-demo",
    codeLink: "https://github.com/example/ecommerce",
    problem: "Small businesses needed an affordable, easy-to-manage online store solution without complex setup or monthly fees. Most existing platforms were either too expensive or lacked essential features for growing businesses.",
    challenges: [
      "Implementing secure payment processing with PCI compliance",
      "Optimizing database queries for 10,000+ products without performance degradation",
      "Real-time inventory synchronization across multiple warehouses",
      "Handling high traffic during flash sales and promotional events"
    ],
    decisions: [
      "Chose MongoDB for flexible product schema and fast reads - allowed dynamic product attributes",
      "Implemented Redis caching to reduce database load by 70% and improve response times",
      "Used Stripe webhooks for reliable payment confirmations and automatic refund handling",
      "AWS S3 for image storage with CloudFront CDN for global delivery"
    ],
    impact: "Reduced checkout time by 40%, increased conversion rate by 25%, and handles 5,000+ daily transactions. Scaled to support 50+ merchants with 99.9% uptime."
  },
  {
    title: "Task Management App",
    description: "A productivity application for teams to manage tasks, projects and deadlines efficiently.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop",
    technologies: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS", "React Query"],
    demoLink: "https://example.com/taskmanager-demo",
    codeLink: "https://github.com/example/taskmanager",
    problem: "Remote teams struggled with scattered communication and missed deadlines across email, Slack, and other tools. They needed a unified platform to track work progress and collaborate effectively.",
    challenges: [
      "Real-time collaboration with 100+ concurrent users without lag",
      "Offline-first architecture for unreliable internet connections",
      "Complex permission system for team hierarchies and role-based access",
      "Data synchronization conflicts when multiple users edit the same task"
    ],
    decisions: [
      "Firebase Realtime Database for instant updates without polling - reduces server load",
      "Service Workers for offline functionality with background sync",
      "Role-based access control with custom middleware for fine-grained permissions",
      "Optimistic UI updates to improve perceived performance"
    ],
    impact: "Teams reported 35% faster project completion and 50% reduction in missed deadlines. Active user base of 2,000+ teams with average session time of 45 minutes."
  },
  {
    title: "Fitness Tracker Mobile App",
    description: "A cross-platform mobile application for tracking workouts, nutrition and health metrics.",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=600&fit=crop",
    technologies: ["React Native", "GraphQL", "Firebase", "Redux", "Jest"],
    demoLink: "https://example.com/fitness-demo",
    codeLink: "https://github.com/example/fitness-tracker",
    problem: "Fitness enthusiasts needed a unified platform to track workouts, nutrition, and progress without switching between multiple apps. Existing solutions were either too complex or lacked essential features.",
    challenges: [
      "Battery-efficient GPS tracking during long workout sessions",
      "Complex data synchronization across multiple devices",
      "Processing and visualizing large workout datasets (100K+ entries)",
      "Native performance while maintaining cross-platform codebase"
    ],
    decisions: [
      "GraphQL for flexible data fetching and reduced API calls - 60% less data transfer",
      "Background location tracking with optimized intervals to save battery",
      "Local-first data storage with conflict resolution using CRDTs",
      "Native modules for critical performance paths (GPS, sensors)"
    ],
    impact: "10K+ active users, 4.8★ rating on app stores, reduced battery consumption by 60% vs competitors. Featured in App Store's 'Best Health Apps' category."
  },
  {
    title: "Portfolio Website Template",
    description: "A customizable portfolio template for developers and designers with dark/light mode.",
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=600&fit=crop",
    technologies: ["HTML", "CSS", "JavaScript", "GSAP", "Webpack"],
    demoLink: "https://example.com/portfolio-demo",
    codeLink: "https://github.com/example/portfolio-template",
    problem: "Junior developers spend weeks building portfolios instead of focusing on learning and building projects. They needed a professional template that's easy to customize without deep technical knowledge.",
    challenges: [
      "Creating smooth animations without impacting performance on low-end devices",
      "Ensuring accessibility while maintaining modern, animated design",
      "Making it easy to customize without coding knowledge",
      "Cross-browser compatibility including older versions"
    ],
    decisions: [
      "GSAP for high-performance animations at 60fps with hardware acceleration",
      "CSS variables for instant theme customization without rebuilding",
      "Semantic HTML and ARIA labels for screen reader compatibility",
      "Vanilla JavaScript to keep bundle size small (< 50KB)"
    ],
    impact: "Used by 500+ developers, 95 Lighthouse score across all metrics, reduced portfolio setup time from weeks to hours. 50+ forks on GitHub."
  },
  {
    title: "Content Management System",
    description: "A headless CMS solution for managing digital content across multiple platforms.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Docker", "Nginx"],
    demoLink: "https://example.com/cms-demo",
    codeLink: "https://github.com/example/headless-cms",
    problem: "Marketing teams needed a flexible CMS that could serve content to websites, mobile apps, and IoT devices simultaneously. Traditional CMSs were too rigid and tightly coupled to presentation.",
    challenges: [
      "Designing a schema-less content model that's both flexible and type-safe",
      "Implementing fine-grained content versioning and rollback capabilities",
      "Scaling API to handle 1M+ requests per day with low latency",
      "Managing complex user permissions and content approval workflows"
    ],
    decisions: [
      "RESTful API design for broad client compatibility and easy integration",
      "MongoDB for flexible document structure with schema validation",
      "JWT with refresh tokens for secure, stateless authentication",
      "Redis for rate limiting and caching frequently accessed content"
    ],
    impact: "Reduced content deployment time from hours to minutes, serving 50+ client applications. Handles 1.5M+ API requests daily with 99.95% uptime."
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather information visualization with historical data analysis.",
    imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=1200&h=600&fit=crop",
    technologies: ["React", "D3.js", "OpenWeatherAPI", "Tailwind CSS", "Chart.js"],
    demoLink: "https://example.com/weather-demo",
    codeLink: "https://github.com/example/weather-dashboard",
    problem: "Weather apps overwhelm users with data but lack actionable insights for planning outdoor activities. Users needed a clear visualization of weather patterns with predictions.",
    challenges: [
      "Visualizing complex weather patterns intuitively for non-technical users",
      "Handling API rate limits for multiple locations efficiently",
      "Providing accurate 7-day forecasts with confidence intervals",
      "Processing and displaying large historical datasets"
    ],
    decisions: [
      "D3.js for interactive, responsive data visualizations with custom charts",
      "Implemented request caching and batching to reduce API costs by 50%",
      "Added confidence intervals to forecast displays for transparency",
      "Progressive loading for historical data to improve initial load time"
    ],
    impact: "2K+ daily users, 89% report better outdoor activity planning, 50% reduction in API costs through smart caching. Featured on ProductHunt."
  }
];

async function seedProjects() {
  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    const mongoUri = process.env.MONGO_URI.replace("/?retryWrites", "/portfolio?retryWrites");
    await mongoose.connect(mongoUri);
    console.log("✓ Connected to MongoDB");

    // Clear existing projects (optional - comment out to keep existing)
    console.log("\nClearing existing projects...");
    await Project.deleteMany({});
    console.log("✓ Cleared existing projects");

    // Insert sample projects
    console.log("\nInserting sample projects...");
    const insertedProjects = await Project.insertMany(sampleProjects);
    console.log(`✓ Successfully inserted ${insertedProjects.length} projects`);

    // Display inserted projects
    console.log("\nInserted Projects:");
    insertedProjects.forEach((project, index) => {
      console.log(`\n${index + 1}. ${project.title}`);
      console.log(`   ID: ${project._id}`);
      console.log(`   Technologies: ${project.technologies.join(", ")}`);
      console.log(`   Engineering Depth: ${project.problem ? "✓" : "✗"}`);
    });

    console.log("\n✓ Seeding completed successfully!");
    
  } catch (error) {
    console.error("✗ Error seeding projects:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("\n✓ Database connection closed");
  }
}

// Run the seed function
seedProjects();
