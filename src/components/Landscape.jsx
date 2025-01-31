import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landscape.css';


const Landscape = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <header className="header">
        <div className="mana">Task Manager</div>
        <div className="header-buttons">
        <button className="header-button signup" onClick={() => navigate('/AdminSignup')}>
            Admin SignUp
          </button>
          <button className="header-button" onClick={() => navigate('/AdminLogin')}>
            Admin Login
          </button>
          <button className="header-button signup" onClick={() => navigate('/signup')}>
            Sign Up
          </button>
          <button className="header-button" onClick={() => navigate('/login')}>
            Log In
          </button>
        </div>
      </header>
      <div className="overlay">
        <div className="content">
          <h1>Welcome to Task Manager</h1>
          <p>
            <div>Simplify your workflow, organize tasks, and boost productivity with
            Task Manager.</div><div>Manage personal and team tasks efficiently, stay on
            top of deadlines, and achieve your goals effortlessly.</div>
          </p>
          <div className="main-buttons">
            <button className="main-button signup" onClick={() => navigate('/signup')}>
              Get Started
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landscape;
