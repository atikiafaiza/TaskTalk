import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, ArrowRight, User } from 'lucide-react';
import '../Registration/Registration.css'
import '../rashu-styles.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempted:', { username, password });
  
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        user_name: username,
        password,
      });
  
      console.log("Response:", response.data);
      alert("Login successful!");
  
      navigate("/dashboard");
  
      // Store user details
      localStorage.setItem("currentUserName", username);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="loginbody">
      
        <div className="min-h-screen flex items-center justify-center p-4  bg-transparent">
          <div className="w-full max-w-md">
            {/* Profile Icon Circle */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-2 border-4 border-blue-500">
                <User className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            {/* Main Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white">
              <div className="p-8 space-y-7">
                {/* Header */}
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Welcome Back
                  </h2>
                  <p className="text-gray-500">Please sign in to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 rounded-md">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-white">
                      Username
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-3 flex items-center pl-3">
                        <User className="h-5 w-5  text-white group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <div className="relative group w-full">
                        <input
                          type="text"
                          placeholder="johndoe"
                          className="w-full box-border pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white/50 focus:bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                        />
                      </div>

                    </div>
                  </div>
                  {/* Password Input */}
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


                  {/* Remember Me & Forgot Password
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 transition-colors"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors">
                    Forgot password?
                  </a>
                </div> */}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all"
                  >
                    Sign in
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  {/* Sign up link */}
                  <div className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a onClick={() => navigate('/registration')} className="font-medium text-blue-500  hover:text-blue-600 transition-colors cursor-pointer">
                      Create an account
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Login; 