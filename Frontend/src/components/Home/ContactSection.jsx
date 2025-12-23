import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, ArrowRight, CheckCircle, MessageSquare, User, AtSign, FileText } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("San Francisco, CA");
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    github: "",
    twitter: "",
  });

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
      transition: { duration: 0.5 }
    },
  };

  // Fetch contact and social data from backend
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/settings`);
        if (!response.ok) {
          throw new Error("Failed to fetch contact data");
        }
        const data = await response.json();
        setEmail(data.email || "hello@example.com");
        setPhone(data.phone || "+1 (555) 123-4567");
        setAddress(data.address || "San Francisco, CA");
        setSocialLinks({
          linkedin: data.linkedin || "https://linkedin.com",
          github: data.github || "https://github.com",
          twitter: data.twitter || "https://twitter.com",
        });
      } catch (error) {
        console.error("Error fetching contact data:", error);
        // Set fallback data
        setEmail("hello@example.com");
        setPhone("+1 (555) 123-4567");
        setSocialLinks({
          linkedin: "https://linkedin.com",
          github: "https://github.com",
          twitter: "https://twitter.com",
        });
      }
    };

    fetchContactData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset submission status after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setFormError("Failed to send message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: email,
      link: `mailto:${email}`,
    },
    {
      icon: Phone,
      title: "Phone",
      content: phone,
      link: `tel:${phone.replace(/\s+/g, "")}`,
    },
    {
      icon: MapPin,
      title: "Address",
      content: address,
      link: `https://maps.google.com/?q=${encodeURIComponent(address)}`,
    },
  ];

  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <section id="contact" className="homepage-section py-24 md:py-32 overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-400/20 text-indigo-200 font-medium text-sm border border-indigo-400/30">
              <MessageSquare className="h-3.5 w-3.5 mr-1.5 text-cyan-300" />
              Contact Me
            </span>
            <span className="h-1 w-1 rounded-full bg-indigo-300"></span>
            <span className="text-indigo-200 text-sm font-light">Let's Connect</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-white-cyan-indigo" style={{ fontFamily: "'Clash Display', 'Montserrat', sans-serif" }}>
            Get In Touch
          </h2>
          <div className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
            Have a project in mind or want to collaborate? Feel free to reach out and let's create something amazing together.
          </div>
        </motion.div>

        <motion.div 
          className="backdrop-blur-xl bg-white/10 rounded-2xl overflow-hidden shadow-2xl border border-white/20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Contact Information - Left Side */}
            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600/60 to-blue-700/70 p-8 lg:p-12 relative">
              <motion.h3 
                className="text-2xl font-bold mb-10 text-gradient-white-cyan-indigo"
                variants={itemVariants}
              >
                Contact Information
              </motion.h3>
              
              <div className="space-y-10">
                {contactInfo.map((item, index) => (
                  <motion.div 
                    key={item.title} 
                    className="flex items-start group"
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md group-hover:bg-white/20 transition-all duration-300 shadow-lg">
                        <item.icon className="h-6 w-6 text-cyan-200" />
                      </div>
                    </div>
                    <div className="ml-6">
                      <h4 className="text-lg font-medium text-white mb-1.5">{item.title}</h4>
                      <a
                        href={item.link}
                        className="text-blue-200 hover:text-cyan-300 transition-colors inline-block"
                        target={item.title === "Address" ? "_blank" : undefined}
                        rel={item.title === "Address" ? "noopener noreferrer" : undefined}
                      >
                        {item.content}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Media */}
              <motion.div 
                className="mt-14"
                variants={itemVariants}
              >
                <h4 className="text-lg font-medium mb-6 text-white">Connect With Me</h4>
                <div className="flex space-x-5">
                  {Object.entries(socialLinks).map(([platform, url]) => (
                    <motion.a
                      key={platform}
                      href={url}
                      className="bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Connect on ${platform}`}
                      whileHover={{ y: -5 }}
                      whileTap={{ y: 0 }}
                    >
                      <div className="text-cyan-200">{getSocialIcon(platform)}</div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Decorative elements - smaller and less intense to work with global bg */}
              <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-400/10 blur-xl"></div>
              <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-400/10 blur-xl"></div>
            </div>

            {/* Contact Form - Right Side */}
            <div className="lg:col-span-3 p-8 lg:p-12 relative">
              <motion.h3 
                className="text-2xl font-bold text-white mb-8"
                variants={itemVariants}
              >
                Send Me a Message
              </motion.h3>

              {submitted ? (
                <motion.div 
                  className="bg-indigo-900/30 backdrop-blur-md border border-indigo-400/30 rounded-xl p-10 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-cyan-400 mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-medium text-white mb-4">Message Sent Successfully!</h4>
                  <p className="text-slate-300 mb-8">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <motion.button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
                    whileHover={{ y: -3 }}
                    whileTap={{ y: 0 }}
                  >
                    Send Another Message <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-8"
                  variants={containerVariants}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div className="relative group" variants={itemVariants}>
                      <div className="flex items-center mb-2">
                        <User className="h-4 w-4 text-indigo-300 mr-2" />
                        <label className="text-sm font-medium text-slate-300">Your Name</label>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent text-white placeholder-slate-400 backdrop-blur-md transition-all"
                          placeholder="John Doe"
                          required
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </div>
                    </motion.div>
                  
                    <motion.div className="relative group" variants={itemVariants}>
                      <div className="flex items-center mb-2">
                        <AtSign className="h-4 w-4 text-indigo-300 mr-2" />
                        <label className="text-sm font-medium text-slate-300">Your Email</label>
                      </div>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent text-white placeholder-slate-400 backdrop-blur-md transition-all"
                          placeholder="john@example.com"
                          required
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.div className="relative group" variants={itemVariants}>
                    <div className="flex items-center mb-2">
                      <FileText className="h-4 w-4 text-indigo-300 mr-2" />
                      <label className="text-sm font-medium text-slate-300">Subject</label>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent text-white placeholder-slate-400 backdrop-blur-md transition-all"
                        placeholder="What would you like to discuss?"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  </motion.div>
                  
                  <motion.div className="relative group" variants={itemVariants}>
                    <div className="flex items-center mb-2">
                      <MessageSquare className="h-4 w-4 text-indigo-300 mr-2" />
                      <label className="text-sm font-medium text-slate-300">Your Message</label>
                    </div>
                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent text-white placeholder-slate-400 backdrop-blur-md transition-all"
                        rows={6}
                        placeholder="Tell me about your project, questions, or anything you'd like to share..."
                        required
                      ></textarea>
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  </motion.div>

                  {formError && (
                    <motion.div 
                      className="p-4 bg-red-900/30 border border-red-400/30 rounded-xl text-red-200"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {formError}
                    </motion.div>
                  )}
                  
                  <motion.div 
                    className="flex justify-end"
                    variants={itemVariants}
                  >
                    <motion.button
                      type="submit"
                      className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl hover:from-indigo-600 hover:to-cyan-600 transition-all duration-300 flex items-center font-medium shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                      disabled={submitting}
                      whileHover={{ y: -3 }}
                      whileTap={{ y: 0 }}
                    >
                      {submitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}

              {/* Decorative element - reduced opacity */}
              <div className="absolute top-1/2 right-0 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/5 to-blue-400/5 blur-xl"></div>
            </div>
          </div>
        </motion.div>

        {/* Map or Additional Contact Info */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-slate-300 max-w-3xl mx-auto">
            Looking forward to hearing from you and exploring how we can collaborate on your next project. 
            Whether you have a specific idea in mind or just want to discuss possibilities, I'm here to help bring your vision to life.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;