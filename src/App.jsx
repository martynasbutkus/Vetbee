// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { FaReact } from 'react-icons/fa';
import './scss/nav.scss';
import List from './pages/List';
import Addpet from './pages/addpet';
import Petlogs from './pages/Petlogs';
import AddLog from './pages/Addlog';
import './scss/globaltags.scss';

function App() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetch('https://vetbee-backend.glitch.me/v1/pets')
      .then((resp) => resp.json())
      .then((data) => setPets(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <BrowserRouter>
        <nav>
          <div className="container">
            <FaReact className="react-icon" />
            <h1>vetbee</h1>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<List pets={pets} />} />
          <Route path="/addpet" element={<Addpet />} />
          <Route path="/petlogs/:id" element={<Petlogs />} />
          <Route path="/petlogs" element={<Petlogs />} />
          <Route path="/addlog" element={<AddLog />} />
          <Route path="/addlog/:id" element={<AddLog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
