import React, { useState, useContext } from "react";
import { FaHome, FaBullhorn, FaTasks, FaUsers, FaFolder, FaPlus, FaEnvelope, FaBell, FaProjectDiagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ProjectContext } from "../context/ProjectContext";
import "./SideBar.css";

const SideBar = () => {
  const { projects } = useContext(ProjectContext);
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const filteredProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        {isExpanded && <div className="logo">Task Studio</div>}
        <button onClick={toggleSidebar} className="toggle-btn">
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {/* Search Box */}
      {isExpanded && (
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="nav-menu">
        <Link to="/ProjectDashboard" className="nav-item">
          <FaHome className="nav-icon" />
          {isExpanded && "Home"}
        </Link>
        <Link to="/announcement" className="nav-item">
          <FaBullhorn className="nav-icon" />
          {isExpanded && "Announcement"}
        </Link>
        <Link to="/taskManager" className="nav-item">
          <FaTasks className="nav-icon" />
          {isExpanded && "Task Manager"}
        </Link>
        <Link to="/teamSettings" className="nav-item">
          <FaUsers className="nav-icon" />
          {isExpanded && "Team Settings"}
        </Link>
        <Link to="/projectCreation" className="nav-item admin-only">
          <FaProjectDiagram className="nav-icon" />
          {isExpanded && "Create Project"}
        </Link>
        <Link to="/messages" className="nav-item">
          <FaEnvelope className="nav-icon" />
          {isExpanded && "Messages"}
        </Link>
        <Link to="/notifications" className="nav-item">
          <FaBell className="nav-icon" />
          {isExpanded && "Notifications"}
        </Link>
      </nav>

      {/* Workspace Section */}
      {isExpanded && (
        <div className="workspace">
          <div className="workspace-header">
            <FaFolder className="workspace-icon" />
            <span>WORKSPACE</span>
            <Link to="/projectCreation">
              <FaPlus className="add-icon" />
            </Link>
          </div>
          <ul className="workspace-list">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <li key={index} className="workspace-item">
                  {project.projectName}
                </li>
              ))
            ) : (
              <p className="no-projects">No projects yet</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SideBar;
