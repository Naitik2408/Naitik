import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Save, RefreshCw, CheckCircle, AlertTriangle, Mail, Phone, MapPin, 
  Linkedin, Github as GitHub, Twitter, Globe, Moon, Sun, 
  Image as ImageIcon
} from "lucide-react";
import { useAppSelector } from "../../Redux/hooks";
import { selectAuth } from "../../Redux/authSlice";

const Settings = () => {
  const { token } = useAppSelector(selectAuth);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteTitle: "",
    metaDescription: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    twitter: "",
    logoUrl: "",
    faviconUrl: "",
    accentColor: "#4f46e5", // indigo-600
    darkMode: false,
    enableNotifications: true
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Fetch settings data from the backend
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setRefreshing(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/settings`);

      if (!response.ok) {
        throw new Error("Failed to fetch settings");
      }

      const data = await response.json();
      setSettings({
        siteTitle: data.siteTitle || "",
        metaDescription: data.metaDescription || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        linkedin: data.linkedin || "",
        github: data.github || "",
        twitter: data.twitter || "",
        logoUrl: data.logoUrl || "",
        faviconUrl: data.faviconUrl || "",
        accentColor: data.accentColor || "#4f46e5",
        darkMode: data.darkMode || false,
        enableNotifications: data.enableNotifications !== undefined ? data.enableNotifications : true
      });
      setUnsavedChanges(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setRefreshing(false), 600);
    }
  };

  // Handle save settings
  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to save settings");
      }

      setSuccessMessage("Settings updated successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
      setUnsavedChanges(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
    
    setUnsavedChanges(true);
  };

  // Handle checkbox change
  const handleCheckboxChange = (name, checked) => {
    setSettings(prev => ({
      ...prev,
      [name]: checked
    }));
    
    setUnsavedChanges(true);
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3
      } 
    },
    exit: { 
      opacity: 0,
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
          <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Configure your portfolio website settings</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSettings}
            className={`p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 ${
              refreshing ? 'animate-spin text-indigo-600' : ''
            }`}
            disabled={refreshing}
          >
            <RefreshCw className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleSaveSettings}
            disabled={saving || !unsavedChanges}
            className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed`}
          >
            <Save className="h-4 w-4" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
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

      {loading ? (
        <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
          <span className="ml-3 text-sm font-medium text-indigo-500">Loading settings...</span>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('general')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'general' 
                    ? 'border-b-2 border-indigo-500 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Globe className="inline-block h-4 w-4 mr-2" />
                General
              </button>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'appearance' 
                    ? 'border-b-2 border-indigo-500 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <ImageIcon className="inline-block h-4 w-4 mr-2" />
                Appearance
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'contact' 
                    ? 'border-b-2 border-indigo-500 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Mail className="inline-block h-4 w-4 mr-2" />
                Contact
              </button>
              <button
                onClick={() => setActiveTab('social')}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'social' 
                    ? 'border-b-2 border-indigo-500 text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Linkedin className="inline-block h-4 w-4 mr-2" />
                Social Media
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'general' && (
                <motion.div 
                  key="general"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
                    <p className="text-sm text-gray-500 mb-6">
                      Configure the basic information for your portfolio website.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="siteTitle" className="block text-sm font-medium text-gray-700 mb-1">
                        Site Title
                      </label>
                      <div className="relative">
                        <Globe className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          id="siteTitle"
                          name="siteTitle"
                          value={settings.siteTitle}
                          onChange={handleInputChange}
                          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          placeholder="My Portfolio"
                        />
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        The main title of your website, displayed in the browser tab.
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-1">
                        Meta Description
                      </label>
                      <textarea
                        id="metaDescription"
                        name="metaDescription"
                        value={settings.metaDescription}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="A brief description of your portfolio for search engines"
                      />
                      <p className="mt-1 text-sm text-gray-500">
                        This description appears in search engine results. Aim for 150-160 characters.
                      </p>
                    </div>
                    
                    <div className="flex items-center pt-3">
                      <div className="flex items-center h-5">
                        <input
                          id="enableNotifications"
                          name="enableNotifications"
                          type="checkbox"
                          checked={settings.enableNotifications}
                          onChange={(e) => handleCheckboxChange('enableNotifications', e.target.checked)}
                          className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="enableNotifications" className="text-sm font-medium text-gray-700">
                          Enable email notifications
                        </label>
                        <p className="text-sm text-gray-500">
                          Receive email notifications when someone contacts you through the form.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'appearance' && (
                <motion.div 
                  key="appearance"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Appearance settings content - removed TypeScript type annotations */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Appearance Settings</h3>
                    <p className="text-sm text-gray-500 mb-6">
                      Customize how your portfolio website looks.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                        Logo URL
                      </label>
                      <div className="relative">
                        <ImageIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          id="logoUrl"
                          name="logoUrl"
                          value={settings.logoUrl}
                          onChange={handleInputChange}
                          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          placeholder="https://example.com/logo.png"
                        />
                      </div>
                      {settings.logoUrl && (
                        <div className="mt-2 flex items-center">
                          <div className="h-12 w-12 rounded border border-gray-200 overflow-hidden">
                            <img src={settings.logoUrl} alt="Logo preview" className="h-full w-full object-contain" />
                          </div>
                          <span className="ml-2 text-xs text-gray-500">Logo preview</span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="faviconUrl" className="block text-sm font-medium text-gray-700 mb-1">
                        Favicon URL
                      </label>
                      <div className="relative">
                        <ImageIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          id="faviconUrl"
                          name="faviconUrl"
                          value={settings.faviconUrl}
                          onChange={handleInputChange}
                          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          placeholder="https://example.com/favicon.ico"
                        />
                      </div>
                      {settings.faviconUrl && (
                        <div className="mt-2 flex items-center">
                          <div className="h-6 w-6 rounded border border-gray-200 overflow-hidden">
                            <img src={settings.faviconUrl} alt="Favicon preview" className="h-full w-full object-contain" />
                          </div>
                          <span className="ml-2 text-xs text-gray-500">Favicon preview</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700 mb-1">
                      Accent Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id="accentColor"
                        name="accentColor"
                        value={settings.accentColor}
                        onChange={handleInputChange}
                        className="h-10 w-10 border-0 p-0 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.accentColor}
                        onChange={handleInputChange}
                        name="accentColor"
                        className="w-32 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                      <div 
                        className="w-28 h-10 rounded flex items-center justify-center text-white" 
                        style={{ backgroundColor: settings.accentColor }}
                      >
                        Sample Text
                      </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      This color will be used for buttons, links, and highlights.
                    </p>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <label htmlFor="darkMode" className="text-sm font-medium text-gray-700">
                          Dark Mode
                        </label>
                        <p className="text-sm text-gray-500">
                          Enable dark mode for your portfolio.
                        </p>
                      </div>
                      
                      <div 
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.darkMode ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}
                        onClick={() => handleCheckboxChange('darkMode', !settings.darkMode)}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                        <span className="absolute left-0.5 text-xs pr-7 pl-1">
                          {settings.darkMode ? 
                            <Moon className="h-3 w-3 text-white" /> : 
                            <Sun className="h-3 w-3 text-gray-400" />
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'contact' && (
                <motion.div 
                  key="contact"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Contact settings content - removed TypeScript type annotations */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                    <p className="text-sm text-gray-500 mb-6">
                      Configure how visitors can contact you.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={settings.email}
                          onChange={handleInputChange}
                          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          placeholder="contact@example.com"
                        />
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        This email will be displayed in your contact section.
                      </p>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={settings.phone}
                          onChange={handleInputChange}
                          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          placeholder="+1 (123) 456-7890"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={settings.address}
                          onChange={handleInputChange}
                          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          placeholder="San Francisco, CA"
                        />
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        This address will be displayed in your contact section and can be linked to Google Maps.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'social' && (
                <motion.div 
                  key="social"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Social media settings content - removed TypeScript type annotations */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h3>
                    <p className="text-sm text-gray-500 mb-6">
                      Connect your social media profiles to your portfolio.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn URL
                      </label>
                      <div className="relative">
                        <Linkedin className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          id="linkedin"
                          name="linkedin"
                          value={settings.linkedin}
                          onChange={handleInputChange}
                          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
                        GitHub URL
                      </label>
                      <div className="relative">
                        <GitHub className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          id="github"
                          name="github"
                          value={settings.github}
                          onChange={handleInputChange}
                          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          placeholder="https://github.com/username"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
                        Twitter URL
                      </label>
                      <div className="relative">
                        <Twitter className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          id="twitter"
                          name="twitter"
                          value={settings.twitter}
                          onChange={handleInputChange}
                          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          placeholder="https://twitter.com/username"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700">Social Preview</h4>
                        <p className="text-xs text-gray-500">How your social media links will appear</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        {settings.linkedin && (
                          <a
                            href={settings.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                        )}
                        
                        {settings.github && (
                          <a
                            href={settings.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                          >
                            <GitHub className="h-5 w-5" />
                          </a>
                        )}
                        
                        {settings.twitter && (
                          <a
                            href={settings.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                          >
                            <Twitter className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Action Buttons */}
            <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end">
              {unsavedChanges && (
                <div className="mr-auto">
                  <span className="text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    You have unsaved changes
                  </span>
                </div>
              )}
              
              <div className="flex space-x-3">
                <button
                  onClick={fetchSettings}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  Reset
                </button>
                
                <button
                  onClick={handleSaveSettings}
                  disabled={saving || !unsavedChanges}
                  className={`px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:hover:bg-indigo-600 disabled:cursor-not-allowed`}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;