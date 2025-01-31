import React, { useState, useContext } from "react";
import { ProjectContext } from "../context/ProjectContext"; 
import "./ProjectCreation.css";

const ProjectCreation = () => {
  const { projects, setProjects } = useContext(ProjectContext);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    startDate: "",
    endDate: "",
    teamMemberInput: "",
    teamMembers: [],
    priority: "Medium",
    file: null,
    status: "Started",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  // Handle adding team members manually
  const handleAddTeamMember = () => {
    if (formData.teamMemberInput.trim() !== "") {
      setFormData({
        ...formData,
        teamMembers: [...formData.teamMembers, formData.teamMemberInput.trim()],
        teamMemberInput: "",
      });
    }
  };

  // Remove team member
  const handleRemoveTeamMember = (index) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter((_, i) => i !== index),
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.projectName.trim()) {
      const newProject = {
        ...formData,
        id: projects.length + 1,
      };
      setProjects([...projects, newProject]);
      alert("Project Created Successfully!");
      setFormData({
        projectName: "",
        description: "",
        startDate: "",
        endDate: "",
        teamMemberInput: "",
        teamMembers: [],
        priority: "Medium",
        file: null,
        status: "Started",
      });
    }
  };

  return (
    <div className="project-form-container">
      <h2 className="form-title">Create a New Project</h2>
      <form className="project-form" onSubmit={handleSubmit}>
        {/* Project Name */}
        <div className="form-group">
          <label>Project Name:</label>
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="textarea-field"
          ></textarea>
        </div>

        {/* Start & End Date */}
        <div className="form-row">
          <div className="form-group">
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="date-field"
            />
          </div>
          <div className="form-group">
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="date-field"
            />
          </div>
        </div>

        {/* Team Members Input */}
        <div className="form-group">
          <label>Team Members:</label>
          <div className="team-input-container">
            <input
              type="text"
              name="teamMemberInput"
              value={formData.teamMemberInput}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter team member name"
            />
            <button type="button" onClick={handleAddTeamMember} className="btn-add-team">
              Add
            </button>
          </div>
          <div className="team-members-list">
            {formData.teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                {member}
                <button type="button" onClick={() => handleRemoveTeamMember(index)} className="btn-remove-team">
                  ✖
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div className="form-group">
          <label>Priority:</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="priority-field"
          >
            <option value="Low">🟢 Low</option>
            <option value="Medium">🟡 Medium</option>
            <option value="High">🔴 High</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="form-group">
          <label>Upload Documents:</label>
          <input type="file" onChange={handleFileChange} className="file-field" />
        </div>

        {/* Submit & Reset Buttons */}
        <div className="form-buttons">
          <button type="submit" className="btn-submit">
            Create Project
          </button>
          <button
            type="button"
            className="btn-reset"
            onClick={() =>
              setFormData({
                projectName: "",
                description: "",
                startDate: "",
                endDate: "",
                teamMemberInput: "",
                teamMembers: [],
                priority: "Medium",
                file: null,
                status: "Started",
              })
            }
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectCreation;
