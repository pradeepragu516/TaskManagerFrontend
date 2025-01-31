import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const  [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
} ;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem('authToken', token);

      alert('Login successful!');
      navigate('/ProjectDashboard'); // Redirect to Home Page
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };
  


  return (
    <div className="login-container">
      <div className="login-card">
        <h2>USER LOGIN</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email or Username</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email or username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className='password-container'>
            <input
              type={showPassword ? 'text' : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <span className='toggle-password' onClick = {togglePasswordVisibility}>
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
              </div>
          </div>
          <div className="form-group remember-me">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember Me
            </label>
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <div className="login-options">
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
        
        </div>
      </div>
    </div>
  );
};

export default Login;
