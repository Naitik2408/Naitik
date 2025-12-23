import React, { useState, useEffect } from "react";
import {
  Search, Calendar, User, Clock, Tag, ChevronDown, ArrowUp, Bookmark, Filter,
  TrendingUp, ThumbsUp, LayoutGrid, List, X, Sparkles, Zap, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
// Import minimal quill core styles for HTML content rendering
import "quill/dist/quill.core.css";

const BlogPage = () => {
  // State Management
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(["All"]);
  const [displayMode, setDisplayMode] = useState("grid");
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);

  // Scroll handler to show back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to toggle saved state
  const toggleSavePost = (id) => {
    setSavedPosts((prev) =>
      prev.includes(id) ? prev.filter(postId => postId !== id) : [...prev, id]
    );
  };

  // Extract plain text from HTML for excerpts
  const formatExcerpt = (htmlContent, maxLength = 150) => {
    // Create a temporary element to strip HTML tags
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const plainText = tempDiv.textContent || tempDiv.innerText || '';
    
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + '...';
  };

  // Fetch blogs from API on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);

        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }

        const data = await response.json();
        console.log('Fetching blogs...', data);

        // Process the blog data
        const formattedPosts = data.map((blog) => {
          // Extract plain text for excerpt
          const excerpt = formatExcerpt(blog.content, 150);
          
          const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          
          // Calculate word count from plain text, not HTML
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = blog.content;
          const plainText = tempDiv.textContent || tempDiv.innerText || '';
          const wordCount = plainText.split(/\s+/).length;
          const readTime = Math.max(1, Math.ceil(wordCount / 200)) + " min read";

          return {
            ...blog,
            excerpt,
            date: formattedDate,
            readTime,
            category: blog.category || "General",
            tags: blog.tags || ["Web Development"],
          };
        });

        setBlogPosts(formattedPosts);

        // Set featured post (most liked)
        if (formattedPosts.length > 0) {
          const mostLiked = [...formattedPosts].sort((a, b) => b.likes - a.likes)[0];
          setFeaturedPost(mostLiked);
        }

        // Extract unique categories
        const uniqueCategories = new Set(formattedPosts.map((post) => post.category || "General"));
        setCategories(["All", ...Array.from(uniqueCategories)]);

        // Extract unique tags
        const allTags = formattedPosts.flatMap((post) => post.tags || []);
        const uniqueTagsSet = new Set(allTags);
        setUniqueTags([...Array.from(uniqueTagsSet)]);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err.message);

        // Fallback data for when API fails
        const fallbackPosts = generateFallbackData();
        setBlogPosts(fallbackPosts);

        // Set featured post from fallback
        if (fallbackPosts.length > 0) {
          const mostLiked = [...fallbackPosts].sort((a, b) => b.likes - a.likes)[0];
          setFeaturedPost(mostLiked);
        }

        // Extract categories from fallback data
        const fallbackCategories = new Set(fallbackPosts.map(post => post.category || "General"));
        setCategories(["All", ...Array.from(fallbackCategories)]);

        // Extract tags from fallback data
        const fallbackTags = fallbackPosts.flatMap(post => post.tags || []);
        setUniqueTags([...new Set(fallbackTags)]);

        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Generate fallback data when API fails
  const generateFallbackData = () => {
    return [
      {
        _id: "1",
        title: "Getting Started with React Hooks",
        content: "<h2>Introduction to React Hooks</h2><p>React Hooks are a powerful feature introduced in React 16.8 that allow you to use state and other React features without writing a class. In this tutorial, we'll explore the most commonly used hooks and how they can simplify your components...</p>",
        excerpt: "React Hooks are a powerful feature introduced in React 16.8 that allow you to use state and other React features without writing a class...",
        author: "Jane Smith",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        category: "React",
        readTime: "7 min read",
        tags: ["React", "JavaScript", "Hooks", "Frontend"],
        likes: 42,
        comments: []
      },
      {
        _id: "2",
        title: "Building a RESTful API with Node.js and Express",
        content: "<h2>Getting Started with Express</h2><p>Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. In this tutorial, we'll build a complete RESTful API from scratch using Node.js and Express...</p>",
        excerpt: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications...",
        author: "Michael Johnson",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        category: "Backend",
        readTime: "10 min read",
        tags: ["Node.js", "Express", "API", "Backend"],
        likes: 38,
        comments: []
      },
      {
        _id: "3",
        title: "Introduction to TailwindCSS: The Utility-First CSS Framework",
        content: "<h2>What is Tailwind CSS?</h2><p>Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup. In this article, we'll explore how to get started with Tailwind and why it's becoming so popular...</p>",
        excerpt: "Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup...",
        author: "Sarah Williams",
        imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        category: "CSS",
        readTime: "8 min read",
        tags: ["CSS", "TailwindCSS", "Frontend", "Design"],
        likes: 67,
        comments: []
      },
      {
        _id: "4",
        title: "Mastering TypeScript for Modern Web Development",
        content: "<h2>Why Use TypeScript?</h2><p>TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. In this comprehensive guide, we'll dive into TypeScript's type system, interfaces, generics, and more to help you write more robust and maintainable code...</p>",
        excerpt: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. In this comprehensive guide, we'll dive into TypeScript's type system...",
        author: "Daniel Lee",
        imageUrl: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        category: "TypeScript",
        readTime: "12 min read",
        tags: ["TypeScript", "JavaScript", "Frontend", "Web Development"],
        likes: 54,
        comments: []
      },
      {
        _id: "5",
        title: "Introduction to Docker for Developers",
        content: "<h2>Docker Basics</h2><p>Docker is a platform for developing, shipping, and running applications inside containers. In this beginner-friendly guide, we'll explore Docker's basic concepts, commands, and build a simple containerized application...</p>",
        excerpt: "Docker is a platform for developing, shipping, and running applications inside containers. In this beginner-friendly guide...",
        author: "Emma Clark",
        imageUrl: "https://images.unsplash.com/photo-1605745341289-5131c14dfde3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        category: "DevOps",
        readTime: "11 min read",
        tags: ["Docker", "DevOps", "Containers", "Deployment"],
        likes: 79,
        comments: []
      },
      {
        _id: "6",
        title: "The Complete Guide to Modern CSS Grid Layout",
        content: "<h2>Understanding CSS Grid</h2><p>CSS Grid Layout is a two-dimensional layout system designed for the web. It lets you lay out items in rows and columns, and offers more control than previous CSS layout methods. In this guide, we'll explore everything you need to know about CSS Grid...</p>",
        excerpt: "CSS Grid Layout is a two-dimensional layout system designed for the web. It lets you lay out items in rows and columns...",
        author: "Alex Turner",
        imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
        date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        category: "CSS",
        readTime: "9 min read",
        tags: ["CSS", "Grid Layout", "Frontend", "Web Design"],
        likes: 64,
        comments: []
      }
    ];
  };

  // Filter and sort posts based on user selections - updated to handle HTML content
  const processedPosts = React.useMemo(() => {
    // First, filter the posts
    let filtered = blogPosts.filter((post) => {
      // Match search query - strip HTML for search
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = post.content;
      const plainTextContent = tempDiv.textContent || tempDiv.innerText || '';
      
      const matchesSearch = searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plainTextContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())));

      // Match category
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

      // Match tag
      const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag));

      return matchesSearch && matchesCategory && matchesTag;
    });

    // Then, sort the filtered posts
    if (sortBy === "popular") {
      filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else { // recent
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return filtered;
  }, [blogPosts, searchQuery, selectedCategory, selectedTag, sortBy]);

  // Get a random tech class for tags with color scheme similar to HeroSection
  const getTechClass = (tag) => {
    const classes = [
      "bg-cyan-400/20 text-cyan-200 border-cyan-400/30",
      "bg-green-400/20 text-green-200 border-green-400/30",
      "bg-blue-400/20 text-blue-200 border-blue-400/30",
      "bg-emerald-400/20 text-emerald-200 border-emerald-400/30",
      "bg-amber-400/20 text-amber-200 border-amber-400/30",
      "bg-indigo-400/20 text-indigo-200 border-indigo-400/30",
      "bg-fuchsia-400/20 text-fuchsia-200 border-fuchsia-400/30"
    ];

    // Ensure the same tag always gets the same style
    const tagIndex = tag.length % classes.length;
    return classes[tagIndex];
  };

  // UI component for post actions
  const PostActions = ({ post, className = "" }) => (
    <div className={`flex items-center gap-3 text-sm ${className}`}>
      <button
        className="flex items-center gap-1 text-indigo-300 hover:text-indigo-200 transition-colors group"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <ThumbsUp className="h-4 w-4 group-hover:text-indigo-200" />
        <span>{post.likes || 0}</span>
      </button>

      <button
        className={`flex items-center gap-1 transition-colors ${savedPosts.includes(post._id)
          ? "text-amber-300 hover:text-amber-400"
          : "text-slate-300 hover:text-amber-300"
          } group`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleSavePost(post._id);
        }}
        aria-label={savedPosts.includes(post._id) ? "Unsave post" : "Save post"}
      >
        <Bookmark
          className={`h-4 w-4 ${savedPosts.includes(post._id) ? "fill-current" : ""}`}
        />
      </button>
    </div>
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow homepage-section overflow-hidden text-white">
        {/* Hero Section */}
        <section className="py-24 md:py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Blog Content */}
              <div className="space-y-8">
                <motion.div variants={itemVariants}>
                  <div className="flex items-center space-x-2 mb-6">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-400/20 text-indigo-200 font-medium text-sm border border-indigo-400/30">
                      <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                      Dev Blog
                    </span>
                    <span className="h-1 w-1 rounded-full bg-indigo-300"></span>
                    <span className="text-indigo-200 text-sm font-light">Articles & Tutorials</span>
                  </div>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-gradient-white-cyan-indigo"
                  variants={itemVariants}
                  style={{ fontFamily: "'Clash Display', 'Montserrat', sans-serif" }}
                >
                  Insights on Modern Web Development
                </motion.h1>

                <motion.p
                  className="text-xl text-slate-300 max-w-2xl leading-relaxed"
                  variants={itemVariants}
                  style={{ fontFamily: "'Inter', 'DM Sans', sans-serif" }}
                >
                  Discover deep dives into the latest technologies, best practices, and innovative approaches
                  to building exceptional digital experiences.
                </motion.p>

                {/* Popular Tags */}
                <motion.div
                  className="flex flex-wrap gap-3 pt-2"
                  variants={itemVariants}
                >
                  {uniqueTags.slice(0, 5).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border ${getTechClass(tag)} backdrop-blur-sm transition-all duration-300 hover:-translate-y-1`}
                    >
                      {tag}
                    </button>
                  ))}
                </motion.div>

                {/* Search */}
                <motion.div
                  className="relative max-w-md mt-4"
                  variants={itemVariants}
                >
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                    <Search className="h-5 w-5 text-indigo-300" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search articles, topics, or tags..."
                    className="pl-12 pr-4 py-3.5 w-full bg-white/10 border border-white/20 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/20 transition-all backdrop-blur-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-300 hover:text-white"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </motion.div>
              </div>

              {/* Featured Post Visual */}
              {featuredPost && (
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
                        <img
                          src={featuredPost.imageUrl}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target;
                            target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80";
                          }}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

                        {/* Featured Post Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <div className="flex items-center space-x-2 mb-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/30 text-cyan-100 text-xs font-medium border border-cyan-500/40">
                              Featured Post
                            </span>
                            {featuredPost.category && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-100 text-xs font-medium border border-indigo-500/40">
                                {featuredPost.category}
                              </span>
                            )}
                          </div>
                          <Link to={`/blog/${featuredPost._id}`} className="block">
                            <h2 className="text-2xl font-bold text-white mb-2 line-clamp-2 hover:text-cyan-200 transition-colors">
                              {featuredPost.title}
                            </h2>
                          </Link>
                          <div className="flex items-center space-x-4 text-sm text-slate-300">
                            <span className="flex items-center">
                              <User className="h-4 w-4 mr-1.5" />
                              {featuredPost.author}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1.5" />
                              {featuredPost.date}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1.5" />
                              {featuredPost.readTime}
                            </span>
                          </div>
                          <Link
                            to={`/blog/${featuredPost._id}`}
                            className="inline-flex items-center mt-4 text-cyan-300 hover:text-cyan-200 font-medium transition-colors"
                          >
                            Read Post
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>

                    {/* Floating Elements */}
                    <motion.div
                      className="absolute -top-6 -left-6 backdrop-blur-md bg-white/10 p-4 rounded-xl shadow-lg border border-white/20 flex items-center space-x-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    >
                      <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                        <ThumbsUp className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Popular Post</p>
                        <p className="text-xs text-cyan-200">{featuredPost.likes} likes</p>
                      </div>
                    </motion.div>

                    {featuredPost.tags && featuredPost.tags.length > 0 && (
                      <motion.div
                        className="absolute -bottom-6 -right-6 backdrop-blur-md bg-white/10 p-4 rounded-xl shadow-lg border border-white/20 flex items-center space-x-3"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                      >
                        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
                          <Tag className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">Top Tags</p>
                          <p className="text-xs text-indigo-200">
                            {featuredPost.tags.slice(0, 2).join(", ")}
                            {featuredPost.tags.length > 2 ? "..." : ""}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Loading State */}
        <AnimatePresence>
          {loading && (
            <motion.div
              className="flex flex-col justify-center items-center py-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-300 opacity-20"></div>
                <div className="absolute inset-0 rounded-full border-t-4 border-cyan-400 animate-spin"></div>
              </div>
              <p className="mt-6 text-cyan-300 animate-pulse text-lg font-medium">Loading articles...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State with Retry */}
        {error && !loading && blogPosts.length === 0 && (
          <motion.div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-8 max-w-xl mx-auto">
              <p className="text-red-300 mb-4 font-medium text-lg">Error loading blog posts: {error}</p>
              <p className="text-slate-300 mb-6">We're having trouble connecting to our servers. Please try again later.</p>
              <button
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl hover:from-red-700 hover:to-red-600 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center mx-auto"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {/* Content (only show when not loading) */}
        {!loading && blogPosts.length > 0 && (
          <>
            {/* Filters and Categories */}
            <section className="py-16 border-t border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  className="flex flex-wrap items-center justify-between gap-6 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gradient-white-cyan-indigo mb-2">
                      Explore Articles
                    </h2>
                    <p className="text-slate-300">
                      {processedPosts.length} {processedPosts.length === 1 ? 'article' : 'articles'} available
                      {selectedCategory !== "All" ? ` in ${selectedCategory}` : ''}
                      {selectedTag ? ` tagged with ${selectedTag}` : ''}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Sort button */}
                    <button
                      onClick={() => setSortBy(sortBy === "recent" ? "popular" : "recent")}
                      className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors flex items-center text-sm backdrop-blur-sm"
                    >
                      {sortBy === "recent" ? (
                        <>
                          <Calendar className="h-4 w-4 mr-2 text-cyan-300" />
                          Most Recent
                        </>
                      ) : (
                        <>
                          <TrendingUp className="h-4 w-4 mr-2 text-cyan-300" />
                          Most Popular
                        </>
                      )}
                    </button>

                    {/* View mode toggle */}
                    <div className="bg-white/10 border border-white/20 rounded-xl p-1 flex backdrop-blur-sm">
                      <button
                        className={`p-2 rounded-lg ${displayMode === "grid"
                          ? "bg-indigo-500/50 text-white"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                          } transition-colors`}
                        onClick={() => setDisplayMode("grid")}
                        aria-label="Grid view"
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </button>
                      <button
                        className={`p-2 rounded-lg ${displayMode === "list"
                          ? "bg-indigo-500/50 text-white"
                          : "text-slate-300 hover:text-white hover:bg-white/10"
                          } transition-colors`}
                        onClick={() => setDisplayMode("list")}
                        aria-label="List view"
                      >
                        <List className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Filter button */}
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-colors flex items-center text-sm backdrop-blur-sm"
                    >
                      <Filter className="h-4 w-4 mr-2 text-cyan-300" />
                      Filters
                      <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </motion.div>

                {/* Category pills */}
                <motion.div
                  className="flex flex-wrap gap-3 mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${selectedCategory === category
                        ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium shadow-lg shadow-indigo-500/20"
                        : "bg-white/10 text-slate-300 border border-white/20 hover:bg-white/20 backdrop-blur-sm"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </motion.div>

                {/* Expandable filters */}
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 p-6 mb-8">
                        <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                          <Tag className="h-5 w-5 mr-2 text-cyan-300" />
                          Filter by Tags
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {uniqueTags.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                              className={`px-3 py-1.5 rounded-full text-sm transition-all ${selectedTag === tag
                                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium shadow-lg shadow-cyan-500/20"
                                : `border ${getTechClass(tag)}`
                                }`}
                            >
                              #{tag}
                            </button>
                          ))}
                        </div>

                        {(selectedCategory !== "All" || selectedTag) && (
                          <div className="mt-5 pt-5 border-t border-white/10 flex justify-end">
                            <button
                              onClick={() => {
                                setSelectedCategory("All");
                                setSelectedTag(null);
                              }}
                              className="px-4 py-2 text-sm text-cyan-300 hover:text-cyan-200 transition-colors flex items-center"
                            >
                              <X className="h-4 w-4 mr-1.5" />
                              Clear all filters
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* Blog Posts */}
            <section className="pb-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatePresence mode="wait">
                  {processedPosts.length > 0 ? (
                    <motion.div
                      key={`posts-${displayMode}`}
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className={displayMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        : "space-y-8"
                      }
                    >
                      {/* Grid View */}
                      {displayMode === "grid" && processedPosts.map((post) => (
                        <motion.article
                          key={post._id}
                          variants={itemVariants}
                          className="backdrop-blur-xl bg-white/10 rounded-xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                        >
                          {/* Image container with fixed height */}
                          <Link to={`/blog/${post._id}`} className="block flex-shrink-0 relative overflow-hidden h-48">
                            <img
                              src={post.imageUrl || "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3"}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              onError={(e) => {
                                const target = e.target;
                                target.src = "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent group-hover:from-slate-900/90 transition-all duration-300"></div>

                            {post.category && (
                              <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-indigo-500/30 text-indigo-100 rounded-full text-xs font-medium border border-indigo-500/40 backdrop-blur-sm">
                                  {post.category}
                                </span>
                              </div>
                            )}

                            <PostActions
                              post={post}
                              className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            />
                          </Link>

                          {/* Content section with fixed height for consistency */}
                          <div className="p-6 flex-grow flex flex-col h-56">
                            <div className="flex items-center gap-3 text-sm text-slate-300 mb-2">
                              <span className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1 text-indigo-300" />
                                {post.readTime || "5 min read"}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1 text-indigo-300" />
                                {post.date?.split(',')[0]}
                              </span>
                            </div>

                            <Link to={`/blog/${post._id}`} className="block group mt-1">
                              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors line-clamp-2">
                                {post.title}
                              </h3>
                            </Link>

                            {/* Fixed height for excerpt ensures uniform card heights */}
                            <p className="text-slate-300 mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>

                            <div className="flex items-center mt-auto">
                              <div className="flex items-center text-slate-300 text-sm">
                                <User className="h-4 w-4 mr-1.5 text-indigo-300" />
                                {post.author || "Anonymous"}
                              </div>
                            </div>

                            {post.tags && post.tags.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                {post.tags.slice(0, 3).map((tag) => (
                                  <button
                                    key={tag}
                                    className={`inline-block px-2.5 py-1 text-xs rounded-full transition-all hover:-translate-y-1 border ${getTechClass(tag)}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setSelectedTag(tag);
                                    }}
                                  >
                                    #{tag}
                                  </button>
                                ))}
                                {post.tags.length > 3 && (
                                  <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-white/10 text-slate-300 border border-white/20">
                                    +{post.tags.length - 3}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Action footer */}
                          <div className="border-t border-white/10 p-4">
                            <Link
                              to={`/blog/${post._id}`}
                              className="inline-flex items-center text-sm text-cyan-300 hover:text-cyan-200 font-medium transition-colors"
                            >
                              Read Article
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </div>
                        </motion.article>
                      ))}

                      {/* List View */}
                      {displayMode === "list" && processedPosts.map((post) => (
                        <motion.article
                          key={post._id}
                          variants={itemVariants}
                          className="backdrop-blur-xl bg-white/10 rounded-xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group"
                        >
                          {/* Fixed width and height image container */}
                          <Link
                            to={`/blog/${post._id}`}
                            className="md:w-72 lg:w-80 relative overflow-hidden flex-shrink-0 h-56 md:h-auto"
                          >
                            <img
                              src={post.imageUrl || "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3"}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              onError={(e) => {
                                const target = e.target;
                                target.src = "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3";
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {post.category && (
                              <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-indigo-500/30 text-indigo-100 rounded-full text-xs font-medium border border-indigo-500/40 backdrop-blur-sm">
                                  {post.category}
                                </span>
                              </div>
                            )}
                          </Link>

                          <div className="p-6 flex-grow flex flex-col md:flex-row md:items-center">
                            <div className="flex-grow md:max-w-2xl"> {/* Limit width for better readability */}
                              <div className="flex items-center gap-3 text-sm text-slate-300 mb-2">
                                <span className="flex items-center">
                                  <Clock className="h-3.5 w-3.5 mr-1 text-indigo-300" />
                                  {post.readTime || "5 min read"}
                                </span>
                                <span className="flex items-center">
                                  <Calendar className="h-3.5 w-3.5 mr-1 text-indigo-300" />
                                  {post.date?.split(',')[0]}
                                </span>
                                <span className="flex items-center">
                                  <User className="h-3.5 w-3.5 mr-1 text-indigo-300" />
                                  {post.author || "Anonymous"}
                                </span>
                              </div>

                              <Link to={`/blog/${post._id}`} className="block group">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors line-clamp-1">
                                  {post.title}
                                </h3>
                              </Link>

                              <p className="text-slate-300 mb-4 line-clamp-2 md:pr-8">
                                {post.excerpt}
                              </p>

                              {/* Tags in list view */}
                              {post.tags && post.tags.length > 0 && (
                                <div className="hidden md:flex flex-wrap gap-2">
                                  {post.tags.slice(0, 2).map((tag) => (
                                    <button
                                      key={tag}
                                      className={`inline-block px-2.5 py-1 text-xs rounded-full transition-all hover:-translate-y-1 border ${getTechClass(tag)}`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedTag(tag);
                                      }}
                                    >
                                      #{tag}
                                    </button>
                                  ))}
                                  {post.tags.length > 2 && (
                                    <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-white/10 text-slate-300 border border-white/20">
                                      +{post.tags.length - 2}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="mt-4 md:mt-0 md:ml-6 flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-3 md:flex-shrink-0">
                              <PostActions post={post} className="md:mb-2" />

                              <Link
                                to={`/blog/${post._id}`}
                                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm rounded-lg hover:from-indigo-600 hover:to-cyan-600 transition-all font-medium shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5"
                              >
                                Read Article
                              </Link>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      className="text-center py-24 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 shadow-lg max-w-2xl mx-auto"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-indigo-500/20 border border-indigo-500/30 mb-6">
                        <Search className="h-10 w-10 text-indigo-300" />
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-3">No results found</h2>
                      <p className="text-slate-300 mb-8 max-w-md mx-auto">
                        We couldn't find any blog posts matching your search criteria. Try adjusting your filters or search term.
                      </p>
                      <button
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl hover:from-indigo-600 hover:to-cyan-600 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("All");
                          setSelectedTag(null);
                        }}
                      >
                        Clear all filters
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            {/* Newsletter Subscription */}
            <section className="py-20 border-t border-white/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl overflow-hidden relative">
                  {/* Background with gradient and glassmorphism */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 opacity-50"></div>
                  <div className="absolute inset-0 backdrop-blur-lg bg-white/10"></div>

                  {/* Blurred circles */}
                  <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                  <div className="relative px-6 py-16 md:p-16 flex flex-col md:flex-row items-center md:space-x-10">
                    <div className="flex-1 mb-10 md:mb-0 text-center md:text-left">
                      <motion.h2
                        className="text-3xl md:text-4xl font-bold text-white mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        style={{ fontFamily: "'Clash Display', 'Montserrat', sans-serif" }}
                      >
                        Never miss an article
                      </motion.h2>
                      <motion.p
                        className="text-lg text-cyan-100 mb-0 max-w-xl mx-auto md:mx-0"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        Get notified about new articles and tutorials directly to your inbox.
                        We'll never share your email with third parties.
                      </motion.p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex-1 w-full md:w-auto"
                    >
                      <form className="flex flex-col sm:flex-row gap-3 w-full">
                        <input
                          type="email"
                          placeholder="Your email address"
                          className="flex-grow px-5 py-4 rounded-xl bg-white/20 border border-white/30 placeholder-cyan-100 text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                          required
                        />
                        <button
                          type="submit"
                          className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-medium hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center"
                        >
                          Subscribe <Zap className="ml-2 h-4 w-4" />
                        </button>
                      </form>
                      <p className="mt-3 text-sm text-cyan-100 opacity-80">
                        By subscribing, you agree to our Privacy Policy and Terms of Service.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="fixed right-6 bottom-6 p-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-full shadow-lg hover:from-indigo-600 hover:to-cyan-600 hover:shadow-xl transition-all z-30"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <ArrowUp className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Add styles for blog content */}
        <style jsx>{`
          /* Blog content styling */
          .blog-content h1 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: white;
          }
          
          .blog-content h2 {
            font-size: 1.75rem;
            font-weight: 600;
            margin-bottom: 0.875rem;
            color: white;
          }
          
          .blog-content h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: white;
          }
          
          .blog-content p {
            margin-bottom: 1rem;
            line-height: 1.7;
          }
          
          .blog-content a {
            color: #38bdf8;
            text-decoration: underline;
            transition: color 0.2s;
          }
          
          .blog-content a:hover {
            color: #0ea5e9;
          }
          
          .blog-content ul, .blog-content ol {
            margin-left: 1.5rem;
            margin-bottom: 1rem;
          }
          
          .blog-content ul {
            list-style-type: disc;
          }
          
          .blog-content ol {
            list-style-type: decimal;
          }
          
          .blog-content blockquote {
            border-left: 4px solid #38bdf8;
            padding-left: 1rem;
            margin-left: 0;
            margin-right: 0;
            font-style: italic;
            color: #94a3b8;
          }
          
          .blog-content pre {
            background: rgba(0, 0, 0, 0.3);
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin-bottom: 1rem;
          }
          
          .blog-content code {
            background: rgba(0, 0, 0, 0.3);
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
            font-family: monospace;
          }
          
          .blog-content img {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 1rem 0;
          }
        `}</style>
      </main>

      <Footer />
    </div>
  );
};

// Defining this component here for simplicity
const RefreshCw = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 2v6h-6"></path>
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
    <path d="M3 22v-6h6"></path>
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
  </svg>
);

export default BlogPage;