import React from "react";
import { Code, Brush, Globe, Terminal, Award } from "lucide-react";
import { motion } from "framer-motion";

const AboutSection = () => {
  const services = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces with modern frameworks and libraries.",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: Terminal,
      title: "Backend Development",
      description: "Building robust server-side applications and APIs to power your digital solutions.",
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      icon: Globe,
      title: "Full Stack Solutions",
      description: "End-to-end development of web applications from concept to deployment.",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: Brush,
      title: "UI/UX Design",
      description: "Designing intuitive and engaging user experiences with a focus on usability.",
      gradient: "from-fuchsia-500 to-pink-600",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section id="about" className="homepage-section py-24 md:py-32 overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-400/20 text-indigo-200 font-medium text-sm border border-indigo-400/30">
              <Award className="h-3.5 w-3.5 mr-1.5 text-yellow-300" />
              About Me
            </span>
            <span className="h-1 w-1 rounded-full bg-indigo-300"></span>
            <span className="text-indigo-200 text-sm font-light">My Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-white-cyan-indigo" style={{ fontFamily: "'Clash Display', 'Montserrat', sans-serif" }}>
            My Journey & Expertise
          </h2>
          <div className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
            I'm a passionate developer focused on creating elegant solutions to complex problems.
            With expertise in both frontend and backend technologies, I build comprehensive
            digital experiences that help businesses grow.
          </div>
        </motion.div>

        {/* About Content with Image */}
        <div className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full bg-indigo-400/20 text-indigo-200 font-medium text-sm border border-indigo-400/30">
              My Story
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gradient-white-cyan-indigo" style={{ fontFamily: "'Clash Display', 'Montserrat', sans-serif" }}>
              Turning Ideas into Digital Reality
            </h3>
            <div className="space-y-4 text-slate-300" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
              <p>
                With a background in computer science and a passion for creating intuitive digital experiences, 
                I've spent the last several years honing my skills across various technologies and domains.
              </p>
              <p>
                My approach combines technical expertise with creative problem-solving to deliver solutions
                that not only meet but exceed client expectations. I believe in clean code, responsive design,
                and user-centered development practices.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source
                projects, or sharing knowledge with the developer community.
              </p>
            </div>
            
            <motion.div 
              className="flex flex-wrap gap-3 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[
                { name: "Problem Solver", color: "bg-cyan-400/20 text-cyan-200 border-cyan-400/30" },
                { name: "Quick Learner", color: "bg-indigo-400/20 text-indigo-200 border-indigo-400/30" },
                { name: "Team Player", color: "bg-blue-400/20 text-blue-200 border-blue-400/30" },
                { name: "Detail Oriented", color: "bg-purple-400/20 text-purple-200 border-purple-400/30" }
              ].map((trait) => (
                <span 
                  key={trait.name} 
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border ${trait.color} backdrop-blur-sm`}
                >
                  {trait.name}
                </span>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Main Image with Glassmorphism Frame */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-md relative">
                {/* Animated gradient border */}
                <div className="absolute inset-0 p-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-400 opacity-80 animate-border-pulse"></div>
                
                <div className="absolute inset-0 m-0.5 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Developer at work"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                </div>
              </div>
              
              {/* Floating code badge */}
              <motion.div 
                className="absolute -bottom-6 -right-6 backdrop-blur-md bg-white/10 p-3 rounded-xl shadow-lg border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                  <Code className="h-6 w-6 text-white" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Services */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 mb-4 rounded-full bg-indigo-400/20 text-indigo-200 font-medium text-sm border border-indigo-400/30">
              <Globe className="h-3.5 w-3.5 mr-1.5 text-cyan-300" />
              <span className="text-sm font-medium text-indigo-200">What I Offer</span>
            </div>
            <h3 className="text-3xl font-bold text-gradient-white-cyan-indigo" style={{ fontFamily: "'Clash Display', 'Montserrat', sans-serif" }}>
              Services & Solutions
            </h3>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="backdrop-blur-xl bg-white/10 p-6 rounded-xl border border-white/20 transition-all hover:bg-white/15 hover:translate-y-[-8px] hover:shadow-lg hover:shadow-indigo-500/10 group"
              >
                <div className={`inline-flex items-center justify-center p-3 bg-gradient-to-br ${service.gradient} rounded-lg text-white mb-4 transition-transform group-hover:scale-110`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-white">{service.title}</h4>
                <p className="text-slate-300">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;