import React, { useState, useRef, useEffect } from "react";
import { Menu, X, LogOut, User, LayoutDashboard, ChevronDown, Github, Linkedin, Twitter, Sparkles, Briefcase } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../Redux/hooks";
import { selectAuth, logout, selectIsAdmin } from "../../Redux/authSlice";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ recruiterMode, setRecruiterMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(selectAuth);
  const isAdmin = useAppSelector(selectIsAdmin);
  
  // Only show recruiter toggle on home page
  const isHomePage = location.pathname === "/";

  // Detect scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "WHM", href: "/#why-hire-me" },
    { name: "Resume", href: "/#resume" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
  ];

  // Add Dashboard link for admin users in the main navigation
  if (isAuthenticated && isAdmin) {
    navItems.push({ name: "Dashboard", href: "/dashboard" });
  }

  // Helper to determine if link is external or an anchor
  const isHashLink = (href) => href.startsWith('#');
  const isAnchorInHome = (href) => href.startsWith('/#');
  
  // Render appropriate link type based on href
  const renderNavLink = (item, className, onClick) => {    
    if (isHashLink(item.href)) {
      return (
        <a
          key={item.name}
          href={item.href}
          className={className}
          onClick={onClick}
        >
          {item.name}
        </a>
      );
    } else if (isAnchorInHome(item.href)) {
      // For home page anchors like "/#about"
      return (
        <a
          key={item.name}
          href={item.href}
          className={className}
          onClick={onClick}
        >
          {item.name}
        </a>
      );
    } else {
      return (
        <Link
          key={item.name}
          to={item.href}
          className={className}
          onClick={onClick}
        >
          {item.name}
        </Link>
      );
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setDropdownOpen(false);
  };

  // Animation variants
  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } }
  };

  const dropdownVariants = {
    closed: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
    open: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } }
  };

  const navLinkVariants = {
    hover: { y: -2, transition: { duration: 0.1 } },
    tap: { y: 1, transition: { duration: 0.1 } }
  };

  return (
    <>
      {/* Only add height, no background */}
      <div style={{ height: "6rem" }}></div>
      
      <header 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      >
        {/* No more local background - the global homepage background handles this */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Floating header container */}
          <motion.div 
            className="mt-6 rounded-full transition-all duration-500 flex items-center justify-between text-white"
            style={{
              padding: scrolled ? "0.75rem 1.25rem" : "1.25rem 1.25rem",
              backgroundColor: scrolled ? "rgba(15, 23, 42, 0.8)" : "rgba(15, 23, 42, 0.5)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: scrolled ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "none"
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                className="flex items-center space-x-2"
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 backdrop-blur-md">
                  <Sparkles className="h-5 w-5 text-cyan-200" />
                </div>
                <span className="text-gradient-white-cyan-indigo font-bold text-xl font-clash">
                  Portfolio
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center">
              <div className="rounded-full py-1.5 px-1.5 bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center space-x-1">
                  {navItems.map((item) => (
                    <motion.div key={item.name} whileHover="hover" whileTap="tap" variants={navLinkVariants}>
                      {renderNavLink(
                        item,
                        "px-4 py-2 text-sm font-medium transition-colors rounded-full text-indigo-100 hover:text-white hover:bg-white/10"
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </nav>

            {/* Auth Buttons or User Menu */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Recruiter Mode Toggle - Only on home page */}
              {isHomePage && setRecruiterMode && typeof setRecruiterMode === 'function' && (
                <motion.button
                  onClick={() => setRecruiterMode(!recruiterMode)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                    recruiterMode
                      ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/30"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  } backdrop-blur-md`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={recruiterMode ? "Switch to Normal View" : "Switch to Recruiter View"}
                >
                  <Briefcase className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {recruiterMode ? "Recruiter" : "Normal"}
                  </span>
                </motion.button>
              )}
              
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <motion.button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-1 px-4 py-2 rounded-full transition-all hover:-translate-y-0.5 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1.5" />
                      <span className="text-sm font-medium">{user?.name?.split(' ')[0] || 'Account'}</span>
                    </span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </motion.button>
                  
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div 
                        className="absolute right-0 w-56 mt-2 origin-top-right rounded-xl bg-white shadow-lg border border-white/20 overflow-hidden backdrop-blur-xl z-20"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={dropdownVariants}
                      >
                        <div className="p-3 border-b border-indigo-50 bg-gradient-to-r from-indigo-50 to-cyan-50">
                          <p className="text-sm font-medium text-indigo-800">
                            {user?.name || 'Welcome back!'}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {user?.email || 'User'}
                          </p>
                        </div>
                        
                        <div className="py-2">
                          {isAdmin && (
                            <Link 
                              to="/dashboard" 
                              className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                              onClick={() => setDropdownOpen(false)}
                            >
                              <LayoutDashboard className="h-4 w-4 mr-3 text-indigo-500" />
                              Dashboard
                            </Link>
                          )}
                          <button 
                            onClick={handleLogout}
                            className="flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                          >
                            <LogOut className="h-4 w-4 mr-3 text-red-500" />
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <Link
                      to="/login"
                      className="px-4 py-2 text-sm font-medium rounded-full transition-all text-indigo-100 hover:text-white border border-white/10 hover:bg-white/10"
                    >
                      Log in
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <Link
                      to="/signup"
                      className="px-4 py-2 text-sm font-medium rounded-full transition-all bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
                    >
                      Sign up
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? (
                  <X className="block h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="block h-5 w-5" aria-hidden="true" />
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden backdrop-blur-lg"
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                overflow: "hidden"
              }}
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <div className="px-4 pt-4 pb-6 space-y-1.5 max-w-7xl mx-auto">
                {navItems.map((item) => (
                  <motion.div 
                    key={item.name}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.1 }}
                  >
                    {renderNavLink(
                      item,
                      "block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors text-white hover:bg-white/10",
                      () => setMobileMenuOpen(false)
                    )}
                  </motion.div>
                ))}
                
                {/* Recruiter Mode Toggle for mobile - Only on home page */}
                {isHomePage && setRecruiterMode && typeof setRecruiterMode === 'function' && (
                  <motion.button
                    onClick={() => setRecruiterMode(!recruiterMode)}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg transition-all ${
                      recruiterMode
                        ? "bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Briefcase className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {recruiterMode ? "Recruiter Mode ON" : "Switch to Recruiter Mode"}
                    </span>
                  </motion.button>
                )}
                
                {/* Auth links for mobile */}
                <div className="border-t border-white/10 pt-3 mt-3">
                  {isAuthenticated ? (
                    <>
                      <div className="p-4 rounded-lg mb-2 bg-white/5">
                        <p className="text-sm font-medium text-white">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-xs mt-0.5 text-indigo-200">
                          {user?.email}
                        </p>
                      </div>
                      
                      {isAdmin && (
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-white hover:bg-white/10"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <LayoutDashboard className="h-5 w-5 mr-3 text-indigo-500" />
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg text-white hover:bg-white/10"
                      >
                        <LogOut className="h-5 w-5 mr-3 text-red-300" />
                        Sign out
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <Link
                        to="/login"
                        className="block px-4 py-2.5 text-sm font-medium text-center rounded-lg transition-colors text-white border border-white/10 hover:bg-white/10"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Log in
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2.5 text-sm font-medium text-center rounded-lg shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all bg-gradient-to-r from-cyan-500 to-indigo-500 text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign up
                      </Link>
                    </div>
                  )}
                </div>
                
                {/* Social links for mobile */}
                <div className="flex justify-center mt-4 pt-3 gap-2 border-t"
                  style={{ 
                    borderColor: isHomePage ? "rgba(255, 255, 255, 0.1)" : "rgba(243, 244, 246, 1)"
                  }}
                >
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full ${
                      isHomePage
                        ? "text-white/70 hover:text-white hover:bg-white/10"
                        : "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
                    } transition-colors`}
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full ${
                      isHomePage
                        ? "text-white/70 hover:text-white hover:bg-white/10"
                        : "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
                    } transition-colors`}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full ${
                      isHomePage
                        ? "text-white/70 hover:text-white hover:bg-white/10"
                        : "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
                    } transition-colors`}
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;