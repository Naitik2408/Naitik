import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Eye, X, Code, Layers, CheckCircle2, ExternalLink, Sparkles } from "lucide-react";

const ResumeSection = ({ recruiterMode = false }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const resumes = [
    {
      id: "frontend",
      title: "Frontend Developer",
      subtitle: "React, Vue, UI/UX Focus",
      icon: Code,
      gradient: "from-cyan-400 to-blue-500",
      description: "Specialized resume highlighting frontend frameworks, UI libraries, and modern JavaScript.",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Redux", "Vite"],
      projects: ["E-Commerce Platform", "Portfolio Website", "Task Management App"],
      downloadUrl: "/resumes/Naitik_Frontend_Resume.pdf",
    },
    {
      id: "fullstack",
      title: "Full Stack Developer",
      subtitle: "MERN Stack Expert",
      icon: Layers,
      gradient: "from-purple-400 to-pink-500",
      description: "Complete resume showcasing both frontend and backend expertise with database management.",
      skills: ["React", "Node.js", "MongoDB", "Express", "REST APIs", "JWT Auth"],
      projects: ["Full Stack E-Commerce", "Blog Platform", "Real-time Chat App"],
      downloadUrl: "/resumes/Naitik_FullStack_Resume.pdf",
    },
  ];

  // Skills with project usage mapping
  const skillsProjectMapping = {
    "React": ["E-Commerce Platform", "Portfolio Website", "Task Management App", "Blog Platform"],
    "Node.js": ["Full Stack E-Commerce", "Blog Platform", "REST API Server"],
    "MongoDB": ["Full Stack E-Commerce", "Blog Platform", "User Management System"],
    "TypeScript": ["Enterprise Dashboard", "Type-safe API", "Component Library"],
    "Tailwind CSS": ["Portfolio Website", "E-Commerce Platform", "Admin Dashboard"],
    "Express": ["REST API Server", "Blog Platform", "Authentication Service"],
    "Next.js": ["SEO-optimized Blog", "E-Commerce Platform", "Marketing Website"],
    "Redux": ["State Management App", "E-Commerce Platform", "Dashboard"],
    "JWT Auth": ["User Authentication", "Blog Platform", "Admin Panel"],
    "REST APIs": ["Full Stack E-Commerce", "Blog Platform", "Mobile Backend"],
  };

  const handleDownload = (resume) => {
    // In a real app, this would trigger an actual download
    console.log(`Downloading ${resume.title} resume`);
    // window.open(resume.downloadUrl, '_blank');
  };

  const handlePreview = (resume) => {
    setSelectedResume(resume);
    setShowPreview(true);
  };

  return (
    <section id="resume" className="homepage-section py-20 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 font-medium text-sm border border-purple-400/30">
                <FileText className="h-4 w-4 mr-2" />
                {recruiterMode ? "Download Professional Resume" : "My Resume"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Interactive{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
                Resume Preview
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {recruiterMode
                ? "Choose the resume that best matches your role requirements. Preview before downloading."
                : "View my experience tailored for different roles. Hover over skills to see project usage."}
            </p>
          </motion.div>

          {/* Resume Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          >
            {resumes.map((resume, index) => (
              <motion.div
                key={resume.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-8 hover:border-purple-400/40 transition-all duration-300 group relative overflow-hidden"
              >
                {/* Background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${resume.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  {/* Icon & Title */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${resume.gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <resume.icon className="h-full w-full text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {resume.title}
                      </h3>
                      <p className="text-cyan-300 text-sm font-medium">
                        {resume.subtitle}
                      </p>
                    </div>
                    {recruiterMode && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-semibold border border-green-400/30">
                        ATS Friendly
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {resume.description}
                  </p>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
                      Key Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {resume.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          whileHover={{ scale: 1.1 }}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                            hoveredSkill === skill
                              ? "bg-gradient-to-r from-cyan-400 to-purple-400 text-white shadow-lg"
                              : "bg-white/10 text-slate-300 hover:bg-white/20"
                          }`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Projects using this skill (when hovered) */}
                  <AnimatePresence>
                    {hoveredSkill && skillsProjectMapping[hoveredSkill] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 overflow-hidden"
                      >
                        <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-lg p-4">
                          <h5 className="text-cyan-300 font-semibold mb-2 text-sm flex items-center">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Projects using {hoveredSkill}
                          </h5>
                          <ul className="space-y-1">
                            {skillsProjectMapping[hoveredSkill].slice(0, 3).map((project, idx) => (
                              <li key={idx} className="text-slate-300 text-sm flex items-center">
                                <CheckCircle2 className="h-3 w-3 mr-2 text-green-400" />
                                {project}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handlePreview(resume)}
                      className="flex-1 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all font-semibold border border-white/20 flex items-center justify-center group"
                    >
                      <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                      Preview
                    </button>
                    <button
                      onClick={() => handleDownload(resume)}
                      className={`flex-1 px-6 py-3 bg-gradient-to-r ${resume.gradient} text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center group`}
                    >
                      <Download className="h-4 w-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
                      Download
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Info for Recruiters */}
          {recruiterMode && (
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-2xl p-6 max-w-4xl mx-auto"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">
                    Resume Features for Recruiters
                  </h3>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 mr-2"></span>
                      ATS-optimized format with keyword-rich content
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 mr-2"></span>
                      Quantifiable achievements and project metrics
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 mr-2"></span>
                      Direct links to GitHub repositories and live demos
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 mr-2"></span>
                      Available in PDF and Word formats upon request
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && selectedResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`bg-gradient-to-r ${selectedResume.gradient} p-6 flex items-center justify-between`}>
                <div className="flex items-center space-x-4">
                  <selectedResume.icon className="h-8 w-8 text-white" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {selectedResume.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {selectedResume.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 max-h-[70vh] overflow-y-auto">
                <div className="space-y-6">
                  {/* Preview Info */}
                  <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-lg p-4 mb-6">
                    <p className="text-cyan-300 text-sm flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      This is a preview. Download the actual PDF for complete details including contact information and references.
                    </p>
                  </div>

                  {/* Skills Section */}
                  <div>
                    <h4 className="text-white font-bold text-lg mb-4 flex items-center">
                      <Code className="h-5 w-5 mr-2 text-cyan-400" />
                      Technical Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedResume.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-white/10 text-slate-300 rounded-lg text-sm font-medium border border-white/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Featured Projects */}
                  <div>
                    <h4 className="text-white font-bold text-lg mb-4 flex items-center">
                      <Layers className="h-5 w-5 mr-2 text-purple-400" />
                      Featured Projects
                    </h4>
                    <div className="space-y-3">
                      {selectedResume.projects.map((project, idx) => (
                        <div
                          key={idx}
                          className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                        >
                          <h5 className="text-white font-semibold mb-1">
                            {project}
                          </h5>
                          <p className="text-slate-400 text-sm">
                            Click download to see full project details and achievements
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Download CTA */}
                  <div className="flex gap-4 pt-6">
                    <button
                      onClick={() => handleDownload(selectedResume)}
                      className={`flex-1 px-8 py-4 bg-gradient-to-r ${selectedResume.gradient} text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center text-lg`}
                    >
                      <Download className="h-5 w-5 mr-2" />
                      Download Full Resume
                    </button>
                    <a
                      href="/#projects"
                      onClick={() => setShowPreview(false)}
                      className="px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all font-semibold flex items-center justify-center border border-white/20"
                    >
                      <ExternalLink className="h-5 w-5 mr-2" />
                      View Projects
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ResumeSection;
