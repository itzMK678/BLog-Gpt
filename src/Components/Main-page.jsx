import React, { useState } from 'react';
import './Main-page.css';
import { useTitle } from "./titleContext";
import { GoogleGenAI } from "@google/genai";
import Blog from './Blog'; 
import Navbar from './Navbar';

const MainPage = () => {
  const [keyword, setKeyword] = useState('');
const { title, setTitle } = useTitle();
  const [loading, setLoading] = useState(false);
 const titleGenerator = async () => {
  if (!keyword.trim()) return;

  setLoading(true);
  try {
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY });

    async function main() {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate a single, creative, and SEO-friendly blog title based on the keyword: '${keyword}'. The title should be concise, attention-grabbing, and highly relevant to the keyword. Ensure it appeals to readers and encourages clicks, while maintaining clarity and relevance.`
      });

      console.log(response.text);
      setTitle(response.text.replaceAll("**", '')); // Remove quotes from the title
    }

    await main(); 
  } catch (error) {
    console.error("Error generating title:", error.response?.data || error.message);
    setTitle("❌ Error generating title.");
  } finally {
    setLoading(false); 
  }
};


  return (
    <>
    <div id="main-page" style={{height:"100%"}}>
      <Navbar />
      <div className="bars">
       <h1 >Create Blog</h1>
        <p>Topic</p>
        <div className="head">
           
          <input
            type="text"
            value={keyword}
            placeholder="Enter your Main Keyword"
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={titleGenerator} disabled={loading}>
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <p>Title</p>
        <input type="text" value={title} readOnly placeholder="Suitable Title" />
         <Blog/>
      </div>
     
      </div>


    </>
  );
};

export default MainPage;
