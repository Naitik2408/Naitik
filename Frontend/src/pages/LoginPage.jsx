import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Mail, Lock, Eye, EyeOff, AlertCircle, Shield, Settings, Plus, Edit3 } from 'lucide-react';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { login, clearError, selectAuth } from '../Redux/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector(selectAuth);
  const navigate = useNavigate();

  // If user is already authenticated, redirect to home page
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Clear any previous errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Dispatch login action
    dispatch(login({ email, password }));
    
    // If "remember me" is not checked, we could handle token expiration
    // Since we can't directly modify localStorage expiration,
    // this would typically be handled through the JWT expiration time
    // on the server, but we can log it for now
    if (!rememberMe) {
      console.log('Remember me not checked - token would expire with session');
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background elements inspired by HomePage */}
      <div className="hidden md:block fixed inset-0 homepage-background"></div>
      <div className="hidden md:block fixed inset-0 homepage-grid-overlay"></div>
      <div className="hidden md:block fixed homepage-glow glow-cyan top-1/4 left-1/4"></div>
      <div className="hidden md:block fixed homepage-glow glow-fuchsia bottom-1/3 right-1/4"></div>
      <div className="hidden md:block fixed homepage-glow glow-blue top-2/3 left-1/3"></div>
      
      <Header />
      
      <div className="relative z-10 flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full">
          {/* Main container with left-right layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Left side - Admin Instructions */}
            <div className="space-y-6">
              <div className="backdrop-blur-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-8">
                <div className="flex items-start space-x-4">
                  <Shield className="h-8 w-8 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Admin Access Only</h3>
                    <p className="text-slate-300 text-base mb-6 leading-relaxed">
                      This login portal is currently reserved for administrators to manage portfolio content and settings.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white mb-3">What you can do as an admin:</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                          <Plus className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Add New Content</p>
                            <p className="text-slate-400 text-sm">Create new projects, add skills, and expand your portfolio</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                          <Edit3 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Edit Existing Content</p>
                            <p className="text-slate-400 text-sm">Update project details, modify descriptions, and refine content</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                          <Settings className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Manage Settings</p>
                            <p className="text-slate-400 text-sm">Configure portfolio settings, themes, and preferences</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-lg border border-indigo-500/30">
                      <p className="text-slate-200 text-sm">
                        <strong>Note:</strong> Regular visitors can explore the portfolio freely without logging in. 
                        This admin panel is only for content management purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Return to portfolio link */}
              <div className="text-center lg:text-left">
                <p className="text-slate-400 text-sm">
                  Want to explore the portfolio instead?{' '}
                  <Link to="/" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                    Return to home page
                  </Link>
                </p>
              </div>
            </div>

            {/* Right side - Login Form */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Admin Portal</h2>
                <p className="text-slate-300">
                  Don't have admin access?{' '}
                  <Link to="/signup" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                    Request access
                  </Link>
                </p>
              </div>
              
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0" />
                    <p className="text-sm text-red-200">{error}</p>
                  </div>
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
                      Email address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                        placeholder="admin@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-12 w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                        placeholder="••••••••"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-slate-400 hover:text-white focus:outline-none transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="h-4 w-4 text-cyan-500 focus:ring-cyan-500/50 border-white/20 rounded bg-white/10"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                      Remember me
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500/50 transition-all shadow-lg ${
                      loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Access Admin Panel <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    )}
                  </button>
                </div>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-transparent text-slate-400">Alternative access methods</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'Google', icon: '🔍' },
                    { name: 'GitHub', icon: '⚡' },
                    { name: 'LinkedIn', icon: '💼' }
                  ].map((provider) => (
                    <button
                      key={provider.name}
                      type="button"
                      className="inline-flex justify-center items-center py-3 px-4 backdrop-blur-md bg-white/5 border border-white/20 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                    >
                      <span className="mr-2">{provider.icon}</span>
                      {provider.name}
                    </button>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />

      {/* Add the same CSS styles from HomePage */}
      <style jsx>{`
        .homepage-background {
          background: radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120, 119, 198, 0.3), transparent),
                      radial-gradient(ellipse 80% 80% at 80% 50%, rgba(255, 255, 255, 0.1), transparent),
                      radial-gradient(ellipse 80% 80% at 0% 50%, rgba(120, 119, 198, 0.15), transparent);
          background-color: #0f172a;
        }
        
        .homepage-grid-overlay {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .homepage-glow {
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.3;
          animation: pulse 4s ease-in-out infinite alternate;
        }
        
        .glow-cyan {
          background: radial-gradient(circle, #22d3ee 0%, transparent 70%);
        }
        
        .glow-fuchsia {
          background: radial-gradient(circle, #a855f7 0%, transparent 70%);
        }
        
        .glow-blue {
          background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
        }
        
        @keyframes pulse {
          0% {
            opacity: 0.2;
            transform: scale(1);
          }
          100% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }
        
        /* Add backdrop blur support for older browsers */
        @supports not (backdrop-filter: blur(12px)) {
          .backdrop-blur-xl {
            background-color: rgba(15, 23, 42, 0.8);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;