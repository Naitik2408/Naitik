import Blog from '../models/Blog.js';

export const getBlogs = async (req, res) => {
  try {
    // Add query support for category filtering
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    const blogs = await Blog.find(filter);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs', error });
  }
};

// Add this function to get a single blog by ID
export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blog', error });
  }
};

export const addBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add blog', error });
  }
};

// Add these functions for completeness
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update blog', error });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog', error });
  }
};
// Like a blog post
export const likeBlog = async (req, res) => {
  try {
    const { userId } = req.body; // userId can be IP address or session ID
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if user already liked
    const alreadyLiked = blog.likes.includes(userId);
    
    if (alreadyLiked) {
      // Unlike - remove userId from likes
      blog.likes = blog.likes.filter(id => id !== userId);
    } else {
      // Like - add userId to likes
      blog.likes.push(userId);
    }
    
    await blog.save();
    res.json({ 
      likes: blog.likes.length, 
      liked: !alreadyLiked,
      message: alreadyLiked ? 'Unliked' : 'Liked'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to like blog', error });
  }
};

// Add a comment
export const addComment = async (req, res) => {
  try {
    const { author, content } = req.body;
    
    if (!author || !content) {
      return res.status(400).json({ message: 'Author and content are required' });
    }

    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    blog.comments.push({ author, content });
    await blog.save();
    
    res.status(201).json({ 
      comment: blog.comments[blog.comments.length - 1],
      totalComments: blog.comments.length 
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const commentIndex = blog.comments.findIndex(
      comment => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    blog.comments.splice(commentIndex, 1);
    await blog.save();
    
    res.json({ 
      message: 'Comment deleted successfully',
      totalComments: blog.comments.length 
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment', error });
  }
};

// Increment view count
export const incrementView = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json({ views: blog.views });
  } catch (error) {
    res.status(500).json({ message: 'Failed to increment views', error });
  }
};
