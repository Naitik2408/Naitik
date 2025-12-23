import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Target, 
  AlertCircle, 
  Lightbulb, 
  TrendingUp,
  Code,
  Check,
  Star,
  Share2,
  Bookmark
} from "lucide-react";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch project details
    const fetchProject = async () => {
      try {
        setLoading(true);
        
        // Fetch from backend API
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio`);
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        
        const data = await response.json();
        console.log("=== API Response ===");
        console.log("Full data:", data);
        console.log("Projects array:", data.projects);
        
        const foundProject = data.projects?.find(p => p._id === id);
        console.log("=== Project Details ===");
        console.log("Looking for ID:", id);
        console.log("Found project:", foundProject);
        
        if (foundProject) {
          console.log("=== Engineering Depth Check ===");
          console.log("Problem:", foundProject.problem);
          console.log("Challenges:", foundProject.challenges);
          console.log("Decisions:", foundProject.decisions);
          console.log("Impact:", foundProject.impact);
        }
        
        setProject(foundProject || null);
      } catch (error) {
        console.error("Error fetching project:", error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-300"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      
      {/* Hero Section - Similar to Udemy */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-slate-300 mb-6">{project.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-sm rounded-full bg-white/10 text-slate-200 border border-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    View Live Demo
                  </a>
                )}
                {project.codeLink && (
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 font-medium border border-white/20 transition-colors"
                  >
                    <Github className="h-5 w-5 mr-2" />
                    View Source Code
                  </a>
                )}
              </div>
            </div>

            {/* Right Sidebar - Project Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full aspect-video object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/600/400/4f46e5/FFFFFF?text=Project";
                    }}
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <button className="inline-flex items-center text-sm text-indigo-300 hover:text-indigo-200">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </button>
                      <button className="inline-flex items-center text-sm text-indigo-300 hover:text-indigo-200">
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save
                      </button>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 text-yellow-400 mr-2" />
                        <span className="text-slate-300">Featured Project</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Code className="h-4 w-4 text-cyan-400 mr-2" />
                        <span className="text-slate-300">{project.technologies.length} Technologies</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Problem Section */}
            {project.problem && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 md:p-8 border border-white/20"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">The Problem</h2>
                    <p className="text-slate-400">Why this project was built</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed">{project.problem}</p>
              </motion.section>
            )}

            {/* Challenges Section */}
            {project.challenges && project.challenges.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 md:p-8 border border-white/20"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Technical Challenges</h2>
                    <p className="text-slate-400">Complex problems that needed solving</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 p-1 bg-purple-500/20 rounded">
                        <AlertCircle className="h-4 w-4 text-purple-400" />
                      </div>
                      <p className="text-slate-300 flex-1">{challenge}</p>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Solutions/Decisions Section */}
            {project.decisions && project.decisions.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 md:p-8 border border-white/20"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                    <Lightbulb className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Key Technical Decisions</h2>
                    <p className="text-slate-400">How I approached and solved these challenges</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {project.decisions.map((decision, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1 p-1 bg-cyan-500/20 rounded">
                        <Lightbulb className="h-4 w-4 text-cyan-400" />
                      </div>
                      <p className="text-slate-300 flex-1">{decision}</p>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Impact Section */}
            {project.impact && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-xl p-6 md:p-8 border border-green-500/30"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Results & Impact</h2>
                    <p className="text-slate-400">Measurable outcomes and success metrics</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed text-lg">{project.impact}</p>
              </motion.section>
            )}

            {/* What I Learned */}
            {project.learnings && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 md:p-8 border border-white/20"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Key Learnings</h2>
                <ul className="space-y-3">
                  {project.learnings.map((learning, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-slate-300">{learning}</p>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Features Section */}
              {project.features && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20"
                >
                  <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Technologies Deep Dive */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-sm rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* CTA Box */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-xl rounded-xl p-6 border border-indigo-500/30"
              >
                <h3 className="text-lg font-bold text-white mb-3">Interested in Similar Work?</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Let's discuss how I can help bring your project to life with the same level of attention to detail.
                </p>
                <button
                  onClick={() => navigate("/#contact")}
                  className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors"
                >
                  Get in Touch
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
