import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bulma/css/bulma.min.css';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router> 
  </StrictMode>,
)
