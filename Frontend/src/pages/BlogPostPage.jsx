import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, Clock, ArrowLeft, ThumbsUp, Bookmark, Share2, Tag, Sparkles, ArrowRight, MessageCircle, Send, Trash2 } from "lucide-react";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
// Import Quill core CSS for proper styling of rendered HTML content
import "quill/dist/quill.core.css";

const BlogPostPage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [userId, setUserId] = useState("");

  // Generate or get user ID from localStorage
  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      storedUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("userId", storedUserId);
    }
    setUserId(storedUserId);
  }, []);

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

  // Extract plain text from HTML for excerpts
  const extractPlainText = (htmlContent) => {
    if (!htmlContent) return "";
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    return tempDiv.textContent || tempDiv.innerText || '';
  };
  
  // Count words in plain text
  const countWords = (text) => {
    return text.split(/\s+/).filter(Boolean).length;
  };
  
  // Format excerpt
  const formatExcerpt = (htmlContent, maxLength = 150) => {
    const plainText = extractPlainText(htmlContent);
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + "...";
  };

  useEffect(() => {
    // Reset scroll position when the blog post changes
    window.scrollTo(0, 0);
    
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching blog post with ID: ${id}`);
        // Use the API endpoint to get the specific blog post
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch blog post. Status: ${response.status}`);
        }
        
        const blogData = await response.json();
        console.log("Blog data received:", blogData);
        
        // Increment view count
        fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}/view`, {
          method: "POST"
        }).catch(console.error);
        
        // Extract plain text for word counting and reading time calculation
        const plainText = extractPlainText(blogData.content);
        const wordCount = countWords(plainText);
        const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
        
        // Format the blog post data
        const formattedPost = {
          id: blogData._id,
          _id: blogData._id,
          title: blogData.title,
          content: blogData.content,
          excerpt: formatExcerpt(blogData.content, 150),
          date: new Date(blogData.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          author: blogData.author || "Anonymous",
          readTime: readTime,
          category: blogData.category || "General",
          imageUrl: blogData.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
          tags: blogData.tags || ["Web Development"],
          likes: blogData.likes || [],
          comments: blogData.comments || [],
          views: blogData.views || 0,
          createdAt: blogData.createdAt
        };
        
        setPost(formattedPost);
        setComments(blogData.comments || []);
        setLikeCount(blogData.likes ? blogData.likes.length : 0);
        setLiked(blogData.likes ? blogData.likes.includes(userId) : false);
        setPost(formattedPost);
        
        // Fetch related posts (same category)
        if (formattedPost.category) {
          const relatedResponse = await fetch(
            `${import.meta.env.VITE_API_URL}/api/blogs?category=${formattedPost.category}`
          );
          
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            console.log("Related posts data:", relatedData);
            
            // Filter out the current post and format the data
            const formattedRelated = relatedData
              .filter((blog) => blog._id !== id)
              .map((blog) => {
                const plainText = extractPlainText(blog.content);
                const wordCount = countWords(plainText);
                const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
                
                return {
                  id: blog._id,
                  _id: blog._id,
                  title: blog.title,
                  excerpt: formatExcerpt(blog.content, 150),
                  date: new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }),
                  author: blog.author || "Anonymous",
                  readTime: readTime,
                  category: blog.category || "General",
                  imageUrl: blog.imageUrl || "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
                  tags: blog.tags || ["Web Development"],
                  likes: blog.likes || 0
                };
              })
              .slice(0, 3); // Limit to 3 related posts
              
            setRelatedPosts(formattedRelated);
          }
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError("Failed to load the blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    if (id && userId) {
      fetchPost();
    }
  }, [id, userId]);

  // Handle like/unlike
  const handleLike = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId })
      });
      
      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.likes);
        setLiked(data.liked);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!commentContent.trim()) {
      alert("Please write a comment");
      return;
    }

    if (!isAuthenticated) {
      alert("Please login to comment");
      return;
    }

    setSubmittingComment(true);
    try {
      // Get username from localStorage, if not available use user.name from Redux, otherwise default to "Anonymous"
      let username = localStorage.getItem("username");
      
      // If username is not in localStorage, try to get it from the user object or prompt to re-login
      if (!username || username === "User") {
        alert("Please log out and log back in to update your profile information.");
        setSubmittingComment(false);
        return;
      }
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          author: username,
          content: commentContent 
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setComments([...comments, data.comment]);
        setCommentContent("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}/comment/${commentId}`, {
        method: "DELETE"
      });
      
      if (response.ok) {
        setComments(comments.filter(comment => comment._id !== commentId));
      } else {
        alert("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment");
    }
  };

  // Animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow homepage-section flex items-center justify-center">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-300 opacity-20"></div>
            <div className="absolute inset-0 rounded-full border-t-4 border-cyan-400 animate-spin"></div>
            <p className="mt-24 text-cyan-300 animate-pulse text-lg font-medium">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow homepage-section flex items-center justify-center">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-12 max-w-lg mx-auto text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              {error ? "Error Loading Blog Post" : "Blog Post Not Found"}
            </h1>
            <p className="mt-2 text-slate-300 mb-6">
              {error || "The blog post you're looking for doesn't exist or has been removed."}
            </p>
            <Link 
              to="/blog" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-xl hover:from-indigo-600 hover:to-cyan-600 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30"
            >
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow homepage-section overflow-hidden text-white">
        {/* Hero Banner */}
        <div className="relative">
          {/* Background Image with Overlay */}
          <div 
            className="w-full h-[60vh] relative bg-cover bg-center bg-fixed"
            style={{ 
              backgroundImage: `url(${post.imageUrl})` 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/30"></div>
            
            {/* Radial gradient for additional depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 to-cyan-900/30 mix-blend-multiply"></div>
            
            {/* Content Container */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-center space-x-2 mb-6"
                >
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-400/20 text-indigo-200 font-medium text-sm border border-indigo-400/30">
                    <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                    {post.category}
                  </span>
                </motion.div>
                
                <motion.h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-white-cyan-indigo mb-6"
                  variants={itemVariants}
                >
                  {post.title}
                </motion.h1>
                
                <motion.div 
                  className="flex flex-wrap justify-center items-center gap-6 text-slate-300 text-sm"
                  variants={itemVariants}
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-indigo-300 mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-indigo-300 mr-2" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-indigo-300 mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-5 w-5 text-indigo-300 mr-2" />
                    <span>{likeCount} likes</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-5 w-5 text-indigo-300 mr-2" />
                    <span>{comments.length} comments</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Floating Action Buttons */}
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex items-center space-x-3">
            <button 
              onClick={handleLike}
              className={`p-3 rounded-full backdrop-blur-md flex items-center space-x-2 transition-all ${
                liked 
                  ? "bg-indigo-500/50 text-white border border-indigo-400/50" 
                  : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
              }`}
            >
              <ThumbsUp className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
              <span className="hidden md:inline">{likeCount}</span>
            </button>
            
            <button 
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-3 rounded-full backdrop-blur-md flex items-center space-x-2 transition-all ${
                bookmarked 
                  ? "bg-amber-500/50 text-white border border-amber-400/50" 
                  : "bg-white/10 border border-white/20 text-white hover:bg-white/20"
              }`}
            >
              <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-current" : ""}`} />
              <span className="hidden md:inline">{bookmarked ? "Saved" : "Save"}</span>
            </button>
            
            <button 
              className="p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                  }).catch(console.error);
                } else {
                  // Fallback
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
            >
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </button>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mx-auto">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-3">
                {post.tags.map(tag => (
                  <Link 
                    key={tag} 
                    to={`/blog?tag=${tag}`}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all hover:-translate-y-1 border ${getTechClass(tag)}`}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
            
            {/* Post Content with Quill formatting */}
            <motion.article 
              className="prose prose-lg prose-invert max-w-none backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6 md:p-10 quill-content"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="prose-headings:text-white prose-headings:scroll-mt-24 prose-a:text-cyan-300 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-pre:bg-white/10 prose-pre:backdrop-blur-md prose-code:text-cyan-300"
              ></div>
            </motion.article>
            
            {/* Post Actions */}
            <div className="mt-10 flex flex-wrap justify-between items-center">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-indigo-300 hover:text-indigo-200 transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> 
                <span>Back to all articles</span>
              </Link>
              
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 ${
                    liked ? "text-indigo-300" : "text-slate-400 hover:text-indigo-300"
                  } transition-colors`}
                >
                  <ThumbsUp className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
                  <span>{likeCount} {liked ? "Liked" : "Likes"}</span>
                </button>
                
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`flex items-center space-x-2 ${
                    bookmarked ? "text-amber-300" : "text-slate-400 hover:text-amber-300"
                  } transition-colors`}
                >
                  <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-current" : ""}`} />
                  <span>{bookmarked ? "Saved" : "Save"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Comments Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="backdrop-blur-xl bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <MessageCircle className="h-6 w-6 mr-2 text-cyan-300" />
                Comments ({comments.length})
              </h3>
              
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div className="space-y-4">
                  {!isAuthenticated && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-4">
                      <p className="text-amber-300 text-sm">
                        Please <Link to="/login" className="underline font-semibold">login</Link> to comment
                      </p>
                    </div>
                  )}
                  <div>
                    <textarea
                      placeholder={isAuthenticated ? "Share your thoughts..." : "Login to comment"}
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none disabled:opacity-50"
                      required
                      disabled={!isAuthenticated}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submittingComment || !isAuthenticated}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-lg hover:from-cyan-600 hover:to-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>{submittingComment ? "Posting..." : "Post Comment"}</span>
                  </button>
                </div>
              </form>
              
              {/* Comments List */}
              <div className="space-y-6">
                {comments.length === 0 ? (
                  <p className="text-slate-400 text-center py-8">No comments yet. Be the first to comment!</p>
                ) : (
                  comments.map((comment, index) => {
                    // Check if current user is the comment author
                    const currentUsername = localStorage.getItem("username");
                    const isCommentAuthor = currentUsername && comment.author === currentUsername;
                    
                    return (
                      <motion.div
                        key={comment._id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 rounded-lg p-4 border border-white/10"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 flex items-center justify-center text-white font-semibold">
                              {comment.author.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="text-white font-semibold">{comment.author}</h4>
                              <div className="flex items-center space-x-3">
                                <span className="text-xs text-slate-400">
                                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                                {isCommentAuthor && (
                                  <button
                                    onClick={() => handleDeleteComment(comment._id)}
                                    className="text-red-400 hover:text-red-300 transition-colors"
                                    title="Delete comment"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                            <p className="text-slate-300">{comment.content}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gradient-white-cyan-indigo mb-8 flex items-center">
                <Tag className="h-6 w-6 mr-2 text-cyan-300" />
                Related Articles
              </h2>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {relatedPosts.map((post) => (
                  <motion.article 
                    key={post.id} 
                    variants={itemVariants}
                    className="backdrop-blur-xl bg-white/10 rounded-xl overflow-hidden border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                  >
                    <Link to={`/blog/${post.id}`} className="block relative overflow-hidden">
                      <div className="aspect-w-16 aspect-h-9 w-full">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085";
                          }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
                      
                      {post.category && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-indigo-500/30 text-indigo-100 rounded-full text-xs font-medium border border-indigo-500/40 backdrop-blur-sm">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </Link>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center gap-3 text-sm text-slate-300 mb-2">
                        <span className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1 text-indigo-300" />
                          {post.readTime}
                        </span>
                      </div>
                      
                      <Link to={`/blog/${post.id}`} className="block group mt-1">
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-slate-300 mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="mt-auto">
                        <Link
                          to={`/blog/${post.id}`}
                          className="inline-flex items-center text-sm text-cyan-300 hover:text-cyan-200 font-medium transition-colors"
                        >
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* Styling for Quill content */}
        <style jsx>{`
          /* Quill content specific styling */
          .quill-content p {
            margin-bottom: 1rem;
            line-height: 1.7;
          }
          
          .quill-content h1 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: white;
          }
          
          .quill-content h2 {
            font-size: 1.75rem;
            font-weight: 600;
            margin-bottom: 0.875rem;
            color: white;
          }
          
          .quill-content h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            color: white;
          }
          
          .quill-content a {
            color: #38bdf8;
            text-decoration: underline;
            transition: color 0.2s;
          }
          
          .quill-content a:hover {
            color: #0ea5e9;
          }
          
          .quill-content ul, .quill-content ol {
            margin-left: 1.5rem;
            margin-bottom: 1rem;
          }
          
          .quill-content ul {
            list-style-type: disc;
          }
          
          .quill-content ol {
            list-style-type: decimal;
          }
          
          .quill-content blockquote {
            border-left: 4px solid #38bdf8;
            padding-left: 1rem;
            margin-left: 0;
            margin-right: 0;
            font-style: italic;
            color: #94a3b8;
          }
          
          .quill-content pre {
            background: rgba(0, 0, 0, 0.3);
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin-bottom: 1rem;
          }
          
          .quill-content code {
            background: rgba(0, 0, 0, 0.3);
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-size: 0.875rem;
            font-family: monospace;
          }
          
          .quill-content img {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 1rem 0;
          }
          
          /* Quill-specific element support */
          .quill-content .ql-align-center {
            text-align: center;
          }
          
          .quill-content .ql-align-right {
            text-align: right;
          }
          
          .quill-content .ql-align-justify {
            text-align: justify;
          }
          
          .quill-content .ql-size-small {
            font-size: 0.75em;
          }
          
          .quill-content .ql-size-large {
            font-size: 1.5em;
          }
          
          .quill-content .ql-size-huge {
            font-size: 2.5em;
          }
          
          .quill-content .ql-indent-1 {
            padding-left: 3em;
          }
          
          .quill-content .ql-indent-2 {
            padding-left: 6em;
          }
          
          .quill-content .ql-video {
            width: 100%;
            height: 0;
            padding-bottom: 56.25%;
            position: relative;
            margin-bottom: 1rem;
          }
          
          .quill-content .ql-video iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;