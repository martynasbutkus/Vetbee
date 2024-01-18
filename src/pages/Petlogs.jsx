import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../scss/Petlogs.scss';

const Petlogs = () => {
  const { id: petId } = useParams();
  const [logRecords, setLogRecords] = useState([]);
  const [petName, setPetName] = useState('');

  const fetchLogs = async () => {
    try {
      const response = await fetch(`https://vetbee-backend.glitch.me/v1/logs/${petId}`);
      if (response.ok) {
        const data = await response.json();
        setLogRecords(data);
      }
    } catch (error) {
    }
  };

  const fetchPetDetails = async () => {
    try {
      const response = await fetch(`https://vetbee-backend.glitch.me/v1/pets/${petId}`);
      if (response.ok) {
        const data = await response.json();
        setPetName(data.name);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    if (petId) {
      fetchLogs();
      fetchPetDetails();
    }
  }, [petId]);

  return (
    <>
      <div className="Menu-log">
        <h1>{`${petName}: Health Records`}</h1>
        <div className="buttons">
          <Link to={`/addlog/${petId}`}>
            <button className="btn-primary">ADD LOG</button>
          </Link>
          <Link to="/">
            <button className="btn-secondary">GO BACK</button>
          </Link>
        </div>
      </div>
      <main>
        {logRecords.map((log) => (
          <div className="Pet-block" key={log.id}>
            <h1>{log.status}</h1>
            <p>{log.description}</p>
            <p className="date">{new Date(log.dob).toLocaleDateString("lt")}</p>
          </div>
        ))}
      </main>
    </>
  );
};

export default Petlogs;
