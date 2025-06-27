import React, { useState, useEffect } from 'react';
import './Blog.css'; // Import your styles
import { GoogleGenAI } from "@google/genai";
import { useTitle } from './titleContext';
 // Assuming you have a Navbar component

const Blog = () => {
  const [language, setLanguage] = useState("English (US)");
  const [articleType, setArticleType] = useState("");
  const [articleSize, setArticleSize] = useState("Select Size");
  const [aiImages, setAiImages] = useState("Generate Image");
  const [blog, setBlog] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { title } = useTitle();

  const BlogGenerator = async () => {
    if (!title.trim()) return;
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY });

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: `Generate a complete blog in **HTML format** with the following details:

- **Title**: "${title}"
- **Language**: ${language}
- **Article Type**: ${articleType} (e.g., Informative, Listicle, How-To, Opinion, etc.)
- **Article Size**: ${articleSize} (e.g., Short, Medium, Long)
- **Include AI-Generated Images**: ${aiImages}


**Requirements:**
- Format the blog in clean, semantic HTML.
- Use <h1> for the blog title, and appropriate <h2>, <h3>, etc. for subheadings.
- Wrap paragraphs in <p> tags.
- If ${aiImages} is "Yes", include <img> tags with placeholder image URLs (e.g., https://via.placeholder.com/600x400).
- Make sure the content is SEO-friendly and engaging for readers.
not using CSS
Output only valid HTML.`
});


      setBlog(response.text.replaceAll("**", '').replaceAll('```html', '').replaceAll('```', '')); // Remove quotes from the blog text
      setHistory(prev => [
        ...prev,
        { title, blog: response.text, time: new Date().toLocaleString() }
      ]);
    } catch (error) {
      console.error("Error generating blog:", error);
      setBlog("❌ Error generating blog.");
    } finally {
      setLoading(false);
      // Auto-save history after each generation attempt
      if (history.length > 0) {
        localStorage.setItem("blogHistory", JSON.stringify(history));
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(blog)
      .then(() => {
        alert("📋 Blog copied to clipboard!");
      })
      .catch((err) => {
        console.error("Copy failed:", err);
      });
  };

  useEffect(() => {
    const saved = localStorage.getItem("blogHistory");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem("blogHistory", JSON.stringify(history));
    alert("✅ History saved to local storage!");
  };

  return (
    <div>
     

      <div className="blog-container">
        <h3>Select requirements</h3>
        <div id="options">
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="English (US)">English (US)</option>
            <option value="Spanish (ES)">Spanish (ES)</option>
            <option value="French (FR)">French (FR)</option>
          </select>

          <select name="articleType" value={articleType} onChange={(e) => setArticleType(e.target.value)}>
            <option value="">Select Article Type</option>
            <option value="Listicle">Listicle</option>
            <option value="How-to">How-to</option>
            <option value="Opinion">Opinion</option>
          </select>

          <select name="articleSize" value={articleSize} onChange={(e) => setArticleSize(e.target.value)}>
           <option value="">Select Size</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>

          <select name="aiImages" value={aiImages} onChange={(e) => setAiImages(e.target.value)}>
           <option value="">Generate Image</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <h2>Generated Blog</h2>
        <div className='hello' dangerouslySetInnerHTML={{__html:blog?blog:<p>hello</p>}}></div>

        <div className="btn">
          <button onClick={BlogGenerator} disabled={loading}>
            {loading ? "Generating..." : "Generate Blog"}
          </button>

          <button onClick={copyToClipboard}>
            📋 Copy Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
