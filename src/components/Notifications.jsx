import React, { useState, useEffect } from "react";
import "./Notifications.css";
import { FaTrash, FaBell, FaCheck, FaFilter, FaMoon, FaSun } from "react-icons/fa";

const Notification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "Project Update", message: "Project Alpha moved to Ongoing", read: false, time: "2m ago" },
    { id: 2, type: "Task Alert", message: "Task 'Database Optimization' assigned to you", read: false, time: "10m ago" },
    { id: 3, type: "Announcement", message: "New company policy update", read: true, time: "1h ago" },
    { id: 4, type: "Mention", message: "John mentioned you in a comment", read: false, time: "30m ago" },
  ]);
  
  const [filter, setFilter] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  // ✅ Mark all as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
  };

  // ✅ Delete a notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  // ✅ Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  // ✅ Filter notifications
  const filteredNotifications = notifications.filter((notif) => filter === "All" || notif.type === filter);

  return (
    <div className={`notification-container ${darkMode ? "dark" : ""}`}>
      <div className="notification-header">
        <h2><FaBell /> Notifications</h2>
        <div className="header-icons">
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button onClick={markAllAsRead} className="mark-read-btn"><FaCheck /> Mark All as Read</button>
          <select className="filter-dropdown" onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Project Update">Project Updates</option>
            <option value="Task Alert">Task Alerts</option>
            <option value="Announcement">Announcements</option>
            <option value="Mention">Mentions</option>
          </select>
        </div>
      </div>

      {/* ✅ Notifications List */}
      <div className="notification-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div key={notif.id} className={`notification-item ${notif.read ? "read" : "unread"}`}>
              <p>{notif.message} <span className="time">{notif.time}</span></p>
              <button className="delete-btn" onClick={() => deleteNotification(notif.id)}><FaTrash /></button>
            </div>
          ))
        ) : (
          <p className="no-notifications">No notifications available.</p>
        )}
      </div>
    </div>
  );
};

export default Notification;
