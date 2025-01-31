import React, { useState, useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import { FaComment, FaPlus } from "react-icons/fa";
import "./ProjectDashboard.css";
import TaskModal from "./TaskModal";

const ProjectDashboard = () => {
  const { projects, updateProjectStatus } = useContext(ProjectContext);
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  
  const handleMoveProject = (project) => {
    let newStatus;
    if (project.status === "Started") newStatus = "Ongoing";
    else if (project.status === "Ongoing") newStatus = "Completed";
    else return; 

    updateProjectStatus(project.id, newStatus);
  };


  const openTaskModal = (project) => {
    setSelectedProject(project);
    setTaskModalOpen(true);
  };

  
  const closeTaskModal = () => {
    setTaskModalOpen(false);
    setSelectedProject(null);
  };

  
  const groupedProjects = [
    { title: "Started", status: "Started" },
    { title: "Ongoing", status: "Ongoing" },
    { title: "Completed", status: "Completed" },
  ];

  return (
    <div className="dashboard-container">
      <div className="projects-sections">
        <h2>Projects</h2>
        {groupedProjects.map(({ title, status }) => {
          const filteredProjects = projects.filter((p) => p.status === status);
          return (
            <div key={status} className="project-category">
              <div className="category-header">
                <h3>{title}</h3>
                <button className="add-task-btn" onClick={() => openTaskModal(status)}>
                  <FaPlus />
                </button>
              </div>
              <div className="projects-container">
                {filteredProjects.map((proj) => (
                  <div key={proj.id} className="project-card">
                    <h4>{proj.projectName}</h4>
                    <p>{proj.description}</p>
                    <div className="project-info">
                      <span>{proj.teamMembers.length} members</span>
                      <FaComment className="comment-icon" />
                    </div>
                    {proj.status !== "Completed" && (
                      <button className="move-button" onClick={() => handleMoveProject(proj)}>
                        Move to {proj.status === "Started" ? "Ongoing" : "Completed"}
                      </button>
                    )}
                  </div>
                ))}
                {filteredProjects.length === 0 && <p className="no-projects">No projects in this category.</p>}
              </div>
            </div>
          );
        })}
      </div>

    
      <div className="statistics-section">
        <h2>Project Overview</h2>
        <div className="stats-card">
          <h3>Total Projects</h3>
          <p>{projects.length}</p>
        </div>
        <div className="stats-card">
          <h3>Completed</h3>
          <p>{projects.filter((p) => p.status === "Completed").length}</p>
        </div>
        <div className="stats-card">
          <h3>Ongoing</h3>
          <p>{projects.filter((p) => p.status === "Ongoing").length}</p>
        </div>
        <div className="stats-card">
          <h3>Started</h3>
          <p>{projects.filter((p) => p.status === "Started").length}</p>
        </div>
      </div>

      {/* Task Modal */}
      {isTaskModalOpen && <TaskModal closeModal={closeTaskModal} projectStatus={selectedProject} />}
    </div>
  );
};

export default ProjectDashboard;
