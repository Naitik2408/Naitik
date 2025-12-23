import React from "react";
import { ArrowRight, Code, Globe, Server, Sparkles, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [siteTitle, setSiteTitle] = useState("Naitik Kumar | Full Stack Developer");
  const [description, setDescription] = useState(
    "Developing and building user-centric solutions for creative problem-solving and innovative applications."
  );

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/settings`);
        if (!response.ok) {
          throw new Error("Failed to fetch hero data");
        }
        const data = await response.json();
        setSiteTitle(data.siteTitle || "Naitik Kumar | Full Stack Developer");
        setDescription(data.metaDescription || "Developing and building user-centric solutions for creative problem-solving and innovative applications.");
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchHeroData();
  }, []);

  useEffect(() => {
    console.log("Current site title:", siteTitle);
  }, [siteTitle]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  // Function to properly render the title with decorative underlines at beginning and end
  const renderTitle = () => {
    // Debug what we're showing
    console.log("Rendering title:", siteTitle);

    return (
      <div className="relative inline-block">
        {/* First gradient underline at the beginning */}
        <motion.span
          className="absolute bottom-0 left-0 h-3 bg-gradient-to-r from-cyan-400 to-indigo-400 opacity-50 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "20%" }}
          transition={{ duration: 1, delay: 1.2 }}
        />

        {/* Title text rendered directly with proper contrast */}
        <span className="relative z-10 px-1 text-white font-extrabold">
          {siteTitle}
        </span>

        {/* Last gradient underline at the end */}
        <motion.span
          className="absolute bottom-0 right-0 h-3 bg-gradient-to-l from-cyan-400 to-indigo-400 opacity-50 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "20%" }}
          transition={{ duration: 1, delay: 1.5 }}
        />
      </div>
    );
  };

  return (
    <section id="home" className="homepage-section py-10 md:py-24 overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Content Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Hero Content */}
          <div className="space-y-10">
            <motion.div variants={itemVariants}>
              <div className="flex items-center space-x-2 mb-6">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-400/20 text-indigo-200 font-medium text-sm border border-indigo-400/30">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  Full Stack Developer
                </span>
                <span className="h-1 w-1 rounded-full bg-indigo-300"></span>
                <span className="text-indigo-200 text-sm font-light">Portfolio</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight"
              variants={itemVariants}
              style={{ fontFamily: "'Clash Display', 'Montserrat', sans-serif" }}
            >
              {renderTitle()}
            </motion.h1>

            <motion.p
              className="text-xl text-slate-300 max-w-2xl leading-relaxed"
              variants={itemVariants}
              style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
            >
              {description}
            </motion.p>

            {/* Skills Tags */}
            <motion.div
              className="flex flex-wrap gap-3 pt-2"
              variants={itemVariants}
            >
              {[
                { name: "React", color: "bg-cyan-400/20 text-cyan-200 border-cyan-400/30" },
                { name: "Node.js", color: "bg-green-400/20 text-green-200 border-green-400/30" },
                { name: "TypeScript", color: "bg-blue-400/20 text-blue-200 border-blue-400/30" }
              ].map((skill) => (
                <span
                  key={skill.name}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border ${skill.color} backdrop-blur-sm`}
                >
                  {skill.name}
                </span>
              ))}
            </motion.div>

            {/* Hero CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-5 pt-6"
              variants={itemVariants}
            >
              <a
                href="#projects"
                className="inline-flex items-center px-8 py-4 border-0 text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-1"
              >
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 border border-indigo-400/30 text-base font-medium rounded-xl text-white bg-indigo-900/30 hover:bg-indigo-900/50 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Contact Me <Zap className="ml-2 h-4 w-4" />
              </a>
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div
            className="relative z-10"
            variants={imageVariants}
          >
            <div className="relative">
              {/* Main Image with Glassmorphism Frame */}
              <motion.div
                className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-md relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 p-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-400 opacity-80 animate-border-pulse"></div>

                <div className="absolute inset-0 m-0.5 rounded-xl overflow-hidden">
                  {/* Updated professional developer image - replace this with your own later */}
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Professional Developer Portrait"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target;
                      target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";
                    }}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                </div>
              </motion.div>

              {/* Floating Elements - Redesigned with Glassmorphism */}
              <motion.div
                className="absolute -top-6 -left-6 backdrop-blur-md bg-white/10 p-4 rounded-xl shadow-lg border border-white/20 flex items-center space-x-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">Frontend</p>
                  <p className="text-xs text-cyan-200">React, Next.js</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -right-6 backdrop-blur-md bg-white/10 p-4 rounded-xl shadow-lg border border-white/20 flex items-center space-x-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                  <Server className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">Backend</p>
                  <p className="text-xs text-indigo-200">Node.js, Express</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-10 transform -translate-y-1/2 backdrop-blur-md bg-white/10 p-4 rounded-xl shadow-lg border border-white/20 flex items-center space-x-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="p-2 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-lg">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-white">Full Stack</p>
                  <p className="text-xs text-fuchsia-200">MongoDB, AWS</p>
                </div>
              </motion.div>

              {/* Animated code snippet */}
              <motion.div
                className="absolute -bottom-12 left-10 w-48 rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <div className="bg-slate-800 p-2 text-xs font-mono text-cyan-300 border border-slate-700">
                  <div className="flex items-center space-x-1 mb-1">
                    <div className="h-2 w-2 rounded-full bg-red-400"></div>
                    <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-indigo-300">const <span className="text-cyan-300">developer</span> = {`{`}</div>
                  <div className="pl-4 text-slate-400">name: <span className="text-green-300">'Naitik Kumar'</span>,</div>
                  <div className="pl-4 text-slate-400">role: <span className="text-amber-300">'Full Stack'</span></div>
                  <div className="text-indigo-300">{`}`};</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;