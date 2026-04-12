import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

const ContactSection = () => {
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

  const phoneDigits = useMemo(() => phone.replace(/\D/g, ""), [phone]);

  const whatsappLink = useMemo(() => {
    if (!phoneDigits) return "https://wa.me";
    const message = "Hi Naitik, I would like to connect with you.";
    return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
  }, [phoneDigits]);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      subtitle: "Best for project discussions",
      actionText: email,
      link: `mailto:${email}?subject=${encodeURIComponent("Project Inquiry")}`,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      subtitle: "Quickest response",
      actionText: "Chat on WhatsApp",
      link: whatsappLink,
    },
    {
      icon: Phone,
      title: "Call",
      subtitle: "Direct phone conversation",
      actionText: phone,
      link: `tel:${phoneDigits || phone}`,
    },
    {
      icon: MapPin,
      title: "Location",
      subtitle: "Open on Google Maps",
      actionText: address,
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
            Skip forms and connect instantly. Choose your preferred channel and reach out directly.
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
            <div className="lg:col-span-3 p-8 lg:p-12">
              <motion.h3 
                className="text-2xl font-bold mb-8 text-gradient-white-cyan-indigo"
                variants={itemVariants}
              >
                Connect Instantly
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactMethods.map((item, index) => (
                  <motion.div 
                    key={item.title} 
                    className="group"
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={item.link}
                      className="block p-5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-cyan-300/40 transition-all duration-300 h-full"
                      target={item.title === "Location" || item.title === "WhatsApp" ? "_blank" : undefined}
                      rel={item.title === "Location" || item.title === "WhatsApp" ? "noopener noreferrer" : undefined}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-indigo-500/20 border border-indigo-300/30">
                            <item.icon className="h-5 w-5 text-cyan-200" />
                          </div>
                          <h4 className="ml-3 text-lg font-semibold text-white">{item.title}</h4>
                        </div>
                        <ExternalLink className="h-4 w-4 text-cyan-200/80" />
                      </div>
                      <p className="text-sm text-slate-300 mb-2">{item.subtitle}</p>
                      <p className="text-cyan-200 font-medium break-all">{item.actionText}</p>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 bg-gradient-to-br from-indigo-600/50 to-blue-700/60 p-8 lg:p-12 relative">
              <motion.h3 className="text-2xl font-bold mb-6 text-gradient-white-cyan-indigo" variants={itemVariants}>
                Social Links
              </motion.h3>

              <motion.p className="text-blue-100 mb-8" variants={itemVariants}>
                Prefer social media? Reach out via LinkedIn, GitHub, or Twitter.
              </motion.p>

              <motion.div className="space-y-4" variants={containerVariants}>
                {Object.entries(socialLinks).map(([platform, url]) => (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-cyan-200">
                        {getSocialIcon(platform)}
                      </div>
                      <span className="ml-3 text-white font-medium capitalize">{platform}</span>
                    </div>
                    <ExternalLink className="h-4 w-4 text-cyan-200/80" />
                  </motion.a>
                ))}
              </motion.div>

              <div className="absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/20 blur-2xl"></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-slate-300 max-w-3xl mx-auto">
            Open to freelance projects, collaborations, and full-time roles. Choose any channel above and I will get back to you soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;