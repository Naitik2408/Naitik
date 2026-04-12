import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, Eye, Code, Layers, Server } from "lucide-react";

const ResumeSection = () => {
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
      fileUrl: "/Frontend_2026.pdf",
    },
    {
      id: "backend",
      title: "Backend Developer",
      subtitle: "Node.js, APIs, Databases",
      icon: Server,
      gradient: "from-emerald-400 to-teal-500",
      fileUrl: "/Backend_2026.pdf",
    },
    {
      id: "fullstack",
      title: "Full Stack Developer",
      subtitle: "MERN Stack Expert",
      icon: Layers,
      gradient: "from-purple-400 to-pink-500",
      fileUrl: "/Fullstack_2026.pdf",
    },
  ];

  const handleDownload = (resume) => {
    const link = document.createElement("a");
    link.href = resume.fileUrl;
    link.download = `${resume.title.replace(/\s+/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (resume) => {
    window.open(resume.fileUrl, "_blank", "noopener,noreferrer");
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
                My Resume
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Interactive{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
                Resume Preview
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Choose a role and quickly preview or download the resume.
            </p>
          </motion.div>

          {/* Resume Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {resumes.map((resume) => (
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
                  </div>

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

        </motion.div>
      </div>

    </section>
  );
};

export default ResumeSection;
