import React from "react";
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUpRight, Code, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Add explicit type annotations
  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Resume", href: "#resume", isExternal: true },
        { name: "Blog", href: "#blog", isExternal: true },
      ],
    },
  ];

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com", color: "hover:text-gray-100 hover:bg-gray-800" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com", color: "hover:text-blue-100 hover:bg-blue-700" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com", color: "hover:text-sky-100 hover:bg-sky-600" },
    { name: "Email", icon: Mail, href: "mailto:contact@example.com", color: "hover:text-purple-100 hover:bg-purple-700" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-0 right-0 bottom-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-cyan-400 filter blur-[100px]"></div>
        <div className="absolute bottom-1/2 right-1/4 w-72 h-72 rounded-full bg-fuchsia-400 filter blur-[90px]"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px] pointer-events-none"></div>

      {/* Back to top button */}
      <div className="absolute right-8 -top-7 z-10">
        <a
          href="#home"
          className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-1"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div className="col-span-1 md:col-span-4" variants={childVariants}>
            <div className="flex items-center space-x-2 mb-6">
              <motion.div
                className="relative w-10 h-10 flex items-center justify-center"
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 360 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-400 rounded-lg opacity-70 animate-border-pulse"></div>
                <div className="absolute inset-0 m-1 bg-slate-900 rounded-lg"></div>
                <Code className="h-5 w-5 text-cyan-300 relative z-10" />
              </motion.div>
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-indigo-200" style={{ fontFamily: "'Clash Display', 'Montserrat', sans-serif" }}>
                Portfolio<span className="text-blue-400">.</span>
              </div>
            </div>
            <p className="text-slate-300 mb-6" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
              Crafting elegant digital experiences with modern web technologies, focused on performance, usability, and beautiful design.
            </p>
            <div className="flex items-center space-x-1 text-sm">
              <Shield className="h-4 w-4 text-indigo-300 mr-1" />
              <span className="text-indigo-200">Protected by</span>
              <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">SSL Security</span>
            </div>
          </motion.div>

          {/* Footer Links */}
          <div className="col-span-1 md:col-span-5 grid grid-cols-2 gap-8">
            {footerLinks.map((column) => (
              <motion.div key={column.title} className="col-span-1" variants={childVariants}>
                <h3 className="text-lg font-bold text-white mb-5">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-slate-300 hover:text-white flex items-center space-x-1 group transition-colors"
                        target={link.isExternal ? "_blank" : undefined}
                        rel={link.isExternal ? "noopener noreferrer" : undefined}
                      >
                        <span className="border-b border-transparent group-hover:border-indigo-400 transition-all">{link.name}</span>
                        {link.isExternal && (
                          <ArrowUpRight className="h-3 w-3 text-indigo-400 transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <motion.div className="col-span-1 md:col-span-3" variants={childVariants}>
            <h3 className="text-lg font-bold text-white mb-5">Connect</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg backdrop-blur-md bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:-translate-y-1 ${social.color}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                  <span className="text-sm">{social.name}</span>
                </a>
              ))}
            </div>
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4">
              <h4 className="text-sm font-medium text-white mb-2">Newsletter</h4>
              <p className="text-xs text-slate-300 mb-3">Subscribe for updates on new projects and blog posts.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-3 py-2 bg-slate-800 border border-white/10 rounded-l-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-r-lg text-white text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent mb-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <p className="text-slate-400 text-sm">© {currentYear} Portfolio. All rights reserved.</p>
          <div className="flex items-center text-slate-400 text-xs">
            <span>Made with</span>
            <Heart className="h-3 w-3 mx-1 text-red-400" />
            <span>using React & Next.js</span>
          </div>
          <div className="flex space-x-6">
            <a href="#privacy" className="text-slate-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-slate-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;