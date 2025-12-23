import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, FileText, Briefcase, Star, Settings, Home, X, BarChart3, 
  Activity, Layers, ChevronRight, Search, Bell, Menu, User, LogOut, RefreshCw, Cpu, Code, Database, Clock, Server
} from "lucide-react";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { useAppSelector } from "../Redux/hooks";
import { selectAuth } from "../Redux/authSlice";
import UserManagement from "../components/Dashboards/Users";
import Projects from "../components/Dashboards/Projects";
import Skills from "../components/Dashboards/Skills";
import Blogs from "../components/Dashboards/Blogs";
import SettingsManagement from "../components/Dashboards/Settings";

function DashboardPage() {
  const { token } = useAppSelector(selectAuth);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Mock notifications
  const notifications = [
    { id: 1, message: "New user registered", time: "5 minutes ago", read: false },
    { id: 2, message: "Project updated: Portfolio Website", time: "1 hour ago", read: false },
    { id: 3, message: "New comment on blog post", time: "3 hours ago", read: true },
  ];

  // Data states
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // Analytics data (mock data)
  const analyticsData = {
    visitors: {
      current: 1248,
      previous: 1024,
      change: 21.9,
      data: [28, 45, 35, 50, 49, 60, 70, 91, 81]
    },
    pageViews: {
      current: 3240,
      previous: 2860,
      change: 13.3,
      data: [65, 59, 80, 81, 56, 55, 40, 56, 76]
    },
    conversions: {
      current: 24,
      previous: 16,
      change: 50,
      data: [12, 19, 15, 29, 18, 24, 12, 30, 22]
    }
  };

  // Fetch all data when tab changes
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        switch (activeTab) {
          case 'users':
            await fetchUsers();
            break;
          case 'projects':
            await fetchProjects();
            break;
          case 'skills':
            await fetchSkills();
            break;
          case 'blogs':
            await fetchBlogs();
            break;
          case 'overview':
            await Promise.all([
              fetchUsers(),
              fetchProjects(),
              fetchSkills(),
              fetchBlogs()
            ]);
            break;
        }
      } catch (err) {
        setError(err.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, token]);

  // API functions
  const fetchUsers = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUsers(data);
  };

  const fetchProjects = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio`);
    const data = await response.json();
    setProjects(data.projects);
    setSkills(data.skills);
  };

  const fetchSkills = async () => {
    // Skills are fetched in fetchProjects
  };

  const fetchBlogs = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
    const data = await response.json();
    setBlogs(data);
  };

  // Handle data refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        fetchUsers(),
        fetchProjects(),
        fetchSkills(),
        fetchBlogs()
      ]);
      // Show success feedback (would use toast in a real app)
    } catch (err) {
      setError(err.message || 'Error refreshing data');
    } finally {
      setTimeout(() => setRefreshing(false), 800);
    }
  };

  // Navigation items
  const navItems = [
    { id: "overview", label: "Overview", icon: Home },
    { id: "users", label: "Users", icon: Users },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "skills", label: "Skills", icon: Star },
    { id: "blogs", label: "Blog Posts", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Render Dashboard Content
  const renderDashboardContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <span className="ml-3 text-sm font-medium text-indigo-500">Loading data...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4 rounded-md">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <X className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <button 
                onClick={handleRefresh}
                className="mt-2 px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'users':
        return renderUsersTab();
      case 'projects':
        return renderProjectsTab();
      case 'skills':
        return renderSkillsTab();
      case 'blogs':
        return renderBlogsTab();
      case 'settings':
        return renderSettingsTab();
      default:
        return null;
    }
  };

  // Render specific tabs
  const renderOverviewTab = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
        <div className="flex items-center space-x-3">
          <button
            className={`p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 ${refreshing ? 'animate-spin text-indigo-600' : ''}`}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          <select className="text-sm border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
        variants={containerVariants}
      >
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-800">{users.length}</p>
                <span className="ml-2 text-xs font-medium text-green-500 flex items-center">
                  <ChevronRight className="h-3 w-3 rotate-90" />
                  +14%
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Projects</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-800">{projects.length}</p>
                <span className="ml-2 text-xs font-medium text-green-500 flex items-center">
                  <ChevronRight className="h-3 w-3 rotate-90" />
                  +5%
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '40%' }}></div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-50 text-yellow-600">
              <Star className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Skills</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-800">{skills.length}</p>
                <span className="ml-2 text-xs font-medium text-green-500 flex items-center">
                  <ChevronRight className="h-3 w-3 rotate-90" />
                  +8%
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-yellow-500 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          variants={itemVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <FileText className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Blog Posts</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-800">{blogs.length}</p>
                <span className="ml-2 text-xs font-medium text-red-500 flex items-center">
                  <ChevronRight className="h-3 w-3 -rotate-90" />
                  -3%
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: '52%' }}></div>
          </div>
        </motion.div>
      </motion.div>

      {/* Website Analytics */}
      <motion.div
        className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        variants={itemVariants}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Website Analytics</h3>
          <div className="flex">
            <button className="px-3 py-1 text-xs font-medium rounded-l-md bg-indigo-100 text-indigo-700">Daily</button>
            <button className="px-3 py-1 text-xs font-medium bg-white text-gray-600 border-y border-gray-200">Weekly</button>
            <button className="px-3 py-1 text-xs font-medium rounded-r-md bg-white text-gray-600 border border-gray-200">Monthly</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Visitors */}
          <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-indigo-800">Visitors</p>
                <h4 className="text-2xl font-bold text-indigo-900">{analyticsData.visitors.current.toLocaleString()}</h4>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-medium flex items-center ${analyticsData.visitors.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {analyticsData.visitors.change > 0 ? 
                      <ChevronRight className="h-3 w-3 rotate-90" /> :
                      <ChevronRight className="h-3 w-3 -rotate-90" />
                    }
                    {Math.abs(analyticsData.visitors.change)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last period</span>
                </div>
              </div>
              <div className="p-2 rounded-full bg-indigo-100">
                <Activity className="h-5 w-5 text-indigo-500" />
              </div>
            </div>
            <div className="mt-4 h-16 flex items-end space-x-1">
              {analyticsData.visitors.data.map((value, index) => (
                <div 
                  key={index} 
                  className="bg-indigo-200 rounded-t-sm hover:bg-indigo-300 transition-colors"
                  style={{ 
                    height: `${(value / Math.max(...analyticsData.visitors.data)) * 100}%`,
                    width: `${100 / analyticsData.visitors.data.length - 1}%`
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Page Views */}
          <div className="p-4 rounded-lg bg-cyan-50 border border-cyan-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-cyan-800">Page Views</p>
                <h4 className="text-2xl font-bold text-cyan-900">{analyticsData.pageViews.current.toLocaleString()}</h4>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-medium flex items-center ${analyticsData.pageViews.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {analyticsData.pageViews.change > 0 ? 
                      <ChevronRight className="h-3 w-3 rotate-90" /> :
                      <ChevronRight className="h-3 w-3 -rotate-90" />
                    }
                    {Math.abs(analyticsData.pageViews.change)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last period</span>
                </div>
              </div>
              <div className="p-2 rounded-full bg-cyan-100">
                <Layers className="h-5 w-5 text-cyan-500" />
              </div>
            </div>
            <div className="mt-4 h-16 flex items-end space-x-1">
              {analyticsData.pageViews.data.map((value, index) => (
                <div 
                  key={index} 
                  className="bg-cyan-200 rounded-t-sm hover:bg-cyan-300 transition-colors"
                  style={{ 
                    height: `${(value / Math.max(...analyticsData.pageViews.data)) * 100}%`,
                    width: `${100 / analyticsData.pageViews.data.length - 1}%`
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Conversions */}
          <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-purple-800">Conversions</p>
                <h4 className="text-2xl font-bold text-purple-900">{analyticsData.conversions.current.toLocaleString()}</h4>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-medium flex items-center ${analyticsData.conversions.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {analyticsData.conversions.change > 0 ? 
                      <ChevronRight className="h-3 w-3 rotate-90" /> :
                      <ChevronRight className="h-3 w-3 -rotate-90" />
                    }
                    {Math.abs(analyticsData.conversions.change)}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs last period</span>
                </div>
              </div>
              <div className="p-2 rounded-full bg-purple-100">
                <BarChart3 className="h-5 w-5 text-purple-500" />
              </div>
            </div>
            <div className="mt-4 h-16 flex items-end space-x-1">
              {analyticsData.conversions.data.map((value, index) => (
                <div 
                  key={index} 
                  className="bg-purple-200 rounded-t-sm hover:bg-purple-300 transition-colors"
                  style={{ 
                    height: `${(value / Math.max(...analyticsData.conversions.data)) * 100}%`,
                    width: `${100 / analyticsData.conversions.data.length - 1}%`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Users</h3>
            <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.slice(0, 5).map(user => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-3 py-3.5 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-3 py-3.5 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-3 py-3.5 whitespace-nowrap text-sm">
                      {user.isAdmin ? (
                        <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          Admin
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          User
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Recent Blog Posts */}
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Recent Blog Posts</h3>
            <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {blogs.slice(0, 3).map(blog => (
              <div key={blog._id} className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                    {blog.imageUrl && (
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target;
                          target.src = "https://via.placeholder.com/48?text=Blog";
                        }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{blog.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-1">{blog.content}</p>
                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-yellow-500" />
                        <span>{blog.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Technology Overview */}
      <motion.div 
        className="mt-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        variants={itemVariants}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Technology Overview</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Code className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Frontend</p>
              <div className="flex items-baseline space-x-1">
                <p className="text-xl font-bold text-blue-900">React</p>
                <span className="text-xs text-blue-600">+ TypeScript</span>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-purple-50 border border-purple-100 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-purple-100">
              <Server className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-800">Backend</p>
              <div className="flex items-baseline space-x-1">
                <p className="text-xl font-bold text-purple-900">Node.js</p>
                <span className="text-xs text-purple-600">+ Express</span>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-green-50 border border-green-100 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-green-100">
              <Database className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Database</p>
              <div className="flex items-baseline space-x-1">
                <p className="text-xl font-bold text-green-900">MongoDB</p>
                <span className="text-xs text-green-600">+ Mongoose</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderUsersTab = () => <UserManagement />;

  const renderProjectsTab = () => <Projects />;

  const renderSkillsTab = () => <Skills />;

  const renderBlogsTab = () => <Blogs />;

  const renderSettingsTab = () => <SettingsManagement />;

  // Main JSX return
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <div className="flex-grow">
        <div className="max-w-[1600px] mx-auto">
          {/* Dashboard Header */}
          <div className="bg-white border-b border-gray-200 py-4 px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="mr-4 text-gray-500 hover:text-gray-700 lg:hidden"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative hidden md:block">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
                  />
                </div>
                
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                      2
                    </span>
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-semibold text-gray-800">Notifications</h4>
                          <span className="text-xs text-gray-500">Mark all as read</span>
                        </div>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map(notification => (
                          <div 
                            key={notification.id} 
                            className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'border-l-2 border-indigo-500' : ''}`}
                          >
                            <p className="text-sm text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-2 border-t border-gray-100">
                        <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full"
                  >
                    <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                      A
                    </div>
                  </button>
                  
                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-800">Admin User</p>
                        <p className="text-xs text-gray-500">admin@example.com</p>
                      </div>
                      <a href="#profile" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        Your Profile
                      </a>
                      <a href="#settings" className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                        <Settings className="h-4 w-4 mr-2 text-gray-500" />
                        Settings
                      </a>
                      <div className="border-t border-gray-100 my-1"></div>
                      <a href="#logout" className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                        <LogOut className="h-4 w-4 mr-2 text-red-500" />
                        Sign out
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <div className={`md:w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] md:block transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'}`}>
              <div className="p-4">
                <div className="px-3 py-2 rounded-lg bg-indigo-50 text-indigo-800 text-xs font-medium mb-4">
                  Portfolio Admin
                </div>
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                          activeTab === item.id
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className={`mr-3 h-5 w-5 ${activeTab === item.id ? 'text-indigo-500' : 'text-gray-500'}`} />
                        {item.label}
                        {activeTab === item.id && (
                          <span className="ml-auto w-1.5 h-6 rounded-full bg-indigo-500"></span>
                        )}
                      </button>
                    );
                  })}
                </nav>
                
                <div className="mt-8">
                  <h4 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Resources
                  </h4>
                  <div className="mt-2 space-y-1">
                    <a href="#api" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                      <Cpu className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-600" />
                      API Documentation
                    </a>
                    <a href="#help" className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                      <Code className="mr-3 h-5 w-5 text-gray-500 group-hover:text-gray-600" />
                      Developer Guide
                    </a>
                  </div>
                </div>
                
                <div className="mt-8 p-4 rounded-lg bg-indigo-50 border border-indigo-100">
                  <p className="text-sm font-medium text-indigo-800 mb-2">Need help?</p>
                  <p className="text-xs text-indigo-700 mb-3">Check our documentation or contact support.</p>
                  <button className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-md transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6">
              {renderDashboardContent()}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DashboardPage;