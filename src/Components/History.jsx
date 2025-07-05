import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './History.css'; 

const Historypage = () => {
  const [history, setHistory] = useState([]);

  // Inline HistoryItem component with custom CSS styling
  const HistoryItem = ({ item, index }) => (
    <div 
      className="history-item"
      onClick={() => navigator.clipboard.writeText(item.blog).then(() => alert("📋 Blog copied to clipboard!"))}
    >
      <h3 className="history-title">{item.title || "Untitled Blog"}</h3>
      <p className="history-time">{item.time}</p>
      <div className="history-content">
        <div dangerouslySetInnerHTML={{ __html: item.blog.slice(0, 200) + (item.blog.length > 200 ? "..." : "") }} />
      </div>
    </div>
  );

  useEffect(() => {
    const saved = localStorage.getItem("blogHistory");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        setHistory([]);
        localStorage.removeItem("blogHistory");
      }
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear history?")) {
      localStorage.removeItem("blogHistory");
      setHistory([]);
      alert("🗑️ History cleared!");
    }
  };

  return (
    <div className="history-container">
      <div className="history-wrapper">
        <div className="history-header">
          <Link to="/main" className="back-link">
            <span>← Back to Main</span>
          </Link>
          <h1 className="page-title">Blog History</h1>
        </div>

        {history.length === 0 ? (
          <div className="empty-state">
            <p className="empty-message">No history found. Generate some blogs to see them here!</p>
            <Link to="/main" className="create-blog-btn">
              Create a Blog
            </Link>
          </div>
        ) : (
          <div className="history-content-wrapper">
            <div className="clear-history-container">
              <button
                onClick={clearHistory}
                className="clear-history-btn"
              >
                Clear History
              </button>
            </div>
            <div className="history-list">
              {history.map((item, idx) => (
                <HistoryItem key={idx} item={item} index={idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Historypage;