import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit, Trash2, Check, X, Search, Filter, ChevronDown, Download,
  RefreshCw, CheckCircle, AlertTriangle, Code, Server, Database,
  Ruler as Tool, Globe, PlusCircle, Cpu, BarChart2
} from "lucide-react";
import { useAppSelector } from "../../Redux/hooks";
import { selectAuth } from "../../Redux/authSlice";

const Skills = () => {
  const { token } = useAppSelector(selectAuth);
  const [skills, setSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editSkill, setEditSkill] = useState({});
  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "frontend",
    proficiency: 70,
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending"
  });

  // Category icon mapping
  const categoryIcons = {
    "frontend": Code,
    "backend": Server,
    "database": Database,
    "devops": Cpu,
    "tools": Tool,
    "other": Globe
  };

  // Fetch skills from the backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio`);
        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }
        const data = await response.json();
        setSkills(data.skills || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Add a new skill
  const handleAddSkill = async () => {
    if (!newSkill.name || !newSkill.category || newSkill.proficiency === undefined) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/skill`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSkill),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add skill");
      }

      const createdSkill = await response.json();
      setSkills([...skills, createdSkill]);
      setShowAddModal(false);

      // Reset form
      setNewSkill({
        name: "",
        category: "frontend",
        proficiency: 70,
      });

      setSuccessMessage("Skill added successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update a skill
  const handleUpdateSkill = async () => {
    if (!editingSkill) return;

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/skill/${editingSkill}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editSkill),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update skill");
      }

      const updatedSkill = await response.json();
      setSkills(skills.map(skill => skill._id === editingSkill ? updatedSkill : skill));
      setEditingSkill(null);

      setSuccessMessage("Skill updated successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a skill
  const handleDeleteSkill = async (skillId) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/skill/${skillId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete skill");
      }

      setSkills(skills.filter((skill) => skill._id !== skillId));
      setConfirmDeleteId(null);

      setSuccessMessage("Skill deleted successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedSkills.length} skills?`)) return;

    try {
      // In a real app, you'd have a bulk delete endpoint
      // For now, we'll simulate it with multiple single deletes
      for (const skillId of selectedSkills) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/portfolio/skill/${skillId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setSkills(skills.filter(skill => !selectedSkills.includes(skill._id)));
      setSuccessMessage(`${selectedSkills.length} skills deleted successfully`);
      setTimeout(() => setSuccessMessage(null), 3000);
      setSelectedSkills([]);
      setSelectAll(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await fetch("${import.meta.env.VITE_API_URL}/api/portfolio");
      if (!response.ok) {
        throw new Error("Failed to fetch skills");
      }
      const data = await response.json();
      setSkills(data.skills || []);

      setSuccessMessage("Skills data refreshed successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setTimeout(() => setRefreshing(false), 800);
    }
  };

  // Get unique categories from skills
  const categories = useMemo(() => {
    const uniqueCategories = new Set(skills.map(skill => skill.category));
    return ["all", ...Array.from(uniqueCategories)];
  }, [skills]);

  // Filter skills based on search term and category filter
  const filteredSkills = useMemo(() => {
    return skills
      .filter(skill => {
        // Search filter
        const searchMatch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());

        // Category filter
        const categoryMatch = filterCategory === "all" || skill.category === filterCategory;

        return searchMatch && categoryMatch;
      })
      .sort((a, b) => {
        if (!sortConfig) return 0;

        if (sortConfig.key === 'name' || sortConfig.key === 'category') {
          const aValue = a[sortConfig.key].toLowerCase();
          const bValue = b[sortConfig.key].toLowerCase();

          if (sortConfig.direction === 'ascending') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        }

        if (sortConfig.key === 'proficiency') {
          const aValue = a[sortConfig.key];
          const bValue = b[sortConfig.key];

          if (sortConfig.direction === 'ascending') {
            return aValue - bValue;
          } else {
            return bValue - aValue;
          }
        }

        return 0;
      });
  }, [skills, searchTerm, filterCategory, sortConfig]);

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
      setSelectedSkills(filteredSkills.map(skill => skill._id));
    } else {
      setSelectedSkills([]);
    }
  }, [selectAll, filteredSkills]);

  // Get category color class
  const getCategoryColor = (category) => {
    switch (category) {
      case 'frontend':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'backend':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'database':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'devops':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'tools':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get proficiency bar color based on level
  const getProficiencyColor = (proficiency) => {
    if (proficiency >= 90) return 'bg-green-500';
    if (proficiency >= 70) return 'bg-emerald-500';
    if (proficiency >= 50) return 'bg-blue-500';
    if (proficiency >= 30) return 'bg-yellow-500';
    return 'bg-red-500';
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
          <h2 className="text-xl font-semibold text-gray-800">Skills Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your technical skills and proficiency levels</p>
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
            <span>Add Skill</span>
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
          {/* Category Filter Dropdown */}
          <div className="relative">
            <div className="flex items-center">
              <Filter className="h-4 w-4 text-gray-400 absolute left-3" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[150px]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
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
              placeholder="Search skills..."
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
          {selectedSkills.length > 0 && (
            <div className="flex items-center bg-indigo-50 px-3 py-1.5 rounded-lg text-sm">
              <span className="font-medium text-indigo-700 mr-2">{selectedSkills.length} selected</span>
              <button
                onClick={handleBulkDelete}
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

      {/* Skills Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
          <span className="ml-3 text-sm font-medium text-indigo-500">Loading skills...</span>
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
          <BarChart2 className="h-10 w-10 text-gray-400 mb-2" />
          <h3 className="text-lg font-medium text-gray-800 mb-1">No skills found</h3>
          <p className="text-gray-500 text-sm">
            {searchTerm
              ? `No results matching "${searchTerm}"`
              : filterCategory !== 'all'
                ? `No skills in the "${filterCategory}" category`
                : "There are no skills to display"
            }
          </p>
          {(searchTerm || filterCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("all");
              }}
              className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="pl-5 py-3 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={() => setSelectAll(!selectAll)}
                        className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                    </div>
                  </th>
                  <th
                    className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('name')}
                  >
                    <div className="flex items-center">
                      <span>Skill Name</span>
                      {sortConfig?.key === 'name' && (
                        <ChevronDown
                          className={`h-4 w-4 ml-1 transition-transform ${sortConfig.direction === 'descending' ? 'rotate-180' : ''
                            }`}
                        />
                      )}
                    </div>
                  </th>
                  <th
                    className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('category')}
                  >
                    <div className="flex items-center">
                      <span>Category</span>
                      {sortConfig?.key === 'category' && (
                        <ChevronDown
                          className={`h-4 w-4 ml-1 transition-transform ${sortConfig.direction === 'descending' ? 'rotate-180' : ''
                            }`}
                        />
                      )}
                    </div>
                  </th>
                  <th
                    className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('proficiency')}
                  >
                    <div className="flex items-center">
                      <span>Proficiency</span>
                      {sortConfig?.key === 'proficiency' && (
                        <ChevronDown
                          className={`h-4 w-4 ml-1 transition-transform ${sortConfig.direction === 'descending' ? 'rotate-180' : ''
                            }`}
                        />
                      )}
                    </div>
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <motion.tbody
                className="bg-white divide-y divide-gray-200"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredSkills.map((skill) => {
                  const CategoryIcon = categoryIcons[skill.category] || Globe;

                  return (
                    <motion.tr
                      key={skill._id}
                      variants={itemVariants}
                      className={`${selectedSkills.includes(skill._id) ? 'bg-indigo-50' : 'hover:bg-gray-50'
                        } transition-colors`}
                    >
                      <td className="pl-5 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill._id)}
                          onChange={() => {
                            if (selectedSkills.includes(skill._id)) {
                              setSelectedSkills(selectedSkills.filter(id => id !== skill._id));
                            } else {
                              setSelectedSkills([...selectedSkills, skill._id]);
                            }
                          }}
                          className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {editingSkill === skill._id ? (
                          <input
                            type="text"
                            value={editSkill.name || ""}
                            onChange={(e) => setEditSkill({ ...editSkill, name: e.target.value })}
                            className="border rounded-lg px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        ) : (
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{skill.name}</div>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {editingSkill === skill._id ? (
                          <select
                            value={editSkill.category || ""}
                            onChange={(e) => setEditSkill({ ...editSkill, category: e.target.value })}
                            className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="database">Database</option>
                            <option value="devops">DevOps</option>
                            <option value="tools">Tools</option>
                            <option value="other">Other</option>
                          </select>
                        ) : (
                          <div className="flex items-center">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(skill.category)}`}>
                              <CategoryIcon className="h-3.5 w-3.5 mr-1" />
                              {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap">
                        {editingSkill === skill._id ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={editSkill.proficiency || 0}
                              onChange={(e) => setEditSkill({ ...editSkill, proficiency: parseInt(e.target.value) })}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={editSkill.proficiency || 0}
                              onChange={(e) => setEditSkill({ ...editSkill, proficiency: parseInt(e.target.value) })}
                              className="border rounded w-16 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                        ) : (
                          <div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`${getProficiencyColor(skill.proficiency)} h-2 rounded-full transition-all duration-500`}
                                style={{ width: `${skill.proficiency}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {skill.proficiency}%
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {editingSkill === skill._id ? (
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={handleUpdateSkill}
                              className="p-1.5 rounded-md bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-colors"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setEditingSkill(null)}
                              className="p-1.5 rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => {
                                setEditingSkill(skill._id);
                                setEditSkill({
                                  name: skill.name,
                                  category: skill.category,
                                  proficiency: skill.proficiency,
                                });
                              }}
                              className="p-1.5 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(skill._id)}
                              className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </motion.tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-5 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
            <div className="text-sm text-gray-500 mb-3 sm:mb-0">
              Showing {filteredSkills.length} of {skills.length} skills
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
        </div>
      )}

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-[9999] overflow-y-auto">
            {/* Enhanced backdrop with blur effect */}
            <motion.div
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              aria-hidden="true"
            />

            {/* Modal container with improved positioning */}
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <motion.div
                className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-indigo-100 z-[10000]"
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.95, y: 10 }
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300
                }}
              >
                {/* Header with gradient background */}
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <motion.h3
                      className="text-xl font-semibold leading-6 text-white"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      Add New Skill
                    </motion.h3>
                    <motion.button
                      whileHover={{ rotate: 90, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowAddModal(false)}
                      className="rounded-full p-1.5 bg-white/10 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Form content with staggered animation */}
                <div className="bg-white px-6 py-6">
                  <motion.div
                    className="space-y-6"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    {/* Skill name input */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Skill Name</label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Code className="h-4 w-4 text-indigo-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          value={newSkill.name}
                          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                          className="pl-10 block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                          placeholder="e.g. React, Node.js, MongoDB"
                        />
                      </div>
                    </motion.div>

                    {/* Category select */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          {newSkill.category && categoryIcons[newSkill.category] ?
                            React.createElement(categoryIcons[newSkill.category], { className: "h-4 w-4 text-indigo-400" }) :
                            <Filter className="h-4 w-4 text-indigo-400" />
                          }
                        </div>
                        <select
                          id="category"
                          value={newSkill.category}
                          onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                          className="pl-10 block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="frontend">Frontend</option>
                          <option value="backend">Backend</option>
                          <option value="database">Database</option>
                          <option value="devops">DevOps</option>
                          <option value="tools">Tools</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </motion.div>

                    {/* Proficiency slider with enhanced UI */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="proficiency" className="block text-sm font-medium text-gray-700">
                          Proficiency Level
                        </label>
                        <span className={`
  inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
  ${(newSkill.proficiency ?? 0) >= 90 ? 'bg-green-100 text-green-800' :
                            (newSkill.proficiency ?? 0) >= 70 ? 'bg-emerald-100 text-emerald-800' :
                              (newSkill.proficiency ?? 0) >= 50 ? 'bg-blue-100 text-blue-800' :
                                (newSkill.proficiency ?? 0) >= 30 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'}`
                        }>
                          {newSkill.proficiency ?? 0}%
                        </span>
                      </div>
                      <div className="mt-3 flex items-center space-x-3">
                        <input
                          type="range"
                          id="proficiency"
                          min="0"
                          max="100"
                          value={newSkill.proficiency}
                          onChange={(e) => setNewSkill({ ...newSkill, proficiency: parseInt(e.target.value) })}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-600"
                        />
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={newSkill.proficiency}
                          onChange={(e) => setNewSkill({ ...newSkill, proficiency: parseInt(e.target.value) })}
                          className="w-16 rounded-md border-0 py-1.5 text-center shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm"
                        />
                      </div>

                      {/* Animated progress bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3.5 overflow-hidden">
                        <motion.div
                          className={`h-2 ${getProficiencyColor(newSkill.proficiency || 0)} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${newSkill.proficiency}%` }}
                          transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                        />
                      </div>

                      {/* Labels under the progress bar */}
                      <div className="flex justify-between mt-1 text-xs text-gray-500">
                        <span>Beginner</span>
                        <span>Intermediate</span>
                        <span>Expert</span>
                      </div>
                    </motion.div>

                    {/* Proficiency guide with icon animation */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                    >
                      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
                        <div className="flex items-start">
                          <motion.div
                            className="flex-shrink-0"
                            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                            transition={{ duration: 1, delay: 0.5 }}
                          >
                            <AlertTriangle className="h-5 w-5 text-indigo-500" />
                          </motion.div>
                          <div className="ml-3">
                            <h3 className="text-sm font-semibold text-indigo-800">Proficiency Guide</h3>
                            <div className="mt-1.5 text-xs text-indigo-700 space-y-1.5">
                              <p className="flex items-center">
                                <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5" />
                                90-100%: Expert level mastery
                              </p>
                              <p className="flex items-center">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5" />
                                70-89%: Advanced knowledge and experience
                              </p>
                              <p className="flex items-center">
                                <span className="h-2 w-2 rounded-full bg-blue-500 mr-1.5" />
                                40-69%: Intermediate skills with practical application
                              </p>
                              <p className="flex items-center">
                                <span className="h-2 w-2 rounded-full bg-red-500 mr-1.5" />
                                0-39%: Beginner or basic understanding
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Footer with interactive buttons */}
                <div className="bg-gray-50 px-6 py-4 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="w-full sm:w-auto inline-flex justify-center items-center rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                    onClick={() => setShowAddModal(false)}
                  >
                    <X className="mr-1.5 h-4 w-4 text-gray-500" />
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#4338ca" }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="w-full sm:w-auto inline-flex justify-center items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleAddSkill}
                  >
                    <PlusCircle className="mr-1.5 h-4 w-4" />
                    Add Skill
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirm Delete Modal */}
      <AnimatePresence>
        {confirmDeleteId && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={() => setConfirmDeleteId(null)}
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <motion.div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
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
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Skill</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this skill? This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleDeleteSkill(confirmDeleteId)}
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
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Skills;