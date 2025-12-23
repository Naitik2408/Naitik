import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Edit, Trash2, Check, X, Search, Filter, ChevronDown, Download, 
  UserPlus, RefreshCw, CheckCircle, AlertTriangle, Shield, ShieldAlert, Eye
} from "lucide-react";
import { useAppSelector } from "../../Redux/hooks";
import { selectAuth } from "../../Redux/authSlice";

const Users = () => {
  const { token } = useAppSelector(selectAuth);
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUser, setEditUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ 
    key: "name", 
    direction: "ascending" 
  });
  const [viewUser, setViewUser] = useState(null);

  // Fetch users from the backend
  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Refresh users
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchUsers();
      setSuccessMessage("User data refreshed successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setTimeout(() => setRefreshing(false), 800);
    }
  };

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete user");
      }

      setUsers(users.filter((user) => user._id !== userId));
      setSuccessMessage("User deleted successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
      setConfirmDeleteId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) return;
    
    try {
      // In a real app, you'd have a bulk delete endpoint
      // For now, we'll simulate it with multiple single deletes
      for (const userId of selectedUsers) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      
      setUsers(users.filter((user) => !selectedUsers.includes(user._id)));
      setSuccessMessage(`${selectedUsers.length} users deleted successfully`);
      setTimeout(() => setSuccessMessage(null), 3000);
      setSelectedUsers([]);
      setSelectAll(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle user update
  const handleUpdateUser = async () => {
    if (!editUserId) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users/${editUserId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editUser),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      const updatedUser = await response.json();
      setUsers(users.map((user) => (user._id === editUserId ? updatedUser : user)));
      setEditUserId(null);
      setSuccessMessage("User updated successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle adding a new user
  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email) {
      setError("Name and email are required");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newUser,
          password: "temporary123", // In a real app, you might generate a random password or send an invite
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add user");
      }

      const addedUser = await response.json();
      setUsers([...users, addedUser]);
      setShowAddModal(false);
      setNewUser({
        name: "",
        email: "",
        isAdmin: false,
      });
      setSuccessMessage("User added successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  // Filter users based on search term and role filter
  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => {
        // Search filter
        const searchMatch =
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Role filter
        const roleMatch =
          filterRole === "all" ||
          (filterRole === "admin" && user.isAdmin) ||
          (filterRole === "user" && !user.isAdmin);
        
        return searchMatch && roleMatch;
      })
      .sort((a, b) => {
        if (!sortConfig) return 0;
        
        // Handle string comparisons
        if (typeof a[sortConfig.key] === 'string' && typeof b[sortConfig.key] === 'string') {
          const aValue = a[sortConfig.key].toLowerCase();
          const bValue = b[sortConfig.key].toLowerCase();
          
          if (sortConfig.direction === 'ascending') {
            return aValue.localeCompare(bValue);
          } else {
            return bValue.localeCompare(aValue);
          }
        }
        
        // Handle boolean comparisons
        if (typeof a[sortConfig.key] === 'boolean' && typeof b[sortConfig.key] === 'boolean') {
          const aValue = a[sortConfig.key];
          const bValue = b[sortConfig.key];
          
          if (sortConfig.direction === 'ascending') {
            return aValue === bValue ? 0 : aValue ? 1 : -1;
          } else {
            return aValue === bValue ? 0 : aValue ? -1 : 1;
          }
        }
        
        return 0;
      });
  }, [users, searchTerm, filterRole, sortConfig]);

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
      setSelectedUsers(filteredUsers.map(user => user._id));
    } else {
      setSelectedUsers([]);
    }
  }, [selectAll, filteredUsers]);

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
          <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your users and administrative access</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 ${
              refreshing ? 'animate-spin text-indigo-600' : ''
            }`}
            disabled={refreshing}
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
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
          {/* Role Filter Dropdown */}
          <div className="relative">
            <div className="flex items-center">
              <Filter className="h-4 w-4 text-gray-400 absolute left-3" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[140px]"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admins Only</option>
                <option value="user">Users Only</option>
              </select>
            </div>
          </div>
          
          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search users..."
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
          {selectedUsers.length > 0 && (
            <div className="flex items-center bg-indigo-50 px-3 py-1.5 rounded-lg text-sm">
              <span className="font-medium text-indigo-700 mr-2">{selectedUsers.length} selected</span>
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

      {/* User Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
          <span className="ml-3 text-sm font-medium text-indigo-500">Loading users...</span>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
          <Search className="h-10 w-10 text-gray-400 mb-2" />
          <h3 className="text-lg font-medium text-gray-800 mb-1">No users found</h3>
          <p className="text-gray-500 text-sm">
            {searchTerm ? `No results matching "${searchTerm}"` : "There are no users to display"}
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
                      <span>Name</span>
                      {sortConfig?.key === 'name' && (
                        <ChevronDown 
                          className={`h-4 w-4 ml-1 transition-transform ${
                            sortConfig.direction === 'descending' ? 'rotate-180' : ''
                          }`} 
                        />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('email')}
                  >
                    <div className="flex items-center">
                      <span>Email</span>
                      {sortConfig?.key === 'email' && (
                        <ChevronDown 
                          className={`h-4 w-4 ml-1 transition-transform ${
                            sortConfig.direction === 'descending' ? 'rotate-180' : ''
                          }`} 
                        />
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort('isAdmin')}
                  >
                    <div className="flex items-center">
                      <span>Role</span>
                      {sortConfig?.key === 'isAdmin' && (
                        <ChevronDown 
                          className={`h-4 w-4 ml-1 transition-transform ${
                            sortConfig.direction === 'descending' ? 'rotate-180' : ''
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
                {filteredUsers.map((user) => (
                  <motion.tr 
                    key={user._id} 
                    className={`${
                      selectedUsers.includes(user._id) ? 'bg-indigo-50' : 'hover:bg-gray-50'
                    } transition-colors`}
                    variants={itemVariants}
                  >
                    <td className="pl-5 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => {
                          if (selectedUsers.includes(user._id)) {
                            setSelectedUsers(selectedUsers.filter(id => id !== user._id));
                          } else {
                            setSelectedUsers([...selectedUsers, user._id]);
                          }
                        }}
                        className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                      />
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {editUserId === user._id ? (
                        <input
                          type="text"
                          value={editUser.name || ""}
                          onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                          className="border rounded-lg px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <div className="flex items-center">
                          <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium text-sm">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            {user.createdAt && (
                              <div className="text-xs text-gray-500">
                                Joined {new Date(user.createdAt).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {editUserId === user._id ? (
                        <input
                          type="text"
                          value={editUser.email || ""}
                          onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                          className="border rounded-lg px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <div className="text-sm text-gray-600">{user.email}</div>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      {editUserId === user._id ? (
                        <select
                          value={editUser.isAdmin ? "admin" : "user"}
                          onChange={(e) => setEditUser({ ...editUser, isAdmin: e.target.value === "admin" })}
                          className="border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <div className="flex items-center">
                          {user.isAdmin ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              <ShieldAlert className="h-3.5 w-3.5 mr-1" />
                              Admin
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <Shield className="h-3.5 w-3.5 mr-1" />
                              User
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editUserId === user._id ? (
                        <div className="flex justify-end space-x-2">
                          <button 
                            onClick={handleUpdateUser} 
                            className="p-1.5 rounded-md bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-colors"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => setEditUserId(null)} 
                            className="p-1.5 rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setViewUser(user)}
                            className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditUserId(user._id);
                              setEditUser({
                                name: user.name,
                                email: user.email,
                                isAdmin: user.isAdmin,
                              });
                            }}
                            className="p-1.5 rounded-md bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => setConfirmDeleteId(user._id)} 
                            className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-5 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between">
            <div className="text-sm text-gray-500 mb-3 sm:mb-0">
              Showing {filteredUsers.length} of {users.length} users
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
      
      {/* Add User Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block">
              <div 
                className="fixed inset-0 transition-opacity" 
                aria-hidden="true"
                onClick={() => setShowAddModal(false)}
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
                  <div className="mb-4">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Add New User</h3>
                    <p className="mt-1 text-sm text-gray-500">Create a new user account with specified permissions.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="user@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-700">User Role</label>
                      <select
                        id="role"
                        value={newUser.isAdmin ? "admin" : "user"}
                        onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.value === "admin" })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="user">Regular User</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </div>
                    
                    <div className="bg-yellow-50 p-4 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">Note</h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <p>
                              A temporary password will be generated for this user. In a production environment, 
                              you would likely send an invitation email with a link to set their password.
                            </p>
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
                    onClick={handleAddUser}
                  >
                    Add User
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
      
      {/* View User Modal */}
      <AnimatePresence>
        {viewUser && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block">
              <div 
                className="fixed inset-0 transition-opacity" 
                aria-hidden="true"
                onClick={() => setViewUser(null)}
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
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium leading-6 text-white">User Details</h3>
                    <button 
                      onClick={() => setViewUser(null)}
                      className="bg-indigo-500 rounded-md p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="flex items-center mb-6">
                    <div className="h-14 w-14 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-medium">
                      {viewUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold text-gray-900">{viewUser.name}</h2>
                      <p className="text-indigo-600">{viewUser.email}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-5">
                    <dl>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 items-center py-3">
                        <dt className="text-sm font-medium text-gray-500">User ID</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-mono bg-gray-100 p-2 rounded">{viewUser._id}</dd>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 items-center py-3">
                        <dt className="text-sm font-medium text-gray-500">Role</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {viewUser.isAdmin ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              <ShieldAlert className="h-3.5 w-3.5 mr-1" />
                              Administrator
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              <Shield className="h-3.5 w-3.5 mr-1" />
                              Regular User
                            </span>
                          )}
                        </dd>
                      </div>
                      {viewUser.createdAt && (
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 items-center py-3">
                          <dt className="text-sm font-medium text-gray-500">Joined</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {new Date(viewUser.createdAt).toLocaleDateString()} ({new Date(viewUser.createdAt).toLocaleTimeString()})
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setEditUserId(viewUser._id);
                      setEditUser({
                        name: viewUser.name,
                        email: viewUser.email,
                        isAdmin: viewUser.isAdmin,
                      });
                      setViewUser(null);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit User
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setViewUser(null)}
                  >
                    Close
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
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Delete User</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this user? This action cannot be undone and all 
                          associated data will be permanently removed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleDeleteUser(confirmDeleteId)}
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

export default Users;