import React, { useState } from 'react';
import '../scss/Addpet.scss';

const Addpet = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://vetbee-backend.glitch.me/v1/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          dob: formData.dob,
          client_email: formData.email, 
        }),
      });
  
      if (response.ok) {
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="box">
        <h1>Add Your Pet</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Pet Name:
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Pet Birthday:
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </label>
          <label>
            Pet Email:
            <input
              type="email"
              name="email"
              placeholder="pet@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="btn-primary">
            ADD PET
          </button>
        </form>
      </div>
    </>
  );
};

export default Addpet;
