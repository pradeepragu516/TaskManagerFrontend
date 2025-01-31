import React, { useState, useEffect, useRef } from "react";
import { FaPaperclip, FaMicrophone, FaSearch, FaSmile, FaPlus, FaPaperPlane } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { MdDelete, MdEdit, MdOutlineMessage } from "react-icons/md";
import "./Messages.css";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() || selectedFile) {
      const messageObj = {
        id: Date.now(),
        text: newMessage,
        file: selectedFile,
        sender: "You",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, messageObj]);
      setNewMessage("");
      setSelectedFile(null);
    }
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const editMessage = (id) => {
    const msgToEdit = messages.find((msg) => msg.id === id);
    setNewMessage(msgToEdit.text);
    setEditingMessageId(id);
  };

  const updateMessage = () => {
    setMessages(
      messages.map((msg) =>
        msg.id === editingMessageId ? { ...msg, text: newMessage } : msg
      )
    );
    setNewMessage("");
    setEditingMessageId(null);
  };

  return (
    <div className="messages-container">
      {/* Header */}
      <div className="messages-header">
        <h2>
          <MdOutlineMessage /> Messages
        </h2>
        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Messages List */}
      <div className="messages-list">
        {messages
          .filter((msg) => msg.text.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((msg) => (
            <div key={msg.id} className="message-item">
              <div className="message-content">
                <p>{msg.sender}:</p>
                <span>{msg.text}</span>
                {msg.file && (
                  <a href={URL.createObjectURL(msg.file)} download>
                    📎 {msg.file.name}
                  </a>
                )}
              </div>
              <div className="message-actions">
                <MdEdit className="edit-icon" onClick={() => editMessage(msg.id)} />
                <MdDelete className="delete-icon" onClick={() => deleteMessage(msg.id)} />
              </div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="message-input">
        <label className="file-upload">
          <FaPaperclip />
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        </label>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <FaSmile className="emoji-icon" />
        <FaMicrophone className="voice-icon" />
        {editingMessageId ? (
          <IoMdSend className="send-icon" onClick={updateMessage} />
        ) : (
          <FaPaperPlane className="send-icon" onClick={sendMessage} />
        )}
      </div>
    </div>
  );
};

export default Messages;
