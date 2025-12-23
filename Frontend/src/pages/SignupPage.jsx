import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, AlertCircle, Shield, Settings, Plus, Edit3, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear password error when either password field changes
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }

    // Clear field-specific errors when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // Validate name
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      isValid = false;
    }

    // Validate terms agreement
    if (!agreeToTerms) {
      errors.terms = 'You must agree to the terms and conditions';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Registration successful, redirect to login page
      navigate('/login', { state: { registrationSuccess: true } });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
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
            
            {/* Left side - Access Request Instructions */}
            <div className="space-y-6">
              <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-8">
                <div className="flex items-start space-x-4">
                  <UserPlus className="h-8 w-8 text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Request Admin Access</h3>
                    <p className="text-slate-300 text-base mb-6 leading-relaxed">
                      Submit your request to gain administrative access to the portfolio management system.
                    </p>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white mb-3">What happens after you register:</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                          <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Pending Review</p>
                            <p className="text-slate-400 text-sm">Your request will be reviewed by the administrator</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                          <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Security Verification</p>
                            <p className="text-slate-400 text-sm">Additional verification may be required for security</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 border border-white/10">
                          <Settings className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white font-medium">Access Granted</p>
                            <p className="text-slate-400 text-sm">Once approved, you'll receive admin privileges</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-lg border border-indigo-500/30">
                      <p className="text-slate-200 text-sm">
                        <strong>Important:</strong> Admin access is carefully reviewed to maintain portfolio security. 
                        Only legitimate requests will be approved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Return to portfolio link */}
              <div className="text-center lg:text-left">
                <p className="text-slate-400 text-sm">
                  Just want to explore the portfolio?{' '}
                  <Link to="/" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                    Return to home page
                  </Link>
                </p>
              </div>
            </div>

            {/* Right side - Signup Form */}
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Request Access</h2>
                <p className="text-slate-300">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                    Sign in
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
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`pl-10 w-full px-4 py-3 bg-white/10 border ${
                        formErrors.name ? 'border-red-500/50' : 'border-white/20'
                      } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all`}
                      placeholder="John Doe"
                    />
                  </div>
                  {formErrors.name && <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>}
                </div>

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
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-10 w-full px-4 py-3 bg-white/10 border ${
                        formErrors.email ? 'border-red-500/50' : 'border-white/20'
                      } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {formErrors.email && <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>}
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
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className={`pl-10 pr-12 w-full px-4 py-3 bg-white/10 border ${
                        formErrors.password ? 'border-red-500/50' : 'border-white/20'
                      } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all`}
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-slate-400 hover:text-white focus:outline-none transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  {formErrors.password && (
                    <p className="mt-1 text-sm text-red-400">{formErrors.password}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-200 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`pl-10 pr-12 w-full px-4 py-3 bg-white/10 border ${
                        passwordError ? 'border-red-500/50' : 'border-white/20'
                      } rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all`}
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-slate-400 hover:text-white focus:outline-none transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  {passwordError && <p className="mt-1 text-sm text-red-400">{passwordError}</p>}
                </div>

                <div className="flex items-start">
                  <input
                    id="agree-terms"
                    name="agree-terms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={() => setAgreeToTerms(!agreeToTerms)}
                    className={`h-4 w-4 text-cyan-500 focus:ring-cyan-500/50 border-white/20 rounded bg-white/10 mt-0.5 ${
                      formErrors.terms ? 'border-red-500/50' : ''
                    }`}
                  />
                  <label htmlFor="agree-terms" className="ml-3 block text-sm text-slate-300">
                    I agree to the{' '}
                    <Link to="/terms" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {formErrors.terms && <p className="mt-1 text-sm text-red-400">{formErrors.terms}</p>}

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
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting request...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Submit Access Request <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    )}
                  </button>
                </div>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-transparent text-slate-400">Alternative signup methods</span>
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

export default SignupPage;