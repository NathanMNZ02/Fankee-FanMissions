import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import fankeeLogo from "./assets/fankee_logo.png";

import HomePage from "./pages/HomePage";
import { createUser, getUserByNickname } from "./handler/databaseApiHandler"

function App() {
  const [visualizedNickname, setVisualizedNickname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('nickname');
    if (saved) setVisualizedNickname(saved);
  }, []);

  const handleLogin = async () => {
    if (visualizedNickname.trim() !== '') {
      try{
        await getUserByNickname(visualizedNickname);
        localStorage.setItem("nickname", visualizedNickname.trim());
        navigate(`/home/${visualizedNickname.trim()}`);
      }catch(err) {
        alert(err);
      }
    }
  };

  const handleCreateNickname = async () => {
    if (visualizedNickname.trim() !== '') {
      try {
        await createUser(visualizedNickname);
        handleLogin();
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  };

  return (
    <Routes>
      {/* Pagina iniziale */}
      <Route path="/" element={
        <div className="section has-text-centered">
          <a href="https://www.fankee.com" target="_blank" rel="noopener noreferrer">
            <img src={fankeeLogo} alt="Fankee logo" style={{ width: '250px', marginBottom: '20px' }} />
          </a>

          <div className="section mt-6">
            <div className="control mt-6 mb-6">
              <input
                className="input"
                type="text"
                placeholder="Insert your nickname"
                value={visualizedNickname}
                onChange={(e) => setVisualizedNickname(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}/>
            </div>

            <div className="columns is-centered">
              <div className="column is-3-desktop is-6-tablet is-12-mobile">
                <button 
                  className="button is-primary is-fullwidth"
                  onClick={handleCreateNickname}>
                  Create
                </button>
              </div>

              <div className="column is-3-desktop is-6-tablet is-12-mobile">
                <button 
                  className="button is-primary is-fullwidth"
                  onClick={handleLogin}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      }/>

      {/* Pagina Home */}
      <Route path="/home/:nickname" element={<HomePage />} />
    </Routes>
  );
}

export default App;