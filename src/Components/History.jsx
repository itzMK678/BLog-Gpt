
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Historypage = () => {
  const [history, setHistory] = useState([]);

  // Inline HistoryItem component with Tailwind styling
  const HistoryItem = ({ item, index }) => (
    <div 
      className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigator.clipboard.writeText(item.blog).then(() => alert("📋 Blog copied to clipboard!"))}
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.title || "Untitled Blog"}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.time}</p>
      <div className="mt-2 text-gray-700 dark:text-gray-300 prose dark:prose-invert max-w-none">
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link 
            to="/main" 
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center gap-2"
          >
            <span>← Back to Main</span>
          </Link>
          <h1 className="text-2xl font-bold">Blog History</h1>
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No history found. Generate some blogs to see them here!</p>
            <Link 
              to="/main" 
              className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Create a Blog
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={clearHistory}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm font-medium"
              >
                Clear History
              </button>
            </div>
            <div className="space-y-4">
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
