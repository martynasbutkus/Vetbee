import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../scss/Addlog.scss';

const AddLog = () => {
  const { id: petId } = useParams();
  const navigate = useNavigate();

  const [logData, setLogData] = useState({
    status: '',
    description: '',
  });

  const [petDetails, setPetDetails] = useState({
    name: '',
    client_email: '',
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `https://vetbee-backend.glitch.me/v1/logs/${petId}`;
  
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: petId,
        description: logData.description,
        status: logData.status,
        name: petDetails.name,
        dob: petDetails.dob,
        client_email: petDetails.client_email,
        archived: 0,
      }),
    });
    navigate(`/petlogs/${petId}`);
  };
  
  useEffect(() => {
    const fetchPetDetails = async () => {
      const response = await fetch(`https://vetbee-backend.glitch.me/v1/pets/${petId}`);
      if (response.ok) {
        const data = await response.json();
        setPetDetails({
          name: data.name,
          client_email: data.client_email,
          dob: data.dob,
        });
      }
    };

    if (petId) {
      fetchPetDetails();
    }
  }, [petId]);

  return (
    <div className="box">
      <h1>{petDetails.name}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Status
          <input
            type="text"
            name="status"
            placeholder="Huberium Cellulitus"
            value={logData.status}
            onChange={handleChange}
          />
        </label>
        <label>
          Description
          <textarea
            placeholder="Removed some fat..."
            name="description"
            value={logData.description}
            onChange={handleChange}
          />
        </label>
        <div className="buttons">
          <button type="submit" className="btn-primary">
            ADD LOG
          </button>
          <Link to={`/petlogs/${petId}`}>
            <button className="btn-secondary">GO BACK</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddLog;
