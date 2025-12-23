import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2, Edit, X, Search, Filter, Download,
  RefreshCw, CheckCircle, AlertTriangle, Github, ExternalLink, Image, Tag, Layers, PlusCircle, Info, Eye
} from "lucide-react";
import { useAppSelector } from "../../Redux/hooks";
import { selectAuth } from "../../Redux/authSlice";


const Projects = () => {
  const { token } = useAppSelector(selectAuth);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    imageUrl: "",
    technologies: [],
    demoLink: "",
    codeLink: "",
    problem: "",
    challenges: [],
    decisions: [],
    impact: "",
  });

  const [editingProject, setEditingProject] = useState(null);
  const [editProject, setEditProject] = useState({});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTech, setFilterTech] = useState("all");
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmBulkDelete, setConfirmBulkDelete] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "ascending"
  });

  // Fetch projects from the backend
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio`);
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new project
  const handleAddProject = async () => {
    if (!newProject.title || !newProject.description) {
      setError("Title and description are required");
      return;
    }

    try {
      setLoading(true);
      const techArray =
        typeof newProject.technologies === "string"
          ? newProject.technologies.split(",").map((t) => t.trim())
          : newProject.technologies;

      const challengesArray =
        typeof newProject.challenges === "string"
          ? newProject.challenges.split(",").map((c) => c.trim()).filter(c => c !== "")
          : newProject.challenges;

      const decisionsArray =
        typeof newProject.decisions === "string"
          ? newProject.decisions.split(",").map((d) => d.trim()).filter(d => d !== "")
          : newProject.decisions;

      const projectData = {
        ...newProject,
        technologies: techArray,
        challenges: challengesArray,
        decisions: decisionsArray,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add project");
      }

      const createdProject = await response.json();
      setProjects([...projects, createdProject]);
      setShowAddModal(false);

      // Reset form
      setNewProject({
        title: "",
        description: "",
        imageUrl: "",
        technologies: [],
        demoLink: "",
        codeLink: "",
        problem: "",
        challenges: [],
        decisions: [],
        impact: "",
      });

      setSuccessMessage("Project added successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update a project
  const handleUpdateProject = async () => {
    if (!editingProject) return;

    try {
      setLoading(true);

      const techArray =
        typeof editProject.technologies === "string"
          ? editProject.technologies.split(",").map((t) => t.trim())
          : editProject.technologies;

      const challengesArray =
        typeof editProject.challenges === "string"
          ? editProject.challenges.split(",").map((c) => c.trim()).filter(c => c !== "")
          : editProject.challenges;

      const decisionsArray =
        typeof editProject.decisions === "string"
          ? editProject.decisions.split(",").map((d) => d.trim()).filter(d => d !== "")
          : editProject.decisions;

      const projectData = {
        ...editProject,
        technologies: techArray,
        challenges: challengesArray,
        decisions: decisionsArray,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/project/${editingProject}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update project");
      }

      const updatedProject = await response.json();
      setProjects(projects.map(project => project._id === editingProject ? updatedProject : project));
      setEditingProject(null);

      setSuccessMessage("Project updated successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a project
  const handleDeleteProject = async (projectId) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/project/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete project");
      }

      setProjects(projects.filter((project) => project._id !== projectId));
      setConfirmDeleteId(null);

      setSuccessMessage("Project deleted successfully");
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
      for (const projectId of selectedProjects) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/project/${projectId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setProjects(projects.filter(project => !selectedProjects.includes(project._id)));
      setSelectedProjects([]);
      setSelectAll(false);
      setConfirmBulkDelete(false);

      setSuccessMessage(`${selectedProjects.length} projects deleted successfully`);
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
      await fetchProjects();
      setSuccessMessage("Projects data refreshed successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setTimeout(() => setRefreshing(false), 800);
    }
  };

  // Get all unique technologies from projects
  const technologies = useMemo(() => {
    const techSet = new Set();
    projects.forEach(project => {
      project.technologies.forEach(tech => {
        techSet.add(tech);
      });
    });
    return ["all", ...Array.from(techSet)];
  }, [projects]);

  // Filter projects based on search term and technology filter
  const filteredProjects = useMemo(() => {
    return projects
      .filter(project => {
        // Search filter
        const searchMatch =
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase());

        // Technology filter
        const techMatch = filterTech === "all" || project.technologies.includes(filterTech);

        return searchMatch && techMatch;
      })
      .sort((a, b) => {
        if (!sortConfig) return 0;

        if (sortConfig.key === 'title' || sortConfig.key === 'description') {
          const aValue = a[sortConfig.key].toLowerCase();
          const bValue = b[sortConfig.key].toLowerCase();

          if (sortConfig.direction === 'ascending') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        }

        if (sortConfig.key === 'techCount') {
          const aValue = a.technologies.length;
          const bValue = b.technologies.length;

          if (sortConfig.direction === 'ascending') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        }

        return 0;
      });
  }, [projects, searchTerm, filterTech, sortConfig]);

  // Handle select all
  useEffect(() => {
    if (selectAll) {
      setSelectedProjects(filteredProjects.map(project => project._id));
    } else {
      setSelectedProjects([]);
    }
  }, [selectAll, filteredProjects]);

  // Format technologies for display
  const formatTechnologies = (technologies) => {
    if (typeof technologies === 'string') {
      return technologies.split(',').map(t => t.trim());
    }
    return technologies;
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
          <h2 className="text-xl font-semibold text-gray-800">Projects Management</h2>
          <p className="text-sm text-gray-500 mt-1">Showcase your portfolio projects</p>
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
            <span>Add Project</span>
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
          {/* Technology Filter Dropdown */}
          <div className="relative">
            <div className="flex items-center">
              <Filter className="h-4 w-4 text-gray-400 absolute left-3" />
              <select
                value={filterTech}
                onChange={(e) => setFilterTech(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[150px]"
              >
                {technologies.map(tech => (
                  <option key={tech} value={tech}>
                    {tech === 'all' ? 'All Technologies' : tech}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search projects..."
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
          {selectedProjects.length > 0 && (
            <div className="flex items-center bg-indigo-50 px-3 py-1.5 rounded-lg text-sm">
              <span className="font-medium text-indigo-700 mr-2">{selectedProjects.length} selected</span>
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

      {/* Projects Content */}
      {loading && !refreshing ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
          <span className="ml-3 text-sm font-medium text-indigo-500">Loading projects...</span>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
          <Layers className="h-10 w-10 text-gray-400 mb-2" />
          <h3 className="text-lg font-medium text-gray-800 mb-1">No projects found</h3>
          <p className="text-gray-500 text-sm">
            {searchTerm
              ? `No results matching "${searchTerm}"`
              : filterTech !== 'all'
                ? `No projects using "${filterTech}"`
                : "There are no projects to display"
            }
          </p>
          {(searchTerm || filterTech !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterTech("all");
              }}
              className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project._id}
              className={`bg-white rounded-lg shadow-sm border overflow-hidden transition-all duration-200 ${selectedProjects.includes(project._id) ? 'ring-2 ring-indigo-500' : 'hover:shadow-md'
                }`}
              variants={itemVariants}
            >
              <div className="relative">
                {/* Selection Checkbox */}
                <div className="absolute top-2 left-2 z-10">
                  <input
                    type="checkbox"
                    checked={selectedProjects.includes(project._id)}
                    onChange={() => {
                      if (selectedProjects.includes(project._id)) {
                        setSelectedProjects(selectedProjects.filter(id => id !== project._id));
                      } else {
                        setSelectedProjects([...selectedProjects, project._id]);
                      }
                    }}
                    className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                </div>

                {/* Project Image */}
                <div className="h-48 bg-gray-100 relative overflow-hidden">
                  {project.imageUrl ? (
                    <>
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <button
                        onClick={() => setPreviewImage(project.imageUrl)}
                        className="absolute bottom-2 right-2 p-1.5 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Image className="h-10 w-10 text-gray-300" />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {formatTechnologies(project.technologies).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-100 flex items-center"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links and Actions */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-1" />
                        <span>Demo</span>
                      </a>
                    )}

                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
                      >
                        <Github className="h-3.5 w-3.5 mr-1" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingProject(project._id);
                        setEditProject({
                          title: project.title,
                          description: project.description,
                          imageUrl: project.imageUrl,
                          technologies: project.technologies,
                          demoLink: project.demoLink,
                          codeLink: project.codeLink,
                          problem: project.problem || "",
                          challenges: project.challenges || [],
                          decisions: project.decisions || [],
                          impact: project.impact || "",
                        });
                      }}
                      className="p-1.5 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    <button
                      onClick={() => setConfirmDeleteId(project._id)}
                      className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {filteredProjects.length > 0 && (
        <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-sm text-gray-500">
            Showing {filteredProjects.length} of {projects.length} projects
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

      {/* Add Project Modal */}
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
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full relative z-50"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="bg-indigo-600 px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium leading-6 text-white">Add New Project</h3>
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
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Project Title</label>
                      <input
                        type="text"
                        id="title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="My Awesome Project"
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        id="description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="A brief description of your project"
                      />
                    </div>

                    <div>
                      <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                      <input
                        type="text"
                        id="imageUrl"
                        value={newProject.imageUrl}
                        onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="https://example.com/image.jpg"
                      />
                      {newProject.imageUrl && (
                        <div className="mt-2 relative h-32 bg-gray-100 rounded-md overflow-hidden">
                          <img src={newProject.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="technologies" className="block text-sm font-medium text-gray-700">
                        Technologies (comma separated)
                      </label>
                      <input
                        type="text"
                        id="technologies"
                        value={Array.isArray(newProject.technologies) ? newProject.technologies.join(", ") : newProject.technologies}
                        onChange={(e) => setNewProject({
                          ...newProject,
                          technologies: e.target.value.split(",").map((tech) => tech.trim())
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        placeholder="React, Node.js, MongoDB"
                      />

                      {/* Preview of the tech tags */}
                      {Array.isArray(newProject.technologies) && newProject.technologies.length > 0 && newProject.technologies[0] !== "" && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {newProject.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-100 flex items-center"
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="demoLink" className="block text-sm font-medium text-gray-700">Demo Link</label>
                        <input
                          type="text"
                          id="demoLink"
                          value={newProject.demoLink}
                          onChange={(e) => setNewProject({ ...newProject, demoLink: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                          placeholder="https://mydemo.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="codeLink" className="block text-sm font-medium text-gray-700">Code Link</label>
                        <input
                          type="text"
                          id="codeLink"
                          value={newProject.codeLink}
                          onChange={(e) => setNewProject({ ...newProject, codeLink: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                          placeholder="https://github.com/me/project"
                        />
                      </div>
                    </div>

                    {/* Engineering Depth Section */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Engineering Details (Optional)</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="problem" className="block text-sm font-medium text-gray-700">Problem Statement</label>
                          <textarea
                            id="problem"
                            value={newProject.problem}
                            onChange={(e) => setNewProject({ ...newProject, problem: e.target.value })}
                            rows={2}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            placeholder="What problem does this project solve?"
                          />
                        </div>

                        <div>
                          <label htmlFor="challenges" className="block text-sm font-medium text-gray-700">
                            Technical Challenges (comma separated)
                          </label>
                          <textarea
                            id="challenges"
                            value={Array.isArray(newProject.challenges) ? newProject.challenges.join(", ") : newProject.challenges}
                            onChange={(e) => setNewProject({
                              ...newProject,
                              challenges: e.target.value.split(",").map((challenge) => challenge.trim())
                            })}
                            rows={2}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Challenge 1, Challenge 2, Challenge 3"
                          />
                        </div>

                        <div>
                          <label htmlFor="decisions" className="block text-sm font-medium text-gray-700">
                            Technical Decisions (comma separated)
                          </label>
                          <textarea
                            id="decisions"
                            value={Array.isArray(newProject.decisions) ? newProject.decisions.join(", ") : newProject.decisions}
                            onChange={(e) => setNewProject({
                              ...newProject,
                              decisions: e.target.value.split(",").map((decision) => decision.trim())
                            })}
                            rows={2}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Decision 1, Decision 2, Decision 3"
                          />
                        </div>

                        <div>
                          <label htmlFor="impact" className="block text-sm font-medium text-gray-700">Impact & Results</label>
                          <textarea
                            id="impact"
                            value={newProject.impact}
                            onChange={(e) => setNewProject({ ...newProject, impact: e.target.value })}
                            rows={2}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            placeholder="What impact did this project have?"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-indigo-50 p-4 rounded-md">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <Info className="h-5 w-5 text-indigo-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-indigo-800">Project Tips</h3>
                          <div className="mt-1 text-xs text-indigo-700">
                            <p className="mb-1">• Use high-quality images for better presentation</p>
                            <p className="mb-1">• Provide clear descriptions that highlight key features</p>
                            <p>• Tag all technologies used to improve discoverability</p>
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
                    onClick={handleAddProject}
                  >
                    Add Project
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

      {/* Edit Project Modal */}
      <AnimatePresence>
        {editingProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-gray-500/70 bg-opacity-75 transition-opacity z-40"
              aria-hidden="true"
              onClick={() => setEditingProject(null)}
            />

            {/* Modal container */}
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block">
              <motion.div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full relative z-50"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Header */}
                <div className="bg-indigo-600 px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium leading-6 text-white">Edit Project</h3>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="bg-indigo-500 rounded-md p-1 text-indigo-200 hover:text-white focus:outline-none"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">Project Title</label>
                      <input
                        type="text"
                        id="edit-title"
                        value={editProject.title || ""}
                        onChange={(e) => setEditProject({ ...editProject, title: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        id="edit-description"
                        value={editProject.description || ""}
                        onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="edit-imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                      <input
                        type="text"
                        id="edit-imageUrl"
                        value={editProject.imageUrl || ""}
                        onChange={(e) => setEditProject({ ...editProject, imageUrl: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                      />
                      {editProject.imageUrl && (
                        <div className="mt-2 relative h-32 bg-gray-100 rounded-md overflow-hidden">
                          <img src={editProject.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="edit-technologies" className="block text-sm font-medium text-gray-700">
                        Technologies (comma separated)
                      </label>
                      <input
                        type="text"
                        id="edit-technologies"
                        value={
                          Array.isArray(editProject.technologies)
                            ? editProject.technologies.join(", ")
                            : editProject.technologies || ""
                        }
                        onChange={(e) =>
                          setEditProject({
                            ...editProject,
                            technologies: e.target.value.split(",").map((tech) => tech.trim())
                          })
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                      />
                      {Array.isArray(editProject.technologies) && editProject.technologies.length > 0 && editProject.technologies[0] !== "" && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {editProject.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-100 flex items-center"
                            >
                              <Tag className="h-3 w-3 mr-1" />
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="edit-demoLink" className="block text-sm font-medium text-gray-700">Demo Link</label>
                        <input
                          type="text"
                          id="edit-demoLink"
                          value={editProject.demoLink || ""}
                          onChange={(e) => setEditProject({ ...editProject, demoLink: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="edit-codeLink" className="block text-sm font-medium text-gray-700">Code Link</label>
                        <input
                          type="text"
                          id="edit-codeLink"
                          value={editProject.codeLink || ""}
                          onChange={(e) => setEditProject({ ...editProject, codeLink: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* Engineering Depth Section */}
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Engineering Details (Optional)</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="edit-problem" className="block text-sm font-medium text-gray-700">Problem Statement</label>
                          <textarea
                            id="edit-problem"
                            value={editProject.problem || ""}
                            onChange={(e) => setEditProject({ ...editProject, problem: e.target.value })}
                            rows={2}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            placeholder="What problem does this project solve?"
                          />
                        </div>

                        <div>
                          <label htmlFor="edit-challenges" className="block text-sm font-medium text-gray-700">
                            Technical Challenges (comma separated)
                          </label>
                          <textarea
                            id="edit-challenges"
                            value={Array.isArray(editProject.challenges) ? editProject.challenges.join(", ") : editProject.challenges || ""}
                            onChange={(e) => setEditProject({
                              ...editProject,
                              challenges: e.target.value.split(",").map((challenge) => challenge.trim())
                            })}
                            rows={2}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Challenge 1, Challenge 2, Challenge 3"
                          />
                        </div>

                        <div>
                          <label htmlFor="edit-decisions" className="block text-sm font-medium text-gray-700">
                            Technical Decisions (comma separated)
                          </label>
                          <textarea
                            id="edit-decisions"
                            value={Array.isArray(editProject.decisions) ? editProject.decisions.join(", ") : editProject.decisions || ""}
                            onChange={(e) => setEditProject({
                              ...editProject,
                              decisions: e.target.value.split(",").map((decision) => decision.trim())
                            })}
                            rows={2}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Decision 1, Decision 2, Decision 3"
                          />
                        </div>

                        <div>
                          <label htmlFor="edit-impact" className="block text-sm font-medium text-gray-700">Impact & Results</label>
                          <textarea
                            id="edit-impact"
                            value={editProject.impact || ""}
                            onChange={(e) => setEditProject({ ...editProject, impact: e.target.value })}
                            rows={2}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                            placeholder="What impact did this project have?"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleUpdateProject}
                  >
                    Update Project
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setEditingProject(null)}
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
              onClick={() => setConfirmDeleteId(null)}
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
                      Delete Project
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this project? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleDeleteProject(confirmDeleteId)}
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
                      Delete Multiple Projects
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete {selectedProjects.length} projects? This action cannot be undone.
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
    </div>
  );
};

export default Projects;