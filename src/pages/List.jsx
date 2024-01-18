import React, { useState, useEffect } from 'react';
import '../scss/List.scss';
import { Link } from 'react-router-dom';

const List = () => {
  const [pets, setPets] = useState([])

  const fetchPets = async () => {
    try {
      const response = await fetch('https://vetbee-backend.glitch.me/v1/pets')
      if (response.ok) {
        const data = await response.json()
        setPets(data)
      }
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    fetchPets()
  }, [])

  const handleDelete = async (petId) => {
    await fetch(`https://vetbee-backend.glitch.me/v1/pets/${petId}`, {
      method: 'DELETE',
    })
    fetchPets()
  }
  return (
    <>
      <div className="container">
        <div className="addPet">
          <h1>Pet List</h1>
          <Link to="/addpet">
            <button className='btn-primary'>ADD PET</button>
          </Link>
        </div>
      </div>
      <main>
        {pets.map((pet) => (
          <div className="block" key={pet.id}>
            <h1>{pet.name}</h1>
            <p>{new Date(pet.dob).toLocaleDateString('lt')}</p>
            <p>{pet.client_email}</p>
            <div className="buttons">
              <Link to={`/petlogs/${pet.id}`}>
                <button className="btn-primary">VIEW LOG</button>
              </Link>
              <button className="btn-secondary" onClick={() => handleDelete(pet.id)}>
                DELETE
              </button>
            </div>
          </div>
        ))}
      </main>
    </>
  )
}

export default List
