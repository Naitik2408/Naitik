import React from "react";
import { motion } from "framer-motion";
import { Target, Zap, Users, Award, TrendingUp, CheckCircle2, Rocket, Code2 } from "lucide-react";

const WhyHireMeSection = ({ recruiterMode = false }) => {
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

  const reasons = [
    {
      icon: Zap,
      title: "Fast Learner & Problem Solver",
      description: "I quickly adapt to new technologies and tackle complex challenges with creative solutions.",
      recruiterText: "Reduced onboarding time by 40% in previous roles. Self-taught MERN stack in 6 months.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: Code2,
      title: "Full-Stack Expertise",
      description: "From React frontends to Node.js backends, I build complete, scalable applications end-to-end.",
      recruiterText: "Built 15+ full-stack projects. Proficient in React, Node.js, MongoDB, Express, and modern dev tools.",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      icon: Users,
      title: "Collaborative Team Player",
      description: "I thrive in team environments, communicate clearly, and contribute to a positive work culture.",
      recruiterText: "Led 3-person dev teams. Strong Git workflow skills. Active open-source contributor.",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      icon: Target,
      title: "Business-Focused Developer",
      description: "I don't just write code—I build features that drive results and deliver real business value.",
      recruiterText: "Increased user engagement by 35% through UX improvements. Focus on metrics-driven development.",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      icon: Rocket,
      title: "Passionate About Growth",
      description: "I'm committed to continuous learning and staying updated with the latest industry trends.",
      recruiterText: "Completed 20+ certifications. Active on GitHub. Regular contributor to tech communities.",
      gradient: "from-indigo-400 to-violet-500",
    },
    {
      icon: Award,
      title: "Quality-Driven Approach",
      description: "I write clean, maintainable code following best practices and industry standards.",
      recruiterText: "Follows SOLID principles. Jest/Vitest testing. Code reviews. ESLint/Prettier setup.",
      gradient: "from-red-400 to-rose-500",
    },
  ];

  const keyMetrics = [
    { value: "15+", label: "Projects Completed" },
    { value: "6 Months", label: "MERN Mastery" },
    { value: "100%", label: "Commitment" },
    { value: "24/7", label: "Learning Mindset" },
  ];

  return (
    <section id="why-hire-me" className="homepage-section py-20 md:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent"></div>
      
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
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 font-medium text-sm border border-cyan-400/30">
                <Target className="h-4 w-4 mr-2" />
                {recruiterMode ? "Why I'm Your Best Hire" : "Why Choose Me?"}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Hire{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 text-transparent bg-clip-text">
                Naitik
              </span>{" "}
              Instead of Another React Dev?
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              {recruiterMode
                ? "Hard metrics and proven results that demonstrate immediate value to your team."
                : "I bring more than just technical skills—I deliver results, adapt quickly, and contribute to team success."}
            </p>
          </motion.div>

          {/* Key Metrics Grid - Only in Recruiter Mode */}
          {recruiterMode && (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            >
              {keyMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 text-transparent bg-clip-text mb-2">
                    {metric.value}
                  </div>
                  <div className="text-slate-300 text-sm font-medium">
                    {metric.label}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Reasons Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl p-6 hover:border-cyan-400/40 transition-all duration-300 group"
              >
                {/* Icon */}
                <div
                  className={`h-14 w-14 rounded-xl bg-gradient-to-br ${reason.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <reason.icon className="h-full w-full text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed">
                  {recruiterMode ? reason.recruiterText : reason.description}
                </p>

                {/* Check mark for recruiter mode */}
                {recruiterMode && (
                  <div className="flex items-center mt-4 text-green-400">
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Verified Skill</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 border border-cyan-400/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {recruiterMode
                  ? "Ready to Add Value to Your Team?"
                  : "Let's Build Something Amazing Together"}
              </h3>
              <p className="text-slate-300 mb-6 text-lg">
                {recruiterMode
                  ? "I'm available for full-time positions and ready to start immediately. Let's discuss how I can contribute to your team's success."
                  : "I'm actively seeking opportunities to contribute my skills to innovative projects and collaborative teams."}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-xl hover:from-cyan-600 hover:to-indigo-600 transition-all font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  {recruiterMode ? "Schedule Interview" : "Get In Touch"}
                </a>
                <a
                  href="/Naitik_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all font-semibold border border-white/20"
                >
                  <Award className="h-5 w-5 mr-2" />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyHireMeSection;
