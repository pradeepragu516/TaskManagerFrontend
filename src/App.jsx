import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/SignUp';
import Login from './components/Login';
import Landscape from './components/Landscape';
import AdminSignup from './components/AdminSignup';
import AdminLogin from './components/AdminLogin';
import SideBar from './pages/SideBar';
import { ProjectProvider } from "./context/ProjectContext";
import ProjectCreation from './components/ProjectCreation';
import ProjectDashboard from './components/ProjectDashboard';
import "./App.css"; 
import Announcement from './components/Announcement';
import Notifications from './components/Notifications'
import Messages from './components/Messages';

// ✅ Authentication Layout (No Sidebar)
const AuthLayout = ({ children }) => {
  return <div className="auth-container">{children}</div>;
};

// ✅ Main Layout (Sidebar + Content)
const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <SideBar />
      <div className="content-container">{children}</div>
    </div>
  );
};

const App = () => {
  return (
    <ProjectProvider>
      <Router>
        <Routes>
          {/* ✅ Authentication Routes (No Sidebar) */}
          <Route path="/" element={<AuthLayout><Landscape /></AuthLayout>} />
          <Route path="/Signup" element={<AuthLayout><Signup /></AuthLayout>} />
          <Route path="/Login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/AdminSignup" element={<AuthLayout><AdminSignup /></AuthLayout>} />
          <Route path="/AdminLogin" element={<AuthLayout><AdminLogin /></AuthLayout>} />

          {/* ✅ Main Pages with Sidebar */}
          <Route path="/ProjectCreation" element={<MainLayout><ProjectCreation /></MainLayout>} />
          <Route path="/ProjectDashboard" element={<MainLayout><ProjectDashboard /></MainLayout>} />
          <Route path="/Announcement" element={<MainLayout><Announcement /></MainLayout>} />
          <Route path="/Notifications" element={<MainLayout><Notifications /></MainLayout>} />
          <Route path="/Messages" element={<MainLayout><Messages /></MainLayout>} />
        </Routes>
      </Router>
    </ProjectProvider>
  );
};

export default App;
