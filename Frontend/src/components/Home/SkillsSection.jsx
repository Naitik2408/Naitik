import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Server, Github, Database, Layout, Terminal, Globe, Smartphone, Shield, Zap, PenTool } from "lucide-react";

const SkillsSection = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [skillCategories, setSkillCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Icons map for skills
  const iconMap = {
    "React": Layout,
    "JavaScript": Code,
    "TypeScript": Code,
    "HTML5/CSS3": Layout,
    "Next.js": Globe,
    "Node.js": Server,
    "Express": Server,
    "Python": Terminal,
    "MongoDB": Database,
    "PostgreSQL": Database,
    "MySQL": Database,
    "Firebase": Database,
    "GraphQL": Database,
    "REST APIs": Globe,
    "Vue.js": Layout,
    "Angular": Layout,
    "AWS": Server,
    "Docker": Server,
    "Git": Github,
    "GitHub": Github,
    "CI/CD": Github,
    "Redux": Code,
    "Tailwind CSS": PenTool,
    "SASS": PenTool,
    "Bootstrap": PenTool,
    "Material UI": PenTool,
    "Testing": Shield,
    "Jest": Shield,
    "Cypress": Shield,
    "React Native": Smartphone,
    "Flutter": Smartphone,
    "Agile/Scrum": Github,
    "Figma": PenTool,
    "Adobe XD": PenTool,
    "Webpack": Code,
  };

  // Default icon for skills without a specific icon
  const defaultIcon = Code;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch skills data');
        }
        
        const data = await response.json();
        
        // Process skills into categories
        const skills = data.skills || [];
        const categoriesMap = {};
        
        // Group skills by category
        skills.forEach((skill) => {
          if (!categoriesMap[skill.category]) {
            categoriesMap[skill.category] = [];
          }
          // Add icon to each skill
          skill.icon = iconMap[skill.name] || defaultIcon;
          categoriesMap[skill.category].push(skill);
        });
        
        // Format the categories for display
        const formattedCategories = Object.keys(categoriesMap).map(category => {
          // Format category titles to be more readable
          let title = category.charAt(0).toUpperCase() + category.slice(1);
          let icon;
          let gradient = "";
          
          // Assign icons and gradients to categories
          switch(category.toLowerCase()) {
            case "frontend":
              title = "Frontend Development";
              icon = Layout;
              gradient = "from-cyan-500 to-blue-600";
              break;
            case "backend":
              title = "Backend Development";
              icon = Server;
              gradient = "from-indigo-500 to-purple-600";
              break;
            case "devops":
              title = "DevOps";
              icon = Github;
              gradient = "from-blue-500 to-indigo-600";
              break;
            case "tools":
              title = "Tools & Methods";
              icon = Terminal;
              gradient = "from-fuchsia-500 to-pink-600";
              break;
            case "database":
              title = "Database Technologies";
              icon = Database;
              gradient = "from-emerald-500 to-teal-600";
              break;
            case "mobile":
              title = "Mobile Development";
              icon = Smartphone;
              gradient = "from-orange-500 to-amber-600";
              break;
            default:
              icon = Globe;
              gradient = "from-blue-500 to-indigo-600";
          }
          
          return {
            title,
            icon,
            gradient,
            skills: categoriesMap[category].sort((a, b) => b.proficiency - a.proficiency)
          };
        });
        
        setSkillCategories(formattedCategories);
        if (formattedCategories.length > 0) {
          setSelectedCategory(formattedCategories[0].title);
        }
        
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Fallback to static data if no skills are found
  useEffect(() => {
    if (!loading && skillCategories.length === 0) {
      const defaultCategories = [
        {
          title: "Frontend Development",
          icon: Layout,
          gradient: "from-cyan-500 to-blue-600",
          skills: [
            { _id: "1", name: "React", category: "frontend", proficiency: 90, icon: Layout },
            { _id: "2", name: "JavaScript", category: "frontend", proficiency: 85, icon: Code },
            { _id: "3", name: "TypeScript", category: "frontend", proficiency: 80, icon: Code },
            { _id: "4", name: "HTML5/CSS3", category: "frontend", proficiency: 95, icon: Layout },
            { _id: "5", name: "Tailwind CSS", category: "frontend", proficiency: 90, icon: PenTool },
            { _id: "6", name: "Next.js", category: "frontend", proficiency: 85, icon: Globe },
          ],
        },
        {
          title: "Backend Development",
          icon: Server,
          gradient: "from-indigo-500 to-purple-600",
          skills: [
            { _id: "7", name: "Node.js", category: "backend", proficiency: 85, icon: Server },
            { _id: "8", name: "Express", category: "backend", proficiency: 80, icon: Server },
            { _id: "9", name: "Python", category: "backend", proficiency: 75, icon: Terminal },
            { _id: "10", name: "MongoDB", category: "backend", proficiency: 80, icon: Database },
            { _id: "11", name: "PostgreSQL", category: "backend", proficiency: 75, icon: Database },
            { _id: "12", name: "REST APIs", category: "backend", proficiency: 90, icon: Globe },
          ],
        },
      ];
      setSkillCategories(defaultCategories);
      setSelectedCategory(defaultCategories[0].title);
    }
  }, [loading, skillCategories]);

  // Find the currently selected category
  const activeCategory = skillCategories.find(cat => cat.title === selectedCategory);

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

  // Skill level labels
  const getSkillLevelLabel = (proficiency) => {
    if (proficiency >= 90) return "Expert";
    if (proficiency >= 80) return "Advanced";
    if (proficiency >= 70) return "Proficient";
    if (proficiency >= 50) return "Intermediate";
    return "Beginner";
  };

  if (loading) {
    return (
      <section id="skills" className="homepage-section py-24 md:py-32 overflow-hidden text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-[400px] relative z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-300"></div>
            <p className="mt-4 text-indigo-200 animate-pulse">Loading skills...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="skills" className="homepage-section py-24 md:py-32 overflow-hidden text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Technologies & Skills</h2>
            <div className="mt-2 h-1 w-24 bg-indigo-400 mx-auto"></div>
            <div className="mt-8 p-8 bg-slate-800/50 backdrop-blur-xl rounded-xl border border-red-400/20 max-w-lg mx-auto">
              <p className="text-red-300">Failed to load skills: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="homepage-section py-24 md:py-32 overflow-hidden text-white">
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
              <Zap className="h-3.5 w-3.5 mr-1.5 text-yellow-300" />
              Technical Expertise
            </span>
            <span className="h-1 w-1 rounded-full bg-indigo-300"></span>
            <span className="text-indigo-200 text-sm font-light">My Toolbox</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-white-cyan-indigo" style={{ fontFamily: "'Clash Display', 'Montserrat', sans-serif" }}>
            Core Technical Skills
          </h2>
          <div className="mt-6 text-lg text-slate-300 max-w-3xl mx-auto" style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}>
            Expertise in modern web technologies focused on building scalable, performant applications.
          </div>
        </motion.div>

        {/* Category Navigation */}
        <motion.div 
          className="mb-12 overflow-x-auto pb-4 hide-scrollbar"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex space-x-2 justify-center">
            {skillCategories.map((category) => (
              <button
                key={category.title}
                onClick={() => setSelectedCategory(category.title)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                  selectedCategory === category.title
                    ? `bg-gradient-to-r ${category.gradient} text-white shadow-md`
                    : "bg-white/10 text-slate-200 border border-white/10 hover:border-white/30 hover:bg-white/20 hover:shadow-sm backdrop-blur-md"
                }`}
              >
                <category.icon className={`h-4 w-4 ${selectedCategory === category.title ? "text-white" : "text-slate-300"} mr-2`} />
                {category.title}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Active Category Skills */}
        {activeCategory && (
          <motion.div 
            key={selectedCategory}
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl border border-white/20 p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${activeCategory.gradient} text-white mr-4 shadow-lg`}>
                  <activeCategory.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">{activeCategory.title}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {activeCategory.skills.map((skill) => {
                  const SkillIcon = skill.icon;
                  
                  return (
                    <motion.div 
                      key={skill._id}
                      className="group"
                      whileHover={{ y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <div className={`p-1.5 rounded-md bg-gradient-to-br ${activeCategory.gradient} text-white mr-3 opacity-70 group-hover:opacity-100 transition-opacity`}>
                            <SkillIcon className="h-3.5 w-3.5" />
                          </div>
                          <span className="font-medium text-white group-hover:text-cyan-200 transition-colors">{skill.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-400/20 text-indigo-200 border border-indigo-400/30 mr-2">
                            {getSkillLevelLabel(skill.proficiency)}
                          </span>
                          <span className="text-slate-300 text-sm">{skill.proficiency}%</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${activeCategory.gradient} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default SkillsSection;