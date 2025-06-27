import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { TitleProvider } from './Components/titleContext.jsx';
import { UserProvider } from './Components/UserContext';


// import { TitleProvider } from './Componenets/TitleContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TitleProvider>
       <UserProvider>
      <App />
      </UserProvider>
    </TitleProvider>

  </StrictMode>
);
