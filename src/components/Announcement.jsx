import React, { useState } from "react";
import { FaPlus, FaSearch, FaThumbsUp, FaComment, FaFilter, FaTimes } from "react-icons/fa";
import "./Announcement.css";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Project Deadline Extended 🚀",
      content: "The deadline for the ongoing project has been extended by one week.",
      category: "Project Updates",
      date: "Jan 29, 2025",
      likes: 5,
      comments: [],
      acknowledged: false,
    },
    {
      id: 2,
      title: "Team Meeting 🗓️",
      content: "There will be a team meeting on Friday at 3 PM. Please join.",
      category: "Meetings",
      date: "Jan 28, 2025",
      likes: 3,
      comments: [],
      acknowledged: false,
    },
  ]);

  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "", category: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) return;
    const newEntry = {
      id: announcements.length + 1,
      ...newAnnouncement,
      date: new Date().toLocaleDateString(),
      likes: 0,
      comments: [],
      acknowledged: false,
    };
    setAnnouncements([newEntry, ...announcements]);
    setShowPopup(false);
    setNewAnnouncement({ title: "", content: "", category: "" });
  };

  const handleLike = (id) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, likes: a.likes + 1 } : a));
  };

  const handleComment = (id, comment) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, comments: [...a.comments, comment] } : a));
  };

  const handleAcknowledge = (id) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  };

  const filteredAnnouncements = announcements.filter(a => 
    (filter === "All" || a.category === filter) && 
    (a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="announcement-wrapper"> {/* Light pink container */}
      <div className="announcement-container">
        <div className="announcement-header">
          <h2>📢 Announcements</h2>
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="search-icon" />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option>All</option>
              <option>Project Updates</option>
              <option>Meetings</option>
              <option>Urgent</option>
            </select>
            <FaFilter className="filter-icon" />
          </div>
          <button className="add-btn" onClick={() => setShowPopup(true)}>
            <FaPlus /> New Announcement
          </button>
        </div>

        <div className="announcement-list">
          {filteredAnnouncements.length === 0 ? (
            <p className="no-announcements">No announcements found.</p>
          ) : (
            filteredAnnouncements.map(a => (
              <div key={a.id} className="announcement-card">
                <h3>{a.title}</h3>
                <p>{a.content}</p>
                <span className="category">{a.category}</span>
                <span className="date">{a.date}</span>

                <div className="actions">
                  <button onClick={() => handleLike(a.id)}>
                    <FaThumbsUp /> {a.likes}
                  </button>
                  <button onClick={() => handleAcknowledge(a.id)} disabled={a.acknowledged}>
                    {a.acknowledged ? "✅ Acknowledged" : "Acknowledge"}
                  </button>
                  <button onClick={() => handleComment(a.id, prompt("Add a comment:"))}>
                    <FaComment /> {a.comments.length}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>New Announcement</h3>
            <input type="text" placeholder="Title" value={newAnnouncement.title} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })} />
            <textarea placeholder="Content" value={newAnnouncement.content} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}></textarea>
            <select value={newAnnouncement.category} onChange={(e) => setNewAnnouncement({ ...newAnnouncement, category: e.target.value })}>
              <option>Select Category</option>
              <option>Project Updates</option>
              <option>Meetings</option>
              <option>Urgent</option>
            </select>
            <div className="popup-actions">
              <button onClick={handleAddAnnouncement}>Post</button>
              <button className="close-btn" onClick={() => setShowPopup(false)}><FaTimes /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcement;
