import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, User, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Registration.css'
import '../rashu-styles.css'

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConPassword, setShowConPassword] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConPasswordVisibility = () => {
    setShowConPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration attempted:', { email, password, username });
  };

  return (
    <div className="loginbody">
  
        <div className="min-h-screen flex items-center justify-center p-4 bg-transparent">
          <div className="w-full max-w-md">
            {/* Profile Icon Circle */}
            <div className="flex justify-center">
              <div className="z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-2 border-4 border-blue-500">
                <User className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            {/* Main Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white">
              {/* Back Button */}
              <button
                onClick={() => navigate('/login')}
                className="absolute m-4 p-2 text-gray-600 hover:text-blue-500 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <div className="p-8 space-y-7">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Create Account
                  </h2>
                  <p className="text-gray-500">Sign up for a new account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 rounded-md">
                  {/* Username Input */}
                  <div className="z-11 space-y-2">
                    <label className="block text-sm font-medium text-white">
                      Username
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-3 flex items-center pl-3">
                        <User className="h-5 w-5 text-white group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <div className="relative group w-full">
                        <input
                          type="text"
                          placeholder="johndoe"
                          className="w-full text-black box-border pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/50 focus:bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>

                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">
                      Email
                    </label>
                    <div className="relative group ">
                      <div className="absolute inset-y-0 left-3 flex items-center pl-3">
                        <Mail className="h-5 w-5 text-white group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <div className="relative group w-full">
                        <input
                          type="email"
                          placeholder="you@example.com"
                          className="w-full box-border pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/50 focus:bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-3 flex items-center pl-3">
                        <Lock className="h-5 w-5 text-white group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <div className="relative group w-full">
                        <input
                          type={showPassword ? 'text' : 'password'} // Toggle password visibility based on state
                          placeholder="••••••••"
                          className="w-full box-border pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/50 focus:bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <div
                          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                          onClick={togglePasswordVisibility} // Toggle password visibility on click
                        >
                          {showPassword ? (
                            <Eye className="h-5 w-5 text-gray-600" />
                          ) : (
                            <EyeOff className="h-5 w-5 text-gray-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-3 flex items-center pl-3">
                        <Lock className="h-5 w-5 text-white group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <div className="relative group w-full">
                        <input
                          type={showConPassword ? 'text' : 'password'} // Toggle password visibility based on state
                          placeholder="••••••••"
                          className="w-full box-border pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/50 focus:bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <div
                          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                          onClick={toggleConPasswordVisibility} // Toggle password visibility on click
                        >
                          {showConPassword ? (
                            <Eye className="h-5 w-5 text-gray-600" />
                          ) : (
                            <EyeOff className="h-5 w-5 text-gray-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
                  >
                    Create Account
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  {/* Sign in link */}
                  <div className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                      onClick={() => navigate('/login')}
                      className="font-medium text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default Registration;