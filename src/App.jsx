import { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import LoginPage from './Components/LoginPage';
import RegisterPage from './Components/RegisterPage';
import MainPage from './Components/Main-page';
import History from './Components/History';
import './App.css'; // Import your global styles
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <MainPage />
            ) : (
              <LoginPage onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
