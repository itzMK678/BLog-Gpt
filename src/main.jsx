import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// import { BrowserRouter } from 'react-router-dom';

import { UserProvider } from './Components/UserContext';
import { TitleProvider } from './Components/TitleContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TitleProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </TitleProvider>
  </StrictMode>
);
