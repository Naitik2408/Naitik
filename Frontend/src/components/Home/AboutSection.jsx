import React from "react";
import { Code, Search, Globe, Terminal } from "lucide-react";
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
      icon: Search,
      title: "SEO Service",
      description: "Improving search visibility with technical SEO, content structure, and performance optimization.",
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