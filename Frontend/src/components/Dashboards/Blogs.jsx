import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit, Trash2, X, Search, Filter, ChevronDown, Download, RefreshCw,
  CheckCircle, AlertTriangle, PlusCircle, Calendar, Heart, MessageSquare,
  User, Image as ImageIcon, FileText, Globe, ThumbsUp, MessageCircle, BookOpen
} from "lucide-react";
import { useAppSelector } from "../../Redux/hooks";
import { selectAuth } from "../../Redux/authSlice";
// Import Quill CSS directly (will be included in the bundle)
import "quill/dist/quill.snow.css";

const Blogs = () => {
  const { token, user } = useAppSelector(selectAuth);
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });
  const [editingBlog, setEditingBlog] = useState(null);
  const [editBlog, setEditBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedBlog, setExpandedBlog] = useState(null);
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmBulkDelete, setConfirmBulkDelete] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "descending"
  });

  // Create refs for Quill editors
  const quillNewRef = useRef(null);
  const quillEditRef = useRef(null);
  const newQuillInstance = useRef(null);
  const editQuillInstance = useRef(null);

  // Quill toolbar options
  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults
    [{ 'align': [] }],
    ['link', 'image'],                                // link and image
    ['clean']                                         // remove formatting button
  ];

  // Initialize Quill editors when the modals open
  useEffect(() => {
    if (showAddModal && quillNewRef.current && !newQuillInstance.current) {
      // We need to dynamically import Quill because it may have window dependencies
      import('quill').then(module => {
        const Quill = module.default;
        newQuillInstance.current = new Quill(quillNewRef.current, {
          theme: 'snow',
          placeholder: 'Write your blog post content here...',
          modules: {
            toolbar: toolbarOptions
          }
        });

        // Set initial content if any
        if (newBlog.content) {
          newQuillInstance.current.root.innerHTML = newBlog.content;
        }

        // Update content state when editor changes
        newQuillInstance.current.on('text-change', () => {
          setNewBlog(prev => ({
            ...prev,
            content: newQuillInstance.current.root.innerHTML
          }));
        });
      });
    }

    // Clean up function
    return () => {
      if (!showAddModal && newQuillInstance.current) {
        newQuillInstance.current = null;
      }
    };
  }, [showAddModal, newBlog.content]);

  // Initialize edit editor
  useEffect(() => {
    if (editingBlog && quillEditRef.current && !editQuillInstance.current) {
      import('quill').then(module => {
        const Quill = module.default;
        editQuillInstance.current = new Quill(quillEditRef.current, {
          theme: 'snow',
          modules: {
            toolbar: toolbarOptions
          }
        });

        // Set initial content
        if (editBlog.content) {
          editQuillInstance.current.root.innerHTML = editBlog.content;
        }

        // Update content state when editor changes
        editQuillInstance.current.on('text-change', () => {
          setEditBlog(prev => ({
            ...prev,
            content: editQuillInstance.current.root.innerHTML
          }));
        });
      });
    }

    // Clean up function
    return () => {
      if (!editingBlog && editQuillInstance.current) {
        editQuillInstance.current = null;
      }
    };
  }, [editingBlog, editBlog.content]);

  // Fetch blogs from the backend
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Fix in the fetchBlogs function
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();

      // Normalize the data to ensure comments array exists
      const normalizedData = data.map(blog => ({
        ...blog,
        comments: blog.comments || []
      }));

      setBlogs(normalizedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new blog
  const handleAddBlog = async () => {
    if (!newBlog.title || !newBlog.content) {
      setError("Title and content are required");
      return;
    }

    try {
      setLoading(true);
      const blogData = {
        ...newBlog,
        author: user?.name || "Admin",
        comments: [] // Initialize with empty comments array
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add blog");
      }

      const newBlogData = await response.json();
      setBlogs([newBlogData, ...blogs]);
      setShowAddModal(false);
      setNewBlog({ title: "", content: "", imageUrl: "" });

      setSuccessMessage("Blog post published successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update a blog
  const handleUpdateBlog = async () => {
    if (!editingBlog) return;
    if (!editBlog.title || !editBlog.content) {
      setError("Title and content are required");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${editingBlog}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editBlog),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update blog");
      }

      const updatedBlog = await response.json();
      setBlogs(blogs.map(blog => blog._id === editingBlog ? updatedBlog : blog));
      setEditingBlog(null);

      setSuccessMessage("Blog post updated successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a blog
  const handleDeleteBlog = async (blogId) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete blog");
      }

      setBlogs(blogs.filter((blog) => blog._id !== blogId));
      setConfirmDeleteId(null);

      setSuccessMessage("Blog post deleted successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    try {
      setLoading(true);
      // In a real app, you'd have a bulk delete endpoint
      // For now, we'll simulate it with multiple single deletes
      for (const blogId of selectedBlogs) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${blogId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setBlogs(blogs.filter(blog => !selectedBlogs.includes(blog._id)));
      setSelectedBlogs([]);
      setSelectAll(false);
      setConfirmBulkDelete(false);

      setSuccessMessage(`${selectedBlogs.length} blog posts deleted successfully`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchBlogs();
      setSuccessMessage("Blog data refreshed successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setTimeout(() => setRefreshing(false), 800);
    }
  };

  // Filter blogs based on search term - modified to handle HTML content
  const filteredBlogs = useMemo(() => {
    return blogs
      .filter(blog => {
        // Create a temporary div to strip HTML tags for content search
        const div = document.createElement('div');
        div.innerHTML = blog.content;
        const plainTextContent = div.textContent || div.innerText || '';

        return (
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          plainTextContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
      .sort((a, b) => {
        if (!sortConfig) return 0;

        if (sortConfig.key === 'title' || sortConfig.key === 'author') {
          const aValue = a[sortConfig.key].toLowerCase();
          const bValue = b[sortConfig.key].toLowerCase();

          if (sortConfig.direction === 'ascending') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        }

        if (sortConfig.key === 'content') {
          // Strip HTML for content sorting
          const divA = document.createElement('div');
          divA.innerHTML = a[sortConfig.key];
          const aValue = (divA.textContent || divA.innerText || '').toLowerCase();

          const divB = document.createElement('div');
          divB.innerHTML = b[sortConfig.key];
          const bValue = (divB.textContent || divB.innerText || '').toLowerCase();

          if (sortConfig.direction === 'ascending') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        }

        if (sortConfig.key === 'createdAt') {
          const aValue = new Date(a[sortConfig.key]).getTime();
          const bValue = new Date(b[sortConfig.key]).getTime();

          if (sortConfig.direction === 'ascending') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        }

        if (sortConfig.key === 'likes') {
          const aValue = a[sortConfig.key];
          const bValue = b[sortConfig.key];

          if (sortConfig.direction === 'ascending') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        }

        if (sortConfig.key === 'commentsCount') {
          const aValue = a.comments.length;
          const bValue = b.comments.length;

          if (sortConfig.direction === 'ascending') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        }

        return 0;
      });
  }, [blogs, searchTerm, sortConfig]);

  // Handle sort
  const requestSort = (key) => {
    let direction = "ascending";

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  // Handle select all
  useEffect(() => {
    if (selectAll) {
      setSelectedBlogs(filteredBlogs.map(blog => blog._id));
    } else {
      setSelectedBlogs([]);
    }
  }, [selectAll, filteredBlogs]);

  // Format blog excerpt - extract text from HTML
  const formatExcerpt = (htmlContent, maxLength = 150) => {
    const div = document.createElement('div');
    div.innerHTML = htmlContent;
    const plainText = div.textContent || div.innerText || '';

    if (plainText.length <= maxLength) return plainText;
    return plainText.substr(0, maxLength) + '...';
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Blog Management</h2>
          <p className="text-sm text-gray-500 mt-1">Create and manage your blog content</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 ${refreshing ? 'animate-spin text-indigo-600' : ''
              }`}
            disabled={refreshing}
          >
            <RefreshCw className="h-5 w-5" />
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Write New Post</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md flex items-start"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex items-start"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
            <div>
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 px-3 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters and Search Row */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Sort Dropdown */}
          <div className="relative">
            <div className="flex items-center">
              <Filter className="h-4 w-4 text-gray-400 absolute left-3" />
              <select
                onChange={(e) => requestSort(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[150px]"
                value={sortConfig.key}
              >
                <option value="createdAt">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="author">Sort by Author</option>
                <option value="likes">Sort by Likes</option>
                <option value="commentsCount">Sort by Comments</option>
              </select>
              <ChevronDown
                className={`h-4 w-4 ml-2 text-gray-400 transition-transform ${sortConfig.direction === 'descending' ? 'rotate-180' : ''
                  }`}
              />
            </div>
          </div>

          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Bulk Actions */}
          {selectedBlogs.length > 0 && (
            <div className="flex items-center bg-indigo-50 px-3 py-1.5 rounded-lg text-sm">
              <span className="font-medium text-indigo-700 mr-2">{selectedBlogs.length} selected</span>
              <button
                onClick={() => setConfirmBulkDelete(true)}
                className="text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          )}

          {/* Export Button */}
          <button
            className="px-3 py-2 border border-gray-300 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Blogs Content */}
      {loading && !refreshing ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
          <span className="ml-3 text-sm font-medium text-indigo-500">Loading blogs...</span>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
          <BookOpen className="h-10 w-10 text-gray-400 mb-2" />
          <h3 className="text-lg font-medium text-gray-800 mb-1">No blogs found</h3>
          <p className="text-gray-500 text-sm">
            {searchTerm
              ? `No results matching "${searchTerm}"`
              : "There are no blog posts to display"
            }
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <motion.div
          className="space-y-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredBlogs.map((blog) => (
            <motion.div
              key={blog._id}
              className={`bg-white rounded-lg shadow-sm border overflow-hidden transition-all duration-200 ${selectedBlogs.includes(blog._id) ? 'ring-2 ring-indigo-500' : 'hover:shadow-md'
                }`}
              variants={itemVariants}
            >
              <div className="relative">
                {/* Selection Checkbox */}
                <div className="absolute top-4 left-4 z-10">
                  <input
                    type="checkbox"
                    checked={selectedBlogs.includes(blog._id)}
                    onChange={() => {
                      if (selectedBlogs.includes(blog._id)) {
                        setSelectedBlogs(selectedBlogs.filter(id => id !== blog._id));
                      } else {
                        setSelectedBlogs([...selectedBlogs, blog._id]);
                      }
                    }}
                    className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                {/* Blog Image */}
                {blog.imageUrl && (
                  <div className="md:w-1/4 h-48 md:h-auto relative">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setPreviewImage(blog.imageUrl)}
                      className="absolute bottom-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Blog Content */}
                <div className={`p-6 ${blog.imageUrl ? "md:w-3/4" : "w-full"}`}>
                  <h3 className="font-bold text-xl mb-2">{blog.title}</h3>

                  <div className="flex flex-wrap items-center text-gray-500 text-sm mb-4 gap-2">
                    <div className="flex items-center">
                      <User className="h-3.5 w-3.5 mr-1" />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-3.5 w-3.5 mr-1" />
                      <span>{blog.likes} likes</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-3.5 w-3.5 mr-1" />
                      <span>{(blog.comments || []).length} comments</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    {expandedBlog === blog._id ? (
                      <div className="text-gray-600 blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
                    ) : (
                      <p className="text-gray-600">{formatExcerpt(blog.content)}</p>
                    )}

                    {blog.content.length > 150 && (
                      <button
                        onClick={() => setExpandedBlog(expandedBlog === blog._id ? null : blog._id)}
                        className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                      >
                        {expandedBlog === blog._id ? "Show less" : "Read more"}
                      </button>
                    )}
                  </div>

                  {/* Comments Preview */}
                  {(blog.comments || []).length > 0 && expandedBlog === blog._id && (
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-medium text-sm mb-2 text-gray-700">Recent Comments</h4>
                      <div className="space-y-2">
                        {(blog.comments || []).slice(0, 2).map((comment, i) => (
                          <div key={i} className="bg-gray-50 rounded p-3 text-sm">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{comment.user}</span>
                              <span className="text-gray-500 text-xs">{formatDate(comment.createdAt)}</span>
                            </div>
                            <p className="text-gray-600">{comment.comment}</p>
                          </div>
                        ))}
                        {(blog.comments || []).length > 2 && (
                          <div className="text-center text-sm text-gray-500">
                            + {(blog.comments || []).length - 2} more comments
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <div className="flex space-x-3">
                      <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                        <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                        <span>Like</span>
                      </button>
                      <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                        <MessageCircle className="h-3.5 w-3.5 mr-1" />
                        <span>Comment</span>
                      </button>
                      <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                        <Globe className="h-3.5 w-3.5 mr-1" />
                        <span>View Live</span>
                      </button>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingBlog(blog._id);
                          setEditBlog({
                            title: blog.title,
                            content: blog.content,
                            imageUrl: blog.imageUrl,
                          });
                        }}
                        className="p-1.5 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>

                      <button
                        onClick={() => setConfirmDeleteId(blog._id)}
                        className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {filteredBlogs.length > 0 && (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {filteredBlogs.length} of {blogs.length} blog posts
          </div>
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white disabled:cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-indigo-50 text-indigo-600 font-medium">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white disabled:cursor-not-allowed" disabled>
              Next
            </button>
          </div>
        </div>
      )}

      {/* Add Blog Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop with lower z-index */}
            <div
              className="fixed inset-0 bg-gray-500/70 bg-opacity-75 transition-opacity z-40"
              aria-hidden="true"
              onClick={() => setShowAddModal(false)}
            />

            {/* Modal container */}
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block">
              <motion.div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full relative z-50"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="bg-indigo-600 px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium leading-6 text-white">Write New Blog Post</h3>
                    <button
                      onClick={() => setShowAddModal(false)}
                      className="bg-indigo-500 rounded-md p-1 text-indigo-200 hover:text-white focus:outline-none"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Blog Title</label>
                      <input
                        type="text"
                        id="title"
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="Enter a catchy title for your blog post"
                      />
                    </div>

                    <div>
                      <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Featured Image URL</label>
                      <input
                        type="text"
                        id="imageUrl"
                        value={newBlog.imageUrl}
                        onChange={(e) => setNewBlog({ ...newBlog, imageUrl: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="https://example.com/image.jpg"
                      />
                      {newBlog.imageUrl && (
                        <div className="mt-2 relative h-32 bg-gray-100 rounded-md overflow-hidden">
                          <img src={newBlog.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                      {/* Quill Editor Container */}
                      <div className="mt-1 quill-container">
                        <div ref={quillNewRef} style={{ height: "300px" }}></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <p>Use the toolbar above to format your content with headings, lists, images, code blocks and more.</p>
                      </div>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-md">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <FileText className="h-5 w-5 text-indigo-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-indigo-800">Blog Writing Tips</h3>
                          <div className="mt-1 text-xs text-indigo-700">
                            <p className="mb-1">• Use clear, concise language and organize content with headings</p>
                            <p className="mb-1">• Include relevant images to increase engagement</p>
                            <p className="mb-1">• Use code blocks for technical content</p>
                            <p>• End with a call-to-action to encourage reader interaction</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleAddBlog}
                  >
                    Publish Blog Post
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Blog Modal */}
      <AnimatePresence>
        {editingBlog && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop with lower z-index */}
            <div
              className="fixed inset-0 bg-gray-500/70 bg-opacity-75 transition-opacity z-40"
              aria-hidden="true"
              onClick={() => setEditingBlog(null)}
            />

            {/* Modal container */}
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block">
              <motion.div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full relative z-50"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="bg-indigo-600 px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium leading-6 text-white">Edit Blog Post</h3>
                    <button
                      onClick={() => setEditingBlog(null)}
                      className="bg-indigo-500 rounded-md p-1 text-indigo-200 hover:text-white focus:outline-none"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">Blog Title</label>
                      <input
                        type="text"
                        id="edit-title"
                        value={editBlog.title || ""}
                        onChange={(e) => setEditBlog({ ...editBlog, title: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="edit-imageUrl" className="block text-sm font-medium text-gray-700">Featured Image URL</label>
                      <input
                        type="text"
                        id="edit-imageUrl"
                        value={editBlog.imageUrl || ""}
                        onChange={(e) => setEditBlog({ ...editBlog, imageUrl: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                      />
                      {editBlog.imageUrl && (
                        <div className="mt-2 relative h-32 bg-gray-100 rounded-md overflow-hidden">
                          <img src={editBlog.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="edit-content" className="block text-sm font-medium text-gray-700">Content</label>
                      <div className="mt-1 quill-container">
                        <div ref={quillEditRef} style={{ height: "300px" }}></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        <p>Use the toolbar above to format your content with headings, lists, images, code blocks and more.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleUpdateBlog}
                  >
                    Update Blog Post
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setEditingBlog(null)}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>


      {/* Confirm Delete Modal */}
      <AnimatePresence>
        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-gray-500/70 bg-opacity-75 transition-opacity z-40"
              aria-hidden="true"
              onClick={() => setConfirmDeleteId(null)}
            ></div>

            {/* Modal */}
            <motion.div
              className="z-50 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Blog Post
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this blog post? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleDeleteBlog(confirmDeleteId)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setConfirmDeleteId(null)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* Confirm Bulk Delete Modal */}
      <AnimatePresence>
        {confirmBulkDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-gray-500/70 bg-opacity-75 transition-opacity z-40"
              onClick={() => setConfirmBulkDelete(false)}
            />

            {/* Modal */}
            <motion.div
              className="z-50 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Multiple Blog Posts
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete {selectedBlogs.length} blog posts? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleBulkDelete}
                >
                  Delete All Selected
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setConfirmBulkDelete(false)}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={() => setPreviewImage(null)}
              >
                <div className="absolute inset-0 bg-black opacity-90"></div>
              </div>

              <motion.div
                className="relative max-w-3xl max-h-[80vh] overflow-hidden rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <img src={previewImage} alt="Preview" className="max-h-[80vh] w-auto" />
                <button
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Add styles for proper display of blog content */}
      <style jsx>{`
        /* Custom styles for Quill editor */
        .quill-container .ql-container {
          min-height: 200px;
          font-family: inherit;
          font-size: 1rem;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
        }

        .quill-container .ql-toolbar {
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          background-color: #f9fafb;
          border-color: #e5e7eb;
        }

        .quill-container .ql-editor {
          min-height: 200px;
          font-family: inherit;
          font-size: 1rem;
        }

        .quill-container .ql-snow .ql-tooltip {
          z-index: 100;
        }

        /* Blog content rendering styles */
        .blog-content h1 {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          margin-top: 1rem;
        }
        
        .blog-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          margin-top: 1rem;
        }
        
        .blog-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          margin-top: 0.75rem;
        }
        
        .blog-content p {
          margin-bottom: 0.75rem;
        }
        
        .blog-content ul, .blog-content ol {
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .blog-content ul {
          list-style-type: disc;
        }
        
        .blog-content ol {
          list-style-type: decimal;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          color: #6b7280;
          font-style: italic;
          margin: 1rem 0;
        }
        
        .blog-content pre {
          background: #f3f4f6;
          padding: 0.75rem;
          border-radius: 0.25rem;
          overflow-x: auto;
          margin: 0.75rem 0;
        }
        
        .blog-content code {
          background: #f3f4f6;
          padding: 0.15rem 0.3rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        
        .blog-content a {
          color: #4f46e5;
          text-decoration: underline;
        }
        
        .blog-content img {
          max-width: 100%;
          height: auto;
          margin: 0.75rem 0;
        }
      `}</style>
    </div>
  );
};

export default Blogs;